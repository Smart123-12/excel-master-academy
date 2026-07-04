'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none pt-24">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/10">
            <AlertTriangle size={48} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-rose-500 font-mono">
          #N/A Error
        </h1>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-3">
          Page Not Located
        </h2>
        
        {/* Excel themed error joke */}
        <div className="bg-white dark:bg-dark-light border border-[var(--border-color)] px-4 py-2.5 rounded-xl text-xs font-mono text-gray-500 dark:text-gray-400 mt-6 max-w-sm leading-normal shadow-sm">
          =VLOOKUP("page_address", site_index, 1, FALSE) returned <span className="text-rose-500 font-bold">#N/A</span>
        </div>

        <p className="text-sm text-gray-450 dark:text-gray-400 max-w-sm mt-4 leading-relaxed">
          The workbook sheet or cells path you are looking for has either been moved or does not exist.
        </p>

        <div className="flex gap-4 mt-8">
          <Button variant="primary" href="/dashboard">
            Back to Dashboard
          </Button>
          <Button variant="outline" href="/lessons">
            View Lesson Paths
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
