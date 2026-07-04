'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: '0 8px 40px rgba(16, 185, 129, 0.12)',
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
