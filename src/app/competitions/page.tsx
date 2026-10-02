/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import Navbar from '../components/Navbar';
import Competitions from '../components/Competitions';
import Footer from '../components/Footer';
import KineticGrid from '@/components/ui/kinetic-grid';

export default function CompetitionsPage() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <KineticGrid style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Competitions />
        </div>
      </div>
      <Footer />
    </>
  );
}
