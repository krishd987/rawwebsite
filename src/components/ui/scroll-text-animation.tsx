'use client';

import React from 'react';
import TextAnimation from '@/components/ui/scroll-text';

export function ScrollTextAnimation() {
  return (
    <div className="w-full text-foreground">
      <div className="h-[300px] md:h-[400px] grid place-content-center text-center">
        <h2 className="text-3xl md:text-5xl font-semibold font-['Orbitron',sans-serif] tracking-wider text-slate-800 dark:text-white">
          Scroll Down <span className="inline-block animate-bounce">👇</span>
        </h2>
      </div>

      <div className="min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
        <TextAnimation
          text="Creative ideas start here."
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { ease: 'linear', duration: 0.6 },
            },
          }}
          classname="xl:text-7xl md:text-6xl text-4xl max-w-2xl mx-auto font-medium capitalize text-slate-900 dark:text-white"
        />
      </div>

      <div className="min-h-[50vh] md:min-h-[60vh] flex items-center text-left px-6 md:px-16 max-w-5xl mx-auto">
        <TextAnimation
          as="p"
          letterAnime={true}
          text="Let's team up and turn ideas into reality ✨"
          classname="text-3xl md:text-5xl lg:text-6xl max-w-2xl font-light text-red-600 dark:text-red-400"
          variants={{
            hidden: { filter: 'blur(4px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.25,
              },
            },
          }}
        />
      </div>

      <div className="min-h-[50vh] md:min-h-[60vh] flex justify-center items-center text-right px-6 md:px-16 max-w-5xl mx-auto">
        <TextAnimation
          text="Turning concepts into reality"
          direction="right"
          classname="text-3xl md:text-5xl lg:text-6xl max-w-2xl ml-auto capitalize text-slate-900 dark:text-white font-semibold"
        />
      </div>

      <div className="min-h-[50vh] md:min-h-[60vh] flex justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <TextAnimation
          text="Dream big, work hard & achieve greatness"
          direction="down"
          lineAnime={true}
          classname="text-3xl md:text-5xl lg:text-6xl max-w-2xl mx-auto capitalize text-red-600 font-bold"
        />
      </div>
    </div>
  );
}

export default ScrollTextAnimation;
