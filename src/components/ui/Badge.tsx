import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'pro' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700 dark:bg-dark-lighter dark:text-gray-300',
  success: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  pro: 'gradient-primary text-white shadow-sm shadow-primary-500/25',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({
  text,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {text}
    </span>
  );
}
