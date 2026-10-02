'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface LogoItem {
  name: string;
  imgSrc?: string;
  customLogo?: React.ReactNode;
  imgWidth?: number;
  imgHeight?: number;
}

const softwaresList: LogoItem[] = [
  {
    name: 'SolidWorks',
    imgSrc: '/logos/solidworks.png',
    imgWidth: 150,
    imgHeight: 40,
  },
  {
    name: 'Altium',
    imgSrc: '/logos/altium.png',
    imgWidth: 140,
    imgHeight: 38,
  },
  {
    name: 'Arduino',
    customLogo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00979D" strokeWidth="2.5">
          <circle cx="7.5" cy="12" r="5.5" />
          <circle cx="16.5" cy="12" r="5.5" />
          <path d="M6 12h3M15 12h3M16.5 10.5v3" stroke="#00979D" strokeWidth="2" />
        </svg>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
          ARDUINO
        </span>
      </div>
    ),
  },
  {
    name: 'eSim',
    imgSrc: '/logos/esim.png',
    imgWidth: 130,
    imgHeight: 36,
  },
  {
    name: 'KiCad',
    imgSrc: '/logos/kicad.png',
    imgWidth: 140,
    imgHeight: 38,
  },
  {
    name: 'Ansys',
    imgSrc: '/logos/ansys.png',
    imgWidth: 140,
    imgHeight: 36,
  },
  {
    name: 'Orca Slicer',
    imgSrc: '/logos/orca.png',
    imgWidth: 150,
    imgHeight: 40,
  },
  {
    name: 'FluidSIM',
    customLogo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f3ff" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10M9 9l6 6M15 9l-6 6" />
        </svg>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em', color: '#ffffff' }}>
          FluidSIM
        </span>
      </div>
    ),
  },
  {
    name: 'GitHub',
    customLogo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
          GitHub
        </span>
      </div>
    ),
  },
  {
    name: 'OpenCV',
    imgSrc: '/logos/opencv.webp',
    imgWidth: 130,
    imgHeight: 38,
  },
  {
    name: 'ROS 2',
    imgSrc: '/logos/ros2.webp',
    imgWidth: 130,
    imgHeight: 38,
  },
  {
    name: 'Fusion 360',
    imgSrc: '/logos/fusion360.png',
    imgWidth: 150,
    imgHeight: 40,
  },
];

export function LogoCloud() {
  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Clean 4-column minimal dark cards grid */}
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
              borderColor: 'rgba(255, 255, 255, 0.28)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '84px',
              padding: '0 1.5rem',
              background: '#09090b',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '12px',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'default',
            }}
          >
            {item.customLogo ? (
              item.customLogo
            ) : item.imgSrc ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  maxHeight: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={item.imgSrc}
                  alt={item.name}
                  width={item.imgWidth || 140}
                  height={item.imgHeight || 38}
                  style={{
                    objectFit: 'contain',
                    maxHeight: '38px',
                    width: 'auto',
                    maxWidth: '85%',
                    filter: 'brightness(1.08)',
                  }}
                />
              </div>
            ) : null}
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
