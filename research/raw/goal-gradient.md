# The Goal Gradient Effect: Progress Mechanics, Endowed Advancement, and the Post-Reward Reset
URL: https://productphilosophy.com/articles/goal-gradient-progress-mechanics
Published: 2026-07-07

- - - - - - - - The Goal Gradient Effect: Progress Mechanics, Endowed Advancement, and the Post-Reward Reset | Product Philosophy- - - - - - 
Skip to content

Behavioral Economics
## The Goal Gradient Effect: Progress Mechanics, Endowed Advancement, and the Post-Reward Reset
Effort accelerates as perceived distance to a goal shrinks, and the reference point is a product decision. The field evidence is unusually clean. So is the failure mode most teams never measure: the post-reward reset.
Posted by Murat Ova on 7th July 2026·45 min read
Share

Photo by Andrea De Santis on Unsplash
Contents

TL;DR: Effort rises as the perceived distance to a goal falls. Hull demonstrated the gradient in rats in 1932, and the commercially relevant test in human markets was not run convincingly for another 74 years, until Kivetz, Urminsky and Zheng (2006) recovered the effect in real café loyalty-card data and showed that the operative variable is the perceived reference point rather than the actual remaining work. Nunes and Drèze (2006) demonstrated the same thing in a car wash field experiment: a ten-stamp card with two stamps pre-applied produced roughly 34 percent completion against roughly 19 percent for a blank eight-stamp card requiring identical effort. The same literature documents the failure mode practitioners systematically ignore. After the reward is collected, effort collapses, and it collapses hardest among the customers who accelerated most.

On the numbers
The quantitative figures in this essay are either cited to a primary research source (noted inline) or aggregated from operating-company partners that shared data under a non-disclosure agreement. “Aggregated” means: company names are withheld as a condition of access, row-level identifiers are stripped or hashed, and the smallest summary that answers the analytic question is the one published. Raw data remains with the originating organization. For methodology detail beyond what the text describes, reach out on LinkedIn.

## Eight Dollars From Free Shipping

The most widely deployed behavioral mechanism in consumer commerce is not scarcity, social proof, or anchoring. It is the line of copy that appears in a shopping cart when the basket total falls below a shipping threshold, usually accompanied by a bar that fills as items are added: you are eight dollars away from free shipping. Almost every merchant above a certain scale runs one. It appears in cart drawers, in sticky headers, in transactional email, in the mini-cart hover state, and increasingly in the product listing page itself. It is implemented by nearly every commerce platform as a first-class feature. And in the great majority of the teams that run one, nobody in the room can name the effect it exploits, cite the field evidence behind it, or describe what happens to the customer in the twenty minutes after the bar completes.

That is a strange state of affairs, because the underlying finding is one of the better-evidenced results in consumer behavior. It has a clean animal-learning origin, a direct field replication in commercial transaction data, a randomized field experiment demonstrating the causal mechanism, and an unusually specific documented failure mode. The goal gradient has all four, and the reason it is worth an essay is that the gap between the quality of the evidence and the quality of the implementations is embarrassing. Most of what circulates in growth-practitioner writing under the heading of behavioral science has none of those four properties.

The core claim is simple enough to state in one sentence. Effort toward a goal increases as the perceived distance to that goal decreases. The important word is perceived, and the reason it is important is that perception is a product decision. What the customer treats as the starting line, what she treats as the finish line, and where she believes she currently stands between them are all set by the interface, not by physics. Two loyalty programs that require exactly the same number of purchases can produce materially different completion rates purely on the basis of how the remaining distance is framed. That is not a marginal optimization. It is the whole mechanism.

Definition · Goal gradient effect
The tendency for the rate of effort toward a goal to increase as the perceived remaining distance to that goal decreases, where perceived remaining distance depends on the reference point framing rather than on the objective work outstanding.

The rest of this essay does four things. It traces the evidence from Hull in 1932 through the 2006 recovery, being explicit about what each study establishes and what it does not. It builds a taxonomy of the progress surfaces that appear in modern software, identifying for each one where the reference point actually lives. It gives extended treatment to the post-reward reset, which is the part practitioner writing almost always omits and which is where most of the value in a well-designed program is either preserved or destroyed. And it takes seriously the fact that this is among the easiest behavioral mechanisms to turn against the person it is aimed at, because a progress mechanic that has been running long enough stops feeling like motivation and starts feeling like an obligation the customer did not agree to.

## Hull, Rats, and the Seventy-Four Years After

Clark Hull published "The goal-gradient hypothesis and maze learning" in Psychological Review in 1932 (volume 39, issue 1, pages 25 to 43). The empirical content is what the title suggests. Rats running a maze toward a food reward move progressively faster as they get closer to the goal box, and the acceleration is systematic rather than incidental. Hull formalized this as a gradient: the strength of the pull toward a reinforcer is a decreasing function of distance from it, whether distance is measured in space, in time, or in number of intervening responses. The gradient shape held up well across the animal-learning work of the following two decades and became one of the load-bearing components of Hull's broader drive-reduction system.

It is worth being blunt about how large the leap is from that result to anything a growth team should act on. A rat in a runway has no symbolic representation of "two more coffees." Its acceleration plausibly reflects a reinforcement history distributed across the maze, with response strength decaying backward from the point of reward, rather than anything resembling a consciously held goal with a countdown attached. Hull's larger theoretical apparatus, elaborated in Principles of Behavior in 1943, did not survive the cognitive revolution in any recognizable form. Citing Hull as the foundation of a loyalty-program design is, on its own, closer to a rhetorical gesture than an evidentiary one. What Hull established is that a gradient of this shape exists in at least one organism under at least one set of conditions. That is a real contribution and it is also a long way from a cart drawer.

## Nobody could run the test until loyalty cards went digital

The interesting question is why the commercially relevant version of the test took so long. The answer is mostly infrastructural rather than intellectual. Human motivation researchers did not abandon the goal-gradient idea between 1932 and 2006; it recurs throughout the self-regulation and goal-setting literatures in various forms. What did not exist for most of that period was the data required to test it in a real market: individual-level, time-stamped, longitudinal purchase records linked to a program in which the customer holds an explicit, countable goal. Loyalty cards were paper. Scanner panels were expensive, small, and rarely linked to a reward structure with a visible finish line. The specific empirical object needed, a population of consumers each of whom knows exactly how many purchases remain until a reward, with every purchase timestamped, only became routinely available when loyalty programs went digital and firms began retaining the transaction logs.

What the 74-year gap actually means
The gap is not evidence that the field ignored the idea. It is evidence that the idea was untestable in the setting that matters commercially. This distinction matters when evaluating any behavioral finding with a long dormancy: a finding that lay unused because nobody thought of it is in a different epistemic position from a finding that lay unused because the measurement apparatus did not exist. The goal gradient is the second kind, which is one reason the 2006 recovery held up rather than becoming another entry in the replication-crisis ledger.

Stylized Shape of the Goal Gradient (Illustrative Schematic, Not Measured Data)02040608010011023456789- - - - - - - - - - - - ⚠️1 warning. Please check the console.

The chart above is a schematic, not a reproduction of any published series. It exists to make the functional form legible: the interval between successive purchases shortens as the stamp count rises, indexed so the first interval equals 100. The convexity matters more than the levels. The acceleration is not linear in stamps; it is mild through the early middle of the card and steep in the final third, which is exactly what a distance-based gradient predicts and exactly what most program designs fail to exploit, because they spend their promotional budget uniformly across the card instead of concentrating it where the gradient is flat.

## The Resurrection: Kivetz, Urminsky and Zheng, 2006

The paper that recovered the effect for consumer research is Kivetz, Urminsky and Zheng, "The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention," published in the Journal of Marketing Research in 2006 (volume 43, issue 1, pages 39 to 58), available at https://doi.org/10.1509/jmkr.43.1.39. It is the central citation for everything that follows, and it does three separable things that practitioners tend to blur together.

The first is the observational result. The authors analyzed real café loyalty-card records, a buy-ten-get-one-free structure, at the level of individual cardholders and individual purchases. The finding is that the interval between successive purchases shortened as the card filled. A cardholder with eight stamps returned sooner, on average, than the same population of cardholders had returned when they held three. This is the purchase-acceleration result, and it is the one most often quoted, usually without qualification.

## Heavy users could produce the acceleration on their own

The qualification is important, and the authors themselves were careful about it. Observational loyalty data has a specific and severe confound. Customers who buy coffee more often accumulate stamps faster, so at any given point in calendar time the high-stamp population is enriched with heavy users. A naive pooled analysis that simply compares average inter-purchase intervals at stamp three against stamp eight will produce an apparent acceleration entirely from composition, with no behavioral change in any individual. The correction is to model individual-level heterogeneity explicitly so that the acceleration is identified within customers rather than across them, which is what the paper does using hazard-model machinery. That is the right correction and it substantially strengthens the inference. It is not the same thing as randomization, and it does not address selection into the loyalty program in the first place: people who accept a coffee card may differ systematically from people who decline one, in ways that correlate with how they respond to progress framing.

What the café data cannot establish
Three limits are worth holding onto. First, selection into the program is not random, so the population studied is the population that opts into progress mechanics, which is plausibly the population most responsive to them. Second, the acceleration is measured within a single card cycle in a low-price, high-frequency, habitual category, and neither the magnitude nor the shape should be assumed to transfer to a category where purchases are annual and expensive. Third, an observed acceleration in a program with a reward at the end cannot be cleanly separated from ordinary economic response to a discount whose expected value rises as it becomes more imminent. The randomized studies in the same paper, and the Nunes and Drèze field experiment discussed below, are what close that gap.

The second thing the paper does is the one that turns the finding from an interesting regularity into a design lever. In the illusionary goal progress experiment, participants received one of two loyalty cards. One card had twelve stamp slots with two stamps already applied. The other had ten stamp slots and none applied. Both cards required exactly ten purchases to earn the reward. The group holding the twelve-slot card with two stamps granted completed the card faster than the group holding the plain ten-slot card. The required behavior was identical. The framing of the reference point was not, and the framing is what moved.

This is the result that should reorganize how a program is designed. It says that the customer is not running a subtraction problem against her own bank balance. She is responding to a displayed position on a track, and the track is drawn by the operator. Where the operator chooses to place the origin determines how much distance the customer believes she has already covered, and that belief, not the arithmetic, is what governs effort.

The third thing the paper does is the part that practitioner writing drops. The authors also documented what happens after the reward is earned. Purchase rates fell following redemption, and the decline was larger for the customers who had accelerated the most on the way in. That asymmetry is the reason the post-reward reset deserves a section of its own, and it is treated at length further down.

Fact
Consumers holding a loyalty card with two of twelve stamps pre-applied completed the card faster than consumers holding a plain ten-stamp card, despite both cards requiring exactly ten purchases, demonstrating that perceived rather than actual remaining distance governs effort the illusionary goal progress result.
Source · Kivetz, Urminsky and Zheng (2006), Journal of Marketing Research 43(1), 39-58

## Endowed Progress: The Cleanest Field Demonstration

Published the same year in the Journal of Consumer Research, Nunes and Drèze, "The Endowed Progress Effect: How Artificial Advancement Increases Effort" (volume 32, issue 4, pages 504 to 512), available at https://doi.org/10.1086/500480, is the paper to reach for when someone asks whether any of this survives contact with a real business. The setting is a car wash. Customers received a loyalty card under random assignment. One group received an eight-stamp card with no stamps applied. The other group received a ten-stamp card with two stamps already applied.

The arithmetic deserves to be spelled out slowly, because the whole point lives in it. The control group needed eight more purchases to complete the card. The treatment group needed ten total, minus the two already granted, which is eight more purchases. The two conditions are identical in required effort, identical in required spend, and identical in the value of the reward at the end. They differ in exactly one respect, which is the position the customer occupies on the displayed track at the moment she receives the card. The control customer stands at zero of eight, which is zero percent complete. The treatment customer stands at two of ten, which is twenty percent complete.

The two cards are mathematically identical and behaviorally different
Zero of eight and two of ten both require eight purchases. Every dollar the customer spends, every visit she makes, every unit of effort she expends is the same across the two conditions. The only variable that moves is where the origin was drawn. If effort responded to the objective remaining work, the completion rates would be indistinguishable. They were not.

Roughly 34 percent of the endowed-progress group completed the card, against roughly 19 percent of the control group. I report both figures as approximate because the precise decimals are not what carries the argument; the ratio is. Endowed progress produced something close to a doubling of completion on a task that was, by construction, the same task. The endowed group also completed faster, which is the goal-gradient signature showing up in the same experiment as the reference-point manipulation.

Approximate Loyalty Card Completion Rates in the Nunes and Dreze 2006 Car Wash Field Experiment051015202530Endowed progress (10 stamps, 2 granted)Control (8 stamps, none granted)- - - - - - - 3419- 

Fact
Customers given a ten-stamp car wash loyalty card with two stamps pre-applied completed the card at roughly 34 percent against roughly 19 percent for customers given a blank eight-stamp card, despite both conditions requiring exactly eight further purchases the endowed progress effect.
Source · Nunes and Dreze (2006), Journal of Consumer Research 32(4), 504-512

The two cards are behaviorally different and mathematically identical. That gap is the entire product surface.

Definition · Endowed progress effect
The increase in effort and completion that results from granting a customer artificial advancement toward a goal, achieved by extending the goal and simultaneously crediting the extension, so that required effort is unchanged but displayed progress is greater than zero.

## What the car wash experiment does not settle

Two cautions belong here. The first is durability. The car wash study measures a single card cycle. It does not establish that the effect persists across many cycles with the same customer, and there is a plausible mechanism by which it would not: a customer who has completed three endowed cards has effectively learned the trick, and the endowment stops being an advancement and starts being an accounting convention she can see through. I am not aware of a clean published test of repeated endowment against the same individuals over multiple cycles, and I would not assume the first-cycle effect size survives.

The second is the role of justification. The endowment in the field study was presented within a promotional frame rather than as an unexplained credit appearing from nowhere. Whether a bald endowment with no rationale performs identically is not something the published design settles cleanly, and I would not assume it does. There is an obvious asymmetry of risk here for an operator: if the endowment reads as generous, it does two jobs at once, and if it reads as arbitrary it invites the customer to compute the arithmetic, at which point the mechanism inverts and becomes a small insult. The design cost of supplying a reason is close to zero. Supply one.

The Research Spine, With What Each Study Does And Does Not Establish
StudyDesignHeadline FindingWhat It Does Not Establish
Hull (1932), Psychological Review 39(1)Rats traversing a runway toward a food rewardRunning speed rises systematically as the animal approaches the goal boxAnything about human consumers, symbolic goals, or countable purchase rewards
Kivetz, Urminsky and Zheng (2006), observational study, JMR 43(1)Individual-level analysis of real cafe loyalty-card transaction recordsInter-purchase intervals shorten as stamps accumulate, identified within customersClean causality, because selection into the loyalty programme is not random
Kivetz, Urminsky and Zheng (2006), illusionary progress study, JMR 43(1)Twelve-slot card with two stamps granted against a plain ten-slot cardThe endowed group completed faster despite identical required effortTransfer of the magnitude outside low-price high-frequency categories
Nunes and Dreze (2006), JCR 32(4)Car wash field experiment with randomly assigned loyalty cardsRoughly 34 percent completion for endowed progress against roughly 19 percent controlDurability across repeated cycles with the same individual
Zeigarnik (1927)Laboratory interruption of simple tasks followed by recall testingInterrupted tasks are recalled more readily than completed onesA reliable modern effect size, because the replication record is mixed
Amir and Ariely (2008), JEP LMC 34(5)Experimental manipulation of discrete progress markers functioning as subgoalsMarkers can raise or depress effort depending on where they fall in the taskWhich of the two effects dominates in any given commercial surface

## Zeigarnik, and Why Incomplete States Feel Sticky

The adjacent mechanism practitioners reach for, usually without checking, is the Zeigarnik effect. Bluma Zeigarnik reported in 1927 that participants recalled interrupted tasks more readily than completed ones, the interpretation being that an unfinished task maintains a state of tension that keeps it cognitively accessible until it is discharged by completion.

The waiter storyThe frequently repeated origin story, waiters remembering unpaid orders and forgetting them the moment the bill is settled, is attached to Kurt Lewin, and should be treated as folklore rather than as data.

The reason the effect is relevant here is structural. A goal gradient explains why effort accelerates near the finish. Zeigarnik, if it holds, would explain something slightly different and complementary: why a partially complete state stays in mind at all between sessions, which is what makes a half-filled progress bar a retention mechanism and not merely an in-session conversion mechanism. A loyalty card that the customer never thinks about between visits produces no acceleration, because the gradient can only operate on a goal that is cognitively live.

The honest statement of the evidence is that the modern replication record for Zeigarnik is mixed. The effect appears sensitive to how the interruption is framed, to whether the participant expects to resume, and to the participant's motivation to complete, which is a set of moderators broad enough that "incomplete tasks are remembered better" is not a safe unconditional claim. The operating posture I would recommend is this: treat Zeigarnik as a plausible reason that partially complete states are motivating, do not treat it as load-bearing, and do not build a program whose entire theory of retention rests on it. The gradient results from 2006 are the ones that carry weight, and they do not need Zeigarnik to work.

An admitted gapI am not citing a specific replication or meta-analysis here, because the ones I could name from memory are not ones I can vouch for to this site's standard. A confidently wrong citation is worse than an admitted gap.

## Amir and Ariely: Markers Cut Both Ways

The finding that complicates naive progress design is Amir and Ariely, "Resting on laurels: The effects of discrete progress markers as subgoals on task performance and preferences," published in 2008. The relevant result for present purposes is that discrete progress markers are not uniformly motivating. Markers that segment a task into subgoals can raise effort, by converting a long undifferentiated stretch into a series of nearby finish lines, each with its own local gradient. They can also depress effort, because arriving at a marker functions as a completion, and completions license rest.

SourceAmir and Ariely, Journal of Experimental Psychology: Learning, Memory, and Cognition, 2008, volume 34, issue 5, pages 1158 to 1171.

This is the single most under-appreciated fact in progress-mechanic design, and it has a direct implication that most implementations get backwards. A milestone is a small goal, and a small goal has both a gradient in front of it and a trough behind it. Placing markers at even intervals through a long task therefore installs a series of small post-reward resets along the path, each of which invites the customer to stop. Whether the net effect is positive depends on whether the acceleration into each marker exceeds the disengagement after it, and there is no general answer; it depends on the length of the task, the spacing of the markers, and how immediately the next marker becomes salient upon crossing the previous one.

The operating translation is that markers should be dense where the customer is most likely to abandon and sparse where she is already moving. Uniform spacing is a default that nobody chose and that the evidence does not support.

## A Taxonomy of Progress Surfaces

Modern software runs at least six structurally distinct progress mechanics, and they are usually discussed as if they were one thing. They are not. They differ in where the reference point sits, in who controls it, in how long the goal takes to reach, and above all in what happens at the moment of completion. The table below is the working taxonomy; the prose that follows takes each surface in turn.

Six Progress Surfaces, Their Reference Points, And Their Resets
Progress SurfaceWhere The Reference Point LivesTypical Goal DistanceWhat The Reset Looks LikeDominant Failure Mode
Linear completion meterThe denominator, chosen by the product team, plus items credited on arrivalOne session to several weeksMeter reaches full and the surface disappearsNo successor goal exists, so a highly engaged user is returned to nothing
Stamp or punch accumulationCard length and the stamps granted at issueWeeks to monthsCard is redeemed and a blank card is issuedAbrupt return to zero immediately after the largest observed acceleration
Streak countersConsecutive days elapsed, with zero as a loss reference pointIndefinite, with no terminal goal at allStreak breaks and resets to oneLoss aversion converts motivation into something closer to compulsion
Tier qualification thresholdsQualifying units required plus the calendar cutoff dateThree to twelve monthsPeriod rolls over and the qualifying counter restartsA demand cliff at the cutoff followed by a trough in the new period
Cart value thresholdsThe threshold set by merchandising, applied to basket subtotalMinutes inside a single sessionThreshold is cleared and the prompt vanishesMargin leakage when the gap is filled with discounted or low-margin units
Multi-step forms and onboarding checklistsTotal step count plus any first step marked complete on arrivalMinutes to one sessionFinal step submits and the checklist is removedResting on laurels at intermediate markers in a long flow

## What separates the six is what happens at completion

Linear completion meters are the most familiar. The public example most readers will recognize is the profile completeness meter that LinkedIn has run in various forms for years, which shows a proportion complete and enumerates the actions that would raise it. The reference point here is the denominator, and the denominator is entirely a product choice. A meter that counts twelve possible profile fields and credits the three the user supplied at signup opens at 25 percent rather than at zero, which is endowed progress by another name. The failure mode is equally characteristic. When the meter fills, it typically disappears, and the most engaged user on the platform is handed nothing in its place. What makes these meters interesting as a class is that the finish line is genuinely arbitrary: nothing forces the product to treat a profile as complete at twelve fields rather than nine or twenty.

Stamp and punch accumulation is the digital descendant of the coffee card and the surface the 2006 papers actually studied. The reference point is the card length and the issue-time endowment. This is the cleanest place to apply the Nunes and Drèze design, because the arithmetic is transparent and the customer holds the card. It is also the surface with the sharpest reset, because redemption and re-issue happen in the same instant and the customer moves from one purchase remaining to the full card length in a single step.

Streaks are a different animal and are frequently misclassified as a goal gradient. A streak has no terminal goal. There is no finish line and therefore no shrinking remaining distance, which means the gradient logic does not straightforwardly apply. What operates instead is loss aversion against an accumulated asset. Duolingo is the canonical public example, and the most instructive thing about its design is not the streak counter but the streak freeze: a consumable item whose entire function is to protect the counter from breaking. The existence of an insurance product against streak loss is a fairly direct admission, in the design itself, that the loss is doing the motivational work.

Tier qualification thresholds are the highest-stakes version in commercial terms. Airline and hotel status ladders are the public archetype: a customer must accumulate a defined quantity of qualifying activity before a calendar cutoff to hold or advance status for the following period. The reference point is doubly specified, by the qualifying quantity and by the date, and the interaction between them produces the most dramatic goal-gradient behavior observable in consumer markets. The reset here is annual, structural, and unusually brutal, because the counter returns to zero on a fixed date for the entire population at once. The phenomenon of customers taking otherwise pointless trips near the end of a qualification year, mileage runs, is a gradient effect operating at a scale of hundreds or thousands of dollars per unit of effort, a long way from a free coffee.

Cart value thresholds are where this essay started. The reference point is the threshold, set by merchandising, and the goal distance is minutes. It is the most-encountered instance of the effect in commerce and the one with the least design attention paid to it, largely because it converts so reliably on the metric teams look at that nobody examines the metric they should be looking at.

Multi-step forms and onboarding checklists are the internal-facing version, and the pre-checked first item is now near-universal in SaaS onboarding: a checklist of six activation steps in which "create your account" arrives already ticked. That is endowed progress applied to product activation, and it is the single most defensible application of the mechanism in this entire taxonomy, because the credited step is a real step the user genuinely completed. The endowment is not artificial at all. It is simply accurate accounting that a less thoughtful design would have omitted.

The cheapest legitimate win in the taxonomy
Before manufacturing any artificial advancement, audit what the customer has already genuinely done that the progress surface is failing to credit. Account creation, email verification, a first session, a browsing history, an app install, a prior purchase in an adjacent category. Most progress meters open at zero not because zero is accurate but because nobody wrote the query. Crediting real prior effort captures a large share of the endowed-progress benefit with none of the ethical exposure and none of the risk that the customer works out the arithmetic and feels handled.

## The Post-Reward Reset

This is the section most practitioner writing omits, and it is the one where the money is.

The mechanism is a direct corollary of the gradient rather than a separate phenomenon. If effort is a decreasing function of remaining distance, then the instant the reward is collected and a new goal is issued, remaining distance jumps from approximately zero to its maximum. The customer does not glide back to her baseline rate. She is moved, in one step, from the steepest part of the gradient to the flattest part of it. Everything the program spent months building is discarded by the redemption event, and the discarding is done by the program itself.

Kivetz, Urminsky and Zheng documented exactly this in the 2006 paper. Purchase rates dropped after the reward was earned, and the drop was larger for customers who had accelerated the most. That second clause is the one operators should sit with, because it inverts the intuition. The customers most responsive to the program are the customers who fall furthest afterward. A program that is working hardest on its best segment is also, mechanically, setting up its largest post-reward trough in that same segment.

The goal gradient loop, with the two branches available at the moment of redemptionLoading diagram...

## Decomposing the drop: how much of it is real

Before designing a fix, an operator needs to separate two things that look identical in a chart and are not the same problem.

The first component is arithmetic. The pre-reward period is, by construction, elevated above the customer's own baseline, because that is what acceleration means. A return to baseline after redemption will therefore register as a decline of exactly the magnitude of the prior acceleration, without any behavioral change at all beyond the goal ceasing to exist. This portion of the drop is not a failure. It is the accounting consequence of having successfully pulled demand forward.

The second component is a genuine trough below the customer's own pre-program baseline, which is a different and much more serious matter. It reflects real disengagement: the goal that was organizing the behavior is gone, the replacement goal is distant enough to exert no pull, and the customer has been given an unusually clean moment to stop.

Almost every internal analysis of loyalty-program performance I have seen conflates these by measuring the post-reward period against the pre-reward peak. Measured that way, every program that works appears to fail immediately afterward, and the analysis produces either false alarm or, more often, learned indifference to a signal that turns out to matter. The correct comparison is against the customer's own pre-acceleration baseline, ideally over a window long enough to include a full purchase cycle in the relevant category, and ideally against a holdout that never received the program at all.

The measurement error that hides the reset
Loyalty analytics conventionally reports program performance across the accumulation window, which is the interval in which the gradient is doing its work and the numbers look excellent. If the reporting window ends at redemption, the reset is invisible by construction. The minimum honest specification is a window running from at least one full purchase cycle before enrollment to at least two full cycles after redemption, evaluated against a randomized holdout. Programs that look strongly incremental on the accumulation window and roughly neutral on the full window are common, and they are not the same thing as a program that failed. They are a program whose accumulated gain was handed back at the reset.

Purchase Rate Around the Reward Event Under Two Reset Designs (Illustrative Composite, Advisory Partner Programmes, Indexed to Customer Baseline Equals 100)Abrupt resetSeeded successor
020406080100120140T minus 4T minus 3T minus 2T minus 1RewardT plus 1T plus 2T plus 3T plus 4- - - - - - - - - 

The two curves above are an illustrative composite drawn from advisory-partner programs across retail and subscription categories, indexed so that each customer's own pre-enrollment baseline equals 100. What the composite is meant to convey is the shape rather than the levels: both designs produce the same acceleration into the reward, because the accumulation mechanic is the same, and they separate entirely at the reset. The abrupt-reset curve falls well below the customer's own baseline and recovers slowly and incompletely. The seeded-successor curve gives back the acceleration, which is expected and correct, and settles near baseline rather than beneath it.

Limits of the compositeThese are not measurements from any single program and not benchmarks: the partner sample is small, the categories heterogeneous, the redemption events unaligned. Read the curves as orders of magnitude, not precision figures.

## Design responses

There are five serious responses to the reset and one default that is not a response at all.

Design Responses To The Post-Reward Reset
Design ResponseMechanismWhere It WorksWhere It Fails
Rolling window goalThe goal never terminates, so remaining distance never resets to maximumHigh-frequency categories such as coffee, grocery, transit, daily-use softwareLow-frequency categories where the rolling window is longer than the purchase cycle, so the customer cannot perceive movement
Immediate successor seedingThe next reference point appears inside the redemption moment itself, not laterAny programme with a natural tier or repeat structureWhen the successor is visibly harder than the goal just completed, which reads as a bait and switch
Endowed progress on the successorThe customer restarts above zero rather than at zero, applying Nunes and Dreze to the resetPunch cards, checklists, tier renewals, anything with a countable successorWhen the endowment is arbitrary and large enough that the customer notices the arithmetic
Graduated tier decayStatus erodes gradually instead of expiring on a fixed date, so remaining distance rises slowlyAirline and hotel style status ladders and any long-cycle tier programmeWhen the decay schedule is opaque, which produces support disputes rather than effort
Customer-timed redemptionThe customer chooses when to redeem, which decorrelates the troughs across the basePoints banks and other open-ended currenciesWhen deferral becomes hoarding and the unredeemed liability accumulates on the balance sheet
Abrupt return to zeroNone. This is what emerges when nobody decides about the reset at allNowhereEverywhere, and hardest among the customers who accelerated most

## Only the rolling window removes the reset; the rest manage it

The rolling window is the structurally cleanest answer where the category supports it, because it removes the reset rather than managing it. A goal defined as a quantity within a trailing window never completes and never restarts; remaining distance moves continuously and the customer is never returned to the flat part of the gradient. It fails badly in low-frequency categories, because a rolling window long enough to accumulate meaningful progress is also long enough that the customer cannot detect movement between sessions, and an imperceptible gradient exerts no pull.

Immediate successor seeding is the highest-leverage change available to most existing programs, because it costs nothing structurally and can be shipped inside the redemption flow. The critical detail is timing. The successor goal must be present in the same interaction as the reward, not in a follow-up email two days later.

Endowed progress on the successor is the direct application of Nunes and Drèze to the reset problem and is under-used. A customer who redeems a ten-stamp card and receives a twelve-stamp successor with two stamps already applied is starting her second card at the same displayed position she started her first, which preserves the framing benefit at the exact point in the lifecycle where it is most needed. The caution from earlier applies with more force here, though: this is the customer most likely to work out the arithmetic, because she has just completed one cycle and has it fresh.

Graduated decay is the correct answer for tier programs and is what several long-running status ladders have converged on, in the form of rollover qualifying activity or soft-landing rules that drop a customer one level rather than to the floor. The mechanism is that remaining distance to re-qualification increases gradually rather than in a single annual step, which flattens both the pre-cutoff cliff and the post-cutoff trough. Its failure mode is entirely about legibility: a decay schedule the customer cannot compute produces confusion and support volume instead of sustained effort.

The abrupt return to zero is the worst available option and it is also the modal one, because it is what a program does when nobody has made a decision about the reset. It maximizes the discontinuity in perceived remaining distance at the exact moment the customer is most engaged, it concentrates the damage in the most responsive segment, and it arrives immediately after a positive experience, which is precisely the wrong time to hand someone a reason to stop.

From Experience
A 2024 advisory engagement with a subscription commerce operator running a purchase-count reward programme

The program was reported internally as a strong success on the accumulation window and had been renewed twice on that basis. When we extended the analysis window to include two full purchase cycles after redemption and compared against each customer's own pre-enrollment baseline rather than against the pre-reward peak, roughly half of the measured incremental volume in the accumulation window was given back in the post-redemption trough, with the give-back concentrated in the decile that had accelerated hardest. I want to be careful about that figure: it comes from one operator, one category, one program design, and a reconstruction of a baseline that was not instrumented prospectively. It is an order of magnitude, not a measurement. The change the team made was small and shipped in six weeks. The successor card was moved into the redemption screen itself and issued with two of twelve stamps pre-applied rather than zero of ten. The directional improvement in the post-redemption window was visible within a quarter. I would not quote a percentage for it, because the comparison was against a historical period rather than a concurrent holdout, and that is exactly the kind of comparison this site spends its time warning about.

## Where This Becomes Manipulation

Every mechanism in this essay works by making the customer want to do something more urgently than she otherwise would, without changing what she gets for doing it. That is an uncomfortably accurate description of manipulation, and the fact that it is also an accurate description of a coffee card does not dissolve the discomfort. It is worth being precise about where the line actually sits, because "progress bars are fine and streaks are evil" is not a principle, it is a mood.

Three tests are useful, and they are ordered from weakest to strongest.

The first is the transparency test. Would the customer, if the mechanic were explained to her plainly, regard it as reasonable? A free-shipping meter passes this easily: the threshold is disclosed, the arithmetic is visible, and the customer can decline. A twelve-stamp card with two granted mostly passes, provided the endowment is offered with a stated reason and the customer is not being told the card is shorter than it is. A streak-loss notification engineered to arrive at the hour of peak anxiety does not obviously pass, and the honest way to test it is to imagine writing the explanation on the screen.

The second is the counterfactual welfare test, and it is the one that actually bites in commerce. Is the incremental behavior something the customer already wanted more of, or something the mechanic manufactured? A customer who was going to buy her tenth coffee anyway and bought it on Thursday instead of Saturday has been shifted in time, which costs her nothing and is a legitimate use of the gradient. A customer who adds a twelve-dollar item she does not want in order to save eight dollars of shipping has been made worse off in exchange for a metric improvement, and the threshold mechanic has functioned as a transfer from her to the merchant, disguised as a saving. This is not a hypothetical edge case; it is the modal outcome of a poorly set threshold, and it is invisible in the metric that free-shipping meters are conventionally judged on.

Free shipping thresholds should be judged on incremental margin, not incremental basket value
The threshold reliably raises average order value, which is why it is reported as a win. Whether it raises contribution margin depends on the gross margin of the units the customer adds to close the gap, the shipping cost the merchant absorbs at the threshold, and the return rate on gap-filler units, which in apparel and beauty is frequently higher than baseline because the item was selected under time pressure to satisfy an arithmetic constraint rather than because it was wanted. A threshold optimization that improves basket value and degrades margin and return rate simultaneously is a common outcome, and it is only detectable by teams that instrument all three. Most instrument the first.

The third and strongest test is what I would call the loss-harvesting test. Does the mechanic derive its force from the satisfaction of a gain, or from the threat of a loss? This is the test that separates progress mechanics proper from streaks, and it is why streaks deserve separate ethical treatment even though they are usually filed in the same bucket.

A goal gradient operates on approach. The customer is pulled toward something she does not yet have, and the worst outcome is that she does not get it, which returns her to where she started. A streak operates on avoidance. Once the counter is high, the customer is not working toward a reward; she is defending an accumulated asset from destruction, and the psychological weight of that asset grows with its size, which means the mechanic becomes more coercive precisely as the user becomes more committed. Combine that with the well-established asymmetry between losses and equivalent gains and the result is a mechanism whose grip strengthens over time, is strongest on the most loyal users, and produces distress rather than satisfaction on the failure branch.

## A streak freeze is an insurance product, and insurance implies a loss

The public design record is unusually candid about this. Streak-freeze mechanics, which Duolingo popularized and many products have since copied, exist to let a user protect a streak she would otherwise break. That is an insurance product. Insurance is sold against losses that people fear, and building one into a learning app is a design acknowledgment that the fear is real and that it is load-bearing. I do not think this makes the mechanic indefensible; a learning product has a genuine claim that daily practice serves the user's own stated goal, which is a much stronger position than a retailer has. But the claim has to be made and defended rather than assumed, and it holds only for as long as the mechanic is actually pointed at the user's goal rather than at session count.

The connecting thread to the rest of this site's argument is straightforward. A behavioral mechanism that reliably produces incremental revenue will be adopted regardless of its welfare properties, because the revenue is measured and the welfare is not. The corrective is never to abandon the mechanism, which is both unrealistic and usually unwarranted. It is to instrument the thing that would reveal the harm, extend the measurement window past the point where the mechanism looks good, and treat a treatment that raises revenue while degrading returns, satisfaction, or post-reward engagement as what it is, which is not a win.

Contrary to the Conventional View
Conventional view
Showing users how far they have come is what motivates them

≠
What the evidence shows
The gradient runs off remaining distance, not distance travelled. This is the part of the finding that gets lost in translation to practice, and it inverts a design instinct that most teams hold strongly.
Consider a twenty-step onboarding flow at step three. A meter that emphasizes accumulated progress is displaying 15 percent, which is a small number, a weak signal, and a fairly discouraging one. The same position framed as remaining distance is seventeen steps to go, which is admittedly also discouraging, and this is precisely why the honest answer at step three is neither: it is to shorten the perceived task by segmenting it, or to endow the opening position so the customer does not start at zero. Displaying a small accumulated percentage early in a long task is the worst of the three options, because it accurately communicates that a great deal remains while giving the customer nothing to move toward in the near term.
At step seventeen of twenty the calculus reverses completely. Accumulated progress reads 85 percent, which is impressive, and remaining distance reads three steps, which is imminent and actionable. Here the remaining-distance framing is doing real motivational work that the accumulated framing merely decorates.

The Amir and Ariely result sharpens the point at the front end. Discrete progress markers can license rest: arriving at one registers as a completion, and completions are permission to stop. A meter that celebrates accumulated progress early in a long task is therefore not neutral. It is manufacturing small completions at exactly the point in the task where the customer has the least reason to continue and the most reason to defer, and the resting-on-laurels effect can make effort go down rather than up.

The design implication is that the framing should flip as the customer advances. Lead with segmentation and endowment early, switch to remaining-distance framing as the finish becomes proximate, and make the crossover explicit rather than letting a single static meter serve both regimes. The Amir and Ariely finding and the structure of the gradient itself carry the point.

A literature I am not leaning onA separate literature on to-date versus to-go framing in goal pursuit speaks to exactly this, but I am not resting the argument on it, because the specific papers I would need are ones I cannot verify to this site's standard from memory.

## A Checklist For Implementing A Progress Mechanic

The following is the sequence I would want a product, CRM, or growth team to work through before shipping any surface that displays progress toward a goal. It is deliberately ordered so that the measurement decisions come before the design decisions, because a mechanic that cannot be evaluated will be renewed on the strength of the window in which it looks best.

- Define the goal precisely, including its unit. Purchases, dollars, sessions, steps, or days. Mixed units are a common source of illegible programs, because the customer cannot compute her own remaining distance and an incomputable gradient exerts no pull.

- Decide where the origin sits, and treat that as the primary design decision. The reference point is the lever with the largest documented effect in this entire literature. It should be chosen deliberately, by a named person, with a stated rationale, not inherited from whatever the platform defaults to.

- Credit everything the customer has genuinely already done. Run the query. Account creation, verification, prior purchases, adjacent-category history, installs. This captures much of the endowed-progress benefit with no ethical exposure whatsoever, because the advancement is real.

- If artificial endowment is used, supply a reason and keep it modest. The rationale costs nothing and materially reduces the chance the customer computes the arithmetic and concludes she has been handled. An endowment large enough to be conspicuous is one that invites exactly that computation.

- Design the reset before shipping the accumulation. This is the step that gets skipped, and skipping it selects the abrupt return to zero by default. The successor goal must be specified, and it must appear in the redemption interaction itself rather than in a follow-up.

- Choose the framing regime by position, not once for the whole task. Segmentation and endowment early, remaining-distance framing as the finish becomes proximate, with an explicit crossover.

- Place markers where abandonment concentrates, not at even intervals. Uniform spacing is a default nobody chose. Each marker installs both a local gradient and a local rest point, so they belong where the pull is needed rather than everywhere.

- Specify the measurement window to run from before enrollment to at least two purchase cycles after redemption. A window that ends at redemption cannot detect the reset, which means it cannot detect the single largest risk to the program.

- Hold out a randomized control that never receives the mechanic at all. Historical pre-post comparisons cannot separate the program effect from seasonality, from cohort composition, or from the selection of engaged customers into enrollment.

- Report incremental margin alongside incremental volume, and return rate alongside both. For cart-value thresholds specifically this is not optional; a threshold that raises basket value while degrading margin and returns is a common and entirely invisible failure.

- Segment the post-reward analysis by pre-reward acceleration decile. The documented pattern is that the customers who accelerated most fall furthest. If that decile is not broken out, the most important effect in the data is averaged into invisibility.

- Apply the loss-harvesting test to any mechanic with an unbounded counter. If the force comes from the threat of destroying something the customer has accumulated rather than from the pull of something she is approaching, the mechanic requires a defense that a goal gradient does not, and that defense should be written down.

## Key Takeaways

- The goal gradient effect is that effort rises as perceived remaining distance to a goal falls, and it is one of the few behavioral findings with a clean animal-learning origin (Hull, 1932, Psychological Review), a direct field replication in commercial transaction data, and a randomized field experiment isolating the causal mechanism. The 74-year gap between Hull and the 2006 recovery reflects the absence of suitable data rather than the absence of interest.

- The operative variable is the reference point, not the objective remaining work. Kivetz, Urminsky and Zheng (2006, Journal of Marketing Research) showed that a twelve-stamp card with two stamps granted was completed faster than a plain ten-stamp card requiring identical effort, and Nunes and Drèze (2006, Journal of Consumer Research) showed roughly 34 percent completion against roughly 19 percent for control in a randomized car wash field experiment where both conditions required exactly eight further purchases.

- The café acceleration result is observational and carries real limits. Customers select into loyalty programs non-randomly, heavy users accumulate stamps faster and would produce apparent acceleration through composition alone if heterogeneity were not modelled explicitly, and the setting is a low-price, high-frequency, habitual category. The randomized studies are what license the causal reading, not the transaction data.

- The post-reward reset is the documented failure mode and the part practitioner writing omits. Purchase rates fall after redemption and fall hardest among the customers who accelerated most. Part of that decline is arithmetic, being a return to a baseline the acceleration was elevated above, and part is a genuine trough below baseline; separating the two requires measuring against the customer's own pre-enrollment baseline over a window extending at least two purchase cycles past redemption, against a randomized holdout. Rolling goals, immediate successor seeding, endowed progress on the successor, and graduated tier decay are the serious responses. The abrupt return to zero is the worst option and also the default whenever nobody decides.

- Progress mechanics that derive their force from approach toward a gain are defensible on straightforward grounds; mechanics with unbounded counters that derive their force from the threat of destroying an accumulated asset are not the same thing, become more coercive as the user becomes more committed, and require a defense that is written down rather than assumed. The adjacent Zeigarnik literature is too weakly replicated to bear weight, and the Amir and Ariely (2008) resting-on-laurels result means progress markers can suppress effort as well as raise it, so neither should be treated as a free motivational ingredient.

Tags
goal-gradientloyalty-programsprogress-mechanicsendowed-progressstreaksretention-design

Concepts defined
- Loss Aversion

Cite this essay
APAChicagoBibTeX

Ova, M. (2026, July 7). The Goal Gradient Effect: Progress Mechanics, Endowed Advancement, and the Post-Reward Reset. Product Philosophy. https://productphilosophy.com/articles/goal-gradient-progress-mechanics
Copy citation

Author
Murat OvaFounder & Principal Strategy Officer, Stochastic Minds
Murat Ova is the Founder and Principal Strategy Officer of Stochastic Minds, an integrated data, AI, digital strategy, and digital marketing consultancy. He writes here on product, behavioral economics, AI, and strategic decision-making.
LinkedInMore essays →

## Join the conversation
Disagree, share a counter-example from your own work, or point at research that changes the picture. Comments are moderated, no account required.
NameCommentPost comment
Read Next
- Behavioral Economics
## Decision Fatigue Did Not Replicate: What Survives of Ego Depletion, and What CRO Should Build Instead
Ego depletion did not survive preregistered replication: 23 labs, 2,141 participants, d = 0.04. Many interventions it justified still work, for other reasons. The mechanism determines what a team builds next.

- Behavioral Economics
## Peak, End, and Exit: Why Remembered Product Quality Diverges From Experienced Quality
What a customer remembers about a product is not the average of what they experienced and barely reflects how long it lasted. Retention, renewal, and survey scores all run on the remembered version, not the lived one.

- Behavioral Economics
## Choice Overload Is a Conditional Effect: Four Moderators That Decide Whether Cutting Options Works
The jam study made too much choice a folk theorem. The meta-analytic mean effect is approximately zero. Four moderators decide whether an assortment cut helps or destroys the tail.
