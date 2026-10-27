import type { FeatureDef } from "./types";

// Portrait geometry contract (viewBox 0 0 100 100):
//   head ellipse center (50, 46), rx 22, ry 25
//   eyes y≈44 (x 41 & 59), nose y≈52, mouth y≈61
//   neck y≈71, shirt/shoulders y≈80-100
// Feature anchor coords below are where the "Face File" highlight ring lands.

export const FEATURES: Record<string, FeatureDef> = {
  glasses: { id: "glasses", label: "Glasses", x: 50, y: 44, r: 13 },
  hat: { id: "hat", label: "Hat", x: 50, y: 22, r: 13 },
  beard: { id: "beard", label: "Beard", x: 50, y: 63, r: 12 },
  mustache: { id: "mustache", label: "Mustache", x: 50, y: 57, r: 8 },
  goatee: { id: "goatee", label: "Goatee", x: 50, y: 64, r: 8 },
  earrings: { id: "earrings", label: "Earrings", x: 28, y: 51, r: 7 },
  bun: { id: "bun", label: "Hair bun", x: 50, y: 15, r: 9 },
  ponytail: { id: "ponytail", label: "Ponytail", x: 76, y: 36, r: 9 },
  curlyHair: { id: "curlyHair", label: "Curly hair", x: 50, y: 25, r: 14 },
  longHair: { id: "longHair", label: "Long hair", x: 26, y: 48, r: 10 },
  bald: { id: "bald", label: "Bald head", x: 50, y: 28, r: 11 },
  freckles: { id: "freckles", label: "Freckles", x: 50, y: 52, r: 9 },
  mole: { id: "mole", label: "Mole", x: 61, y: 58, r: 6 },
  bowtie: { id: "bowtie", label: "Bowtie", x: 50, y: 84, r: 8 },
};

export const FEATURE_IDS = Object.keys(FEATURES);

/** Features rendered as hair (the portrait must NOT draw baseline hair for these). */
export const HAIR_FEATURES = new Set([
  "bun",
  "ponytail",
  "curlyHair",
  "longHair",
  "bald",
]);

export function featureOf(id: string): FeatureDef {
  return FEATURES[id] ?? FEATURES.glasses;
}
