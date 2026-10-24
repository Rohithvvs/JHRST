import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Zap, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const AboutPreview: React.FC = () => {
  const cards = [
    {
      title: 'Our Mission',
      description: 'To build reliable, accessible, and innovative technology solutions that solve real-world problems.',
      icon: Target,
      highlight: 'Reliable & Accessible',
    },
    {
      title: 'Our Vision',
      description: 'To help businesses and individuals embrace technology to create smarter, more connected, and more efficient experiences.',
      icon: Compass,
      highlight: 'Smarter & Connected',
    },
    {
      title: 'Our Approach',
      description: 'We combine thoughtful planning, modern engineering, continuous improvement, and user-focused design to deliver meaningful digital products.',
      icon: Zap,
      highlight: 'User-Focused Design',
    },
  ];

  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ABOUT US"
          title="Technology with Purpose."
          highlight="Innovation with Impact."
          description="At JHRST Tech Solutions, we focus on turning ideas into practical digital solutions. We combine software engineering, artificial intelligence, modern application development, and automation to help businesses solve problems and build for the future."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="relative p-8 rounded-2xl bg-[#111111] border border-[#262626] hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  {card.title}
                </h3>

                <p className="text-xs uppercase tracking-wider text-gold-400/90 font-medium mb-3">
                  {card.highlight}
                </p>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {card.description}
                </p>

                {/* Subtle bottom gold glow */}
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-500/60 transition-all" />
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/about">
            <Button
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Discover Our Company
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

