import React from 'react';
import { LogoIcon, CogIcon, MapIcon } from './icons';
import type { UserPersona } from '../types';

interface HeaderProps {
  onOpenCourseOutline: () => void;
  onOpenSettings: () => void;
  persona: UserPersona | null;
  userName: string;
  totalPoints: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCourseOutline,
  onOpenSettings,
  persona: _persona,
  userName,
  totalPoints
}) => {
  return (
    <header className="w-full max-w-4xl flex items-center justify-between mb-8 bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <LogoIcon className="w-8 h-8 text-[rgb(var(--color-icon-logo-rgb))]" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-header-gradient-from-rgb))] via-[rgb(var(--color-header-gradient-via-rgb))] to-[rgb(var(--color-header-gradient-to-rgb))] bg-clip-text text-transparent">
          Codey
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">Welcome, {userName}</p>
          <p className="text-lg font-semibold text-[rgb(var(--color-text-accent-rgb))]">{totalPoints} Points</p>
        </div>
        
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
    </header>
  );
};
