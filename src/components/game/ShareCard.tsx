// ─────────────────────────────────────────────────────────────
// MNEMO — Share card: the spoiler-free Wordle-grammar result.
// 🟩 knew · 🟨 close · ⬜ missed — rendered as cozy rounded squares.
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Coffee, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ShareCard({
  shareText,
  gridLine,
  dayNumber,
  correct,
  total,
  perfect,
  practice = false,
}: {
  shareText: string;
  gridLine: string;
  dayNumber: number;
  correct: number;
  total: number;
  perfect: boolean;
  practice?: boolean;
}): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the "Copied!" timer if the card unmounts mid-flash.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Share card copied — spoiler-free, of course");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — your browser blocked the clipboard.");
    }
  };

  // 🟩/🟨/⬜ are single code points, so spread is safe. Max 8 per row:
  // 8 × 24px squares + 7 × 4px gaps = 220px fixed wrap width.
  const squares = [...gridLine];

  return (
    <div
      aria-label={`${practice ? "MNEMO practice share card" : `MNEMO day ${dayNumber} share card`}: ${correct} of ${total} names${perfect ? ", flawless" : ""}`}
      className="w-full max-w-sm rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-sm"
    >
      {/* Top row: title + café branding */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-bold text-stone-800">
            {practice ? "MNEMO · Practice" : `MNEMO #${dayNumber}`}
          </p>
          <p className="text-xs text-stone-500">The Corner Café</p>
        </div>
        <Coffee className="size-4 text-amber-600" aria-hidden="true" />
      </div>

      {/* Result grid (decorative — the real numbers are announced on the container) */}
      <div className="mt-3 flex w-[220px] flex-wrap gap-1" aria-hidden="true">
        {squares.map((ch, i) => (
          <span
            key={i}
            className={`size-6 rounded-md ${
              ch === "🟩" ? "bg-emerald-400" : ch === "🟨" ? "bg-amber-400" : "bg-stone-200"
            }`}
          />
        ))}
      </div>

      {/* Stats + copy action */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-stone-700">
          {correct}/{total} names
          {perfect ? <span className="text-amber-600"> · flawless ☕</span> : null}
        </p>
        <Button
          variant="outline"
          onClick={onCopy}
          aria-label="Copy your spoiler-free result to the clipboard"
          className="h-11 gap-1.5 rounded-xl border-amber-200 bg-white/70 px-4 hover:bg-amber-50"
        >
          {copied ? (
            <Check className="size-4 text-emerald-600" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
