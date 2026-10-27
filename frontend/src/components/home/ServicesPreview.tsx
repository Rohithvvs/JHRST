import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Globe, Smartphone, Cpu, Bot, Layout, ArrowRight, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { TiltCard } from '../common/TiltCard';
import { Button } from '../common/Button';
import { api, fallbackServices } from '../../lib/api';
import { Service } from '../../types';

export const ServicesPreview: React.FC = () => {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
  }, []);

  const iconMap: Record<string, React.ElementType> = {
    Brain,
    Globe,
    Smartphone,
    Cpu,
    Bot,
    Layout,
  };

  // The 3 primary services requested for the Home Page showcase:
  // 1. Automation and AI Agents
  // 2. Web Application Development
  // 3. Mobile Application Development
  const homeServiceSlugs = [
    'automation-and-ai-agents',
    'web-application-development',
    'mobile-application-development',
  ];

  const matchedServices = homeServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));

  const displayedServices = matchedServices.length === 3 ? matchedServices : services.slice(0, 3);

  return (
    <section id="services" className="py-24 relative bg-[#F1F5F9] border-t border-slate-200 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="SERVICES"
          title="Our Technology"
          highlight="Services"
          description="From concept to deployment, we build digital solutions designed around real-world needs and measurable impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => {
            const Icon = iconMap[service.icon_name] || Cpu;
            return (
              <Reveal key={service.slug} delay={index * 0.08} className="h-full">
                <TiltCard className="flex h-full flex-col justify-between p-8 rounded-2xl glass-card glass-card-glow group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-105 group-hover:border-gold-400/60 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.short_description}
                    </p>

                    {service.offerings && service.offerings.length > 0 && (
                      <div className="mb-6 space-y-2.5 border-t border-slate-100 pt-5">
                        <p className="text-xs uppercase tracking-wider text-blue-600 font-mono font-semibold">
                          Key Capabilities:
                        </p>
                        {service.offerings.slice(0, 4).map((offering, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{offering}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-5 border-t border-slate-100">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 font-semibold transition-colors group-hover:gap-3"
                    >
                      <span>{service.cta_label || 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/services">
            <Button variant="secondary" size="md" className="border-slate-200 hover:border-blue-500/50">
              View All Technology Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
