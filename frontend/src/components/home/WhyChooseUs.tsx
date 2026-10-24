import React from 'react';
import { Lightbulb, Users, Network, RefreshCw, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { TiltCard } from '../common/TiltCard';

export const WhyChooseUs: React.FC = () => {
  const values = [
    {
      title: 'Practical Innovation',
      desc: 'We focus on technology that addresses real problems and creates measurable value, strictly avoiding hype-driven complexity.',
      icon: Lightbulb,
      tag: 'Objective Driven',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'AI-Native System Architecture',
      desc: 'We architect software from the ground up to integrate modern LLMs, autonomous agents, and vector indexes with sub-50ms query latency.',
      icon: Network,
      tag: 'Next-Gen Stack',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Human-Centered Experience',
      desc: 'We design digital products around the psychological needs of their end users, combining visual prestige with effortless usability.',
      icon: Users,
      tag: 'Ergonomic UI/UX',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Continuous Improvement & Security',
      desc: 'We protect client codebases through automated CI/CD, strict input sanitization, OWASP top 10 compliance, and continuous monitoring.',
      icon: ShieldCheck,
      tag: 'Enterprise Ready',
      colSpan: 'md:col-span-1',
    },
  ];

  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gold-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR PRINCIPLES"
          title="Why Build with"
          highlight="JHRST?"
          description="We take a transparent, engineering-first approach to delivering software that solves problems without unnecessary friction or technical debt."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Reveal key={val.title} delay={idx * 0.08} className="h-full">
                <TiltCard className="flex h-full flex-col justify-between p-8 rounded-2xl glass-card glass-card-glow group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/15 to-transparent border border-gold-500/30 flex items-center justify-center text-gold-300 group-hover:scale-105 group-hover:border-gold-400/60 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-mono px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                      {val.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-gold-200 transition-colors">
                    {val.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">
                      Strict Standard
                    </span>
                  </div>
                  <span className="text-xs text-gold-400/60 font-mono">0{idx + 1}</span>
                </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
