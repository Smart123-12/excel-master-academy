'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
import { Monitor, Map, CheckCircle2, Sparkles, Trophy, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: <Monitor className="w-6 h-6 text-emerald-500" />,
    title: 'Interactive Excel Simulator',
    description: 'Learn by doing in our fully-functional browser spreadsheet simulator. No installation required.',
  },
  {
    icon: <Map className="w-6 h-6 text-emerald-500" />,
    title: 'Guided Learning Paths',
    description: 'Structured step-by-step tracks for beginners, intermediate users, and advanced pros.',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
    title: 'Instant Answer Validation',
    description: 'Type formulas and see immediate feedback. Know exactly where you made a mistake.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
    title: 'AI Formula Assistants',
    description: 'Generate formulas from descriptions, get detailed explanations, and debug errors instantly with AI.',
  },
  {
    icon: <Trophy className="w-6 h-6 text-emerald-500" />,
    title: 'Gamified Experience',
    description: 'Earn XP, collect coins, complete weekly challenges, and climb the leaderboard as you learn.',
  },
  {
    icon: <Award className="w-6 h-6 text-emerald-500" />,
    title: 'Professional Certificates',
    description: 'Verify your achievements. Download shareable PDF certificates to boost your LinkedIn profile.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } },
} as const;

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
          Everything You Need to <span className="gradient-text">Excel</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Excel Master Academy matches standard spreadsheet mechanics with professional guidance and gamification.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {FEATURES.map((feat, idx) => (
          <motion.div key={idx} variants={cardVariants}>
            <GlassCard className="h-full flex flex-col items-start gap-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {feat.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {feat.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
