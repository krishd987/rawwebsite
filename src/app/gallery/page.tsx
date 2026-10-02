/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
          <AnimatedGridPattern
            numSquares={45}
            maxOpacity={0.16}
            width={50}
            height={50}
            duration={3.5}
            repeatDelay={1.2}
            strokeDasharray={0}
            style={{
              maskImage: 'radial-gradient(ellipse 95% 85% at 50% 30%, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 30%, black 65%, transparent 100%)',
            }}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>
        <main style={{ position: 'relative', zIndex: 1 }}>
          <motion.section
            style={{
              paddingTop: '100px',
              paddingBottom: '2rem',
              background: 'transparent',
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
                Photo <span style={{ color: 'var(--color-red)' }}>Gallery</span>
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
                Capturing moments of innovation, achievement, and teamwork
              </motion.p>
            </div>
          </motion.section>
          <Gallery />
        </main>
      </div>
      <Footer />
    </>
  );
}
