'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Monitor, Trophy } from 'lucide-react';

const STEPS = [
  {
    icon: <BookOpen className="w-8 h-8 text-white" />,
    step: '01',
    title: 'Choose a Topic',
    description: 'Select a lesson from our comprehensive learning tracks. From simple formulas to advanced data cleaning.',
  },
  {
    icon: <Monitor className="w-8 h-8 text-white" />,
    step: '02',
    title: 'Practice in Simulator',
    description: 'Write formulas directly inside our browser-based simulator. Complete challenges using real-world datasets.',
  },
  {
    icon: <Trophy className="w-8 h-8 text-white" />,
    step: '03',
    title: 'Earn & Level Up',
    description: 'Get instant feedback on your answers. Earn XP points, unlock badges, and track your learning streak.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } },
} as const;

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50/50 dark:bg-dark/40 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Mastering Microsoft Excel has never been this interactive and straightforward.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Connector Line (Desktop) */}
          <div className="absolute top-[4.5rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-100 dark:from-emerald-950 dark:via-emerald-700 dark:to-emerald-950 -z-10 hidden lg:block" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center px-4"
              variants={stepVariants}
            >
              {/* Step Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center shadow-lg shadow-emerald-500/20 z-10 relative">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 border-2 border-white dark:border-dark-light flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm font-mono">
                  {step.step}
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
