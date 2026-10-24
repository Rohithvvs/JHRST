import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

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
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#121212] border-gold-500/40 shadow-card'
                    : 'bg-[#0d0d0d] border-[#222] hover:border-[#333]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white font-heading pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#181818] border border-[#2b2b2b] flex items-center justify-center shrink-0 text-gold-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-gold-500/20 text-gold-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-[#1a1a1a] pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

