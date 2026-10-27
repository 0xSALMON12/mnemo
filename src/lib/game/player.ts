import { cookies } from "next/headers";
import { db } from "@/lib/db";
import type { Player } from "@prisma/client";
import type { PlayerState } from "./types";
import { levelFor } from "./types";

const COOKIE = "mnemo_pid";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function getOrCreatePlayer(): Promise<Player> {
  const jar = await cookies();
  const existing = jar.get(COOKIE)?.value;

  if (existing) {
    const found = await db.player.findUnique({ where: { id: existing } });
    if (found) return found;
  }

  const created = await db.player.create({ data: {} });
  jar.set(COOKIE, created.id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: ONE_YEAR,
    path: "/",
  });
  return created;
}

export function toPlayerState(p: Player): PlayerState {
  const lvl = levelFor(p.xp);
  return {
    xp: p.xp,
    level: lvl.level,
    levelTitle: lvl.title,
    xpIntoLevel: lvl.xpIntoLevel,
    xpForNext: lvl.xpForNext,
    streak: p.streak,
    bestStreak: p.bestStreak,
    freezes: p.freezes,
    perfectPoints: p.perfectPoints,
  };
}
