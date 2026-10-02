'use client';

import { useEffect, useRef } from 'react';

export function RobotCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current && cursorRef.current.style.opacity !== '1') {
        cursorRef.current.style.opacity = '1';
      }
    };

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', move, { passive: true });
    raf.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        html, html * { cursor: none !important; }
        .robot-cursor-root {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          margin-left: -2px;
          margin-top: -2px;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .robot-cursor-root svg {
          filter: drop-shadow(0 2px 10px rgba(225, 6, 0, 0.45));
        }
      `}</style>

      <div ref={cursorRef} className="robot-cursor-root">
        {/* Sleek High-Tech Robotic Drone Cursor */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cyber Pointer Arrow Body */}
          <path
            d="M2 2L9 22L13 13L22 9L2 2Z"
            fill="url(#botGrad)"
            stroke="#0A1A3A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Glowing Red Energy Core / HUD Visor */}
          <path
            d="M5 5L9.5 17L12 12L17 9.5L5 5Z"
            fill="#E10600"
          />
          {/* Neon Point Highlight */}
          <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" opacity="0.9" />

          <defs>
            <linearGradient id="botGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.6" stopColor="#E10600" />
              <stop offset="1" stopColor="#8A0000" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

