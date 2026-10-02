'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Trophy, Users, Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export interface HeroSectionProps {
  badgeText?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HeroSection({
  badgeText = 'National Robotics Excellence',
  title = 'Autonomous Engineering &',
  titleHighlight = 'Robotics Innovation',
  subtitle = 'Team RAW builds state-of-the-art autonomous robotic systems, competing in top national platforms including ABU Robocon and e-Yantra IIT Bombay.',
  ctaPrimaryText = 'Explore Competitions',
  ctaPrimaryHref = '/competitions',
  ctaSecondaryText = 'Our Team & Robots',
  ctaSecondaryHref = '/robots-gallery',
  className = '',
  style = {},
}: HeroSectionProps) {
  const trustMetrics = [
    { icon: Trophy, value: 'Top 15', label: 'National Rank in Robocon' },
    { icon: Users, value: '200+', label: 'Engineering Minds Mentored' },
    { icon: Award, value: '95/100', label: 'Robocon Stage 1 Score' },
    { icon: ShieldCheck, value: '100%', label: 'In-House Hardware & Software' },
  ];

  return (
    <div
      className={`glassmorphism-hero-section ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
        overflow: 'hidden',
        background: 'var(--bg-main, #090a0f)',
        color: 'var(--text-main, #f8fafc)',
        ...style,
      }}
    >
      {/* Ambient background light glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(225, 6, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '20%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(10, 26, 58, 0.4) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
        }}
      >
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(225, 6, 0, 0.1)',
              border: '1px solid rgba(225, 6, 0, 0.3)',
              color: 'var(--color-red, #E10600)',
              fontSize: '0.85rem',
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            <Sparkles size={16} />
            <span>{badgeText}</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {title}{' '}
            <span
              style={{
                color: 'var(--color-red, #E10600)',
                textShadow: '0 0 30px rgba(225, 6, 0, 0.3)',
              }}
            >
              {titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: '#94a3b8',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '560px',
            }}
          >
            {subtitle}
          </p>

          {/* Key Bullet Points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
            {[
              'Autonomous Navigation & ROS Integration',
              'Custom PCB Design & Microcontroller Systems',
              'Precision Mechanical Design & 3D Prototyping',
            ].map((point, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.925rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-red, #E10600)' }} />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <a
              href={ctaPrimaryHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.85rem',
                borderRadius: '0.75rem',
                background: 'var(--color-red, #E10600)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(225, 6, 0, 0.35)',
                transition: 'all 0.25s ease',
              }}
            >
              <span>{ctaPrimaryText}</span>
              <ArrowRight size={18} />
            </a>

            <a
              href={ctaSecondaryHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.85rem 1.85rem',
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
              }}
            >
              {ctaSecondaryText}
            </a>
          </div>
        </motion.div>

        {/* Right Glassmorphism Trust Cards Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}
        >
          {trustMetrics.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '1.25rem',
                padding: '1.75rem 1.25rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '0.75rem',
                  background: 'rgba(225, 6, 0, 0.15)',
                  color: 'var(--color-red, #E10600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <item.icon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem', lineHeight: 1.4 }}>
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
