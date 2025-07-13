import React from 'react';
import { XMarkIcon, LogoutIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onLogout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[rgb(var(--color-bg-primary-rgb))] rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-text-accent-rgb))]">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgb(var(--color-bg-tertiary-rgb))] rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-[rgb(var(--color-text-secondary-rgb))]" />
          </button>
        </div>
        
        <div className="space-y-4">
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
  );
};
