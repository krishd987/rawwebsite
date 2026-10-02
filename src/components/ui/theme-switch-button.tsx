'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export interface ThemeSwitchProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeSwitch({ className = '', style = {} }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('raw_theme') as 'light' | 'dark' | 'system' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const isDark =
      newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.setAttribute('data-theme', 'light');
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('raw_theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center rounded-full p-1 border backdrop-blur-md ${className}`}
        style={{
          background: 'rgba(15, 23, 42, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          minWidth: '108px',
          height: '38px',
          ...style,
        }}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full border backdrop-blur-md shadow-lg transition-colors duration-300 ${className}`}
      style={{
        background: 'var(--color-bg-card, rgba(15, 23, 42, 0.6))',
        borderColor: 'var(--color-border, rgba(255, 255, 255, 0.15))',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        gap: '4px',
        ...style,
      }}
      role="group"
      aria-label="Theme switch controls"
    >
      <button
        onClick={() => handleThemeChange('light')}
        title="Switch to Light Theme"
        aria-label="Switch to Light Theme"
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          background: theme === 'light' ? 'linear-gradient(135deg, #E10600 0%, #b2001d 100%)' : 'transparent',
          color: theme === 'light' ? '#ffffff' : 'var(--color-text-muted, #94a3b8)',
          boxShadow: theme === 'light' ? '0 2px 10px rgba(225, 6, 0, 0.4)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Sun size={16} strokeWidth={2.2} />
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        title="Switch to Dark Theme"
        aria-label="Switch to Dark Theme"
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          background: theme === 'dark' ? 'linear-gradient(135deg, #E10600 0%, #b2001d 100%)' : 'transparent',
          color: theme === 'dark' ? '#ffffff' : 'var(--color-text-muted, #94a3b8)',
          boxShadow: theme === 'dark' ? '0 2px 10px rgba(225, 6, 0, 0.4)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Moon size={16} strokeWidth={2.2} />
      </button>

      <button
        onClick={() => handleThemeChange('system')}
        title="Switch to System Theme"
        aria-label="Switch to System Theme"
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          background: theme === 'system' ? 'linear-gradient(135deg, #E10600 0%, #b2001d 100%)' : 'transparent',
          color: theme === 'system' ? '#ffffff' : 'var(--color-text-muted, #94a3b8)',
          boxShadow: theme === 'system' ? '0 2px 10px rgba(225, 6, 0, 0.4)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Monitor size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}

export function ThemeSwitchDemo() {
  return (
    <div className="flex justify-center items-center py-8">
      <ThemeSwitch />
    </div>
  );
}

export default ThemeSwitch;
