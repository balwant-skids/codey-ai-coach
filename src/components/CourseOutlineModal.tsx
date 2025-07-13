import React from 'react';
import { XMarkIcon } from './icons';
import type { LearningStep, UserPersona, Theme } from '../types';

interface CourseOutlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  learningPath: LearningStep[];
  currentLevelIndex: number;
  onNavigateToLevel: (index: number) => void;
  persona: UserPersona;
  theme: Theme;
  achievedBadgeIds: string[];
  totalPoints: number;
}

export const CourseOutlineModal: React.FC<CourseOutlineModalProps> = ({
  isOpen,
  onClose,
  learningPath,
  currentLevelIndex,
  onNavigateToLevel,
  persona: _persona,
  theme: _theme,
  achievedBadgeIds: _achievedBadgeIds,
  totalPoints: _totalPoints
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))]">Course Outline</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgb(var(--color-bg-tertiary-rgb))] rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-[rgb(var(--color-text-secondary-rgb))]" />
          </button>
        </div>
        
        <div className="space-y-3">
          {learningPath.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                index === currentLevelIndex
                  ? 'bg-[rgb(var(--color-accent-primary-rgb))] border-[rgb(var(--color-accent-primary-rgb))] text-white'
                  : 'bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] border-[rgb(var(--color-border-primary-rgb))] hover:bg-[rgb(var(--color-bg-tertiary-rgb))]'
              }`}
              onClick={() => onNavigateToLevel(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{step.emoji}</span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm opacity-75">{step.estimatedTimeMinutes} min • {step.points} points</p>
                  </div>
                </div>
                {index === currentLevelIndex && (
                  <span className="text-sm font-medium">Current</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
