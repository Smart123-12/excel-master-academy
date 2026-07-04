'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { lessons } from '@/data';
import { GlassCard, Badge, Tabs } from '@/components/ui';
import { BookOpen, Search, ArrowRight, Lock, Award, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LessonsPage() {
  const [activeDifficulty, setActiveDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesDifficulty = lesson.difficulty === activeDifficulty;
      const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
      return matchesDifficulty && matchesSearch && matchesCategory;
    });
  }, [activeDifficulty, searchQuery, selectedCategory]);

  // Categories list
  const categories = useMemo(() => {
    const list = new Set(lessons.filter(l => l.difficulty === activeDifficulty).map(l => l.category));
    return ['All', ...Array.from(list)];
  }, [activeDifficulty]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
              Learning <span className="gradient-text">Paths</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Structured step-by-step curriculum to take you from a complete beginner to an advanced data master.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 bg-white/70 dark:bg-dark-light/50 p-4 rounded-3xl border border-[var(--border-color)] backdrop-blur shadow-sm">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] shadow-inner"
              />
            </div>

            {/* Tabs for Difficulty */}
            <div className="w-full md:w-auto">
              <Tabs
                activeTab={activeDifficulty}
                onTabChange={(id) => {
                  setActiveDifficulty(id as any);
                  setSelectedCategory('All');
                }}
                tabs={[
                  { id: 'beginner', label: 'Beginner Path' },
                  { id: 'intermediate', label: 'Intermediate Path' },
                  { id: 'advanced', label: 'Advanced Path' },
                ]}
              />
            </div>
          </div>

          {/* Categories Horizontal Selector */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200
                  ${selectedCategory === cat
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow'
                    : 'bg-white dark:bg-dark border-[var(--border-color)] text-gray-500 hover:text-emerald-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLessons.map((lesson) => (
                <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
                  <GlassCard className="h-full flex flex-col justify-between hover:scale-102 transition-all duration-300 relative group cursor-pointer overflow-hidden border border-gray-150/80 dark:border-gray-800">
                    <div>
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                          {lesson.icon}
                        </div>
                        <div className="flex gap-1.5 items-center">
                          {lesson.isPro && (
                            <Badge text="PRO" variant="pro" size="sm" />
                          )}
                          <Badge 
                            text={lesson.difficulty} 
                            variant={lesson.difficulty === 'beginner' ? 'success' : lesson.difficulty === 'intermediate' ? 'warning' : 'danger'}
                            size="sm"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-emerald-500 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                        {lesson.description}
                      </p>
                    </div>

                    {/* Stats & Progress footer */}
                    <div className="border-t border-[var(--border-color)] pt-4 mt-6">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {lesson.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {lesson.exerciseCount} exercises
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-dark-light rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${(lesson.completedCount / lesson.exerciseCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white/50 dark:bg-dark-light/20 rounded-3xl border border-dashed border-[var(--border-color)]">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">No lessons found matching your filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
