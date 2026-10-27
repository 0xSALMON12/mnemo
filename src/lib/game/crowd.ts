import { PEOPLE } from "./data";
import { featureOf } from "./features";
import { hashString, mulberry32, shuffle } from "./rng";
import { CROWD_SIZES, type PersonPayload } from "./types";

/** Pool filters for the practice lounge. */
export type PracticePool = "anyone" | "fresh" | "friends" | "shaky";

export const PRACTICE_POOL_LABELS: Record<PracticePool, string> = {
  anyone: "Anyone in the café",
  fresh: "Fresh faces (never met)",
  friends: "My friends (already met)",
  shaky: "Shaky memories (weakest)",
};

export const PRACTICE_SIZE_MIN = 3;
export const PRACTICE_SIZE_MAX = 12;

/**
 * Practice-lounge crowd. Unlike the daily crowd this is NOT deterministic —
 * every round is a fresh deal. It also never touches the database: practice
 * is zero-stake by construction (no XP, no streak, no SRS writes).
 */
export function generatePracticeCrowd(opts: {
  size: number;
  pool: PracticePool;
  /** Keys the player has already met (from /api/venue). */
  metKeys?: string[];
  /** Memory strength 0..1 by key (from /api/venue), for the shaky pool. */
  strengthByKey?: Record<string, number>;
}): PersonPayload[] {
  const size = Math.max(
    PRACTICE_SIZE_MIN,
    Math.min(PRACTICE_SIZE_MAX, Math.round(opts.size))
  );
  const met = new Set(opts.metKeys ?? []);

  const meetsPool = (p: (typeof PEOPLE)[number]): boolean => {
    switch (opts.pool) {
      case "fresh":
        return !met.has(p.key);
      case "friends":
        return met.has(p.key);
      case "shaky":
        return met.has(p.key) && (opts.strengthByKey?.[p.key] ?? 1) < 0.6;
      default:
        return true;
    }
  };

  // Non-deterministic seed: every practice round is a new crowd.
  const rng = mulberry32(hashString(`practice-${Date.now()}-${Math.random()}`));

  const inPool = PEOPLE.filter(meetsPool);
  // Top up from the whole café if the filtered pool is too small.
  const source =
    inPool.length >= size
      ? inPool
      : [...inPool, ...PEOPLE.filter((p) => !inPool.includes(p))];

  const picked = shuffle(source, rng).slice(0, Math.min(size, source.length));

  // Same 12% mystery-guest flourish as the daily — pure flavor here.
  const goldenIdx = rng() < 0.12 ? Math.floor(rng() * picked.length) : -1;
  return picked.map((p, i) => ({ ...p, feature: featureOf(p.featureId), golden: i === goldenIdx }));
}

/**
 * Deterministic daily crowd — same for every player on the same date (Wordle model).
 * Weekday sets the size (Mon 6 → Sat 10). Saturday is Twin Day: a same-first-name
 * pair is guaranteed, training proactive-interference resistance (the real enemy
 * of name memory — every "Michael" competes with every other Michael).
 * ~12% of days feature a golden "mystery guest" (variable reward on a fair base).
 */
export function generateCrowd(
  dateStr: string,
  opts: { onboarding?: boolean } = {}
): PersonPayload[] {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0=Sun
  const rng = mulberry32(hashString("mnemo-crowd-v1-" + dateStr));

  if (opts.onboarding) {
    // FTUE: small, friendly, guaranteed-feel crowd — 3 regulars, easy features.
    const ftueKeys = ["gordon-blake", "amy-santiago", "leo-galante"];
    return ftueKeys.map((key, i) => toPayload(PEOPLE.find((p) => p.key === key)!, rng, i === 0));
  }

  const size = CROWD_SIZES[dow] ?? 7;
  let picked = shuffle(PEOPLE, rng).slice(0, size);

  if (dow === 6) {
    // Twin Day (Saturday) — force a same-first-name pair into the crowd
    const byFirst = new Map<string, typeof PEOPLE>();
    for (const p of PEOPLE) {
      const list = byFirst.get(p.first) ?? [];
      list.push(p);
      byFirst.set(p.first, list);
    }
    const twinFirsts = [...byFirst.entries()].filter(([, v]) => v.length >= 2);
    if (twinFirsts.length) {
      const [first, pair] = twinFirsts[Math.floor(rng() * twinFirsts.length)];
      void first;
      const keys = new Set(picked.map((p) => p.key));
      for (const twin of pair) {
        if (!keys.has(twin.key)) {
          picked = [twin, ...picked.slice(0, size - 1)];
          keys.add(twin.key);
        }
      }
      picked = picked.slice(0, size);
    }
  }

  const goldenIdx = rng() < 0.12 ? Math.floor(rng() * picked.length) : -1;
  return picked.map((p, i) => toPayload(p, rng, i === goldenIdx));
}

function toPayload(
  p: (typeof PEOPLE)[number],
  _rng: () => number,
  golden: boolean
): PersonPayload {
  return { ...p, feature: featureOf(p.featureId), golden };
}
