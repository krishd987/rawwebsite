'use client';

import React, { createContext, useContext } from 'react';

interface TimelineContextType {
  activeStep?: number;
}

const TimelineContext = createContext<TimelineContextType>({});

export interface TimelineProps {
  children: React.ReactNode;
  defaultValue?: number;
  activeStep?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Timeline({
  children,
  defaultValue = 1,
  activeStep,
  className = '',
  style = {},
}: TimelineProps) {
  const currentStep = activeStep ?? defaultValue;

  return (
    <TimelineContext.Provider value={{ activeStep: currentStep }}>
      <div
        className={`timeline-container ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '1rem 0',
          ...style,
        }}
      >
        {children}
      </div>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps {
  children: React.ReactNode;
  step: number;
  className?: string;
  style?: React.CSSProperties;
}

interface ItemContextType {
  step: number;
  isActive: boolean;
  isCompleted: boolean;
}

const TimelineItemContext = createContext<ItemContextType>({ step: 1, isActive: false, isCompleted: false });

export function TimelineItem({ children, step, className = '', style = {} }: TimelineItemProps) {
  const { activeStep = 1 } = useContext(TimelineContext);
  const isActive = activeStep === step;
  const isCompleted = activeStep > step;

  return (
    <TimelineItemContext.Provider value={{ step, isActive, isCompleted }}>
      <div
        className={`timeline-item ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: '32px 1fr',
          gap: '1rem',
          position: 'relative',
          ...style,
        }}
      >
        {children}
      </div>
    </TimelineItemContext.Provider>
  );
}

export function TimelineIndicator({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  const { step, isActive, isCompleted } = useContext(TimelineItemContext);

  return (
    <div
      className={`timeline-indicator ${className}`}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.85rem',
        zIndex: 2,
        background: isActive
          ? 'var(--color-red, #E10600)'
          : isCompleted
          ? 'rgba(225, 6, 0, 0.15)'
          : 'var(--card-bg, #f1f5f9)',
        color: isActive
          ? '#ffffff'
          : isCompleted
          ? 'var(--color-red, #E10600)'
          : '#64748b',
        border: isActive
          ? '2px solid var(--color-red, #E10600)'
          : isCompleted
          ? '2px solid rgba(225, 6, 0, 0.4)'
          : '2px solid var(--border, #cbd5e1)',
        boxShadow: isActive ? '0 0 12px rgba(225, 6, 0, 0.4)' : 'none',
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {isCompleted ? '✓' : step}
    </div>
  );
}

export function TimelineSeparator({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  const { isCompleted } = useContext(TimelineItemContext);

  return (
    <div
      className={`timeline-separator ${className}`}
      style={{
        position: 'absolute',
        left: '15px',
        top: '32px',
        bottom: '-24px',
        width: '2px',
        background: isCompleted ? 'var(--color-red, #E10600)' : 'var(--border, #e2e8f0)',
        zIndex: 1,
        transition: 'background 0.3s ease',
        ...style,
      }}
    />
  );
}

export function TimelineHeader({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`timeline-header ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        gridColumn: '2',
        marginBottom: '0.25rem',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function TimelineDate({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`timeline-date ${className}`}
      style={{
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--color-red, #E10600)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function TimelineTitle({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <h4
      className={`timeline-title ${className}`}
      style={{
        margin: 0,
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'var(--text-main, #0f172a)',
        ...style,
      }}
    >
      {children}
    </h4>
  );
}

export function TimelineContent({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`timeline-content ${className}`}
      style={{
        gridColumn: '2',
        fontSize: '0.95rem',
        color: '#64748b',
        lineHeight: 1.6,
        paddingBottom: '0.5rem',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Timeline;
