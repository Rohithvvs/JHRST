import React from 'react';
import { Brain, Globe, Smartphone, Cpu, Bot, Sparkles } from 'lucide-react';

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

  return (
    <section className="relative py-12 border-y border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
            Core Technology Capabilities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="group p-4 rounded-xl bg-[#121212] border border-[#242424] hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 shadow-card flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-gold-300 transition-colors font-heading">
                  {cap.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

