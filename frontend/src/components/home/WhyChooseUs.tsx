import React from 'react';
import { Lightbulb, Users, Network, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const WhyChooseUs: React.FC = () => {
  const values = [
    {
      title: 'Practical Innovation',
      desc: 'We focus on technology that addresses real problems and creates meaningful value, avoiding hype-driven complexity.',
      icon: Lightbulb,
    },
    {
      title: 'User-Centered Development',
      desc: 'We design products around the needs of their intended users, combining visual clarity with effortless ergonomics.',
      icon: Users,
    },
    {
      title: 'Scalable Architecture',
      desc: 'We consider maintainability, performance, security, and future growth when designing databases, APIs, and software.',
      icon: Network,
    },
    {
      title: 'Continuous Improvement',
      desc: 'We refine products through testing, feedback, and iterative development, ensuring longevity and technical excellence.',
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR PRINCIPLES"
          title="Why Build with"
          highlight="JHRST?"
          description="We take a transparent, engineering-first approach to delivering software that solves problems without unnecessary friction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-8 rounded-2xl bg-[#0f0f0f] border border-[#242424] hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-gold-300 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1c1c1c] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span className="text-[11px] text-muted uppercase tracking-wider font-medium">
                    Verified Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

