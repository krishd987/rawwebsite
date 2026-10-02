'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Trophy, Image as ImageIcon, HeartHandshake, Mail, UserPlus, Sparkles } from 'lucide-react';

export interface FloatingMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DEFAULT_ITEMS: FloatingMenuItem[] = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  { label: 'Team', href: '/team', icon: <Users size={18} /> },
  { label: 'Competitions', href: '/competitions', icon: <Trophy size={18} /> },
  { label: 'Gallery', href: '/gallery', icon: <ImageIcon size={18} /> },
  { label: 'Sponsors', href: '/sponsors', icon: <HeartHandshake size={18} /> },
  { label: 'Contact', href: '/contact', icon: <Mail size={18} /> },
  { label: 'Register', href: '/register', icon: <UserPlus size={18} /> },
];

export function LiquidMorphFloatingMenu({ items = DEFAULT_ITEMS }: { items?: FloatingMenuItem[] }) {
  const pathname = usePathname();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      {/* Morphing Liquid Glow Effect behind bar */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(225, 6, 0, 0.35) 0%, rgba(13, 74, 188, 0.25) 50%, transparent 80%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Menu Container */}
      <nav
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(225, 6, 0, 0.2)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 0 20px rgba(225, 6, 0, 0.1)',
        }}
      >
        {items.map((item, idx) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredIdx === idx;

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              data-magnetic
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 0.85rem',
                borderRadius: '9999px',
                color: isActive || isHovered ? 'var(--color-red, #E10600)' : '#475569',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                zIndex: 1,
              }}
            >
              {/* Active/Hover Background Bubble */}
              {(isActive || isHovered) && (
                <motion.div
                  layoutId="activeFloatingTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    background: isActive
                      ? 'rgba(225, 6, 0, 0.12)'
                      : 'rgba(10, 26, 58, 0.06)',
                    border: isActive ? '1px solid rgba(225, 6, 0, 0.3)' : '1px solid transparent',
                    zIndex: -1,
                  }}
                />
              )}

              <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>

              {/* Text label with layout animation */}
              <motion.span
                animate={{ width: isHovered || isActive ? 'auto' : 'auto' }}
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default LiquidMorphFloatingMenu;
