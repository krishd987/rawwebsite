/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Sparkles, ChevronRight } from 'lucide-react';
import styles from '../styles/Hero.module.css';
import BotsHeroCarousel from '@/components/ui/bots-hero-carousel';
import TextAnimation from '@/components/ui/scroll-text';
import TimelineAnimation from '@/components/ui/timeline-animation';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const heroRevealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.18,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: 20,
      opacity: 0,
    },
  };

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.container}>
        {/* Left Side - Content with Scroll & Timeline Animations */}
        <div className={styles.leftContent}>
          <TimelineAnimation
            animationNum={1}
            timelineRef={containerRef}
            customVariants={heroRevealVariants}
            className={styles.badge}
          >
            <span>
              <Bot size={16} strokeWidth={2.5} />
              Innovation in Motion
            </span>
          </TimelineAnimation>

          {/* Heading with Text Animation */}
          <div className="space-y-1">
            <TextAnimation
              as="h1"
              text="TEAM RAW"
              lineAnime={true}
              classname={styles.mainHeading}
              variants={{
                hidden: { filter: 'blur(12px)', opacity: 0, y: 25 },
                visible: {
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            />
            <TextAnimation
              as="h2"
              text="Robotics & Aviation Wing"
              direction="right"
              classname={styles.subtitle}
              delay={0.2}
              variants={{
                hidden: { filter: 'blur(8px)', opacity: 0, x: -20 },
                visible: {
                  filter: 'blur(0px)',
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
            />
          </div>

          <TimelineAnimation
            animationNum={3}
            timelineRef={containerRef}
            customVariants={heroRevealVariants}
          >
            <p className={styles.description}>
              Building the next generation of autonomous and combat robotics systems. Excellence in engineering, innovation in mechatronics, and passion for technology since 2020.
            </p>
          </TimelineAnimation>

          <TimelineAnimation
            animationNum={4}
            timelineRef={containerRef}
            customVariants={heroRevealVariants}
            className={styles.ctaContainer}
          >
            <motion.a
              href="/competitions"
              className={`${styles.button} ${styles.primaryButton}`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(225, 6, 0, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              Explore Competitions
              <ChevronRight size={18} />
            </motion.a>

            <motion.a
              href="/robots-gallery"
              className={`${styles.button} ${styles.secondaryButton}`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(10, 26, 58, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}
            >
              Meet the Robots
            </motion.a>
          </TimelineAnimation>

          {/* Stats with Staggered Timeline Animation */}
          <TimelineAnimation
            animationNum={5}
            timelineRef={containerRef}
            customVariants={heroRevealVariants}
            className={styles.stats}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>2020–26</span>
              <span className={styles.statLabel}>Bots History</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>14+</span>
              <span className={styles.statLabel}>Competition Bots</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>Team Engineers</span>
            </div>
          </TimelineAnimation>
        </div>

        {/* Right Side - 5-Second Auto-Advancing Bots Hero Carousel */}
        <TimelineAnimation
          animationNum={2}
          timelineRef={containerRef}
          customVariants={heroRevealVariants}
          className={styles.rightContent}
        >
          <motion.div
            className={styles.logoContainer}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BotsHeroCarousel autoPlayInterval={5000} />
          </motion.div>
        </TimelineAnimation>
      </div>

      {/* Scroll Indicator with smooth float */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ fontSize: '0.875rem', color: 'var(--color-gray)', fontWeight: 500 }}>Scroll to Explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
