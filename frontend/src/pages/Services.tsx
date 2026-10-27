import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Globe, Smartphone, Cpu, Bot, Layout, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { Reveal } from '../components/common/Reveal';
import { TiltCard } from '../components/common/TiltCard';
import { api, fallbackServices } from '../lib/api';
import { Service } from '../types';

export const Services: React.FC = () => {
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

  return (
    <div className="pt-28 pb-20">
      {/* Page Header */}
      <section className="relative py-16 md:py-24 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">
            TECHNOLOGY CAPABILITIES
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-heading mb-6">
            Comprehensive Digital{' '}
            <span className="text-gold-gradient">Engineering Services.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            From proof-of-concept AI prototypes to scalable multi-tenant SaaS platforms, JHRST Tech Solutions builds dependable software designed around real business outcomes.
          </p>
        </div>
      </section>

      {/* Services Catalogue */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon_name] || Cpu;
              const isEven = index % 2 === 1;

              return (
                <Reveal key={service.slug} delay={index * 0.04}>
                <TiltCard
                  id={service.slug}
                  maxTilt={4}
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm glass-card-glow shadow-card"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Info: Icon, Title, Description (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                            Service 0{index + 1}
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                        {service.full_description || service.short_description}
                      </p>

                      {/* Offerings list */}
                      <div className="pt-4">
                        <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                          What We Deliver:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.offerings.map((offering, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{offering}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-6 flex flex-wrap items-center gap-4">
                        <Link to={`/services/${service.slug}`}>
                          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                            Detailed Breakdown
                          </Button>
                        </Link>
                        <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                          <Button variant="primary" size="sm">
                            {service.cta_label || 'Inquire Now'}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Right Info: Business Benefits & Tech Stack (5 cols) */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                      {service.business_benefits && service.business_benefits.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-3">
                            Key Business Advantages:
                          </h4>
                          <ul className="space-y-2">
                            {service.business_benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.tech_stack && service.tech_stack.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-2.5">
                            Technology Stack:
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {service.tech_stack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Banner */}
      <section className="pt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-white border border-blue-200 shadow-md shadow-card">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-4">
            Need a Specialized Technology Solution?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-8">
            Our engineering team can evaluate your specifications and outline a clear development roadmap.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Request Technical Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

