'use client';

import * as React from 'react';
import { ThemeToggle } from './theme-toggle';

export interface ThemeSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  return <ThemeToggle {...props} />;
}

export { ThemeToggle };
export default ThemeSwitcher;
