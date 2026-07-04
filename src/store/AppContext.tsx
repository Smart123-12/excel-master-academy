'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@/types';
import { mockUser } from '@/data';
import { ThemeProvider } from './ThemeContext';

// Re-export ThemeProvider and useTheme for convenience
export { ThemeProvider, useTheme } from './ThemeContext';

// ==================== Types ====================
interface AppContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isExerciseCompleted: (exerciseId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'excel-master-user';

// ==================== Helper: XP & Level Calculation ====================
function calculateLevel(totalXP: number): { level: number; xpToNextLevel: number } {
  // Each level requires progressively more XP: level N requires N * 500 XP
  let level = 1;
  let xpRemaining = totalXP;

  while (xpRemaining >= level * 500) {
    xpRemaining -= level * 500;
    level++;
  }

  return {
    level,
    xpToNextLevel: level * 500,
  };
}

// ==================== Provider ====================
function AppProviderInner({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [mounted, setMounted] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch (error) {
      console.warn('Failed to load user progress from localStorage:', error);
    }
  }, []);

  // Persist user to localStorage on changes (after mount)
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.warn('Failed to save user progress to localStorage:', error);
    }
  }, [user, mounted]);

  // ==================== Actions ====================

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  const addXP = useCallback((amount: number) => {
    setUser((prev) => {
      const newTotalXP = prev.xp + amount;
      const { level, xpToNextLevel } = calculateLevel(newTotalXP);

      return {
        ...prev,
        xp: newTotalXP,
        level,
        xpToNextLevel,
      };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setUser((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev; // Already completed
      }

      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        dailyProgress: prev.dailyProgress + 1,
      };
    });
  }, []);

  const completeExercise = useCallback((exerciseId: string) => {
    setUser((prev) => {
      if (prev.completedExercises.includes(exerciseId)) {
        return prev; // Already completed
      }

      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
      };
    });
  }, []);

  const toggleBookmark = useCallback((lessonId: string) => {
    setUser((prev) => {
      const isBookmarked = prev.bookmarks.includes(lessonId);

      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter((id) => id !== lessonId)
          : [...prev.bookmarks, lessonId],
      };
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => user.completedLessons.includes(lessonId),
    [user.completedLessons]
  );

  const isExerciseCompleted = useCallback(
    (exerciseId: string) => user.completedExercises.includes(exerciseId),
    [user.completedExercises]
  );

  const isBookmarked = useCallback(
    (lessonId: string) => user.bookmarks.includes(lessonId),
    [user.bookmarks]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        addXP,
        completeLesson,
        completeExercise,
        toggleBookmark,
        isLessonCompleted,
        isExerciseCompleted,
        isBookmarked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Wraps ThemeProvider around the inner app provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppProviderInner>{children}</AppProviderInner>
    </ThemeProvider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppProvider;
