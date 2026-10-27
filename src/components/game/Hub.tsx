"use client";

// ─────────────────────────────────────────────────────────────
// MNEMO — Hub: the daily ritual home.
// Greeting → recap (if played) or Due Friends + Daily Crowd → teaser.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  Dumbbell,
  MoonStar,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Portrait from "@/components/game/Portrait";
import PracticeSetup from "@/components/game/PracticeSetup";
import type { TodayResponse, VenueResponse } from "@/lib/game/api";
import type { PracticePool } from "@/lib/game/crowd";
import type { PersonPayload } from "@/lib/game/types";

interface HubProps {
  data: TodayResponse;
  onPlay: () => void;
  onVenue: () => void;
  onPracticeStart: (crowd: PersonPayload[], pool: PracticePool) => void;
  loadVenueData: () => Promise<VenueResponse | null>;
  /** True only until the player dismisses the welcome once. */
  autoWelcome: boolean;
  onWelcomeDismiss: () => void;
}

function greeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning, early bird ☕";
  if (h >= 12 && h < 17) return "Good afternoon, name-collector ☕";
  if (h >= 17 && h < 22) return "Good evening, night owl ☕";
  return "Up late? The café's still warm ☕";
}

function utcDow(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sunday
}

function hasTwinNames(crowd: PersonPayload[]): boolean {
  const seen = new Set<string>();
  for (const p of crowd) {
    if (seen.has(p.first)) return true;
    seen.add(p.first);
  }
  return false;
}

function recapGrid(data: TodayResponse): string {
  if (!data.lastSession) return "";
  return data.lastSession.results
    .map((r) => (r.status === "knew" ? "🟩" : r.status === "close" ? "🟨" : "⬜"))
    .join("");
}

export default function Hub({
  data,
  onPlay,
  onVenue,
  onPracticeStart,
  loadVenueData,
  autoWelcome,
  onWelcomeDismiss,
}: HubProps) {
  const [welcomeOpen, setWelcomeOpen] = useState(autoWelcome && data.onboarding);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const metCount = data.metCount ?? 0;
  const rosterSize = data.rosterSize;
  const { player, crowd, dueFriends, teaser } = data;

  const twinDay = hasTwinNames(crowd);
  const golden = crowd.some((p) => p.golden);
  const reunionSunday = utcDow(data.today) === 0;
  const totalToday = crowd.length + dueFriends.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
          {greeting()}
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          The Corner Café · {data.today}
        </p>
      </motion.div>

      {/* ── Already played: recap + open loop, streak preserved ── */}
      {data.alreadyPlayed && data.lastSession ? (
        <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-stone-800">
              <Coffee className="size-5 text-amber-600" aria-hidden="true" />
              Today's crowd has gone home
            </CardTitle>
            <CardDescription>
              Day {data.lastSession.dayNumber} ·{" "}
              {data.lastSession.perfect
                ? "flawless ☕"
                : `${data.lastSession.correct}/${data.lastSession.total} names`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div
              className="flex flex-wrap gap-1.5"
              aria-label={`Results grid: ${recapGrid(data)}`}
            >
              {Array.from(recapGrid(data)).map((sq, i) => (
                <span
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-base"
                  aria-hidden="true"
                >
                  {sq}
                </span>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-sm text-stone-600">
              <MoonStar className="size-4 text-amber-500" aria-hidden="true" />
              See you tomorrow — {teaser.dueTomorrow} memories mature tonight.
            </p>
            <Button
              onClick={onVenue}
              variant="outline"
              className="min-h-11 border-amber-300 text-amber-800 hover:bg-amber-50"
            >
              <Store className="size-4" aria-hidden="true" />
              Visit the café
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* ── Due friends strip ── */}
          {dueFriends.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
                <CardHeader>
                  <CardTitle className="text-base text-stone-800">
                    {dueFriends.length} {dueFriends.length === 1 ? "friend is" : "friends are"} dropping by
                  </CardTitle>
                  <CardDescription>
                    Their memories are fading — say their names before they slip.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex gap-3 overflow-x-auto pb-1 scrollbar-cozy">
                    {dueFriends.map((p) => (
                      <li
                        key={p.key}
                        className="flex w-16 shrink-0 flex-col items-center gap-1"
                      >
                        <Portrait appearance={p.appearance} featureId={p.featureId} size={44} />
                        <span className="w-full truncate text-center text-[10px] font-medium text-stone-600">
                          {p.relationship ?? "Returning"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── The Daily Crowd ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          >
            <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-md shadow-amber-100">
              <CardHeader>
                <CardTitle className="text-xl text-stone-800 sm:text-2xl">
                  {crowd.length} new faces at The Corner Café
                </CardTitle>
                <CardDescription>
                  {totalToday} {totalToday === 1 ? "person" : "people"} to meet today —
                  learn them once, keep them forever.
                </CardDescription>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {twinDay && (
                    <Badge className="border border-stone-200 bg-stone-100 text-stone-700">
                      <Users className="size-3" aria-hidden="true" />
                      Twin Day
                    </Badge>
                  )}
                  {golden && (
                    <Badge className="border border-amber-300 bg-amber-100 text-amber-800">
                      <Sparkles className="size-3" aria-hidden="true" />
                      A mystery guest lurks
                    </Badge>
                  )}
                  {reunionSunday && (
                    <Badge className="border border-orange-200 bg-orange-100 text-orange-800">
                      <Coffee className="size-3" aria-hidden="true" />
                      Reunion Sunday
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={onPlay}
                  className="h-14 w-full rounded-2xl bg-amber-500 text-base font-bold text-amber-950 shadow-sm hover:bg-amber-400"
                  aria-label="Open the doors and meet today's crowd"
                >
                  Open the doors
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {/* ── Practice lounge (custom mode — zero stakes) ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      >
        <Card className="rounded-2xl border-dashed border-stone-300 bg-white/60 shadow-none">
          <CardContent className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500"
              aria-hidden="true"
            >
              <Dumbbell className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-700">Practice lounge</p>
              <p className="text-xs text-stone-500">
                {data.alreadyPlayed
                  ? "The café's yours — build a custom crowd and keep the reps going."
                  : "Warm up before the crowd arrives. Custom rounds, zero stakes."}
              </p>
            </div>
            <Button
              onClick={() => setPracticeOpen(true)}
              variant="outline"
              className="min-h-11 shrink-0 rounded-xl border-stone-300 text-stone-700 hover:bg-stone-100"
            >
              Set up a round
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Endowed progress: Café Mastery ── */}
      <Card className="rounded-2xl border-amber-200/80 bg-[#fffaf0] shadow-sm shadow-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-stone-800">
            <Coffee className="size-4 text-amber-600" aria-hidden="true" />
            Café Mastery
          </CardTitle>
          <CardDescription>
            {metCount}/{data.rosterSize} regulars met — every name you learn moves this meter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={rosterSize ? (metCount / data.rosterSize) * 100 : 0}
            className="h-2 bg-amber-200/60 [&_[data-slot=progress-indicator]]:bg-amber-500"
            aria-label="Café mastery progress"
          />
        </CardContent>
      </Card>

      {/* ── Tomorrow's open loop (Zeigarnik) ── */}
      <div className="flex flex-col items-center gap-2">
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-stone-500">
          <MoonStar className="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
          Tomorrow: {teaser.dueTomorrow} returning friends + {teaser.crowdTomorrow} new faces.
        </p>
        <button
          type="button"
          onClick={() => setWelcomeOpen(true)}
          className="min-h-9 rounded-lg px-2 text-[11px] text-stone-400 underline decoration-stone-300 underline-offset-2 transition-colors hover:text-amber-700"
        >
          How to play
        </button>
      </div>

      {/* ── FTUE welcome (cannot be dismissed by tapping outside) ── */}
      <Dialog
        open={welcomeOpen}
        onOpenChange={(open) => {
          if (open) setWelcomeOpen(true);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="rounded-2xl border-amber-200 bg-[#fffaf0] sm:max-w-sm"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-stone-800">
              Welcome to The Corner Café ☕
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2 pt-1 text-left text-sm text-stone-600">
              <span>You're the new face in the neighborhood — and this café gets a fresh crowd every day.</span>
              <span>Every name here has a picture hiding inside it. You'll learn the trick by playing it.</span>
              <span>The same crowd visits everyone once a day. Today, they're yours.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setWelcomeOpen(false);
                onWelcomeDismiss();
              }}
              className="min-h-11 w-full rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400 sm:w-full"
            >
              Take off your coat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Practice setup (custom mode) ── */}
      <PracticeSetup
        open={practiceOpen}
        onOpenChange={setPracticeOpen}
        loadVenueData={loadVenueData}
        onStart={onPracticeStart}
      />
    </div>
  );
}
