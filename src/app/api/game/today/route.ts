import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateCrowd } from "@/lib/game/crowd";
import { PERSON_BY_KEY, ROSTER_SIZE } from "@/lib/game/data";
import { featureOf } from "@/lib/game/features";
import { getOrCreatePlayer, toPlayerState } from "@/lib/game/player";
import { addDays, todayStr } from "@/lib/game/srs";
import {
  MAX_DUE_PER_DAY,
  CROWD_SIZES,
  relationshipFor,
  type PersonPayload,
  type SessionResultItem,
  type TodayPayload,
} from "@/lib/game/types";

export async function GET() {
  const player = await getOrCreatePlayer();
  const today = todayStr();

  const [sessionCount, todaySession] = await Promise.all([
    db.session.count({ where: { playerId: player.id } }),
    db.session.findUnique({
      where: { playerId_date: { playerId: player.id, date: today } },
    }),
  ]);

  const alreadyPlayed = !!todaySession;
  const onboarding = sessionCount === 0;

  // The shared daily crowd (deterministic per date — everyone gets the same one)
  const crowd: PersonPayload[] = generateCrowd(today, { onboarding });

  // Due friends — your decaying memories, due today (the FSRS queue = the quest)
  const dueMeetings = await db.meeting.findMany({
    where: { playerId: player.id, dueDate: { lte: today } },
    orderBy: { dueDate: "asc" },
    take: MAX_DUE_PER_DAY,
  });

  const dueFriends: PersonPayload[] = dueMeetings
    .map((mtg): PersonPayload | null => {
      const def = PERSON_BY_KEY[mtg.personKey];
      if (!def) return null;
      return {
        ...def,
        feature: featureOf(def.featureId),
        isDue: true,
        strength: mtg.strength,
        relationship: relationshipFor(mtg.reps, mtg.lapses),
        nextDue: mtg.dueDate,
      };
    })
    .filter((x): x is PersonPayload => x !== null);

  let lastSession: TodayPayload["lastSession"];
  if (todaySession) {
    const bites = JSON.parse(todaySession.bitesJson) as SessionResultItem[];
    lastSession = {
      dayNumber: sessionCount,
      correct: todaySession.correct,
      total: todaySession.total,
      perfect: todaySession.perfect,
      results: bites,
    };
  }

  // Tomorrow's open loop (Zeigarnik): what's maturing overnight
  const tomorrow = addDays(today, 1);
  const [dueTomorrow, metCount] = await Promise.all([
    db.meeting.count({ where: { playerId: player.id, dueDate: tomorrow } }),
    db.meeting.count({ where: { playerId: player.id } }),
  ]);

  const [y2, m2, d2] = tomorrow.split("-").map(Number);
  const tomorrowDow = new Date(Date.UTC(y2, m2 - 1, d2)).getUTCDay();

  const payload: TodayPayload & { rosterSize: number } = {
    today,
    onboarding,
    alreadyPlayed,
    player: toPlayerState(player),
    crowd,
    dueFriends,
    metCount,
    lastSession,
    teaser: { dueTomorrow, crowdTomorrow: CROWD_SIZES[tomorrowDow] ?? 7 },
    rosterSize: ROSTER_SIZE,
  };

  return NextResponse.json(payload);
}
