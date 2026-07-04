'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  color?: string;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  value,
  color = 'primary',
  size = 'md',
  showLabel = false,
  label,
  className = '',
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const clampedValue = Math.min(100, Math.max(0, value));

  const barColorClass =
    color === 'primary'
      ? 'gradient-primary'
      : color === 'accent'
        ? 'bg-accent'
        : color === 'danger'
          ? 'bg-red-500'
          : color === 'warning'
            ? 'bg-amber-500'
            : `bg-${color}-500`;

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full bg-gray-200 dark:bg-dark-lighter overflow-hidden ${sizeStyles[size]}`}
      >
        <motion.div
          className={`h-full rounded-full ${barColorClass}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${clampedValue}%` } : { width: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
}
