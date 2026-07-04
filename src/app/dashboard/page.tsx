'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockUser, lessons, recentActivities, badges, certificates } from '@/data';
import { GlassCard, Button, AnimatedCounter, Avatar } from '@/components/ui';
import { Zap, Flame, Award, BookOpen, Compass, ShieldAlert, Sparkles, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const activeStreak = mockUser.streak;
  const totalXp = mockUser.xp;
  const userLevel = mockUser.level;

  // Calculate stats
  const completedLessonsCount = mockUser.completedLessons.length;
  const remainingLessons = lessons.filter(l => !mockUser.completedLessons.includes(l.id));
  const bookmarkedLessonsList = lessons.filter(l => mockUser.bookmarks.includes(l.id));

  // XP Progress calculation
  const xpPercent = Math.min((mockUser.xp / mockUser.xpToNextLevel) * 100, 100);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-dark-light p-8 rounded-3xl border border-[var(--border-color)] shadow-sm">
            <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
              <Avatar src={mockUser.avatar} name={mockUser.name} size="lg" level={mockUser.level} showLevel />
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                  Welcome Back, {mockUser.name}! 👋
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  You are in the top 8% of Excel learners this week. Keep it up!
                </p>
              </div>
            </div>

            <div className="flex gap-4 shrink-0 w-full md:w-auto">
              {remainingLessons.length > 0 ? (
                <Button 
                  variant="primary" 
                  className="w-full md:w-auto justify-center font-bold" 
                  href={`/lessons/${remainingLessons[0].id}`}
                >
                  Resume Learning Path
                </Button>
              ) : (
                <Button variant="primary" className="w-full md:w-auto justify-center font-bold" href="/lessons">
                  Browse All Lessons
                </Button>
              )}
            </div>
          </div>

          {/* Core Level XP Bar */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 p-6 rounded-3xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Level {userLevel} Path</span>
              <span className="text-sm font-semibold font-mono">{totalXp} / {mockUser.xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${xpPercent}%` }} />
            </div>
            <p className="text-emerald-50 text-xs mt-3">
              {mockUser.xpToNextLevel - totalXp} XP points required to reach Level {userLevel + 1}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* XP */}
            <GlassCard className="p-6 flex items-center gap-5">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
                <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">Total XP</h4>
                <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono mt-0.5">
                  <AnimatedCounter value={totalXp} />
                </div>
              </div>
            </GlassCard>

            {/* Streak */}
            <GlassCard className="p-6 flex items-center gap-5">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl">
                <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">Daily Streak</h4>
                <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono mt-0.5">
                  <AnimatedCounter value={activeStreak} suffix=" Days" />
                </div>
              </div>
            </GlassCard>

            {/* Lessons */}
            <GlassCard className="p-6 flex items-center gap-5">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">Lessons Completed</h4>
                <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono mt-0.5">
                  <AnimatedCounter value={completedLessonsCount} />
                </div>
              </div>
            </GlassCard>

            {/* Certificates */}
            <GlassCard className="p-6 flex items-center gap-5">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 rounded-2xl">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">Certificates</h4>
                <div className="text-2xl font-extrabold text-[var(--text-primary)] font-mono mt-0.5">
                  <AnimatedCounter value={certificates.length} />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Dashboard Layout split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Activities, Heatmap */}
            <div className="lg:col-span-2 space-y-8">
              {/* Daily progress tracker */}
              <div className="bg-white dark:bg-dark-light p-6 rounded-3xl border border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 select-none">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Daily Practice Goal
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-semibold">
                      <span>Completed exercises: {mockUser.dailyProgress} / {mockUser.dailyGoal}</span>
                      <span>{Math.round((mockUser.dailyProgress / mockUser.dailyGoal) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-dark rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(mockUser.dailyProgress / mockUser.dailyGoal) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity feed logs */}
              <div className="bg-white dark:bg-dark-light p-6 rounded-3xl border border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2 select-none">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  Recent Activity Logs
                </h3>

                <div className="space-y-4">
                  {recentActivities.map((act) => (
                    <div key={act.id} className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-dark/40 rounded-2xl border border-[var(--border-color)] text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--text-primary)]">{act.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{new Date(act.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">+{act.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col Sidebar: Bookmarked, AI Generator access link */}
            <div className="space-y-8">
              {/* Quick AI tools portal */}
              <GlassCard className="p-6 relative overflow-hidden bg-gradient-to-br from-emerald-950/20 to-transparent">
                <div className="absolute top-2 right-2 text-emerald-500 animate-pulse">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2 select-none">
                  AI Excel Formula tools
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Stuck on a tricky calculation? Describe what you want in plain English and let the AI generate the formula for you.
                </p>
                <Button variant="primary" className="w-full justify-center text-xs font-bold" href="/profile?tab=ai">
                  Launch AI Formula generator
                </Button>
              </GlassCard>

              {/* Bookmarks */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 select-none">Saved Lessons</h3>
                {bookmarkedLessonsList.length > 0 ? (
                  <div className="space-y-3">
                    {bookmarkedLessonsList.map((bm) => (
                      <Link href={`/lessons/${bm.id}`} key={bm.id}>
                        <div className="p-3 bg-white dark:bg-dark border border-[var(--border-color)] rounded-xl flex items-center justify-between hover:border-emerald-400 dark:hover:border-emerald-800 transition cursor-pointer">
                          <span className="text-sm font-semibold text-[var(--text-primary)]">{bm.title}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic text-center py-4">No saved lessons. Click bookmark on lesson pages to add them.</p>
                )}
              </GlassCard>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
