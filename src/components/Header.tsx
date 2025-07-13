import React, { useState } from 'react';
import { LogoIcon, CogIcon, MapIcon, HomeIcon, Bars3Icon, XMarkIcon } from './icons';
import type { UserPersona } from '../types';

interface HeaderProps {
  onOpenCourseOutline: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
  persona: UserPersona | null;
  userName: string;
  totalPoints: number;
  currentStepTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCourseOutline,
  onOpenSettings,
  onGoHome,
  persona: _persona,
  userName,
  totalPoints,
  currentStepTitle
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full max-w-4xl mb-6 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg">
      {/* Main Header */}
      <div className="flex items-center justify-between p-4">
        {/* Logo and Title */}
        <button
          onClick={onGoHome}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          title="Go to Dashboard"
        >
          <LogoIcon className="w-8 h-8 text-[rgb(var(--color-icon-logo-rgb))]" />
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-header-gradient-from-rgb))] via-[rgb(var(--color-header-gradient-via-rgb))] to-[rgb(var(--color-header-gradient-to-rgb))] bg-clip-text text-transparent">
              Codey
            </h1>
            {currentStepTitle && (
              <p className="text-xs sm:text-sm text-[rgb(var(--color-text-secondary-rgb))] truncate max-w-[150px] sm:max-w-none">
                {currentStepTitle}
              </p>
            )}
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">Welcome, {userName}</p>
            <p className="text-lg font-semibold text-[rgb(var(--color-text-accent-rgb))]">{totalPoints} Points</p>
          </div>

          <button
            onClick={onGoHome}
            className="p-2 rounded-md bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] transition-colors"
            title="Dashboard"
          >
            <HomeIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCourseOutline}
            className="p-2 rounded-md bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white transition-colors"
            title="Course Outline"
          >
            <MapIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-md bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] transition-colors"
            title="Settings"
          >
            <CogIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-[rgb(var(--color-text-accent-rgb))]">{totalPoints}pts</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] transition-colors"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[rgb(var(--color-border-primary-rgb))] p-4 space-y-3">
          <div className="text-center pb-3 border-b border-[rgb(var(--color-border-primary-rgb))]">
            <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">Welcome, {userName}</p>
            <p className="text-lg font-semibold text-[rgb(var(--color-text-accent-rgb))]">{totalPoints} Points</p>
          </div>

          <button
            onClick={() => {
              onGoHome();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-4 py-3 bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] rounded-lg transition-colors"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Dashboard
          </button>

          <button
            onClick={() => {
              onOpenCourseOutline();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-4 py-3 bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white rounded-lg transition-colors"
          >
            <MapIcon className="w-5 h-5 mr-2" />
            Course Outline
          </button>

          <button
            onClick={() => {
              onOpenSettings();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-4 py-3 bg-[rgb(var(--color-bg-tertiary-rgb))] hover:bg-[rgb(var(--color-border-primary-rgb))] text-[rgb(var(--color-text-primary-rgb))] rounded-lg transition-colors"
          >
            <CogIcon className="w-5 h-5 mr-2" />
            Settings
          </button>
        </div>
      )}
    </header>
  );
};
