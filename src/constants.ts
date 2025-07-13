import type { LearningStep, Badge } from './types';
// import * as Icons from './components/icons'; // Used for badge iconName type safety

// --- Analogy Maps ---

// 1. For Healthcare Professionals
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

// 2. For General Adult Beginners (Software Engineering Concepts)
export const sweAnalogyMap: Record<string, string> = {
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
Your goal is to bridge the gap between medicine and technology, emphasizing why this knowledge is crucial in modern healthcare.
1.  Acknowledge their background: Start by welcoming them and stating that their clinical expertise is the perfect foundation for understanding these concepts.
2.  Introduce the "Why": Explain that technology is deeply integrated into medicine, from EHRs to diagnostic imaging. Understanding the principles behind these tools can enhance their use and improve communication with IT staff.
3.  Explain the Analogy-Based Approach: State that this course uses medical analogies to make technical topics intuitive. For example, "We'll see how a computer's CPU is like the 'heart' of the system."
4.  End with Encouragement: Reassure them that the goal is conceptual understanding, not becoming a coder. End with an encouraging message like, "Let's begin our first consultation."`,
    challengeDescription: "To begin, what is one piece of technology you use in your daily practice that you'd like to understand better? (e.g., EHR, PACs, Telehealth platform).",
    codeEvaluationPromptPreamble: "The user, a medical professional, has shared a piece of technology they use. Acknowledge their input warmly and express excitement for the journey. Say something like: 'Excellent. That's a perfect example of the systems we'll be demystifying. Let's pull up the first chart.'",
    placeholder: "e.g., Our hospital's EHR system",
    estimatedTimeMinutes: 5,
    points: 5,
  },
  {
    id: 'med_cpu_ram',
    title: 'System Anatomy',
    emoji: '🫀',
    blockType: 'CPU & RAM',
    introductionPrompt: "Explain the concepts of 'CPU' and 'RAM' using their medical analogies from the map. Describe the CPU as the 'heart' and RAM as the 'short-term memory'. Contrast RAM with a Hard Drive ('long-term memory').",
    challengeDescription: "Based on the analogies, if a hospital's computer is slow while actively looking up multiple patient records for a complex case, which component is the likely bottleneck: the 'heart' (CPU) or the 'short-term memory' (RAM)? Explain why.",
    codeEvaluationPromptPreamble: "The user is diagnosing a slow system. The correct answer is RAM ('short-term memory') because it's responsible for holding active information. Evaluate their reasoning.",
    placeholder: "The bottleneck is likely the... because...",
    estimatedTimeMinutes: 10,
    points: 10,
  },
  {
    id: 'med_api',
    title: 'System Communication',
    emoji: '🧠',
    blockType: 'API',
    introductionPrompt: "Explain the concept of an 'API' using its analogy. Describe it as the 'nervous system for applications,' allowing different systems (like the EHR and the pharmacy's inventory system) to communicate.",
    challengeDescription: "A doctor orders a prescription from the EHR. The system immediately confirms if the medication is in stock at the pharmacy. Describe the role of the 'API' in this interaction. What 'message' does the EHR send?",
    codeEvaluationPromptPreamble: "The user is explaining the role of an API. They should describe a 'request' from the EHR (e.g., 'Do you have Medication X?') and a 'response' from the pharmacy system via the API (e.g., 'Yes, 50 units available').",
    placeholder: "The EHR sends a request to...",
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
1. Welcome them and explain that understanding software architecture is like understanding the blueprint of a building, even if you don't lay the bricks yourself.
2. Explain this track focuses on the "what" and "why" of technology, not the "how" of coding syntax.
3. State that you'll use real-world analogies (like city planning or running a business) to make concepts clear.
4. End with an encouraging start: "Let's get started by looking at the foundational blueprint of any computer system."`,
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
