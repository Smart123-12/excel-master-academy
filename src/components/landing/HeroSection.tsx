'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

const floatingFormulas = [
  { text: 'SUM', x: '75%', y: '20%', delay: 0 },
  { text: 'VLOOKUP', x: '85%', y: '45%', delay: 0.5 },
  { text: 'IF', x: '70%', y: '65%', delay: 1 },
  { text: 'XLOOKUP', x: '90%', y: '70%', delay: 1.5 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as any },
  },
} as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                  bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 
                  border border-primary-200 dark:border-primary-800/50"
              >
                <Sparkles size={14} className="text-primary" />
                🚀 The #1 Interactive Excel Learning Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight 
                text-gray-900 dark:text-white mb-6"
            >
              Master{' '}
              <span className="gradient-text">Excel</span>
              <br />
              by Practicing,
              <br />
              Not Watching
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              Stop watching endless tutorials. Practice real Excel formulas in our
              interactive simulator, get instant feedback, and level up your
              skills faster than ever before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl 
                    gradient-primary text-white font-semibold text-lg shadow-xl shadow-primary/25 
                    hover:shadow-2xl hover:shadow-primary/30 transition-all group"
                >
                  Start Learning Free
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl 
                    border-2 border-gray-300 dark:border-dark-lighter text-gray-700 dark:text-gray-300 
                    font-semibold text-lg hover:border-primary hover:text-primary 
                    dark:hover:border-primary dark:hover:text-primary transition-all group"
                >
                  <Play
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicator */}
            <motion.p
              variants={itemVariants}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="text-lg">✨</span>
              Join{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                200,000+
              </span>{' '}
              learners worldwide
            </motion.p>
          </motion.div>

          {/* Right Side — Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Main Formula Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative glass-card rounded-2xl p-6 shadow-2xl max-w-md mx-auto"
            >
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400 font-mono">
                  formula_bar.xlsx
                </span>
              </div>

              {/* Formula Display */}
              <div className="bg-gray-50 dark:bg-dark rounded-xl p-4 mb-4 font-mono text-sm border border-gray-200 dark:border-dark-lighter">
                <span className="text-gray-400">fx</span>{' '}
                <span className="text-gray-500">=</span>
                <span className="text-blue-600 dark:text-blue-400">VLOOKUP</span>
                <span className="text-gray-600 dark:text-gray-300">(</span>
                <span className="text-orange-600 dark:text-orange-400">A2</span>
                <span className="text-gray-600 dark:text-gray-300">,</span>
                <span className="text-purple-600 dark:text-purple-400">
                  Data!$B:$D
                </span>
                <span className="text-gray-600 dark:text-gray-300">,</span>
                <span className="text-primary">3</span>
                <span className="text-gray-600 dark:text-gray-300">,</span>
                <span className="text-red-500">FALSE</span>
                <span className="text-gray-600 dark:text-gray-300">)</span>
              </div>

              {/* Mini Spreadsheet Grid */}
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-lighter">
                <div className="grid grid-cols-4 text-xs">
                  {/* Header row */}
                  <div className="bg-gray-100 dark:bg-dark-lighter px-3 py-2 font-semibold text-gray-500 border-b border-r border-gray-200 dark:border-dark-lighter" />
                  <div className="bg-gray-100 dark:bg-dark-lighter px-3 py-2 font-semibold text-gray-500 border-b border-r border-gray-200 dark:border-dark-lighter text-center">
                    A
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-lighter px-3 py-2 font-semibold text-gray-500 border-b border-r border-gray-200 dark:border-dark-lighter text-center">
                    B
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-lighter px-3 py-2 font-semibold text-gray-500 border-b border-gray-200 dark:border-dark-lighter text-center">
                    C
                  </div>
                  {/* Data rows */}
                  {[
                    ['1', 'ID', 'Name', 'Sales'],
                    ['2', 'E003', 'Charlie', '$1,200'],
                    ['3', 'E001', 'Alice', '$980'],
                  ].map((row, i) => (
                    <>{row.map((cell, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={`px-3 py-2 border-b border-r border-gray-200 dark:border-dark-lighter last:border-r-0 
                          ${j === 0 ? 'bg-gray-50 dark:bg-dark-lighter font-semibold text-gray-400' : ''} 
                          ${i === 1 && j > 0 ? 'bg-primary-50/50 dark:bg-primary-900/20 text-gray-700 dark:text-gray-200' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        {cell}
                      </div>
                    ))}</>
                  ))}
                </div>
              </div>

              {/* Result Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl gradient-primary text-white 
                  text-sm font-semibold shadow-lg shadow-primary/30 flex items-center gap-1"
              >
                ✓ Result: $1,200
              </motion.div>
            </motion.div>

            {/* Floating Formula Badges */}
            {floatingFormulas.map((formula, index) => (
              <motion.div
                key={formula.text}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2, type: 'spring' }}
                className="absolute animate-float"
                style={{
                  left: formula.x,
                  top: formula.y,
                  animationDelay: `${formula.delay}s`,
                }}
              >
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-semibold glass-card 
                    text-primary border border-primary/20 shadow-lg whitespace-nowrap"
                >
                  {formula.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
