"use client";

// ─────────────────────────────────────────────────────────────
// MNEMO — PracticeSetup: build-your-own crowd for zero-stake rounds.
// Practice is OFF the economy by design: no XP, no streak, no SRS
// writes. This dialog only shapes the training set.
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from "react";
import { Dumbbell, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  PRACTICE_POOL_LABELS,
  PRACTICE_SIZE_MAX,
  PRACTICE_SIZE_MIN,
  generatePracticeCrowd,
  type PracticePool,
} from "@/lib/game/crowd";
import type { PersonPayload } from "@/lib/game/types";
import type { VenueResponse } from "@/lib/game/api";

const POOLS: PracticePool[] = ["anyone", "fresh", "friends", "shaky"];

interface PracticeSetupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Cached venue loader (met keys + strengths for pool filtering). */
  loadVenueData: () => Promise<VenueResponse | null>;
  onStart: (crowd: PersonPayload[], pool: PracticePool) => void;
}

export default function PracticeSetup({
  open,
  onOpenChange,
  loadVenueData,
  onStart,
}: PracticeSetupProps) {
  const [size, setSize] = useState(6);
  const [pool, setPool] = useState<PracticePool>("anyone");
  const [venue, setVenue] = useState<VenueResponse | null>(null);
  const [venueFailed, setVenueFailed] = useState(false);
  const startedRef = useRef(false);

  // Derived loading state (no sync setState in effects).
  const loading = open && venue === null && !venueFailed;

  // Venue data is only needed for pool counts + filters; load lazily, once.
  useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;
    loadVenueData()
      .then((v) => {
        if (v) setVenue(v);
        else setVenueFailed(true);
      })
      .catch(() => setVenueFailed(true));
  }, [open, loadVenueData]);

  const metKeys = useMemo(
    () => (venue ? venue.people.map((p) => p.key) : []),
    [venue]
  );
  const strengthByKey = useMemo(() => {
    const map: Record<string, number> = {};
    if (venue) for (const p of venue.people) map[p.key] = p.strength;
    return map;
  }, [venue]);

  const poolCounts = useMemo(() => {
    if (!venue) return null;
    const met = new Set(metKeys);
    const counts: Record<PracticePool, number> = {
      anyone: venue.rosterSize,
      fresh: venue.rosterSize - met.size,
      friends: met.size,
      shaky: venue.people.filter(
        (p) => p.strength < 0.6 || p.dueToday
      ).length,
    };
    return counts;
  }, [venue, metKeys]);

  const start = () => {
    const crowd = generatePracticeCrowd({ size, pool, metKeys, strengthByKey });
    onOpenChange(false);
    onStart(crowd, pool);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-amber-200 bg-[#fffaf0] sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-stone-800">
            <Dumbbell className="size-5 text-amber-600" aria-hidden="true" />
            Practice lounge
          </DialogTitle>
          <DialogDescription className="pt-1 text-left text-sm text-stone-600">
            Build a custom crowd and train. Practice rounds never touch your
            XP, streak, or memories — the daily crowd stays the real game.
          </DialogDescription>
        </DialogHeader>

        {/* ── Crowd size ── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="practice-size"
              className="text-sm font-semibold text-stone-700"
            >
              Crowd size
            </label>
            <span className="text-sm font-bold tabular-nums text-amber-700">
              {size} {size === 1 ? "face" : "faces"}
            </span>
          </div>
          <Slider
            id="practice-size"
            value={[size]}
            onValueChange={(v) => setSize(v[0] ?? size)}
            min={PRACTICE_SIZE_MIN}
            max={PRACTICE_SIZE_MAX}
            step={1}
            aria-label={`Crowd size: ${size}`}
            className="[&_[data-slot=slider-range]]:bg-amber-500 [&_[data-slot=slider-thumb]]:border-amber-500"
          />
          <p className="text-[11px] text-stone-400">
            The daily crowd runs 6–10. Big rooms are for name-athletes.
          </p>
        </div>

        {/* ── Pool ── */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-stone-700">Who visits?</p>
          <div className="grid grid-cols-1 gap-2" role="radiogroup" aria-label="Practice pool">
            {POOLS.map((p) => {
              const selected = pool === p;
              const count = poolCounts?.[p];
              return (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPool(p)}
                  className={`flex min-h-11 items-center justify-between rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "border-amber-400 bg-amber-100 text-amber-900"
                      : "border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <span>{PRACTICE_POOL_LABELS[p]}</span>
                  {loading ? (
                    <Loader2 className="size-3.5 animate-spin text-stone-300" aria-hidden="true" />
                  ) : (
                    count !== undefined && (
                      <span className="shrink-0 text-xs tabular-nums text-stone-400">
                        {count}
                      </span>
                    )
                  )}
                </button>
              );
            })}
          </div>
          {pool === "shaky" && venue && poolCounts?.shaky === 0 && (
            <p className="text-xs italic text-emerald-700">
              Nothing shaky — your friends are holding strong. Fresh faces it is.
            </p>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={start}
            className="min-h-11 w-full rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-400"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Seat the crowd
          </Button>
          <p className="text-center text-[11px] text-stone-400">
            Practice results stay in this room — the record books don&apos;t see them.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
