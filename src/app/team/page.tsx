/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';

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
