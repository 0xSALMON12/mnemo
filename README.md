# MNEMO — The Corner Café 🧠☕

*A daily memory game where you meet a crowd of strangers, memorize their names & faces, and keep the friendships alive before they fade.*

Built with Next.js 16 + TypeScript + Tailwind 4 + shadcn/ui + Prisma (SQLite) + Framer Motion.

---

## Quick Start

```bash
# 1. Install dependencies (Bun recommended, npm works too)
bun install        # or: npm install

# 2. Set up the database (SQLite — zero config)
bun run db:push    # or: npx prisma db push

# 3. Run the dev server
bun run dev        # or: npm run dev

# 4. Open http://localhost:3000
```

> The database file is created automatically at `db/custom.db` on first run.
> Your progress (XP, streak, memories) is stored in an httpOnly cookie + SQLite.

---

## How to Play

1. **MEET** — Each day, a new crowd visits The Corner Café. Study each stranger:
   - Pick their standout **feature** (glasses? hat? freckles?)
   - Pick their **sound-alike** name image (Gordon → 🌷 *garden*)
   - Watch the **fusion** stick the image onto the face
2. **RECALL** — Later, the crowd returns. Type each name from memory.
   - Exact / close / missed — you'll get instant fuzzy-match feedback
3. **SCORE** — XP, streaks, and a Wordle-style share grid.

### The Memory System (Spaced Repetition)
- Friends you meet come back **when you're about to forget them** (1 → 3 → 7 → 14 → 30 → 90 → 180 day ladder)
- `knew` strengthens the memory, `close` holds it, `missed` weakens it (but never resets to zero)
- Up to 6 **Due Friends** return each day alongside the fresh crowd
- **Streak Freeze**: go flawless 5 days (or bank freezes) to protect your streak

### Weekend Specials
- **Twin Day (Saturdays)** — the crowd includes identical twins
- **Mysterious Golden Guests** — 12% chance of a bonus visitor worth +25 XP
- **Reunion Days** — the crowd is made of friends you've already met

---

## Project Structure

```
prisma/schema.prisma        # Player / Meeting / Session models
src/lib/game/               # Game engine (frozen contracts)
  types.ts                  #   Core types, constants, relationship/level logic
  data.ts                   #   104-person café roster w/ name-image hooks
  features.ts               #   14 facial features + portrait geometry
  crowd.ts                  #   Deterministic daily crowd generation (seeded)
  srs.ts                    #   Spaced repetition scheduler
  match.ts                  #   Fuzzy name matcher (Levenshtein)
  rng.ts                    #   Seeded RNG (FNV-1a + mulberry32)
  player.ts                 #   Cookie-based player identity
  api.ts                    #   Client fetch helpers
src/components/game/        # UI phases
  GameShell.tsx             #   State machine: hub → meet → recall → score
  Hub.tsx                   #   Daily dashboard
  MeetPhase.tsx             #   3-step encoding minigame
  RecallPhase.tsx           #   Name recall queue
  ScorePhase.tsx            #   Results + share card
  Portrait.tsx              #   Procedural SVG portraits
  VenueView.tsx             #   Full roster mastery view
  ShareCard.tsx             #   Wordle-style share grid
src/app/api/game/today/     # GET daily game state
src/app/api/game/submit/    # POST answers → authoritative scoring
src/app/api/venue/          # GET roster + mastery stats
research/                   # Design research reports (retention + memory science)
docs/GAME_CONCEPT.md        # Full design document
worklog.md                  # Development log
```

## Key Design Decisions

- **"The forgetting curve is the content calendar"** — the SRS review queue IS the retention mechanic IS the narrative mechanic (friends literally fade if you ignore them).
- **Deterministic crowds** — everyone on Earth gets the same crowd on the same day (seeded by date), enabling shared daily experience à la Wordle.
- **Fuzzy name matching** — "Gordn" counts as close, "gordon blake" counts exact. Client gives instant feedback; server is authoritative.
- **Warm palette only** — stone/amber/orange/rose/emerald. No blues. It's a cozy café.

## Scripts

```bash
bun run dev       # dev server (port 3000)
bun run lint      # eslint
bun run db:push   # push schema to SQLite
```
