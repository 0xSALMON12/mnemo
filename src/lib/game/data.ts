import type { PersonDef, Appearance } from "./types";

// The Corner Café roster — 64 regulars. Fictional people with real-mnemonic payloads.
// Twin-day pairs (same first name, different person): Michael×2, Sarah×2, David×2,
// Emily×2, James×2, Anna×2.

const a = (
  skin: number,
  hair: number,
  shirt: number,
  hairBase: Appearance["hairBase"]
): Appearance => ({ skin, hair, shirt, hairBase });

export const PEOPLE: PersonDef[] = [
  // ── Twin pair: Michael ──
  { key: "michael-chen", first: "Michael", last: "Chen", aliases: ["mike"], emoji: "🎤", emojiLabel: "mic", featureId: "glasses", appearance: a(1, 0, 3, "short"), bio: "Hums before he speaks. Always something jazzy." },
  { key: "michael-torres", first: "Michael", last: "Torres", aliases: ["mike"], emoji: "🎤", emojiLabel: "mic", featureId: "beard", appearance: a(2, 1, 9, "short"), bio: "Orders two coffees. Drinks both himself." },

  // ── Twin pair: Sarah ──
  { key: "sarah-okoye", first: "Sarah", last: "Okoye", emoji: "🥻", emojiLabel: "sari", featureId: "bun", appearance: a(4, 0, 7, "buzz"), bio: "Runs the book club nobody is allowed to leave." },
  { key: "sarah-lindqvist", first: "Sarah", last: "Lindqvist", emoji: "🥻", emojiLabel: "sari", featureId: "earrings", appearance: a(0, 6, 2, "medium"), bio: "Knows every dog's name on the block. Every dog." },

  // ── Twin pair: David ──
  { key: "david-okafor", first: "David", last: "Okafor", emoji: "🪨", emojiLabel: "stone", featureId: "bald", appearance: a(5, 0, 4, "buzz"), bio: "Undefeated at corner-table chess since 2019." },
  { key: "david-reyes", first: "David", last: "Reyes", emoji: "🪨", emojiLabel: "stone", featureId: "curlyHair", appearance: a(2, 1, 0, "buzz"), bio: "Brings his own thermos. Every single day." },

  // ── Twin pair: Emily ──
  { key: "emily-fontaine", first: "Emily", last: "Fontaine", emoji: "📧", emojiLabel: "e-mail", featureId: "freckles", appearance: a(0, 4, 5, "long"), bio: "Writes postcards to strangers she meets on trains." },
  { key: "emily-nakamura", first: "Emily", last: "Nakamura", emoji: "📧", emojiLabel: "e-mail", featureId: "ponytail", appearance: a(1, 0, 8, "buzz"), bio: "Laptop stickers from cities she's never visited." },

  // ── Twin pair: James ──
  { key: "james-whitfield", first: "James", last: "Whitfield", emoji: "🍯", emojiLabel: "jam", featureId: "bowtie", appearance: a(0, 2, 6, "short"), bio: "Butters his toast in complete silence." },
  { key: "james-osei", first: "James", last: "Osei", emoji: "🍯", emojiLabel: "jam", featureId: "hat", appearance: a(5, 0, 1, "buzz"), bio: "Laughs a full second before the punchline." },

  // ── Twin pair: Anna ──
  { key: "anna-kowalski", first: "Anna", last: "Kowalski", emoji: "🍌", emojiLabel: "banana", featureId: "longHair", appearance: a(1, 1, 5, "buzz"), bio: "Reads two books at once. Finishes neither. Happy." },
  { key: "anna-marchetti", first: "Anna", last: "Marchetti", emoji: "🍌", emojiLabel: "banana", featureId: "mole", appearance: a(2, 1, 3, "medium"), bio: "Feeds the sparrows her croissant corners." },

  { key: "gordon-blake", first: "Gordon", last: "Blake", emoji: "🌷", emojiLabel: "garden", featureId: "beard", appearance: a(3, 2, 4, "short"), bio: "Talks to the plants on the windowsill. They bloom." },
  { key: "mark-vance", first: "Mark", last: "Vance", emoji: "🖊️", emojiLabel: "marker", featureId: "glasses", appearance: a(0, 2, 1, "short"), bio: "Doodles on napkins and gifts them, signed." },
  { key: "terry-oquinn", first: "Terry", last: "O'Quinn", emoji: "📄", emojiLabel: "torn page", featureId: "hat", appearance: a(4, 0, 9, "short"), bio: "Tells stories with the endings first." },
  { key: "jerry-ling", first: "Jerry", last: "Ling", emoji: "🍒", emojiLabel: "cherry", featureId: "earrings", appearance: a(2, 0, 5, "short"), bio: "Last to leave, first on the dance floor." },
  { key: "bill-hargrove", first: "Bill", last: "Hargrove", emoji: "🦆", emojiLabel: "duck bill", featureId: "mustache", appearance: a(0, 6, 6, "short"), bio: "Remembers every taxi driver's name but yours." },
  { key: "mike-dunphy", first: "Mike", last: "Dunphy", emoji: "🥛", emojiLabel: "milk", featureId: "curlyHair", appearance: a(3, 3, 2, "buzz"), bio: "Orders milk. In a café. Dead serious." },
  { key: "steve-alvarez", first: "Steve", last: "Alvarez", emoji: "🍳", emojiLabel: "pan", featureId: "goatee", appearance: a(2, 1, 1, "short"), bio: "Reviews breakfast spots as a lifestyle." },
  { key: "brian-teo", first: "Brian", last: "Teo", emoji: "🧠", emojiLabel: "brain", featureId: "glasses", appearance: a(3, 0, 0, "short"), bio: "Does crosswords in pen. Absolute show-off." },
  { key: "brad-kessler", first: "Brad", last: "Kessler", emoji: "🍞", emojiLabel: "stale bread", featureId: "mustache", appearance: a(0, 3, 9, "short"), bio: "Looks tough. Tips like a soft-hearted poet." },
  { key: "amy-santiago", first: "Amy", last: "Santiago", emoji: "🏹", emojiLabel: "aim", featureId: "ponytail", appearance: a(3, 1, 3, "buzz"), bio: "Arrives twenty minutes early. To everything." },
  { key: "ben-sofer", first: "Ben", last: "Sofer", emoji: "🪑", emojiLabel: "bench", featureId: "mole", appearance: a(1, 1, 2, "medium"), bio: "Naps upright with eyes open. Allegedly." },
  { key: "bea-tran", first: "Bea", last: "Tran", emoji: "🐝", emojiLabel: "bee", featureId: "freckles", appearance: a(2, 0, 1, "long"), bio: "Keeps rooftop bees. The honey is legendary." },
  { key: "bella-moreau", first: "Bella", last: "Moreau", emoji: "🔔", emojiLabel: "bell", featureId: "earrings", appearance: a(1, 4, 5, "long"), bio: "Wears bells on her bracelets. You'll hear her coming." },
  { key: "carl-jenkins", first: "Carl", last: "Jenkins", emoji: "🥕", emojiLabel: "carrot", featureId: "bald", appearance: a(0, 2, 6, "buzz"), bio: "Retired mailman. Undefeated trivia captain." },
  { key: "kate-ibarra", first: "Kate", last: "Ibarra", emoji: "🐱", emojiLabel: "cat", featureId: "bun", appearance: a(3, 1, 0, "buzz"), bio: "Brings photos of her cat unprompted. Continues anyway." },
  { key: "chad-brooks", first: "Chad", last: "Brooks", emoji: "🖍️", emojiLabel: "chalk", featureId: "goatee", appearance: a(0, 5, 4, "short"), bio: "Owns a skateboard. Uses it. He's 40." },
  { key: "chris-park", first: "Chris", last: "Park", emoji: "🔮", emojiLabel: "crystal", featureId: "glasses", appearance: a(2, 0, 8, "short"), bio: "Predicts the weather better than the radio does." },
  { key: "clara-vinge", first: "Clara", last: "Vinge", emoji: "🎷", emojiLabel: "clarinet", featureId: "longHair", appearance: a(1, 6, 7, "buzz"), bio: "Practices scales under her breath. In tune." },
  { key: "dan-mercado", first: "Dan", last: "Mercado", emoji: "🕺", emojiLabel: "dance", featureId: "curlyHair", appearance: a(4, 0, 1, "buzz"), bio: "Turns every sidewalk into a runway." },
  { key: "dean-foster", first: "Dean", last: "Foster", emoji: "🎓", emojiLabel: "graduation cap", featureId: "glasses", appearance: a(1, 6, 9, "short"), bio: "Retired professor. Still assigns homework." },
  { key: "deb-mallows", first: "Deb", last: "Mallows", emoji: "🧾", emojiLabel: "receipt", featureId: "mole", appearance: a(0, 3, 2, "medium"), bio: "Runs the lottery pool. Keeps the spreadsheet holy." },
  { key: "dennis-cruz", first: "Dennis", last: "Cruz", emoji: "🎾", emojiLabel: "tennis ball", featureId: "hat", appearance: a(4, 1, 0, "short"), bio: "Bounces a tennis ball while thinking. Always thinking." },
  { key: "doug-mensah", first: "Doug", last: "Mensah", emoji: "🐕", emojiLabel: "dog", featureId: "beard", appearance: a(5, 0, 3, "short"), bio: "Has a dog named Cat. Delights in explaining." },
  { key: "drew-stanton", first: "Drew", last: "Stanton", emoji: "✏️", emojiLabel: "pencil", featureId: "bowtie", appearance: a(2, 2, 6, "short"), bio: "Sketches the café from every seat. Table nine is best." },
  { key: "ella-jonsson", first: "Ella", last: "Jonsson", emoji: "☂️", emojiLabel: "umbrella", featureId: "earrings", appearance: a(0, 5, 5, "long"), bio: "Sings in elevators. Beautifully. Uninvited." },
  { key: "eric-walsh", first: "Eric", last: "Walsh", emoji: "📞", emojiLabel: "phone", featureId: "glasses", appearance: a(1, 1, 2, "buzz"), bio: "Answers his phone like a late-night radio host." },
  { key: "fay-lum", first: "Fay", last: "Lum", emoji: "🧚", emojiLabel: "fairy", featureId: "bun", appearance: a(2, 0, 8, "buzz"), bio: "Has seen every shooting star since 2009. Counts." },
  { key: "frank-dubois", first: "Frank", last: "Dubois", emoji: "🌭", emojiLabel: "frankfurter", featureId: "mustache", appearance: a(1, 6, 1, "short"), bio: "Brings his own mustard. We've stopped asking." },
  { key: "gary-otto", first: "Gary", last: "Otto", emoji: "⚙️", emojiLabel: "gear", featureId: "bald", appearance: a(2, 2, 9, "buzz"), bio: "Fixes the espresso machine before it breaks." },
  { key: "grace-oyelaran", first: "Grace", last: "Oyelaran", emoji: "🦢", emojiLabel: "swan", featureId: "earrings", appearance: a(5, 0, 5, "buzz"), bio: "Walks like the floor owes her money." },
  { key: "greg-petrov", first: "Greg", last: "Petrov", emoji: "🥚", emojiLabel: "egg", featureId: "hat", appearance: a(0, 4, 2, "short"), bio: "Soft-boiled egg at 8:05. Sharp. Non-negotiable." },
  { key: "gus-moreno", first: "Gus", last: "Moreno", emoji: "🌬️", emojiLabel: "gust of wind", featureId: "beard", appearance: a(3, 1, 7, "short"), bio: "Speaks softly. Whistles like a kettle." },
  { key: "harry-wu", first: "Harry", last: "Wu", emoji: "🦁", emojiLabel: "hairy lion", featureId: "curlyHair", appearance: a(3, 0, 3, "buzz"), bio: "Hair unfazed by rain, wind, or judgment." },
  { key: "helen-suzuki", first: "Helen", last: "Suzuki", emoji: "👠", emojiLabel: "high heel", featureId: "bun", appearance: a(1, 0, 5, "buzz"), bio: "Power-walks in heels that should be illegal." },
  { key: "holly-barnes", first: "Holly", last: "Barnes", emoji: "🌿", emojiLabel: "holly sprig", featureId: "freckles", appearance: a(0, 4, 4, "medium"), bio: "Smells faintly of pine. Nobody knows why." },
  { key: "jack-monroe", first: "Jack", last: "Monroe", emoji: "🃏", emojiLabel: "jack of cards", featureId: "hat", appearance: a(2, 1, 9, "short"), bio: "Plays cards with the baristas on break. Loses cheerfully." },
  { key: "jane-okoro", first: "Jane", last: "Okoro", emoji: "⛓️", emojiLabel: "chain", featureId: "longHair", appearance: a(4, 0, 0, "buzz"), bio: "Deadlifts Sundays. Journals Mondays. Believes in you." },
  { key: "jason-kim", first: "Jason", last: "Kim", emoji: "🐦", emojiLabel: "jay", featureId: "earrings", appearance: a(2, 0, 6, "short"), bio: "Whistles back at birds. They answer." },
  { key: "jeff-larsen", first: "Jeff", last: "Larsen", emoji: "🚙", emojiLabel: "jeep", featureId: "goatee", appearance: a(0, 3, 4, "short"), bio: "Off-roads to get here. Lives four blocks away." },
  { key: "jill-hanson", first: "Jill", last: "Hanson", emoji: "⛰️", emojiLabel: "hill", featureId: "ponytail", appearance: a(1, 2, 1, "buzz"), bio: "Hikes before dawn. Brags by nine." },
  { key: "jim-peterson", first: "Jim", last: "Peterson", emoji: "🏋️", emojiLabel: "gym", featureId: "mustache", appearance: a(2, 6, 2, "short"), bio: "Lifts groceries into the cart. One by one. Slowly." },
  { key: "joan-elliott", first: "Joan", last: "Elliott", emoji: "🏦", emojiLabel: "loan", featureId: "mole", appearance: a(1, 6, 7, "medium"), bio: "Will loan you a pen. You will not get it back." },
  { key: "joe-ferro", first: "Joe", last: "Ferro", emoji: "☕", emojiLabel: "cup of joe", featureId: "beard", appearance: a(3, 0, 9, "short"), bio: "Black coffee. Judges your order, but kindly." },
  { key: "john-mbeki", first: "John", last: "Mbeki", emoji: "🚽", emojiLabel: "the john", featureId: "hat", appearance: a(4, 0, 3, "buzz"), bio: "Introduced himself once. Found it hilarious ever since." },
  { key: "judy-cho", first: "Judy", last: "Cho", emoji: "⚖️", emojiLabel: "judge", featureId: "glasses", appearance: a(1, 0, 1, "buzz"), bio: "Settles debates at table six. Final verdicts only." },
  { key: "julie-ramos", first: "Julie", last: "Ramos", emoji: "💎", emojiLabel: "jewel", featureId: "earrings", appearance: a(3, 1, 8, "long"), bio: "Rattles when she walks. All real, she claims." },
  { key: "kay-sullivan", first: "Kay", last: "Sullivan", emoji: "🔑", emojiLabel: "key", featureId: "freckles", appearance: a(0, 5, 3, "medium"), bio: "Knows which key opens every door in town." },
  { key: "ken-mori", first: "Ken", last: "Mori", emoji: "🥫", emojiLabel: "can", featureId: "bald", appearance: a(3, 0, 0, "buzz"), bio: "Shakes his head at latte art. Drinks it anyway." },
  { key: "kevin-oboyle", first: "Kevin", last: "O'Boyle", emoji: "🕳️", emojiLabel: "cave", featureId: "beard", appearance: a(1, 2, 6, "short"), bio: "Falls asleep mid-sentence. Finishes tomorrow." },
  { key: "leo-galante", first: "Leo", last: "Galante", emoji: "♌", emojiLabel: "leo sign", featureId: "mustache", appearance: a(2, 2, 5, "short"), bio: "Says 'it's in the stars' about absolutely everything." },
  { key: "lily-nwosu", first: "Lily", last: "Nwosu", emoji: "🌸", emojiLabel: "lily", featureId: "bun", appearance: a(5, 0, 2, "buzz"), bio: "Names all the café plants. They thrive on it." },
  { key: "linda-hartley", first: "Linda", last: "Hartley", emoji: "🍫", emojiLabel: "chocolate", featureId: "glasses", appearance: a(0, 3, 4, "medium"), bio: "Brings samples. Watches you eat them. Takes notes." },
  { key: "lisa-duval", first: "Lisa", last: "Duval", emoji: "🖼️", emojiLabel: "Mona Lisa", featureId: "longHair", appearance: a(2, 1, 7, "long"), bio: "Smiles mysteriously when asked what's funny." },
  { key: "mabel-grimes", first: "Mabel", last: "Grimes", emoji: "🍁", emojiLabel: "maple", featureId: "earrings", appearance: a(1, 6, 1, "medium"), bio: "Puts syrup on everything. EVERYTHING." },
  { key: "maria-fuentes", first: "Maria", last: "Fuentes", emoji: "💍", emojiLabel: "ring", featureId: "ponytail", appearance: a(4, 1, 5, "buzz"), bio: "Planning someone's wedding. Not hers. Yet." },
  { key: "martha-adeyemi", first: "Martha", last: "Adeyemi", emoji: "🥋", emojiLabel: "martial arts", featureId: "hat", appearance: a(5, 0, 9, "buzz"), bio: "Chops the air quietly while waiting. Black belt." },
  { key: "mary-lambert", first: "Mary", last: "Lambert", emoji: "🐑", emojiLabel: "lamb", featureId: "curlyHair", appearance: a(0, 4, 0, "buzz"), bio: "Her laugh arrives a full table before she does." },
  { key: "meg-chang", first: "Meg", last: "Chang", emoji: "📣", emojiLabel: "megaphone", featureId: "ponytail", appearance: a(2, 0, 3, "buzz"), bio: "Quiet voice. Massive opinions." },
  { key: "michelle-arnaud", first: "Michelle", last: "Arnaud", emoji: "🐌", emojiLabel: "snail", featureId: "longHair", appearance: a(1, 4, 2, "long"), bio: "Never rushes. Arrives first anyway." },
  { key: "nancy-fields", first: "Nancy", last: "Fields", emoji: "🍼", emojiLabel: "nanny bottle", featureId: "glasses", appearance: a(0, 6, 5, "medium"), bio: "Silences a room with one eyebrow." },
  { key: "neil-purcell", first: "Neil", last: "Purcell", emoji: "🙇", emojiLabel: "kneel", featureId: "goatee", appearance: a(3, 2, 9, "buzz"), bio: "Bowled one perfect game. 1998. Brings it up." },
  { key: "nora-trask", first: "Nora", last: "Trask", emoji: "🦫", emojiLabel: "gnawing beaver", featureId: "bun", appearance: a(2, 1, 4, "buzz"), bio: "Chews her pens. Has chewed forty pens." },
  { key: "oliver-stapleton", first: "Oliver", last: "Stapleton", emoji: "🥣", emojiLabel: "porridge bowl", featureId: "hat", appearance: a(0, 1, 7, "short"), bio: "Petitions yearly to put porridge on the menu." },
  { key: "paula-vesely", first: "Paula", last: "Vesely", emoji: "🐾", emojiLabel: "paw", featureId: "mole", appearance: a(1, 2, 8, "medium"), bio: "Volunteer at the shelter. Cat hair: decorative." },
  { key: "pete-calloway", first: "Pete", last: "Calloway", emoji: "🐠", emojiLabel: "pet fish", featureId: "bald", appearance: a(2, 1, 2, "buzz"), bio: "Has a fish named Toast. Toast knows him." },
  { key: "quinn-harper", first: "Quinn", last: "Harper", emoji: "👸", emojiLabel: "queen", featureId: "earrings", appearance: a(0, 3, 9, "long"), bio: "Chess queen of the park tables. Checkmates kindly." },
  { key: "rex-malone", first: "Rex", last: "Malone", emoji: "🦖", emojiLabel: "T-rex", featureId: "goatee", appearance: a(4, 0, 0, "buzz"), bio: "Jurassic park quotes. Refuses to explain the rules." },
  { key: "rich-galloway", first: "Rich", last: "Galloway", emoji: "💰", emojiLabel: "money bag", featureId: "glasses", appearance: a(1, 1, 1, "short"), bio: "Pretends to be broke. Tips like a baron." },
  { key: "rick-stamos", first: "Rick", last: "Stamos", emoji: "🧱", emojiLabel: "brick", featureId: "mustache", appearance: a(3, 0, 4, "short"), bio: "Lays brick for a living. Built the patio out back." },
  { key: "rita-moretti", first: "Rita", last: "Moretti", emoji: "🍹", emojiLabel: "margarita", featureId: "earrings", appearance: a(2, 1, 5, "medium"), bio: "Brings tiny umbrellas for every drink. Even tea." },
  { key: "rob-pinter", first: "Rob", last: "Pinter", emoji: "🦝", emojiLabel: "robber raccoon", featureId: "curlyHair", appearance: a(0, 4, 6, "buzz"), bio: "Will 'borrow' a fry when you look away." },
  { key: "rose-achterberg", first: "Rose", last: "Achterberg", emoji: "🌹", emojiLabel: "rose", featureId: "longHair", appearance: a(1, 3, 5, "long"), bio: "Prunes the café roses. Threatens them lovingly." },
  { key: "roy-colvin", first: "Roy", last: "Colvin", emoji: "🪨", emojiLabel: "rock", featureId: "bald", appearance: a(2, 6, 9, "buzz"), bio: "Sits like a boulder. Moves like a landslide." },
  { key: "ruth-okafor", first: "Ruth", last: "Okafor", emoji: "🌱", emojiLabel: "root", featureId: "bun", appearance: a(5, 0, 3, "buzz"), bio: "Family recipes memorized. Measured by heart." },
  { key: "sally-nguyen", first: "Sally", last: "Nguyen", emoji: "🥗", emojiLabel: "salad", featureId: "freckles", appearance: a(2, 0, 1, "medium"), bio: "Orders salad at a café famous for cake." },
  { key: "sam-whitaker", first: "Sam", last: "Whitaker", emoji: "🍖", emojiLabel: "ham", featureId: "hat", appearance: a(1, 2, 0, "short"), bio: "Jokes at his own expense. Profit margin: huge." },
  { key: "sandra-kozlowski", first: "Sandra", last: "Kozlowski", emoji: "🩴", emojiLabel: "sandal", featureId: "mole", appearance: a(0, 5, 7, "long"), bio: "Wears sandals in the snow. Victory laps in July." },
  { key: "sean-brannigan", first: "Sean", last: "Brannigan", emoji: "☘️", emojiLabel: "shamrock", featureId: "beard", appearance: a(0, 3, 2, "short"), bio: "Says 'top o' the morning' at 4 PM. Committed." },
  { key: "stella-vance", first: "Stella", last: "Vance", emoji: "⭐", emojiLabel: "star", featureId: "earrings", appearance: a(3, 1, 8, "medium"), bio: "Star-shaped everything. Happiness is a strategy." },
  { key: "steve-purvis", first: "Steve", last: "Purvis", emoji: "🍳", emojiLabel: "pan", featureId: "hat", appearance: a(1, 6, 4, "short"), bio: "Two Steves? Ask about the breakfast-off of 2019." },
  { key: "sue-lindgren", first: "Sue", last: "Lindgren", emoji: "🍜", emojiLabel: "soup", featureId: "glasses", appearance: a(1, 6, 6, "medium"), bio: "Brings soup for whoever looks like they need it." },
  { key: "ted-bundley", first: "Ted", last: "Bundley", emoji: "🧸", emojiLabel: "teddy", featureId: "bald", appearance: a(0, 2, 5, "buzz"), bio: "Softest handshake in town. World-class hugger." },
  { key: "tim-osei", first: "Tim", last: "Osei", emoji: "⏰", emojiLabel: "time", featureId: "curlyHair", appearance: a(4, 0, 7, "buzz"), bio: "Arrives at 7:58. Not 7:57. Not 7:59." },
  { key: "tina-ballis", first: "Tina", last: "Ballis", emoji: "🩰", emojiLabel: "ballerina", featureId: "ponytail", appearance: a(2, 0, 5, "long"), bio: "Pirouettes past the pastry case. Every time." },
  { key: "tony-ferraro", first: "Tony", last: "Ferraro", emoji: "🐯", emojiLabel: "tiger", featureId: "goatee", appearance: a(3, 0, 9, "short"), bio: "Frosted flakes in a takeaway box. Grrreat." },
  { key: "tracy-meldrum", first: "Tracy", last: "Meldrum", emoji: "🚜", emojiLabel: "tractor", featureId: "ponytail", appearance: a(0, 4, 3, "medium"), bio: "Farm-girl posture, city-quick wit." },
  { key: "vera-cranz", first: "Vera", last: "Cranz", emoji: "📼", emojiLabel: "videotape", featureId: "bun", appearance: a(1, 1, 2, "medium"), bio: "Rents VHS from the library. Very good movies." },
  { key: "vicky-lin", first: "Vicky", last: "Lin", emoji: "🏆", emojiLabel: "trophy", featureId: "earrings", appearance: a(2, 0, 0, "buzz"), bio: "Tracks her PBs in a notebook. Undefeated optimist." },
  { key: "walter-pryce", first: "Walter", last: "Pryce", emoji: "💧", emojiLabel: "water", featureId: "mustache", appearance: a(1, 6, 1, "short"), bio: "Eight glasses a day. Offers you his flask of tap." },
  { key: "wanda-okonkwo", first: "Wanda", last: "Okonkwo", emoji: "🧭", emojiLabel: "compass", featureId: "longHair", appearance: a(4, 0, 4, "long"), bio: "Never lost. Asks for directions anyway." },
  { key: "wendy-gale", first: "Wendy", last: "Gale", emoji: "🪁", emojiLabel: "kite", featureId: "freckles", appearance: a(1, 5, 1, "medium"), bio: "Flies kites on the hill. Calls it 'meetings'." },
  { key: "will-dodson", first: "Will", last: "Dodson", emoji: "🛞", emojiLabel: "wheel", featureId: "bowtie", appearance: a(2, 1, 2, "short"), bio: "Restores vintage bikes. Rides one to work. In a bowtie." },
];

export const PERSON_BY_KEY: Record<string, PersonDef> = Object.fromEntries(
  PEOPLE.map((p) => [p.key, p])
);

export const ROSTER_SIZE = PEOPLE.length;
