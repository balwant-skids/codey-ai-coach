import React from 'react';
import { PlayCircleIcon, MapIcon, TrophyIcon, StarIcon } from './icons';
import type { GameProgress, LearningStep, UserPersona } from '../types';
import { ANALOGY_THEMES } from '../constants';

interface DashboardProps {
  progress: GameProgress;
  learningPath: LearningStep[];
  onStartLearning: () => void;
  onOpenCourseOutline: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  learningPath,
  onStartLearning,
  onOpenCourseOutline
}) => {
  const currentStep = learningPath[progress.currentLevelIndex];
  const completedSteps = Object.keys(progress.completedSteps).length;
  const totalSteps = learningPath.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  const getPersonaTitle = (persona: UserPersona) => {
    switch (persona) {
      case 'kid': return 'Young Coder';
      case 'doctor': return 'Medical Professional';
      case 'adult': return 'Learner';
      default: return 'Learner';
    }
  };

  const getCourseTitle = (persona: UserPersona, courseMode: string) => {
    if (persona === 'doctor') return 'MedTech Concepts';
    if (courseMode === 'swe') return 'Software Engineering';
    return 'Coding Fundamentals';
  };

  const analogyTheme = progress.analogyTheme ? ANALOGY_THEMES[progress.analogyTheme] : null;

  return (
    <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6 sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-[rgb(var(--color-text-secondary-rgb))] mb-4">
            {getPersonaTitle(progress.userPersona!)} • {getCourseTitle(progress.userPersona!, progress.courseMode!)}
          </p>
          
          {analogyTheme && (
            <div className="inline-flex items-center bg-[rgb(var(--color-bg-secondary-rgb))] rounded-full px-4 py-2 text-sm">
              <span className="mr-2">{analogyTheme.emoji}</span>
              <span className="text-[rgb(var(--color-text-primary-rgb))]">
                Learning with {analogyTheme.name} analogies
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4 sm:p-6 text-center">
          <TrophyIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[rgb(var(--color-accent-primary-rgb))] mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))]">
            {progress.totalPoints}
          </div>
          <div className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">Total Points</div>
        </div>

        <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4 sm:p-6 text-center">
          <StarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[rgb(var(--color-accent-secondary-rgb))] mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))]">
            {completedSteps}/{totalSteps}
          </div>
          <div className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">Steps Completed</div>
        </div>

        <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4 sm:p-6 text-center">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(var(--color-bg-secondary-rgb))"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(var(--color-accent-primary-rgb))"
                strokeWidth="3"
                strokeDasharray={`${progressPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm sm:text-base font-bold text-[rgb(var(--color-text-accent-rgb))]">
                {progressPercentage}%
              </span>
            </div>
          </div>
          <div className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">Progress</div>
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[rgb(var(--color-text-primary-rgb))] mb-4">
          Continue Learning
        </h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{currentStep.emoji}</span>
              <div>
                <h3 className="text-lg font-semibold text-[rgb(var(--color-text-accent-rgb))]">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">
                  Step {progress.currentLevelIndex + 1} of {totalSteps}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-[rgb(var(--color-bg-secondary-rgb))] rounded-full h-2 mb-3">
              <div 
                className="bg-[rgb(var(--color-accent-primary-rgb))] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((progress.currentLevelIndex) / totalSteps) * 100}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">
              Estimated time: {currentStep.estimatedTimeMinutes} minutes
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenCourseOutline}
              className="flex items-center justify-center px-4 py-3 bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] rounded-lg transition-colors"
            >
              <MapIcon className="w-5 h-5 mr-2" />
              View All Steps
            </button>
            
            <button
              onClick={onStartLearning}
              className="flex items-center justify-center px-6 py-3 bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white rounded-lg transition-colors font-semibold"
            >
              <PlayCircleIcon className="w-5 h-5 mr-2" />
              Continue Learning
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {progress.achievedBadgeIds.length > 0 && (
        <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[rgb(var(--color-text-primary-rgb))] mb-3">
            Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {progress.achievedBadgeIds.map((badgeId, index) => (
              <div
                key={badgeId}
                className="inline-flex items-center bg-[rgb(var(--color-accent-primary-rgb))] bg-opacity-20 text-[rgb(var(--color-accent-primary-rgb))] px-3 py-1 rounded-full text-sm"
              >
                <TrophyIcon className="w-4 h-4 mr-1" />
                Badge {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
