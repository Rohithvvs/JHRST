import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { TiltCard } from '../common/TiltCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-28 relative bg-[#F8FAFC] border-t border-slate-200 overflow-hidden">
      {/* Centered subtle gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gold-500/[0.12] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <TiltCard
            maxTilt={5}
            className="p-10 sm:p-14 rounded-3xl bg-white border border-blue-200 shadow-xl text-center relative overflow-hidden"
          >
          {/* Top corner accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          <div className="mb-6 inline-block">
            <Badge variant="gold">
              READY TO COLLABORATE
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight font-heading mb-6 max-w-3xl mx-auto">
            Your Next Breakthrough Idea{' '}
            <span className="text-gold-gradient block sm:inline">Starts Here.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            Let's turn your vision into an enterprise digital product designed to solve complex business problems through modern engineering and applied AI systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/contact">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-gold-md hover:shadow-gold-glow"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Your Project
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
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Initial Estimate in 24 Hours</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Non-Disclosure Protected (NDA)</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Direct Lead Engineer Review</span>
            </div>
          </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
};
