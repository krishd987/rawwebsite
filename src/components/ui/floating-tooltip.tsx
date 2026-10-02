'use client';

import React, { createContext, useContext, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TooltipVariant = 'default' | 'outline' | 'solid' | 'glass';
export type TooltipSize = 'sm' | 'md' | 'lg';

interface TooltipState {
  active: boolean;
  content: React.ReactNode;
  description?: React.ReactNode;
  contentClassName?: string;
  descriptionClassName?: string;
  x: number;
  y: number;
}

interface TooltipContextType {
  variant: TooltipVariant;
  size: TooltipSize;
  showTooltip: (data: {
    content: React.ReactNode;
    description?: React.ReactNode;
    contentClassName?: string;
    descriptionClassName?: string;
    e: React.MouseEvent;
  }) => void;
  updateMousePos: (e: React.MouseEvent) => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export interface ProviderProps {
  children: React.ReactNode;
  variant?: TooltipVariant;
  size?: TooltipSize;
}

export function Provider({ children, variant = 'default', size = 'md' }: ProviderProps) {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    active: false,
    content: null,
    description: null,
    x: 0,
    y: 0,
  });

  const showTooltip = ({
    content,
    description,
    contentClassName,
    descriptionClassName,
    e,
  }: {
    content: React.ReactNode;
    description?: React.ReactNode;
    contentClassName?: string;
    descriptionClassName?: string;
    e: React.MouseEvent;
  }) => {
    setTooltipState({
      active: true,
      content,
      description,
      contentClassName,
      descriptionClassName,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const updateMousePos = (e: React.MouseEvent) => {
    setTooltipState((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  };

  const hideTooltip = () => {
    setTooltipState((prev) => ({ ...prev, active: false }));
  };

  // Styling maps based on variant & size
  const sizeMap: Record<TooltipSize, React.CSSProperties> = {
    sm: { padding: '0.4rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem' },
    md: { padding: '0.6rem 1rem', borderRadius: '0.75rem', fontSize: '0.875rem' },
    lg: { padding: '0.85rem 1.25rem', borderRadius: '1rem', fontSize: '1rem' },
  };

  const variantMap: Record<TooltipVariant, React.CSSProperties> = {
    default: {
      background: 'var(--text-main, #0f172a)',
      color: 'var(--bg-main, #ffffff)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    outline: {
      background: 'var(--card-bg, #ffffff)',
      color: 'var(--text-main, #0f172a)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
      border: '1px solid var(--border, rgba(15, 23, 42, 0.15))',
    },
    solid: {
      background: 'var(--color-red, #E10600)',
      color: '#ffffff',
      boxShadow: '0 10px 30px rgba(225, 6, 0, 0.3)',
      border: 'none',
    },
    glass: {
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      color: '#ffffff',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
  };

  return (
    <TooltipContext.Provider value={{ variant, size, showTooltip, updateMousePos, hideTooltip }}>
      <div style={{ position: 'relative' }}>
        {children}

        {/* Floating Tooltip Element */}
        <AnimatePresence>
          {tooltipState.active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: tooltipState.y + 15,
                left: tooltipState.x + 15,
                pointerEvents: 'none',
                zIndex: 9999,
                maxWidth: '280px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                ...sizeMap[size],
                ...variantMap[variant],
              }}
            >
              <div className={tooltipState.contentClassName} style={{ fontWeight: 600 }}>
                {tooltipState.content}
              </div>
              {tooltipState.description && (
                <div
                  className={tooltipState.descriptionClassName}
                  style={{
                    fontSize: '0.8em',
                    opacity: 0.8,
                    lineHeight: 1.4,
                  }}
                >
                  {tooltipState.description}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipContext.Provider>
  );
}

export interface TriggerProps {
  children: React.ReactNode;
  content: React.ReactNode;
  description?: React.ReactNode;
  contentClassName?: string;
  descriptionClassName?: string;
}

export function Trigger({
  children,
  content,
  description,
  contentClassName,
  descriptionClassName,
}: TriggerProps) {
  const ctx = useContext(TooltipContext);

  if (!ctx) {
    throw new Error('FloatingTooltip.Trigger must be used within FloatingTooltip.Provider');
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    ctx.showTooltip({ content, description, contentClassName, descriptionClassName, e });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    ctx.updateMousePos(e);
  };

  const handleMouseLeave = () => {
    ctx.hideTooltip();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
}

export const FloatingTooltip = {
  Provider,
  Trigger,
};

export default FloatingTooltip;
