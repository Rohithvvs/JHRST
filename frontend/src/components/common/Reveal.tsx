import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 28,
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{ transformPerspective: 1000, transformOrigin: 'center bottom' }}
    >
      {children}
    </motion.div>
  );
};
