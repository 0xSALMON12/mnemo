# GAME CONCEPT — "MNEMO" (working title)
**Task ID: 5** · Status: PITCH — awaiting user iteration/approval
Built from: `research/00-COMPILED-FINDINGS.md` → `01-game-design-retention.md` + `02-memory-techniques.md`

---

## The Elevator Pitch

> **You walk into a party. You walk out knowing every single person's name.**
>
> **MNEMO** is a daily memory game that teaches the *actual techniques* memory athletes use — face-reading, name-to-image conversion, memory palaces, spaced review — and wraps them in the retention mechanics of Wordle and Duolingo.
>
> Every day, one crowd. Every name you meet, comes back. Your memory is the save file.

**Genre:** daily puzzle / self-improvement hybrid (Wordle × Duolingo × memory sport)
**Session:** 3–8 minutes/day · **Platform:** web (PWA-ready) · **Honest claim:** real names, faces, numbers & lists skills — within-domain, evidence-backed (Dresler 2017: ordinary people double memory in 6 weeks)

---

## The Core Fantasy

Not "train your brain" (dead, FTC-fined category). The fantasy is **social superpower**:

- Walk into a 100-person event and greet everyone by name on the way out
- Never have the "sorry, what was your name again?" moment again
- Be the person who remembers *everything about everyone* — the bartender, the networker, the beloved teacher

The endgame is real: memory athletes memorize **224 faces+names in 15 minutes** (Katie Kermode). Ordinary people hit athlete-level in **6 weeks of 30-min/day** training (Dresler 2017, Neuron). The game's campaign *is* that ladder: 10 → 20 → 40 → 72 → 100 names.

---

## The Three Nested Loops

### 1. SESSION LOOP (60–90 seconds, the atom)
```
MEET (encode) → TEST (recall) → SCORE (feedback) → INVEST (place/story)
```
- **MEET:** faces appear one by one with names. You apply the technique: tap the distinguishing feature → pick/create the name-image → fuse them into a scene (0.5s "commit" beat — the placement micro-interaction from VR-MoL research)
- **TEST:** the recall walk — same faces, shuffled, no names. *Type* the name (production > recognition; testing effect: 80% vs 36% at 1 week). Wrong guesses cost nothing (real memory-sport rules)
- **SCORE:** per-item reveal, combo for flawless runs, delta vs. last time
- **INVEST:** every remembered person joins your world

### 2. DAILY LOOP (the Wordle appointment)
- **The Daily Crowd** — one shared crowd per day, same for everyone. Day 1 of the week: 6 people. By Sunday: 14. Saturday = themed chaos (twin names day — interference training). Sunday = **The Reunion** (everyone you met this week returns from the week's schedule)
- Streak counter + freeze (earn 1 freeze per 5 perfect days) + repair (never reset to zero)
- Spoiler-free share card: your crowd grid 🟩🟨⬜ + "I knew 11/12 names. Day 23."
- Open loop at session end: "Tonight, 3 memories mature. Maya's face is fading…"

### 3. CAMPAIGN LOOP (the story)
**The Venue** — your world grows as you do. You start as the new face at a small café; each chapter is a bigger venue (café → house party → wedding → conference → stadium). The people you meet *live there*.

- Each person you meet has a **stability bar** (a friendship-as-memory meter). It decays on the FSRS forgetting curve. When it hits 90%-risk, that person shows up in your due queue — they come by, they text, they're at the next venue
- Remember them → the bar extends (stability saturates like real SRS), relationship deepens, story beats unlock
- Forget them → no cruelty: "Aw. It's been a while." (soft signal, free review, no reset — Duolingo's freeze philosophy)
- Long-interval reviews become *events*: "It's been 3 months — the whole café crew is throwing a reunion. 47 guests. You've met all of them."

**The genius alignment:** the game's review schedule (FSRS) IS the player's return schedule. The daily quest ("4 friends drop by today") is literally the spaced-repetition queue. Retention mechanic = learning mechanic = story mechanic.

---

## Technique-as-Mechanic (no tutorial walls)

| Real technique (from research) | Game mechanic | Where you learn it |
|---|---|---|
| Attention first (the #1 real-world failure) | Faces appear full-screen for a beat; looking away (idle) = no file created | Level 1, unmissable |
| Feature-spotting | **The Face File**: tap THE distinguishing feature in ≤2s before the name shows | Level 1–2 drill |
| Name→image substitution | **Sound-Alike**: "Gordon" → pick 🌷garden from 3 options; later, type your own (generation effect) | Level 2–3 |
| Fusion (interactive imagery) | Drag the image onto the feature; it animates (garden GROWING from eyebrow). Distinct > bizarre | Level 3–4 |
| Memory palace anchoring | Build your venue as you play — every venue IS a palace with numbered loci (door, couch, bar, jukebox…) | Level 5+ (Chapter 2) |
| Retrieval practice | Always type, never multiple-choice; recall walk in palace order | Every session |
| Spaced repetition (FSRS) | The stability bar + due queue + reunions | Invisible, day 4+ |
| PAO / Major system | **The Roster**: collect 100 Person-Action-Object characters for the numbers heist mode | Skill tree, post-campaign |
| Sleep consolidation | Session-end cinematic: "The palace settles for the night." Return-tomorrow bonus | Ritual, day 2+ |

**The beginner bottleneck is solved by design:** research shows image-generation speed is THE wall (beginners stall at 10 names/60s). So the game ships with a pre-built **name→image dictionary** (~200 top names, frequency-ranked from real Memory League data — Michael, Jason, Maria…), and *upgrades players to their own associations* as they level (generation effect for the win).

**Adaptive difficulty:** crowd size, display time, twin-name interference, and delay length auto-tune to keep success at 70–85%. Struggle signals route you to a 30-second component drill (Feature Range / Name Roulette / Palace Sprint / Fusion Forge) — deliberate practice, automapped to your weakest step.

---

## Retention Stack (evidence → feature mapping)

| # | Mechanic (evidence) | MNEMO feature |
|---|---|---|
| 1 | Daily shared set (★★★) | The Daily Crowd, one per day, everyone same |
| 2 | Streak freeze/repair (★★★) | Streak + earned freezes + repair — never zero |
| 3 | 60s first win (★★★) | Cold open: 4 faces, guaranteed success, celebration, streak=1 — no signup, no tutorial |
| 4 | Due-queue quest (★★★) | "4 friends drop by today" completion ring |
| 5 | Spoiler-free share (★★★) | Crowd grid + day count |
| 6 | 70–85% adaptive band (★★★) | Auto-tuned crowd size/interference/delay |
| 7 | Widget + chosen reminder (★★★) | Reminder at YOUR time; "Maya fades tonight" |
| 8 | Endowed progress (★★★) | New players start "Café Mastery 8%", day-1 credit |
| 9 | Variable on fixed (★★) | Fixed XP + mystery guest / flawless flourish |
| 10 | Open loops (★★) | Every session ends mid-story: tomorrow's matured memories |
| 11 | Identity milestones (★★) | "You are a 30-day Memory Athlete" badge/cosmetic |
| 12 | Improvement leagues (★★, v2) | Weekly opt-in leagues on *improvement*, not absolute skill |
| 13 | Import-your-own (★★, v2) | Your real contacts / class material → your own crowds (self-reference effect, the ultimate investment moat) |

**Notification ladder:** D1 welcome+bonus → streak-guard at chosen hour → night-before plan message ("3 memories mature tomorrow 9pm — planning releases the tension") → 7-day win-back with 48h bonus. Max 1–2/day.

**Honest-sci guardrails:** we show in-game metrics (names recalled, best crowd, digits) — never "raises your IQ." The pitch is the party trick, and the party trick is real.

---

## MVP Scope (what we build first in this project)

**In (v1):**
1. Daily Crowd: 6→14 faces/day, seeded shared set, meet→recall→score
2. Technique drills embedded: Face File (feature tap) + Sound-Alike (name→image) with pre-built dictionary (~60 names for MVP, grows)
3. Streak + freeze (1 earned per 5 perfect days)
4. The Venue (café chapter 1): met-people persistence, stability bars (FSRS-lite: 1d→3d→7d→14d→30d), due-queue visits, relationship levels
5. First-win FTUE (cold open, 4 faces, <60s to first success), notification opt-in after first win
6. Share card (emoji grid) + stats digest (accuracy, best crowd, streak)
7. DB: players, daily crowds, people, meetings (SRS state), venues/loci, streaks

**Next (v1.5):** palace loci placement (drag scenes into venue rooms), Fusion Forge animated scenes, adaptive difficulty, widget, leagues
**Later (v2):** PAO roster + numbers heist, import-your-own-contacts, The Reunion mega-events, cosmetic deck collection

**Visuals:** procedural SVG portraits with controllable distinguishing features (glasses/hat/beard/earrings/scar…) — the features ARE game data. AI-generated portrait pack as upgrade.

**Why this wins:** it's the only product that *teaches the technique* (market gap, both reports), it rides the one forgetting-curve-aligned retention loop in existence, and it wears the two most proven habit architectures of the decade (Wordle daily + Duolingo streaks) while selling a real, honest superpower.

---

## Open Questions (for iteration)

1. **Fictional people or player's real people from day 1?** (Pitch says fictional-first, import in v2 — real names in the daily crowd could be creepier + logistics-heavy)
2. **Art style:** procedural SVG faces vs AI-generated portrait pool vs stylized illustration?
3. **Tone:** cozy café story vs. glitzy memory-sport competition vs. comedic party chaos?
4. **Name:** MNEMO? Mindfull? Crowd Control? Namesake? The Palace? Recall?
5. **Web-only MVP scope** — do we include sound/music day 1? (dual-coding research says audio helps encoding…)
6. **Single-player only v1**, or light async social (friend streak visibility) in v1?

---

# v1.1 — QoL Pass & Design Check

## Design review findings (what was checked)

**Economy integrity — PASS.** The daily session is the only thing the database
records: one crowd a day, 409 on re-submit, streak/freeze math server-side.
Risk found: any "play more" surface (i.e. custom mode) could devalue the daily
ritual and reopen farming. Resolution below.

**Difficulty curve — MOSTLY PASS.** The daily flow auto-tunes via the SRS
(up to 6 due friends woven into fresh crowds, 70–85% success band targeted by
knew/close/missed stepped intervals). Gap found: players who want MORE reps
(requested repeatedly: "can I practice?") had nowhere to go after the daily —
a retention leak for the exact audience (memory athletes) we want.

**Friction points found & fixed this pass:**
1. Mind-blank dead-end — recall had no escape hatch for a total blank;
   players had to type garbage. Added an explicit, low-shame
   "Mind blank — show them" reveal (counts as missed → restudy).
2. Twin Day ambiguity — surname-only answers scored "missed" even though
   surnames are exactly what disambiguates twins. Surname-only now = "close".
3. Hyphenated input ("gordon-blake") scored "close" — normalizeName now
   treats `-`/`_` as spaces → exact match.
4. Venue was unsorted rota order — added "Shakiest first" (default, doubles
   as a practice planner) / Strongest / A–Z sort chips.
5. Tutorial unreachable after FTUE — added "How to play" link on the hub.
6. Motion accessibility — `prefers-reduced-motion` now collapses all CSS
   animation; framer-motion wrapped in `MotionConfig reducedMotion="user"`.

## The custom mode decision: Practice Lounge (zero-stake, off-economy)

**Problem:** players want custom crowds (size, composition), but any reward
path through it would (a) let bots/grinders farm XP, (b) erode the "one crowd
a day" scarcity that powers the Wordle-style ritual, (c) pollute SRS state
(practicing a face 10× in a row would fake strength).

**Design (Duolingo practice, Wordle archive logic):**
- Practice is **client-side by construction**: crowd generation, grading,
  and results never touch the database. Nothing to exploit because nothing
  is written.
- Explicit framing everywhere: "practice pts — not banked", a streak-safe
  reassurance card, share card titled "MNEMO · Practice" (distinct from the
  daily grammar so daily shares stay scarce/meaningful).
- **Placement below the daily CTA** — the daily is always the hero; practice
  is styled as a dashed "back room" card ("Warm up before the crowd arrives"
  pre-daily / "The café's yours" post-daily).
- **Pool filters use real SRS data** (via /api/venue, cached): Fresh faces /
  My friends / Shaky memories (<60% strength) — practice doubles as targeted
  rehab for fading memories, reinforcing the core loop instead of competing
  with it.
- **Practice again** re-deals the same config with a fresh random crowd —
  the compulsion loop stays intact without touching the books.

## Verdict

The daily ritual remains the only rewarded path; practice absorbs the
"I want more reps" energy that would otherwise leak out of the game
or — worse — tempt us into farmable rewards later.
