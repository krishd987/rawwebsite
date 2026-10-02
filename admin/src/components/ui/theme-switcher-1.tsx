'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export interface ThemeSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeSwitcher({ className = '', style = {} }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('raw_admin_theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const isDark =
      newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('raw_admin_theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div
      className={`theme-switcher ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--card-bg, rgba(15, 23, 42, 0.6))',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border, rgba(255, 255, 255, 0.12))',
        borderRadius: '9999px',
        padding: '3px',
        gap: '2px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        ...style,
      }}
    >
      <button
        onClick={() => handleThemeChange('light')}
        title="Light Mode"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: theme === 'light' ? 'var(--color-red, #E10600)' : 'transparent',
          color: theme === 'light' ? '#ffffff' : '#94a3b8',
          transition: 'all 0.2s ease',
        }}
      >
        <Sun size={16} />
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        title="Dark Mode"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: theme === 'dark' ? 'var(--color-red, #E10600)' : 'transparent',
          color: theme === 'dark' ? '#ffffff' : '#94a3b8',
          transition: 'all 0.2s ease',
        }}
      >
        <Moon size={16} />
      </button>

      <button
        onClick={() => handleThemeChange('system')}
        title="System Preference"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: theme === 'system' ? 'var(--color-red, #E10600)' : 'transparent',
          color: theme === 'system' ? '#ffffff' : '#94a3b8',
          transition: 'all 0.2s ease',
        }}
      >
        <Monitor size={16} />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
