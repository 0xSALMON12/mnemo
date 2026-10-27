import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PERSON_BY_KEY, ROSTER_SIZE } from "@/lib/game/data";
import { featureOf } from "@/lib/game/features";
import { matchName } from "@/lib/game/match";
import { getOrCreatePlayer, toPlayerState } from "@/lib/game/player";
import { addDays, diffDays, nextStep, strengthFor, todayStr } from "@/lib/game/srs";
import {
  FREEZE_CAP,
  PERFECT_POINTS_FOR_FREEZE,
  relationshipFor,
  type RecallStatus,
  type SessionResultItem,
  type SubmitBody,
  type SubmitResponse,
  type Teaser,
} from "@/lib/game/types";

// XP economy: fair fixed base + variable flourishes (research: variable ON fixed)
const XP_KNEW = 10;
const XP_CLOSE = 5;
const XP_DUE_BONUS = 5; // returning friends are worth more (long-interval recall)
const XP_PERFECT = 25;
const XP_GOLDEN = 25; // rare mystery guest flourish

export async function POST(req: Request) {
  const player = await getOrCreatePlayer();
  const today = todayStr();

  const existing = await db.session.findUnique({
    where: { playerId_date: { playerId: player.id, date: today } },
  });
  if (existing) {
    return NextResponse.json(
      { error: "already_played_today" },
      { status: 409 }
    );
  }

  const body = (await req.json()) as SubmitBody;
  if (!Array.isArray(body?.answers) || body.answers.length === 0) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const sessionCountBefore = await db.session.count({
    where: { playerId: player.id },
  });

  // ── Grade every answer server-side (client feedback is just a preview) ──
  const results: SessionResultItem[] = [];
  let correct = 0;
  let xpGained = 0;

  for (const ans of body.answers) {
    const def = PERSON_BY_KEY[ans.personKey];
    if (!def) continue;
    const status: RecallStatus = matchName(ans.guess ?? "", def);
    const isDue = !!ans.isDue;

    const prior =
      (await db.meeting.findUnique({
        where: { playerId_personKey: { playerId: player.id, personKey: def.key } },
      })) ?? null;

    // SRS ladder update
    let step: number;
    let reps: number;
    let lapses: number;
    if (!prior) {
      // first encounter: encoding + immediate test (testing effect, built in)
      step = status === "knew" ? 1 : 0; // knew → 3d; close/missed → back tomorrow
      reps = 1;
      lapses = status === "missed" ? 1 : 0;
    } else {
      step = nextStep(prior.step, status);
      reps = prior.reps + (status === "missed" ? 0 : 1);
      lapses = prior.lapses + (status === "missed" ? 1 : 0);
    }
    const strength = strengthFor(step);
    const dueDate = addDays(today, /* ladder interval */ [1, 3, 7, 14, 30, 90, 180][step]);

    await db.meeting.upsert({
      where: { playerId_personKey: { playerId: player.id, personKey: def.key } },
      create: {
        playerId: player.id,
        personKey: def.key,
        step,
        reps,
        lapses,
        strength,
        dueDate,
        lastResult: status,
        lastSeen: today,
      },
      update: { step, reps, lapses, strength, dueDate, lastResult: status, lastSeen: today },
    });

    if (status === "knew") correct += 1;

    // XP
    if (status === "knew") xpGained += XP_KNEW + (isDue ? XP_DUE_BONUS : 0);
    if (status === "close") xpGained += XP_CLOSE;
    if (!isDue && status === "knew" && ans.golden) xpGained += XP_GOLDEN;

    results.push({
      personKey: def.key,
      name: `${def.first} ${def.last}`,
      firstName: def.first,
      emoji: def.emoji,
      emojiLabel: def.emojiLabel,
      guess: ans.guess ?? "",
      status,
      isDue,
      golden: !!ans.golden,
      strength,
      nextDue: dueDate,
      relationship: relationshipFor(reps, lapses),
    });
  }

  const total = results.length;
  const perfect = total > 0 && results.every((r) => r.status === "knew");
  if (perfect) xpGained += XP_PERFECT;

  // ── Streak: freeze-first, never cruel. One miss isn't fatal — quit-spirals are. ──
  let streak = player.streak;
  let freezes = player.freezes;
  let freezeUsed = 0;
  const last = player.lastPlayedDate;

  if (last) {
    const gap = diffDays(last, today);
    if (gap > 1) {
      const missingDays = gap - 1;
      if (freezes >= missingDays) {
        freezeUsed = missingDays;
        freezes -= missingDays;
        streak += 1; // protected
      } else {
        streak = 1; // hard reset — the freeze bank couldn't cover it
      }
    } else {
      streak += 1;
    }
  } else {
    streak = 1;
  }

  // Perfect days earn freeze credit — 5 perfect days → 1 freeze (cap 2)
  let perfectPoints = player.perfectPoints;
  let freezeEarned = false;
  if (perfect) {
    perfectPoints += 1;
    if (perfectPoints >= PERFECT_POINTS_FOR_FREEZE && freezes < FREEZE_CAP) {
      freezes += 1;
      perfectPoints = 0;
      freezeEarned = true;
    }
  }

  const updatedPlayer = await db.player.update({
    where: { id: player.id },
    data: {
      xp: player.xp + xpGained,
      streak,
      bestStreak: Math.max(player.bestStreak, streak),
      freezes,
      perfectPoints,
      lastPlayedDate: today,
    },
  });

  const dayNumber = sessionCountBefore + 1;
  await db.session.create({
    data: {
      playerId: player.id,
      date: today,
      crowdJson: JSON.stringify(results.filter((r) => !r.isDue).map((r) => r.personKey)),
      dueJson: JSON.stringify(results.filter((r) => r.isDue).map((r) => r.personKey)),
      bitesJson: JSON.stringify(results),
      correct,
      total,
      perfect,
      xpGained,
    },
  });

  // Share card (Wordle grammar: spoiler-free grid + streak)
  const gridLine = results
    .map((r) => (r.status === "knew" ? "🟩" : r.status === "close" ? "🟨" : "⬜"))
    .join("");
  const shareText = `MNEMO #${dayNumber} · The Corner Café\n${gridLine}\n${correct}/${total} names${
    perfect ? " · flawless ☕" : ""
  } · 🔥 ${streak}-day streak`;

  // Open loop for tomorrow
  const tomorrow = addDays(today, 1);
  const dueTomorrow = await db.meeting.count({
    where: { playerId: player.id, dueDate: tomorrow },
  });
  const [ty, tm, td] = tomorrow.split("-").map(Number);
  const tDow = new Date(Date.UTC(ty, tm - 1, td)).getUTCDay();
  const CROWD_SIZES: Record<number, number> = { 0: 8, 1: 6, 2: 7, 3: 7, 4: 8, 5: 9, 6: 10 };
  const teaser: Teaser = {
    dueTomorrow,
    crowdTomorrow: CROWD_SIZES[tDow] ?? 7,
  };

  const response: SubmitResponse & { rosterSize: number } = {
    dayNumber,
    correct,
    total,
    perfect,
    xpGained,
    freezeEarned,
    freezeUsed,
    results,
    player: toPlayerState(updatedPlayer),
    shareText,
    gridLine,
    teaser,
    rosterSize: ROSTER_SIZE,
  };

  return NextResponse.json(response);
}
