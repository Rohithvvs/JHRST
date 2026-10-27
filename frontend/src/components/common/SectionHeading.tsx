import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26, rotateX: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 900, transformOrigin: 'center bottom' }}
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-14 ${className}`}
    >
      {badge && (
        <div className="mb-4">
          <Badge variant="gold">{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight font-heading">
        {title}{' '}
        {highlight && (
          <span className="text-gold-gradient font-extrabold">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted leading-relaxed font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
};

