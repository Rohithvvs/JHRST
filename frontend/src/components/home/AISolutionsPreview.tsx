import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, UserCheck, Eye, Network, ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const AISolutionsPreview: React.FC = () => {
  const aiCategories = [
    {
      title: 'AI Assistants & Autonomous Agents',
      description: 'Build assistants that can support research, information retrieval, workflow execution, and multi-step business operations.',
      icon: Bot,
      status: 'Beta Available',
      features: ['Contextual RAG Retrieval', 'Autonomous Tool Calling', 'Multi-step Planning'],
    },
    {
      title: 'AI-Powered Recruitment Intelligence',
      description: 'Build intelligent recruitment tools that analyze resumes, identify verified opportunities, and support objective job discovery.',
      icon: UserCheck,
      status: 'In Development',
      features: ['Semantic Resume Parsing', 'Objective Skills Mapping', 'Job Matching Algorithm'],
    },
    {
      title: 'Computer Vision & Visual Intelligence',
      description: 'Develop applications that analyze images and visual information for quality control, OCR, and anomaly detection.',
      icon: Eye,
      status: 'In Development',
      features: ['Defect & Object Detection', 'Document OCR Extraction', 'Real-time Edge Inference'],
    },
    {
      title: 'Intelligent Business Automation',
      description: 'Connect AI capabilities with business workflows, unstructured invoices, CRM records, and software systems.',
      icon: Network,
      status: 'Beta Available',
      features: ['Invoice Reconciliation', 'Smart Email Triage', 'API Orchestration'],
    },
  ];

  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="AI INNOVATIONS"
          title="Making Artificial Intelligence"
          highlight="Practical."
          description="We explore how intelligent systems can improve workflows, simplify complex tasks, and create new digital experiences."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiCategories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-[#0f0f0f] border border-[#262626] hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={item.status.includes('Available') ? 'success' : 'gold'}>
                      {item.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#161616] text-gray-300 border border-[#2b2b2b]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1c1c1c] flex items-center justify-between">
                  <Link
                    to="/ai-solutions"
                    className="text-xs text-muted hover:text-white transition-colors"
                  >
                    View specifications
                  </Link>
                  <Link
                    to="/contact?service=AI+Development"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300"
                  >
                    <span>Request AI Prototype</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact?service=AI+Development">
            <Button
              variant="primary"
              size="md"
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Discuss an AI Project
            </Button>
          </Link>
          <Link to="/ai-solutions">
            <Button variant="secondary" size="md">
              Explore All AI Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

