'use client';

import React from 'react';
import styles from './stats-bento.module.css';

export interface StatsBentoProps {
  primary?: {
    badge?: string;
    value?: string | number;
    description?: string;
  };
  secondary?: {
    tag?: string;
    value?: string;
    bars?: number[];
  };
  tertiaryA?: {
    value?: string | number;
    label?: string;
  };
  tertiaryB?: {
    icon?: React.ReactNode;
    value?: string;
    label?: string;
  };
  className?: string;
}

export function StatsBento({
  primary = {
    badge: 'Team Overview',
    value: '24',
    description: 'Active multidisciplinary robotics engineers across all operational divisions.',
  },
  secondary = {
    tag: 'Monthly Growth',
    value: '+8 This Month',
    bars: [25, 40, 35, 55, 50, 70, 65, 80, 75, 95, 100],
  },
  tertiaryA = {
    value: '6',
    label: 'Departments',
  },
  tertiaryB = {
    icon: '★',
    value: '4 Active Teams',
    label: 'Robocon, e-Yantra & R&D',
  },
  className = '',
}: StatsBentoProps) {
  const bars = secondary.bars || [20, 35, 45, 30, 60, 55, 80, 70, 90, 85, 100];

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.grid}>
        {/* Primary Stat Card */}
        <div className={styles.primaryCard}>
          <div className={styles.patternBg} />
          <div>
            <span className={styles.primaryBadge}>{primary.badge}</span>
            <h3 className={styles.primaryValue}>{primary.value}</h3>
          </div>
          <p className={styles.primaryDesc}>{primary.description}</p>
        </div>

        {/* Secondary Stat Card (Growth / Sparkline Bars) */}
        <div className={styles.secondaryCard}>
          <div>
            <p className={styles.statTag}>{secondary.tag}</p>
            <p className={styles.secondaryValue}>{secondary.value}</p>
          </div>
          <div className={styles.barsContainer} aria-hidden="true">
            {bars.map((heightPercent, index) => (
              <div
                key={index}
                className={styles.bar}
                style={{ height: `${heightPercent}%` }}
                title={`${heightPercent}%`}
              />
            ))}
          </div>
        </div>

        {/* Tertiary Stat Card A */}
        <div className={styles.tertiaryCardA}>
          <p className={styles.tertiaryValue}>{tertiaryA.value}</p>
          <p className={styles.statTag}>{tertiaryA.label}</p>
        </div>

        {/* Tertiary Stat Card B */}
        <div className={styles.tertiaryCardB}>
          <div className={styles.iconCircle}>
            {tertiaryB.icon}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary, #0f172a)' }}>
              {tertiaryB.value}
            </p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary, #64748b)' }}>
              {tertiaryB.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsBento;
