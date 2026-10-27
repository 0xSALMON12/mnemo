// ─────────────────────────────────────────────────────────────
// MNEMO — procedural SVG portrait. THE face of the game.
//
// Determinism contract: identical (appearance, featureId, expression) ALWAYS
// renders an identical SVG. No Math.random, no Date, no hooks — pure render.
//
// Geometry contract (from src/lib/game/features.ts, viewBox 0 0 100 100):
//   head ellipse center (50,46) rx22 ry25 · eyes y≈44 · nose y≈52 ·
//   mouth y≈61 · neck y≈71 · shoulders y≈79-100
// ─────────────────────────────────────────────────────────────

import type { Appearance } from "@/lib/game/types";
import { FEATURES, HAIR_FEATURES } from "@/lib/game/features";
import { SKIN_TONES, HAIR_COLORS, SHIRT_COLORS } from "@/lib/game/palettes";

export interface PortraitProps {
  appearance: Appearance;
  featureId: string;
  size?: number; // px, default 160
  highlight?: boolean; // pulsing amber ring on the feature anchor
  expression?: "neutral" | "happy" | "sad";
  className?: string;
}

// ─── Deterministic color helpers ─────────────────────────────

const at = (arr: readonly string[], i: number, fallback: string): string =>
  arr[((i % arr.length) + arr.length) % arr.length] ?? fallback;

/** Darken a #RRGGBB color by a factor (0..1). Pure + deterministic. */
function shade(hex: string, factor: number): string {
  const n = hex.replace("#", "");
  if (n.length !== 6) return hex;
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const to = (v: number) => clamp(v).toString(16).padStart(2, "0");
  return `#${to(parseInt(n.slice(0, 2), 16) * factor)}${to(
    parseInt(n.slice(2, 4), 16) * factor
  )}${to(parseInt(n.slice(4, 6), 16) * factor)}`;
}

/** Beanie knit colors — deterministically derived from the shirt index, warm only. */
const KNIT_COLORS = [
  "#B05A6B", // rose
  "#C75B5B", // brick
  "#7C9A5B", // sage
  "#B08968", // tan
  "#8A8A3E", // olive
  "#C08A3E", // marigold knit
] as const;

const INK = "#2A2018"; // pupils / darkest line work
const MOUTH = "#8A4A34"; // warm lip brown
const BLUSH = "rgba(226,125,96,0.22)";

// ─── Static, hand-tuned shape data (all deterministic) ───────

/** Curly hair: 11 overlapping circles along the skull's top arc (y 16-32). */
const CURLS: ReadonlyArray<{ x: number; y: number; r: number }> = [
  { x: 50, y: 17, r: 6.8 },
  { x: 44.5, y: 16, r: 5.4 },
  { x: 55.5, y: 16, r: 5.4 },
  { x: 39, y: 18.5, r: 6.2 },
  { x: 61, y: 18.5, r: 6.2 },
  { x: 33.5, y: 19.5, r: 5 },
  { x: 66.5, y: 19.5, r: 5 },
  { x: 29.5, y: 24, r: 5.6 },
  { x: 70.5, y: 24, r: 5.6 },
  { x: 25, y: 32, r: 5.2 },
  { x: 75, y: 32, r: 5.2 },
];

/** Freckles: 7 fixed dots across the cheeks (y≈50-53). */
const FRECKLES: ReadonlyArray<{ x: number; y: number; r: number }> = [
  { x: 36, y: 50.8, r: 1 },
  { x: 41, y: 52.4, r: 0.9 },
  { x: 45.5, y: 50.2, r: 1 },
  { x: 54.5, y: 50.2, r: 1 },
  { x: 59, y: 52.4, r: 0.9 },
  { x: 64, y: 50.8, r: 1 },
  { x: 38.5, y: 53, r: 0.8 },
];

// Baseline hair caps — outer edge hugs the head ellipse (center 50,46 rx22 ry25).
const HAIR_BUZZ =
  "M31 33 A22 25 0 0 1 69 33 Q50 26 31 33 Z"; // thin skull cap
const HAIR_SHORT =
  "M28.8 40 A22 25 0 0 1 71.2 40 Q70.2 30.5 65.5 27.5 Q50 33.5 34.5 27.5 Q29.8 30.5 28.8 40 Z";
const HAIR_MEDIUM =
  "M28 46 A22 25 0 0 1 72 46 Q71.2 43.5 71 40 Q70.6 31.5 65 27.5 Q50 33.5 35 27.5 Q29.4 31.5 29 40 Q28.8 43.5 28 46 Z";
const HAIR_LONG_CAP =
  "M28.4 44 A22 25 0 0 1 71.6 44 Q70.8 41 70.5 38 Q70 30.5 64.5 26.8 Q50 32.5 35.5 26.8 Q30 30.5 29.5 38 Q29.2 41 28.4 44 Z";

/** Short-hair side sweeps (little flicks in front of the ears). */
const SWEEP_L = "M29 38 Q27.8 43.5 30.2 47 Q31.6 42.5 31 37.8 Z";
const SWEEP_R = "M71 38 Q72.2 43.5 69.8 47 Q68.4 42.5 69 37.8 Z";

/** Long-hair side panels — drawn BEHIND the head ellipse. */
const PANEL_L =
  "M33 26 Q20.5 40 23.5 60 Q24.5 69 30.5 72.5 Q36.5 71.5 36 62 Q35 44 38.5 29 Z";
const PANEL_R =
  "M67 26 Q79.5 40 76.5 60 Q75.5 69 69.5 72.5 Q63.5 71.5 64 62 Q65 44 61.5 29 Z";

/** Ponytail teardrop — attaches at the upper-right of the cap, curls right-down. */
const PONYTAIL =
  "M64 23.5 Q76 23.5 80.5 33 Q83.5 40 79 44.5 Q74.5 47 72 40.5 Q69.5 32.5 63 27.5 Z";

/** Beard — hugs the jaw, bumpy scalloped lower edge; the mouth is drawn on top. */
const BEARD =
  "M30.5 47 Q28.8 55.5 31.5 62 Q33.2 66.5 36.8 68.6 Q39.5 71 42.2 69.6 Q45.8 73 50 70.8 Q54.2 73 57.8 69.6 Q60.5 71 63.2 68.6 Q66.8 66.5 68.5 62 Q71.2 55.5 69.5 47 Q69 44.6 66.3 43.8 Q67 53.5 59.5 56.8 Q50 60.4 40.5 56.8 Q33 53.5 33.7 43.8 Q31 44.6 30.5 47 Z";

/** Mustache — two curved lobes tucked right under the nose. */
const MUSTACHE_L =
  "M49.6 55.2 Q44.8 54 41.8 56 Q40 57.4 42.2 58.6 Q45.8 60.2 49.6 57.6 Z";
const MUSTACHE_R =
  "M50.4 55.2 Q55.2 54 58.2 56 Q60 57.4 57.8 58.6 Q54.2 60.2 50.4 57.6 Z";

// ─── Per-expression face bits ────────────────────────────────

const BROWS: Record<"neutral" | "happy" | "sad", [string, string]> = {
  neutral: ["M37.2 39.4 Q41 37.9 44.8 39.4", "M55.2 39.4 Q59 37.9 62.8 39.4"],
  happy: ["M37.2 38.6 Q41 37 44.8 38.6", "M55.2 38.6 Q59 37 62.8 38.6"],
  sad: ["M37.2 40.2 Q41 39.4 44.8 37.4", "M55.2 37.4 Q59 39.4 62.8 40.2"], // angled up-inward
};

const MOUTHS: Record<"neutral" | "happy" | "sad", { d: string; w: number }> = {
  neutral: { d: "M44 61 Q50 64 56 61", w: 2 }, // gentle curve
  happy: { d: "M43.5 60 Q50 67.5 56.5 60", w: 2 }, // bigger open curve
  sad: { d: "M44 63 Q50 59.5 56 63", w: 2 }, // inverted curve
};

// ─── Component ───────────────────────────────────────────────

export default function Portrait({
  appearance,
  featureId,
  size = 160,
  highlight = false,
  expression = "neutral",
  className,
}: PortraitProps): React.ReactElement {
  // Palette lookups (safe modulo — indices always resolve, deterministically).
  const skin = at(SKIN_TONES, appearance.skin, SKIN_TONES[0]);
  const hair = at(HAIR_COLORS, appearance.hair, HAIR_COLORS[0]);
  const shirt = at(SHIRT_COLORS, appearance.shirt, SHIRT_COLORS[0]);
  const skinLine = shade(skin, 0.62); // nose + inner-ear lines
  const knit = KNIT_COLORS[appearance.shirt % KNIT_COLORS.length] ?? "#B05A6B";

  const isHairFeature = HAIR_FEATURES.has(featureId);
  const feature = FEATURES[featureId] ?? null;

  const ariaLabel = feature
    ? `Portrait of a person with ${feature.label.toLowerCase()}`
    : "Portrait of a person";

  const brows = BROWS[expression];
  const mouth = MOUTHS[expression];
  const blushY = expression === "happy" ? 53 : 54; // raised cheeks on happy
  const pupilY = expression === "sad" ? 44.9 : expression === "happy" ? 44.1 : 44.3;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <defs>
        <filter id="mnemo-head-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.5" stdDeviation="1" floodColor="#4A3A28" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* ── Behind-the-head layer: long hair side panels + ponytail ── */}
      {!isHairFeature && appearance.hairBase === "long" && (
        <g fill={hair}>
          <path d={PANEL_L} />
          <path d={PANEL_R} />
        </g>
      )}
      {featureId === "longHair" && (
        <g fill={hair}>
          <path d={PANEL_L} />
          <path d={PANEL_R} />
        </g>
      )}
      {featureId === "ponytail" && <path d={PONYTAIL} fill={hair} />}

      {/* ── Body: neck + shirt + collar ── */}
      <g>
        <rect x={44} y={68} width={12} height={14} fill={skin} />
        <ellipse cx={50} cy={69.5} rx={6.2} ry={2.2} fill="rgba(74,58,40,0.10)" />
        <path d="M18 100 Q18 82 34 79 L66 79 Q82 82 82 100 Z" fill={shirt} />
        <path
          d="M40 79.3 Q50 85.5 60 79.3"
          fill="none"
          stroke={shade(shirt, 0.72)}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </g>

      {/* ── Head group (soft drop shadow): ears, skull, face ── */}
      <g filter="url(#mnemo-head-shadow)">
        {/* ears (peek out from behind the skull) */}
        <g fill={skin}>
          <circle cx={28} cy={48} r={4.5} />
          <circle cx={72} cy={48} r={4.5} />
        </g>
        <g fill="rgba(74,58,40,0.08)">
          <circle cx={28.5} cy={48.2} r={1.9} />
          <circle cx={71.5} cy={48.2} r={1.9} />
        </g>

        {/* skull */}
        <ellipse cx={50} cy={46} rx={22} ry={25} fill={skin} />

        {/* blush (cheeks) */}
        <g fill={BLUSH}>
          <circle cx={36} cy={blushY} r={3.5} />
          <circle cx={64} cy={blushY} r={3.5} />
        </g>

        {/* facial-hair features sit UNDER the mouth (mouth is drawn on top) */}
        {featureId === "beard" && <path d={BEARD} fill={hair} />}
        {featureId === "mustache" && (
          <g fill={hair}>
            <path d={MUSTACHE_L} />
            <path d={MUSTACHE_R} />
          </g>
        )}
        {featureId === "goatee" && (
          <g fill={hair}>
            <ellipse cx={50} cy={67.5} rx={4.2} ry={4.6} />
            <ellipse cx={50} cy={64.6} rx={1.9} ry={1.5} />
          </g>
        )}

        {/* eyes: whites + pupils + shine */}
        <g>
          <ellipse cx={41} cy={44} rx={2.8} ry={3.2} fill="#FFFFFF" />
          <ellipse cx={59} cy={44} rx={2.8} ry={3.2} fill="#FFFFFF" />
          <circle cx={41} cy={pupilY} r={1.6} fill={INK} />
          <circle cx={59} cy={pupilY} r={1.6} fill={INK} />
          <circle cx={40.4} cy={43.5} r={0.5} fill="#FFFFFF" opacity={0.9} />
          <circle cx={58.4} cy={43.5} r={0.5} fill="#FFFFFF" opacity={0.9} />
        </g>

        {/* brows */}
        <g fill="none" stroke={hair} strokeWidth={1.6} strokeLinecap="round">
          <path d={brows[0]} />
          <path d={brows[1]} />
        </g>

        {/* nose */}
        <path
          d="M50 47 Q52.5 52 49 53.5"
          fill="none"
          stroke={skinLine}
          strokeWidth={1.6}
          strokeLinecap="round"
        />

        {/* mouth — always the TOP face line (beard/mustache render underneath) */}
        <path
          d={mouth.d}
          fill="none"
          stroke={MOUTH}
          strokeWidth={mouth.w}
          strokeLinecap="round"
        />
      </g>

      {/* ── Hair layer: baseline styles OR hair features (never both) ── */}
      {!isHairFeature && (
        <g>
          {appearance.hairBase === "buzz" && <path d={HAIR_BUZZ} fill={hair} opacity={0.9} />}
          {appearance.hairBase === "short" && (
            <g fill={hair}>
              <path d={HAIR_SHORT} />
              <path d={SWEEP_L} />
              <path d={SWEEP_R} />
            </g>
          )}
          {appearance.hairBase === "medium" && <path d={HAIR_MEDIUM} fill={hair} />}
          {appearance.hairBase === "long" && <path d={HAIR_LONG_CAP} fill={hair} />}
        </g>
      )}
      {isHairFeature && (
        <g>
          {featureId === "bald" && (
            <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
              <path d="M35.5 31.5 Q39.5 24.8 46.5 22.6" strokeWidth={2.5} opacity={0.6} />
              <path d="M33.5 36 Q34.5 33.8 36.2 32.4" strokeWidth={1.8} opacity={0.4} />
            </g>
          )}
          {featureId === "curlyHair" && (
            <g>
              <path
                d="M27 34 A22 25 0 0 1 73 34 Q50 26 27 34 Z"
                fill={hair}
              />
              {CURLS.map((c, i) => (
                <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={hair} />
              ))}
            </g>
          )}
          {featureId === "bun" && (
            <g fill={hair}>
              <path d={HAIR_SHORT} />
              <path d={SWEEP_L} />
              <path d={SWEEP_R} />
              <circle cx={50} cy={15} r={7} />
              <rect x={46.6} y={19.6} width={6.8} height={2.2} rx={1.1} fill={shade(hair, 0.6)} />
            </g>
          )}
          {featureId === "ponytail" && (
            <g fill={hair}>
              <path d={HAIR_SHORT} />
              <path d={SWEEP_L} />
              <path d={SWEEP_R} />
            </g>
          )}
          {featureId === "longHair" && (
            <g>
              <path d={HAIR_LONG_CAP} fill={hair} />
              <path
                d="M50 20.5 L50 27.5"
                stroke={shade(hair, 0.55)}
                strokeWidth={1.4}
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      )}

      {/* ── Non-hair feature layer ── */}
      <g>
        {featureId === "glasses" && (
          <g>
            <circle cx={41} cy={44} r={7} fill="rgba(255,255,255,0.14)" stroke="#3A2E24" strokeWidth={2.2} />
            <circle cx={59} cy={44} r={7} fill="rgba(255,255,255,0.14)" stroke="#3A2E24" strokeWidth={2.2} />
            <path
              d="M48 43.2 Q50 41.6 52 43.2"
              fill="none"
              stroke="#3A2E24"
              strokeWidth={2.2}
              strokeLinecap="round"
            />
            <g stroke="#3A2E24" strokeWidth={2} strokeLinecap="round">
              <path d="M34 43.4 L28.8 45.8" />
              <path d="M66 43.4 L71.2 45.8" />
            </g>
          </g>
        )}
        {featureId === "hat" && (
          <g>
            <path d="M29.5 28.5 Q29.5 13.5 50 13.5 Q70.5 13.5 70.5 28.5 Z" fill={knit} />
            <path
              d="M33 20.5 Q50 16 67 20.5"
              fill="none"
              stroke={shade(knit, 0.85)}
              strokeWidth={1}
            />
            <rect x={30} y={25} width={40} height={6} rx={3} fill={shade(knit, 0.8)} />
            <circle cx={50} cy={12.2} r={3.4} fill="#F3E5D0" />
          </g>
        )}
        {featureId === "earrings" && (
          <g>
            <path d="M28 51.6 L28 53.2" stroke="#E3B341" strokeWidth={1.2} strokeLinecap="round" />
            <path d="M72 51.6 L72 53.2" stroke="#E3B341" strokeWidth={1.2} strokeLinecap="round" />
            <circle cx={28} cy={54.8} r={2} fill="#E3B341" />
            <circle cx={72} cy={54.8} r={2} fill="#E3B341" />
            <circle cx={27.4} cy={54.2} r={0.55} fill="#FFFFFF" opacity={0.85} />
            <circle cx={71.4} cy={54.2} r={0.55} fill="#FFFFFF" opacity={0.85} />
          </g>
        )}
        {featureId === "freckles" && (
          <g fill="#B4704A" opacity={0.55}>
            {FRECKLES.map((f, i) => (
              <circle key={i} cx={f.x} cy={f.y} r={f.r} />
            ))}
          </g>
        )}
        {featureId === "mole" && <circle cx={61} cy={58} r={1.3} fill="#6B4226" />}
        {featureId === "bowtie" && (
          <g fill="#C75B5B" stroke="#8F3E3E" strokeWidth={1} strokeLinejoin="round">
            <path d="M47.4 84 L39 79.5 L39 88.5 Z" />
            <path d="M52.6 84 L61 79.5 L61 88.5 Z" />
            <rect x={47.4} y={81.5} width={5.2} height={5} rx={1.3} />
          </g>
        )}
      </g>

      {/* ── Face File highlight: soft glow + pulsing dashed ring ── */}
      {highlight && feature && (
        <g aria-hidden="true">
          <circle
            cx={feature.x}
            cy={feature.y}
            r={feature.r + 5}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={5}
            opacity={0.25}
          />
          <circle
            className="mnemo-ring"
            cx={feature.x}
            cy={feature.y}
            r={feature.r}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={2.5}
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
