/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Users, Bot, BarChart3, Sparkles, Target, Rocket, Brain, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import UpdatesPopup from './components/UpdatesPopup';
import Footer from './components/Footer';
import KineticGrid from '@/components/ui/kinetic-grid';
import StatsBento from '@/components/ui/stats-bento';
import TextAnimation from '@/components/ui/scroll-text';
import TimelineAnimation from '@/components/ui/timeline-animation';

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  const cardRevealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: 30,
      opacity: 0,
    },
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Universal Stretched Background Kinetic Grid */}
      <KineticGrid style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <UpdatesPopup />
        <Navbar />
        <Hero />

        {/* Team RAW Info Section - SEO H1 */}
        <section
          ref={introRef}
          className="team-raw-intro"
          style={{
            padding: '5rem 0 4rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', maxWidth: '900px' }}>
                <TextAnimation
                  as="h1"
                  lineAnime={true}
                  text="TEAM RAW – Robotics and Aviation Wing of SFIT"
                  classname="scroll-h1-heading"
                  style={{
                    fontSize: '2.5rem',
                    fontFamily: 'Orbitron, sans-serif',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                    lineHeight: '1.2',
                  }}
                  variants={{
                    hidden: { filter: 'blur(10px)', opacity: 0, y: 25 },
                    visible: {
                      filter: 'blur(0px)',
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: 'easeOut' },
                    },
                  }}
                />
              </div>

              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--color-red), rgba(225, 6, 0, 0.2))',
                  margin: '1rem auto',
                  borderRadius: '2px',
                }}
              />

              <TimelineAnimation animationNum={1} timelineRef={introRef}>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-primary)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.8',
                    opacity: 0.9,
                  }}
                >
                  The official robotics research and competition team of St. Francis Institute of Technology (SFIT). 
                  We design, develop, and innovate robotics systems for national and international competitions.
                </p>
              </TimelineAnimation>
            </div>

            {/* Motivational Quote with letter animation */}
            <TimelineAnimation
              animationNum={2}
              timelineRef={introRef}
              style={{
                maxWidth: '800px',
                margin: '2rem auto 0',
                padding: '1.25rem 1.75rem',
                background: 'rgba(225, 6, 0, 0.08)',
                border: '1px solid rgba(225, 6, 0, 0.25)',
                borderRadius: '12px',
                borderLeft: '4px solid var(--color-red)',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-primary)',
                  fontStyle: 'italic',
                  margin: 0,
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Sparkles size={18} style={{ color: 'var(--color-red)', flexShrink: 0 }} />
                <TextAnimation
                  as="p"
                  letterAnime={false}
                  lineAnime={true}
                  text="Where innovation meets engineering — building the future, one robot at a time."
                  style={{ margin: 0, display: 'inline' }}
                />
              </div>
            </TimelineAnimation>

            {/* 4 Pillars with Staggered TimelineAnimation */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginTop: '2.5rem',
              }}
            >
              {[
                { icon: <Target size={40} style={{ color: 'var(--color-red)' }} />, title: 'Our Mission', text: 'To provide a supportive environment for students to develop technical skills, conduct robotics research, and work on long-term innovative projects, while collaborating with industries and institutions to enhance learning and exposure in the field of robotics.', link: '/about#mission' },
                { icon: <Rocket size={40} style={{ color: 'var(--color-red)' }} />, title: 'Our Vision', text: 'To be a leading student robotics committee that drives innovation, represents SFIT globally, and cultivates a strong and lasting robotics culture within the institute.', link: '/about#vision' },
                { icon: <Brain size={40} style={{ color: 'var(--color-red)' }} />, title: 'What We Do', text: 'Autonomous robotics, embedded systems, mechanical design, AI & computer vision, ROS, mechatronics, and industrial automation.', link: '/team' },
                { icon: <Trophy size={40} style={{ color: 'var(--color-red)' }} />, title: 'Competitions', text: 'e-Yantra Robotics Competition (IIT Bombay), ABU Robocon, and Techfest IIT Bombay.', link: '/competitions' },
              ].map((item, idx) => (
                <TimelineAnimation
                  as="a"
                  key={idx}
                  href={item.link}
                  animationNum={idx + 1}
                  timelineRef={introRef}
                  customVariants={cardRevealVariants}
                  style={{
                    background: 'var(--color-bg-card)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--color-border)',
                    borderRadius: '20px',
                    padding: '2rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block',
                    cursor: 'pointer',
                    minHeight: '280px',
                    position: 'relative',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.75rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: 1.65,
                  }}>
                    {item.text}
                  </p>
                </TimelineAnimation>
              ))}
            </div>
          </div>
        </section>

        <AboutUs />

        {/* Highlights Section with TextAnimation and TimelineAnimation */}
        <section
          ref={highlightsRef}
          style={{
            padding: '6rem 0',
            background: 'linear-gradient(180deg, var(--color-bg-secondary, #f5f7fa) 0%, var(--color-bg-primary, #e8ebf0) 50%, var(--color-bg-secondary, #f5f7fa) 100%)',
            color: 'var(--color-navy)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <TextAnimation
                as="h2"
                text="Team RAW Highlights"
                direction="down"
                style={{
                  fontSize: '2.5rem',
                  fontFamily: 'Orbitron, sans-serif',
                  marginBottom: '1rem',
                  color: 'var(--color-navy)',
                  letterSpacing: '0.02em',
                }}
              />
              <TextAnimation
                as="p"
                direction="up"
                text="Our achievements, competition podiums, and campus impact"
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-muted)',
                }}
              />
            </div>

            <TimelineAnimation animationNum={1} timelineRef={highlightsRef}>
              <StatsBento />
            </TimelineAnimation>
          </div>
        </section>

        {/* Quick Links Section - Explore More */}
        <section
          ref={exploreRef}
          style={{
            padding: '5rem 0',
            background: 'radial-gradient(ellipse at center, rgba(225, 6, 0, 0.05) 0%, var(--color-bg-secondary) 60%, var(--color-bg-primary) 100%)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            <TimelineAnimation
              animationNum={1}
              timelineRef={exploreRef}
              style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                background: 'var(--color-bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <TextAnimation
                as="h3"
                direction="right"
                text="Explore More with Team RAW"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.5rem',
                  color: 'var(--color-navy)',
                  marginBottom: '1.5rem',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {[
                  { label: 'Robots & Gallery', href: '/robots-gallery' },
                  { label: 'Meet the Team', href: '/team' },
                  { label: 'Competitions', href: '/competitions' },
                  { label: 'MOSAIC 26', href: '/mosaic-26' },
                  { label: 'Contact', href: '/contact' },
                ].map((link, idx) => (
                  <TimelineAnimation
                    as="a"
                    key={idx}
                    href={link.href}
                    animationNum={idx + 2}
                    timelineRef={exploreRef}
                    customVariants={cardRevealVariants}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.875rem 1.75rem',
                      background: 'var(--color-red)',
                      color: '#ffffff',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '600',
                      fontSize: '1rem',
                      border: '1px solid var(--color-red)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      boxShadow: '0 4px 12px rgba(225, 6, 0, 0.2)',
                    }}
                    className="hover:scale-105 hover:bg-transparent hover:text-red-600 transition-all duration-300"
                  >
                    {link.label}
                    <ChevronRight size={16} />
                  </TimelineAnimation>
                ))}
              </div>
            </TimelineAnimation>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
