'use client';

import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TimelineAnimationProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants | Record<string, any>;
  className?: string;
  children?: React.ReactNode;
  viewport?: {
    once?: boolean;
    amount?: number | 'some' | 'all';
    margin?: string;
  };
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: any;
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(8px)',
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const TimelineAnimation = React.forwardRef<HTMLElement, TimelineAnimationProps>(
  (
    {
      as: Component = 'div',
      animationNum = 0,
      timelineRef,
      customVariants,
      className,
      children,
      viewport = { once: true, amount: 0.15, margin: '0px 0px -50px 0px' },
      style,
      ...props
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLElement>(null);
    const targetRef = (timelineRef || forwardedRef || localRef) as React.RefObject<any>;

    const isInView = useInView(targetRef, {
      once: viewport?.once ?? true,
      amount: viewport?.amount ?? 0.15,
      margin: viewport?.margin as any,
    });

    const MotionComponent = motion.create(Component);
    const activeVariants = customVariants || defaultVariants;

    return (
      <MotionComponent
        ref={targetRef}
        custom={animationNum}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={activeVariants}
        className={cn(className)}
        style={style}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

TimelineAnimation.displayName = 'TimelineAnimation';

export default TimelineAnimation;
