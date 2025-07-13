import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';
import type { UserPersona } from '../types';

interface LevelNavigatorProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isNextDisabled: boolean;
  persona: UserPersona | null;
}

export const LevelNavigator: React.FC<LevelNavigatorProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  isNextDisabled,
  persona
}) => {
  const previousText = persona === 'kid' ? "Go Back" : "Previous";
  const nextText = persona === 'kid' ? "Next Adventure!" : "Next";
  const disabledMessage = persona === 'kid' 
    ? "Complete this challenge first! 🌟" 
    : persona === 'doctor' 
    ? "Complete current assessment to proceed" 
    : "Complete this step to continue";

  return (
    <div className="w-full max-w-4xl mt-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center px-6 py-3 bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          {previousText}
        </button>

        <div className="text-center">
          {isNextDisabled && canGoNext && (
            <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))] mb-2">
              {disabledMessage}
            </p>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext || isNextDisabled}
          className="flex items-center px-6 py-3 bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextText}
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};
