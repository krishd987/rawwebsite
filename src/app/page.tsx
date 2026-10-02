/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, Users, Bot, BarChart3, Sparkles, Target, Rocket, Brain } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import UpdatesPopup from './components/UpdatesPopup';
import AnimatedStat from './components/AnimatedStat';
import Footer from './components/Footer';
import TopFadeGrid from './components/TopFadeGrid';
import StatsBento from '@/components/ui/stats-bento';

export default function Home() {
  return (
    <main>
      <UpdatesPopup />
      <Navbar />
      <Hero />

      {/* Team RAW Info Section - SEO H1 */}
      <motion.section
        className="team-raw-intro"
        style={{
          padding: '4rem 0',
          background: 'linear-gradient(180deg, var(--color-bg-primary, #ffffff) 0%, var(--color-bg-secondary, #f8f9fa) 100%)',
          borderTop: '1px solid var(--color-border, rgba(10, 26, 58, 0.1))',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TopFadeGrid gridColor="var(--grid-color, rgba(10, 26, 58, 0.08))" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '2rem' }}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{
              fontSize: '2.5rem',
              fontFamily: 'Orbitron, sans-serif',
              color: 'var(--color-navy)',
              marginBottom: '1rem',
            }}>
              TEAM RAW – Robotics and Aviation Wing of <span style={{ color: 'var(--color-red)', textShadow: '0 0 10px rgba(225, 6, 0, 0.2)' }}>SFIT</span>
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, var(--color-red), var(--color-navy))', margin: '1rem auto', borderRadius: '2px' }} />
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-gray-dark)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '2',
            }}>
              The official robotics research and competition team of St. Francis Institute of Technology (SFIT). 
              We design, develop, and innovate robotics systems for national and international competitions.
            </p>
          </motion.div>

          <motion.div
            style={{
              maxWidth: '800px',
              margin: '2rem auto 0',
              padding: '1.5rem',
              background: 'rgba(225, 6, 0, 0.08)',
              borderRadius: '8px',
              borderLeft: '4px solid var(--color-red)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-navy)',
              fontStyle: 'italic',
              margin: 0,
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <Sparkles size={18} style={{ color: 'var(--color-red)', flexShrink: 0 }} />
              Where innovation meets engineering — building the future, one robot at a time.
            </p>
          </motion.div>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: <Target size={40} style={{ color: 'var(--color-red)' }} />, title: 'Our Mission', text: 'To provide a supportive environment for students to develop technical skills, conduct robotics research, and work on long-term innovative projects, while collaborating with industries and institutions to enhance learning and exposure in the field of robotics.', link: '/about#mission' },
              { icon: <Rocket size={40} style={{ color: 'var(--color-red)' }} />, title: 'Our Vision', text: 'To be a leading student robotics committee that drives innovation, represents SFIT globally, and cultivates a strong and lasting robotics culture within the institute.', link: '/about#vision' },
              { icon: <Brain size={40} style={{ color: 'var(--color-red)' }} />, title: 'What We Do', text: 'Autonomous robotics, embedded systems, mechanical design, AI & computer vision, ROS, mechatronics, and industrial automation.', link: '/team' },
              { icon: <Trophy size={40} style={{ color: 'var(--color-red)' }} />, title: 'Competitions', text: 'e-Yantra Robotics Competition (IIT Bombay), ABU Robocon, and Techfest IIT Bombay.', link: '/competitions' },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                style={{
                  background: 'var(--color-bg-card, #ffffff)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--color-border, rgba(10, 26, 58, 0.1))',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                  cursor: 'pointer',
                  minHeight: '280px',
                  position: 'relative',
                  boxShadow: 'var(--shadow)',
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'var(--color-red)',
                  boxShadow: '0 20px 40px rgba(225, 6, 0, 0.15), 0 0 20px rgba(225, 6, 0, 0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>{item.icon}</div>
                <h3 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.25rem',
                  color: 'var(--color-navy)',
                  marginBottom: '0.5rem',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-gray-dark)',
                  margin: 0,
                }}>
                  {item.text}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AboutUs />

      {/* Highlights Section */}
      <motion.section
        style={{
          padding: '6rem 0',
          background: 'linear-gradient(180deg, var(--color-bg-secondary, #f5f7fa) 0%, var(--color-bg-primary, #e8ebf0) 50%, var(--color-bg-secondary, #f5f7fa) 100%)',
          color: 'var(--color-navy)',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontFamily: 'Orbitron, sans-serif',
              marginBottom: '1rem',
              color: 'var(--color-navy)',
              letterSpacing: '0.02em',
            }}>
              Team RAW <span style={{ color: 'var(--color-red)' }}>Highlights</span>
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
            }}>
              Our achievements and impact
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StatsBento />
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Links Section - Explore More */}
      <motion.section
        style={{
          padding: '5rem 0',
          background: 'radial-gradient(ellipse at center, rgba(225, 6, 0, 0.05) 0%, var(--color-bg-secondary) 60%, var(--color-bg-primary) 100%)',
          position: 'relative',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'var(--color-bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.5rem',
              color: 'var(--color-navy)',
              marginBottom: '1.5rem',
            }}>
              Explore More
            </h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {[
                { label: 'Robots & Gallery', href: '/robots-gallery' },
                { label: 'Meet the Team', href: '/team' },
                { label: 'Competitions', href: '/competitions' },
                { label: 'Contact', href: '/contact' },
              ].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  style={{
                    display: 'inline-block',
                    padding: '0.875rem 2rem',
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
                  whileHover={{
                    scale: 1.05,
                    background: 'transparent',
                    color: 'var(--color-red)',
                    boxShadow: '0 0 25px rgba(225, 6, 0, 0.4), 0 8px 20px rgba(225, 6, 0, 0.2)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>



      <Footer />
    </main>
  );
}
