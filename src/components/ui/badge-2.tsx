'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  children,
  className = '',
  style = {},
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: 'var(--color-red, #E10600)',
      color: '#ffffff',
    },
    primary: {
      background: 'var(--color-red, #E10600)',
      color: '#ffffff',
    },
    secondary: {
      background: 'var(--card-bg, #f1f5f9)',
      color: 'var(--text-main, #0f172a)',
      border: '1px solid var(--border, #cbd5e1)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-main, #0f172a)',
      border: '1px solid var(--border, rgba(15, 23, 42, 0.25))',
    },
    destructive: {
      background: 'rgba(239, 68, 68, 0.12)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    success: {
      background: 'rgba(34, 197, 94, 0.12)',
      color: '#16a34a',
      border: '1px solid rgba(34, 197, 94, 0.3)',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.12)',
      color: '#d97706',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
    info: {
      background: 'rgba(59, 130, 246, 0.12)',
      color: '#2563eb',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`badge-item ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.65rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        ...selectedVariant,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
