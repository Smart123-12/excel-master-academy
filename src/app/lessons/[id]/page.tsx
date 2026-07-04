'use client';

import React, { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { lessons, exercises } from '@/data';
import { Badge, Button, GlassCard } from '@/components/ui';
import { ArrowLeft, Clock, Award, BookOpen, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LessonDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Lesson Not Found</h1>
          <p className="text-gray-500 mt-2">The requested lesson path could not be located.</p>
          <Button variant="primary" className="mt-4" href="/lessons">Back to Paths</Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Find exercises for this lesson
  const lessonExercises = exercises.filter((ex) => ex.lessonId === lesson.id);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full">
          {/* Back btn */}
          <Link href="/lessons" className="flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Paths
          </Link>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Info */}
              <div className="bg-white dark:bg-dark-light p-8 rounded-3xl border border-[var(--border-color)] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                    {lesson.icon}
                  </div>
                  <div className="flex gap-2">
                    {lesson.isPro && <Badge text="PRO" variant="pro" />}
                    <Badge 
                      text={lesson.difficulty} 
                      variant={lesson.difficulty === 'beginner' ? 'success' : lesson.difficulty === 'intermediate' ? 'warning' : 'danger'} 
                    />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
                  {lesson.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {lesson.description}
                </p>

                {/* Topics Pills */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.topics.map((t, idx) => (
                      <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-dark text-xs font-semibold text-gray-600 dark:text-gray-300 border border-[var(--border-color)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exercises List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-emerald-500" />
                  Practice Exercises ({lessonExercises.length})
                </h2>

                {lessonExercises.map((ex, idx) => (
                  <Link href={`/exercise/${ex.id}`} key={ex.id}>
                    <div className="flex items-center justify-between p-5 bg-white dark:bg-dark-light rounded-2xl border border-[var(--border-color)] hover:border-emerald-400 dark:hover:border-emerald-800 hover:shadow-md hover:scale-101 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--text-primary)] text-base group-hover:text-emerald-500">
                            {ex.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">{ex.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg">
                          +{ex.xpReward} XP
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Stats Panel */}
            <div className="space-y-6">
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-color)] pb-4">
                  Lesson Summary
                </h3>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">{lesson.duration}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Exercises
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">{lesson.exerciseCount} total</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Completion Reward
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">+{lesson.xpReward} XP</span>
                  </li>
                </ul>

                {lessonExercises.length > 0 ? (
                  <Button 
                    variant="primary" 
                    className="w-full justify-center" 
                    href={`/exercise/${lessonExercises[0].id}`}
                  >
                    Start First Exercise
                  </Button>
                ) : (
                  <Button variant="primary" className="w-full justify-center" disabled>
                    No Exercises Available
                  </Button>
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
