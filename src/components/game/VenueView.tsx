// ─────────────────────────────────────────────────────────────
// MNEMO — The Venue ("The Corner Café"): the campaign home screen.
// Everyone you've met lives here, with memory-strength bars and
// FSRS-driven visit schedules. Full-screen overlay, client-only.
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useMemo, useState } from "react";
import { Coffee, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Portrait from "@/components/game/Portrait";
import type { VenuePayload, VenuePerson } from "@/lib/game/types";

// ─── Date math (plain, timezone-safe, client-side) ───────────

const DAY_MS = 86_400_000;

/** "today" / "tomorrow" / "in Nd" from a YYYY-MM-DD nextDue string. */
function relativeVisit(nextDue: string): string {
  const [y, m, d] = nextDue.split("-").map(Number);
  if (!y || !m || !d) return "soon";
  const due = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((due.getTime() - today.getTime()) / DAY_MS);
  if (diff <= 0) return "today";
  if (diff === 1) return "tomorrow";
  return `in ${diff}d`;
}

// ─── Relationship → Badge tone (emerald Friend+, amber middle, stone new) ──

function relationshipTone(rel: string): string {
  if (rel === "Friend" || rel === "Close Friend") {
    return "border-emerald-200 bg-emerald-100 text-emerald-800";
  }
  if (rel === "Regular" || rel === "Acquaintance") {
    return "border-amber-200 bg-amber-100 text-amber-800";
  }
  return "border-stone-200 bg-stone-100 text-stone-600";
}

// ─── Person card (informative, NOT clickable in v1) ──────────

function PersonCard({ person, index }: { person: VenuePerson; index: number }) {
  const strengthPct = Math.round(person.strength * 100);
  return (
    <div
      className="mnemo-card-in flex flex-col items-center gap-2 rounded-2xl border border-amber-200/70 bg-white/80 p-4 text-center shadow-sm transition-shadow hover:shadow-md"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Portrait appearance={person.appearance} featureId={person.feature.id} size={88} />

      <h3 className="text-sm font-semibold leading-tight text-stone-800">
        {person.first} {person.last}
      </h3>

      <Badge variant="outline" className={relationshipTone(person.relationship)}>
        {person.relationship}
      </Badge>

      <div className="w-full">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wide text-stone-400">
          <span>Memory strength</span>
          <span aria-hidden="true">{strengthPct}%</span>
        </div>
        <Progress
          value={strengthPct}
          aria-label={`Memory strength for ${person.first} ${person.last}: ${strengthPct}%`}
          className="mt-1 h-1.5 [&_[data-slot=progress-indicator]]:bg-amber-400"
        />
      </div>

      {person.dueToday ? (
        <Badge className="border-transparent bg-amber-400 text-amber-950">
          Drops by today! ☕
        </Badge>
      ) : (
        <p className="text-xs text-stone-500">
          Next visit {relativeVisit(person.nextDue)}
        </p>
      )}

      <p className="text-xs leading-snug text-stone-500 line-clamp-2">{person.bio}</p>
    </div>
  );
}

// ─── Empty state: one big Portrait-less silhouette ───────────

function EmptyCafe() {
  return (
    <div className="flex flex-col items-center gap-5 py-12 text-center">
      <div
        aria-hidden="true"
        className="relative flex h-36 w-36 items-end justify-center overflow-hidden rounded-full border-2 border-dashed border-amber-300 bg-amber-100/60"
      >
        <span className="absolute top-6 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-amber-200/80" />
        <span className="h-12 w-20 rounded-t-full bg-amber-200/80" />
      </div>
      <p className="max-w-sm text-sm leading-relaxed text-stone-500">
        Nobody yet. Play today&apos;s crowd — the café fills up with people you
        actually remember.
      </p>
    </div>
  );
}

// ─── VenueView ───────────────────────────────────────────────

type VenueSort = "shakiest" | "strongest" | "az";

const SORTS: { id: VenueSort; label: string }[] = [
  { id: "shakiest", label: "Shakiest first" },
  { id: "strongest", label: "Strongest" },
  { id: "az", label: "A–Z" },
];

export default function VenueView({
  data,
  onClose,
}: {
  data: VenuePayload;
  onClose: () => void;
}): React.ReactElement {
  // Scroll-lock the page behind the overlay + close on Escape.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const { people, mastery, player } = data;

  // Shakiest-first by default — the venue doubles as a practice planner.
  const [sort, setSort] = useState<VenueSort>("shakiest");
  const sortedPeople = useMemo(() => {
    const list = [...people];
    if (sort === "shakiest") list.sort((a, b) => a.strength - b.strength);
    if (sort === "strongest") list.sort((a, b) => b.strength - a.strength);
    if (sort === "az")
      list.sort((a, b) => `${a.first} ${a.last}`.localeCompare(`${b.first} ${b.last}`));
    return list;
  }, [people, sort]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The Corner Café — everyone you've met"
      className="fixed inset-0 z-50 overflow-y-auto scrollbar-cozy"
      style={{
        background:
          "radial-gradient(1200px 500px at 50% -10%, rgba(232,163,61,0.14), transparent 70%), #FBF3E4",
      }}
    >
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        {/* ── Header ── */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400/25 text-amber-700"
            >
              <Coffee className="size-6" />
            </span>
            <div>
              <h1 className="font-serif text-2xl font-bold text-stone-800 sm:text-3xl">
                The Corner Café
              </h1>
              <p className="text-sm text-stone-500">
                Every regular is a memory you made.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the café"
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-amber-200 bg-white/70 text-stone-600 transition-colors hover:bg-amber-100 hover:text-stone-800"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {/* ── Mastery card ── */}
        <section
          aria-label="Café mastery"
          className="mt-6 rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Café mastery
            </h2>
            <Badge
              variant="outline"
              className="border-amber-300 bg-amber-100 text-amber-800"
            >
              Lv {player.level} · {player.levelTitle}
            </Badge>
          </div>

          <div className="mt-3">
            <Progress
              value={mastery.pct}
              aria-label={`${mastery.pct}% of the café met`}
              className="h-2.5 [&_[data-slot=progress-indicator]]:bg-amber-400"
            />
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-lg font-bold text-stone-800">
                {mastery.pct}%{" "}
                <span className="text-sm font-medium text-stone-500">
                  of the café met
                </span>
              </p>
              <p className="text-sm text-stone-500">
                {mastery.met}/{mastery.total} regulars
              </p>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-stone-400">
            New Face → Acquaintance → Regular → Friend → Close Friend
          </p>
        </section>

        {/* ── People grid (capped so the mastery header stays visible) ── */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto scrollbar-cozy">
          {people.length === 0 ? (
            <EmptyCafe />
          ) : (
            <>
              {/* Sort control — doubles as a practice planner */}
              <div
                className="mb-3 flex flex-wrap items-center gap-1.5"
                role="radiogroup"
                aria-label="Sort people"
              >
                {SORTS.map((s) => {
                  const active = sort === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSort(s.id)}
                      className={`min-h-9 rounded-full border px-3 text-xs font-medium transition-colors ${
                        active
                          ? "border-amber-400 bg-amber-100 text-amber-900"
                          : "border-stone-200 bg-white/70 text-stone-500 hover:border-amber-300 hover:bg-amber-50"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {sortedPeople.map((person, i) => (
                  <PersonCard key={person.key} person={person} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
