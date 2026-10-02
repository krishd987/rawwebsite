/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RobotsGallery from '../components/RobotsGallery';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';

export default function RobotsGalleryPage() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
          <AnimatedGridPattern
            numSquares={35}
            maxOpacity={0.08}
            width={50}
            height={50}
            duration={3.5}
            repeatDelay={1.2}
            strokeDasharray={0}
            style={{
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
            }}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <RobotsGallery />
        </div>
      </div>
      <Footer />
    </>
  );
}
