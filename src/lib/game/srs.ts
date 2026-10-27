import { STABILITY_LADDER, type RecallStatus } from "./types";

// ─── Date helpers (UTC date strings YYYY-MM-DD — the game's calendar) ───

export function todayStr(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function diffDays(a: string, b: string): number {
  const da = new Date(a + "T00:00:00Z").getTime();
  const dbb = new Date(b + "T00:00:00Z").getTime();
  return Math.round((dbb - da) / 86400000);
}

// ─── SRS ladder (FSRS-lite) ───
// knew   → step +1 (stability grows fastest when you review just before forgetting)
// close  → step stays (partial credit; the memory is warm, not strong)
// missed → step −1, min 0 (lapse; never reset to zero — Duolingo freeze philosophy)

export function nextStep(step: number, status: RecallStatus): number {
  if (status === "knew") return Math.min(step + 1, STABILITY_LADDER.length - 1);
  if (status === "close") return step;
  return Math.max(0, step - 1);
}

export function intervalFor(step: number): number {
  return STABILITY_LADDER[Math.min(step, STABILITY_LADDER.length - 1)];
}

/** Display bar 0..1 — how "solid" the memory feels. */
export function strengthFor(step: number): number {
  const max = STABILITY_LADDER.length;
  return Math.min(1, (step + 1) / max);
}
