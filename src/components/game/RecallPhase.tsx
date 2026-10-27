"use client";

// ─────────────────────────────────────────────────────────────
// MNEMO — RecallPhase: the RETRIEVAL phase (testing effect).
// Same faces, shuffled, no names. Type them — production beats
// recognition. Misses cost nothing; misses are restudy moments.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BrainCircuit, Check, MoonStar, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Portrait from "@/components/game/Portrait";
import { matchName } from "@/lib/game/match";
import type { PersonPayload, RecallStatus, SubmitBody } from "@/lib/game/types";

interface RecallPhaseProps {
  crowd: PersonPayload[];
  dueFriends: PersonPayload[];
  onboarding: boolean;
  onDone: (answers: SubmitBody["answers"]) => void;
}

interface Feedback {
  status: RecallStatus;
}

function fisherYates<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function RecallPhase({
  crowd,
  dueFriends,
  onboarding,
  onDone,
}: RecallPhaseProps) {
  const queue = useState(() =>
    fisherYates([...crowd, ...dueFriends])
  )[0];

  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const answersRef = useRef<SubmitBody["answers"]>([]);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const person = queue[index];
  const total = queue.length;

  // Degenerate guard: nothing to recall → nothing to submit.
  useEffect(() => {
    if (total === 0) onDoneRef.current([]);
  }, [total]);

  // Move focus to the Next button once feedback shows (focus management).
  useEffect(() => {
    if (feedback) nextBtnRef.current?.focus();
  }, [feedback]);

  if (total === 0) return null;
  if (!person) return null;

  const isDue = !!person.isDue;

  const submitGuess = () => {
    if (feedback) return;
    const status = matchName(guess, person);
    answersRef.current.push({
      personKey: person.key,
      guess,
      isDue,
      golden: person.golden ?? false,
    });
    setFeedback({ status });
  };

  // Mind-blank escape hatch: production is the exercise, but a total blank
  // should become a restudy reveal — not a forced garbage guess.
  const revealAfterBlank = () => {
    if (feedback) return;
    answersRef.current.push({
      personKey: person.key,
      guess: "",
      isDue,
      golden: person.golden ?? false,
    });
    setFeedback({ status: "missed" });
  };

  const goNext = () => {
    if (index >= total - 1) {
      onDoneRef.current([...answersRef.current]);
    } else {
      setIndex((i) => i + 1);
      setGuess("");
      setFeedback(null);
    }
  };

  const firstName = person.first;
  const fullName = `${person.first} ${person.last}`;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          {index + 1} / {total}
        </p>
        <Progress
          value={(index / total) * 100}
          className="h-1.5 flex-1 bg-amber-200/60 [&_[data-slot=progress-indicator]]:bg-amber-500"
          aria-label={`Recall progress: ${index + 1} of ${total}`}
        />
      </div>

      {onboarding && index === 0 && !feedback && (
        <p className="flex items-center justify-center gap-1.5 text-center text-xs italic text-stone-500">
          <MoonStar className="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
          No pressure — misses cost nothing. Typing it is the exercise.
        </p>
      )}

      <div aria-live="polite">
        {!feedback ? (
          <section
            key={`q-${person.key}`}
            className="mnemo-step-in flex flex-col items-center gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <Portrait appearance={person.appearance} featureId={person.featureId} size={180} />
              {isDue && (
                <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                  Returning friend
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-stone-800">Who is this?</h2>

            <form
              className="flex w-full flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                submitGuess();
              }}
            >
              <Input
                autoFocus
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="type their name…"
                aria-label="Type their name"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="done"
                className="h-12 rounded-xl border-stone-300 bg-white text-lg shadow-sm focus-visible:border-amber-400 focus-visible:ring-amber-300"
              />
              <Button
                type="submit"
                className="min-h-11 w-full rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400"
              >
                Lock it in
              </Button>
              <Button
                type="button"
                onClick={revealAfterBlank}
                variant="ghost"
                className="min-h-10 w-full rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-600"
              >
                <BrainCircuit className="size-4" aria-hidden="true" />
                Mind blank — show them
              </Button>
            </form>
          </section>
        ) : (
          <section
            key={`fb-${person.key}`}
            className="mnemo-step-in flex flex-col gap-4"
            aria-live="polite"
          >
            {feedback.status === "knew" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center shadow-sm">
                <span className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-6" aria-hidden="true" />
                </span>
                <p className="text-lg font-bold text-emerald-800">Yes! {fullName}</p>
              </div>
            )}

            {feedback.status === "close" && (
              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-center shadow-sm">
                <p className="text-base font-semibold text-amber-500">So close —</p>
                <p className="text-lg font-bold text-amber-800">it&apos;s {fullName}</p>
              </div>
            )}

            {feedback.status === "missed" && (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center shadow-sm">
                <span className="mx-auto mb-1 flex size-10 items-center justify-center rounded-full bg-rose-500 text-white">
                  <X className="size-6" aria-hidden="true" />
                </span>
                <p className="text-xl font-bold text-stone-800">{fullName}</p>
                <p className="text-lg">
                  <span className="mr-1" aria-hidden="true">
                    {person.emoji}
                  </span>
                  <span className="font-medium text-stone-600">{person.emojiLabel}</span>
                </p>
                <p className="max-w-xs text-sm text-stone-500">{person.bio}</p>
                <p className="text-xs italic text-stone-400">Filed back into memory…</p>
              </div>
            )}

            <Button
              ref={nextBtnRef}
              onClick={goNext}
              className="min-h-11 w-full rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400"
              aria-label={index >= total - 1 ? "Finish the recall walk" : "Next person"}
            >
              {index >= total - 1 ? "See my score" : "Next"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </section>
        )}
      </div>
    </div>
  );
}
