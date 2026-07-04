'use client';

import React, { useEffect, useRef } from 'react';
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  motion,
} from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const rounded = useTransform(motionValue, (latest) => {
    const num = Math.round(latest);
    return num.toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
