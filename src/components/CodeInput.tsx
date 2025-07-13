import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import type { UserPersona } from '../types';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
  persona: UserPersona | null;
}

export const CodeInput: React.FC<CodeInputProps> = ({ 
  code, 
  setCode, 
  onSubmit, 
  isLoading, 
  placeholder, 
  persona 
}) => {
  const buttonText = persona === 'kid' 
    ? "Check My Answer! 🚀" 
    : persona === 'doctor' 
    ? "Submit for Review" 
    : "Submit Answer";

  const inputPlaceholder = placeholder || (persona === 'kid' 
    ? "Type your awesome code here! 💻" 
    : persona === 'doctor' 
    ? "Enter your response..." 
    : "Enter your code or answer...");

  return (
    <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[rgb(var(--color-text-accent-rgb))] mb-4">
        {persona === 'kid' ? "Your Turn! 🎯" : persona === 'doctor' ? "Your Response" : "Your Answer"}
      </h3>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={inputPlaceholder}
        className="w-full h-32 p-4 bg-[rgb(var(--color-bg-secondary-rgb))] text-[rgb(var(--color-text-primary-rgb))] border border-[rgb(var(--color-border-primary-rgb))] rounded-md focus:border-[rgb(var(--color-accent-primary-rgb))] focus:outline-none resize-none font-mono text-sm"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !code}
        className="w-full flex items-center justify-center bg-[rgb(var(--color-accent-secondary-rgb))] hover:bg-[rgb(var(--color-accent-secondary-hover-rgb))] text-[rgb(var(--color-text-on-accent-rgb))] font-semibold py-2.5 px-4 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent-secondary-rgb))] focus:ring-opacity-75"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" />
            <span className="ml-2">Analyzing...</span>
          </>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};
