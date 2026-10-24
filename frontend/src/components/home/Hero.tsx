import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Cpu, Code2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { HeroVisual } from './HeroVisual';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#050505]">
      {/* Background High-Tech Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Atmospheric radial gold glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gold-500/[0.09] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-gold-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Actions (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left space-y-7"
          >
            {/* Announcement Pill Tag */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-500/10 via-[#181818] to-transparent border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_-3px_rgba(212,175,55,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
                </span>
                <span>AI SOLUTIONS &bull; SOFTWARE ENGINEERING &bull; AUTOMATION</span>
              </div>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.1rem] font-bold tracking-tight text-white leading-[1.08] font-heading">
              Building Digital Solutions for a{' '}
              <span className="text-gold-gradient block sm:inline">Smarter Future.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
              <strong className="text-white font-medium">JHRST Tech Solutions</strong> transforms ideas into resilient digital products through custom AI architectures, modern full-stack engineering, autonomous workflows, and cloud-native software.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
                  className="w-full sm:w-auto border-white/10 hover:border-gold-500/50"
                  leftIcon={<Layers className="w-4 h-4 text-gold-400" />}
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>

            {/* Micro Highlights & Trust Indicators */}
            <div className="pt-6 border-t border-[#1f1f1f] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-medium">Production-Grade Code</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-medium">Applied AI &amp; Agents</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-medium">Bengaluru &bull; Global Scale</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


