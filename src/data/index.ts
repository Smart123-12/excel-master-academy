import { Lesson, Exercise, Badge, Achievement, LeaderboardEntry, PricingPlan, Certificate, Thread, Comment, User, DailyChallenge, WeeklyChallenge } from '@/types';

// ==================== MOCK USER ====================
export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: '/images/avatar.png',
  level: 12,
  xp: 4750,
  xpToNextLevel: 5000,
  coins: 2340,
  streak: 7,
  longestStreak: 23,
  completedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5'],
  completedExercises: ['ex-1', 'ex-2', 'ex-3', 'ex-4', 'ex-5', 'ex-6', 'ex-7', 'ex-8'],
  bookmarks: ['lesson-6', 'lesson-10'],
  badges: ['badge-1', 'badge-2', 'badge-3', 'badge-5', 'badge-7'],
  achievements: ['ach-1', 'ach-2', 'ach-3'],
  certificates: ['cert-1'],
  joinedDate: '2024-09-15',
  isPro: true,
  dailyGoal: 3,
  dailyProgress: 2,
};

// ==================== LESSONS ====================
export const lessons: Lesson[] = [
  // BEGINNER
  {
    id: 'lesson-1', title: 'Excel Basics', description: 'Learn the fundamentals of Excel: navigating the interface, entering data, and basic operations.',
    difficulty: 'beginner', category: 'Fundamentals', icon: '📊', duration: '15 min', xpReward: 100, coinReward: 50,
    exerciseCount: 5, completedCount: 5, isLocked: false, isPro: false, order: 1,
    topics: ['Interface', 'Data Entry', 'Navigation'], prerequisites: [],
  },
  {
    id: 'lesson-2', title: 'Cell References', description: 'Master absolute, relative, and mixed cell references to build dynamic formulas.',
    difficulty: 'beginner', category: 'Fundamentals', icon: '🔗', duration: '20 min', xpReward: 150, coinReward: 75,
    exerciseCount: 6, completedCount: 6, isLocked: false, isPro: false, order: 2,
    topics: ['Relative References', 'Absolute References', 'Mixed References'], prerequisites: ['lesson-1'],
  },
  {
    id: 'lesson-3', title: 'Formatting Cells', description: 'Format cells like a pro — number formats, fonts, borders, colors, and conditional formatting.',
    difficulty: 'beginner', category: 'Fundamentals', icon: '🎨', duration: '15 min', xpReward: 120, coinReward: 60,
    exerciseCount: 4, completedCount: 4, isLocked: false, isPro: false, order: 3,
    topics: ['Number Formats', 'Fonts', 'Borders', 'Colors'], prerequisites: ['lesson-1'],
  },
  {
    id: 'lesson-4', title: 'SUM Function', description: 'Add up numbers with the most essential Excel function. Learn SUM, SUMPRODUCT, and more.',
    difficulty: 'beginner', category: 'Basic Functions', icon: '➕', duration: '20 min', xpReward: 150, coinReward: 75,
    exerciseCount: 5, completedCount: 5, isLocked: false, isPro: false, order: 4,
    topics: ['SUM', 'AutoSum', 'SUMPRODUCT'], prerequisites: ['lesson-2'],
  },
  {
    id: 'lesson-5', title: 'AVERAGE & COUNT', description: 'Calculate averages and count cells with data. Master AVERAGE, COUNT, COUNTA, and COUNTBLANK.',
    difficulty: 'beginner', category: 'Basic Functions', icon: '📈', duration: '18 min', xpReward: 130, coinReward: 65,
    exerciseCount: 5, completedCount: 5, isLocked: false, isPro: false, order: 5,
    topics: ['AVERAGE', 'COUNT', 'COUNTA', 'COUNTBLANK'], prerequisites: ['lesson-4'],
  },

  // INTERMEDIATE
  {
    id: 'lesson-6', title: 'IF Function', description: 'Make decisions in your formulas with IF, nested IF, IFS, and logical operators.',
    difficulty: 'intermediate', category: 'Logic Functions', icon: '🔀', duration: '25 min', xpReward: 200, coinReward: 100,
    exerciseCount: 6, completedCount: 3, isLocked: false, isPro: false, order: 6,
    topics: ['IF', 'Nested IF', 'IFS', 'AND', 'OR'], prerequisites: ['lesson-5'],
  },
  {
    id: 'lesson-7', title: 'COUNTIF & SUMIF', description: 'Count and sum cells based on conditions. Master COUNTIF, COUNTIFS, SUMIF, SUMIFS.',
    difficulty: 'intermediate', category: 'Logic Functions', icon: '🔢', duration: '25 min', xpReward: 220, coinReward: 110,
    exerciseCount: 6, completedCount: 0, isLocked: false, isPro: false, order: 7,
    topics: ['COUNTIF', 'COUNTIFS', 'SUMIF', 'SUMIFS'], prerequisites: ['lesson-6'],
  },
  {
    id: 'lesson-8', title: 'VLOOKUP', description: 'Look up data vertically in tables. The most-asked Excel skill in job interviews.',
    difficulty: 'intermediate', category: 'Lookup Functions', icon: '🔍', duration: '30 min', xpReward: 250, coinReward: 125,
    exerciseCount: 7, completedCount: 0, isLocked: false, isPro: false, order: 8,
    topics: ['VLOOKUP', 'Exact Match', 'Approximate Match'], prerequisites: ['lesson-6'],
  },
  {
    id: 'lesson-9', title: 'HLOOKUP', description: 'Look up data horizontally across rows. Essential for transposed data tables.',
    difficulty: 'intermediate', category: 'Lookup Functions', icon: '↔️', duration: '20 min', xpReward: 200, coinReward: 100,
    exerciseCount: 4, completedCount: 0, isLocked: false, isPro: true, order: 9,
    topics: ['HLOOKUP', 'Horizontal Lookup'], prerequisites: ['lesson-8'],
  },
  {
    id: 'lesson-10', title: 'INDEX & MATCH', description: 'The powerful alternative to VLOOKUP. Learn INDEX, MATCH, and how to combine them.',
    difficulty: 'intermediate', category: 'Lookup Functions', icon: '🎯', duration: '35 min', xpReward: 300, coinReward: 150,
    exerciseCount: 8, completedCount: 0, isLocked: false, isPro: false, order: 10,
    topics: ['INDEX', 'MATCH', 'INDEX-MATCH Combo'], prerequisites: ['lesson-8'],
  },
  {
    id: 'lesson-11', title: 'XLOOKUP', description: 'The modern replacement for VLOOKUP. Simpler, more flexible, and more powerful.',
    difficulty: 'intermediate', category: 'Lookup Functions', icon: '🚀', duration: '25 min', xpReward: 250, coinReward: 125,
    exerciseCount: 5, completedCount: 0, isLocked: false, isPro: true, order: 11,
    topics: ['XLOOKUP', 'Exact Match', 'Wildcards'], prerequisites: ['lesson-10'],
  },
  {
    id: 'lesson-12', title: 'Pivot Tables', description: 'Summarize and analyze large datasets with Pivot Tables — the ultimate data analysis tool.',
    difficulty: 'intermediate', category: 'Data Analysis', icon: '📋', duration: '40 min', xpReward: 350, coinReward: 175,
    exerciseCount: 8, completedCount: 0, isLocked: false, isPro: true, order: 12,
    topics: ['Creating Pivots', 'Grouping', 'Calculated Fields'], prerequisites: ['lesson-7'],
  },

  // ADVANCED
  {
    id: 'lesson-13', title: 'Power Query', description: 'Transform and clean data with Power Query. Import, merge, and reshape data from multiple sources.',
    difficulty: 'advanced', category: 'Data Engineering', icon: '⚡', duration: '45 min', xpReward: 400, coinReward: 200,
    exerciseCount: 6, completedCount: 0, isLocked: true, isPro: true, order: 13,
    topics: ['Import Data', 'Transform', 'Merge Queries'], prerequisites: ['lesson-12'],
  },
  {
    id: 'lesson-14', title: 'Dashboards', description: 'Build interactive dashboards with charts, slicers, and dynamic data visualization.',
    difficulty: 'advanced', category: 'Visualization', icon: '📊', duration: '50 min', xpReward: 450, coinReward: 225,
    exerciseCount: 5, completedCount: 0, isLocked: true, isPro: true, order: 14,
    topics: ['Charts', 'Slicers', 'Dynamic Charts'], prerequisites: ['lesson-12'],
  },
  {
    id: 'lesson-15', title: 'Dynamic Arrays', description: 'Master FILTER, UNIQUE, SORT, SORTBY — the game-changing dynamic array functions.',
    difficulty: 'advanced', category: 'Modern Excel', icon: '🔄', duration: '35 min', xpReward: 350, coinReward: 175,
    exerciseCount: 8, completedCount: 0, isLocked: true, isPro: true, order: 15,
    topics: ['FILTER', 'UNIQUE', 'SORT', 'SORTBY', 'SEQUENCE'], prerequisites: ['lesson-10'],
  },
  {
    id: 'lesson-16', title: 'LET & LAMBDA', description: 'Write cleaner, more powerful formulas with LET for variables and LAMBDA for custom functions.',
    difficulty: 'advanced', category: 'Modern Excel', icon: 'λ', duration: '30 min', xpReward: 400, coinReward: 200,
    exerciseCount: 5, completedCount: 0, isLocked: true, isPro: true, order: 16,
    topics: ['LET', 'LAMBDA', 'Named Functions'], prerequisites: ['lesson-15'],
  },
];

// ==================== EXERCISES ====================
export const exercises: Exercise[] = [
  {
    id: 'ex-1', lessonId: 'lesson-4', title: 'Basic SUM', description: 'Calculate the total sales for January using the SUM function.',
    difficulty: 'beginner',
    instructions: [
      'Look at the sales data in cells A1:B6',
      'In cell B7, write a SUM formula to calculate the total sales',
      'The formula should sum all values in B2:B6',
    ],
    dataset: { headers: ['Product', 'Sales'], rows: [['Laptop', 1200], ['Phone', 800], ['Tablet', 450], ['Monitor', 650], ['Keyboard', 150]] },
    expectedAnswer: [{ cell: 'B7', value: 3250, formula: '=SUM(B2:B6)' }],
    hints: ['Use the SUM function: =SUM(range)', 'The range should be B2:B6', 'The answer is =SUM(B2:B6)'],
    solution: '=SUM(B2:B6)',
    solutionExplanation: 'The SUM function adds all numbers in a range. =SUM(B2:B6) adds 1200+800+450+650+150 = 3250.',
    xpReward: 30, coinReward: 15, timeLimit: 120, bonusTimeThreshold: 30, order: 1,
  },
  {
    id: 'ex-2', lessonId: 'lesson-4', title: 'SUM Multiple Ranges', description: 'Calculate total revenue from Q1 and Q2 using SUM with multiple ranges.',
    difficulty: 'beginner',
    instructions: [
      'You have Q1 sales in B2:B4 and Q2 sales in C2:C4',
      'In cell D2, calculate the total of both quarters combined',
      'Use a single SUM formula with multiple ranges',
    ],
    dataset: { headers: ['Region', 'Q1 Sales', 'Q2 Sales'], rows: [['North', 5000, 6200], ['South', 4300, 5100], ['West', 3800, 4700]] },
    expectedAnswer: [{ cell: 'D2', value: 29100, formula: '=SUM(B2:B4,C2:C4)' }],
    hints: ['SUM can take multiple ranges separated by commas', 'Try =SUM(B2:B4,C2:C4)', 'This adds all Q1 and Q2 values together'],
    solution: '=SUM(B2:B4,C2:C4)',
    solutionExplanation: 'SUM can accept multiple ranges. =SUM(B2:B4,C2:C4) adds all values from both ranges.',
    xpReward: 35, coinReward: 18, timeLimit: 150, bonusTimeThreshold: 45, order: 2,
  },
  {
    id: 'ex-3', lessonId: 'lesson-5', title: 'Calculate Average', description: 'Find the average test score of the class.',
    difficulty: 'beginner',
    instructions: [
      'You have student test scores in column B',
      'In cell B8, calculate the average score',
      'Use the AVERAGE function',
    ],
    dataset: { headers: ['Student', 'Score'], rows: [['Emma', 92], ['Liam', 85], ['Olivia', 78], ['Noah', 95], ['Ava', 88], ['William', 72]] },
    expectedAnswer: [{ cell: 'B8', value: 85, formula: '=AVERAGE(B2:B7)' }],
    hints: ['Use the AVERAGE function', 'The range is B2:B7', '=AVERAGE(B2:B7) gives you the mean'],
    solution: '=AVERAGE(B2:B7)',
    solutionExplanation: 'AVERAGE calculates the arithmetic mean. (92+85+78+95+88+72)/6 = 85.',
    xpReward: 30, coinReward: 15, timeLimit: 90, bonusTimeThreshold: 25, order: 1,
  },
  {
    id: 'ex-4', lessonId: 'lesson-6', title: 'Basic IF', description: 'Use IF to determine pass/fail status based on a score threshold.',
    difficulty: 'intermediate',
    instructions: [
      'Students pass if their score is >= 70',
      'In column C, write an IF formula to show "Pass" or "Fail"',
      'Apply the formula for each student',
    ],
    dataset: { headers: ['Student', 'Score', 'Result'], rows: [['Emma', 92, ''], ['Liam', 65, ''], ['Olivia', 78, ''], ['Noah', 45, ''], ['Ava', 88, '']] },
    expectedAnswer: [{ cell: 'C2', value: 'Pass', formula: '=IF(B2>=70,"Pass","Fail")' }],
    hints: ['IF syntax: =IF(condition, value_if_true, value_if_false)', 'The condition is B2>=70', '=IF(B2>=70,"Pass","Fail")'],
    solution: '=IF(B2>=70,"Pass","Fail")',
    solutionExplanation: 'IF checks a condition. If B2>=70 is TRUE, it returns "Pass"; otherwise "Fail".',
    xpReward: 40, coinReward: 20, timeLimit: 120, bonusTimeThreshold: 35, order: 1,
  },
  {
    id: 'ex-5', lessonId: 'lesson-8', title: 'Basic VLOOKUP', description: 'Use VLOOKUP to find an employee\'s department from a lookup table.',
    difficulty: 'intermediate',
    instructions: [
      'You have an employee lookup table in A1:C6',
      'In cell F2, use VLOOKUP to find the department for Employee ID "E003"',
      'Look up the ID in the first column and return the department (3rd column)',
    ],
    dataset: { headers: ['ID', 'Name', 'Department'], rows: [['E001', 'Alice', 'Marketing'], ['E002', 'Bob', 'Engineering'], ['E003', 'Charlie', 'Sales'], ['E004', 'Diana', 'HR'], ['E005', 'Eve', 'Engineering']] },
    expectedAnswer: [{ cell: 'F2', value: 'Sales', formula: '=VLOOKUP("E003",A2:C6,3,FALSE)' }],
    hints: ['VLOOKUP syntax: =VLOOKUP(lookup_value, table_array, col_index, [range_lookup])', 'Look for "E003" in the first column', 'Return the 3rd column with FALSE for exact match'],
    solution: '=VLOOKUP("E003",A2:C6,3,FALSE)',
    solutionExplanation: 'VLOOKUP searches for "E003" in the first column of A2:C6, finds it in row 4, and returns the value from the 3rd column: "Sales".',
    xpReward: 50, coinReward: 25, timeLimit: 180, bonusTimeThreshold: 60, order: 1,
  },
  {
    id: 'ex-6', lessonId: 'lesson-7', title: 'COUNTIF Challenge', description: 'Count how many products belong to the "Electronics" category.',
    difficulty: 'intermediate',
    instructions: [
      'You have a product list with categories in column B',
      'In cell B8, use COUNTIF to count all "Electronics" products',
    ],
    dataset: { headers: ['Product', 'Category'], rows: [['Laptop', 'Electronics'], ['Desk', 'Furniture'], ['Phone', 'Electronics'], ['Chair', 'Furniture'], ['Tablet', 'Electronics'], ['Lamp', 'Lighting']] },
    expectedAnswer: [{ cell: 'B8', value: 3, formula: '=COUNTIF(B2:B7,"Electronics")' }],
    hints: ['COUNTIF syntax: =COUNTIF(range, criteria)', 'Count cells in B2:B7 that equal "Electronics"', '=COUNTIF(B2:B7,"Electronics")'],
    solution: '=COUNTIF(B2:B7,"Electronics")',
    solutionExplanation: 'COUNTIF counts cells matching a criterion. There are 3 "Electronics" entries in B2:B7.',
    xpReward: 40, coinReward: 20, timeLimit: 120, bonusTimeThreshold: 40, order: 1,
  },
  {
    id: 'ex-7', lessonId: 'lesson-10', title: 'INDEX MATCH Combo', description: 'Use INDEX-MATCH to find a price from a product catalog — left-lookup capability!',
    difficulty: 'intermediate',
    instructions: [
      'Use INDEX-MATCH to find the price of "Monitor" from the catalog',
      'Unlike VLOOKUP, INDEX-MATCH can look up values to the left',
      'Write the formula in cell F2',
    ],
    dataset: { headers: ['Price', 'Product', 'Category'], rows: [[599, 'Laptop', 'Tech'], [299, 'Monitor', 'Tech'], [49, 'Keyboard', 'Accessories'], [79, 'Mouse', 'Accessories'], [199, 'Headphones', 'Tech']] },
    expectedAnswer: [{ cell: 'F2', value: 299, formula: '=INDEX(A2:A6,MATCH("Monitor",B2:B6,0))' }],
    hints: ['INDEX returns a value from a range by position', 'MATCH finds the position of a value in a range', 'Combine: =INDEX(price_range, MATCH(lookup, name_range, 0))'],
    solution: '=INDEX(A2:A6,MATCH("Monitor",B2:B6,0))',
    solutionExplanation: 'MATCH finds "Monitor" at position 2 in B2:B6. INDEX then returns the 2nd value from A2:A6, which is 299.',
    xpReward: 60, coinReward: 30, timeLimit: 240, bonusTimeThreshold: 90, order: 1,
  },
  {
    id: 'ex-8', lessonId: 'lesson-15', title: 'FILTER Function', description: 'Use the FILTER function to extract all sales above $500.',
    difficulty: 'advanced',
    instructions: [
      'You have sales data in A1:C6',
      'In cell E2, use the FILTER function to show only sales above $500',
      'Filter the entire table based on the Amount column',
    ],
    dataset: { headers: ['Product', 'Region', 'Amount'], rows: [['Laptop', 'North', 1200], ['Mouse', 'South', 25], ['Monitor', 'North', 450], ['Phone', 'West', 800], ['Keyboard', 'South', 75]] },
    expectedAnswer: [{ cell: 'E2', value: 'Laptop', formula: '=FILTER(A2:C6,C2:C6>500)' }],
    hints: ['FILTER syntax: =FILTER(array, include, [if_empty])', 'The include criteria is C2:C6>500', '=FILTER(A2:C6,C2:C6>500)'],
    solution: '=FILTER(A2:C6,C2:C6>500)',
    solutionExplanation: 'FILTER returns rows where C>500. This spills the results: Laptop (1200) and Phone (800).',
    xpReward: 70, coinReward: 35, timeLimit: 180, bonusTimeThreshold: 60, order: 1,
  },
];

// ==================== BADGES ====================
export const badges: Badge[] = [
  { id: 'badge-1', name: 'First Steps', description: 'Complete your first lesson', icon: '🎓', category: 'learning', requirement: 'Complete 1 lesson', isEarned: true, earnedDate: '2024-09-16', rarity: 'common' },
  { id: 'badge-2', name: 'Formula Apprentice', description: 'Write your first formula', icon: '📝', category: 'learning', requirement: 'Write 1 formula', isEarned: true, earnedDate: '2024-09-16', rarity: 'common' },
  { id: 'badge-3', name: 'Speed Demon', description: 'Complete an exercise in under 30 seconds', icon: '⚡', category: 'speed', requirement: 'Finish exercise < 30s', isEarned: true, earnedDate: '2024-09-18', rarity: 'rare' },
  { id: 'badge-4', name: 'Perfectionist', description: 'Complete 5 exercises without any mistakes', icon: '💎', category: 'accuracy', requirement: '5 perfect exercises', isEarned: false, rarity: 'epic' },
  { id: 'badge-5', name: 'Streak Warrior', description: 'Maintain a 7-day learning streak', icon: '🔥', category: 'streak', requirement: '7-day streak', isEarned: true, earnedDate: '2024-09-23', rarity: 'rare' },
  { id: 'badge-6', name: 'VLOOKUP Master', description: 'Complete all VLOOKUP exercises', icon: '🔍', category: 'learning', requirement: 'All VLOOKUP exercises done', isEarned: false, rarity: 'epic' },
  { id: 'badge-7', name: 'Social Butterfly', description: 'Post your first community discussion', icon: '🦋', category: 'social', requirement: 'Post 1 discussion', isEarned: true, earnedDate: '2024-09-20', rarity: 'common' },
  { id: 'badge-8', name: 'Excel Legend', description: 'Complete all lessons and exercises', icon: '👑', category: 'special', requirement: 'Complete everything', isEarned: false, rarity: 'legendary' },
  { id: 'badge-9', name: 'Night Owl', description: 'Practice after midnight', icon: '🦉', category: 'special', requirement: 'Practice after 12AM', isEarned: false, rarity: 'rare' },
  { id: 'badge-10', name: 'Streak Legend', description: 'Maintain a 30-day learning streak', icon: '🏆', category: 'streak', requirement: '30-day streak', isEarned: false, rarity: 'legendary' },
];

// ==================== ACHIEVEMENTS ====================
export const achievements: Achievement[] = [
  { id: 'ach-1', name: 'Getting Started', description: 'Complete your first exercise', icon: '🚀', progress: 1, target: 1, isCompleted: true, completedDate: '2024-09-16', xpReward: 50 },
  { id: 'ach-2', name: 'Ten Down', description: 'Complete 10 exercises', icon: '🎯', progress: 8, target: 10, isCompleted: false, xpReward: 200 },
  { id: 'ach-3', name: 'Formula Wizard', description: 'Write 50 correct formulas', icon: '🧙‍♂️', progress: 32, target: 50, isCompleted: false, xpReward: 500 },
  { id: 'ach-4', name: 'Centurion', description: 'Complete 100 exercises', icon: '💯', progress: 8, target: 100, isCompleted: false, xpReward: 1000 },
  { id: 'ach-5', name: 'Streak Master', description: 'Achieve a 30-day streak', icon: '🔥', progress: 7, target: 30, isCompleted: false, xpReward: 750 },
];

// ==================== LEADERBOARD ====================
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', name: 'Sarah Chen', avatar: '', xp: 12450, level: 24, streak: 45, lessonsCompleted: 16, badges: 9 },
  { rank: 2, userId: 'u2', name: 'Marcus Williams', avatar: '', xp: 11200, level: 22, streak: 32, lessonsCompleted: 15, badges: 8 },
  { rank: 3, userId: 'u3', name: 'Priya Patel', avatar: '', xp: 9800, level: 20, streak: 28, lessonsCompleted: 14, badges: 7 },
  { rank: 4, userId: 'u4', name: 'James O\'Brien', avatar: '', xp: 8500, level: 18, streak: 21, lessonsCompleted: 13, badges: 7 },
  { rank: 5, userId: 'u5', name: 'Yuki Tanaka', avatar: '', xp: 7200, level: 16, streak: 19, lessonsCompleted: 11, badges: 6 },
  { rank: 6, userId: 'u6', name: 'Alex Johnson', avatar: '', xp: 4750, level: 12, streak: 7, lessonsCompleted: 5, badges: 5 },
  { rank: 7, userId: 'u7', name: 'Maria Garcia', avatar: '', xp: 4100, level: 11, streak: 14, lessonsCompleted: 8, badges: 4 },
  { rank: 8, userId: 'u8', name: 'David Kim', avatar: '', xp: 3600, level: 10, streak: 9, lessonsCompleted: 7, badges: 4 },
  { rank: 9, userId: 'u9', name: 'Emma Fischer', avatar: '', xp: 2900, level: 8, streak: 5, lessonsCompleted: 6, badges: 3 },
  { rank: 10, userId: 'u10', name: 'Omar Hassan', avatar: '', xp: 2100, level: 6, streak: 3, lessonsCompleted: 4, badges: 2 },
];

// ==================== PRICING ====================
export const pricingPlans: PricingPlan[] = [
  {
    id: 'free', name: 'Free', price: 0, period: 'forever', description: 'Get started with Excel basics',
    features: ['5 Beginner Lessons', '10 Practice Exercises', 'Basic Excel Simulator', 'Community Access', 'Progress Tracking', 'Email Support'],
    isPopular: false, ctaText: 'Start Free',
  },
  {
    id: 'pro', name: 'Pro', price: 12, period: 'month', description: 'Unlock everything and accelerate your learning',
    features: ['All 16+ Lessons', '1000+ Exercises', 'Full Excel Simulator', 'AI Formula Tools', 'Certificates', 'Priority Support', 'No Ads', 'Advanced Analytics', 'Keyboard Trainer', 'Interview Prep'],
    isPopular: true, ctaText: 'Go Pro', discount: 20,
  },
  {
    id: 'lifetime', name: 'Lifetime', price: 149, period: 'one-time', description: 'One payment, lifetime access to everything',
    features: ['Everything in Pro', 'Lifetime Updates', 'Early Access to New Content', 'Custom Certificates', '1-on-1 Support Session', 'Exclusive Discord Access', 'Resume Review', 'Career Guidance'],
    isPopular: false, ctaText: 'Get Lifetime Access',
  },
];

// ==================== CERTIFICATES ====================
export const certificates: Certificate[] = [
  {
    id: 'cert-1', userId: 'user-1', userName: 'Alex Johnson', courseName: 'Excel Fundamentals',
    issueDate: '2024-10-01', certificateNumber: 'EMA-2024-00142', score: 94, skills: ['SUM', 'AVERAGE', 'COUNT', 'Cell References', 'Formatting'],
  },
];

// ==================== COMMUNITY ====================
export const threads: Thread[] = [
  {
    id: 'thread-1', title: 'How to handle #N/A errors in VLOOKUP?', content: 'I keep getting #N/A errors when my lookup value doesn\'t exist. What\'s the best way to handle this?',
    author: { id: 'u1', name: 'Sarah Chen', avatar: '', level: 24 },
    category: 'Help', tags: ['VLOOKUP', 'Errors', 'IFERROR'], upvotes: 42, downvotes: 2, commentCount: 15, createdAt: '2024-10-01T10:30:00Z', isPinned: true,
  },
  {
    id: 'thread-2', title: 'XLOOKUP vs VLOOKUP — Which should I learn?', content: 'I\'m new to Excel. Should I start with VLOOKUP or go straight to XLOOKUP?',
    author: { id: 'u3', name: 'Priya Patel', avatar: '', level: 20 },
    category: 'Discussion', tags: ['XLOOKUP', 'VLOOKUP', 'Beginners'], upvotes: 38, downvotes: 1, commentCount: 23, createdAt: '2024-09-28T15:45:00Z', isPinned: false,
  },
  {
    id: 'thread-3', title: 'My Excel Dashboard for Sales Analytics', content: 'Just finished building a comprehensive sales dashboard! Sharing my approach and techniques.',
    author: { id: 'u2', name: 'Marcus Williams', avatar: '', level: 22 },
    category: 'Showcase', tags: ['Dashboard', 'Charts', 'Advanced'], upvotes: 67, downvotes: 0, commentCount: 31, createdAt: '2024-09-25T09:15:00Z', isPinned: false,
  },
  {
    id: 'thread-4', title: 'Tips for passing Excel certification exam?', content: 'I\'m preparing for the MOS Excel certification. Any tips from those who\'ve passed?',
    author: { id: 'u7', name: 'Maria Garcia', avatar: '', level: 11 },
    category: 'Help', tags: ['Certification', 'Career', 'Tips'], upvotes: 29, downvotes: 0, commentCount: 18, createdAt: '2024-09-22T14:20:00Z', isPinned: false,
  },
  {
    id: 'thread-5', title: 'Dynamic Arrays changed my life', content: 'Once you learn FILTER, UNIQUE, and SORT, you\'ll never go back. Here\'s why dynamic arrays are amazing.',
    author: { id: 'u5', name: 'Yuki Tanaka', avatar: '', level: 16 },
    category: 'Discussion', tags: ['Dynamic Arrays', 'FILTER', 'UNIQUE'], upvotes: 55, downvotes: 3, commentCount: 27, createdAt: '2024-09-20T11:00:00Z', isPinned: false,
  },
];

export const comments: Comment[] = [
  {
    id: 'c1', threadId: 'thread-1', content: 'Wrap your VLOOKUP in IFERROR! Like: =IFERROR(VLOOKUP(...),"Not Found")',
    author: { id: 'u2', name: 'Marcus Williams', avatar: '', level: 22 }, upvotes: 18, createdAt: '2024-10-01T11:00:00Z', replies: [],
  },
  {
    id: 'c2', threadId: 'thread-1', content: 'Or use XLOOKUP which has a built-in if_not_found parameter!',
    author: { id: 'u5', name: 'Yuki Tanaka', avatar: '', level: 16 }, upvotes: 12, createdAt: '2024-10-01T11:30:00Z', replies: [],
  },
];

// ==================== DAILY / WEEKLY CHALLENGES ====================
export const dailyChallenge: DailyChallenge = {
  id: 'daily-1', title: 'Speed SUM Challenge', description: 'Complete 3 SUM exercises in under 2 minutes total!',
  difficulty: 'beginner', xpReward: 100, coinReward: 50, expiresAt: '2024-10-02T00:00:00Z', isCompleted: false,
};

export const weeklyChallenge: WeeklyChallenge = {
  id: 'weekly-1', title: 'Lookup Master Week', description: 'Complete all VLOOKUP and INDEX-MATCH exercises this week.',
  exercises: ['ex-5', 'ex-7'], xpReward: 500, coinReward: 250, startsAt: '2024-09-30T00:00:00Z', endsAt: '2024-10-06T23:59:59Z', progress: 1, target: 7,
};

// ==================== KEYBOARD SHORTCUTS ====================
export const keyboardShortcuts = [
  { key: 'Ctrl+C', action: 'Copy', category: 'Basic' },
  { key: 'Ctrl+V', action: 'Paste', category: 'Basic' },
  { key: 'Ctrl+Z', action: 'Undo', category: 'Basic' },
  { key: 'Ctrl+Y', action: 'Redo', category: 'Basic' },
  { key: 'Ctrl+S', action: 'Save', category: 'Basic' },
  { key: 'Ctrl+B', action: 'Bold', category: 'Formatting' },
  { key: 'Ctrl+I', action: 'Italic', category: 'Formatting' },
  { key: 'Ctrl+U', action: 'Underline', category: 'Formatting' },
  { key: 'Ctrl+1', action: 'Format Cells Dialog', category: 'Formatting' },
  { key: 'F2', action: 'Edit Cell', category: 'Navigation' },
  { key: 'Tab', action: 'Move Right', category: 'Navigation' },
  { key: 'Enter', action: 'Move Down', category: 'Navigation' },
  { key: 'Ctrl+Home', action: 'Go to A1', category: 'Navigation' },
  { key: 'Ctrl+End', action: 'Go to Last Cell', category: 'Navigation' },
  { key: 'Ctrl+Shift+L', action: 'Toggle Filters', category: 'Data' },
  { key: 'Alt+=', action: 'AutoSum', category: 'Formulas' },
  { key: 'Ctrl+`', action: 'Show Formulas', category: 'Formulas' },
  { key: 'F4', action: 'Toggle Absolute Reference', category: 'Formulas' },
  { key: 'Ctrl+Shift+Enter', action: 'Array Formula (Legacy)', category: 'Formulas' },
  { key: 'Ctrl+T', action: 'Create Table', category: 'Data' },
];

// ==================== FLASHCARDS ====================
export const flashcards = [
  { id: 'fc-1', front: 'What does SUM do?', back: 'Adds all numbers in a range of cells. Syntax: =SUM(number1, [number2], ...)', category: 'Basic Functions' },
  { id: 'fc-2', front: 'What is the difference between relative and absolute references?', back: 'Relative references (A1) change when copied. Absolute references ($A$1) stay fixed.', category: 'References' },
  { id: 'fc-3', front: 'What does VLOOKUP do?', back: 'Looks for a value in the first column of a range and returns a value in the same row from a specified column. Syntax: =VLOOKUP(lookup_value, table_array, col_index, [range_lookup])', category: 'Lookup Functions' },
  { id: 'fc-4', front: 'When should you use INDEX-MATCH instead of VLOOKUP?', back: 'Use INDEX-MATCH when: 1) Lookup column is not the first column, 2) You need left-lookups, 3) You need better performance with large datasets, 4) Inserting/deleting columns.', category: 'Lookup Functions' },
  { id: 'fc-5', front: 'What does the FILTER function do?', back: 'Returns an array of values that meet specified criteria. It\'s a dynamic array function. Syntax: =FILTER(array, include, [if_empty])', category: 'Dynamic Arrays' },
  { id: 'fc-6', front: 'What is XLOOKUP?', back: 'Modern replacement for VLOOKUP/HLOOKUP. Searches a range and returns a matching item. Syntax: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])', category: 'Lookup Functions' },
  { id: 'fc-7', front: 'What does LAMBDA do?', back: 'Creates custom, reusable functions without VBA. You can name them and use them like native functions. Syntax: =LAMBDA(parameter, formula)', category: 'Modern Excel' },
  { id: 'fc-8', front: 'What is Power Query?', back: 'A data transformation tool built into Excel for importing, cleaning, and reshaping data from multiple sources. Found under Data > Get & Transform.', category: 'Data Engineering' },
];

// ==================== RECENT ACTIVITIES ====================
export const recentActivities = [
  { id: 'act-1', type: 'lesson_completed', title: 'Completed "AVERAGE & COUNT"', xp: 130, timestamp: '2024-10-01T14:30:00Z' },
  { id: 'act-2', type: 'exercise_completed', title: 'Solved "Basic SUM"', xp: 30, timestamp: '2024-10-01T14:15:00Z' },
  { id: 'act-3', type: 'badge_earned', title: 'Earned "Streak Warrior" badge', xp: 0, timestamp: '2024-09-30T10:00:00Z' },
  { id: 'act-4', type: 'streak', title: '7-day streak achieved!', xp: 50, timestamp: '2024-09-30T09:00:00Z' },
  { id: 'act-5', type: 'level_up', title: 'Reached Level 12!', xp: 0, timestamp: '2024-09-29T16:45:00Z' },
];
