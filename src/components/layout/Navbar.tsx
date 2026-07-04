'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';
import { useTheme } from '@/store/ThemeContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lessons', href: '/lessons' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Community', href: '/community' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-[var(--shadow-color)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📊</span>
            <span className="text-xl font-bold gradient-text">
              Excel Master Academy
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                  hover:text-primary transition-colors rounded-lg hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-lighter text-gray-600 dark:text-gray-300 
                hover:bg-gray-200 dark:hover:bg-dark-light transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Login */}
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 dark:border-dark-lighter 
                text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary 
                dark:hover:border-primary dark:hover:text-primary transition-all"
            >
              Login
            </Link>

            {/* Start Free CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/register"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl gradient-primary text-white 
                  shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Start Free
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-lighter text-gray-600 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-lighter text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden glass-strong border-t border-[var(--border-color)]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 
                      hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary transition-colors"
                  >
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight size={16} className="opacity-40" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl border border-gray-300 dark:border-dark-lighter 
                    text-gray-700 dark:text-gray-300 font-medium hover:border-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl gradient-primary text-white font-semibold 
                    shadow-lg shadow-primary/25"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
