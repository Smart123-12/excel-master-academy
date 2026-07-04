import React from 'react';
import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  level?: number;
  showLevel?: boolean;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; px: number }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs', px: 32 },
  md: { container: 'w-10 h-10', text: 'text-sm', px: 40 },
  lg: { container: 'w-14 h-14', text: 'text-lg', px: 56 },
  xl: { container: 'w-20 h-20', text: 'text-2xl', px: 80 },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({
  src,
  name,
  size = 'md',
  level,
  showLevel = false,
  className = '',
}: AvatarProps) {
  const sizeConfig = sizeStyles[size];
  const displayLevel = showLevel && typeof level === 'number';

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={name}
          width={sizeConfig.px}
          height={sizeConfig.px}
          className={`${sizeConfig.container} rounded-full object-cover ring-2 ring-white dark:ring-dark-light`}
        />
      ) : (
        <div
          className={`${sizeConfig.container} rounded-full gradient-primary flex items-center justify-center ring-2 ring-white dark:ring-dark-light`}
        >
          <span className={`${sizeConfig.text} font-semibold text-white`}>
            {getInitials(name)}
          </span>
        </div>
      )}

      {displayLevel && (
        <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-accent text-[10px] font-bold text-white ring-2 ring-white dark:ring-dark-light">
          {level}
        </span>
      )}
    </div>
  );
}
