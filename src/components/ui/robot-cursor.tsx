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

    window.addEventListener('mousemove', move);
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
          margin-left: -12px;
          margin-top: -12px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .robot-cursor-root svg {
          filter: drop-shadow(0 2px 6px rgba(225,6,0,0.35));
        }
      `}</style>

      <div ref={cursorRef} className="robot-cursor-root">
        {/* 32×32 robot cursor SVG */}
        <svg
          width="35"
          height="35"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna */}
          <rect x="14" y="2" width="4" height="6" rx="2" fill="#E10600" stroke="#0A1A3A" strokeWidth="1.5" />
          {/* Gold tip */}
          <circle cx="16" cy="1.5" r="2" fill="#FFD700" />

          {/* Head / Body */}
          <rect x="4" y="8" width="24" height="20" rx="3" fill="#E10600" stroke="#0A1A3A" strokeWidth="1.5" />

          {/* Eyes */}
          <circle cx="10" cy="14" r="2.5" fill="#ffffff" />
          <circle cx="22" cy="14" r="2.5" fill="#ffffff" />

          {/* Mouth grill */}
          <rect x="10" y="18" width="12" height="2" rx="1" fill="#ffffff" />
        </svg>
      </div>
    </>
  );
}
