import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import type { UserPersona } from '../types';

interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  persona: UserPersona | null;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ 
  feedback, 
  isLoading, 
  persona 
}) => {
  const loadingText = persona === 'kid' 
    ? "Your AI coach is thinking! 🤔" 
    : persona === 'doctor' 
    ? "Analyzing your response..." 
    : "Analyzing feedback...";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4">
        <LoadingSpinner />
        <p className="mt-2 text-[rgb(var(--color-text-secondary-rgb))]">{loadingText}</p>
      </div>
    );
  }

  if (!feedback) {
    const placeholderText = persona === 'kid' 
      ? "Submit your answer to get feedback from your AI coach! 🤖" 
      : persona === 'doctor' 
      ? "Submit your response for professional review and insights." 
      : "Submit your answer to receive personalized feedback.";

    return (
      <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6 text-center">
        <p className="text-[rgb(var(--color-text-secondary-rgb))]">{placeholderText}</p>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6">
      <div className="prose prose-sm prose-invert max-w-none text-[rgb(var(--color-text-tertiary-rgb))]">
        {feedback.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
