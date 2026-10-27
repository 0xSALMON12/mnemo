"use client";

// ─────────────────────────────────────────────────────────────
// MNEMO — MeetPhase: the ENCODING phase.
// Teaches the mnemonic technique BY playing it, one person at a time:
//   Step 1  Face File    — spot the distinguishing feature
//   Step 2  Sound-Alike  — pick the name's picture
//   Step 3  Fusion       — fly the image onto the feature anchor
// No penalties here: encoding is a gift, not a test.
//
// State machine: single `cursor` state { personIndex, step } so person and
// step can never desync. `goNext` is idempotent per person (advancedRef)
// so double-fires (auto-timer + user click racing) can't skip or duplicate.
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Portrait from "@/components/game/Portrait";
import { FEATURES } from "@/lib/game/features";
import { PEOPLE } from "@/lib/game/data";
import { hashString, mulberry32, shuffle } from "@/lib/game/rng";
import type { FeatureDef, PersonPayload } from "@/lib/game/types";

export interface MetPerson {
  personKey: string;
  golden: boolean;
}

interface MeetPhaseProps {
  crowd: PersonPayload[];
  onboarding: boolean;
  onDone: (met: MetPerson[]) => void;
}

const FUSION_AUTO_MS = 2600; // give the scene time to land before auto-advance

export default function MeetPhase({ crowd, onboarding, onDone }: MeetPhaseProps) {
  // cursor.personIndex + cursor.step always move together through transitions
  const [cursor, setCursor] = useState({ personIndex: 0, step: 0 });
  const [solved1, setSolved1] = useState(false);
  const [solved2, setSolved2] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [shuffling, setShuffling] = useState(false);

  const metRef = useRef<MetPerson[]>([]);
  const advancedRef = useRef<number>(-1); // last personIndex already pushed to metRef
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const { personIndex, step } = cursor;
  const person = crowd[personIndex];
  const isLastPerson = personIndex >= crowd.length - 1;

  // ── Seeded, stable option sets per person ────────────────────
  const featureOptions: FeatureDef[] = useMemo(() => {
    if (!person) return [];
    const rng = mulberry32(hashString("meet-face-" + person.key));
    const others = Object.values(FEATURES).filter((f) => f.id !== person.featureId);
    const distractors = shuffle(others, rng).slice(0, 2);
    return shuffle([person.feature, ...distractors], rng);
  }, [person]);

  const emojiOptions: { emoji: string; label: string; correct: boolean }[] = useMemo(() => {
    if (!person) return [];
    const rng = mulberry32(hashString("meet-sound-" + person.key));
    const pool = PEOPLE.filter((p) => p.key !== person.key && p.emoji !== person.emoji);
    const distractorPeople = shuffle(pool, rng).slice(0, 2);
    const options = [
      { emoji: person.emoji, label: person.emojiLabel, correct: true },
      ...distractorPeople.map((p) => ({ emoji: p.emoji, label: p.emojiLabel, correct: false })),
    ];
    return shuffle(options, rng);
  }, [person]);

  /** Idempotent: each person can only be recorded once, no matter how
   *  many times the auto-timer and the Next button race each other. */
  const goNext = () => {
    if (!person) return;
    if (advancedRef.current === personIndex) return;
    advancedRef.current = personIndex;
    metRef.current.push({ personKey: person.key, golden: person.golden ?? false });
    if (isLastPerson) {
      onDoneRef.current([...metRef.current]);
    } else {
      setShuffling(true);
    }
  };

  // ── All timers in ONE effect keyed on the full cursor state ──
  useEffect(() => {
    if (crowd.length === 0) {
      onDoneRef.current([]);
      return;
    }
    if (!person) return;

    if (shuffling) {
      const t = setTimeout(() => {
        setShuffling(false);
        setSolved1(false);
        setSolved2(false);
        setShakeCount(0);
        setCursor({ personIndex: personIndex + 1, step: 0 });
      }, 800);
      return () => clearTimeout(t);
    }
    if (step === 0 && solved1) {
      const t = setTimeout(
        () => setCursor((c) => (c.step === 0 ? { ...c, step: 1 } : c)),
        1100
      );
      return () => clearTimeout(t);
    }
    if (step === 1 && solved2) {
      const t = setTimeout(
        () => setCursor((c) => (c.step === 1 ? { ...c, step: 2 } : c)),
        1100
      );
      return () => clearTimeout(t);
    }
    if (step === 2) {
      const t = setTimeout(() => goNext(), FUSION_AUTO_MS);
      return () => clearTimeout(t);
    }
  }, [person, personIndex, step, solved1, solved2, shuffling, crowd.length, isLastPerson]);

  if (!person || crowd.length === 0) return null;

  const feature = person.feature;
  const coaching = onboarding && personIndex === 0;

  const handleFeaturePick = (f: FeatureDef) => {
    if (solved1 || step !== 0) return;
    if (f.id === feature.id) {
      setSolved1(true);
    } else {
      setShakeCount((c) => c + 1);
      toast("Look again…", { duration: 1200, id: "meet-look-again" });
    }
  };

  const handleEmojiPick = (correct: boolean) => {
    if (solved2 || step !== 1) return;
    if (correct) {
      setSolved2(true);
    } else {
      setShakeCount((c) => c + 1);
      toast("Not quite — listen to the name again…", { duration: 1200, id: "meet-sound-again" });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Progress header */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Meeting {personIndex + 1} of {crowd.length}
        </p>
        {person.golden && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Mystery guest
          </span>
        )}
        <div className="flex gap-1" aria-hidden="true">
          {crowd.map((p, i) => (
            <span
              key={p.key}
              className={`h-2 w-2 rounded-full transition-colors ${
                i < personIndex
                  ? "bg-amber-500"
                  : i === personIndex
                    ? "bg-amber-600"
                    : "bg-stone-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div aria-live="polite">
        {shuffling ? (
          <section
            key="shuffle"
            className="mnemo-fade-in flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center"
            aria-live="polite"
          >
            <motion.div
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl"
              aria-hidden="true"
            >
              🪑
            </motion.div>
            <p className="text-sm font-medium text-stone-500">The crowd shuffles…</p>
          </section>
        ) : step === 0 ? (
          <section key={`p${personIndex}-s0`} className="mnemo-step-in flex flex-col gap-4">
            {/* ── Step 1 · Face File ── */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                key={shakeCount}
                animate={shakeCount > 0 && !solved1 ? { x: [0, -9, 9, -6, 6, -2, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Portrait appearance={person.appearance} featureId={person.featureId} size={200} highlight={solved1} />
              </motion.div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-800">
                {person.first} {person.last}
              </h2>
              <p className="max-w-xs text-center text-sm text-stone-500">{person.bio}</p>
            </div>

            <div className="rounded-2xl border border-amber-200/80 bg-[#fffaf0] p-4 shadow-sm shadow-amber-100">
              <p className="text-sm font-semibold text-stone-700">What do you notice first?</p>
              {coaching && (
                <p className="mt-1 text-xs italic text-amber-700">
                  Your memory needs a hook. Pick the most distinctive thing about their face.
                </p>
              )}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {featureOptions.map((f) => {
                  const isCorrectPick = solved1 && f.id === feature.id;
                  return (
                    <div key={f.id} className="relative">
                      {coaching && f.id === feature.id && !solved1 && (
                        <motion.div
                          className="pointer-events-none absolute -inset-1 rounded-xl ring-2 ring-amber-400"
                          animate={{ scale: [1, 1.05, 1], opacity: [0.9, 0.35, 0.9] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                          aria-hidden="true"
                        />
                      )}
                      <Button
                        variant="outline"
                        disabled={solved1 && !isCorrectPick}
                        onClick={() => handleFeaturePick(f)}
                        aria-label={`Feature: ${f.label}`}
                        className={`h-11 w-full rounded-xl border-stone-200 text-sm font-medium transition-colors ${
                          isCorrectPick
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : solved1
                              ? "opacity-40"
                              : "hover:border-amber-300 hover:bg-amber-50"
                        }`}
                      >
                        {f.label}
                      </Button>
                    </div>
                  );
                })}
              </div>
              {solved1 && (
                <p className="mnemo-fade-in mt-3 text-center text-sm font-medium text-emerald-700">
                  That&apos;s their file. ✦
                </p>
              )}
            </div>
          </section>
        ) : step === 1 ? (
          <section key={`p${personIndex}-s1`} className="mnemo-step-in flex flex-col gap-4">
            {/* ── Step 2 · Sound-Alike ── */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <Portrait appearance={person.appearance} featureId={person.featureId} size={96} highlight={solved2} />
              <h2 className="text-xl font-bold tracking-tight text-stone-800">
                {person.first} {person.last}
              </h2>
            </div>

            <div className="rounded-2xl border border-amber-200/80 bg-[#fffaf0] p-4 shadow-sm shadow-amber-100">
              <p className="text-sm font-semibold text-stone-700">
                Every name has a picture.{" "}
                <span className="text-amber-800">{person.first}</span> sounds like…
              </p>
              {coaching && (
                <p className="mt-1 text-xs italic text-amber-700">
                  Sound-alike pictures make names sticky.
                </p>
              )}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {emojiOptions.map((o, i) => {
                  const isCorrectPick = solved2 && o.correct;
                  return (
                    <motion.div
                      key={i}
                      animate={isCorrectPick ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ type: "spring", stiffness: 320, damping: 14 }}
                    >
                      <button
                        type="button"
                        disabled={solved2 && !o.correct}
                        onClick={() => handleEmojiPick(o.correct)}
                        aria-label={`Picture option: ${o.label}`}
                        className={`flex h-24 w-full flex-col items-center justify-center gap-1 rounded-2xl border transition-colors ${
                          isCorrectPick
                            ? "border-emerald-300 bg-emerald-50"
                            : solved2
                              ? "border-stone-200 bg-white opacity-40"
                              : "border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50 active:scale-95"
                        }`}
                      >
                        <span className="text-4xl" aria-hidden="true">
                          {o.emoji}
                        </span>
                        <span className="px-1 text-center text-[11px] font-medium text-stone-600">
                          {o.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
              {solved2 && (
                <p className="mnemo-fade-in mt-3 text-center text-sm font-medium text-emerald-700">
                  Names are slippery. Pictures aren&apos;t.
                </p>
              )}
            </div>
          </section>
        ) : (
          <section key={`p${personIndex}-s2`} className="mnemo-step-in flex flex-col gap-4">
            {/* ── Step 3 · Fusion ── */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Portrait appearance={person.appearance} featureId={person.featureId} size={200} highlight />
                <motion.span
                  className="pointer-events-none absolute z-10 select-none text-5xl"
                  initial={{ left: "50%", top: "108%", scale: 1.8, opacity: 0 }}
                  animate={{ left: `${feature.x}%`, top: `${feature.y}%`, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                  aria-hidden="true"
                >
                  {person.emoji}
                </motion.span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-800">
                {person.first}{" "}
                <span className="text-amber-600">→ {person.emojiLabel}</span>
              </h2>
              <p className="max-w-xs text-center text-sm text-stone-500">{person.bio}</p>
            </div>

            <div className="rounded-2xl border border-amber-200/80 bg-[#fffaf0] p-4 text-center shadow-sm shadow-amber-100">
              {coaching && (
                <p className="mb-2 text-xs italic text-amber-700">
                  Picture the scene. Exaggerate it. That&apos;s a memory palace trick.
                </p>
              )}
              <p className="text-sm text-stone-600">
                {feature.label} + {person.emojiLabel} — see it once, keep it forever.
              </p>
              <Button
                onClick={goNext}
                className="mt-3 min-h-11 w-full rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400"
                aria-label={isLastPerson ? "Finish meeting the crowd" : "Next person"}
              >
                {isLastPerson ? "Meet the whole crowd" : "Next"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
