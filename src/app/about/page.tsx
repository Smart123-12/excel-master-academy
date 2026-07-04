'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GlassCard, Button } from '@/components/ui';
import { Award, Compass, Sparkles, BookOpen, Monitor, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const VALUES = [
  {
    icon: <Monitor className="w-6 h-6 text-emerald-500" />,
    title: 'Practice-First',
    description: 'We believe spreadsheet muscle memory is built by typing formulas directly, not sitting through hours of passive video lectures.',
  },
  {
    icon: <Compass className="w-6 h-6 text-emerald-500" />,
    title: 'Gamified Mechanics',
    description: 'We make technical formulas engaging using score counters, daily streak trackers, level badges, and interactive leaderboards.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
    title: 'AI Assisted Learning',
    description: 'We match industry guidance with modern AI utilities, providing instant formula drafts, syntactical explainers, and bug debuggers.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    title: 'Verifiable Credentials',
    description: 'We provide credential proof, helping you export assessor certificates with verifiable unique serial ID parameters.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-dark py-24 px-6 pt-28">
        <div className="max-w-7xl mx-auto w-full space-y-20">
          
          {/* Hero Story Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">Our Mission</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] leading-tight">
                Master Excel by <span className="gradient-text">Practicing</span>, Not Watching
              </h1>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
                Excel Master Academy was founded with a simple objective: to replace boring video courses with an interactive practice environment. 
                Passive learning does not build spreadsheet confidence. 
                Our platform provides a browser-based spreadsheet simulator, letting you practice with real datasets and receive instant feedback.
              </p>
              <div className="flex gap-4">
                <Button variant="primary" href="/lessons">Explore Learning Paths</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl -z-10" />
              <GlassCard className="p-8 border border-emerald-500/10 flex flex-col justify-center text-center py-16">
                <h3 className="text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono mb-2">200,000+</h3>
                <p className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Students Enrolled</p>
                <div className="w-[1px] h-12 bg-gray-200 dark:bg-gray-800 mx-auto my-6" />
                <h3 className="text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono mb-2">1,000+</h3>
                <p className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Practice Challenges</p>
              </GlassCard>
            </div>
          </div>

          {/* Core Values grid */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 select-none">Our Core Values</h2>
              <p className="text-gray-550 dark:text-gray-400 max-w-xl mx-auto text-sm">We structure our features to prioritize interactive learning excellence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUES.map((val, i) => (
                <GlassCard key={i} className="p-6 space-y-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-2xl w-fit">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{val.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{val.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
