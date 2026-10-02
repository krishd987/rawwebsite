'use client';

import React from 'react';
import styles from './logo-cloud-2.module.css';

type Logo = {
  src: string;
  alt: string;
};

export function DecorCross({ position = 'bottom-right' }: { position?: 'bottom-right' | 'bottom-left' }) {
  const posClass = position === 'bottom-right' ? styles.bottomRight : styles.bottomLeft;
  return (
    <svg
      aria-hidden="true"
      className={`${styles.decorIcon} ${posClass}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

type LogoCardProps = {
  logo: Logo;
  className?: string;
  children?: React.ReactNode;
};

function LogoCard({ logo, className = '', children }: LogoCardProps) {
  return (
    <div className={`${styles.logoCard} ${className}`}>
      <img
        alt={logo.alt}
        className={styles.logoImg}
        height="auto"
        src={logo.src}
        width="auto"
        loading="lazy"
      />
      {children}
    </div>
  );
}

export function LogoCloud({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* Viewport-wide hairline separator lines */}
      <div className={styles.topHairline} />
      
      <div className={styles.grid}>
        {/* ROW 1 */}
        {/* 1. NVIDIA (Tile 1: Secondary Bg) */}
        <LogoCard
          className={`${styles.bgSecondary} ${styles.borderRight} ${styles.borderBottom}`}
          logo={{
            src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
            alt: "Nvidia Logo",
          }}
        >
          <DecorCross position="bottom-right" />
        </LogoCard>

        {/* 2. Supabase (Tile 2: Primary Bg) */}
        <LogoCard
          className={`${styles.bgPrimary} ${styles.borderRight} ${styles.borderBottom}`}
          logo={{
            src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
            alt: "Supabase Logo",
          }}
        />

        {/* 3. GitHub (Tile 3: Secondary Bg) */}
        <LogoCard
          className={`${styles.bgSecondary} ${styles.borderRight} ${styles.borderBottom}`}
          logo={{
            src: "https://storage.efferd.com/logo/github-wordmark.svg",
            alt: "GitHub Logo",
          }}
        >
          <DecorCross position="bottom-right" />
          <DecorCross position="bottom-left" />
        </LogoCard>

        {/* 4. OpenAI (Tile 4: Primary Bg) */}
        <LogoCard
          className={`${styles.bgPrimary} ${styles.borderBottom}`}
          logo={{
            src: "https://storage.efferd.com/logo/openai-wordmark.svg",
            alt: "OpenAI Logo",
          }}
        />

        {/* ROW 2 */}
        {/* 5. Turso (Tile 5: Primary Bg) */}
        <LogoCard
          className={`${styles.bgPrimary} ${styles.borderRight} ${styles.borderBottomMobile}`}
          logo={{
            src: "https://storage.efferd.com/logo/turso-wordmark.svg",
            alt: "Turso Logo",
          }}
        />

        {/* 6. Clerk (Tile 6: Secondary Bg) */}
        <LogoCard
          className={`${styles.bgSecondary} ${styles.borderRight} ${styles.borderBottomMobile}`}
          logo={{
            src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
            alt: "Clerk Logo",
          }}
        />

        {/* 7. Claude (Tile 7: Primary Bg) */}
        <LogoCard
          className={`${styles.bgPrimary} ${styles.borderRight}`}
          logo={{
            src: "https://storage.efferd.com/logo/claude-wordmark.svg",
            alt: "Claude AI Logo",
          }}
        />

        {/* 8. Vercel (Tile 8: Secondary Bg) */}
        <LogoCard
          className={styles.bgSecondary}
          logo={{
            src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
            alt: "Vercel Logo",
          }}
        />
      </div>

      <div className={styles.bottomHairline} />
    </div>
  );
}

// Named alias
export const LogoCloud2 = LogoCloud;

export default LogoCloud;
