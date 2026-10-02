'use client';

import React, { useEffect, useRef } from 'react';

export interface KineticGridProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  gridColor?: string;
  dotColor?: string;
  dotRadius?: number;
  warpRadius?: number;
  warpStrength?: number;
  style?: React.CSSProperties;
}

export function KineticGrid({
  children,
  className = '',
  gridSize = 45,
  gridColor = 'rgba(10, 26, 58, 0.04)',
  dotColor = 'rgba(225, 6, 0, 0.08)',
  dotRadius = 0.85,
  warpRadius = 120,
  warpStrength = 6,
  style = {},
}: KineticGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mouseX = -1000;
    let mouseY = -1000;

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }

    const ripples: Ripple[] = [];

    const updateSize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.6,
        alpha: 0.7,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;

      // Calculate subtle warped points
      const points: { x: number; y: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          let origX = c * gridSize;
          let origY = r * gridSize;

          let dx = mouseX - origX;
          let dy = mouseY - origY;
          let dist = Math.sqrt(dx * dx + dy * dy);

          let offsetX = 0;
          let offsetY = 0;

          // Micro mouse warp displacement
          if (dist < warpRadius && dist > 0) {
            let factor = (1 - dist / warpRadius) * warpStrength;
            offsetX = (dx / dist) * factor;
            offsetY = (dy / dist) * factor;
          }

          // Micro ripple wave displacement
          ripples.forEach((ripple) => {
            let rdx = origX - ripple.x;
            let rdy = origY - ripple.y;
            let rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            let waveWidth = 40;
            if (Math.abs(rdist - ripple.radius) < waveWidth) {
              let waveFactor = Math.cos(((rdist - ripple.radius) / waveWidth) * Math.PI);
              let force = waveFactor * ripple.alpha * 5;
              offsetX += (rdx / (rdist || 1)) * force;
              offsetY += (rdy / (rdist || 1)) * force;
            }
          });

          points[r][c] = {
            x: origX + offsetX,
            y: origY + offsetY,
          };
        }
      }

      const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      
      const activeGridColor = isDark 
        ? 'rgba(255, 255, 255, 0.08)' 
        : (gridColor.startsWith('var(') ? 'rgba(10, 26, 58, 0.06)' : gridColor);

      const activeDotColor = isDark
        ? 'rgba(255, 42, 36, 0.4)'
        : (dotColor.startsWith('var(') ? 'rgba(225, 6, 0, 0.15)' : dotColor);

      // Draw subtle grid lines
      ctx.strokeStyle = activeGridColor;
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = points[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw small subtle intersection dots
      ctx.fillStyle = activeDotColor;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 5;
        ripple.alpha *= 0.94;
        if (ripple.alpha < 0.01 || ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, gridColor, dotColor, dotRadius, warpRadius, warpStrength]);

  return (
    <div
      ref={containerRef}
      className={`kinetic-grid-wrapper ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {children && (
        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto', height: '100%' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default KineticGrid;
