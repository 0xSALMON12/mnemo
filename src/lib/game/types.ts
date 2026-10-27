// ─────────────────────────────────────────────────────────────
// MNEMO — shared types. THE contract between backend and frontend.
// ─────────────────────────────────────────────────────────────

export type RecallStatus = "knew" | "close" | "missed";

/** Visual recipe for the procedural SVG portrait. */
export interface Appearance {
  skin: number; // index into SKIN_TONES
  hair: number; // index into HAIR_COLORS
  shirt: number; // index into SHIRT_COLORS
  hairBase: "short" | "medium" | "long" | "buzz";
}

export interface FeatureDef {
  id: string; // e.g. "glasses"
  label: string; // e.g. "Glasses"
  /** Coordinates (0-100 viewBox space) where the highlight ring lands. */
  x: number;
  y: number;
  r: number;
}

/** A person in the crowd — portrait, name, and the mnemonic payload. */
export interface PersonDef {
  key: string;
  first: string;
  last: string;
  aliases?: string[]; // accepted nicknames (mike → michael)
  emoji: string; // the name-image (Gordon → 🌷 garden)
  emojiLabel: string;
  featureId: string; // distinguishing feature (the "file")
  appearance: Appearance;
  bio: string;
}

/** Person as sent to the client. */
export interface PersonPayload extends PersonDef {
  feature: FeatureDef;
  /** Present only for returning friends in recall/score. */
  isDue?: boolean;
  strength?: number; // 0..1
  relationship?: string;
  nextDue?: string; // YYYY-MM-DD
  golden?: boolean; // rare mystery guest
}

export interface PlayerState {
  xp: number;
  level: number;
  levelTitle: string;
  xpIntoLevel: number; // xp within current level
  xpForNext: number; // xp needed for next level (denominator)
  streak: number;
  bestStreak: number;
  freezes: number;
  perfectPoints: number; // progress toward next freeze (out of 5)
}

export interface SessionResultItem {
  personKey: string;
  name: string; // full name
  firstName: string;
  emoji: string;
  emojiLabel: string;
  guess: string;
  status: RecallStatus;
  isDue: boolean;
  golden: boolean;
  strength: number;
  nextDue: string;
  relationship: string;
}

export interface Teaser {
  dueTomorrow: number;
  crowdTomorrow: number;
}

export interface TodayPayload {
  today: string; // YYYY-MM-DD
  onboarding: boolean; // true = never played before → FTUE mode
  alreadyPlayed: boolean;
  player: PlayerState;
  crowd: PersonPayload[];
  dueFriends: PersonPayload[];
  metCount?: number; // regulars met so far (Café Mastery meter)
  lastSession?: {
    dayNumber: number;
    correct: number;
    total: number;
    perfect: boolean;
    results: SessionResultItem[];
  };
  teaser: Teaser;
}

export interface SubmitBody {
  answers: { personKey: string; guess: string; isDue: boolean; golden?: boolean }[];
}

export interface SubmitResponse {
  dayNumber: number;
  correct: number;
  total: number;
  perfect: boolean;
  xpGained: number;
  freezeEarned: boolean;
  freezeUsed: number; // freezes auto-consumed to protect the streak
  results: SessionResultItem[];
  player: PlayerState;
  shareText: string;
  gridLine: string; // 🟩🟨⬜ line
  teaser: Teaser;
}

export interface VenuePerson {
  key: string;
  first: string;
  last: string;
  emoji: string;
  emojiLabel: string;
  feature: FeatureDef;
  appearance: Appearance;
  bio: string;
  strength: number;
  reps: number;
  lapses: number;
  relationship: string;
  nextDue: string;
  dueToday: boolean;
}

export interface VenuePayload {
  people: VenuePerson[];
  mastery: { met: number; total: number; pct: number };
  player: PlayerState;
}

// ─── Game constants (mirrored by backend logic) ───

export const STABILITY_LADDER = [1, 3, 7, 14, 30, 90, 180]; // days per step
export const MAX_DUE_PER_DAY = 6;
export const FREEZE_CAP = 2;
export const PERFECT_POINTS_FOR_FREEZE = 5;

export const CROWD_SIZES: Record<number, number> = {
  0: 8, // Sun
  1: 6, // Mon
  2: 7,
  3: 7,
  4: 8,
  5: 9, // Fri
  6: 10, // Sat (twin day)
};

export const LEVEL_TITLES = [
  "New Face", // L1
  "Barista's Friend", // L2
  "Name-Knower", // L3
  "Feature Finder", // L4
  "Regular", // L5
  "Palace Walker", // L6
  "Mnemonist", // L7
  "Memory Athlete", // L8
  "Grandmaster", // L9
];

export const RELATIONSHIPS = [
  { min: 0, label: "New Face" },
  { min: 2, label: "Acquaintance" },
  { min: 4, label: "Regular" },
  { min: 7, label: "Friend" },
  { min: 10, label: "Close Friend" },
];

export function relationshipFor(reps: number, lapses: number): string {
  const net = Math.max(0, reps - lapses);
  let label = RELATIONSHIPS[0].label;
  for (const r of RELATIONSHIPS) if (net >= r.min) label = r.label;
  return label;
}

export function levelFor(xp: number): {
  level: number;
  title: string;
  xpIntoLevel: number;
  xpForNext: number;
} {
  const level = Math.min(LEVEL_TITLES.length, Math.floor(xp / 120) + 1);
  const xpIntoLevel = xp % 120;
  const xpForNext = 120;
  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    xpIntoLevel,
    xpForNext,
  };
}
