export type UserPersona = 'kid' | 'adult' | 'doctor';
export type Theme = 'playful' | 'graceful';
export type CourseMode = 'coding' | 'swe'; // 'coding' for syntax, 'swe' for concepts
export type AnalogyTheme = 'medical' | 'city' | 'business' | 'kitchen' | 'sports' | 'nature';

// Represents a user authenticated via a third-party service
export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  createdAt?: string;
  updatedAt?: string;
  isAdmin?: boolean;
}

export interface LearningStep {
  id: string;
  title: string;
  emoji: string;
  blockType?: string; // The "Concept" name, e.g., 'API', 'CPU'
  introductionPrompt: string; // Base prompt
  challengeDescription: string;
  codeEvaluationPromptPreamble: string;
  placeholder?: string;
  estimatedTimeMinutes: number; // Estimated time in minutes to complete this step
  points: number; // Points awarded for completing this step
}

export interface Badge {
  id:string;
  name: string;
  description: string;
  iconName: keyof typeof import('./components/icons'); // References icon component names
  condition: (learningPath: LearningStep[], currentLevelIndex: number, completedStep: LearningStep, totalPoints: number, achievedBadgeIds: string[]) => boolean;
}

// Represents the structure of what's stored in localStorage/database
export interface GameProgress {
  // User profile info - set once
  userPersona: UserPersona | null;
  courseMode: CourseMode | null;
  userProfession: string | null; // e.g. "Cardiology" for doctors

  // Dynamic progress
  currentLevelIndex: number;
  totalPoints: number;
  achievedBadgeIds: string[];
  completedSteps: Record<string, boolean>; // Tracks completion of steps by ID

  // User-configurable settings
  theme: Theme;
  analogyTheme: AnalogyTheme | null; // User's preferred analogy style
}

// Data structure for the admin dashboard
export interface AdminAnalyticsData {
  totalUsers: number;
  avgPoints: number;
  personaDistribution: { persona: string; count: number }[];
  coursePopularity: { course: string; count: number }[];
  totalConceptsCompleted: number;
}
