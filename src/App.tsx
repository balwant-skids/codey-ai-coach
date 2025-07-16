import React, { useState, useEffect, useCallback } from 'react';
import { ConceptDisplay } from './components/ConceptDisplay';
import { CodeInput } from './components/CodeInput';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { LevelNavigator } from './components/LevelNavigator';
import { Header } from './components/Header';
import { WelcomeModal } from './components/WelcomeModal';
import { CourseOutlineModal } from './components/CourseOutlineModal';
import { SettingsModal } from './components/SettingsModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Dashboard } from './components/Dashboard';
import { CODING_LEARNING_PATH, MEDTECH_LEARNING_PATH, SWE_LEARNING_PATH, BADGES_CONFIG } from './constants';
import type { UserPersona, Theme, GameProgress, CourseMode, AuthUser } from './types';
import { explainConcept, evaluateCode } from './services/geminiService';
import { authService } from './services/authService';
import { dbService } from './services/dbService';
import * as Icons from './components/icons';

interface AppNotification {
  id: string;
  type: 'block' | 'points' | 'badge';
  message: string;
  iconName?: keyof typeof Icons;
}

type ViewMode = 'loading' | 'welcome' | 'dashboard' | 'learning' | 'admin';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('loading');
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [coachFeedback, setCoachFeedback] = useState<string>('');
  const [conceptExplanation, setConceptExplanation] = useState<string>('');
  const [isExplanationLoading, setIsExplanationLoading] = useState<boolean>(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showCourseOutline, setShowCourseOutline] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  
  const learningPath = progress?.userPersona === 'doctor' 
    ? MEDTECH_LEARNING_PATH 
    : progress?.courseMode === 'swe'
    ? SWE_LEARNING_PATH
    : CODING_LEARNING_PATH;

  const currentStep = progress ? learningPath[progress.currentLevelIndex] : null;
  const isChallengeCompleted = (progress && currentStep) ? progress.completedSteps[currentStep.id] || false : false;

  useEffect(() => {
    setViewMode('loading');
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        // Check if user is whitelisted before proceeding
        try {
          const isWhitelisted = await dbService.isUserWhitelisted(user.email);
          if (!isWhitelisted) {
            // User is not whitelisted, sign them out and stay on welcome
            await authService.signOut();
            setAuthUser(null);
            setProgress(null);
            setViewMode('welcome');
            return;
          }
          
          // User is whitelisted, proceed normally
          setAuthUser(user);
          const userProgress = await dbService.getUserProgress(user.uid);
          if (userProgress) {
            setProgress(userProgress);
            setViewMode('dashboard');
          } else {
            setProgress(null);
            setViewMode('welcome');
          }
        } catch (error) {
          console.error('Error checking whitelist:', error);
          // If there's an error checking whitelist, sign out for safety
          await authService.signOut();
          setAuthUser(null);
          setProgress(null);
          setViewMode('welcome');
        }
      } else {
        setAuthUser(null);
        setProgress(null);
        setViewMode('welcome');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUser && progress) {
      dbService.saveUserProgress(authUser.uid, progress);
    }
  }, [progress, authUser]);
  
  useEffect(() => {
    document.body.className = `theme-${progress?.theme || 'playful'}`;
  }, [progress?.theme]);

  const updateProgress = useCallback((updates: Partial<GameProgress>) => {
    setProgress(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const addNotification = useCallback((notification: Omit<AppNotification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now().toString() };
    setNotifications(prev => [newNotification, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  }, []);

  const handleLevelChange = useCallback(async (levelIndex: number) => {
    if (!progress || !progress.userPersona || !progress.courseMode) return;
    const step = learningPath[levelIndex];
    if (!step) return;

    setIsExplanationLoading(true);
    setError(null);
    setCoachFeedback('');
    setUserCode('');
    
    try {
      const explanation = await explainConcept(progress, step.introductionPrompt, step.blockType);
      setConceptExplanation(explanation);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setConceptExplanation(`Failed to load concept: ${errorMessage}`);
    } finally {
      setIsExplanationLoading(false);
    }
  }, [progress, learningPath]);

  useEffect(() => {
    if (viewMode === 'learning' && progress) {
      handleLevelChange(progress.currentLevelIndex);
    }
  }, [progress?.currentLevelIndex, viewMode, handleLevelChange]);

  const handleOnboardingComplete = (
    persona: UserPersona,
    mode: CourseMode,
    profession?: string,
    analogyTheme?: string
  ) => {
    if (!authUser) return;

    const newTheme: Theme = persona === 'kid' ? 'playful' : 'graceful';
    // Default analogy theme based on persona if not selected
    const defaultAnalogyTheme = persona === 'doctor' ? 'medical' : 'city';

    const initialProgress: GameProgress = {
        userPersona: persona,
        courseMode: mode,
        userProfession: profession || null,
        theme: newTheme,
        analogyTheme: (analogyTheme as any) || defaultAnalogyTheme,
        currentLevelIndex: 0,
        totalPoints: 0,
        achievedBadgeIds: [],
        completedSteps: {},
    };
    setProgress(initialProgress);
    setViewMode('dashboard');
  };
  
  const handleCodeSubmit = async () => {
    if (!progress || !currentStep || !progress.userPersona || !progress.courseMode) return;
    
    setIsFeedbackLoading(true);
    setError(null);

    try {
      const feedback = await evaluateCode(progress, currentStep, userCode);
      setCoachFeedback(feedback);

      const successKeywords = ['correct', 'excellent', 'well done', 'exactly', 'perfect', 'great job', 'nice work', 'insightful'];
      if (!isChallengeCompleted && successKeywords.some(keyword => feedback.toLowerCase().includes(keyword))) {
        const pointsToAdd = currentStep.points || 10;
        const newTotalPoints = progress.totalPoints + pointsToAdd;
        const newCompletedSteps = { ...progress.completedSteps, [currentStep.id]: true };
        const newBadges = BADGES_CONFIG.filter(badge => 
          !progress.achievedBadgeIds.includes(badge.id) && badge.condition(learningPath, progress.currentLevelIndex, currentStep, newTotalPoints, progress.achievedBadgeIds)
        );
        const newBadgeIds = newBadges.map(b => b.id);
        
        updateProgress({ 
            totalPoints: newTotalPoints, 
            completedSteps: newCompletedSteps,
            achievedBadgeIds: [...progress.achievedBadgeIds, ...newBadgeIds]
        });

        addNotification({ type: 'points', message: `+${pointsToAdd} Points!`, iconName: 'StarIcon' });
        newBadges.forEach(badge => {
            addNotification({ type: 'badge', message: `Badge Unlocked: ${badge.name}`, iconName: badge.iconName });
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setCoachFeedback(`Failed to get feedback: ${errorMessage}`);
    } finally {
      setIsFeedbackLoading(false);
    }
  };
  
  const handleNextLevel = () => {
    if (progress && progress.currentLevelIndex < learningPath.length - 1) {
      updateProgress({ currentLevelIndex: progress.currentLevelIndex + 1 });
    }
  };

  const handlePreviousLevel = () => {
    if (progress && progress.currentLevelIndex > 0) {
      updateProgress({ currentLevelIndex: progress.currentLevelIndex - 1 });
    }
  };
  
  const handleNavigateToLevel = (index: number) => {
    updateProgress({ currentLevelIndex: index });
    setShowCourseOutline(false);
    setViewMode('learning');
  }

  const handleLogout = async () => {
    await authService.signOut();
  };

  const handleGoHome = () => {
    setViewMode('dashboard');
  };

  const handleStartLearning = () => {
    setViewMode('learning');
  };
  
  const renderContent = () => {
    switch (viewMode) {
        case 'loading':
            return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>;
        case 'welcome':
            return <WelcomeModal onOnboardingComplete={handleOnboardingComplete} authUser={authUser} />;
        case 'admin':
            return <AdminDashboard onExit={() => setViewMode('dashboard')} />;
        case 'dashboard':
            if (!progress || !authUser) {
                return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /><p className="ml-4">Loading your dashboard...</p></div>;
            }
            return (
              <div className={`min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-gradient-from-rgb))] to-[rgb(var(--color-bg-gradient-to-rgb))] flex flex-col items-center p-2 sm:p-4 font-sans selection:bg-[rgb(var(--color-accent-primary))] selection:text-[rgb(var(--color-text-on-accent-rgb))]`}>

                {showCourseOutline && (
                  <CourseOutlineModal isOpen={showCourseOutline} onClose={() => setShowCourseOutline(false)} learningPath={learningPath} currentLevelIndex={progress.currentLevelIndex} onNavigateToLevel={handleNavigateToLevel} persona={progress.userPersona!} theme={progress.theme} achievedBadgeIds={progress.achievedBadgeIds} totalPoints={progress.totalPoints}/>
                )}

                {showSettingsModal && (
                  <SettingsModal
                    isOpen={showSettingsModal}
                    onClose={() => setShowSettingsModal(false)}
                    onLogout={handleLogout}
                    progress={progress}
                    onUpdateProgress={updateProgress}
                  />
                )}

                <Header
                  onOpenCourseOutline={() => setShowCourseOutline(true)}
                  onOpenSettings={() => setShowSettingsModal(true)}
                  onGoHome={handleGoHome}
                  persona={progress.userPersona}
                  userName={authUser.name}
                  totalPoints={progress.totalPoints}
                  currentStepTitle="Dashboard"
                />

                <Dashboard
                  progress={progress}
                  learningPath={learningPath}
                  onStartLearning={handleStartLearning}
                  onOpenCourseOutline={() => setShowCourseOutline(true)}
                />

                <footer className="text-center mt-auto pt-6 sm:pt-8 text-xs text-[rgb(var(--color-text-secondary-rgb))] px-4">
                  {authUser?.isAdmin && (
                    <button onClick={() => setViewMode('admin')} className="hover:underline mb-2 block">
                      Admin Dashboard
                    </button>
                  )}
                  <p className="truncate">Logged in as {authUser?.email}</p>
                </footer>
              </div>
            );
        case 'learning':
            if (!progress || !currentStep || !authUser) {
                return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /><p className="ml-4">Loading your learning path...</p></div>;
            }
            return (
              <div className={`min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-gradient-from-rgb))] to-[rgb(var(--color-bg-gradient-to-rgb))] flex flex-col items-center p-2 sm:p-4 font-sans selection:bg-[rgb(var(--color-accent-primary))] selection:text-[rgb(var(--color-text-on-accent-rgb))]`}>
                
                {showCourseOutline && (
                  <CourseOutlineModal isOpen={showCourseOutline} onClose={() => setShowCourseOutline(false)} learningPath={learningPath} currentLevelIndex={progress.currentLevelIndex} onNavigateToLevel={handleNavigateToLevel} persona={progress.userPersona!} theme={progress.theme} achievedBadgeIds={progress.achievedBadgeIds} totalPoints={progress.totalPoints}/>
                )}
          
                {showSettingsModal && (
                  <SettingsModal
                    isOpen={showSettingsModal}
                    onClose={() => setShowSettingsModal(false)}
                    onLogout={handleLogout}
                    progress={progress}
                    onUpdateProgress={updateProgress}
                  />
                )}
          
                <Header
                  onOpenCourseOutline={() => setShowCourseOutline(true)}
                  onOpenSettings={() => setShowSettingsModal(true)}
                  onGoHome={handleGoHome}
                  persona={progress.userPersona}
                  userName={authUser.name}
                  totalPoints={progress.totalPoints}
                  currentStepTitle={currentStep?.title}
                />
          
                <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="flex flex-col space-y-4 sm:space-y-6">
                    <ConceptDisplay explanation={conceptExplanation} isLoading={isExplanationLoading} icon={<Icons.LightBulbIcon className="w-6 h-6" />} isWelcomeStep={currentStep.id.includes('welcome')} persona={progress.userPersona}/>
                    <CodeInput code={userCode} setCode={setUserCode} onSubmit={handleCodeSubmit} isLoading={isFeedbackLoading} placeholder={currentStep.placeholder} persona={progress.userPersona}/>
                  </div>

                  <div className="flex flex-col space-y-4 sm:space-y-6">
                     <div className="flex items-center text-lg font-semibold text-[rgb(var(--color-icon-thumbsup-rgb))]"><Icons.ThumbsUpIcon className="w-6 h-6 mr-2 flex-shrink-0" /><h3>Coach's Feedback</h3></div>
                    <FeedbackDisplay feedback={coachFeedback} isLoading={isFeedbackLoading} persona={progress.userPersona}/>
                     {error && ( <div className="bg-[rgba(var(--color-accent-warning-bg-rgb),0.2)] text-[rgb(var(--color-accent-warning-rgb))] border border-[rgb(var(--color-accent-warning-rgb))] p-3 rounded-md text-sm"><strong>Error:</strong> {error}</div> )}
                  </div>
                </main>
          
                <LevelNavigator onPrevious={handlePreviousLevel} onNext={handleNextLevel} canGoPrevious={progress.currentLevelIndex > 0} canGoNext={progress.currentLevelIndex < learningPath.length - 1} isNextDisabled={!isChallengeCompleted} persona={progress.userPersona}/>
          
                <div className="fixed bottom-4 right-2 sm:right-4 flex flex-col-reverse space-y-2 space-y-reverse z-50 max-w-[calc(100vw-1rem)] sm:max-w-sm">
                  {notifications.map(notif => {
                    const IconComponent = notif.iconName ? Icons[notif.iconName] : Icons.SparklesIcon;
                    return (
                      <div key={notif.id} className="animate-fade-in-up bg-[rgb(var(--color-bg-tertiary-rgb))] text-[rgb(var(--color-text-primary-rgb))] py-2 px-3 sm:px-4 rounded-lg shadow-lg flex items-center border border-[rgb(var(--color-border-primary-rgb))] text-sm">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[rgb(var(--color-accent-tertiary-rgb))] flex-shrink-0" />
                        <span className="truncate">{notif.message}</span>
                      </div>
                    );
                  })}
                </div>
          
                <footer className="text-center mt-auto pt-6 sm:pt-8 text-xs text-[rgb(var(--color-text-secondary-rgb))] px-4">
                  {authUser?.isAdmin && (
                    <button onClick={() => setViewMode('admin')} className="hover:underline mb-2 block">
                      Admin Dashboard
                    </button>
                  )}
                  <p className="truncate">Logged in as {authUser?.email}</p>
                </footer>
              </div>
            );
    }
  };

  return <>{renderContent()}</>;
};

export default App;
