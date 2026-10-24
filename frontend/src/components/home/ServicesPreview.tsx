import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Globe, Smartphone, Cpu, Bot, Layout, ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
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

  return (
    <section id="services" className="py-24 relative bg-[#090909] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SERVICES"
          title="Our Technology"
          highlight="Services"
          description="From concept to deployment, we build digital solutions designed around real-world needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => {
            const Icon = iconMap[service.icon_name] || Cpu;
            return (
              <div
                key={service.slug}
                className="flex flex-col justify-between p-8 rounded-2xl bg-[#121212] border border-[#262626] hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-card"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-gold-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {service.short_description}
                  </p>

                  {service.offerings && service.offerings.length > 0 && (
                    <div className="mb-6 space-y-2 border-t border-[#222222] pt-4">
                      <p className="text-xs uppercase tracking-wider text-muted font-medium">
                        Key Capabilities:
                      </p>
                      {service.offerings.slice(0, 4).map((offering, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                          <span>{offering}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#222222]">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group-hover:gap-2.5"
                  >
                    <span>{service.cta_label || 'Learn More'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/services">
            <Button variant="secondary" size="md">
              View All Technology Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

