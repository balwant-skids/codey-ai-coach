import React from 'react';
import { XMarkIcon, LogoutIcon } from './icons';
import type { AnalogyTheme, GameProgress } from '../types';
import { ANALOGY_THEMES } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  progress: GameProgress | null;
  onUpdateProgress: (updates: Partial<GameProgress>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  progress,
  onUpdateProgress
}) => {
  if (!isOpen) return null;

  const handleAnalogyThemeChange = (theme: AnalogyTheme) => {
    if (progress) {
      onUpdateProgress({ analogyTheme: theme });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))]">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgb(var(--color-bg-tertiary-rgb))] rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-[rgb(var(--color-text-secondary-rgb))]" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Analogy Theme Selection */}
          <div>
            <h3 className="text-lg font-semibold text-[rgb(var(--color-text-primary-rgb))] mb-3">
              Learning Style
            </h3>
            <p className="text-[rgb(var(--color-text-secondary-rgb))] text-sm mb-4">
              Choose how you'd like technical concepts explained to you:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(ANALOGY_THEMES).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleAnalogyThemeChange(key as AnalogyTheme)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    progress?.analogyTheme === key
                      ? 'border-[rgb(var(--color-accent-primary-rgb))] bg-[rgb(var(--color-accent-primary-rgb))] bg-opacity-10'
                      : 'border-[rgb(var(--color-border-primary-rgb))] hover:border-[rgb(var(--color-accent-primary-rgb))] bg-[rgb(var(--color-bg-secondary-rgb))]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{theme.emoji}</span>
                    <div>
                      <div className="font-medium text-[rgb(var(--color-text-primary-rgb))]">
                        {theme.name}
                      </div>
                      <div className="text-xs text-[rgb(var(--color-text-secondary-rgb))]">
                        {theme.description.split(' - ')[0]}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sign Out */}
          <div className="pt-4 border-t border-[rgb(var(--color-border-primary-rgb))]">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-3 bg-[rgb(var(--color-accent-warning-rgb))] hover:bg-[rgb(var(--color-accent-warning-bg-rgb))] text-white rounded-lg transition-colors"
            >
              <LogoutIcon className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
