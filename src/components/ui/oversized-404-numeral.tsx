'use client';

import React from 'react';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

export interface ErrorBlockProps {
  errorCode?: string;
  title?: string;
  description?: string;
  homeLink?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ErrorBlock({
  errorCode = '404',
  title = 'Page Not Found',
  description = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
  homeLink = '/',
  className = '',
  style = {},
}: ErrorBlockProps) {
  return (
    <div
      className={`error-block ${className}`}
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        background: 'var(--bg-main, #ffffff)',
        color: 'var(--text-main, #0f172a)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(225, 6, 0, 0.12), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', width: '100%' }}>
        {/* Warning Icon Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(225, 6, 0, 0.08)',
            border: '1px solid rgba(225, 6, 0, 0.2)',
            color: 'var(--color-red, #E10600)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          <AlertTriangle size={16} />
          <span>System Alert</span>
        </div>

        {/* Oversized Numeral */}
        <h1
          style={{
            fontSize: 'clamp(6rem, 15vw, 11rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            margin: '0 0 1rem',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(180deg, var(--color-red, #E10600) 0%, rgba(225, 6, 0, 0.3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(225, 6, 0, 0.2)',
          }}
        >
          {errorCode}
        </h1>

        {/* Title */}
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800,
            margin: '0 0 0.75rem',
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: 1.6,
            margin: '0 auto 2rem',
            maxWidth: '480px',
          }}
        >
          {description}
        </p>

        {/* Button Group */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.65rem',
              background: 'transparent',
              border: '1px solid var(--border, rgba(15, 23, 42, 0.15))',
              color: 'var(--text-main, #0f172a)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <a
            href={homeLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.65rem',
              background: 'var(--color-red, #E10600)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(225, 6, 0, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            <Home size={18} />
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorBlock;
