'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 px-6 text-center max-w-7xl mx-auto w-full">
      {/* Outer border & shadow wrapper */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-800 rounded-3xl -z-10 shadow-2xl shadow-emerald-500/20" />
      
      {/* Decorative vector overlays */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Ready to Master Excel?
        </h2>
        <p className="text-emerald-50 dark:text-emerald-100/90 text-lg mb-10 max-w-xl leading-relaxed">
          Join over 200,000+ students and professionals today. Start building your data analysis and formula writing skills immediately.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Button 
            variant="ghost" 
            className="bg-white text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 shadow-lg px-8 py-3 rounded-full font-bold text-base"
            href="/register"
          >
            Start Learning Free
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-base"
            href="/pricing"
          >
            View Pricing Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
