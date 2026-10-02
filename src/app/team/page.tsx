/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import KineticGrid from '@/components/ui/kinetic-grid';

export const metadata = {
  title: 'Our Team | Team RAW',
  description: 'Meet the talented individuals behind Team RAW - our core team, mentors, members, and alumni who drive innovation in robotics.',
};

const TeamSectionLoading = () => (
  <SkeletonLoader />
);

const TeamPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <KineticGrid style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Suspense fallback={<TeamSectionLoading />}>
            <TeamSection />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeamPage;
