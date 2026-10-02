'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = '', style = {}, ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        background: 'var(--skeleton-bg, rgba(148, 163, 184, 0.2))',
        borderRadius: '0.375rem',
        animation: 'pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ...style,
      }}
      {...props}
    />
  );
}

export default Skeleton;
