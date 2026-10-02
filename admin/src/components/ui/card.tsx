'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className = '', children, style = {}, ...props }: CardProps) {
  return (
    <div
      className={`ui-card ${className}`}
      style={{
        borderRadius: '0.85rem',
        border: '1px solid var(--border, rgba(15, 23, 42, 0.12))',
        background: 'var(--card-bg, #ffffff)',
        color: 'var(--text-main, #0f172a)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, style = {}, ...props }: CardProps) {
  return (
    <div
      className={`ui-card-header ${className}`}
      style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border, rgba(15, 23, 42, 0.06))',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, style = {}, ...props }: CardProps) {
  return (
    <h3
      className={`ui-card-title ${className}`}
      style={{
        margin: 0,
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'var(--text-main, #0f172a)',
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children, style = {}, ...props }: CardProps) {
  return (
    <p
      className={`ui-card-description ${className}`}
      style={{
        margin: 0,
        fontSize: '0.875rem',
        color: '#64748b',
        lineHeight: 1.5,
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, style = {}, ...props }: CardProps) {
  return (
    <div
      className={`ui-card-content ${className}`}
      style={{
        padding: '1.5rem',
        flex: 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, style = {}, ...props }: CardProps) {
  return (
    <div
      className={`ui-card-footer ${className}`}
      style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid var(--border, rgba(15, 23, 42, 0.06))',
        background: 'rgba(0, 0, 0, 0.02)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
