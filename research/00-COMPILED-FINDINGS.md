# 00 — Compiled Findings & Design Synthesis
**Task ID: 4** · Merges `01-game-design-retention.md` (Task 2-a) and `02-memory-techniques.md` (Task 2-b) into one design brief.

---

## A. The One-Sentence Thesis

> **The forgetting curve is the content calendar.**
> In every existing game, content is consumed until it's exhausted. In a memory game, *content regenerates itself* — every name the player memorizes decays on a predictable biological schedule (Ebbinghaus/FSRS), and every decay schedules a return visit. The player's own biology powers the retention loop.

**Corollary:** the spaced-repetition review queue is simultaneously (a) the daily quest, (b) the appointment mechanic, (c) the investment moat, and (d) the honest learning engine. No other genre has this alignment.

---

## B. The Market Gap (from both reports)

| Existing product | Assumes you already have… | Fails at |
|---|---|---|
| **Memory League** | the technique (image speed, feature-spotting) | teaching it; beginners bounce off the 60s timer |
| **Anki / SuperMemo** | the content + discipline | technique, motivation, aesthetics; review-debt guilt |
| **Memrise / Quizlet** | generic content | technique; recognition-not-production testing |
| **Art of Memory** | patience for wall-of-text | any practice loop |
| **Lumosity / Peak** | nothing (abstract drills) | efficacy (FTC $2M fine; zero far transfer in 87-study meta-analysis) |
| **Duolingo / Wordle** | n/a | memory technique entirely — but they own the *habit architecture* |

**Nobody teaches the mnemonic technique AS the game loop.** That's the position: *Duolingo-grade habit design × real memory-athlete methodology.*

## C. The Honest Pitch (from Lumosity's grave)

- ✅ We CAN claim: you will get better at the trained skills — names, faces, numbers, lists. This is *within-domain* transfer, strongly evidenced (Dresler 2017: novices 26→62 words in 6 weeks, 30 min/day, durable at 4 months; name-face mnemonic validated by Hill 1987, Morris 2005, Troyer 2006).
- ✅ We CAN claim: retrieval practice + spacing beat restudy for the material you train (Karpicke & Roediger: 80% vs 36% at 1 week).
- ❌ We CANNOT claim: IQ gains, cognitive health, "a smarter brain." (Melby-Lervåg & Hulme meta-analysis: no far transfer.)

## D. The Numbers That Shape the Game

**Retention targets (puzzle genre = stickiest):** D1 ≥ 32%, D7 ≥ 13%, D30 ≥ 6% (stretch: 40/20/10).
**Diagnostic:** weak D1 = onboarding; weak D7 = habit loop; weak D30 = depth/social.
**Difficulty band:** 70–85% success rate (flow). ~60% of players quit too-hard games.
**Benchmarks for the core feat:**
- Beginner ceiling: ~10 names in 60s (6 s/name) — feels impossible at first
- Elite: 15 names/60s; records: Kermode 224, Dellis 235, Alam 218 names in 15 min
- Dresler ladder for the campaign: 10 → 20 → 40 → 72 → 100 items
- FSRS: schedule each review when retrievability hits 90%; ~30% less review time than SM-2; stability saturates (diminishing returns are honest, model them)

## E. The Technique Stack (what the game teaches, in order)

1. **Attention** — the #1 real-world failure is never encoding the name at all
2. **Feature-spotting** — pick the ONE distinguishing feature (the "file")
3. **Name→image conversion** — substitute words (Terry→tearing, Mark→marker, Gordon→garden); champions pre-build ~500–900 name libraries; the generation effect says player-chosen images beat handed ones
4. **Fusion** — one exaggerated, *interactive, moving* scene (garden GROWING out of the eyebrow). Distinctiveness > bizarreness (McDaniel & Einstein 1986)
5. **Anchoring (palace)** — for 10+ items: sequential loci give order, completeness, retrieval cues; Kermode Method: people-as-loci for max distinctiveness
6. **Retrieval, not re-seeing** — active production, no penalty for wrong guesses (real competition rules)
7. **Spaced review** — FSRS-scheduled; the stability bar per person is a visible game resource
8. **(Skill tree) Numbers**: Major system → PAO roster (a collect-100-characters metagame)

## F. The Retention Stack (evidence-ranked, from 2-a playbook)

**v1 skeleton (the 80%):**
1. Single daily set ("Daily Crowd") — Wordle scarcity + shared culture
2. Streak with freeze + repair — never reset to zero (Duolingo: 24% of DAU hold 365+ streaks)
3. 60-second first win, zero-friction FTUE (no sign-up before first success)
4. Due-queue as daily quest ("4 friends drop by today") — Zeigarnik + appointment
5. Spoiler-free share card (emoji grid)

**v1.5:** adaptive difficulty band · widget/reminder at chosen time · pre-loaded progress bars (endowed progress: 34% vs 19%) · variable bonus on fixed XP · open loops at session end ("tomorrow, 3 friends return")

**v2:** weekly leagues on improvement (opt-in, small groups) · personal content import (self-reference effect + investment moat) · cooperative goals · rolling chains (post-reward reset antidote) · milestone identity framing ("30-day Memory Athlete")

**Onboarding targets:** first success <60s, "aha" (a name sticks that wouldn't have before) <90s, teach-in-challenge, notification opt-in after first win.

**Session design:** 3–8 min daily; warm-up → peak → win shape; every stop point graceful; end on an open loop.

## G. Design Pillars (synthesis)

1. **The technique IS the game** — no tutorial overlay; every mechanic is a real mnemonic step
2. **The crowd is alive** — people you meet return on forgetting schedules; memory = relationship
3. **Honest gains** — in-game skill you can feel; never brain-health claims
4. **Shared daily ritual** — everyone meets the same crowd once a day
5. **Your memory is the save file** — the palace/roster/relationships are the investment

## H. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Streak anxiety (documented Duolingo failure mode) | freeze-first design, repair over punishment, gentle copy |
| Image generation too hard for novices (the real bottleneck) | pre-built name→image dictionary (~200 names at launch), player can override (generation effect) |
| Looks like "another brain game" | lead with the *party-trick fantasy* + real records (224 names!) as endgame goals |
| Repetition fatigue of same faces | interference events, rotating venues, reunion format, PAO roster variety |
| Fairness of daily shared sets | seeded RNG, same crowd for all, no pay-for-advantage |
