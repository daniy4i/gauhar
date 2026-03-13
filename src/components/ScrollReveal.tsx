import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type RevealType = 'fade' | 'slide' | 'scale' | 'blur' | 'mask';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  type?: RevealType;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  staggerChildren?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'p' | 'h1' | 'h2' | 'h3';
}

const getVariants = (
  direction: RevealDirection,
  type: RevealType,
  distance: number,
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const baseHidden = directionMap[direction];

  switch (type) {
    case 'blur':
      return {
        hidden: { opacity: 0, filter: 'blur(8px)', ...baseHidden },
        visible: { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 },
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.92, ...baseHidden },
        visible: { opacity: 1, scale: 1, x: 0, y: 0 },
      };
    case 'slide':
      return {
        hidden: { opacity: 0, ...baseHidden },
        visible: { opacity: 1, x: 0, y: 0 },
      };
    case 'mask':
      return {
        hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', ...baseHidden },
        visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', x: 0, y: 0 },
      };
    case 'fade':
    default:
      return {
        hidden: { opacity: 0, ...baseHidden },
        visible: { opacity: 1, x: 0, y: 0 },
      };
  }
};

const ScrollReveal = ({
  children,
  direction = 'up',
  type = 'blur',
  delay = 0,
  duration = 0.7,
  distance = 30,
  className = '',
  once = true,
  margin = '-80px',
  staggerChildren,
  as = 'div',
}: ScrollRevealProps) => {
  const variants = getVariants(direction, type, distance);
  const Component = motion[as] as any;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(staggerChildren ? { staggerChildren } : {}),
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
