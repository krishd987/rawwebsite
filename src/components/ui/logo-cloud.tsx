'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface LogoItem {
  name: string;
  sub?: string;
  iconSvg?: React.ReactNode;
}

const softwaresList: LogoItem[] = [
  {
    name: 'SolidWorks',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Altium',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L2 21h4.5l2.5-5h6l2.5 5H22L12 3zm-1.5 10.5L12 7.8l1.5 5.7h-3z" />
      </svg>
    ),
  },
  {
    name: 'Arduino IDE',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="7.5" cy="12" r="5.5" />
        <circle cx="16.5" cy="12" r="5.5" />
        <path d="M6 12h3M15 12h3M16.5 10.5v3" />
      </svg>
    ),
  },
  {
    name: 'eSim',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: 'KiCad',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M7 8v8M7 12l5-4M7 12l5 4M14 16h4M16 8v8" />
      </svg>
    ),
  },
  {
    name: 'Ansys',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.5 3L2 21h5l1.6-4.8h6.8L17 21h5L15.5 3H8.5zm1.5 5.2h4l1.6 4.8H8.4L10 8.2z" />
      </svg>
    ),
  },
  {
    name: 'Orca',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
        <path d="M8 12s1.5-3 4-3 4 3 4 3-1.5 3-4 3-4-3-4-3z" />
      </svg>
    ),
  },
  {
    name: 'FluidSIM',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M7 12h10M9 9l6 6M15 9l-6 6" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Computer Vision',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'ROS2',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" fill="currentColor" />
        <circle cx="15" cy="9" r="2" fill="currentColor" />
        <circle cx="9" cy="15" r="2" fill="currentColor" />
        <circle cx="15" cy="15" r="2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function LogoCloud() {
  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      {/* 4-column clean dark cards grid matching reference */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}
        className="logo-cloud-grid"
      >
        {softwaresList.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            whileHover={{
              y: -3,
              borderColor: 'rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              height: '84px',
              padding: '0 1.5rem',
              background: '#09090b',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '14px',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'default',
            }}
          >
            <div
              style={{
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.95,
                flexShrink: 0,
              }}
            >
              {item.iconSvg}
            </div>
            <span
              style={{
                fontFamily: 'Montserrat, -apple-system, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#ffffff',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .logo-cloud-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .logo-cloud-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LogoCloud;
