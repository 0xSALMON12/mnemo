# Project Worklog

Project: Memory-Technique Game (working title TBD) — research → design → build

---
Task ID: 0
Agent: main (Z.ai Code)
Task: Setup research infrastructure

Work Log:
- Created scripts/research.mjs — CLI for web_search + page_reader via z-ai-web-dev-sdk (backend only)
- Created research/ directory for raw + compiled research artifacts
- Verified search pipeline works end-to-end

Stage Summary:
- Research CLI ready: `bun scripts/research.mjs search "q" [num]` / `read "url"` / `deep "q" [num] [outfile]`
- Next: parallel research agents (game design/retention + memory techniques)

---
Task ID: 2-a
Agent: general-purpose (game design & retention research)
Task: Research game design, player attention, and retention mechanics for a memory-training game; produce compiled report.

Work Log:
- Ran 29 distinct web searches covering: core/compulsion loops, Hooked model, Duolingo streaks, D1/D7/D30 benchmarks, variable rewards/loot boxes, appointment mechanics & daily rewards, loss aversion/Zeigarnik, SDT, flow/DDA, onboarding FTUE, leaderboards/social, endowed progress & goal-gradient, push notifications, brain-training (Lumosity FTC, WM-transfer meta-analyses), SRS gamification, Candy Crush, NYT/Wordle, session design, habit-formation timelines. Search dumps saved as research/raw/search-*.json
- Read ~25 full pages (saved as research/raw/*.md), incl. appagent & segwise benchmark reports, Nir Eyal Hooked article, Playio FTUE guide, Pushwoosh notification study, daily-rewards craft articles (Game Developer, PM Playground), Wordle psychology (Psychology Today), endowed-progress & goal-gradient deep-dive (Nunes & Drèze 34% vs 19%; Kivetz 2006 post-reward reset), Zeigarnik explainer, habit-formation 66-day analysis, WM far-transfer meta-analysis, SDT overview, Candy Crush mechanics + King level-65 analytics, leaderboard quasi-experimental study (Cigdem 2024), Duolingo classroom study
- Hit API 429 rate limits early (parallel reads) → switched to sequential reads with retries; all key pages recovered
- Compiled findings into research/01-game-design-retention.md (~5,200 words): executive summary, 15 sub-topic sections each with findings + numbers + design implications, and "The Retention Playbook" — 22 ranked retention mechanics with evidence ratings and a build-sequencing note

Stage Summary:
- Key numbers: puzzle genre D1 31.9%/D7 12.2%/D30 5.4% (sticky benchmark); D1 leak=onboarding, D7=habit, D30=depth/social; habits take ~66 days (median), one missed day harmless, weeks 3–6 are the quit zone; Duolingo ~9M users hold 365+ day streaks (~24% of DAU); endowed progress 34% vs 19% completion; ~60% of players quit too-hard games; push hooks: −26% early churn (justDice), 7.4% CTR streak pushes; Lumosity paid $2M FTC fine — zero far transfer from WM training (87-study meta-analysis) → market the in-game skill gains, never cognitive-health claims
- Artifacts: research/01-game-design-retention.md (main deliverable), 29 search dumps + ~25 page reads in research/raw/
- Next: merge with Task 2-b memory-techniques report → game concept/design doc → prioritize v1 mechanic set (daily set, streak+freeze, FTUE 60s win, due-card quest, share card)
---
Task ID: 2-b
Agent: general-purpose (memory techniques research, attempt 2)
Task: Mine prior agent's ~28 raw page reads on memory techniques, fill gaps with new searches/reads, compile research/02-memory-techniques.md.

Work Log:
- Read and mined all ~28 pre-existing raw files from attempt 1 (method-of-loci-wiki, dresler-abstract/psychtoday, kermode-method, major-system-wiki, pao-aom, guinness-names-faces, memory-league-site, moonwalking-wiki, dominic-obrien-wiki, miller-1956, bizarreness-wiki, delaney-names, memoryjohn-faces, aom-name-techniques-forum, planetbanatt-memory, dylankane-training, why-loci-works, wmc-wiki, wms-standards, usa-events, spacing-effect-wiki, testing-effect-andy, supermemo-history, vr-memory-uib + search dumps); flagged 2 dead files (aom-names-approach-forum = Cloudflare ban, manchester-vr-mol = 404) for replacement
- Discovered CLI quirk: `read URL outfile` prints to stdout because script writes argv[5] only — saved pages via dummy-arg form `read URL x outfile`
- 13 new sequential searches saved as s36–s48 (Dresler pre/post numbers, FSRS detail, Ebbinghaus curve, Roediger/Karpicke 2008, Karpicke 2008 numbers, Moll VR-MoL, Lorayne method, Alex Mullen, next-in-line/name-failure science, sleep consolidation, Cowan capacity, IAM names format)
- 8 new full-page reads saved: expertium-fsrs.md, borretti-fsrs.md, wagner-2021-durable.md, sciencedaily-dresler.md, forgetting-curve-cogpsych.md, moll-2022-vr-mol.md, namefinity-experts.md, psychinaction-names.md (spaced ~3s, no rate-limit hits)
- Wrote compiled report research/02-memory-techniques.md (~5,600 words): exec summary, 11 sub-topic sections with exact numbers, sources table, and "Memory-Technique → Game-Mechanic Translation Table" (11 rows)

Stage Summary:
- Key numbers: Dresler 2017 = 40×30-min daily sessions/6wk, novices 26→62/72 words, athletes 71/72, durable at 4 months; 25 connectivity hubs (mPFC + right DLPFC); Wagner 2021 adds durability + neural efficiency. Name-face algorithm = feature → substitute-word → animated fusion → review; records: Kermode 224 names/15min (IAM 2018), GWR Alam 218, Dellis US 235; ML tutorial benchmark 10 names/60 s, elite 15/60 s; USA format 135 photos/15 min/20-min recall/1pt per correct name. Ebbinghaus 58%@20min/44%@1h/34%@1d/21%@31d; Karpicke 2008 80% vs 36% @1wk; FSRS DSR model, review at R=0.9, ~30% less than SM-2; Moll VR-MoL +20–22% recall, minutes of training. WM 4±1 chunks → mnemonics convert to LTM at encoding.
- Artifacts: research/02-memory-techniques.md (main deliverable), 13 search dumps + 8 new raw reads in research/raw/ (62 .md total)
- Next: merge with research/01-game-design-retention.md into game concept doc; v1 mechanic set: palace-walking loop, feature/name-image/fusion drills, stability-bar guests on FSRS schedule, 100-name finale

---
Task ID: 4
Agent: main (Z.ai Code)
Task: Compile both research reports into a single design synthesis

Work Log:
- Read both full reports (research/01-game-design-retention.md, research/02-memory-techniques.md)
- Wrote research/00-COMPILED-FINDINGS.md: one-sentence thesis ("the forgetting curve is the content calendar"), market-gap table (Memory League/Anki/AoM/Lumosity/Duolingo), honest-claims guardrails, key shaping numbers, 8-step technique stack, evidence-ranked retention stack (v1/v1.5/v2), 5 design pillars, risk table

Stage Summary:
- Synthesis doc ready as the bridge between research and the game concept
- Core design insight locked: SRS review schedule = retention schedule = story schedule; no other genre has this alignment

---
Task ID: 5
Agent: main (Z.ai Code)
Task: Design the game concept at the intersection of both research reports

Work Log:
- Wrote docs/GAME_CONCEPT.md (full pitch): working title MNEMO, elevator pitch, social-superpower fantasy, 3 nested loops (session 60-90s: MEET→TEST→SCORE→INVEST; daily: The Daily Crowd + streak/freeze + share card; campaign: The Venue with FSRS-driven NPC returns and stability bars)
- Technique-as-mechanic table mapping 9 real mnemonic techniques to game mechanics (Face File, Sound-Alike, Fusion, palace venues, PAO Roster, sleep ritual)
- Beginner-bottleneck solution: pre-built name→image dictionary (research: image-gen speed is THE wall; Memory League 910-unique-name data)
- Retention stack: 13 mechanics mapped to evidence ratings; notification ladder; honest-sci guardrails
- MVP scope for this project: Daily Crowd (6→14 faces/day, seeded shared set), embedded drills, streak+freeze, Venue chapter 1 with FSRS-lite stability bars, 60s first-win FTUE, share card, Prisma schema outline
- Listed 6 open questions for user iteration (art style, tone, name, real-vs-fictional people, audio, social)

Stage Summary:
- Concept doc complete at docs/GAME_CONCEPT.md; awaiting user iteration/approval before build (Task 6: pitch delivered in chat)

---
Task ID: 8-b
Agent: general-purpose (MNEMO portrait art + venue + share card)
Task: Build Portrait.tsx SVG system, VenueView.tsx, ShareCard.tsx

Work Log:
- Read worklog.md, docs/GAME_CONCEPT.md, and the frozen contracts (types.ts, features.ts, palettes.ts, rng.ts) + globals.css (.mnemo-ring/.scrollbar-cozy exist), ui primitives (Button/Badge/Progress), layout.tsx (sonner Toaster already mounted)
- Created src/components/game/Portrait.tsx (default export, ~430 lines): procedural SVG portrait, viewBox 0 0 100 100, exact geometry contract (head ellipse 50,46 rx22 ry25; ears (28,48)/(72,48) r4.5; eyes white rx2.8 ry3.2 + pupil r1.6 #2A2018; nose M50 47 Q52.5 52 49 53.5; mouth y≈61; blush rgba(226,125,96,.22) (36,54)/(64,54); neck rect 44,68 12×14; shirt path M18 100 Q… 82 100 Z + darker collar arc)
  - ALL 14 feature renderings from FEATURES: glasses (r7 lenses + bridge + temples), hat (beanie dome + folded brim + pompom, knit color deterministically derived from shirt index), beard (jaw path with scalloped edge, mouth drawn on top), mustache (two lobes), goatee (tuft + soul patch), earrings (gold #E3B341 + hooks + shine), freckles (7 fixed dots), mole, bowtie + 5 hair features: bald (shine arcs), curlyHair (base cap + 11 circles r5-6.8 along top arc), bun (short cap + r7 circle + tie band), ponytail (short cap + teardrop behind head), longHair (panels behind head + center-parted cap + part line)
  - 4 baseline hairstyles (buzz 90% opacity / short + side sweeps / medium / long panels-behind-head) rendered ONLY when featureId ∉ HAIR_FEATURES
  - 3 expressions: neutral/happy (open mouth curve + blush raised 1)/sad (inverted mouth + brows angled up-inward); brows track hair color
  - highlight=true → soft glow circle (r+5, #F59E0B opacity .25 width 5) + .mnemo-ring pulsing dashed circle at FEATURES[featureId] coords; feDropShadow (dy .5, blur 1, opacity .12 #4A3A28) on head group; aria-label "Portrait of a person with {feature label}"; pure deterministic render (no Math.random/Date/hooks, pure shade() helper, static shape arrays)
- Created src/components/game/VenueView.tsx: "use client" full-screen fixed inset-0 z-50 overlay (#FBF3E4 + radial amber warmth), header (Coffee icon, serif "The Corner Café", subtitle, 44px X close), Escape-to-close + body scroll-lock effect, mastery card (amber Progress, {pct}% of the café met, met/total, Lv chip, relationship legend), people grid grid-cols-2→3→4 capped max-h-[60vh] overflow-y-auto scrollbar-cozy, PersonCard (Portrait 88, name, relationship Badge emerald Friend+/amber mid/stone New Face, Memory-strength Progress, "Drops by today! ☕" badge or "Next visit today/tomorrow/in Nd" via timezone-safe local Date math, bio line-clamp-2, hover:shadow-md, not clickable), framer-motion stagger 60ms fade+rise 12px, cozy silhouette empty state
- Created src/components/game/ShareCard.tsx: "use client" warm card (white/80, amber-200 border, rounded-2xl p-4), "MNEMO #{day}" + "The Corner Café" + Coffee icon, gridLine → 24px rounded squares (🟩 emerald-400 / 🟨 amber-400 / ⬜ stone-200) wrapped at 8/row via w-[220px], "{correct}/{total} names" + "· flawless ☕", Copy button (outline, h-11 touch target, clipboard.writeText(shareText) → "Copied!"+Check for 2s + toast.success via sonner, clipboard-failure toast.error fallback, timer cleanup on unmount, aria-label)
- Verification: bunx tsc --noEmit → ZERO errors in src/** (only 4 pre-existing ignorable errors in examples/ + skills/); bun run lint → 0 problems in my 3 files (2 errors + 1 warning exist in sibling agent's GameShell/MeetPhase/RecallPhase — not mine to touch); determinism smoke test (temporary .smoke-8b.tsx, deleted after): 92 renderToStaticMarkup renders across all 14 features × 3 expressions × highlight on/off + 4 hairBases + VenueView(data/empty) + ShareCard — no NaN/undefined leaks, ring class present when highlighted, aria-labels correct, byte-identical repeat renders
- Noted mid-flight contract drift: sibling agent's files briefly called <Portrait person={…}/>; they updated to appearance/featureId on their own; final tree typechecks against my PortraitProps as specced — no compat shim needed

Stage Summary:
- Artifacts: src/components/game/Portrait.tsx, src/components/game/VenueView.tsx, src/components/game/ShareCard.tsx (exactly the 3 assigned files; zero other files touched)
- Portrait = pure deterministic function of (appearance, featureId, expression, highlight): 14 features + 4 baseline hairstyles + 3 expressions all implemented, warm palette only (no blue/indigo/violet), 1.6-2.5 stroke weights, head-group feDropShadow, Face File highlight uses FEATURES anchor coords (x,y,r) with .mnemo-ring from globals.css
- Integrator notes: <Portrait appearance featureId size highlight expression/>; VenueView takes {data: VenuePayload, onClose} and locks body scroll (pair with a mount point in Hub/GameShell); ShareCard is presentation-only — wire shareText/gridLine from SubmitResponse; sonner Toaster already mounted in layout.tsx; Progress indicator recolored via [&_[data-slot=progress-indicator]]:bg-amber-400
- Lint debt outside my scope: GameShell.tsx react-hooks/refs error (line 289), RecallPhase.tsx ref-in-render error (line 57), MeetPhase.tsx unused eslint-disable — owned by Task 8-a agent

---
Task ID: 8-a
Agent: general-purpose (MNEMO game flow frontend)
Task: Build game flow: api client, GameShell, Hub, MeetPhase, RecallPhase, ScorePhase, page wiring

Work Log:
- Read worklog.md, docs/GAME_CONCEPT.md, and the frozen contracts (types.ts, features.ts, match.ts, palettes.ts, data.ts) + backend routes (today/submit/venue) + ui primitives (Button/Card/Badge/Progress/Input/Dialog) + globals.css (cafe bg, .mnemo-ring, .scrollbar-cozy) + layout.tsx (sonner Toaster already mounted)
- Curl-verified live API shapes: GET /api/game/today (onboarding crowd = gordon-blake/amy-santiago/leo-galante, golden flag on index 0, rosterSize 104), POST /api/game/submit (authoritative matchName grading, XP economy 10/5/+5 due/+25 golden/+25 perfect, freeze logic, shareText, gridLine, teaser), GET /api/venue
- Created src/lib/game/api.ts: typed fetch client — fetchToday()/fetchVenue() (no-store GETs), submitSession() POST with 409 → AlreadyPlayedError class, network-error wrapping; exports TodayResponse/SubmitApiResponse/VenueResponse = *Payload & { rosterSize } (rosterSize lives outside types.ts by design, noted here)
- Created src/components/game/GameShell.tsx: client state machine loading→hub→meet→recall→score(+done); owns TodayPayload; sticky header (Brain wordmark, Flame streak badge, Snowflake freezes badge dimmed at 0, Lv chip, amber XP Progress via [&_[data-slot=progress-indicator]]:bg-amber-500, compact mobile layout); sticky-bottom footer (mt-auto, safe-area-inset padding, "your memory is the save file"); AnimatePresence mode="wait" 300ms easeOut phase slides; submit round-trip with retry card on failure + AlreadyPlayedError → toast + refetch; after submit synthesizes alreadyPlayed+lastSession into TodayPayload so Score→Done lands on the recap hub without refetch; level-up detection via prevPlayer state; Venue overlay (fetch on open, loading/error/ready states, renders <VenueView data onClose/>)
- Created src/components/game/Hub.tsx: time-of-day greeting (4 variants), alreadyPlayed recap card (grid emojis from lastSession, score/perfect, "See you tomorrow — N memories mature tonight", venue button); Due Friends strip (44px Portraits + relationship labels); Daily Crowd card (twin-first-name detection → "Twin Day" Users badge, any golden → "A mystery guest lurks" Sparkles badge, UTC-dow Sunday → "Reunion Sunday" badge, amber 56px "Open the doors" CTA); Café Mastery endowed-progress card (0/{rosterSize}); teaser line; FTUE welcome Dialog (shadcn, onInteractOutside/onPointerDownOutside/onEscapeKeyDown prevented, no close button, "Take off your coat")
- Created src/components/game/MeetPhase.tsx: per-person 3-step encoder — Step 1 Face File (200px Portrait, 3 feature buttons = correct person.feature + 2 seeded distractors from FEATURES, wrong→shake+sonner "Look again…" retry, correct→portrait highlight ring + emerald flash + "That's their file."), Step 2 Sound-Alike (3 emoji cards, correct person.emoji + 2 seeded other-roster emoji/labels with same-emoji filtering, pop spring, "Names are slippery. Pictures aren't."), Step 3 Fusion (emoji flies from below onto feature.x/y% via framer-motion, caption "{first} → {emojiLabel}", Next button + 1.6s auto-advance); seeded via hashString+mulberry32 on person.key (stable options); "The crowd shuffles…" interstitial between persons; "Meeting N of M" + dots; onboarding coaching on first person (3 italic lines + pulsing amber ring hint on the correct feature button); onDone(met: {personKey, golden}[])
- Created src/components/game/RecallPhase.tsx: crowd+dueFriends Fisher-Yates shuffled once (useState initializer), per-person 180px Portrait + "Who is this?" + amber "Returning friend" badge + autofocus Input + 44px submit (Enter via form); INSTANT client feedback via matchName(): knew→emerald "Yes! {full}", close→amber "So close — it's {full}", missed→rose restudy card (name + emoji/label + bio + "Filed back into memory…"), all with focus-managed Next button; progress "n / total" + thin amber bar; answers collected {personKey, guess, isDue, golden}; onboarding one-liner before first prompt
- Created src/components/game/ScorePhase.tsx: perfect → "FLAWLESS DAY ☕" + 20-piece falling emoji confetti (fixed overlay, 1.8s, once) else "{correct}/{total} names"; gridLine → spring-staggered rounded squares (🟩 emerald-500/🟨 amber-400/⬜ stone-200); XP count-up (rAF cubic ease-out) + Lv chip + amber progress; streak block (best streak, freezeUsed notice, freezeEarned bonus, perfectPoints/5 progress); results grouped Returning friends → Today's new faces (40px Portrait via PERSON_BY_KEY lookup, "you said:", status dot Check/AlertTriangle/X, emoji+label, relative nextDue ("tomorrow"/"in Nd", client-side UTC math), relationship badge) in max-h-96 scrollbar-cozy; ShareCard wired with exact SubmitResponse fields; MoonStar open-loop card; "Visit the café" + "Done" buttons
- Wired src/app/page.tsx to render <GameShell /> (server component passthrough; metadata untouched in layout)
- Fixed cross-component contract after 8-b landed mid-flight: Portrait takes {appearance, featureId, size, highlight} not {person} — updated all 6 call sites; ScorePhase uses PERSON_BY_KEY[personKey] since SessionResultItem carries no appearance; VenueView {data: VenuePayload, onClose} and ShareCard props matched exactly as specced
- Lint fixes for react-hooks v6 rules: refs no longer written during render (onDoneRef synced in useEffect), prevPlayer moved ref→state, handleRecallDone/retrySubmit un-memoized, initial fetch moved to .then/.catch callback in useEffect with cancellation + reloadKey for retry/already-played refetch, amber recolor on every Progress indicator
- Verification: bunx tsc --noEmit → ZERO errors in src/** (only pre-existing examples/ + skills/ errors); bun run lint → 0 problems; end-to-end curl smoke test with cookie jar: today(onboarding crowd) → submit(1/3, 🟩⬜⬜, +35 XP, day 1) → today(alreadyPlayed=true + lastSession recap + streak 1) → double-submit → 409; also verified 3/3 perfect (+80 XP incl. golden+perfect bonuses); GET / renders 200 with loading phase, no SSR errors

Stage Summary:
- Artifacts: src/lib/game/api.ts, src/components/game/{GameShell,Hub,MeetPhase,RecallPhase,ScorePhase}.tsx, wired src/app/page.tsx — nothing else touched (types.ts/features.ts/match.ts/palettes.ts/data.ts/layout/globals.css/portrait trio untouched)
- UX flow as built: Hub (greeting/recap/quest/crowd card) → Meet (Face File → Sound-Alike → Fusion, technique taught by playing, zero penalties) → Recall (shuffled type-the-name walk, instant isomorphic matchName feedback, misses = restudy reveals) → Score (Wordle grid, XP count-up + level-up toast, streak/freeze story, grouped results, share card, tomorrow open loop) → Hub recap; Venue overlay reachable from Hub + Score
- Key decisions: (1) rosterSize/TodayResponse types extended in api.ts rather than editing types.ts; (2) deterministic seeded distractors (hashString+mulberry32 per person.key) so option order is stable across re-renders; (3) after submit, TodayPayload is locally synthesized to alreadyPlayed+lastSession so Done lands on recap instantly; (4) empty recall guesses allowed (honest "pass" → missed, matches no-penalty memory-sport rules); (5) client-side relative due dates ("tomorrow"/"in Nd") computed from nextDue in UTC; (6) Café Mastery shows 0/{rosterSize} baseline — TodayPayload carries no mastery data (real meter lives in VenuePayload, rendered by 8-b's VenueView)
- Contract notes for integrator: Portrait contract = {appearance, featureId, size?, highlight?, expression?}; fetch client relies on same-origin cookie (mnemo_pid) which browsers send by default — curl tests need an explicit cookie jar; 409 double-submit maps to AlreadyPlayedError → toast + refetch recap

---
Task ID: 8-c (integration & fixes)
Agent: main (Z.ai Code)
Task: Integrate both frontend agents' work, fix runtime bugs found in browser verification

Work Log:
- Task 8-a (flow) completed but its final message was lost to a server shutdown; worklog + files verified intact (api.ts, GameShell, Hub, MeetPhase, RecallPhase, ScorePhase, page.tsx wired)
- Task 8-b (art) delivered Portrait.tsx (14 features + 4 baselines + 3 expressions), VenueView.tsx, ShareCard.tsx — all verified
- BUG 1 (fixed): Twin Day never fired — CROWD_SIZES used Mon=0 indexing but getUTCDay() is Sun=0; corrected in types.ts, crowd.ts, submit route
- BUG 2 (fixed): MeetPhase state desync/race — rewrote with single `cursor` state {personIndex, step}, idempotent goNext via advancedRef, step-guarded functional setCursor
- BUG 3 (fixed, root cause of "stuck step"): framer-motion AnimatePresence mode="wait" exit animations intermittently never complete → DOM froze at old step while React state advanced (verified via instrumented console + computed opacity 0). Converted ALL step/phase/section transitions in MeetPhase, RecallPhase, GameShell, VenueView to freeze-proof CSS keyframe classes (.mnemo-step-in/.mnemo-slide-in/.mnemo-fade-in/.mnemo-card-in); framer-motion kept for micro-interactions only
- BUG 4 (fixed): Hub Café Mastery always showed 0/roster — added metCount to /api/game/today payload + Hub meter
- Verified roster integrity: 104 people, 14 feature types, 7 twin pairs, unique keys

Stage Summary:
- MNEMO v1 fully playable end-to-end; all bugs root-caused and fixed; tsc + lint clean

---
Task ID: 10
Agent: main (Z.ai Code) with agent-browser
Task: End-to-end browser verification of the golden path

Work Log:
- FTUE: welcome dialog → 3-person coached crowd → first win (screenshots 01-03)
- Meet phase: Face File (hint ring) → Sound-Alike (emoji options) → Fusion (flying emoji) for all persons (shots 03-07)
- Recall: type-the-name with instant matchName feedback; intentional miss showed restudy reveal (Leo → leo sign); knew/close/missed paths exercised
- Score: +10 XP day 1; grid 🟩⬜⬜; share card copied (toast); open loop "Tonight, 2 memories mature"
- Venue: mastery card + person cards with strength bars + next-visit scheduling (shot 12)
- Day-2 simulation (backdated session): due-friends strip "2 friends dropping by" → 9-item recall weave (7 new + 2 due) → +125 XP, level-up to Barista's Friend, 2-day streak, freeze progress 1/5, RETURNING FRIENDS vs NEW FACES groups, SRS step-ups (back in 3d) (shot 16)
- Mobile 390px: hub + venue responsive, touch-friendly (shots 17-18)
- Fixed Café Mastery 0/104 → 10/104 (shot 19)
- dev.log clean, no browser page errors, tsc/lint clean

Stage Summary:
- Golden path + retention loop verified in real browser; MNEMO v1 is DONE and playable

---
Task ID: 11
Agent: main (Z.ai Code) with agent-browser
Task: Final integration pass — re-verify golden path after subagent merge, fix discovered bugs, package downloadable source (user asked "can I download it?")

Work Log:
- Verified all 9 game components + page.tsx wiring present; full tsc --noEmit clean for src/, eslint clean, dev.log healthy
- Full agent-browser E2E: FTUE welcome → Meet (Face File/Sound-Alike/Fusion ×3) → Recall → Score → Venue → Done
- BUG A (fixed): matchName compared fuzzy distance only against FIRST name — "Ami Santiago" (distance 1 on 12 chars) scored "missed" instead of "close". Added full-name fuzzy check with length-scaled tolerance; 10/10 matcher unit cases pass; verified live in browser ("So close — it's Amy Santiago" amber card, +5 XP)
- BUG B (fixed): onboarding welcome dialog reappeared on the post-session recap hub — GameShell kept stale data.onboarding=true. Fixed by patching onboarding:false in handleRecallDone
- BUG C (fixed): Café Mastery showed stale 0/104 on recap hub after Done — handleScoreDone now bumps reloadKey to refetch /api/game/today (authoritative mastery + alreadyPlayed → done phase)
- Verified XP economy end-to-end: knew 10 + golden 25 = 35; knew+close = 15; grid colors correct (amber close / green knew / gray missed); SRS "back in 3d" for knew, "back tomorrow" for close/missed
- Mobile (iPhone 14) + desktop layout verified; sticky footer with safe-area OK
- Added README.md (setup + how-to-play + architecture) for the downloadable package
- Created public/downloads/mnemo-game.zip (888 KB, 280 files: src, prisma, research incl. raw pages, docs, README; excludes node_modules/.next/db/skills) served at /downloads/mnemo-game.zip; added "download source" footer link in GameShell
- Rebuilt zip after all fixes; HTTP 200 verified

Stage Summary:
- 3 real bugs found and fixed during browser E2E; matcher now matches spec
- Downloadable source package live at /downloads/mnemo-game.zip + footer link in-game
- MNEMO v1 verified playable end-to-end: tsc/lint clean, dev.log clean, no page errors

---
Task ID: 12
Agent: main (Z.ai Code) with agent-browser
Task: QoL pass + game design check + custom "Practice Lounge" mode (user request)

Work Log:
- Built Practice Lounge (custom mode), zero-stake by construction: crowd generation + grading + results 100% client-side, zero DB writes
  - crowd.ts: generatePracticeCrowd (pools: anyone/fresh/friends/shaky via venue metKeys+strength; size 3-12 clamped; pool top-up fallback; 12% golden flavor)
  - PracticeSetup.tsx dialog: size slider + pool radios with live counts + shaky empty-state note
  - GameShell: practice phases reuse Meet/Recall/Score; client matchName grading mirrors server XP formula (knew 10 + golden 25, close 5, perfect 25) but banks nothing
  - ScorePhase practice variant: "+N practice pts (off the record)", streak-safe reassurance card, no SRS scheduling text, no daily teaser, "Practice again" re-deals same config
  - ShareCard practice title "MNEMO · Practice"
  - Hub: dashed "back room" practice card (pre-daily: warm-up framing; post-daily: café's yours), below the daily CTA to protect ritual scarcity
- QoL fixes:
  - RecallPhase: "Mind blank — show them" escape hatch (missed → restudy reveal, no forced garbage typing)
  - match.ts: hyphens/underscores normalize to spaces ("gordon-blake" → knew); surname-only = close (disambiguates Twin Day); 9/9 test cases pass
  - VenueView: sort chips — Shakiest first (default) / Strongest / A–Z; verified live with seeded strengths (0.14→0.71 asc, desc, A–Z)
  - Hub: "How to play" replay link
  - globals.css + MotionConfig reducedMotion="user": prefers-reduced-motion support
- BUG fixed during E2E: FTUE welcome re-popped after practice round-trips for never-played-daily players (hub remount × stale data.onboarding) → welcomeDismissed state in GameShell + autoWelcome/onWelcomeDismiss props; also converted ref→state after react-hooks/refs lint error (ref read during render)
- DB integrity verified: practice rounds added 0 sessions/meetings/xp (curl + prisma checks)
- Browser E2E: setup dialog (pool counts 104/104/0/0 fresh player), practice meet without coaching, recall w/ mind-blank, +20 practice pts score, practice again re-deal, back-to-café w/o welcome re-pop, venue sorts, how-to-play
- tsc + eslint clean; docs/GAME_CONCEPT.md appended "v1.1 — QoL Pass & Design Check"

Stage Summary:
- Custom mode shipped as economy-safe Practice Lounge (3-12 faces, 4 pools, off-the-record scoring)
- 6 QoL improvements + 1 bug fixed; matcher hardened (hyphens, surnames)
- Daily ritual remains the only rewarded path — design check documented in GAME_CONCEPT.md
