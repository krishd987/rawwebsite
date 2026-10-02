/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.08}
            width={40}
            duration={3}
            repeatDelay={1}
            strokeDasharray={0}
            style={{
              maskImage: 'radial-gradient(500px circle at center, white, transparent)',
              WebkitMaskImage: 'radial-gradient(500px circle at center, white, transparent)',
            }}
            className="pointer-events-none absolute inset-x-0 inset-y-[-30%] h-[200%] w-full skew-y-12"
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.section
            style={{
              paddingTop: '100px',
              paddingBottom: '2rem',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)',
              minHeight: '30vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
              <motion.h1
                style={{
                  fontSize: '3.5rem',
                  fontFamily: 'Orbitron, sans-serif',
                  color: 'var(--color-navy)',
                  marginBottom: '1rem',
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Contact <span style={{ color: 'var(--color-red)' }}>Us</span>
              </motion.h1>
              <motion.p
                style={{
                  fontSize: '1.2rem',
                  color: 'var(--color-gray-dark)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Get in touch with Team RAW. We'd love to hear from you!
              </motion.p>
            </div>
          </motion.section>
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}
