'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  words?: string[];
  ctaPrimary?: { text: string; href?: string; onClick?: () => void };
  ctaSecondary?: { text: string; href?: string; onClick?: () => void };
}

export function Hero({
  title = "Building the Next Generation of",
  subtitle = "Team RAW Admin Portal — Manage website content, team data, updates, and telemetry.",
  words = ["Robotics", "Automation", "Intelligence", "Innovation"],
  ctaPrimary = { text: "Dashboard", href: "/admin/dashboard" },
  ctaSecondary = { text: "Manage Team", href: "/admin/team" },
}: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        overflow: 'hidden',
        background: 'var(--bg-main, #ffffff)',
        color: 'var(--text-main, #0f172a)',
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(225, 6, 0, 0.15), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', width: '100%' }}>
        {/* Top Tag / Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(225, 6, 0, 0.08)',
            border: '1px solid rgba(225, 6, 0, 0.2)',
            color: 'var(--color-red, #E10600)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          <Sparkles size={16} />
          <span>Team RAW Admin Panel</span>
        </motion.div>

        {/* Main Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 1.5rem',
          }}
        >
          {title}{' '}
          <span
            style={{
              display: 'inline-block',
              position: 'relative',
              color: 'var(--color-red, #E10600)',
              minWidth: '220px',
              textAlign: 'left',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 90 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'inline-block' }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <a
            href={ctaPrimary.href}
            onClick={ctaPrimary.onClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              borderRadius: '0.75rem',
              background: 'var(--color-red, #E10600)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(225, 6, 0, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <span>{ctaPrimary.text}</span>
            <ArrowRight size={18} />
          </a>

          <a
            href={ctaSecondary.href}
            onClick={ctaSecondary.onClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.85rem 1.75rem',
              borderRadius: '0.75rem',
              background: 'transparent',
              color: 'var(--text-main, #0f172a)',
              border: '1px solid var(--border, rgba(15, 23, 42, 0.15))',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
              cursor: 'pointer',
            }}
          >
            {ctaSecondary.text}
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
