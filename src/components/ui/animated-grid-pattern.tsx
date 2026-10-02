'use client';

import { useEffect, useId, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  [key: string]: any;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 30,
  className,
  maxOpacity = 0.1,
  duration = 3,
  repeatDelay = 1,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getPos = useCallback((): [number, number] => {
    const w = dimensions.width || (typeof window !== 'undefined' ? window.innerWidth : 1440);
    const h = dimensions.height || (typeof window !== 'undefined' ? window.innerHeight : 900);
    return [
      Math.floor((Math.random() * w) / width),
      Math.floor((Math.random() * h) / height),
    ];
  }, [dimensions, width, height]);

  const generateSquares = useCallback(
    (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
      }));
    },
    [getPos]
  );

  const [squares, setSquares] = useState<Array<{ id: number; pos: [number, number] }>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = containerRef.current?.clientWidth || window.innerWidth;
      const h = containerRef.current?.clientHeight || window.innerHeight;
      if (w && h) {
        setDimensions({ width: w, height: h });
      }
    }
  }, []);

  useEffect(() => {
    const count = numSquares || 40;
    setSquares(generateSquares(count));
  }, [dimensions, numSquares, generateSquares]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.unobserve(node);
    };
  }, []);

  const updateSquarePosition = (squareId: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === squareId
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq
      )
    );
  };

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full stroke-black/[0.07] fill-black/[0.02] text-red-600/35 dark:stroke-white/[0.08] dark:fill-white/[0.02] dark:text-red-500/40',
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [squareX, squareY], id: squareId }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay,
              delay: index * 0.06,
            }}
            onAnimationComplete={() => updateSquarePosition(squareId)}
            key={`${squareX}-${squareY}-${index}`}
            width={width - 1}
            height={height - 1}
            x={squareX * width + 1}
            y={squareY * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}

export default AnimatedGridPattern;
