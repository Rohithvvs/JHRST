import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Globe, 
  Smartphone, 
  Cpu, 
  Bot, 
  Layout, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  HelpCircle 
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { api, fallbackServices } from '../lib/api';
import { Service } from '../types';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getServiceBySlug(slug)
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch(() => {
        const fb = fallbackServices.find((s) => s.slug === slug) || null;
        setService(fb);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-28 text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 font-heading mb-4">Service Not Found</h2>
        <p className="text-slate-500 mb-6">The requested technology service could not be located.</p>
        <Link to="/services">
          <Button variant="secondary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  const iconMap: Record<string, React.ElementType> = {
    Brain,
    Globe,
    Smartphone,
    Cpu,
    Bot,
    Layout,
  };
  const Icon = iconMap[service.icon_name] || Cpu;

  return (
    <div className="pt-28 pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="relative py-12 md:py-16 border-y border-slate-200 bg-[#F1F5F9] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Icon className="w-7 h-7" />
            </div>
            <Badge variant="gold">
              TECHNOLOGY SERVICE
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight font-heading mb-6">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            {service.short_description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request Proposal for this Service
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-4">
                  Detailed Scope &amp; Architecture
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {service.full_description}
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-6">
                  What We Engineer &amp; Deliver
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.offerings.map((offering, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3 shadow-card"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-200 leading-relaxed">{offering}</span>
                    </div>
                  ))}
                </div>
              </div>

              {service.business_benefits && service.business_benefits.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-4">
                    Measurable Value &amp; Outcomes
                  </h3>
                  <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-3">
                    {service.business_benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-card space-y-6">
                <h4 className="text-sm uppercase tracking-wider text-slate-900 font-semibold font-heading">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#222]">
                  <p className="text-xs text-muted mb-4">
                    Have questions regarding custom integrations or stack requirements?
                  </p>
                  <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="block w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Speak with an Engineer
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-card text-center space-y-4">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Ready to Start?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit your project requirements today to receive a detailed evaluation and implementation proposal.
                </p>
                <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                  <Button variant="primary" size="md" className="w-full">
                    {service.cta_label || 'Inquire Now'}
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

