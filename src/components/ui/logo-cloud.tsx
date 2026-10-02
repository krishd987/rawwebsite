'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface SoftwareLogoItem {
  name: string;
  url: string;
  imgSrc?: string;
  customLogo?: React.ReactNode;
  imgWidth?: number;
  imgHeight?: number;
  filterStyle?: string;
}

const softwaresList: SoftwareLogoItem[] = [
  {
    name: 'SolidWorks',
    url: 'https://www.solidworks.com',
    imgSrc: '/logos/solidworks.png',
    imgWidth: 150,
    imgHeight: 40,
    filterStyle: 'brightness(1.15)',
  },
  {
    name: 'Altium Designer',
    url: 'https://www.altium.com/altium-designer',
    imgSrc: '/logos/altium.png',
    imgWidth: 140,
    imgHeight: 38,
    filterStyle: 'brightness(1.4) contrast(1.1)',
  },
  {
    name: 'Arduino',
    url: 'https://www.arduino.cc',
    customLogo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00979D" strokeWidth="2.5">
          <circle cx="7.5" cy="12" r="5.5" />
          <circle cx="16.5" cy="12" r="5.5" />
          <path d="M6 12h3M15 12h3M16.5 10.5v3" stroke="#00979D" strokeWidth="2" />
        </svg>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#f8fafc' }}>
          ARDUINO
        </span>
      </div>
    ),
  },
  {
    name: 'eSim',
    url: 'https://esim.fossee.in',
    imgSrc: '/logos/esim.png',
    imgWidth: 130,
    imgHeight: 36,
    filterStyle: 'brightness(1.2)',
  },
  {
    name: 'KiCad',
    url: 'https://www.kicad.org',
    imgSrc: '/logos/kicad.png',
    imgWidth: 140,
    imgHeight: 38,
    filterStyle: 'brightness(1.2) contrast(1.1)',
  },
  {
    name: 'Ansys',
    url: 'https://www.ansys.com',
    imgSrc: '/logos/ansys.png',
    imgWidth: 140,
    imgHeight: 36,
    filterStyle: 'brightness(1.3) contrast(1.1)',
  },
  {
    name: 'Orca Slicer',
    url: 'https://orcaslicer.net',
    imgSrc: '/logos/orca.png',
    imgWidth: 150,
    imgHeight: 40,
    filterStyle: 'brightness(1.2)',
  },
  {
    name: 'FluidSIM',
    url: 'https://www.festo.com',
    customLogo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f3ff" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10M9 9l6 6M15 9l-6 6" />
        </svg>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em', color: '#f8fafc' }}>
          FluidSIM
        </span>
      </div>
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    customLogo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#f8fafc' }}>
          GitHub
        </span>
      </div>
    ),
  },
  {
    name: 'OpenCV',
    url: 'https://opencv.org',
    imgSrc: '/logos/opencv.webp',
    imgWidth: 130,
    imgHeight: 38,
    filterStyle: 'brightness(1.25)',
  },
  {
    name: 'ROS 2',
    url: 'https://www.ros.org',
    imgSrc: '/logos/ros2.webp',
    imgWidth: 130,
    imgHeight: 38,
    filterStyle: 'brightness(1.4) contrast(1.1)',
  },
  {
    name: 'Autodesk Fusion 360',
    url: 'https://www.autodesk.com/products/fusion-360',
    imgSrc: '/logos/fusion360.png',
    imgWidth: 150,
    imgHeight: 40,
    filterStyle: 'brightness(1.35) contrast(1.1)',
  },
];

function SpotlightCard({ item, idx }: { item: SoftwareLogoItem; idx: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Visit ${item.name}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '86px',
        padding: '0 1.5rem',
        background: 'linear-gradient(145deg, #0f192e 0%, #09101e 100%)',
        border: isHovered ? '1px solid rgba(225, 6, 0, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(0, 0, 0, 0.75), 0 0 24px rgba(225, 6, 0, 0.28)'
          : '0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
      }}
    >
      {/* Interactive Radial Spotlight Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.25s ease',
          background: `radial-gradient(160px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(225, 6, 0, 0.22), transparent 75%)`,
          zIndex: 1,
        }}
      />

      {/* Subtle top edge highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
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
                filter: item.filterStyle || 'brightness(1.2)',
              }}
            />
          </div>
        ) : null}
      </div>
    </motion.a>
  );
}

export function LogoCloud() {
  return (
    <div style={{ width: '100%', maxWidth: '1120px', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.15rem',
        }}
        className="logo-cloud-grid"
      >
        {softwaresList.map((item, idx) => (
          <SpotlightCard key={item.name} item={item} idx={idx} />
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
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LogoCloud;
