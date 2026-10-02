'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeToggle({ className = '', style = {} }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('raw_theme');
    if (saved === 'light') {
      setTheme('light');
      applyTheme('light');
    } else {
      setTheme('dark');
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (t: 'light' | 'dark') => {
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('raw_theme', next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 bg-white/60 dark:border-white/10 dark:bg-white/5 ${className}`}
        style={style}
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none ${
        isDark
          ? 'border-white/15 bg-white/10 text-yellow-400 hover:border-white/30 hover:bg-white/15 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
          : 'border-black/10 bg-black/5 text-gray-800 hover:border-black/20 hover:bg-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
      } ${className}`}
      style={style}
      aria-label="Toggle Theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <Moon className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex items-center justify-center text-red-600"
          >
            <Sun className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
