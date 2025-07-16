import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, GoogleIcon } from './icons';
import type { UserPersona, CourseMode, AuthUser, AnalogyTheme } from '../types';
import { authService } from '../services/authService';
import { LoadingSpinner } from './LoadingSpinner';
import { ANALOGY_THEMES } from '../constants';

interface WelcomeModalProps {
  onOnboardingComplete: (persona: UserPersona, courseMode: CourseMode, profession?: string, analogyTheme?: string) => void;
  authUser?: AuthUser | null;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onOnboardingComplete }) => {
  const [step, setStep] = useState<'login' | 'persona' | 'course' | 'profession' | 'analogy'>('login');
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseMode | null>(null);
  const [profession, setProfession] = useState('');
  const [selectedAnalogyTheme, setSelectedAnalogyTheme] = useState<AnalogyTheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await authService.signInWithGoogle();
      setStep('persona');
    } catch (error) {
      console.error('Login failed:', error);
      
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unknown error occurred during sign in.');
      }

      setStep('login');

    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaSelect = (persona: UserPersona) => {
    setSelectedPersona(persona);
    if (persona === 'doctor') {
      setSelectedCourse('swe'); // Doctors get MedTech concepts
      setStep('profession');
    } else {
      setStep('course');
    }
  };

  const handleCourseSelect = (course: CourseMode) => {
    setSelectedCourse(course);
    setStep('analogy');
  };

  const handleProfessionSubmit = () => {
    if (profession.trim()) {
      setStep('analogy');
    }
  };

  const handleAnalogySelect = (theme: AnalogyTheme) => {
    setSelectedAnalogyTheme(theme);
    handleComplete();
  };

  const handleComplete = () => {
    if (selectedPersona && selectedCourse) {
      onOnboardingComplete(selectedPersona, selectedCourse, profession || undefined, selectedAnalogyTheme || undefined);
    }
  };

  const commonButtonClass = "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75";

  if (step === 'login') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-4">Welcome to Your AI Coach!</h2>
          <p className="text-[rgb(var(--color-text-tertiary-rgb))] text-sm mb-8">
            Begin your personalized learning journey by signing in.
          </p>
          <button onClick={handleLogin} disabled={isLoading} className={`${commonButtonClass} bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400 flex items-center justify-center`}>
            {isLoading ? <LoadingSpinner size="sm" /> : <GoogleIcon className="w-6 h-6 mr-3" />}
            {isLoading ? 'Signing In...' : 'Sign in with Google'}
          </button>
          {loginError && (
            <p className="text-xs text-[rgb(var(--color-text-secondary-rgb))] mt-4 text-red-500">
              {loginError}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (step === 'persona') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-6 text-center">Who are you?</h2>
          <div className="space-y-4">
            <button
              onClick={() => handlePersonaSelect('kid')}
              className={`${commonButtonClass} bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white focus:ring-[rgb(var(--color-accent-primary-rgb))] flex items-center`}
            >
              <UserIcon className="w-6 h-6 mr-3" />
              I'm a kid learning to code! 🎮
            </button>
            <button
              onClick={() => handlePersonaSelect('adult')}
              className={`${commonButtonClass} bg-[rgb(var(--color-accent-secondary-rgb))] hover:bg-[rgb(var(--color-accent-secondary-hover-rgb))] text-white focus:ring-[rgb(var(--color-accent-secondary-rgb))] flex items-center`}
            >
              <UserIcon className="w-6 h-6 mr-3" />
              I'm an adult beginner
            </button>
            <button
              onClick={() => handlePersonaSelect('doctor')}
              className={`${commonButtonClass} bg-[rgb(var(--color-accent-tertiary-rgb))] hover:bg-[rgb(var(--color-accent-warning-rgb))] text-white focus:ring-[rgb(var(--color-accent-tertiary-rgb))] flex items-center`}
            >
              <BriefcaseIcon className="w-6 h-6 mr-3" />
              I'm a medical professional 🏥
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'course') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-6 text-center">What would you like to learn?</h2>
          <div className="space-y-4">
            <button
              onClick={() => handleCourseSelect('coding')}
              className={`${commonButtonClass} bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white focus:ring-[rgb(var(--color-accent-primary-rgb))]`}
            >
              Coding Fundamentals 💻
            </button>
            <button
              onClick={() => handleCourseSelect('swe')}
              className={`${commonButtonClass} bg-[rgb(var(--color-accent-secondary-rgb))] hover:bg-[rgb(var(--color-accent-secondary-hover-rgb))] text-white focus:ring-[rgb(var(--color-accent-secondary-rgb))]`}
            >
              Software Engineering Concepts 🏗️
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'profession') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-6 text-center">What's your specialty?</h2>
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g., Cardiology, Emergency Medicine, etc."
            className="w-full p-3 rounded-lg bg-[rgb(var(--color-bg-tertiary-rgb))] text-[rgb(var(--color-text-primary-rgb))] border border-[rgb(var(--color-border-primary-rgb))] focus:border-[rgb(var(--color-accent-primary-rgb))] focus:outline-none mb-4"
          />
          <button
            onClick={handleProfessionSubmit}
            disabled={!profession.trim()}
            className={`${commonButtonClass} bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white focus:ring-[rgb(var(--color-accent-primary-rgb))] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Start Learning! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (step === 'analogy') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-4 text-center">Choose Your Learning Style</h2>
          <p className="text-[rgb(var(--color-text-secondary-rgb))] text-center mb-6">
            Pick the analogy theme that resonates with you. We'll use these examples to explain technical concepts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ANALOGY_THEMES).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleAnalogySelect(key as AnalogyTheme)}
                className={`${commonButtonClass} bg-[rgb(var(--color-bg-secondary-rgb))] hover:bg-[rgb(var(--color-bg-tertiary-rgb))] text-[rgb(var(--color-text-primary-rgb))] border border-[rgb(var(--color-border-primary-rgb))] hover:border-[rgb(var(--color-accent-primary-rgb))] focus:ring-[rgb(var(--color-accent-primary-rgb))] text-left p-4`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{theme.emoji}</span>
                  <div>
                    <div className="font-semibold text-[rgb(var(--color-text-accent-rgb))] mb-1">
                      {theme.name}
                    </div>
                    <div className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">
                      {theme.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => handleAnalogySelect('city')}
              className="text-[rgb(var(--color-text-secondary-rgb))] hover:text-[rgb(var(--color-text-accent-rgb))] underline"
            >
              Skip - Use default analogies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
