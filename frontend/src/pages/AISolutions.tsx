import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  UserCheck, 
  Eye, 
  Network, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Terminal, 
  Database,
  Layers
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { TiltCard } from '../components/common/TiltCard';
import { api, fallbackAIProducts } from '../lib/api';
import { AIProduct } from '../types';

export const AISolutions: React.FC = () => {
  const [products, setProducts] = useState<AIProduct[]>(fallbackAIProducts);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    api.getAIProducts().then(setProducts).catch(() => {});
  }, []);

  const iconMap = [Bot, UserCheck, Eye, Network];

  const statusVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Beta':
        return 'gold';
      default:
        return 'default';
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 md:py-24 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">
            APPLIED ARTIFICIAL INTELLIGENCE
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-heading mb-6">
            Making Artificial Intelligence{' '}
            <span className="text-gold-gradient">Practical &amp; Scalable.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            We explore how intelligent systems can improve workflows, simplify complex tasks, and unlock new digital capabilities. Clearly differentiating ready prototypes from in-development research.
          </p>

          <div className="mt-8 flex justify-center">
            <Link to="/contact?service=AI+Development">
              <Button variant="primary" size="lg" rightIcon={<Sparkles className="w-4 h-4" />}>
                Discuss an AI Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Solutions Showcase */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {products.map((prod, idx) => {
              const Icon = iconMap[idx % iconMap.length];
              return (
                <TiltCard
                  key={prod.slug}
                  className="flex h-full flex-col justify-between p-8 rounded-3xl glass-card glass-card-glow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <Badge variant={statusVariant(prod.status)}>
                        {prod.status}
                      </Badge>
                    </div>

                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
                      {prod.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1 mb-3">
                      {prod.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {prod.description}
                    </p>

                    {prod.problem_solved && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                        <p className="text-xs uppercase tracking-wider text-blue-600 font-mono font-semibold mb-1">
                          Operational Friction Solved:
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prod.problem_solved}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 mb-6">
                      <p className="text-xs uppercase tracking-wider text-muted font-mono font-semibold">
                        System Features:
                      </p>
                      {prod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">
                      Customizable Architecture
                    </span>
                    <Link to={`/contact?service=AI+Development`}>
                      <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Request Prototype
                      </Button>
                    </Link>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {/* Interactive AI Architecture Terminal Simulation */}
          <div className="rounded-3xl bg-white border border-blue-200 shadow-md shadow-card p-8 sm:p-10 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs font-mono text-slate-500">
                  jhrst-ai-agent-orchestrator.ts
                </span>
              </div>
              <Badge variant="gold">LIVE REASONING PIPELINE</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 font-mono text-xs sm:text-sm text-slate-600 space-y-3 bg-slate-900 p-5 rounded-2xl border border-slate-800 text-slate-300">
                <p className="text-sky-400">$ jhrst-orchestrator --task "synthesize enterprise data"</p>
                <p className="text-slate-500">[1] Query decomposed into 3 vector searches &amp; 1 structured SQL query.</p>
                <p className="text-slate-500">[2] Embedding lookup completed in 18ms across 45,000 document chunks.</p>
                <p className="text-slate-500">[3] Guardrail validation passed: PII scrubbed, context sanitized.</p>
                <p className="text-emerald-400">[4] Response synthesized with direct verifiable citations.</p>
                <p className="text-sky-300 font-semibold">&gt;&gt; Ready for enterprise API consumption.</p>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-xl font-bold text-slate-900 font-heading">
                  Engineered for High Accuracy
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We don't build generic wrappers. We architect dedicated retrieval engines, guardrails, and deterministic tool callers so your AI systems produce verifiable, business-grade results.
                </p>
                <Link to="/contact?service=AI+Development">
                  <Button variant="primary" size="md">
                    Discuss Your AI Architecture
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

