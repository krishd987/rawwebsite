'use client';

import React from 'react';

export interface LoaderSkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function LoaderSkeleton({
  width = '100%',
  height = '20px',
  borderRadius = '0.5rem',
  className = '',
  style = {},
}: LoaderSkeletonProps) {
  const formattedWidth = typeof width === 'number' ? `${width}px` : width;
  const formattedHeight = typeof height === 'number' ? `${height}px` : height;
  const formattedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return (
    <div
      className={`loader-skeleton-pulse ${className}`}
      style={{
        width: formattedWidth,
        height: formattedHeight,
        borderRadius: formattedRadius,
        background: 'linear-gradient(90deg, rgba(148, 163, 184, 0.15) 25%, rgba(148, 163, 184, 0.3) 50%, rgba(148, 163, 184, 0.15) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.5s infinite linear',
        ...style,
      }}
    />
  );
}

export default LoaderSkeleton;
