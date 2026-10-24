import React from 'react';
import { Brain, Globe, Smartphone, Cpu, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../common/Reveal';
import { TiltCard } from '../common/TiltCard';

export const TrustCapabilities: React.FC = () => {
  const capabilities = [
    {
      title: 'Artificial Intelligence',
      desc: 'Machine learning models, LLM agents & NLP pipelines',
      icon: Brain,
    },
    {
      title: 'Web Development',
      desc: 'Responsive, fast & secure full-stack applications',
      icon: Globe,
    },
    {
      title: 'Mobile Applications',
      desc: 'Native Android & modern cross-platform mobile apps',
      icon: Smartphone,
    },
    {
      title: 'Software Engineering',
      desc: 'Custom software architectures & resilient backends',
      icon: Cpu,
    },
    {
      title: 'Workflow Automation',
      desc: 'Intelligent business process orchestration & RPA',
      icon: Bot,
    },
    {
      title: 'Digital Innovation',
      desc: 'User-centered product design & technical consulting',
      icon: Sparkles,
    },
  ];

  const techStack = [
    'Python',
    'FastAPI',
    'React 19',
    'TypeScript',
    'PyTorch',
    'PostgreSQL',
    'Docker',
    'Tailwind CSS',
    'Zod & Pydantic',
  ];

  return (
    <section className="relative py-16 border-y border-[#1c1c1c] bg-[#080808] overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold font-mono">
            Core Technology Capabilities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.title} delay={index * 0.06} className="h-full">
                <TiltCard
                  maxTilt={10}
                  className="group flex h-full cursor-default flex-col items-center p-5 text-center rounded-2xl glass-card glass-card-glow"
                >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 mb-3.5 group-hover:scale-110 group-hover:border-gold-400/60 group-hover:bg-gold-500/20 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-gold-300 transition-colors font-heading leading-tight">
                  {cap.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {cap.desc}
                </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Enterprise Tech Stack Strip */}
        <div className="mt-12 pt-8 border-t border-[#181818] flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400">
          <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono font-medium mr-2">
            Engineered With:
          </span>
          {techStack.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ rotateX: 16, rotateY: -12, scale: 1.08, z: 12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              style={{ transformPerspective: 500 }}
              className="px-3 py-1 rounded-full bg-[#121212] border border-[#242424] text-gray-300 font-mono hover:text-gold-300 hover:border-gold-500/30 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};


