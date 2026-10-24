import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What services does JHRST Tech Solutions provide?',
      answer:
        'JHRST Tech Solutions specializes in six core service verticals: Artificial Intelligence and Machine Learning solutions, Web Application Development, Mobile Application Development (focusing on Android & cross-platform), Custom Software Development, AI Agents & Workflow Automation, and UI/UX Product Design.',
    },
    {
      question: 'Can you develop a custom web application for my business?',
      answer:
        'Yes. We build responsive, secure, and performant web applications using contemporary frameworks such as React, TypeScript, and Python FastAPI. Whether you require a customer portal, SaaS platform, multi-tenant dashboard, or an internal operational tool, we design architectures tailored to your workflow and scale.',
    },
    {
      question: 'Do you build AI-powered applications and autonomous agents?',
      answer:
        'Yes. We design and integrate intelligent systems, including retrieval-augmented generation (RAG) search, autonomous workflow agents, custom LLM tool integrations, computer vision pipelines, and intelligent document processing. We focus on practical AI that directly improves measurable operational metrics.',
    },
    {
      question: 'Can you develop Android and mobile applications?',
      answer:
        'Yes. We design and develop native Android applications and cross-platform mobile apps. We handle API synchronization, offline data persistence, authentication, push notifications, and touch-first responsive interfaces.',
    },
    {
      question: 'Do you work on existing software projects and legacy codebases?',
      answer:
        'Yes. We can audit, refactor, modernize, and extend existing software. Our team reviews existing codebases to identify security vulnerabilities, performance bottlenecks, and architectural debt before implementing iterative enhancements.',
    },
    {
      question: 'How can I request a project estimate or proposal?',
      answer:
        'You can submit your requirements through our "Start a Project" inquiry form on the Contact page. You can specify your desired service, timeline, budget range, and project description. Our technical team reviews inquiries and schedules a discovery discussion.',
    },
    {
      question: 'How does the software development process work?',
      answer:
        'We adhere to a 7-step engineering methodology: Discovery, Planning, Design, Development, Testing, Deployment, and Improvement. This structured framework ensures clear milestone tracking, transparent communication, and predictable project delivery.',
    },
    {
      question: 'How can I apply for a job or internship at JHRST?',
      answer:
        'Visit our Careers page to browse currently active openings for software engineers, AI developers, and design interns. You can submit an application with your resume in PDF format directly through our verified careers portal.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gold-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="QUESTIONS &amp; ANSWERS"
          title="Frequently Asked"
          highlight="Questions"
          description="Clear answers about our engineering capabilities, collaboration models, and development process."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'glass-card border-gold-500/50 shadow-gold-sm'
                    : 'bg-[#0d0d0d] border border-white/[0.06] hover:border-gold-500/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base font-semibold font-heading pr-4 transition-colors ${isOpen ? 'text-gold-200' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-gold-500/20 text-gold-300 rotate-180 border border-gold-500/40'
                        : 'bg-[#181818] text-gray-400 border border-white/[0.06]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/[0.06] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Contact Shortcut Pill */}
        <div className="mt-12 p-6 rounded-2xl glass-card border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-300 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Have a specific question?</p>
              <p className="text-xs text-gray-400">Our engineering leads in Bengaluru are ready to help.</p>
            </div>
          </div>
          <Link to="/contact">
            <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
