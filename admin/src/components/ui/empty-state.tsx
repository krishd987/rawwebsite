'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icons?: LucideIcon[];
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

export function EmptyState({
  title,
  description,
  icons = [],
  action,
  className = '',
  style = {},
}: EmptyStateProps) {
  return (
    <div
      className={`empty-state-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 2rem',
        borderRadius: '1.25rem',
        border: '2px dashed var(--border, rgba(225, 6, 0, 0.25))',
        background: 'var(--card-bg, rgba(255, 255, 255, 0.6))',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '36rem',
        margin: '1.5rem auto',
        ...style,
      }}
    >
      {/* Stacked Floating Icons */}
      {icons.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', gap: '-0.5rem' }}>
          {icons.map((Icon, idx) => (
            <div
              key={idx}
              style={{
                width: '3.25rem',
                height: '3.25rem',
                borderRadius: '1rem',
                background: idx === 0 ? 'rgba(225, 6, 0, 0.1)' : 'rgba(13, 74, 188, 0.08)',
                border: '1px solid rgba(225, 6, 0, 0.2)',
                color: idx === 0 ? 'var(--color-red, #E10600)' : '#0D4ABC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                marginLeft: idx > 0 ? '-0.75rem' : '0',
                transform: `rotate(${(idx - (icons.length - 1) / 2) * 8}deg)`,
                zIndex: icons.length - idx,
              }}
            >
              <Icon size={22} />
            </div>
          ))}
        </div>
      )}

      {/* Title */}
      <h3
        style={{
          margin: '0 0 0.5rem',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary, #0f172a)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          style={{
            margin: '0 0 1.5rem',
            fontSize: '0.9rem',
            color: '#64748b',
            lineHeight: 1.6,
            maxWidth: '28rem',
          }}
        >
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        action.href ? (
          <a
            href={action.href}
            data-magnetic
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.65rem 1.25rem',
              borderRadius: '0.65rem',
              background: 'var(--color-red, #E10600)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(225, 6, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            data-magnetic
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.65rem 1.25rem',
              borderRadius: '0.65rem',
              background: 'var(--color-red, #E10600)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(225, 6, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}

export default EmptyState;
