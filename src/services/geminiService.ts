import type { UserPersona, CourseMode, GameProgress, LearningStep } from "../types";
import { ANALOGY_THEMES } from '../constants';

const generateSystemInstruction = (
  baseInstructionType: 'explanation' | 'evaluation',
  persona: UserPersona,
  courseMode: CourseMode,
  blockType?: string,
  profession?: string,
  analogyTheme?: string
): string => {

  // Determine which analogy map to use
  let analogyMap: Record<string, string>;
  if (analogyTheme && ANALOGY_THEMES[analogyTheme as keyof typeof ANALOGY_THEMES]) {
    analogyMap = ANALOGY_THEMES[analogyTheme as keyof typeof ANALOGY_THEMES].map;
  } else {
    // Default fallback based on persona
    analogyMap = persona === 'doctor' ? ANALOGY_THEMES.medical.map : ANALOGY_THEMES.city.map;
  }

  const conceptKey = blockType || '';
  const analogy = analogyMap[conceptKey] || 'a relevant real-world analogy';

  // Base persona instructions
  let instruction = '';
  switch (persona) {
    case 'kid':
      instruction = `You are a fun, friendly, and super encouraging AI robot friend. Your goal is to make coding concepts easy and exciting for a child. Use simple words, lots of positive emojis (like 🤖, 🎉, 🌟), and playful analogies. Keep your explanations to 1-2 short, simple paragraphs.`;
      break;
    case 'doctor':
      instruction = `You are a world-class Medical Technology Specialist and educator. Your audience is a medical doctor. Your tone is professional, respectful, and insightful, like a peer from a different specialty. You MUST use specific medical analogies to explain complex technical concepts.`;
      break;
    case 'adult':
       if (courseMode === 'swe') {
         instruction = `You are a clear, intelligent, and helpful guide for an adult learning software engineering principles. Your tone is that of a knowledgeable mentor. You use concise, effective real-world analogies (like business, construction, or city planning) to make abstract concepts tangible.`;
       } else { // adult doing coding path
         instruction = `You are an encouraging and clear AI coding coach for an adult beginner. Avoid overly playful language, but maintain a positive and supportive tone. Use simple, everyday analogies to explain programming concepts.`;
       }
      break;
  }

  // Task-specific instructions
  if (courseMode === 'swe') {
    if (baseInstructionType === 'explanation') {
      instruction += `
Your task is to explain the technical concept of "${conceptKey}".
You MUST use and elaborate on the following specific analogy: "${conceptKey} is like ${analogy}".
Explain the concept clearly and concisely. Bridge the technical function to the real-world analogue.`;
       if (persona === 'doctor' && profession) {
        instruction += ` The user's medical specialty is "${profession}". If natural, you can tailor an example (e.g., for a cardiologist, an API could connect an EKG to the EHR).`;
      }
    } else { // evaluation
      instruction += `
Your role is to evaluate the user's understanding of a technical concept, which they explained using the analogy: "${conceptKey} is like ${analogy}".
1.  **Acknowledge their attempt:** Start with positive reinforcement (e.g., "That's an excellent correlation," or "A very insightful way to put it.").
2.  **Validate Correctness:** If their application of the analogy is correct, confirm it and briefly reinforce the key takeaway.
3.  **Gently Correct:** If they are slightly off, gently guide them. Do not say "you are wrong." Instead, say something like, "That's close. To be more precise, the analogy fits best when we consider..." Then, clarify the connection.
4.  **Maintain the appropriate tone for the persona.**`;
    }
  } else {
     if (baseInstructionType === 'explanation') {
      instruction += `\nYour task is to explain the programming concept of "${conceptKey}". Stick to the core idea and avoid technical jargon.`;
    } else { // evaluation
      instruction += `
Your role is to evaluate the user's code or answer.
1.  **Be Positive:** Always start with encouragement.
2.  **Check for Correctness:** See if their answer correctly applies the concept of "${conceptKey}".
3.  **Give Simple Feedback:** If it's correct, say so and cheer them on! If it's incorrect, give a very simple, gentle hint to help them fix it. Don't give them the answer directly.`;
    }
  }
  
  return instruction;
};

// Generic function to call our secure backend
const callGeminiBackend = async (prompt: string, systemInstruction: string): Promise<string> => {
    // This path '/api/gemini' is automatically handled by Netlify during deployment
    // and proxied by Vite during local development.
    const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, systemInstruction }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "An unknown error occurred on the server." }));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.text;
};

export const explainConcept = async (
  progress: GameProgress,
  conceptPrompt: string,
  blockType?: string,
): Promise<string> => {
  if (!progress.userPersona || !progress.courseMode) return "User profile not set up correctly.";

  const systemInstruction = generateSystemInstruction(
    'explanation',
    progress.userPersona,
    progress.courseMode,
    blockType,
    progress.userProfession || undefined,
    progress.analogyTheme || undefined
  );
  return callGeminiBackend(conceptPrompt, systemInstruction);
};

export const evaluateCode = async (
  progress: GameProgress,
  currentStep: LearningStep,
  userCode: string,
): Promise<string> => {
  if (!progress.userPersona || !progress.courseMode) return "User profile not set up correctly.";

  const systemInstruction = generateSystemInstruction(
    'evaluation',
    progress.userPersona,
    progress.courseMode,
    currentStep.blockType,
    progress.userProfession || undefined,
    progress.analogyTheme || undefined
  );

  const fullPrompt = `${currentStep.codeEvaluationPromptPreamble} The user was given this challenge: '${currentStep.challengeDescription}'. They submitted the following: \`\`\`\n${userCode}\n\`\`\` Please review their submission based on your system instructions.`;

  return callGeminiBackend(fullPrompt, systemInstruction);
};
