'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "This platform completely transformed how I learn Excel. The hands-on practice exercises are 10x more effective than boring video courses. Highly recommended!",
    author: "Sarah Chen",
    role: "Data Analyst at TechCorp",
    initials: "SC",
    color: "bg-emerald-500",
  },
  {
    quote: "I went from an Excel beginner who didn't know cell references to building interactive financial models in 3 months. The badges and streak mechanics are extremely addictive.",
    author: "Marcus Williams",
    role: "Financial Analyst",
    initials: "MW",
    color: "bg-blue-500",
  },
  {
    quote: "The interactive validation is incredible. I write my IF or VLOOKUP formula, submit, and see if it calculated correctly instantly. It really builds muscle memory.",
    author: "Priya Patel",
    role: "Business School Student",
    initials: "PP",
    color: "bg-amber-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
          Loved by Excel Learners
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Join thousands of students, analysts, and professionals who have leveled up their spreadsheet skills.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {TESTIMONIALS.map((t, idx) => (
          <motion.div key={idx} variants={cardVariants}>
            <GlassCard className="h-full flex flex-col justify-between p-8">
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed text-sm">
                  "{t.quote}"
                </p>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-4 mt-8 border-t border-[var(--border-color)] pt-6">
                <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm shadow-sm select-none`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">
                    {t.author}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
