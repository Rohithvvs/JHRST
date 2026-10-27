import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { TiltCard } from '../common/TiltCard';
import { Button } from '../common/Button';

export const AboutPreview: React.FC = () => {
  const cards = [
    {
      title: 'Our Mission',
      description: 'To build reliable, accessible, and innovative technology solutions that solve real-world problems with engineering precision.',
      icon: Target,
      highlight: 'Reliable & Accessible',
    },
    {
      title: 'Our Vision',
      description: 'To help businesses embrace modern technology to create smarter, more connected, and highly scalable digital ecosystems.',
      icon: Compass,
      highlight: 'Smarter & Connected',
    },
    {
      title: 'Our Approach',
      description: 'We combine rigorous planning, clean modern architecture, rapid prototyping, and user-focused design to deliver dependable digital products.',
      icon: Zap,
      highlight: 'User-Focused Architecture',
    },
  ];

  return (
    <section className="py-24 relative bg-[#F8FAFC] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="ABOUT US"
          title="Technology with Purpose."
          highlight="Innovation with Impact."
          description="At JHRST Tech Solutions, we focus on turning ideas into practical digital solutions. We combine software engineering, artificial intelligence, modern application development, and automation to help businesses solve problems and build for the future."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={idx * 0.1} className="h-full">
                <TiltCard className="relative flex h-full flex-col justify-between p-8 rounded-2xl glass-card glass-card-glow group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:scale-105 group-hover:border-gold-400/60 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-blue-600 font-mono font-semibold mb-4">
                    {card.highlight}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle bottom gold glow */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-blue-600/90 font-medium">Pillar 0{idx + 1}</span>
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors">&rarr;</span>
                </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/about">
            <Button
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Discover Our Company &amp; Culture
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


