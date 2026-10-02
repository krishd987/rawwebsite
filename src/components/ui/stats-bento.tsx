'use client';

import React from 'react';
import { Bot } from 'lucide-react';
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
    badge: 'Success Rate',
    value: '90%+',
    description: 'Autonomous execution & mission task completion rate in national & international competitions.',
  },
  secondary = {
    tag: 'Team Growth',
    value: '24+ Engineers',
    bars: [30, 45, 40, 60, 55, 75, 70, 85, 80, 95, 100],
  },
  tertiaryA = {
    value: '15+',
    label: 'Awards & Events',
  },
  tertiaryB = {
    icon: <Bot size={22} color="var(--color-red, #E10600)" />,
    value: '4 Competition Bots',
    label: 'ABU Robocon, e-Yantra & Techfest',
  },
  className = '',
}: StatsBentoProps) {
  const bars = secondary.bars || [30, 45, 40, 60, 55, 75, 70, 85, 80, 95, 100];

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
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-navy, #0A1A3A)' }}>
              {tertiaryB.value}
            </p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
              {tertiaryB.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsBento;
