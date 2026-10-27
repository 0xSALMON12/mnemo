import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PERSON_BY_KEY, ROSTER_SIZE } from "@/lib/game/data";
import { featureOf } from "@/lib/game/features";
import { getOrCreatePlayer, toPlayerState } from "@/lib/game/player";
import { todayStr } from "@/lib/game/srs";
import { relationshipFor, type VenuePayload, type VenuePerson } from "@/lib/game/types";

export async function GET() {
  const player = await getOrCreatePlayer();
  const today = todayStr();

  const meetings = await db.meeting.findMany({
    where: { playerId: player.id },
    orderBy: [{ dueDate: "asc" }, { strength: "desc" }],
  });

  const people: VenuePerson[] = meetings
    .map((mtg): VenuePerson | null => {
      const def = PERSON_BY_KEY[mtg.personKey];
      if (!def) return null;
      return {
        key: def.key,
        first: def.first,
        last: def.last,
        emoji: def.emoji,
        emojiLabel: def.emojiLabel,
        feature: featureOf(def.featureId),
        appearance: def.appearance,
        bio: def.bio,
        strength: mtg.strength,
        reps: mtg.reps,
        lapses: mtg.lapses,
        relationship: relationshipFor(mtg.reps, mtg.lapses),
        nextDue: mtg.dueDate,
        dueToday: mtg.dueDate <= today,
      };
    })
    .filter((x): x is VenuePerson => x !== null);

  const payload: VenuePayload & { rosterSize: number } = {
    people,
    mastery: {
      met: meetings.length,
      total: ROSTER_SIZE,
      pct: ROSTER_SIZE ? Math.round((meetings.length / ROSTER_SIZE) * 100) : 0,
    },
    player: toPlayerState(player),
    rosterSize: ROSTER_SIZE,
  };

  return NextResponse.json(payload);
}
