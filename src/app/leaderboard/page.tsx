'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { leaderboard, mockUser } from '@/data';
import { GlassCard, Avatar, Badge } from '@/components/ui';
import { Trophy, Search, Flame, Zap, Award, Star } from 'lucide-react';

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  const filteredLeaderboard = useMemo(() => {
    return leaderboard.filter((entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Top 3 Podium entries
  const podium = useMemo(() => {
    const sorted = [...leaderboard].sort((a, b) => b.xp - a.xp);
    return {
      first: sorted[0],
      second: sorted[1],
      third: sorted[2],
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
              Global <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Compete with Excel learners worldwide, write correct formulas, maintain streaks, and climb the ranks.
            </p>
          </div>

          {/* Top 3 Podium visualization */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-10 pt-10 select-none">
            {/* Second place */}
            {podium.second && (
              <div className="flex flex-col items-center order-2 md:order-1">
                <div className="relative mb-4">
                  <Avatar src="" name={podium.second.name} size="lg" />
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700 shadow shadow-slate-400 font-mono">
                    2
                  </div>
                </div>
                <div className="bg-slate-100 dark:bg-dark-light/60 border border-slate-200 dark:border-slate-800 w-36 h-28 rounded-t-3xl flex flex-col items-center justify-center text-center shadow-md">
                  <span className="font-bold text-[var(--text-primary)] text-sm">{podium.second.name}</span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-1">{podium.second.xp} XP</span>
                </div>
              </div>
            )}

            {/* First place */}
            {podium.first && (
              <div className="flex flex-col items-center order-1 md:order-2">
                <div className="relative mb-4 scale-110">
                  <Avatar src="" name={podium.first.name} size="lg" />
                  <div className="absolute -top-4 -left-3 w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-900 shadow shadow-amber-500 animate-bounce">
                    👑
                  </div>
                </div>
                <div className="bg-emerald-500/10 dark:bg-emerald-950/20 border-2 border-emerald-500 w-44 h-36 rounded-t-3xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                  <div className="absolute -right-3 -top-3 text-emerald-500 opacity-20">
                    <Trophy size={80} />
                  </div>
                  <span className="font-extrabold text-[var(--text-primary)] text-base">{podium.first.name}</span>
                  <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">{podium.first.xp} XP</span>
                </div>
              </div>
            )}

            {/* Third place */}
            {podium.third && (
              <div className="flex flex-col items-center order-3">
                <div className="relative mb-4">
                  <Avatar src="" name={podium.third.name} size="lg" />
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-amber-650 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-900 shadow font-mono">
                    3
                  </div>
                </div>
                <div className="bg-amber-100/30 dark:bg-dark-light/40 border border-amber-200/50 dark:border-amber-900/10 w-36 h-24 rounded-t-3xl flex flex-col items-center justify-center text-center shadow-md">
                  <span className="font-bold text-[var(--text-primary)] text-sm">{podium.third.name}</span>
                  <span className="text-xs font-mono font-bold text-amber-700 mt-1">{podium.third.xp} XP</span>
                </div>
              </div>
            )}
          </div>

          {/* Search and Time Filters bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-dark-light p-4 rounded-3xl border border-[var(--border-color)]">
            {/* Search inputs */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search competitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] shadow-inner"
              />
            </div>

            {/* Time select filter buttons */}
            <div className="flex gap-2">
              {(['weekly', 'monthly', 'all-time'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase border transition
                    ${timeFilter === filter 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow'
                      : 'bg-white dark:bg-dark border-[var(--border-color)] text-gray-500 hover:text-emerald-500'}`}
                >
                  {filter.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table List */}
          <div className="bg-white dark:bg-dark-light border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-gray-50 dark:bg-dark select-none text-gray-400 font-bold">
                    <th className="px-6 py-4 w-20 text-center">Rank</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4 text-center">Level</th>
                    <th className="px-6 py-4 text-center">Streak</th>
                    <th className="px-6 py-4 text-center">Completed</th>
                    <th className="px-6 py-4 text-center">XP Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {filteredLeaderboard.map((entry) => {
                    const isCurrentUser = entry.userId === mockUser.id;

                    return (
                      <tr 
                        key={entry.userId}
                        className={`hover:bg-gray-50/50 dark:hover:bg-dark/20 transition
                          ${isCurrentUser ? 'bg-emerald-50/30 dark:bg-emerald-950/10 font-bold border-l-4 border-l-emerald-500' : ''}`}
                      >
                        <td className="px-6 py-4 text-center font-mono font-bold text-[var(--text-primary)]">
                          {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar src={entry.avatar} name={entry.name} size="sm" />
                            <span className="text-[var(--text-primary)] font-semibold">{entry.name}</span>
                            {isCurrentUser && (
                              <Badge text="YOU" variant="success" size="sm" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-[var(--text-primary)]">
                          {entry.level}
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-amber-600 font-bold">
                          <span className="flex items-center justify-center gap-1">
                            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {entry.streak}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                          {entry.lessonsCompleted} lessons
                        </td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {entry.xp} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
