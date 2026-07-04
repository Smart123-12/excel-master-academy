'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Button } from '@/components/ui';
import { AlertCircle, HelpCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Redirect to dashboard on login
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-dark dark:to-dark-light px-6 py-12 font-sans relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <GlassCard className="p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8 select-none">
            <Link href="/" className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
              📊 Excel <span className="gradient-text">Master</span>
            </Link>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mt-3">Welcome Back!</h2>
            <p className="text-xs text-gray-400 mt-1">Login to resume your Excel practice paths</p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-150 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase block mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-gray-400 font-bold uppercase block">Password</label>
                <Link href="#" className="text-xs text-emerald-600 dark:text-emerald-450 hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-dark border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-primary)] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button variant="primary" type="submit" className="w-full justify-center py-3 font-bold mt-2">
              Sign In
            </Button>
          </form>

          {/* Social login divider */}
          <div className="relative my-6 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-color)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-dark-light px-3 text-gray-400 font-semibold">Or Sign In With</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center justify-center gap-2 py-2.5 border border-[var(--border-color)] hover:border-emerald-400 hover:bg-emerald-50/10 rounded-xl transition text-xs font-semibold text-[var(--text-primary)]"
            >
              Google
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center justify-center gap-2 py-2.5 border border-[var(--border-color)] hover:border-emerald-400 hover:bg-emerald-50/10 rounded-xl transition text-xs font-semibold text-[var(--text-primary)]"
            >
              Github
            </button>
          </div>

          <p className="text-xs text-center text-gray-400 mt-8">
            Don't have an account?{' '}
            <Link href="/register" className="text-emerald-600 dark:text-emerald-450 hover:underline font-bold">Sign Up Free</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
