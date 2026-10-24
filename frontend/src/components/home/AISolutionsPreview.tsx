import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, UserCheck, Eye, Network, ArrowRight, Sparkles, Terminal, CheckCircle2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const AISolutionsPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

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

  const simulationPresets = [
    {
      label: 'Autonomous Agent Tool Calling',
      query: 'JHRST.Agent.execute("Analyze API payload and generate OpenAPI v3 documentation")',
      tokens: [
        'INITIALIZE agent_runtime (v2.4-fast)',
        'PARSING AST schema from target endpoints...',
        'DETECTED: 14 REST endpoints, 4 JWT auth boundaries',
        'EXECUTING tool: swagger_generator(strict=True)',
        'VALIDATING OpenAPI 3.1.0 specification compliant',
        'STATUS: Complete [Latency: 42ms | Confidence: 99.4%]'
      ],
      metrics: { latency: '42ms', confidence: '99.4%', tokens: '1,420 t/s' }
    },
    {
      label: 'Resume Semantic Analysis',
      query: 'JHRST.TalentAI.evaluateCandidate(resume_bytes, job_spec="Senior Full Stack Engineer")',
      tokens: [
        'EXTRACTING vector embeddings via text-embedding-3',
        'SKILL_MATCH: Python (98%), React (95%), PostgreSQL (92%)',
        'NORMALIZING career trajectory & objective milestones',
        'VERIFYING GitHub repositories & contribution signal',
        'SCORE: 94.2 / 100 — High Compatibility Match',
        'STATUS: Verified & Filtered [Latency: 68ms]'
      ],
      metrics: { latency: '68ms', confidence: '96.2%', tokens: '2,100 t/s' }
    },
    {
      label: 'Visual OCR & Anomaly Scan',
      query: 'JHRST.Vision.scanQuality(batch_id="PKG-8890-IN", resolution="2048x1536")',
      tokens: [
        'INGESTING multi-spectral sensor frame 004892',
        'EDGE_DETECTION: Bounding boxes generated [n=12]',
        'OCR_READ: Barcode standard ISO/IEC 15417 valid',
        'ANOMALY_CHECK: Zero surface defects detected',
        'DISPOSITION: APPROVED for production routing',
        'STATUS: Pass [Edge Inference: 18ms]'
      ],
      metrics: { latency: '18ms', confidence: '99.9%', tokens: 'Edge TPU' }
    }
  ];

  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="AI INNOVATIONS"
          title="Making Artificial Intelligence"
          highlight="Practical."
          description="We explore how intelligent systems can improve workflows, simplify complex tasks, and create new digital experiences with measurable performance."
        />

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {aiCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl glass-card glass-card-hover group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/15 to-transparent border border-gold-500/30 flex items-center justify-center text-gold-300 group-hover:scale-105 group-hover:border-gold-400/60 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={item.status.includes('Available') ? 'success' : 'gold'}>
                      {item.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-gold-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs px-3 py-1 rounded-lg bg-[#141414] text-gray-300 border border-white/[0.08] font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    to="/ai-solutions"
                    className="text-xs text-muted hover:text-white transition-colors"
                  >
                    View specifications &rarr;
                  </Link>
                  <Link
                    to="/contact?service=AI+Development"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <span>Request AI Prototype</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Interactive AI Terminal Sandbox Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl glass-card border border-gold-500/30 overflow-hidden shadow-2xl"
        >
          {/* Terminal Top Bar */}
          <div className="px-6 py-4 bg-[#0e0e0e] border-b border-[#222222] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-gray-400 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-gold-400" />
                JHRST Agent Runtime &bull; interactive simulation
              </span>
            </div>

            {/* Presets Pills */}
            <div className="flex items-center gap-2">
              {simulationPresets.map((sim, i) => (
                <button
                  key={sim.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                    activeTab === i
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50 shadow-gold-sm'
                      : 'bg-[#181818] text-gray-400 hover:text-white border border-[#262626]'
                  }`}
                >
                  {sim.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs sm:text-sm bg-[#080808] space-y-4">
            <div className="flex items-center gap-2 text-gold-400">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-gray-300">{simulationPresets[activeTab].query}</span>
            </div>

            <div className="space-y-1.5 pt-2 pl-4 border-l-2 border-gold-500/30">
              {simulationPresets[activeTab].tokens.map((token, idx) => (
                <div key={idx} className="text-gray-400 flex items-center gap-2">
                  <span className="text-gold-500/60 font-mono text-[11px]">[0{idx + 1}]</span>
                  <span className={idx === simulationPresets[activeTab].tokens.length - 1 ? 'text-emerald-400 font-semibold' : 'text-gray-300'}>
                    {token}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Metrics Bar */}
            <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-gray-500">Latency: </span>
                  <span className="text-gold-400 font-bold">{simulationPresets[activeTab].metrics.latency}</span>
                </div>
                <div>
                  <span className="text-gray-500">Confidence: </span>
                  <span className="text-emerald-400 font-bold">{simulationPresets[activeTab].metrics.confidence}</span>
                </div>
                <div>
                  <span className="text-gray-500">Throughput: </span>
                  <span className="text-white font-bold">{simulationPresets[activeTab].metrics.tokens}</span>
                </div>
              </div>
              <span className="text-[11px] text-gray-500 italic">Click presets above to toggle simulation</span>
            </div>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact?service=AI+Development">
            <Button
              variant="primary"
              size="md"
              className="shadow-gold-md"
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Discuss an AI Project
            </Button>
          </Link>
          <Link to="/ai-solutions">
            <Button variant="secondary" size="md" className="border-white/10 hover:border-gold-500/50">
              Explore All AI Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


