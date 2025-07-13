import type { LearningStep, Badge, AnalogyTheme } from './types';
// import * as Icons from './components/icons'; // Used for badge iconName type safety

// --- Analogy Maps ---

// 1. Medical/Healthcare Analogies
export const medicalAnalogyMap: Record<string, string> = {
  // OS and System Level
  'Operating System': 'The human nervous system - manages all basic functions and communication between components',
  'Kernel': 'The brain stem - handles core system operations and resource allocation',
  'Process': 'A medical procedure - has a defined start, execution, and end state',
  'Thread': 'A medical specialist - works within a process to perform specific tasks',
  
  // Hardware
  'CPU': 'The heart - processes instructions and keeps the system running',
  'RAM': 'Short-term memory - holds currently active information',
  'Hard Drive': 'Long-term memory - stores information for later use',
  
  // Networking
  'API': 'The nervous system for applications - allows different parts to communicate',
  'Firewall': 'The immune system - protects against harmful external elements',
  
  // Software Concepts
  'Database': 'A patient medical records system - stores and retrieves patient information',
  
  // Development Concepts
  'Debugging': 'Medical diagnosis - identifying and fixing issues in a system',
  'Microservices': 'Specialized hospital departments (Cardiology, Oncology) - each handles specific functions independently',

  // Data Concepts
  'Machine Learning': 'AI-assisted medical diagnosis - identifies patterns in data to predict outcomes',
};

// 2. City Planning/Government Analogies (Original SWE)
export const cityAnalogyMap: Record<string, string> = {
  'Operating System': 'A city\'s government - manages all public services and resources',
  'Kernel': 'The mayor\'s office - handles the most critical city-wide decisions',
  'Process': 'A construction project - has a clear plan, resources, and a final goal',
  'Thread': 'A specialized construction crew (plumbers, electricians) - performs one job within the project',
  
  'CPU': 'The main power plant - provides the energy for the entire city to function',
  'RAM': 'A workshop\'s workbench - holds the tools and materials for the job you are currently doing',
  'Hard Drive': 'The city\'s main library or archive - stores all information for long-term access',
  
  'API': 'A restaurant menu - provides a clear list of what you can order and how, without needing to know the kitchen\'s recipes',
  'Firewall': 'A building\'s security guard and ID checkpoint - inspects everyone and everything coming in or out',
  
  'Database': 'A meticulously organized warehouse - stores vast amounts of items in a structured way for quick retrieval',

  'Debugging': 'Being a detective - finding clues (bugs) to solve a mystery (the problem)',
  'Microservices': 'A food court with different stalls (Tacos, Pizza, Sushi) - each operates independently but serves a common goal',

  'Machine Learning': 'Teaching a new employee by showing them thousands of past examples of a task until they can do it on their own',
};

// 3. Business/Corporate Analogies
export const businessAnalogyMap: Record<string, string> = {
  'Operating System': 'Corporate headquarters - manages all departments and company operations',
  'Kernel': 'The CEO - makes critical decisions and allocates company resources',
  'Process': 'A business project - has defined goals, timeline, and deliverables',
  'Thread': 'A specialized team (Marketing, Sales, HR) - works on specific tasks within projects',

  'CPU': 'The executive team - processes decisions and drives company performance',
  'RAM': 'Active project workspace - holds current initiatives and ongoing work',
  'Hard Drive': 'Company archives - stores all historical data and documents',

  'API': 'Business partnerships - standardized ways for companies to work together',
  'Firewall': 'Corporate security - protects against competitors and threats',
  'Database': 'Customer relationship management system - organizes and retrieves business data',

  'Debugging': 'Business consulting - identifying and solving operational problems',
  'Microservices': 'Franchise model - independent locations that operate under common standards',
  'Machine Learning': 'Market research analysis - learning from customer data to predict trends',
};

// 4. Kitchen/Cooking Analogies
export const kitchenAnalogyMap: Record<string, string> = {
  'Operating System': 'The head chef - coordinates all kitchen operations and staff',
  'Kernel': 'The kitchen manager - handles core operations and resource allocation',
  'Process': 'A recipe - step-by-step instructions to create a dish',
  'Thread': 'A line cook - specializes in specific cooking tasks (grill, sauté, prep)',

  'CPU': 'The main stove - where all the cooking (processing) happens',
  'RAM': 'The prep counter - holds ingredients currently being used',
  'Hard Drive': 'The pantry - stores all ingredients and supplies long-term',

  'API': 'The pass window - standardized way for kitchen and waitstaff to communicate orders',
  'Firewall': 'Food safety protocols - protects against contamination and health risks',
  'Database': 'Recipe collection - organized storage of all dishes and their ingredients',

  'Debugging': 'Taste testing - identifying and fixing flavor problems in dishes',
  'Microservices': 'Food truck network - independent kitchens serving different specialties',
  'Machine Learning': 'Learning customer preferences - adjusting menu based on popular orders',
};

// 5. Sports/Team Analogies
export const sportsAnalogyMap: Record<string, string> = {
  'Operating System': 'The coaching staff - manages team strategy and player coordination',
  'Kernel': 'The head coach - makes critical game decisions and manages resources',
  'Process': 'A game plan - structured approach to achieve victory',
  'Thread': 'Position players (quarterback, defender) - specialized roles within the game plan',

  'CPU': 'The team captain - processes plays and drives team performance',
  'RAM': 'The active playbook - current strategies and plays being used',
  'Hard Drive': 'Team archives - all historical plays, stats, and game footage',

  'API': 'Official signals - standardized communication between referees and teams',
  'Firewall': 'Team defense - protects against opponent attacks and strategies',
  'Database': 'Player statistics system - tracks and analyzes all player and team data',

  'Debugging': 'Game film review - analyzing mistakes to improve performance',
  'Microservices': 'League divisions - independent teams that follow common rules',
  'Machine Learning': 'Scouting analysis - learning from opponent patterns to predict plays',
};

// 6. Nature/Ecosystem Analogies
export const natureAnalogyMap: Record<string, string> = {
  'Operating System': 'Forest ecosystem - manages all interactions between plants and animals',
  'Kernel': 'The soil - provides foundation and nutrients for all life',
  'Process': 'Seasonal cycle - natural progression with defined stages',
  'Thread': 'Individual species (birds, insects) - each plays a specific role in the ecosystem',

  'CPU': 'The sun - provides energy that powers all ecosystem processes',
  'RAM': 'Active growing season - current energy and nutrients being used',
  'Hard Drive': 'Seed bank in soil - stores genetic information for future growth',

  'API': 'Pollination network - standardized way for plants and insects to exchange resources',
  'Firewall': 'Natural immunity - protects ecosystem from diseases and invasive species',
  'Database': 'Genetic diversity - organized storage of all species information',

  'Debugging': 'Natural selection - identifying and eliminating weak or problematic traits',
  'Microservices': 'Habitat patches - independent areas that support different communities',
  'Machine Learning': 'Evolutionary adaptation - species learning from environment to survive better',
};

// Analogy Theme Configurations
export const ANALOGY_THEMES: Record<AnalogyTheme, { name: string; description: string; emoji: string; map: Record<string, string> }> = {
  medical: {
    name: 'Medical & Healthcare',
    description: 'Perfect for healthcare professionals - uses medical analogies like heart (CPU) and nervous system (API)',
    emoji: '🏥',
    map: medicalAnalogyMap
  },
  city: {
    name: 'City Planning & Government',
    description: 'Urban planning analogies - think mayor (kernel), city services (processes), and infrastructure',
    emoji: '🏙️',
    map: cityAnalogyMap
  },
  business: {
    name: 'Business & Corporate',
    description: 'Corporate world analogies - CEO (kernel), departments (threads), and business partnerships (APIs)',
    emoji: '💼',
    map: businessAnalogyMap
  },
  kitchen: {
    name: 'Kitchen & Cooking',
    description: 'Culinary analogies - head chef (OS), stove (CPU), prep counter (RAM), and recipes (processes)',
    emoji: '👨‍🍳',
    map: kitchenAnalogyMap
  },
  sports: {
    name: 'Sports & Teams',
    description: 'Athletic analogies - coaching staff (OS), team captain (CPU), and game plans (processes)',
    emoji: '⚽',
    map: sportsAnalogyMap
  },
  nature: {
    name: 'Nature & Ecosystems',
    description: 'Natural world analogies - forest ecosystem (OS), sun (CPU), and seasonal cycles (processes)',
    emoji: '🌲',
    map: natureAnalogyMap
  }
};

// Legacy export for backward compatibility
export const sweAnalogyMap = cityAnalogyMap;


// --- Learning Paths ---

// 1. CODING Learning Path (For Kids and Adult Beginners choosing 'coding')
export const CODING_LEARNING_PATH: LearningStep[] = [
    {
    id: 'welcome',
    title: 'Welcome to Coding!',
    emoji: '🤖',
    blockType: 'Introduction',
    introductionPrompt: `You are a friendly and encouraging AI coding coach. Your audience is a complete beginner.
1.  Welcome them warmly to the world of coding.
2.  Explain that coding is like giving instructions to a computer. Use a simple, fun analogy (e.g., teaching a robot, writing a recipe for a cake).
3.  Reassure them that it's okay to not know anything yet and that you'll guide them step-by-step.
4.  Briefly mention they'll learn about giving commands, storing information, and making decisions in code.
5.  End with an exciting call to action like, "Ready to write your first instruction?"`,
    challengeDescription: "For your first task, just tell me what you'd like to learn about coding, or simply say 'hello' to get started!",
    codeEvaluationPromptPreamble: "The user is introducing themselves. Respond with a very friendly and encouraging message. Welcome them by name if they provide it. Keep it short and sweet, then tell them to press 'Next' to see their first real concept.",
    placeholder: "Type 'hello' or what you're excited to learn!",
    estimatedTimeMinutes: 5,
    points: 5,
  },
  {
    id: 'variables',
    title: 'Storing Information',
    emoji: '📦',
    blockType: 'Variables',
    introductionPrompt: "Explain what a 'variable' is in programming. Use the analogy of a labeled box or container where you can store information (like numbers, text, or true/false values). Emphasize that you give the box a name (the variable name) so you can easily find and use what's inside later.",
    challengeDescription: "Imagine you have a box named 'score' and you want to put the number 100 inside it. How would you write that as a simple instruction?",
    codeEvaluationPromptPreamble: "The user is being asked to declare a variable. They should write something like 'score = 100' or 'let score = 100'. Evaluate if their answer correctly assigns the value 100 to a variable named score.",
    placeholder: "score = 100",
    estimatedTimeMinutes: 10,
    points: 10,
  },
   {
    id: 'conditionals',
    title: 'Making Decisions',
    emoji: '🤔',
    blockType: 'If/Else Statements',
    introductionPrompt: "Explain 'if/else' conditional statements. Use the analogy of making a decision based on a condition. For example: 'IF it is raining, THEN I will take an umbrella, ELSE I will wear sunglasses.' Show how this allows a program to react differently to different situations.",
    challengeDescription: "Write a simple 'if' statement to check if a 'health' variable is less than 10. If it is, the instruction should be to 'use a potion'.",
    codeEvaluationPromptPreamble: "The user needs to write a simple conditional. They should write something like 'if health < 10 then use potion'. Check if they have the core components: an 'if', a condition (health < 10), and an action.",
    placeholder: "if health < 10 then...",
    estimatedTimeMinutes: 15,
    points: 15,
  },
];


// 2. MEDTECH Learning Path (For Healthcare Professionals)
export const MEDTECH_LEARNING_PATH: LearningStep[] = [
  {
    id: 'med_welcome',
    title: 'Technology in Medicine',
    emoji: '🏥',
    blockType: 'Introduction to MedTech Concepts',
    introductionPrompt: `You are an expert in medical technology, welcoming a fellow medical professional to a course on core tech concepts.

**CRITICAL: Structure your response EXACTLY like this with SHORT sections:**

**🎯 Welcome & Recognition**
Acknowledge their clinical expertise as the perfect foundation. Recognize the complexity of modern healthcare technology.

**💡 Why This Matters**
Better communication with IT teams. Informed technology evaluation and adoption. Optimized digital workflows in patient care.

**📋 What to Expect**
Focus on core concepts, not coding. Medical analogies make technical topics intuitive. Practical applications to healthcare scenarios.

**FORMATTING RULES:**
- Each section: 2-3 sentences maximum
- Use **bold headers** with emojis
- NO long paragraphs
- End with: "Let's begin our first consultation."`,
    challengeDescription: "Clinical Scenario: You're evaluating a new telehealth platform for your practice. What specific technical aspects would you want to understand to make an informed decision? (Consider: data security, system integration, performance requirements)",
    codeEvaluationPromptPreamble: "The user has identified key technical considerations for healthcare technology evaluation. Acknowledge their clinical thinking and connect it to the technical concepts we'll explore. Keep response brief and encouraging.",
    placeholder: "e.g., How it integrates with our EHR, data encryption standards...",
    estimatedTimeMinutes: 5,
    points: 5,
  },
  {
    id: 'med_cpu_ram',
    title: 'System Anatomy',
    emoji: '🫀',
    blockType: 'CPU & RAM',
    introductionPrompt: `Explain CPU and RAM using medical analogies.

**CRITICAL: Structure your response EXACTLY like this:**

**🫀 CPU - The Heart**
Processes all instructions and calculations. Like the heart pumping blood through the system. Determines overall system performance.

**🧠 RAM - Short-term Memory**
Holds currently active information. Like working memory during patient rounds. Contrast with Hard Drive (long-term medical records storage).

**🏥 Clinical Application**
More RAM = handling more patient charts simultaneously. Faster CPU = quicker processing of complex imaging data.

**FORMATTING RULES:**
- Each section: 2-3 sentences maximum
- Use **bold headers** with emojis
- NO long paragraphs
- Keep explanations brief and focused`,
    challengeDescription: "Clinical Case: During a busy shift, Dr. Smith's workstation becomes sluggish when she has 15 patient charts open while reviewing lab results and imaging studies. Based on the system anatomy, which component is most likely the bottleneck? A) CPU (Heart) - processing power, or B) RAM (Short-term memory) - active data storage. Explain your diagnosis.",
    codeEvaluationPromptPreamble: "The user is diagnosing a system performance issue. The correct answer is RAM (short-term memory) because it holds all the actively open patient data. Evaluate their clinical reasoning approach to the technical problem.",
    placeholder: "The bottleneck is likely [A/B] because...",
    estimatedTimeMinutes: 10,
    points: 10,
  },
  {
    id: 'med_api',
    title: 'System Communication',
    emoji: '🧠',
    blockType: 'API',
    introductionPrompt: `Explain APIs using the nervous system analogy.

**CRITICAL: Structure your response EXACTLY like this:**

**🧠 API - The Nervous System**
Enables communication between different systems. Like neural pathways connecting brain to organs. Standardized "language" for system interaction.

**🏥 Healthcare Examples**
EHR ↔ Pharmacy systems. Lab systems ↔ Provider portals. Imaging systems ↔ Radiology workstations.

**⚡ How It Works**
System A sends a "request" (like a nerve signal). System B processes and sends a "response". Real-time data exchange without human intervention.

**FORMATTING RULES:**
- Each section: 2-3 sentences maximum
- Use **bold headers** with emojis
- NO long paragraphs
- Keep explanations concise and practical`,
    challengeDescription: "Clinical Scenario: Dr. Johnson orders Metformin 500mg for a diabetic patient. Within seconds, the EHR displays: 'Pharmacy confirms: 30-day supply available, no drug interactions detected, insurance approved.' Trace this API communication: What specific 'requests' did the EHR send, and what 'responses' did it receive from which systems?",
    codeEvaluationPromptPreamble: "The user should identify multiple API calls: EHR to pharmacy (medication availability), to drug interaction database (safety check), and to insurance system (coverage verification). Evaluate their understanding of multi-system API communication.",
    placeholder: "The EHR sent requests to: 1) Pharmacy system asking... 2) Drug database checking... 3) Insurance system verifying...",
    estimatedTimeMinutes: 15,
    points: 15,
  },
  {
    id: 'med_database',
    title: 'Medical Records Architecture',
    emoji: '📋',
    blockType: 'Database',
    introductionPrompt: `Explain databases using medical records analogy. Structure in SHORT sections:

**📋 Database - Medical Records System**
- Organized storage and retrieval of patient information
- Like a digital filing cabinet with instant search
- Structured data with relationships (patient → visits → diagnoses)

**🔍 Key Features**
- Query capability (find all diabetic patients)
- Data integrity (no duplicate records)
- Access controls (HIPAA compliance)

**🏥 Clinical Applications**
- Patient demographics and history
- Lab results and trends
- Medication lists and allergies

Keep explanations focused on healthcare use cases.`,
    challengeDescription: "Database Query Challenge: A quality improvement team needs to identify all patients with Type 2 Diabetes who had HbA1c > 8.0 in the last 6 months for a care management program. Describe how the database would process this request and what tables/relationships it would need to search.",
    codeEvaluationPromptPreamble: "The user should identify key database concepts: querying patient table, joining with lab results, filtering by date ranges and values. Evaluate their understanding of relational data structure in healthcare context.",
    placeholder: "The database would search: 1) Patient table for... 2) Lab results table for... 3) Join these tables where...",
    estimatedTimeMinutes: 12,
    points: 12,
  },
  {
    id: 'med_security',
    title: 'Healthcare Data Protection',
    emoji: '🛡️',
    blockType: 'Firewall',
    introductionPrompt: `Explain cybersecurity using immune system analogy. Structure in SHORT sections:

**🛡️ Firewall - Immune System**
- First line of defense against cyber threats
- Like white blood cells identifying and blocking pathogens
- Monitors all incoming and outgoing data traffic

**🏥 Healthcare Security Layers**
- Network firewalls (perimeter defense)
- Access controls (authentication/authorization)
- Encryption (data protection in transit/rest)

**⚠️ HIPAA Compliance**
- Patient data requires special protection
- Audit trails for all access
- Breach notification requirements

Focus on practical healthcare security implications.`,
    challengeDescription: "Security Incident Response: A physician receives an email claiming to be from 'IT Support' asking for login credentials to 'update the EHR system.' The email looks legitimate but has subtle red flags. As a healthcare professional, what security principles should guide your response, and what systems protect against such threats?",
    codeEvaluationPromptPreamble: "The user should identify phishing attempt, mention multi-factor authentication, firewall protection, and proper incident reporting procedures. Evaluate their understanding of healthcare cybersecurity best practices.",
    placeholder: "This appears to be a phishing attempt because... The security measures that protect us include... I should respond by...",
    estimatedTimeMinutes: 10,
    points: 10,
  },
];

// 3. SWE Learning Path (For General Adult Beginners)
export const SWE_LEARNING_PATH: LearningStep[] = [
   {
    id: 'swe_welcome',
    title: 'How Software is Built',
    emoji: '🏗️',
    blockType: 'Intro to SWE Concepts',
    introductionPrompt: `You are a helpful and clear guide for an intelligent adult who is new to software concepts.

**CRITICAL: Structure your response EXACTLY like this:**

**🏗️ Welcome to Software Architecture**
Understanding software architecture is like understanding the blueprint of a building, even if you don't lay the bricks yourself.

**🎯 What We'll Cover**
This track focuses on the "what" and "why" of technology, not the "how" of coding syntax.

**🌍 Learning Approach**
We'll use real-world analogies (like city planning or running a business) to make concepts clear.

**FORMATTING RULES:**
- Each section: 2-3 sentences maximum
- Use **bold headers** with emojis
- NO long paragraphs
- End with: "Let's get started by looking at the foundational blueprint of any computer system."`,
    challengeDescription: "To start, think about your favorite app or website. What do you think are the main 'parts' that make it work? (e.g., user login, showing pictures, etc.). There's no wrong answer!",
    codeEvaluationPromptPreamble: "The user has shared their thoughts on how an app works. Acknowledge their intuition and tell them it's a great starting point for thinking about architecture. Say something like 'That's a perfect way to start thinking about components. Now, let's look at the official blueprints.'",
    placeholder: "I think Instagram's main parts are...",
    estimatedTimeMinutes: 5,
    points: 5,
  },
  {
    id: 'swe_cpu_ram',
    title: 'System Architecture',
    emoji: '🏭',
    blockType: 'CPU & RAM',
    introductionPrompt: "Explain 'CPU' and 'RAM'. Use their general analogies from the map. Describe the CPU as the 'power plant' for the city, and RAM as the 'workbench' for current jobs. Contrast RAM with a Hard Drive ('the library').",
    challengeDescription: "If a graphic designer's computer slows down when they have many large design files open at once, which component is the likely bottleneck: the 'power plant' (CPU) or the 'workbench' (RAM)? Explain your reasoning.",
    codeEvaluationPromptPreamble: "The user is diagnosing a slow computer. The correct answer is RAM ('workbench') because it holds all the actively used files. Evaluate their reasoning.",
    placeholder: "The bottleneck is probably the... because...",
    estimatedTimeMinutes: 10,
    points: 10,
  },
  {
    id: 'swe_api',
    title: 'How Systems Talk',
    emoji: '📋',
    blockType: 'API',
    introductionPrompt: "Explain 'API'. Use the 'restaurant menu' analogy. You, the customer, don't need to know the kitchen's secrets; you just need the menu (the API) to make a request. The waiter handles the rest. This is how different software components interact without exposing their internal complexity.",
    challengeDescription: "When you use a weather app on your phone, it shows you data from a national weather service. How does the 'restaurant menu' (API) analogy apply here? What 'order' is your app placing?",
    codeEvaluationPromptPreamble: "The user should apply the API analogy. The phone app (customer) uses the weather service's API (menu) to place an order ('What's the weather for New York?'). The service returns the data. Evaluate their explanation.",
    placeholder: "The app places an 'order' for...",
    estimatedTimeMinutes: 10,
    points: 10,
  },
];


// --- Unified Badge Configuration ---
export const BADGES_CONFIG: Badge[] = [
  // Generic Badges
  {
    id: 'welcome_aboard',
    name: 'Journey Started',
    description: 'You\'ve taken the first step on your learning path!',
    iconName: 'SparklesIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id.includes('welcome'),
  },

  // Coding Path Badges
  {
    id: 'boxer',
    name: 'Boxer',
    description: 'Mastered the art of storing information in variables.',
    iconName: 'BrainIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'variables',
  },
  {
    id: 'decision_maker',
    name: 'Decision Maker',
    description: 'Understood how to control the flow of a program with conditionals.',
    iconName: 'MedalIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id === 'conditionals',
  },
  
  // MedTech / SWE Path Badges
  {
    id: 'systems_anatomist',
    name: 'Systems Anatomist',
    description: 'Mastered the core hardware components of a system.',
    iconName: 'BrainIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id.includes('_cpu_ram'),
  },
  {
    id: 'network_navigator',
    name: 'Network Navigator',
    description: 'Understood how systems communicate via APIs.',
    iconName: 'MedalIcon',
    condition: (_, _currentIndex, completedStep) => completedStep.id.includes('_api'),
  },

  // Completion Badges
  {
    id: 'path_complete',
    name: 'Path Complete!',
    description: 'You have completed all available concepts in this track!',
    iconName: 'TrophyIcon',
    condition: (path, currentIndex) => currentIndex === path.length - 1,
  },
];
