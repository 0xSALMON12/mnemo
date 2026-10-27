"use client";

// ─────────────────────────────────────────────────────────────
// MNEMO — ScorePhase: the payoff + the open loop.
// Grid grammar, XP count-up, streak & freeze story, grouped
// results, share card, and tomorrow's Zeigarnik hook.
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Dumbbell,
  Flame,
  MoonStar,
  ShieldCheck,
  Snowflake,
  Store,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ShareCard from "@/components/game/ShareCard";
import Portrait from "@/components/game/Portrait";
import { PERSON_BY_KEY } from "@/lib/game/data";
import type { PlayerState, SessionResultItem, SubmitResponse } from "@/lib/game/types";

interface ScorePhaseProps {
  response: SubmitResponse;
  prevPlayer?: PlayerState | null;
  onVenue: () => void;
  onDone: () => void;
  /** Practice rounds are graded client-side and bank nothing. */
  practice?: boolean;
  /** Present only in practice → shows the "Practice again" action. */
  onAgain?: () => void;
}

const CONFETTI_EMOJI = ["☕", "🎉", "⭐", "🧠"];
const gridClass: Record<string, string> = {
  "🟩": "bg-emerald-500",
  "🟨": "bg-amber-400",
  "⬜": "bg-stone-200",
};

function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target <= 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function relativeDue(nextDue: string): string {
  const [y, m, d] = nextDue.split("-").map(Number);
  const due = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.round((due - today) / 86_400_000);
  if (days <= 1) return "tomorrow";
  return `in ${days}d`;
}

function statusIcon(status: SessionResultItem["status"]): {
  Icon: typeof Check;
  cls: string;
} {
  if (status === "knew") return { Icon: Check, cls: "bg-emerald-500" };
  if (status === "close") return { Icon: AlertTriangle, cls: "bg-amber-400" };
  return { Icon: X, cls: "bg-rose-500" };
}

export default function ScorePhase({
  response,
  prevPlayer,
  onVenue,
  onDone,
  practice = false,
  onAgain,
}: ScorePhaseProps) {
  const { player, results } = response;
  const xpShown = useCountUp(response.xpGained);

  const toastedRef = useRef(false);
  useEffect(() => {
    if (toastedRef.current) return;
    toastedRef.current = true;
    if (prevPlayer && player.level > prevPlayer.level) {
      toast.success(`Level up! You're now ${player.levelTitle} ✦`, {
        description: "The café notices people like you.",
      });
    }
  }, [prevPlayer, player.level, player.levelTitle]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        emoji: CONFETTI_EMOJI[i % CONFETTI_EMOJI.length],
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.2 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 90,
      })),
    []
  );

  const dueResults = results.filter((r) => r.isDue);
  const newResults = results.filter((r) => !r.isDue);

  const renderRow = (r: SessionResultItem) => {
    const { Icon, cls } = statusIcon(r.status);
    const def = PERSON_BY_KEY[r.personKey];
    return (
      <li key={r.personKey} className="flex items-center gap-3 py-2">
        {def ? (
          <Portrait appearance={def.appearance} featureId={def.featureId} size={40} />
        ) : (
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg"
            aria-hidden="true"
          >
            {r.emoji}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-stone-800">{r.name}</p>
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full text-white ${cls}`}
              aria-label={
                r.status === "knew" ? "knew it" : r.status === "close" ? "so close" : "missed"
              }
            >
              <Icon className="size-3" aria-hidden="true" />
            </span>
          </div>
          <p className="truncate text-xs text-stone-500">
            you said: {r.guess.trim() ? r.guess : "…"}
          </p>
          <p className="truncate text-xs text-stone-500">
            <span aria-hidden="true">{r.emoji}</span> {r.emojiLabel}
            {!practice && <> · back {relativeDue(r.nextDue)}</>}
          </p>
        </div>
        <Badge
          variant="outline"
          className="shrink-0 border-stone-200 bg-stone-50 text-[10px] text-stone-600"
        >
          {r.relationship}
        </Badge>
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Confetti on a flawless day */}
      {response.perfect && (
        <div
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          aria-hidden="true"
        >
          {confetti.map((c, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{ left: `${c.left}%`, top: "-8vh" }}
              initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
              animate={{ y: "115vh", x: c.drift, rotate: 260, opacity: [1, 1, 0.8, 0] }}
              transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
            >
              {c.emoji}
            </motion.span>
          ))}
        </div>
      )}

      {/* ── Header ── */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="text-center"
      >
        {response.perfect ? (
          <>
            <h1 className="text-3xl font-black tracking-tight text-amber-700 sm:text-4xl">
              {practice ? "PRACTICE PERFECT ☕" : "FLAWLESS DAY ☕"}
            </h1>
            <p className="mt-1 text-sm font-medium text-stone-600">
              {response.correct}/{response.total} names — the whole crowd, remembered.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-black tracking-tight text-stone-800 sm:text-4xl">
              {response.correct}/{response.total} names
            </h1>
            <p className="mt-1 text-sm font-medium text-stone-500">
              {practice ? (
                <span className="inline-flex items-center gap-1.5">
                  <Dumbbell className="size-3.5" aria-hidden="true" />
                  Practice round · no stakes
                </span>
              ) : (
                <>Day {response.dayNumber} · The Corner Café</>
              )}
            </p>
          </>
        )}

        {/* Grid line — Wordle grammar, spoiler-free */}
        <div
          className="mt-4 flex flex-wrap justify-center gap-1.5"
          aria-label={`Results grid: ${response.gridLine}`}
        >
          {Array.from(response.gridLine).map((sq, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 300, damping: 16 }}
              className={`h-7 w-7 rounded-md ${gridClass[sq] ?? "bg-stone-200"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── XP block ── */}
      <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
        <CardContent className="flex items-center gap-4 px-4 py-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Zap className="size-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            {practice ? (
              <>
                <p className="text-lg font-bold tabular-nums text-stone-800">
                  +{xpShown} practice pts
                </p>
                <p className="text-xs text-stone-500">
                  Off the record — practice never banks XP.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold tabular-nums text-stone-800">
                  +{xpShown} XP
                </p>
                <Progress
                  value={(player.xpIntoLevel / Math.max(1, player.xpForNext)) * 100}
                  className="mt-1.5 h-2 bg-amber-200/60 [&_[data-slot=progress-indicator]]:bg-amber-500"
                  aria-label={`XP: ${player.xpIntoLevel} of ${player.xpForNext} to next level`}
                />
              </>
            )}
          </div>
          <Badge className="shrink-0 border border-amber-200 bg-amber-50 text-amber-800">
            Lv {player.level} · {player.levelTitle}
          </Badge>
        </CardContent>
      </Card>

      {/* ── Streak block (practice: reassurance card instead) ── */}
      {practice ? (
        <Card className="rounded-2xl border-emerald-200/80 bg-emerald-50/60 shadow-sm">
          <CardContent className="flex items-center gap-3 px-4 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm text-stone-600">
              Your <span className="font-bold text-stone-800">{player.streak}-day streak</span> and
              memories are untouched — practice is a back room, not the books.
            </p>
          </CardContent>
        </Card>
      ) : (
      <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
        <CardContent className="flex flex-col gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Flame className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-bold text-stone-800">
                {player.streak}-day streak
              </p>
              <p className="text-xs text-stone-500">
                best: {player.bestStreak} days
              </p>
            </div>
          </div>

          {response.freezeUsed > 0 && (
            <p className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-600">
              <Snowflake className="size-4 shrink-0 text-stone-500" aria-hidden="true" />
              Streak Freeze saved your streak
            </p>
          )}
          {response.freezeEarned && (
            <p className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
              <Snowflake className="size-4 shrink-0" aria-hidden="true" />
              Perfect-day bonus: Streak Freeze earned!
            </p>
          )}

          <div>
            <div className="mb-1 flex justify-between text-[11px] font-medium text-stone-500">
              <span>perfect days toward next freeze</span>
              <span className="tabular-nums">
                {player.perfectPoints}/5
              </span>
            </div>
            <Progress
              value={(player.perfectPoints / 5) * 100}
              className="h-2 bg-stone-200/70 [&_[data-slot=progress-indicator]]:bg-amber-500"
              aria-label={`${player.perfectPoints} of 5 perfect days toward the next streak freeze`}
            />
          </div>
        </CardContent>
      </Card>
      )}

      {/* ── Results, grouped ── */}
      <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
        <CardHeader className="pb-0">
          <CardTitle className="text-base text-stone-800">The walk-through</CardTitle>
          <CardDescription>How each face landed.</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="max-h-96 overflow-y-auto scrollbar-cozy">
            {dueResults.length > 0 && (
              <section aria-label="Returning friends">
                <h3 className="px-1 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Returning friends
                </h3>
                <ul className="divide-y divide-amber-100">{dueResults.map(renderRow)}</ul>
              </section>
            )}
            {newResults.length > 0 && (
              <section aria-label="Today's new faces">
                <h3 className="px-1 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Today&apos;s new faces
                </h3>
                <ul className="divide-y divide-amber-100">{newResults.map(renderRow)}</ul>
              </section>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Share card ── */}
      <ShareCard
        shareText={response.shareText}
        gridLine={response.gridLine}
        dayNumber={response.dayNumber}
        correct={response.correct}
        total={response.total}
        perfect={response.perfect}
        practice={practice}
      />

      {/* ── Open loop (Zeigarnik) — daily only ── */}
      {!practice && (
        <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
          <CardContent className="flex items-center gap-3 px-4 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <MoonStar className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm text-stone-600">
              Tonight, <span className="font-bold text-stone-800">{response.teaser.dueTomorrow}</span>{" "}
              memories mature. Tomorrow brings{" "}
              <span className="font-bold text-stone-800">{response.teaser.crowdTomorrow}</span> new
              faces.
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── Actions ── */}
      <div className="flex flex-col gap-2 pb-2 sm:flex-row">
        {practice && onAgain ? (
          <>
            <Button
              onClick={onAgain}
              className="min-h-11 flex-1 rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400"
            >
              <Dumbbell className="size-4" aria-hidden="true" />
              Practice again
            </Button>
            <Button
              onClick={onDone}
              variant="outline"
              className="min-h-11 flex-1 rounded-xl border-amber-300 text-amber-800 hover:bg-amber-50"
            >
              Back to the café
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={onVenue}
              variant="outline"
              className="min-h-11 flex-1 rounded-xl border-amber-300 text-amber-800 hover:bg-amber-50"
            >
              <Store className="size-4" aria-hidden="true" />
              Visit the café
            </Button>
            <Button
              onClick={onDone}
              className="min-h-11 flex-1 rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400"
            >
              Done
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
