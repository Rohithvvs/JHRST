import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../common/Button';
import { HeroVisual } from './HeroVisual';

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE = ['Building', 'Digital', 'Solutions', 'for', 'a'];

export const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 640], [0, 72]);
  const visualRotate = useTransform(scrollY, [0, 640], [0, 8]);

  return (
    <section className="relative min-h-[94vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#F8FAFC]">
      {/* Background High-Tech Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Atmospheric radial brand glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-sky-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Actions (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-7">
            {/* Announcement Pill Tag */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ transformPerspective: 700, transformOrigin: 'left center' }}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span>AI SOLUTIONS &bull; SOFTWARE ENGINEERING &bull; AUTOMATION</span>
              </div>
            </motion.div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.1rem] font-bold tracking-tight text-slate-900 leading-[1.08] font-heading [perspective:800px]">
              {HEADLINE.map((word, index) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.28em]"
                  initial={reduce ? false : { opacity: 0, y: 28, rotateX: -55 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: 0.08 + index * 0.06, ease: EASE }}
                  style={{ transformOrigin: 'center bottom', transformPerspective: 700 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-gold-gradient block sm:inline"
                initial={reduce ? false : { opacity: 0, y: 36, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.75, delay: 0.46, ease: EASE }}
                style={{ transformOrigin: 'center bottom', transformPerspective: 700 }}
              >
                Smarter Future.
              </motion.span>
            </h1>

            {/* Supporting Description */}
            <motion.p
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            >
              <strong className="text-slate-900 font-semibold">JHRST Tech Solutions</strong> transforms ideas into resilient digital products through custom AI architectures, modern full-stack engineering, autonomous workflows, and cloud-native software.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.68, ease: EASE }}
            >
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-gold-md hover:shadow-gold-glow"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border-slate-200 hover:border-blue-500/50"
                  leftIcon={<Layers className="w-4 h-4 text-blue-600" />}
                >
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>

            {/* Micro Highlights & Trust Indicators */}
            <motion.div
              className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-700"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.8, ease: EASE }}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">Production-Grade Code</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">Applied AI &amp; Agents</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">Bengaluru &bull; Global Scale</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual (5 cols) */}
          <motion.div
            style={{
              y: visualY,
              rotateX: visualRotate,
              transformPerspective: 1200,
              transformOrigin: 'center center',
            }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, rotateY: 22, z: -80 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              transition={{ duration: 0.95, delay: 0.15, ease: EASE }}
              style={{ transformPerspective: 1200 }}
              className="w-full"
            >
              <HeroVisual />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
