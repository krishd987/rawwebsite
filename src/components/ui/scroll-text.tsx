'use client';

import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextAnimationProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: React.ElementType;
  classname?: string;
  className?: string;
  letterAnime?: boolean;
  lineAnime?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  variants?: Variants;
  viewport?: { once?: boolean; amount?: number | 'some' | 'all' };
  duration?: number;
  delay?: number;
}

export const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  as: Component = 'div',
  classname,
  className,
  letterAnime = false,
  lineAnime = false,
  direction = 'up',
  variants,
  viewport = { once: true, amount: 0.25 },
  duration = 0.5,
  delay = 0,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, viewport);

  // Direction offset
  const getDirectionOffset = () => {
    switch (direction) {
      case 'down':
        return { y: -30, x: 0 };
      case 'left':
        return { x: 40, y: 0 };
      case 'right':
        return { x: -40, y: 0 };
      case 'up':
      default:
        return { y: 30, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  // Default container variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: letterAnime ? 0.03 : lineAnime ? 0.08 : 0.05,
        delayChildren: delay,
      },
    },
  };

  // Default item variants
  const defaultItemVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(8px)',
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const activeVariants = variants || defaultItemVariants;

  const combinedClassName = cn(classname, className);

  // If letter animation is enabled
  if (letterAnime) {
    const letters = text.split('');
    const MotionComponent = motion.create(Component);

    return (
      <MotionComponent
        ref={containerRef as any}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={combinedClassName}
        style={style}
        {...(props as any)}
      >
        {letters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={activeVariants}
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // If line / word animation is enabled
  if (lineAnime) {
    const words = text.split(' ');
    const MotionComponent = motion.create(Component);

    return (
      <MotionComponent
        ref={containerRef as any}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={combinedClassName}
        style={style}
        {...(props as any)}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}
          >
            <motion.span
              variants={activeVariants}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </MotionComponent>
    );
  }

  // Standard block animation
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={containerRef as any}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={activeVariants}
      className={combinedClassName}
      style={style}
      {...(props as any)}
    >
      {text}
    </MotionComponent>
  );
};

export default TextAnimation;
