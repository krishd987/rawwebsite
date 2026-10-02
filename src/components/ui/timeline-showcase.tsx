'use client';

import React, { useRef } from 'react';
import { TimelineAnimation } from '@/components/ui/timeline-animation';
import { cn } from '@/lib/utils';
import { Bot, ChevronRight, Sparkles, Trophy, Users, Layers, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const teamRawSectionsData = [
  {
    id: 'hero-bots',
    name: '2026 Autonomous Navigation Bot',
    url: '/robots-gallery',
    year: '2026',
    category: 'Autonomous SLAM',
    des: 'LiDAR-driven real-time path planning and obstacle traversal system.',
    imgSrc: '/images/bots-hero/2026 r1.jpeg',
  },
  {
    id: 'gripper-2026',
    name: '2026 High-Torque Gripper',
    url: '/robots-gallery',
    year: '2026',
    category: 'Pneumatic Gripper',
    des: 'Closed-loop multi-axis gripper mechanism for rapid pick-and-place.',
    imgSrc: '/images/bots-hero/2026 r2.jpeg',
  },
  {
    id: 'harvester-2025',
    name: '2025 Quad Harvester Bot',
    url: '/robots-gallery',
    year: '2025',
    category: 'e-Yantra 2025',
    des: 'Precision agricultural harvesting robot with smart color sorting.',
    imgSrc: '/images/bots-hero/2025 r1.png',
  },
  {
    id: 'defense-2025',
    name: '2025 Holonomic Base',
    url: '/robots-gallery',
    year: '2025',
    category: 'Robocon 2025',
    des: 'Omnidirectional high-traction drive system with active damping.',
    imgSrc: '/images/bots-hero/2025 r2.png',
  },
  {
    id: 'rover-2024',
    name: '2024 Autonomous Rover',
    url: '/robots-gallery',
    year: '2024',
    category: 'National Finalist',
    des: 'Smart optical line following and automated obstacle evasion.',
    imgSrc: '/images/bots-hero/2024 r1.png',
  },
  {
    id: 'thrower-2024',
    name: '2024 Pneumatic Thrower',
    url: '/robots-gallery',
    year: '2024',
    category: 'Robocon 2024',
    des: 'Calibrated air reservoir actuator with precision trajectory arc.',
    imgSrc: '/images/bots-hero/2024 r2.png',
  },
  {
    id: 'caster-2023',
    name: '2023 Omni Ring Caster',
    url: '/robots-gallery',
    year: '2023',
    category: 'Robocon 2023',
    des: 'Triple-wheel holonomic base with continuous fly-wheel launcher.',
    imgSrc: '/images/bots-hero/2023 r1.png',
  },
  {
    id: 'lagori-2022',
    name: '2022 Lagori Shooter Bot',
    url: '/robots-gallery',
    year: '2022',
    category: 'Robocon 2022',
    des: 'Rapid-fire disc mechanism engineered for dynamic target acquisition.',
    imgSrc: '/images/bots-hero/2022 r1.png',
  },
  {
    id: 'passer-2020',
    name: '2020 Passer Robot',
    url: '/robots-gallery',
    year: '2020',
    category: 'Robocon 2020',
    des: 'Pneumatic ball feeding system with optical sensors and chassis.',
    imgSrc: '/images/bots-hero/2020 r1.png',
  },
];

export function TimelineSectionsShowcase() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: 20,
      opacity: 0,
    },
  };

  return (
    <section ref={timelineRef} className="py-16 px-4 max-w-6xl mx-auto">
      {/* Featured Header Card */}
      <TimelineAnimation
        as="article"
        animationNum={1}
        timelineRef={timelineRef}
        customVariants={revealVariants}
        className="flex md:flex-row flex-col gap-6 justify-between mb-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-red-950/40 border border-red-500/20 backdrop-blur-xl p-6 md:p-8 relative overflow-hidden text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-red-400 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
              Robotics Showcase
            </span>
            <span className="text-xs text-slate-400 font-mono">2020 — 2026 Evolution</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-['Orbitron',sans-serif] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white grid place-content-center shadow-lg shadow-red-600/30">
              <Bot size={22} />
            </div>
            Team RAW Robots Fleet
          </h2>

          <p className="text-sm text-slate-300 max-w-xl">
            Explore 6+ generations of autonomous, combat, and precision mechatronics platforms engineered by Team RAW for national and international stages.
          </p>
        </div>

        <div className="z-10 flex flex-col justify-center items-start md:items-end gap-3">
          <Link
            href="/robots-gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-all shadow-lg shadow-red-600/30 hover:scale-105"
          >
            Open Full Gallery
            <ChevronRight size={16} />
          </Link>
          <span className="text-xs text-slate-400 font-mono">14+ Competition Bots Cataloged</span>
        </div>
      </TimelineAnimation>

      {/* Grid of Section Cards with Timeline Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamRawSectionsData.map((bot, index) => (
          <TimelineAnimation
            as="a"
            key={bot.id}
            animationNum={2 + index}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            href={bot.url}
            className="group relative flex flex-col bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl p-4 border border-white/10 hover:border-red-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(225,6,0,0.2)] overflow-hidden"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 mb-3">
              <Image
                src={bot.imgSrc}
                alt={bot.name}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-black/70 text-red-400 px-2 py-0.5 rounded border border-red-500/30">
                {bot.year}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  {bot.category}
                </span>
                <h3 className="font-semibold text-white text-base group-hover:text-red-400 transition-colors font-['Orbitron',sans-serif] line-clamp-1">
                  {bot.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {bot.des}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-red-400 font-medium mt-3 pt-3 border-t border-white/5">
                <span>View Robot Details</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </TimelineAnimation>
        ))}
      </div>
    </section>
  );
}

export default TimelineSectionsShowcase;
