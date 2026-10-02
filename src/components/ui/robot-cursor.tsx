'use client';

import { useEffect } from 'react';

/**
 * RobotCursor — uses actual CSS `cursor: url(...)` so the custom cursor
 * shows up in screenshots, works on all browsers, and doesn't create
 * a fake floating SVG overlay that breaks on mobile / touch devices.
 *
 * The SVG is inlined as a data URI so no extra network request is needed.
 * Hotspot is set to (2, 2) to match the tip of the pointer arrow.
 */
export function RobotCursor() {
  useEffect(() => {
    // Only apply custom cursor on non-touch (pointer: fine) devices
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const style = document.createElement('style');
    style.id = 'robot-cursor-style';
    style.textContent = `
      html, html * {
        cursor: url('/cursors/robot-cursor.svg') 2 2, auto !important;
      }
      /* Preserve native pointer cursor on interactive elements */
      a, button, [role="button"], input[type="submit"],
      input[type="button"], select, label[for],
      [onclick], [tabindex]:not([tabindex="-1"]) {
        cursor: url('/cursors/robot-cursor.svg') 2 2, pointer !important;
      }
      input, textarea, [contenteditable="true"] {
        cursor: url('/cursors/robot-cursor.svg') 2 2, text !important;
      }
    `;
    document.head.appendChild(style);

    // Listen for changes (e.g. external display connected)
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        if (!document.getElementById('robot-cursor-style')) {
          document.head.appendChild(style);
        }
      } else {
        style.remove();
      }
    };
    mq.addEventListener('change', onChange);

    return () => {
      style.remove();
      mq.removeEventListener('change', onChange);
    };
  }, []);

  // No DOM element needed — the cursor is entirely CSS-driven
  return null;
}
