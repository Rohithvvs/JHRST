import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
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
    <section className="py-24 relative bg-[#050505] overflow-hidden">
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
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative p-8 rounded-2xl glass-card glass-card-hover group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/15 to-transparent border border-gold-500/30 flex items-center justify-center text-gold-300 mb-6 group-hover:scale-105 group-hover:border-gold-400/60 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 font-heading group-hover:text-gold-200 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-gold-400 font-mono font-medium mb-4">
                    {card.highlight}
                  </p>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle bottom gold glow */}
                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-gold-400/80">Pillar 0{idx + 1}</span>
                  <span className="text-white/40 group-hover:text-gold-300 transition-colors">&rarr;</span>
                </div>
              </motion.div>
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


