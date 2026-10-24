import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-28 relative bg-[#060606] border-t border-[#1a1a1a] overflow-hidden">
      {/* Centered subtle gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6 inline-block">
          <Badge variant="gold">
            READY TO COLLABORATE
          </Badge>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-heading mb-6">
          Your Next Big Idea{' '}
          <span className="text-gold-gradient">Starts Here.</span>
        </h2>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Let's turn your idea into a digital product designed to solve real problems and create new opportunities through modern engineering and applied AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Project
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

        <p className="text-xs text-muted mt-8">
          JHRST Tech Solutions &bull; BUILD. INNOVATE. GROW.
        </p>
      </div>
    </section>
  );
};

