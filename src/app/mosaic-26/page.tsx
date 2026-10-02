'use client';

import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KineticGrid from '@/components/ui/kinetic-grid';
import TextAnimation from '@/components/ui/scroll-text';
import TimelineAnimation from '@/components/ui/timeline-animation';
import ScrollTextAnimation from '@/components/ui/scroll-text-animation';
import styles from './mosaic.module.css';
import { Calendar, Download, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';

export default function Mosaic26Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "MOSAIC '26 | Team RAW College Event";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      "Official MOSAIC '26 college event document of Robotics and Aviation Wing (RAW) SFIT."
    );
  }, []);

  const imageUrl = '/Mojaic26.png';

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: 25,
      opacity: 0,
    },
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer} ref={containerRef}>
        <KineticGrid
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
          }}
        />

        <main className={styles.mainContent}>
          {/* Header Banner with TextAnimation */}
          <div className="text-center mb-6 max-w-3xl mx-auto pt-4">
            <TimelineAnimation
              animationNum={1}
              timelineRef={containerRef}
              customVariants={revealVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 font-semibold text-xs tracking-wider uppercase mb-3"
            >
              <Sparkles size={14} />
              Annual Robotics Symposium & Competition
            </TimelineAnimation>

            <TextAnimation
              as="h1"
              lineAnime={true}
              text="MOSAIC '26"
              classname="text-4xl md:text-6xl font-extrabold font-['Orbitron',sans-serif] tracking-tight text-white mb-2"
              variants={{
                hidden: { filter: 'blur(12px)', opacity: 0, y: 20 },
                visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            />

            <TextAnimation
              as="p"
              direction="up"
              text="Robotics and Aviation Wing • St. Francis Institute of Technology"
              classname="text-sm md:text-base text-slate-300 font-medium"
            />
          </div>

          {/* Quick Action Navigation Buttons */}
          <TimelineAnimation
            animationNum={2}
            timelineRef={containerRef}
            customVariants={revealVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <Link
              href="/ppt-submission"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/25 hover:scale-105"
            >
              <Send size={16} />
              Submit Idea PPT
            </Link>
            <a
              href="/mosaic-files/Mosaic26-IDEA-Presentation-Format.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/15 backdrop-blur-md"
            >
              <Download size={16} />
              PPT Format Template
            </a>
          </TimelineAnimation>

          {/* Responsive Event Poster with Timeline Animation */}
          <TimelineAnimation
            animationNum={3}
            timelineRef={containerRef}
            customVariants={revealVariants}
            className={styles.imageWrapper}
          >
            <img
              src={imageUrl}
              alt="MOSAIC '26 Event Details"
              className={styles.eventImage}
              loading="eager"
            />
          </TimelineAnimation>

          {/* Scroll-Triggered Text Animation Section */}
          <div className="w-full mt-16 pt-8 border-t border-white/10">
            <ScrollTextAnimation />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
