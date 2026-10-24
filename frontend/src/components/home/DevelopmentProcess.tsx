import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { TiltCard } from '../common/TiltCard';
import { Search, FileText, Palette, Code, CheckCircle, Rocket, RefreshCcw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DevelopmentProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      subtitle: 'Requirements',
      desc: 'Understand the business problem, user personas, operational constraints, and technical milestones before writing a line of code.',
      icon: Search,
      deliverables: ['Problem Framing', 'Stakeholder Interviews', 'Feasibility Assessment'],
    },
    {
      number: '02',
      title: 'Planning',
      subtitle: 'Architecture',
      desc: 'Define system specifications, modular microservices architecture, relational database schemas, and REST API contracts.',
      icon: FileText,
      deliverables: ['System Architecture Diagram', 'Database Schema', 'Sprint Milestones'],
    },
    {
      number: '03',
      title: 'Design',
      subtitle: 'UI/UX Prototypes',
      desc: 'Develop responsive wireframes, design tokens, interactive Figma prototypes, and accessibility standards.',
      icon: Palette,
      deliverables: ['Design System', 'Interactive Prototypes', 'Responsive Layouts'],
    },
    {
      number: '04',
      title: 'Development',
      subtitle: 'Implementation',
      desc: 'Build modular frontend components, high-throughput backend services, and AI pipelines with type safety and clean code.',
      icon: Code,
      deliverables: ['Clean Git Repositories', 'Type-Safe APIs', 'AI Vector Workflows'],
    },
    {
      number: '05',
      title: 'Testing',
      subtitle: 'Verification & QA',
      desc: 'Verify cross-browser fidelity, automated unit/integration suites, security boundaries, rate limiting, and speed benchmarks.',
      icon: CheckCircle,
      deliverables: ['Automated Test Suites', 'Load & Security Audits', 'Zero-Defect Sign-off'],
    },
    {
      number: '06',
      title: 'Deployment',
      subtitle: 'Production Launch',
      desc: 'Deploy resilient cloud infrastructure, configure SSL, setup automated CI/CD pipelines, and active health monitoring.',
      icon: Rocket,
      deliverables: ['Production CI/CD', 'DNS & SSL Provisioning', 'Real-time Telemetry'],
    },
    {
      number: '07',
      title: 'Improvement',
      subtitle: 'Iterative Scaling',
      desc: 'Review operational metrics, collect real user feedback, patch edge cases, and deploy performance optimizations.',
      icon: RefreshCcw,
      deliverables: ['Continuous Audits', 'Feature Expansion', 'SLA Support'],
    },
  ];

  return (
    <section className="py-24 relative bg-[#070707] border-t border-[#1a1a1a] overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR METHODOLOGY"
          title="Our 7-Step Development"
          highlight="Process"
          description="A structured, transparent engineering lifecycle designed to minimize risk and deliver dependable digital solutions."
        />

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <TiltCard
                key={step.number}
                onClick={() => setActiveStep(idx)}
                maxTilt={7}
                className={`cursor-pointer p-5 rounded-2xl border flex flex-col justify-between select-none ${
                  isSelected
                    ? 'glass-card border-gold-400 shadow-gold-sm bg-gold-500/10'
                    : 'bg-[#101010] border-white/[0.06] hover:border-gold-500/40 hover:bg-[#141414]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
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
                  <p className="text-[11px] text-gold-400 font-mono">
                    {step.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-gray-500">
                  <span>Phase {idx + 1}</span>
                  <span className={isSelected ? 'text-gold-400' : 'text-gray-600'}>●</span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Highlighted active step detail box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16, rotateX: -16 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -10, rotateX: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1100, transformOrigin: 'top center' }}
            className="p-8 rounded-2xl glass-card border border-gold-500/40 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-mono font-bold">
                  Step {steps[activeStep].number} In Detail:
                </span>
                <span className="text-xs text-gray-400">&bull;</span>
                <span className="text-xs text-gray-300 font-medium">{steps[activeStep].title}</span>
              </div>
              <h4 className="text-xl font-bold text-white font-heading">
                {steps[activeStep].subtitle} Execution
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/[0.08] md:pl-6 space-y-2">
              <p className="text-xs uppercase font-mono tracking-wider text-gold-400 font-semibold">
                Phase Deliverables:
              </p>
              <div className="space-y-1.5">
                {steps[activeStep].deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
