import React, { useState, useEffect } from 'react';
import type { AdminAnalyticsData } from '../types';
import { dbService } from '../services/dbService';
import { LoadingSpinner } from './LoadingSpinner';
import * as Icons from './icons';

interface AdminDashboardProps {
  onExit: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] p-4 rounded-lg flex items-center">
    <div className="p-3 rounded-full bg-[rgba(var(--color-accent-primary-rgb),0.2)] mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-[rgb(var(--color-text-secondary-rgb))]">{title}</p>
      <p className="text-2xl font-bold text-[rgb(var(--color-text-primary-rgb))]">{value}</p>
    </div>
  </div>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const analyticsData = await dbService.getAdminAnalytics();
      setData(analyticsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--color-bg-secondary-rgb))]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[rgb(var(--color-text-secondary-rgb))]">Loading Admin Analytics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-gradient-from-rgb))] to-[rgb(var(--color-bg-gradient-to-rgb))] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Icons.LogoIcon className="w-8 h-8 text-[rgb(var(--color-icon-logo-rgb))]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-primary-rgb))]">Admin Dashboard</h1>
          </div>
          <button
            onClick={onExit}
            className="flex items-center bg-[rgb(var(--color-accent-primary-rgb))] hover:bg-[rgb(var(--color-accent-primary-hover-rgb))] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Icons.ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to App
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={data.totalUsers}
            icon={<Icons.UserIcon className="w-6 h-6 text-[rgb(var(--color-accent-primary-rgb))]" />}
          />
          <StatCard
            title="Average Points"
            value={data.avgPoints}
            icon={<Icons.StarIcon className="w-6 h-6 text-[rgb(var(--color-accent-tertiary-rgb))]" />}
          />
          <StatCard
            title="Concepts Completed"
            value={data.totalConceptsCompleted}
            icon={<Icons.CheckCircleIcon className="w-6 h-6 text-[rgb(var(--color-accent-success-rgb))]" />}
          />
          <StatCard
            title="Active Learners"
            value={data.totalUsers}
            icon={<Icons.TrophyIcon className="w-6 h-6 text-[rgb(var(--color-accent-secondary-rgb))]" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] p-6 rounded-lg">
            <h3 className="font-semibold text-[rgb(var(--color-text-accent-rgb))] mb-4">User Distribution</h3>
            <div className="space-y-3">
              {data.personaDistribution.map(({ persona, count }) => (
                <div key={persona} className="flex justify-between items-center">
                  <span className="text-[rgb(var(--color-text-tertiary-rgb))]">{persona}</span>
                  <span className="font-semibold text-[rgb(var(--color-text-primary-rgb))]">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[rgba(var(--color-bg-tertiary-alpha-rgb),0.5)] p-6 rounded-lg">
            <h3 className="font-semibold text-[rgb(var(--color-text-accent-rgb))] mb-4">Course Popularity</h3>
            <div className="space-y-3">
              {data.coursePopularity.map(({ course, count }) => (
                <div key={course} className="flex justify-between items-center">
                  <span className="text-[rgb(var(--color-text-tertiary-rgb))]">{course}</span>
                  <span className="font-semibold text-[rgb(var(--color-text-primary-rgb))]">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
