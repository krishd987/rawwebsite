'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import KineticGrid from '@/components/ui/kinetic-grid';

export interface TopFadeGridProps {
  className?: string;
  gridColor?: string;
  sizeX?: number | string;
  sizeY?: number | string;
  ellipseX?: string;
  ellipseY?: string;
  originY?: string;
  opacity?: number;
  zIndex?: number;
  showOverlay?: boolean;
  overlayStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function TopFadeGrid({
  className = '',
  gridColor = 'var(--grid-color, rgba(225, 6, 0, 0.08))',
  opacity = 1,
  zIndex = 0,
  showOverlay = true,
  overlayStyle = {},
  style = {},
  children,
}: TopFadeGridProps) {
  return (
    <div
      className={cn('top-fade-grid-container', className)}
      style={{
        position: 'relative',
        width: '100%',
        zIndex,
        ...style,
      }}
    >
      <KineticGrid gridColor={gridColor} style={{ minHeight: '100%' }}>
        {showOverlay && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'var(--grid-overlay, radial-gradient(ellipse 85% 65% at 50% 10%, transparent 20%, rgba(248, 249, 250, 0.7) 75%, var(--bg-main, #ffffff) 100%))',
              opacity,
              ...overlayStyle,
            }}
          />
        )}
        {children}
      </KineticGrid>
    </div>
  );
}
