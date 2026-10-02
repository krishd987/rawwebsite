'use client';

import React, { useState, useRef } from 'react';
import { Bot } from 'lucide-react';

export interface GlowCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  spotlightColor?: string;
  title?: string;
  description?: string;
  style?: React.CSSProperties;
}

export function GlowCard({
  children,
  className = '',
  glowColor,
  spotlightColor,
  title = 'Robotics Innovation',
  description = 'Empowering autonomous robotics systems with cutting-edge engineering and research.',
  style = {},
}: GlowCardProps) {
  const activeGlowColor = spotlightColor || glowColor || 'rgba(225, 6, 0, 0.12)';
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glow-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        padding: '2rem',
        background: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--border, rgba(10, 26, 58, 0.12))',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.12), 0 0 20px rgba(225, 6, 0, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        ...style,
      }}
    >
      {/* Spotlight Radial Background Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${activeGlowColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children ? (
          children
        ) : (
          <>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.75rem',
                background: 'rgba(225, 6, 0, 0.1)',
                color: 'var(--color-red, #E10600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Bot size={20} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>{title}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>{description}</p>
          </>
        )}
      </div>
    </div>
  );
}

export { GlowCard as SpotlightCard };
export default GlowCard;
