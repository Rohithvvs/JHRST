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
    <section className="relative py-16 border-y border-slate-200 bg-[#F8FAFC] overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-bold font-mono">
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
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3.5 group-hover:scale-110 group-hover:border-gold-400/60 group-hover:bg-gold-500/20 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors font-heading leading-tight">
                  {cap.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {cap.desc}
                </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Enterprise Tech Stack Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500">
          <span className="text-[11px] uppercase tracking-widest text-slate-500 font-mono font-medium mr-2">
            Engineered With:
          </span>
          {techStack.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ rotateX: 16, rotateY: -12, scale: 1.08, z: 12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              style={{ transformPerspective: 500 }}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-mono hover:text-blue-600 hover:border-blue-400 shadow-sm transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};


