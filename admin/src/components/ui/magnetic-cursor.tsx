'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface MagneticCursorProps {
  children?: React.ReactNode;
  magneticFactor?: number;
  blendMode?: 'exclusion' | 'difference' | 'normal' | 'multiply' | 'screen' | string;
  cursorSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function MagneticCursor({
  children,
  magneticFactor = 0.55,
  blendMode = 'exclusion',
  cursorSize = 40,
  className = '',
  style = {},
}: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animId: number;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const target = (e.target as HTMLElement)?.closest('[data-magnetic]') as HTMLElement | null;

      if (target) {
        setIsHovered(true);
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        targetX = centerX + distX * magneticFactor;
        targetY = centerY + distY * magneticFactor;
      } else {
        setIsHovered(false);
        targetX = e.clientX;
        targetY = e.clientY;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.75 : isHovered ? 1.4 : 1
        })`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [magneticFactor, isHovered, isClicking]);

  return (
    <div className={`magnetic-cursor-wrapper relative ${className}`} style={{ width: '100%', minHeight: '100vh', ...style }}>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          mixBlendMode: blendMode as any,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, width 0.3s ease, height 0.3s ease',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}

export default MagneticCursor;
