// ==================== USER & AUTH ====================
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  longestStreak: number;
  completedLessons: string[];
  completedExercises: string[];
  bookmarks: string[];
  badges: string[];
  achievements: string[];
  certificates: string[];
  joinedDate: string;
  isPro: boolean;
  dailyGoal: number;
  dailyProgress: number;
}

// ==================== LESSONS & EXERCISES ====================
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  icon: string;
  duration: string;
  xpReward: number;
  coinReward: number;
  exerciseCount: number;
  completedCount: number;
  isLocked: boolean;
  isPro: boolean;
  order: number;
  topics: string[];
  prerequisites: string[];
}

export interface CellData {
  value: string;
  formula?: string;
  formatted?: string;
  style?: CellStyle;
}

export interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  color?: string;
  bgColor?: string;
  align?: 'left' | 'center' | 'right';
  fontSize?: number;
}

export interface DataSet {
  headers: string[];
  rows: (string | number)[][];
}

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  instructions: string[];
  dataset: DataSet;
  expectedAnswer: {
    cell: string;
    value: string | number;
    formula?: string;
  }[];
  hints: string[];
  solution: string;
  solutionExplanation: string;
  xpReward: number;
  coinReward: number;
  timeLimit: number; // seconds
  bonusTimeThreshold: number; // seconds for bonus XP
  order: number;
}

// ==================== GAMIFICATION ====================
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'speed' | 'accuracy' | 'social' | 'special';
  requirement: string;
  isEarned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  isCompleted: boolean;
  completedDate?: string;
  xpReward: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  badges: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  xpReward: number;
  coinReward: number;
  expiresAt: string;
  isCompleted: boolean;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  exercises: string[];
  xpReward: number;
  coinReward: number;
  startsAt: string;
  endsAt: string;
  progress: number;
  target: number;
}

// ==================== CERTIFICATES ====================
export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseName: string;
  issueDate: string;
  certificateNumber: string;
  score: number;
  skills: string[];
}

// ==================== PRICING ====================
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  discount?: number;
}

// ==================== COMMUNITY ====================
export interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    level: number;
  };
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  commentCount: number;
  createdAt: string;
  isPinned: boolean;
}

export interface Comment {
  id: string;
  threadId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    level: number;
  };
  upvotes: number;
  createdAt: string;
  replies: Comment[];
}

// ==================== ADMIN ====================
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  totalLessons: number;
  totalExercises: number;
  newUsersToday: number;
  completionRate: number;
  avgSessionTime: string;
}

// ==================== AI FEATURES ====================
export interface AIFormulaResult {
  formula: string;
  explanation: string;
  examples: string[];
}

export interface AIErrorResult {
  error: string;
  suggestion: string;
  correctedFormula: string;
}

// ==================== NAVIGATION ====================
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}
