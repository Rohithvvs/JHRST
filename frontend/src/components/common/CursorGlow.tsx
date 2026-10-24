import React, { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const reduce = useReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const opacity = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 140, damping: 24, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 24, mass: 0.4 });
  const background = useTransform([smoothX, smoothY], ([px, py]) => {
    return `radial-gradient(380px circle at ${px}px ${py}px, rgba(212, 175, 55, 0.13), transparent 62%)`;
  });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [opacity, reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[15]"
      style={{ background, opacity }}
    />
  );
};
