/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RobotsGallery from '../components/RobotsGallery';
import KineticGrid from '@/components/ui/kinetic-grid';
import TextAnimation from '@/components/ui/scroll-text';

export default function RobotsGalleryPage() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <KineticGrid style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1 }} />
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '5.5rem' }}>
          <RobotsGallery />
        </div>
      </div>
      <Footer />
    </>
  );
}
