import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function useFinePointer() {
  const [fine, setFine] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const onChange = () => setFine(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return fine;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  id,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glareOpacity = useMotionValue(0);

  const spring = { stiffness: 220, damping: 20, mass: 0.35 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-maxTilt, maxTilt]), spring);
  const glareX = useSpring(useTransform(pointerX, [-0.5, 0.5], [15, 85]), spring);
  const glareY = useSpring(useTransform(pointerY, [-0.5, 0.5], [15, 85]), spring);
  const glareAlpha = useSpring(glareOpacity, { stiffness: 200, damping: 24 });
  const glareBackground = useTransform([glareX, glareY], ([x, y]) => {
    return `radial-gradient(circle at ${Number(x)}% ${Number(y)}%, rgba(255, 236, 176, 0.26), transparent 46%)`;
  });

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(1);
  };

  const onMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    glareOpacity.set(0);
  };

  if (reduce || !finePointer) {
    return (
      <div id={id} onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
      whileHover={{ scale: 1.018, z: 18 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      id={id}
      onClick={onClick}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-screen"
          style={{ opacity: glareAlpha, background: glareBackground }}
        />
      )}
    </motion.div>
  );
};
