"use client";

// ─────────────────────────────────────────────────────────────
// MNEMO — GameShell: the whole daily ritual.
// loading → hub → meet → recall → score → done(recap)
// Plus the practice lounge: same phases, zero stakes, graded
// client-side, never persisted. The DB only ever sees the daily.
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Brain, Flame, Snowflake, Store, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VenueView from "@/components/game/VenueView";
import Hub from "@/components/game/Hub";
import MeetPhase from "@/components/game/MeetPhase";
import RecallPhase from "@/components/game/RecallPhase";
import ScorePhase from "@/components/game/ScorePhase";
import {
  AlreadyPlayedError,
  fetchToday,
  fetchVenue,
  submitSession,
  type SubmitApiResponse,
  type TodayResponse,
  type VenueResponse,
} from "@/lib/game/api";
import type { PracticePool } from "@/lib/game/crowd";
import { generatePracticeCrowd } from "@/lib/game/crowd";
import { PERSON_BY_KEY } from "@/lib/game/data";
import { matchName } from "@/lib/game/match";
import { todayStr } from "@/lib/game/srs";
import {
  relationshipFor,
  type PersonPayload,
  type PlayerState,
  type SessionResultItem,
  type SubmitBody,
  type SubmitResponse,
} from "@/lib/game/types";

type Phase = "loading" | "hub" | "meet" | "recall" | "score" | "done";

export default function GameShell() {
  const [data, setData] = useState<TodayResponse | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);

  const [scoreResponse, setScoreResponse] = useState<SubmitApiResponse | null>(null);
  const [prevPlayer, setPrevPlayer] = useState<PlayerState | null>(null);
  const answersRef = useRef<SubmitBody["answers"] | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Practice lounge state (zero-stake custom mode) ──
  const [practice, setPractice] = useState<{
    crowd: PersonPayload[];
    pool: PracticePool;
  } | null>(null);
  const [practiceResponse, setPracticeResponse] = useState<SubmitResponse | null>(null);
  const venueCacheRef = useRef<VenueResponse | null>(null);
  // Once the player dismisses the welcome, never auto-pop it again —
  // even after hub remounts (practice round-trips keep data.onboarding true).
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const dismissWelcome = useCallback(() => setWelcomeDismissed(true), []);

  const [venueOpen, setVenueOpen] = useState(false);
  const [venueData, setVenueData] = useState<VenueResponse | null>(null);
  const [venueLoading, setVenueLoading] = useState(false);
  const [venueError, setVenueError] = useState<string | null>(null);

  // Bumping reloadKey refetches /api/game/today (mount, retry, already-played fallback).
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchToday()
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setLoadError(null);
        setPhase(payload.alreadyPlayed ? "done" : "hub");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Something went wrong.");
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retryToday = () => {
    setLoadError(null);
    setPhase("loading");
    setReloadKey((k) => k + 1);
  };

  // ── Venue overlay ──────────────────────────────────────────
  const openVenue = useCallback(() => {
    setVenueOpen(true);
    setVenueLoading(true);
    setVenueError(null);
    fetchVenue()
      .then((v) => {
        venueCacheRef.current = v; // keep practice pool data fresh
        setVenueData(v);
      })
      .catch((err: unknown) =>
        setVenueError(err instanceof Error ? err.message : "The venue is unreachable.")
      )
      .finally(() => setVenueLoading(false));
  }, []);

  const closeVenue = useCallback(() => setVenueOpen(false), []);

  /** Cached venue loader — powers practice pool filters without refetching. */
  const loadVenueData = useCallback(async (): Promise<VenueResponse | null> => {
    if (venueCacheRef.current) return venueCacheRef.current;
    try {
      const v = await fetchVenue();
      venueCacheRef.current = v;
      return v;
    } catch {
      return null; // practice still works — pools fall back to anyone
    }
  }, []);

  const invalidateVenueCache = useCallback(() => {
    venueCacheRef.current = null;
  }, []);

  // ── Session flow ───────────────────────────────────────────
  const handleRecallDone = async (answers: SubmitBody["answers"]) => {
    answersRef.current = answers;
    setSubmitError(null);
    try {
      const response = await submitSession({ answers });
      setPrevPlayer(data?.player ?? null);
      setScoreResponse(response);
      invalidateVenueCache(); // meetings changed → practice pools are stale
      setData((prev) =>
        prev
          ? {
              ...prev,
              alreadyPlayed: true,
              onboarding: false, // finishing the first session graduates you
              player: response.player,
              lastSession: {
                dayNumber: response.dayNumber,
                correct: response.correct,
                total: response.total,
                perfect: response.perfect,
                results: response.results,
              },
              teaser: response.teaser,
            }
          : prev
      );
      setPhase("score");
    } catch (err) {
      if (err instanceof AlreadyPlayedError) {
        toast.error("You already played today — the recap is waiting.", {
          description: "One crowd a day. Come back tomorrow ☕",
        });
        setPhase("loading");
        setReloadKey((k) => k + 1);
        return;
      }
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit your session."
      );
    }
  };

  const retrySubmit = () => {
    if (answersRef.current) void handleRecallDone(answersRef.current);
  };

  const handleScoreDone = useCallback(() => {
    setScoreResponse(null);
    // Refetch so the recap hub shows authoritative state (mastery, onboarding…)
    setPhase("loading");
    setReloadKey((k) => k + 1);
  }, []);

  // ── Practice lounge flow (client-side, zero DB writes) ──
  const handlePracticeStart = useCallback(
    (crowd: PersonPayload[], pool: PracticePool) => {
      setPractice({ crowd, pool });
      setPracticeResponse(null);
      setPhase("meet");
    },
    []
  );

  const handlePracticeRecallDone = useCallback(
    async (answers: SubmitBody["answers"]) => {
      // Pull the latest relationship/strength data for richer result rows.
      const venue = await loadVenueData();
      const byKey = new Map((venue?.people ?? []).map((p) => [p.key, p]));

      const today = todayStr();
      const results: SessionResultItem[] = [];
      let correct = 0;
      let xpGained = 0;

      for (const ans of answers) {
        const def = PERSON_BY_KEY[ans.personKey];
        if (!def) continue;
        const status = matchName(ans.guess ?? "", def);
        if (status === "knew") {
          correct += 1;
          xpGained += 10 + (ans.golden ? 25 : 0);
        }
        if (status === "close") xpGained += 5;
        const vp = byKey.get(ans.personKey);
        results.push({
          personKey: def.key,
          name: `${def.first} ${def.last}`,
          firstName: def.first,
          emoji: def.emoji,
          emojiLabel: def.emojiLabel,
          guess: ans.guess ?? "",
          status,
          isDue: false,
          golden: !!ans.golden,
          strength: vp?.strength ?? 0,
          nextDue: today,
          relationship: vp?.relationship ?? "New Face",
        });
      }

      const total = results.length;
      const perfect = total > 0 && results.every((r) => r.status === "knew");
      if (perfect) xpGained += 25;

      const gridLine = results
        .map((r) => (r.status === "knew" ? "🟩" : r.status === "close" ? "🟨" : "⬜"))
        .join("");

      setPracticeResponse({
        dayNumber: 0, // practice has no day number
        correct,
        total,
        perfect,
        xpGained,
        freezeEarned: false,
        freezeUsed: 0,
        results,
        player: data?.player as PlayerState, // untouched by practice
        shareText: `MNEMO practice · The Corner Café\n${gridLine}\n${correct}/${total} names${
          perfect ? " · flawless ☕" : ""
        }`,
        gridLine,
        teaser: data?.teaser ?? { dueTomorrow: 0, crowdTomorrow: 0 },
      });
      setPhase("score");
    },
    [data?.player, data?.teaser, loadVenueData]
  );

  const handlePracticeDone = useCallback(() => {
    setPractice(null);
    setPracticeResponse(null);
    setPhase("hub");
  }, []);

  const handlePracticeAgain = useCallback(async () => {
    if (!practice) return;
    const venue = await loadVenueData();
    const metKeys = venue ? venue.people.map((p) => p.key) : [];
    const strengthByKey: Record<string, number> = {};
    if (venue) for (const p of venue.people) strengthByKey[p.key] = p.strength;
    const crowd = generatePracticeCrowd({
      size: practice.crowd.length,
      pool: practice.pool,
      metKeys,
      strengthByKey,
    });
    setPractice({ crowd, pool: practice.pool });
    setPracticeResponse(null);
    setPhase("meet");
  }, [practice, loadVenueData]);

  const player = data?.player;

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-screen flex-col bg-transparent">
      {/* ── Sticky header ─────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b border-amber-900/10 bg-[#fbf3e4]/85 backdrop-blur-sm"
        role="banner"
      >
        <div className="mx-auto flex w-full max-w-md flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5">
          <div
            className="flex items-center gap-1.5 font-black tracking-tight text-stone-800"
            aria-label="MNEMO"
          >
            <Brain className="size-5 text-amber-600" aria-hidden="true" />
            <span className="text-lg leading-none">MNEMO</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {player && (
              <>
                <Badge
                  className="border border-orange-200 bg-orange-100 text-orange-800"
                  aria-label={`${player.streak} day streak`}
                >
                  <Flame className="size-3.5" aria-hidden="true" />
                  {player.streak}
                </Badge>
                <Badge
                  className={`border border-stone-200 bg-stone-100 text-stone-600 ${
                    player.freezes === 0 ? "opacity-40" : ""
                  }`}
                  aria-label={`${player.freezes} streak freezes`}
                >
                  <Snowflake className="size-3.5" aria-hidden="true" />
                  {player.freezes}
                </Badge>
                <Badge
                  className="hidden border border-amber-200 bg-amber-50 text-amber-800 sm:inline-flex"
                  aria-label={`Level ${player.level}, ${player.levelTitle}`}
                >
                  Lv {player.level} · {player.levelTitle}
                </Badge>
                <Badge
                  className="border border-amber-200 bg-amber-50 text-amber-800 sm:hidden"
                  aria-label={`Level ${player.level}, ${player.levelTitle}`}
                >
                  Lv {player.level}
                </Badge>
              </>
            )}
          </div>

          {player && (
            <div className="flex w-full items-center gap-2">
              <Progress
                value={(player.xpIntoLevel / Math.max(1, player.xpForNext)) * 100}
                className="h-1.5 flex-1 bg-amber-200/60 [&_[data-slot=progress-indicator]]:bg-amber-500"
                aria-label={`XP progress: ${player.xpIntoLevel} of ${player.xpForNext} to next level`}
              />
              <span className="text-[10px] font-medium text-amber-700 tabular-nums">
                {player.xpIntoLevel}/{player.xpForNext} XP
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Game area ─────────────────────────────────────────── */}
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-8 pt-4">
        {loadError && !data ? (
          <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-stone-600">{loadError}</p>
            <Button
              onClick={retryToday}
              className="min-h-11 bg-amber-500 text-amber-950 hover:bg-amber-400"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          </section>
        ) : (
          <>
            {phase === "loading" && (
              <section
                key="loading"
                className="mnemo-slide-in flex flex-1 flex-col items-center justify-center gap-3 text-center"
                aria-busy="true"
                aria-live="polite"
              >
                <motion.div
                  animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="size-10 text-amber-600" aria-hidden="true" />
                </motion.div>
                <p className="text-sm text-stone-500">Warming up the espresso machine…</p>
              </section>
            )}

            {(phase === "hub" || phase === "done") && data && (
              <section key={phase} className="mnemo-slide-in" aria-label="Daily hub">
                <Hub
                  data={data}
                  onPlay={() => setPhase("meet")}
                  onVenue={openVenue}
                  onPracticeStart={handlePracticeStart}
                  loadVenueData={loadVenueData}
                  autoWelcome={!welcomeDismissed}
                  onWelcomeDismiss={dismissWelcome}
                />
              </section>
            )}

            {phase === "meet" && data && (
              <section key="meet" className="mnemo-slide-in" aria-label="Meet the crowd">
                <MeetPhase
                  crowd={practice ? practice.crowd : data.crowd}
                  onboarding={practice ? false : data.onboarding}
                  onDone={() => setPhase("recall")}
                />
              </section>
            )}

            {phase === "recall" && data && !submitError && (
              <section key="recall" className="mnemo-slide-in" aria-label="Recall the names">
                <RecallPhase
                  crowd={practice ? practice.crowd : data.crowd}
                  dueFriends={practice ? [] : data.dueFriends}
                  onboarding={practice ? false : data.onboarding}
                  onDone={(answers) =>
                    practice
                      ? void handlePracticeRecallDone(answers)
                      : void handleRecallDone(answers)
                  }
                />
              </section>
            )}

            {phase === "recall" && submitError && (
              <section
                key="recall-error"
                className="mnemo-slide-in flex flex-1 flex-col items-center justify-center gap-4 text-center"
              >
                <p className="text-stone-600">{submitError}</p>
                <Button
                  onClick={retrySubmit}
                  className="min-h-11 bg-amber-500 text-amber-950 hover:bg-amber-400"
                >
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Send results again
                </Button>
              </section>
            )}

            {phase === "score" && !practice && scoreResponse && (
              <section key="score" className="mnemo-slide-in" aria-label="Session score">
                <ScorePhase
                  response={scoreResponse}
                  prevPlayer={prevPlayer}
                  onVenue={openVenue}
                  onDone={handleScoreDone}
                />
              </section>
            )}

            {phase === "score" && practice && practiceResponse && (
              <section key="practice-score" className="mnemo-slide-in" aria-label="Practice score">
                <ScorePhase
                  response={practiceResponse}
                  practice
                  onVenue={openVenue}
                  onDone={handlePracticeDone}
                  onAgain={handlePracticeAgain}
                />
              </section>
            )}
          </>
        )}
      </main>

      {/* ── Sticky footer ─────────────────────────────────────── */}
      <footer
        className="mt-auto border-t border-amber-900/10 bg-[#fbf3e4]/60 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 text-center"
        role="contentinfo"
      >
        <p className="text-xs font-medium text-stone-600">
          MNEMO — your memory is the save file · one crowd a day
        </p>
        <p className="mt-0.5 text-[10px] text-stone-400">
          built on spaced-repetition science ·{" "}
          <a
            href="/downloads/mnemo-game.zip"
            download
            className="underline decoration-stone-300 underline-offset-2 transition-colors hover:text-amber-700"
          >
            download source
          </a>
        </p>
      </footer>

      {/* ── Venue overlay ─────────────────────────────────────── */}
      {venueOpen && (
        <div
          key="venue"
          className="mnemo-slide-in fixed inset-0 z-50 overflow-y-auto scrollbar-cozy bg-[#fbf3e4]"
          role="dialog"
          aria-label="The Venue"
        >
            {venueLoading && (
              <div className="flex min-h-full flex-col items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Store className="size-10 text-amber-600" aria-hidden="true" />
                </motion.div>
                <p className="text-sm text-stone-500">Walking over to the café…</p>
              </div>
            )}
            {venueError && !venueLoading && (
              <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center">
                <p className="text-stone-600">{venueError}</p>
                <Button
                  onClick={closeVenue}
                  className="min-h-11 bg-amber-500 text-amber-950 hover:bg-amber-400"
                >
                  Back to the hub
                </Button>
              </div>
            )}
            {venueData && !venueLoading && !venueError && (
              <VenueView data={venueData} onClose={closeVenue} />
            )}
        </div>
      )}
    </div>
    </MotionConfig>
  );
}
