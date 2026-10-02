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
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        width={40}
        duration={3}
        repeatDelay={1}
        strokeDasharray={0}
        style={{
          maskImage: 'radial-gradient(600px circle at center, white, transparent)',
          WebkitMaskImage: 'radial-gradient(600px circle at center, white, transparent)',
        }}
        className="pointer-events-none absolute inset-x-0 inset-y-[-30%] h-[200%] w-full skew-y-12"
      />
      <Navbar />
      <RobotsGallery />
      <Footer />
    </main>
  );
}
