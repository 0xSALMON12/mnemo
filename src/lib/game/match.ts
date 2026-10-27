import type { PersonDef, RecallStatus } from "./types";

// Isomorphic name matcher — used by the client for instant feedback AND
// re-computed server-side as the source of truth.
// Mirrors real memory-sport rules: production required, no penalty for misses,
// partial credit for near-misses (first vs. last name scoring).

export function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[-_]/g, " ") // hyphens/underscores are word separators, not noise
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(
        prev[j] + 1,
        prev[j - 1] + 1,
        last + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      last = tmp;
    }
  }
  return prev[b.length];
}

function tolerance(nameLen: number): number {
  if (nameLen <= 3) return 0; // short names must be exact ("Bea" ≠ "Dea")
  if (nameLen <= 5) return 1;
  return 2;
}

export function matchName(guessRaw: string, person: PersonDef): RecallStatus {
  const guess = normalizeName(guessRaw);
  if (!guess) return "missed";

  const first = normalizeName(person.first);
  const full = normalizeName(`${person.first} ${person.last}`);
  const aliases = (person.aliases ?? []).map(normalizeName);

  // exact hits
  if (guess === first || guess === full || aliases.includes(guess)) return "knew";

  // fuzzy near-misses (against BOTH the first name and the full name,
  // each with length-scaled tolerance — "Ami Santiago" ≈ "Amy Santiago")
  const guessFirst = guess.split(" ")[0];
  if (levenshtein(guess, first) <= tolerance(first.length)) return "close";
  if (guessFirst && guessFirst !== guess) {
    if (levenshtein(guessFirst, first) <= tolerance(first.length)) return "close";
  }
  if (levenshtein(guess, full) <= tolerance(full.length)) return "close";
  // Surname-only counts as partial credit — and it's exactly what
  // disambiguates Twin Day, where first names collide.
  const last = normalizeName(person.last);
  if (last && guess === last) return "close";
  for (const al of aliases) {
    if (levenshtein(guess, al) <= tolerance(al.length)) return "close";
  }

  return "missed";
}
