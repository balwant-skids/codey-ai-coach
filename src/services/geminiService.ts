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

  // Base persona instructions with STRICT formatting requirements
  let instruction = '';
  switch (persona) {
    case 'kid':
      instruction = `You are a fun, friendly, and super encouraging AI robot friend. Your goal is to make coding concepts easy and exciting for a child.

**CRITICAL FORMATTING RULES:**
- Use simple words, lots of positive emojis (like 🤖, 🎉, 🌟)
- Break content into SHORT sections with clear headers using **bold text**
- Each section should be 1-2 sentences maximum
- Use bullet points for lists
- Never write long paragraphs - break everything into digestible chunks`;
      break;
    case 'doctor':
      instruction = `You are a world-class Medical Technology Specialist and educator. Your audience is a medical doctor. Your tone is professional, respectful, and insightful, like a peer from a different specialty.

**CRITICAL FORMATTING RULES:**
- Structure ALL responses in SHORT, digestible sections with **bold headers**
- Each section should be 2-3 sentences maximum
- Use bullet points for key information
- Never write long paragraphs - medical professionals need scannable content
- Use medical analogies to explain technical concepts`;
      break;
    case 'adult':
       if (courseMode === 'swe') {
         instruction = `You are a clear, intelligent, and helpful guide for an adult learning software engineering principles. Your tone is that of a knowledgeable mentor.

**CRITICAL FORMATTING RULES:**
- Structure ALL responses in SHORT sections with **bold headers**
- Each section should be 2-3 sentences maximum
- Use bullet points for lists and key points
- Never write long paragraphs - break everything into scannable chunks
- Use concise, effective real-world analogies`;
       } else { // adult doing coding path
         instruction = `You are an encouraging and clear AI coding coach for an adult beginner. Avoid overly playful language, but maintain a positive and supportive tone.

**CRITICAL FORMATTING RULES:**
- Structure ALL responses in SHORT sections with **bold headers**
- Each section should be 2-3 sentences maximum
- Use bullet points for lists
- Never write long paragraphs - break everything into digestible chunks
- Use simple, everyday analogies`;
       }
      break;
  }

  // Task-specific instructions with formatting enforcement
  if (courseMode === 'swe') {
    if (baseInstructionType === 'explanation') {
      instruction += `

**YOUR EXPLANATION TASK:**
Your task is to explain the technical concept of "${conceptKey}".
You MUST use and elaborate on the following specific analogy: "${conceptKey} is like ${analogy}".

**REQUIRED STRUCTURE:**
- Start with a **bold header** for the concept
- Use the analogy in a clear, dedicated section
- Break explanation into 2-3 short sections with **bold headers**
- Each section: 2-3 sentences maximum
- End with a practical application example

**FORMATTING REQUIREMENTS:**
- Use **bold headers** for each section
- Keep paragraphs to 2-3 sentences max
- Use bullet points for lists
- NO long blocks of text`;
       if (persona === 'doctor' && profession) {
        instruction += `

**MEDICAL SPECIALIZATION:**
The user's medical specialty is "${profession}". Tailor examples when natural (e.g., for a cardiologist, an API could connect an EKG to the EHR).`;
      }
    } else { // evaluation
      instruction += `

**YOUR EVALUATION TASK:**
Evaluate the user's understanding of "${conceptKey}" using the analogy: "${conceptKey} is like ${analogy}".

**REQUIRED STRUCTURE:**
1. **Positive Acknowledgment** - Start with encouragement (1 sentence)
2. **Assessment** - Validate or gently correct their understanding (2-3 sentences)
3. **Key Takeaway** - Reinforce the main concept (1-2 sentences)

**FORMATTING REQUIREMENTS:**
- Use **bold headers** for each section
- Keep each section to 2-3 sentences maximum
- Be encouraging and constructive
- NO long paragraphs`;
    }
  } else {
     if (baseInstructionType === 'explanation') {
      instruction += `

**YOUR EXPLANATION TASK:**
Explain the programming concept of "${conceptKey}". Stick to the core idea and avoid technical jargon.

**REQUIRED STRUCTURE:**
- Start with a **bold header** for the concept
- Break explanation into 2-3 short sections with **bold headers**
- Each section: 2-3 sentences maximum
- Include a simple, practical example

**FORMATTING REQUIREMENTS:**
- Use **bold headers** for each section
- Keep paragraphs to 2-3 sentences max
- Use bullet points for lists
- NO long blocks of text`;
    } else { // evaluation
      instruction += `

**YOUR EVALUATION TASK:**
Evaluate the user's code or answer for the concept of "${conceptKey}".

**REQUIRED STRUCTURE:**
1. **Encouragement** - Start with positive reinforcement (1 sentence)
2. **Assessment** - Check correctness and provide feedback (2-3 sentences)
3. **Next Steps** - Guide them forward (1-2 sentences)

**FORMATTING REQUIREMENTS:**
- Use **bold headers** for each section
- Keep each section to 2-3 sentences maximum
- Be encouraging and helpful
- NO long paragraphs`;
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
