'use client';

import * as React from 'react';
import { ThemeToggle } from './theme-toggle';

export interface ThemeSwitchProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeSwitch(props: ThemeSwitchProps) {
  return <ThemeToggle {...props} />;
}

export function ThemeSwitchDemo() {
  return (
    <div className="flex justify-center items-center py-8">
      <ThemeToggle />
    </div>
  );
}

export { ThemeToggle };
export default ThemeSwitch;
