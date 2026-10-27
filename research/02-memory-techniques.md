# 02 — Memory Techniques: Party Tricks → World-Record Feats → Cognitive Science

**Task 2-b deliverable** · Research for a game that teaches real mnemonic techniques through gameplay. Core fantasy: "memorize 100 names from a 100-person crowd."
Mines ~28 pre-existing raw page reads in `research/raw/` plus 13 new searches and 8 new page reads (all cited inline).

---

## Executive summary — 10 key findings

1. **Ordinary people double their memory in 6 weeks.** In Dresler et al. 2017 (*Neuron*), novices did 40 daily 30-minute sessions of method-of-loci training and went from recalling **26 words → 62 words** of a 72-word list; performance was **still high 4 months later** with no further training. World athletes in the same study: **71/72 words** ([ScienceDaily](https://www.sciencedaily.com/releases/2017/03/170308131236.htm), [Psychology Today](https://www.psychologytoday.com/au/blog/demystifying-psychiatry/201707/memory-athletes-and-the-rest-us)).
2. **The name-face technique is a fixed 4-step algorithm**: (1) capture a distinguishing feature (or "vibe"), (2) convert the name into a concrete picture (substitute word), (3) fuse picture ↔ feature into one exaggerated animated scene, (4) anchor the scene and review it once later. Used by every champion and validated experimentally (Hill et al. 1987; Morris et al. 2005) ([Memory John](https://memoryjohn.com/how-to-remember-faces), [Namefinity six-experts comparison](https://www.namefinity.app/blog/memory-experts-remembering-names), [Psychology in Action](https://www.psychologyinaction.org/2022-10-24-how-can-we-improve-our-memory-of-names)).
3. **Records to aim at**: 15-min Names & Faces world records — **Katie Kermode 224 names (IAM 2018)** ([WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships)), **Emma Alam 218 names (GWR-certified, WMC 2020)** ([Guinness](https://www.guinnessworldrecords.com/world-records/107482-most-names-and-faces-memorized-in-15-minutes)), US record **Nelson Dellis 235 names in 15 min** (per his official bio via [Namefinity](https://www.namefinity.app/blog/memory-experts-remembering-names)). Elite speed: one name-image association roughly every **3–4 seconds** sustained for 15 minutes.
4. **Beginners' ceiling is ~10 names in 60 s (6 s/name) and it feels impossibly fast** — that gap between "I know the technique" and "I can execute it live" is exactly the skill a game should train: pre-built name→image libraries, faster feature-spotting, and place-then-move-on discipline ([Art of Memory forum](https://forum.artofmemory.com/t/name-memorization-techniques/79283)).
5. **Names fail for a reason**: proper names are arbitrary, low-imageability, high-interference (every "Michael" competes with every other Michael); people also simply never *learn* the name (attention failure) — most "bad memory" is a failed first encoding ([Psychology in Action](https://www.psychologyinaction.org/2022-10-24-how-can-we-improve-our-memory-of-names)).
6. **Method of loci works because it hijacks spatial memory**: hippocampus/parahippocampal + retrosplenial cortex supply a stable, ordered "address system" with built-in retrieval cues, plus elaborative encoding and sequence memory — 7 memory mechanisms in one technique ([Kori Science](https://koriscience.com/why-the-method-of-loci-works-en), [Method of loci wiki](https://en.wikipedia.org/wiki/Method_of_loci)).
7. **Spaced repetition numbers**: Ebbinghaus 1885 — savings **58% at 20 min, 44% at 1 h, 34% at 1 day, 21% at 31 days**; testing beats restudy (Karpicke & Roediger 2008: **80% vs 36% recall after 1 week**); FSRS models memory as Difficulty–Stability–Retrievability and schedules reviews exactly when retrievability hits 90%, cutting review time **~30% vs SM-2** ([Forgetting curve](https://en.cognitivepsychology.com/Forgetting_Curve), [Borretti](https://borretti.me/article/implementing-fsrs-in-100-lines), [Testing effect notes](https://notes.andymatuschak.org/zTpJdbe6ub7uhBFLuHkFsrT)).
8. **Bizarreness is over-rated; distinctiveness is the real lever** (McDaniel & Einstein 1986) — bizarre images help only when the whole set varies in bizarreness; interactive, meaningful images beat weird-for-weird's-sake ([Bizarreness effect wiki](https://en.wikipedia.org/wiki/Bizarreness_effect)).
9. **VR memory palaces work and teach the technique fast**: Moll et al. 2022/23 — 11 novices remembered **~20–22% more words** with a VR memory palace vs traditional memorization after *minutes* of training (pre 62.6 → post 82.9, p=0.014; replication week 63.4 → 85.7, p=0.024). Design recipe: familiar-but-distinct apartment, non-repetitive rooms, big spacing between loci, unique landmarks, real body movement, player-chosen imagery ([Moll et al., Virtual Reality](https://link.springer.com/article/10.1007/s10055-022-00700-z)).
10. **Technique training ≠ brain-training**: working-memory "brain training" shows no far transfer, but mnemonic training does transfer *within the trained skill* and reshapes brain networks toward athlete patterns (Dresler 2017; Wagner 2021) — the honest game pitch is "you will remember names/numbers/facts," not "you will get smarter."

---

## 1. Method of loci / memory palace

### 1.1 The technique, step by step
1. **Choose a familiar place** (your home, commute, school) and a **fixed route** through it.
2. **Fix a numbered sequence of loci** (stations): front door → entryway → couch → TV → dining table → fridge → desk → bed. Stations must be distinct, well spaced, and always traversed in the same order.
3. **Convert each item into a vivid image** (concrete, sensory, ideally moving).
4. **Place each image at a station**, interacting with the station (a banana smashing through the dining-room ceiling, milk exploding at the front door).
5. **Recall = walk the route** in imagination and read the scenes off the stations.
6. **Reuse**: discard old images; leave a station "empty" for a while to avoid bleed-through (champions rotate multiple palaces — Dylan Kane's rule: never reuse a palace twice in one day).

(Step detail synthesized from [Method of loci wiki](https://en.wikipedia.org/wiki/Method_of_loci) and [Kori Science](https://koriscience.com/why-the-method-of-loci-works-en).)

### 1.2 Why spatial memory is so strong
- **Spatial memory is evolutionarily ancient and near-permanent** — you still remember the layout of a childhood home decades later, while a word list from yesterday is gone.
- The locus supplies **retrieval cues**: instead of free recall ("what was item 7?") you ask "what did I put next to the fridge?" — cued recall is dramatically easier.
- One palace placement stacks **seven memory mechanisms**: spatial memory, visual imagery, spatial binding (what-where), elaborative encoding, retrieval cues, sequence memory (order for free), and context memory ([Kori Science table](https://koriscience.com/why-the-method-of-loci-works-en)).
- Neuroscience: the technique reuses the hippocampus/parahippocampal/retrosplenial navigation system rather than building a new one.

### 1.3 The evidence — Dresler et al. 2017 (*Neuron*), the exact protocol
- **Athletes**: 23 of the world's best (incl. co-author Boris Konrad) vs 23 matched controls. On a 72-word list with 20-min delay: **athletes recalled 71 words, controls 40**. No structural brain differences — only **functional connectivity** across ~2,500 connections; **25 connections** (hubs in medial prefrontal cortex + right dorsolateral prefrontal cortex) most distinguished athletes.
- **Training protocol**: 51 novices (no prior mnemonic experience) split 3 ways. Loci group: **40 half-hour daily sessions over 6 weeks** (i.e., 30 min/day, 6 days/week — guided course at memocamp.com). Active control: working-memory n-back-style training. Passive control: nothing.
- **Results**: loci group **26 → 62 words (+35)**; WM-training **+11**; control **+7**. The loci group's connectivity moved *toward the athlete pattern*; the closer it got, the better the memory gain, **predicting performance up to 4 months later** ([UniWien abstract](https://ucrisportal.univie.ac.at/de/publications/mnemonic-training-reshapes-brain-networks-to-support-superior-mem), [ScienceDaily](https://www.sciencedaily.com/releases/2017/03/170308131236.htm), [Stanford Medicine](https://med.stanford.edu/news/all-news/2017/03/memorization-tool-bulks-up-brains-internal-connections.html)).
- **Durability & efficiency** (Wagner et al. 2021, *Science Advances*): after the same 6-week training, memories lasted longer (durable-trace measure) and task-brain activation *decreased* (neural efficiency: lateral PFC, parahippocampal + retrosplenial cortex), with hippocampal-neocortical coupling during consolidation; gains still visible at **4 months** ([UniWien abstract](https://ucrisportal.univie.ac.at/en/publications/durable-memories-and-efficient-neural-coding-through-mnemonic-tra)).
- **Game-design takeaways**: (a) a 6-week, 30-min/day schedule is the evidence-based "campaign length"; (b) doubling measurable performance is a credible marketing claim; (c) brain-imaging aside, the behavioral effect sizes are the ladder the game's difficulty curve can literally mirror (list length 10 → 20 → 40 → 72 → 100).

---

## 2. Name–face memorization (the game's core loop)

### 2.1 The athlete technique, step by step (the canonical version)
Composite of Harry Lorayne's classic system (feature → substitute word → animated association), John Graham (2018 USA Memory Champion), Ron White (2× USA champion), and the experimental literature (Hill et al. 1987; Morris et al. 2005):

1. **Hear the name.** Attention is the first memory act. Repeat it back aloud; if it's unusual, ask spelling/origin (this also gives you extra encoding passes — [Delaney](https://darrendelaney.co.uk/tips/how-to-remember-peoples-names), [Psychology in Action](https://www.psychologyinaction.org/2022-10-24-how-can-we-improve-our-memory-of-names)).
2. **Find the distinguishing feature** (or your gut "vibe" of the person): big nose, curly hair, heavy eyebrows, intense stare. This feature becomes the **file** where the name is stored ([Memory John](https://memoryjohn.com/how-to-remember-faces), [Ron White via Namefinity](https://www.namefinity.app/blog/memory-experts-remembering-names)).
3. **Convert the name into a picture** — a substitute word or sound-alike with concrete imagery:
   - Terry → *tearing their face*; Tony → *Tony the Tiger*; Jerry → *cherry*; Amelia → *Amelia Earhart's pilot goggles*; Mark → *permanent marker*; Bill → *duck's bill*; Mike → *microphone*; Buckley → *buckle*; Steve → *stove*; Brian → *brain*.
   - Champions pre-build a library of these. One Memory League player mined 2,460 draws from 82 training rounds → **910 unique names**, ranked by frequency (Michael 16×, Don/Jason 15×, Billy/Maria 14×…), and prepared images for the top of the list; another built a **500-name association deck** in Quizlet ([AoM forum](https://forum.artofmemory.com/t/name-memorization-techniques/79283)).
4. **Fuse feature + name-picture into one exaggerated, animated scene**: Lorayne's example — "Gordon" → a *garden* growing out of his distinctive eyebrow; Graham — "Brad" (tough vibe) → *his face is a chunk of stale bread*; "Olivia" (long mascara'd lashes) → *olives stuck on her eyelashes* ([Memory John](https://memoryjohn.com/how-to-remember-faces), [Namefinity](https://www.namefinity.app/blog/memory-experts-remembering-names)). Rules: the name-image must **move/interact with the feature**, the image must be your own first association, and one scene per person.
5. **(Competition extension) Anchor in a palace**: for 100+ names, champions also place each scene at sequential loci so order and completeness are guaranteed. Katie Kermode goes further — her palaces are pre-populated with **a designated person at every locus** (2,700+ locations, each mapped to a real person/celebrity/character), so incoming information just *happens to* that person ([Kermode Method](https://thecraftofmemory.substack.com/p/the-kermode-method-and-the-rise-of)).
6. **Review once later** (see §4): champions never re-look during memorization; the test is immediate recall after the full sweep — a built-in testing effect.

**Why each step exists (failure-mode mapping)**: skip step 1 → nothing was ever encoded (the #1 real-world cause); skip step 2 → the image has no stable "address" on the face; skip step 3 → the name stays abstract (names are the least imageable word class); skip step 4 → two disconnected memories that won't cue each other; skip step 6 → normal forgetting curve.

### 2.2 Competition formats (turnkey game modes)
- **USA Memory Championship — Names & Faces**: **15 min** memorization of **135 head-and-shoulder photos**, first + last name printed under each; **20 min recall** with the same photos **in a different order**; **1 point per correctly spelled name** (first or last), max 270, no penalty for wrong guesses ([USA events page](https://www.usamemorychampionship.com/events)).
- **WMC/IAM 15-minute Names & Faces**: 15-min memorization + ~30-min written recall; half-credit conventions for partial names in some eras ([WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships), [IAM stats](https://iam-stats.org/discipline.php?id=NAMES15&country=Ireland)).
- **USA "It's Been A Long Time" (party-game gold)**: 6 guests on stage, each with name/DOB/address/phone/pet/hobbies/car/foods presented via mind-map; finalists must recall complete facts in under 15 s; 3 strikes and you're out ([USA events page](https://www.usamemorychampionship.com/events)). This is almost literally a "remember the person's details" game mode.
- **Memory League Names** (online, head-to-head): tutorial = **10 names in 60 s** memorization, 4-min recall; elite players hit **15 names/60 s**; events include Names, International Names, Words, Numbers, Images, Cards, Surprise ([Memory League site](https://memoryleague.com/), [AoM forum](https://forum.artofmemory.com/t/name-memorization-techniques/79283)).
- **Scoring standards for difficulty curves** (WMSC Millennium Standards): 5-min Names & Faces 1000-pt standard = **95 names**; 15-min = **170 names**; International Master of Memory requires e.g. **1,000 digits/hour + 520 cards/hour + sub-2-min deck** ([WMS standards](http://www.world-memory-statistics.com/standards.php)).

### 2.3 Records (targets for the game's endgame)
| Feat | Record | Holder | Source |
|---|---|---|---|
| Names & faces, 15 min (IAM) | **224 names** | Katie Kermode, IAM Worlds 2018 | [WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships) |
| Names & faces, 15 min (GWR) | **218 names** | Emma Alam, WMC Karachi 2020 | [Guinness](https://www.guinnessworldrecords.com/world-records/107482-most-names-and-faces-memorized-in-15-minutes) |
| Names & faces, 15 min (US record) | **235 names** | Nelson Dellis (bio) | [Namefinity](https://www.namefinity.app/blog/memory-experts-remembering-names) |
| International names & faces, 15 min (US) | **85** | John Graham, 2017 | [MLive](https://www.mlive.com/news/2017/12/michigans_memory_master_sets_n.html) |
| Hour numbers | **4,620 digits** | Ryu Song I, 2019 | [WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships) |
| Speed cards | **12.74 s** | Shijir-Erdene Bat-Enkh, 2018 | [WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships) |
| Random words, 15 min | **335 words** | Prateek Yadav, 2019 | [WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships) |

### 2.4 Where beginners fail (and how the game should teach around it)
From the [AoM Name-memorization thread](https://forum.artofmemory.com/t/name-memorization-techniques/79283) (beginner with ML tutorial success but stuck at ~10 names/60 s), plus champion replies:
- **Image-generation is the bottleneck** — "I just can't generate a memorable visual image in 6 s." Fix: pre-built name→image library (frequency-ranked; Memory League's name pool is finite — a player logged 910 uniques), plus accepting *your own* first association however strange.
- **Feature-spotting is an untrained skill** — "features are often very common" (docraymund). Fix: drill mode that asks players to pick the distinguishing feature before the name.
- **Recall feels binary** — beginners don't know what to *do* with a 4-minute recall window. Fix: teach palace-order + partial-credit scanning (score first names separately from surnames).
- **Trying to be perfect mid-stream** — Don Michael Vickers: "Id actually recommend against making a list and just try to come up with something on the spot." The skill is committing, not deliberating.
- **In real life: the next-in-line slot** — people forget the name of the person introduced *just before* they must speak; attention collapses under self-presentation pressure ([Delaney's "pay attention" point](https://darrendelaney.co.uk/tips/how-to-remember-peoples-names), [Budson 2018 via PsychInAction](https://www.psychologyinaction.org/2022-10-24-how-can-we-improve-our-memory-of-names)).
- **The science fixes**: semantic processing of the name beats phonemic beats visual-only (Troyer et al. 2006); retrieval practice + meaning beats re-seeing the name (Morris et al. 2005); a 3-part mnemonic drill (feature + name transformation + interactive image) measurably improves name recall even in older adults (Hill et al. 1987) — all summarized in [Psychology in Action](https://www.psychologyinaction.org/2022-10-24-how-can-we-improve-our-memory-of-names).

---

## 3. Number systems (Major, PAO, Dominic)

- **Major system**: digits→consonants (0=s/z, 1=t/d/th, 2=n, 3=m, 4=r, 5=l, 6=ch/j/sh, 7=k/g, 8=f/v, 9=p/b), vowels free; 3.1415927 → *meteor tail pink*. Pros: generates words on the fly; cons: slow per image; needs a learned 2-digit vocabulary for speed. History: Hérigone 1634 → Paris 1825 → Lorayne's *The Memory Book* 1974 popularized it ([Major system wiki](https://en.wikipedia.org/wiki/Mnemonic_major_system)).
- **PAO (Person-Action-Object)**: every 2-digit number 00–99 gets a fixed person, action, and object; 6 digits = Person(AB) doing Action(CD) to Object(EF) — one palace locus holds 6 digits (9 for 3-digit PAO). Example: 15 = Albert Einstein/writing/blackboard; 16 = Arnold Schwarzenegger/lifting/weights → 151633 = *Einstein lifting a cane* ([AoM PAO](https://artofmemory.com/blog/pao-system)). Practicality notes from a hobbyist: building 100 triples took 2 days of idle effort; ~2 h practice → a full deck in ~8 minutes error-free; **hash collisions** (two similar actions like "eating" vs "chomping") are the main design hazard ([planetbanatt](https://planetbanatt.net/articles/memory.html)).
- **Dominic system**: 2-digit → person by initials (e.g., 15 = AE Albert Einstein) + characteristic action; Dominic O'Brien, 8× world champion, used it to win everything from 1991–2001 ([Dominic O'Brien wiki page](https://artofmemory.com/wiki/Dominic_OBrien), [WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships)).
- **Game framing**: numbers are the *skill tree* of memory sports — Major = freeform creative mode, PAO = collect-100-characters metagame (players love building their rosters), Dominic = lighter-weight starter pack.

---

## 4. Spaced repetition science

- **Forgetting curve (Ebbinghaus 1885)**: measured by savings; **58% savings at 20 min, 44% at 1 h, 34% at 1 day, ~21% at 31 days**; steep-then-flat, better fit by power than exponential; replicated exactly in 2015 (Murre & Dros). Savings detects memory recall can't — relearning is always faster ([Forgetting curve page](https://en.cognitivepsychology.com/Forgetting_Curve)).
- **Spacing effect**: spaced > massed in **259 of 271 comparisons** (Cepeda et al. 2006); Bahrick 1993: 13 sessions spaced 56 days ≈ 26 sessions spaced 14 days (half the effort for equal 9-year retention); spacing works via study-phase retrieval + deficient processing + retrieval effort ([Spacing effect wiki](https://en.wikipedia.org/wiki/Spacing_effect)).
- **Testing effect (retrieval practice)**: Roediger & Karpicke 2006 — testing beats restudy after days-long delays even though restudy *wins* on immediate tests (the "desirable difficulty" signature); Karpicke & Roediger 2008 (*Science*, Swahili vocab): repeated testing **80% at 1 week vs 36%** for repeated study; testing transfers (d=0.58, Pan & Rickard 2018); production formats > recognition ([Testing effect notes](https://notes.andymatuschak.org/zTpJdbe6ub7uhBFLuHkFsrT)).
- **Algorithm lineage**: paper SuperMemo 1985 (fixed intervals) → SM-2 1987 (E-Factors, the ancestor of Anki) → SM-17+ (two-component model) → **FSRS** (2021–): models each card with **Difficulty, Stability, Retrievability**; stability = days for recall probability to fall to 90%; schedules each review exactly when predicted retrievability hits **desired retention (default 0.9)**; ~**30% less review time** than SM-2 at equal retention; parameters fitted to your review history by gradient descent; stability grows most when you review **just before forgetting** (R low) and saturates at high stability ([SuperMemo history](https://supermemo.guru/wiki/History_of_SuperMemo_algorithm), [Borretti](https://borretti.me/article/implementing-fsrs-in-100-lines), [Expertium](https://expertium.github.io/Algorithm.html), [FSRS wiki](https://github.com/open-spaced-repetition/fsrs4anki/wiki)).
- **Game translation**: the "boss shows up exactly when the item is at 90% danger" is literally optimal scheduling; a visible stability/health bar per memorized name makes forgetting curves a *game resource*.

---

## 5. Encoding principles

- **Chunking & capacity**: Miller 1956 — 7±2 chunks; absolute-judgment channel capacity ~2.5 bits ≈ 6 categories (pitch experiments); modern estimate **4±1 chunks** (Cowan; Mathy & Feldman 2012), ~3 with rehearsal blocked (Chen & Cowan 2009). Chunking = recoding many items into fewer, meaningful units — which is exactly what name-images and PAO do ([Miller 1956 full text](https://psychclassics.yorku.ca/Miller), [Mathy & Feldman](https://www.researchwithrutgers.com/en/publications/whats-magic-about-magic-numbers-chunking-and-data-compression-in-), [Chen & Cowan](https://pubmed.ncbi.nlm.nih.gov/19048451)).
- **Elaborative encoding**: connecting new info to existing knowledge/imagery/context multiplies retrieval routes; the palace placement forces elaboration ([Kori Science](https://koriscience.com/why-the-method-of-loci-works-en)).
- **Dual coding**: verbal + visual channels both get the trace; VR-MoL studies recommend image+text items and even animation/audio ([Moll et al.](https://link.springer.com/article/10.1007/s10055-022-00700-z)).
- **Bizarreness — with nuance**: the bizarreness effect is *not* universal: it only emerges when the studied set varies in bizarreness; McDaniel & Einstein (1986) argue **distinctiveness**, not weirdness per se, drives it; some studies find null or negative effects ([Bizarreness wiki](https://en.wikipedia.org/wiki/Bizarreness_effect)). Design rule: make images *distinct and interactive*, not merely gross — weirdness is a spice, not the meal.
- **Emotional salience & self-reference**: emotionally charged events are prioritized by memory systems; self-referential encoding (relating items to yourself) reliably boosts recall (Rogers, Kuiper & Kirker 1977; child studies: "selfish learning" — [Bristol](https://research-information.bris.ac.uk/en/publications/selfish-learning-the-impact-of-self-referential-encoding-on-child)). Game hook: let players place *themselves* or their avatar's friends inside scenes.
- **Generation effect**: generating the image yourself beats being handed one — consistent with champions' "first association that pops" rule and with learners outperforming on self-generated names (Troyer 2006).

---

## 6. Memory sport world

- **Joshua Foer** — the poster child: journalist covering the 2005 US Memory Championship, coached for **one year** by Ed Cooke using loci/Major/PAO, won the **2006 USA Memory Championship** (broke the US speed-cards record), then 13th at WMC + bronze in Names & Faces. His book *Moonwalking with Einstein* (2011) debuted #3 on the NYT list; thesis: champions are made by deliberate practice + technique, and "psychological barriers" are the real obstacle ([Moonwalking wiki](https://en.wikipedia.org/wiki/Moonwalking_with_Einstein)).
- **Nelson Dellis** — 6× USA Memory Champion, Everest climber, author of *Remember It!*; US record 235 names/15 min ([Namefinity](https://www.namefinity.app/blog/memory-experts-remembering-names)).
- **Alex Mullen** — 3× World Memory Champion (2015, 2016, 2017 IAM), memory grandmaster, set 3,238 digits/hour world record in 2017; med student; runs Mullen Memory teaching students techniques ([Reddit TIL thread](https://www.reddit.com/r/todayilearned/comments/9fnxec/til_about_alex_mullen_a_memory_competitor_and), [mullenmemory.com](https://mullenmemory.com/blog/tag/faq)).
- **Katie Kermode** — arguably the best all-round female athlete; names/words specialist; the "Katie Method" (people as loci) now used by champions John Graham, Braden Adams (3× Canadian champ), Prateek Yadav (12× Indian champ) ([Kermode Method](https://thecraftofmemory.substack.com/p/the-kermode-method-and-the-rise-of)).
- **Events** (WMC ten disciplines): hour numbers, 5-min numbers, spoken numbers (1/sec), 30-min binary, hour cards, 15-min words, **15-min names & faces**, 5-min historic dates, abstract/random images, speed cards. Sanctioning split: WMSC vs IAM since 2016/17 ([WMC wiki](https://en.wikipedia.org/wiki/World_Memory_Championships)).
- **Culture notes for the game**: athletes are ordinary people who trained ("without a single exception, trained for months and years" — Dresler); top athletes memorize ~**500 digits or 100 words in 5 minutes** (Konrad); chess GM Timur Gareyev used loci to play **48 blindfold games simultaneously** (Guinness-certified) — great flavor content ([Method of loci wiki](https://en.wikipedia.org/wiki/Method_of_loci)).

---

## 7. Working memory vs long-term memory

- **WM capacity is tiny**: 7±2 chunks (Miller), realistically 4±1 (Cowan). A 100-name crowd is ~100 chunks — categorically impossible to hold in WM, which is why novices fail by trying to "hold" names.
- **Mnemonics bypass WM by converting to LTM at encoding**: each name is bound to (a) a stable spatial index, (b) a semantic/visual image, (c) the person's own face — so WM only needs to track "which station am I at," one chunk at a time. This is why athletes with *normal* WM (Dresler's athletes weren't exceptional on standard tests) can hold hundreds of items.
- **Cognitive load theory angle**: intrinsic load of new names is high (arbitrary, interfering); technique training is **element interactivity reduction** — pre-automatized name→image pairs (flashcard phase, Kane's step 2) remove load at the moment of live encoding. Kane: "I need to think of 64 and instantly know it's Katniss Everdeen… that's too much cognitive load otherwise" ([Dylan Kane](https://fivetwelvethirteen.substack.com/p/how-i-trained-my-memory)).
- **Distraction sensitivity**: WM-stressed encoding collapses under noise — Kane calls 100-digit palace work the most mentally taxing thing he's done, "100% distraction-free" required. A game can teach this by *dramatizing* distraction penalties.

---

## 8. Learning curve, deliberate practice, transfer

- **The evidence-based curve**: Dresler's 6 weeks / 30 min/day doubled capacity; effects durable at 4 months. Dylan Kane (a teacher, no special talent): 15 min/day → 100 digits in ~1 month, using 6 steps: (1) build PAO sheet, (2) 600 flashcards to automaticity (5–10 new cards at a time — he failed once by batching too many), (3) build 3 palaces (never reuse one same-day), (4) drill 6-digit → vivid image, (5) install short sequences, (6) extend gradually to 100 ([Kane](https://fivetwelvethirteen.substack.com/p/how-i-trained-my-memory)).
- **Deliberate-practice structure** (Kane's learning lessons, directly game-designable): practice **component skills separately** (flashcards vs image-building vs palace-walking) when the whole task stalls; **interleave directions** (number→image AND image→number); **small chunks** to avoid overload; **effortful vividness** pays; **early success motivates** (12 digits = 2 images felt "impressive"); **relearning is fast** after decay.
- **Encoding cost is the hidden skill**: "seeing something" ≠ "storing it." There are three steps — encode, **place**, decode — and placing is trainable; a computer-aided test showed a total beginner nearly hitting International Master of Memory qualifying pace when encoding was done for them, proving the middle step is the trained bottleneck ([planetbanatt](https://planetbanatt.net/articles/memory.html)). *Game idea: "placing" is the micro-interaction (drag the scene into the room, hold for 0.5 s to 'commit').*
- **Transfer reality**: memory-technique training improves the trained content domains (names, numbers, lists, vocab, exams — the wiki lists students using loci for dates/vocabulary) and durability, but does NOT raise general intelligence; Kane reports his PAO skill didn't stop him forgetting his shopping list ([Kane](https://fivetwelvethirteen.substack.com/p/how-i-trained-my-memory)). Market the concrete skills.

---

## 9. Scientific critiques & boundaries

- **Brain-training debate**: WM/brain-training programs show no far transfer to general cognition (per Task 2-a's 87-study meta-analysis review; Lumosity's $2M FTC settlement). **Mnemonic training is different in kind**: it teaches a *strategy* with an immediate, visible, within-domain payoff (26→62 words), produces measurable neural reorganization toward athlete patterns, and consolidates durable traces (Dresler 2017; Wagner 2021; follow-ups incl. older adults: [Frontiers 2018](https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2018.00342/full); [eLife reviewed preprint 2026](https://elifesciences.org/reviewed-preprints/109943)). The honest claim set: better names/numbers/lists/facts — not IQ.
- **Sleep consolidation**: declarative memories consolidate during slow-wave sleep via covert hippocampal reactivations (Rasch & Born 2013; sleep-after-learning > wake at 12 h and 24 h tests); Käthe/Bäuml 2014 adds nuance that sleep can reduce the *testing effect* while still strengthening re-encoded items ([Rasch & Born](https://www.semanticscholar.org/paper/Sleep-to-Remember-Born-Rasch/c8121d1eb4ccce44ef14f87858fdb75f11fd7b51), [neupsykey review](https://neupsykey.com/role-of-sleep-in-human-declarative-memory-consolidation)). Game hook: an overnight "the palace repaints itself / memories set like concrete" ritual; daily-review prompt right before bed (Castel's advice).
- **Bizarreness caveat** (see §5): don't build the whole game on "weird = memorable."
- **Interference is the real enemy in names**: identical first names across a 100-person crowd create proactive interference the palace doesn't automatically solve — champions' Kermode-Method (unique *person* per locus) and unique-feature emphasis exist precisely to add discriminative distinctiveness ([Kermode Method](https://thecraftofmemory.substack.com/p/the-kermode-method-and-the-rise-of)).

---

## 10. Existing landscape — what's fun, what's boring

- **Memory League** (memoryleague.com): head-to-head speed competition in 7 events (Cards, Images, International Names, Names, Numbers, Words, Surprise), live matchmaking with chat, **daily challenge (one attempt per event)** — an appointment mechanic — and monthly campaigns ("play ≥14 days in May → free 1-month sub; ≥28 days → 3-month sub") mirroring Duolingo's streak logic. *Fun: real-time PvP, instant scores, elite benchmarks visible (e.g., "30 images in 26.98s"). Boring/harsh: pure rote drills, no technique teaching, brutal for beginners, subscription wall; the forum is full of beginners bouncing off the 60-second timer* ([Memory League site](https://memoryleague.com/), [AoM forum](https://forum.artofmemory.com/t/name-memorization-techniques/79283)).
- **Art of Memory** (artofmemory.com): wiki + forum + courses; deep, generous community knowledge (PAO pages, champion wikis, 10,000-person name lists); *fun: the lore and community; boring: wall-of-text pedagogy, no practice loop* ([AoM PAO](https://artofmemory.com/blog/pao-system), [Dominic O'Brien wiki](https://artofmemory.com/wiki/Dominic_OBrien)).
- **Anki / SuperMemo**: the throughput champions — SM-2/FSRS scheduling, immense efficiency for facts; *boring: zero technique teaching (it can't turn "Michael" into an image for you), spreadsheet aesthetics, review debt guilt* ([FSRS wiki](https://github.com/open-spaced-repetition/fsrs4anki/wiki), [SuperMemo history](https://supermemo.guru/wiki/History_of_SuperMemo_algorithm)).
- **Memrise/Quizlet**: gamified vocab (leaderboards, streaks, multiple-choice) but testing formats skew recognition (the weaker format per the testing-effect literature) and content is generic; Quizlet is what one champion used for his 500-name image library — community decks are an open niche.
- **Gap analysis**: no existing product teaches the *technique* (image-generation under time pressure, palace construction, feature-spotting) with a game loop. Memory League assumes you already have the technique; Anki assumes the content; AoM assumes the patience. **That intersection is the game's position.**

---

## 11. VR memory palaces & game-design implications (Moll et al. 2022/23)

- **Study**: 11 novices (ages 14–65), Oculus Rift S + full-body locomotion sensors, familiar-but-distinct apartment palace (kitchen/dining/office/2 bedrooms/recreation room/balcony…), participants physically walked, reached out, and **placed 30 imageable word-cubes in loci of their choice**; pre/post vs their own traditional memorization, repeated across 2 weeks.
- **Results**: Week 1: pre **M=62.55** → post **M=82.91** words, t(20)=−2.34, **p=0.014** (≈**+20.4%** more words than their traditional strategy). Week 2 (familiarity): 63.44 → 85.67, **+22.2%**, p=0.024. Framing: MoL is "famously complex" and "requiring much training" — VR collapsed the learning time to minutes.
- **Design principles distilled** (from Moll + cited studies: Peeters & Segundo-Ortin; Krokos 2019 — where VR-MoL already beat desktop **for names & faces**; Huttner 2017–19; Caplan 2019): familiarity helps (apartment), **non-repetitive distinct rooms**, **generous space between loci**, **unique landmarks** to bind items, **real body movement** (walking/hand-placing improves presence and reduces cybersickness), **let users choose or create their imagery** (generation effect), image+text dual coding, ≥40 words to show MoL's true potential ([Moll et al.](https://link.springer.com/article/10.1007/s10055-022-00700-z), [SLATE/Mnemosyne](https://slate.uib.no/news/memory-and-vr) — note the Mnemosyne pilot also found higher-spatial-ability users benefit more).
- **Implication even for a non-VR game**: the *first-party* feel matters — a game where you **build the palace yourself, walk it in first person, and place scenes with your own hands** (even with mouse/trackpad) should outperform menu-based drill; spatial-ability onboarding mini-game could personalize the ramp; Krokos 2019 shows the names-faces transfer of these principles directly.

---

## 12. The Memory-Technique → Game-Mechanic Translation Table

| Technique | How it works (science) | Core game loop it becomes | Difficulty-curve notes |
|---|---|---|---|
| **Method of loci** | Spatial binding + elaborative encoding + built-in retrieval cues/sequence; reuses hippocampal navigation (§1) | Player designs a palace (home level → fantasy castles), walks it in first person, drags vivid scenes into loci, then *re-walks* to recall; palace = persistent save file ("your memory is the save state") | Start 8 loci/8 items; add rooms per chapter; 10→20→40→72→100 items mirrors Dresler's ladder; interference events ("old image bleed") as hazards; never reuse a palace same session (in-game rule teaches real rule) |
| **Feature-spotting** | Distinctiveness encoding; semantic processing beats shallow (Troyer 2006) | Face flash: pick the ONE distinguishing feature in ≤2 s before the name is revealed; wrong pick = no "file" bonus | Train this *before* name conversion; 1 feature → 2 → pick under crowd noise; introduces the next-in-line pressure event |
| **Name→image conversion** | Substitute-word/phonological recoding makes arbitrary names concrete; generation effect (§2, §5) | Sound-slap minigame: name appears, player types/chooses the image ("Michael" → mic), or builds one from morphemes; correct+fast = combo | Pre-built dictionary for top ~200 names (910-unique pool data §2.1); later levels demand *their own* first-association (freer, harder); hash-collision warnings (two similar images both fail recall) |
| **Feature+image fusion** | Interactive imagery = distinctiveness, not mere bizarreness (McDaniel & Einstein 1986) | "Fuse" step: drag the name-image onto the feature and add motion/exaggeration (garden *growing* on the eyebrow); rate the scene's motion/interaction for a bonus | Early: templates force interaction; later: freeform scenes; AI/lightweight art gen could visualize player's fusion (planetbanatt's computer-aided encoding idea) |
| **Anchoring & order** | Palace supplies order + completeness cues; Kermode's people-as-loci adds discriminative distinctiveness | Crowd level: each guest = one locus on a venue walkway; place the fused scene; recall = walk the venue and greet everyone by name | 10 names/60 s is the bronze benchmark (ML tutorial), 15/60 s silver, 100 in a 15-min "final" for gold; partial scoring first-name vs surname teaches real scoring |
| **Testing effect as core loop** | Retrieval > restudy: 80% vs 36% at 1 week (Karpicke & Roediger 2008) | Recall is always *active production* (type the name, not multiple choice); wrong guesses cost nothing (mirrors USA rules: no negative scoring) | Immediately-after = restudy wins (tell players "review first, quiz in an hour") — schedule quizzes at delays to *show* the effect |
| **Spaced repetition / FSRS scheduling** | Stability = time-to-90%-recall; review at R≈0.9 is optimal; stability saturates (§4) | Each memorized name is a "guest" with a **stability bar** that decays like a hunger meter; guests "re-appear" in future crowds exactly when the bar hits 90%-risk; successful recalls lengthen the decay | First-week tutorial shows the 58%@20min curve; late game = "the reunion episode" where a year of guests returns (long-interval retention); 30%-efficiency FSRS math behind the scenes |
| **Chunking (PAO/Major)** | 4±1 chunk WM limit; recode 6 digits → 1 image (Miller/Cowan/PAO) | "Safe-cracker" side mode: numbers heists using player-built PAO roster; collecting 100 characters = meta-collection | Roster building is the retention hook (Kane's 600 flashcards = collect-a-thon); warn on hash collisions; 2-digit → 3-digit prestige tiers |
| **Deliberate practice micro-drills** | Component-skill practice beats whole-task practice when stuck (Kane) | Practice menu: Feature Range, Name Roulette (image speed), Palace Sprint (walking fluency), Fusion Forge — each with its own score/leaderboard | Adaptive: when a crowd level fails, the game routes to the weakest component (measures which sub-step failed) |
| **Sleep/consolidation ritual** | SWS reactivation consolidates traces (Rasch & Born) | End-of-session "palace sets overnight" cinematic; next-day bonus for returning after real sleep; bedtime review prompt | Pairs with Task 2-a's appointment/daily-loop mechanics; anti-grind: beyond ~40 sessions/6 weeks, diminishing returns modeled honestly |
| **VR-first placement (even flat-screen)** | Embodied placement + immersion improved recall 20%+ (Moll) | First-person palace building; hand-drag placement with a 0.5 s "commit" beat; unique landmarks per locus | Spatial-ability onboarding quiz personalizes palace complexity; VR optional mode |

---

## Sources (primary raw files in `research/raw/` where noted)

- [ScienceDaily — Super-sized memory is trainable and long lasting (Dresler 2017 protocol)](https://www.sciencedaily.com/releases/2017/03/170308131236.htm) · raw: `sciencedaily-dresler.md`
- [UniWien — Dresler et al. 2017 Neuron abstract](https://ucrisportal.univie.ac.at/de/publications/mnemonic-training-reshapes-brain-networks-to-support-superior-mem) · raw: `dresler-abstract.md`
- [Psychology Today — "Memory Athletes" and the Rest of Us](https://www.psychologytoday.com/au/blog/demystifying-psychiatry/201707/memory-athletes-and-the-rest-us) · raw: `dresler-psychtoday.md`
- [Stanford Medicine — Memorization tool bulks up brain's connections](https://med.stanford.edu/news/all-news/2017/03/memorization-tool-bulks-up-brains-internal-connections.html)
- [UniWien — Wagner et al. 2021 Science Advances, durable memories](https://ucrisportal.univie.ac.at/en/publications/durable-memories-and-efficient-neural-coding-through-mnemonic-tra) · raw: `wagner-2021-durable.md`
- [Kori Science — Why the Method of Loci Works](https://koriscience.com/why-the-method-of-loci-works-en) · raw: `why-loci-works.md`
- [Wikipedia — Method of loci](https://en.wikipedia.org/wiki/Method_of_loci) · raw: `method-of-loci-wiki.md`
- [Memory John — How to Remember Faces (John Graham)](https://memoryjohn.com/how-to-remember-faces) · raw: `memoryjohn-faces.md`
- [Namefinity — Six memory experts' methods (Lorayne, White, Dellis, Kwik, Santos)](https://www.namefinity.app/blog/memory-experts-remembering-names) · raw: `namefinity-experts.md`
- [Darren Delaney — How to remember people's names](https://darrendelaney.co.uk/tips/how-to-remember-peoples-names) · raw: `delaney-names.md`
- [The Craft of Memory — The Katie (Kermode) Method](https://thecraftofmemory.substack.com/p/the-kermode-method-and-the-rise-of) · raw: `kermode-method.md`
- [AoM Forum — Name memorization techniques (beginner failure thread + 910-name data)](https://forum.artofmemory.com/t/name-memorization-techniques/79283) · raw: `aom-name-techniques-forum.md`
- [Psychology in Action — How can we improve our memory of names? (Troyer/Morris/Hill studies)](https://www.psychologyinaction.org/2022-10-24-how-can-we-improve-our-memory-of-names) · raw: `psychinaction-names.md`
- [Guinness — Most names and faces memorized in 15 min (Emma Alam, 218)](https://www.guinnessworldrecords.com/world-records/107482-most-names-and-faces-memorized-in-15-minutes) · raw: `guinness-names-faces.md`
- [Wikipedia — World Memory Championships (events, records, champions)](https://en.wikipedia.org/wiki/World_Memory_Championships) · raw: `wmc-wiki.md`
- [World Memory Statistics — Millennium & IMM standards](http://www.world-memory-statistics.com/standards.php) · raw: `wms-standards.md`
- [USA Memory Championship — Events](https://www.usamemorychampionship.com/events) · raw: `usa-events.md`
- [Memory League — home (events, daily challenge, monthly challenge)](https://memoryleague.com/) · raw: `memory-league-site.md`
- [MLive — John Graham 85 international names, US record 2017](https://www.mlive.com/news/2017/12/michigans_memory_master_sets_n.html)
- [Wikipedia — Mnemonic major system](https://en.wikipedia.org/wiki/Mnemonic_major_system) · raw: `major-system-wiki.md`
- [Art of Memory — PAO System](https://artofmemory.com/blog/pao-system) · raw: `pao-aom.md`
- [AoM wiki — Dominic O'Brien](https://artofmemory.com/wiki/Dominic_OBrien) · raw: `dominic-obrien-wiki.md`
- [Wikipedia — Moonwalking with Einstein](https://en.wikipedia.org/wiki/Moonwalking_with_Einstein) · raw: `moonwalking-wiki.md`
- [Miller 1956 — The Magical Number Seven (full text)](https://psychclassics.yorku.ca/Miller) · raw: `miller-1956.md`
- [Mathy & Feldman 2012 — chunking & data compression (4±1)](https://www.researchwithrutgers.com/en/publications/whats-magic-about-magic-numbers-chunking-and-data-compression-in-) · [Chen & Cowan 2009](https://pubmed.ncbi.nlm.nih.gov/19048451)
- [CognitivePsychology.com — The Forgetting Curve (Ebbinghaus numbers, Murre & Dros)](https://en.cognitivepsychology.com/Forgetting_Curve) · raw: `forgetting-curve-cogpsych.md`
- [Wikipedia — Spacing effect (Cepeda 259/271; Bahrick 56-day)](https://en.wikipedia.org/wiki/Spacing_effect) · raw: `spacing-effect-wiki.md`
- [Andy Matuschak — Testing effect notes (Roediger & Karpicke lineage)](https://notes.andymatuschak.org/zTpJdbe6ub7uhBFLuHkFsrT) · raw: `testing-effect-andy.md`
- [Borretti — Implementing FSRS in 100 Lines (DSR model, 0.9 retention, 30% claim)](https://borretti.me/article/implementing-fsrs-in-100-lines) · raw: `borretti-fsrs.md`
- [Expertium — A technical explanation of FSRS](https://expertium.github.io/Algorithm.html) · raw: `expertium-fsrs.md`
- [FSRS4Anki wiki](https://github.com/open-spaced-repetition/fsrs4anki/wiki) · raw: `fsrs-wiki.md`
- [SuperMemo.guru — History of SuperMemo algorithm (SM-2 → SM-19)](https://supermemo.guru/wiki/History_of_SuperMemo_algorithm) · raw: `supermemo-history.md`
- [Wikipedia — Bizarreness effect (McDaniel & Einstein nuance)](https://en.wikipedia.org/wiki/Bizarreness_effect) · raw: `bizarreness-wiki.md`
- [Moll et al. 2022/23 — Optimized VR Method of Loci (Virtual Reality, Springer)](https://link.springer.com/article/10.1007/s10055-022-00700-z) · raw: `moll-2022-vr-mol.md`
- [SLATE — Mnemosyne: adapting Method of Loci to immersive VR (Vindenes et al.)](https://slate.uib.no/news/memory-and-vr) · raw: `vr-memory-uib.md`
- [planetbanatt — Insights from Mnemonics (encoding cost, PAO collisions)](https://planetbanatt.net/articles/memory.html) · raw: `planetbanatt-memory.md`
- [Dylan Kane — How I Trained My Memory (6-step protocol, learning lessons)](https://fivetwelvethirteen.substack.com/p/how-i-trained-my-memory) · raw: `dylankane-training.md`
- [Rasch & Born — Sleep to Remember / About Sleep's Role in Memory](https://www.semanticscholar.org/paper/Sleep-to-Remember-Born-Rasch/c8121d1eb4ccce44ef14f87858fdb75f11fd7b51) · [Role of sleep in declarative consolidation](https://neupsykey.com/role-of-sleep-in-human-declarative-memory-consolidation) · raw: `s46-sleep-search.json`
- [eLife reviewed preprint (Ren 2026) — MoL training prefrontal signatures](https://elifesciences.org/reviewed-preprints/109943) · raw: `s38-dresler-prepost-search.json`
- [Bristol — Selfish learning: self-referential encoding](https://research-information.bris.ac.uk/en/publications/selfish-learning-the-impact-of-self-referential-encoding-on-child) · raw: `s30-selfref-search.json`

*End of report — Task 2-b.*
