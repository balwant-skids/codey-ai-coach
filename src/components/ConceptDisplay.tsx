import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { WelcomeAnimation } from '../WelcomeAnimation';
import type { UserPersona } from '../types';

interface ConceptDisplayProps {
  explanation: string;
  isLoading: boolean;
  icon: React.ReactNode;
  isWelcomeStep: boolean;
  persona: UserPersona | null;
}

export const ConceptDisplay: React.FC<ConceptDisplayProps> = ({ 
  explanation, 
  isLoading, 
  icon, 
  isWelcomeStep, 
  persona 
}) => {
  const loadingText = persona === 'kid' 
    ? "Loading your awesome lesson! 🤖" 
    : persona === 'doctor' 
    ? "Preparing your technical briefing..." 
    : "Loading concept explanation...";

  const exploreText = persona === 'kid' 
    ? "Let's Explore!" 
    : persona === 'doctor' 
    ? "Technical Overview" 
    : "Concept Overview";

  const refreshText = persona === 'kid' 
    ? "Getting fresh ideas! 🌟" 
    : persona === 'doctor' 
    ? "Updating technical content..." 
    : "Refreshing explanation...";

  if (isLoading && !explanation) { 
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4">
        <LoadingSpinner />
        <p className="mt-2 text-[rgb(var(--color-text-secondary-rgb))]">{loadingText}</p>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6">
      <div className="flex items-center text-lg font-semibold text-[rgb(var(--color-icon-lightbulb-rgb))] mb-4">
        <span className="flex-shrink-0 mr-2">{icon}</span>
        <h3>{exploreText}</h3>
      </div>
      {isLoading && explanation && ( 
         <div className="flex items-center text-sm text-[rgb(var(--color-text-secondary-rgb))] mb-2">
           <LoadingSpinner size="sm" />
           <p className="ml-2">{refreshText}</p>
         </div>
      )}
      <div className="prose prose-sm prose-invert max-w-none text-[rgb(var(--color-text-tertiary-rgb))]">
        {isWelcomeStep && persona === 'kid' && <WelcomeAnimation />}
        {explanation.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
