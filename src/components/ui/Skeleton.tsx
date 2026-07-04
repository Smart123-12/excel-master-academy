import React from 'react';

type SkeletonRounded = 'sm' | 'md' | 'lg' | 'full';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: SkeletonRounded;
  className?: string;
}

const roundedStyles: Record<SkeletonRounded, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export default function Skeleton({
  width,
  height,
  rounded = 'md',
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`skeleton ${roundedStyles[rounded]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
