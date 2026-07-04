'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'gradient-primary text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40',
  secondary:
    'bg-dark text-white hover:bg-dark-light dark:bg-dark-lighter dark:hover:bg-dark-light',
  outline:
    'border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10 dark:border-primary-400 dark:text-primary-400',
  ghost:
    'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-lighter',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-base gap-2',
  lg: 'px-8 py-3 text-lg gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  href,
  icon,
  loading = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const motionProps: HTMLMotionProps<'button'> = {
    whileHover: disabled ? undefined : { scale: 1.03 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  const content = (
    <>
      {loading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        <motion.span
          className="inline-flex items-center justify-center gap-inherit w-full"
          {...motionProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
