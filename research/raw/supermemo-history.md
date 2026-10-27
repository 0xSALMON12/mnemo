# History of SuperMemo algorithm - supermemo.guru
URL: https://supermemo.guru/wiki/History_of_SuperMemo_algorithm
Published: unknown

History of SuperMemo algorithm - supermemo.guru

- 

- 

- 
- 
- 

	
	

	
	

	
## History of SuperMemo algorithm

	
 From supermemo.guru

 

 

 
 

 Jump to navigation
 Jump to search
 This text is part of: "History of spaced repetition" by Piotr Wozniak (June 2018)

Here is a brief history of SuperMemo Algorithm from the birth of spaced repetition in 1985: 

- 1985 - Paper-and-pencil version of SuperMemo was formulated (see: Birth of spaced repetition). Repetitions of whole pages of material proceeded along a fixed table of intervals. See also: SuperMemo on paper

- 1987 - First computer implementation of SuperMemo makes it possible to divide material into individual items. Items are classified into difficulty categories by means of E-Factors. Each difficulty category has its own optimum spacing of repetitions (see: SuperMemo 1.0 for DOS (1987))

- 1989 - SuperMemo 4 was able to modify the function of optimum intervals depending on the student's performance (Algorithm SM-4). This was then the first algorithm in which the function of optimal intervals was adaptable

- 1989 - SuperMemo 5 replaced the matrix of optimum intervals with the matrix of optimal factors (an optimum factor is the ratio between successive intervals). This approach accelerated the adaptation of the function of optimum intervals (Algorithm SM-5)

- 1991 - SuperMemo 6 derived optimal factors from forgetting curves plotted for each entry of the matrix of optimum factors. This could dramatically speed up the convergence of the function of optimum intervals to its ultimate value (Algorithm SM-6). This was then the first adaptable algorithm that would use regression to find the best fit to the actual memory performance data. Unlike SuperMemo 5, which could keep converging and diverging depending on the quality of the learning material and the learning process, SuperMemo 6 would get closer to the student's ultimate memory model with each day of learning

- 1995 - SuperMemo 8 capitalized on data collected by users of SuperMemo 6 and SuperMemo 7 and added a number of improvements that strengthened the theoretical validity of the function of optimum intervals and made it possible to accelerate its adaptation, esp. in the early stages of learning (Algorithm SM-8). New concepts:
- replacing E-Factors with absolute difficulty factors: A-Factors. Item difficulty was thus defined in terms of actual properties of human memory, and would not depend on the average difficulty of the learning material

- fast approximation of A-Factors from the First Grade vs. A-Factor correlation graph and Grade vs. Forgetting index graph. This makes it possible to quickly guess item's difficulty before more data is available

- real-time adjustment of the matrix of optimal factors based on the power approximation of the decline of optimum factors

- 2002 - SuperMemo 11 (aka SuperMemo 2002) introduced the first SuperMemo algorithm that is resistant to interference from delay or advancement of repetitions: Algorithm SM-11. This makes it possible to safely delay repetitions (Postpone) or advance repetitions (Review):
- accounting for delayed repetitions by introducing the concept of repetition categories

- accounting for advanced repetitions by introducing O-Factor decrements derived from the concept of the spacing effect

- 2005 - SuperMemo 12 (aka SuperMemo 2004) introduced boundaries on A and B parameters computed from the Grade vs. Forgetting Index data. This plugs up a weakness in the algorithm that showed when importing repetitions from other applications (e.g. open source MemAid). If a large number of easy repetitions occurred at unnaturally long intervals (as after pre-training with another application), the graph might show reversed monotonicity that would temporarily affect the estimation of A-Factors (the speed of self-correction would be reversely proportional to the amount of flawed data). When boundaries are imposed, self-correction is instant, and the accuracy of A-Factor estimation increases with each repetition executed in SuperMemo

- 2011 - Algorithm SM-15 in SuperMemo 15 eliminated two weaknesses of Algorithm SM-11 that would show up in heavily overloaded collections with very large item delays:
- U-Factors now allow of correctly interpreting repetition delays of up to 15 years (previously only 60 days)

- forgetting curves are now corrected for repetition delays beyond the maximum registered U-Factor value (preventing failed grades in delayed repetitions decreasing the estimates of the optimum interval for standardly-scheduled items in the same category)

- 2015 - Algorithm SM-17 is the first algorithm based entirely on the two component model of memory. It is the largest qualitative change in history of spaced repetition

- 2019 - Algorithm SM-18 improves the approximation of the stabilization function. It also changes the way item difficulty is computed

- 2024 - Algorithm SM-19 is an updated version of the spaced repetition algorithm introduced in SuperMemo 19. The new algorithm improved the way post-lapse stability is estimated. It also improved the metrics by taking the best of Algorithm SM-15 and Algorithm SM-17 in handling the first forgetting curve

- 2026 - Algorithm SM-20 is the first algorithm based solely on the theoretical model of memory with all parameters computed by means of machine learning

This text is part of: "History of spaced repetition" by Piotr Wozniak (June 2018)

Retrieved from "https://supermemo.guru/index.php?title=History_of_SuperMemo_algorithm&oldid=32736"

 

	

	
## Navigation menu

	
 

 
 

 

 

 
 

 

 

	
## Search
