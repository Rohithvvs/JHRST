import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { Search, FileText, Palette, Code, CheckCircle, Rocket, RefreshCcw } from 'lucide-react';

export const DevelopmentProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      subtitle: 'Understanding Requirements',
      desc: 'Understand the business problem, user needs, objectives, operational constraints, and project scope before writing a line of code.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Planning',
      subtitle: 'Architecture & Scope',
      desc: 'Define system specifications, technical architecture, database schemas, API contracts, milestones, and deliverables.',
      icon: FileText,
    },
    {
      number: '03',
      title: 'Design',
      subtitle: 'User Experience & UI',
      desc: 'Develop responsive wireframes, user flows, design tokens, and interactive Figma prototypes aligned with our clean black-and-gold visual standard.',
      icon: Palette,
    },
    {
      number: '04',
      title: 'Development',
      subtitle: 'Agile Implementation',
      desc: 'Build frontend components, backend microservices, database schemas, and AI integrations with type safety and clean architecture.',
      icon: Code,
    },
    {
      number: '05',
      title: 'Testing',
      subtitle: 'Verification & QA',
      desc: 'Test functionality, responsive layouts across 7 viewports, security boundaries, rate limiting, and performance benchmarks.',
      icon: CheckCircle,
    },
    {
      number: '06',
      title: 'Deployment',
      subtitle: 'Production Launch',
      desc: 'Configure production infrastructure, environment variables, SSL certificates, automated CI/CD pipelines, and active health monitoring.',
      icon: Rocket,
    },
    {
      number: '07',
      title: 'Improvement',
      subtitle: 'Iterative Scaling',
      desc: 'Collect real user feedback, monitor system logs, fix emerging edge cases, and implement prioritized feature enhancements.',
      icon: RefreshCcw,
    },
  ];

  return (
    <section className="py-24 relative bg-[#090909] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR METHODOLOGY"
          title="Our Development"
          highlight="Process"
          description="A structured, transparent engineering lifecycle designed to minimize risk and deliver dependable digital solutions."
        />

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141414] border-gold-500 shadow-gold-sm -translate-y-1'
                    : 'bg-[#0f0f0f] border-[#222] hover:border-gold-500/40 hover:bg-[#121212]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold font-heading px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-gold-500 text-black'
                          : 'bg-[#1a1a1a] text-gold-400 border border-[#2b2b2b]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-gold-300' : 'text-gray-400'
                      }`}
                    />
                  </div>

                  <h3 className="text-sm font-bold text-white font-heading mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-gold-400/90 font-medium mb-2">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-[11px] text-gray-300 leading-relaxed mt-2 line-clamp-4">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlighted active step detail box */}
        <div className="mt-8 p-6 rounded-2xl bg-[#111111] border border-gold-500/30 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Step {steps[activeStep].number} In Detail: {steps[activeStep].title}
            </span>
            <p className="text-sm text-gray-300">
              {steps[activeStep].desc}
            </p>
          </div>
          <div className="text-xs text-muted whitespace-nowrap">
            Phase {activeStep + 1} of 7
          </div>
        </div>
      </div>
    </section>
  );
};

