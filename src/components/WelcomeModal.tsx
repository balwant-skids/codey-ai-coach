import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, GoogleIcon } from './icons';
import type { UserPersona, CourseMode, AuthUser } from '../types';
import { authService } from '../services/authService';
import { LoadingSpinner } from './LoadingSpinner';

interface WelcomeModalProps {
  onOnboardingComplete: (persona: UserPersona, courseMode: CourseMode, profession?: string) => void;
  authUser: AuthUser | null;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onOnboardingComplete, authUser }) => {
  const [step, setStep] = useState<'login' | 'persona' | 'course' | 'profession'>('login');
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseMode | null>(null);
  const [profession, setProfession] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithGoogle();
      setStep('persona');
    } catch (error) {
      console.error('Login failed:', error);
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
    handleComplete();
  };

  const handleProfessionSubmit = () => {
    if (profession.trim()) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (selectedPersona && selectedCourse) {
      onOnboardingComplete(selectedPersona, selectedCourse, profession || undefined);
    }
  };

  const commonButtonClass = "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75";

  if (!authUser && step === 'login') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-accent-rgb))] mb-4">Welcome to Your AI Coach!</h2>
          <p className="text-[rgb(var(--color-text-tertiary-rgb))] mb-8">
            Begin your personalized learning journey by signing in.
          </p>
          <button onClick={handleLogin} disabled={isLoading} className={`${commonButtonClass} bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400 flex items-center justify-center`}>
            {isLoading ? <LoadingSpinner size="sm" /> : <GoogleIcon className="w-6 h-6 mr-3" />}
            {isLoading ? 'Signing In...' : 'Sign in with Google'}
          </button>
           <p className="text-xs text-[rgb(var(--color-text-secondary-rgb))] mt-4">
            Click to sign in with your Google account.
          </p>
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

  return null;
};
