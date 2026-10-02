'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dim' | 'destructive';
  mode?: 'default' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      mode = 'default',
      size = 'md',
      children,
      className = '',
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      borderRadius: mode === 'icon' ? '50%' : '0.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.2s ease',
      border: 'none',
      outline: 'none',
      lineHeight: 1,
      ...style,
    };

    // Size variants
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: mode === 'icon' ? '0.4rem' : '0.4rem 0.85rem',
        fontSize: '0.85rem',
        width: mode === 'icon' ? '32px' : 'auto',
        height: mode === 'icon' ? '32px' : 'auto',
      },
      md: {
        padding: mode === 'icon' ? '0.6rem' : '0.6rem 1.25rem',
        fontSize: '0.95rem',
        width: mode === 'icon' ? '40px' : 'auto',
        height: mode === 'icon' ? '40px' : 'auto',
      },
      lg: {
        padding: mode === 'icon' ? '0.8rem' : '0.8rem 1.75rem',
        fontSize: '1.05rem',
        width: mode === 'icon' ? '48px' : 'auto',
        height: mode === 'icon' ? '48px' : 'auto',
      },
    };

    // Style variants
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--color-red, #E10600)',
        color: '#ffffff',
        boxShadow: '0 4px 12px rgba(225, 6, 0, 0.25)',
      },
      secondary: {
        background: 'var(--card-bg, #f1f5f9)',
        color: 'var(--text-main, #0f172a)',
        border: '1px solid var(--border, #cbd5e1)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--text-main, #0f172a)',
        border: '1px solid var(--border, rgba(15, 23, 42, 0.2))',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--text-main, #0f172a)',
      },
      dim: {
        background: 'rgba(15, 23, 42, 0.06)',
        color: '#64748b',
        border: '1px solid rgba(15, 23, 42, 0.08)',
      },
      destructive: {
        background: '#ef4444',
        color: '#ffffff',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
      },
    };

    const combinedStyle = {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`custom-button ${className}`}
        style={combinedStyle}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
