import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { HeroVisual } from './HeroVisual';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:py-32 overflow-hidden">
      {/* Background radial gold glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Actions (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div>
              <Badge variant="gold">
                TECHNOLOGY &bull; INNOVATION &bull; IMPACT
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] font-heading">
              Building Digital Solutions for a{' '}
              <span className="text-gold-gradient">Smarter Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
              JHRST Tech Solutions transforms ideas into powerful digital products through AI, modern software engineering, intelligent automation, and scalable technology solutions.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  leftIcon={<Layers className="w-4 h-4 text-gold-400" />}
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[#222222] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold-400" />
                <span>Production-Ready Code</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold-400" />
                <span>Applied AI Systems</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <div className="w-2 h-2 rounded-full bg-gold-400" />
                <span>Responsive &amp; Accessible</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

