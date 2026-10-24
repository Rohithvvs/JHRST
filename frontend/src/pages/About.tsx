import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  Code,
  Building,
  GraduationCap,
  Truck,
  HeartPulse,
  CreditCard,
  ShoppingBag
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { DevelopmentProcess } from '../components/home/DevelopmentProcess';

export const About: React.FC = () => {
  const values = [
    {
      title: 'Innovation',
      desc: 'Exploring emerging technologies to build smarter tools and solve practical operational challenges.',
      icon: Sparkles,
    },
    {
      title: 'Integrity',
      desc: 'Transparent communication, honest timelines, and straightforward engineering without false claims.',
      icon: ShieldCheck,
    },
    {
      title: 'Quality',
      desc: 'Disciplined software craftsmanship, strict type safety, responsive design, and rigorous testing.',
      icon: CheckCircle,
    },
    {
      title: 'Collaboration',
      desc: 'Working closely with founders, product teams, and stakeholders to deliver aligned outcomes.',
      icon: Users,
    },
    {
      title: 'Continuous Learning',
      desc: 'Constantly advancing our understanding of modern models, frameworks, and engineering standards.',
      icon: BookOpen,
    },
    {
      title: 'Customer Focus',
      desc: 'Designing and building digital products that serve the real needs of the people using them.',
      icon: Target,
    },
  ];

  const industries = [
    { name: 'FinTech & Banking', desc: 'Secure portals, real-time analytics & automated reconciliation.', icon: CreditCard },
    { name: 'Healthcare & Life Sciences', desc: 'Compliant data management, patient scheduling & document search.', icon: HeartPulse },
    { name: 'Logistics & Supply Chain', desc: 'Workflow automation, route tracking & inventory management tools.', icon: Truck },
    { name: 'Education & EdTech', desc: 'Interactive learning platforms, student portals & assessment systems.', icon: GraduationCap },
    { name: 'E-commerce & Retail', desc: 'Performant storefronts, catalog search & checkout integrations.', icon: ShoppingBag },
    { name: 'Enterprise SaaS', desc: 'Multi-tenant applications, role-based controls & cloud integrations.', icon: Building },
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative py-16 md:py-24 border-b border-[#1c1c1c] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">
            ABOUT JHRST TECH SOLUTIONS
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-heading mb-6">
            Technology with Purpose.{' '}
            <span className="text-gold-gradient">Innovation with Impact.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
            JHRST Tech Solutions is focused on developing practical digital solutions through modern software engineering, artificial intelligence, automation, and user-centered product design.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Approach Grid */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#111111] border border-[#262626] shadow-card">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">
                Our Mission
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                To build reliable, accessible, and innovative technology solutions that solve real-world problems and help organizations grow sustainably.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#262626] shadow-card">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">
                Our Vision
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                To help businesses and individuals embrace modern technology to create smarter, more connected, and more efficient digital experiences.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#262626] shadow-card">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">
                Our Approach
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                We combine thoughtful planning, modern engineering, continuous improvement, and user-focused design to deliver meaningful digital products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Company Values */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR CORE VALUES"
            title="The Values That Guide"
            highlight="Our Work"
            description="Our culture and engineering practices are rooted in foundational principles that protect the quality of everything we ship."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#242424] hover:border-gold-500/40 transition-all duration-300 shadow-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-heading">
                    {val.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Support */}
      <section className="py-20 bg-[#090909] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="TARGET VERTICALS"
            title="Industries We Aim to"
            highlight="Support"
            description="Our software architecture and automation pipelines are tailored to solve sector-specific operational friction."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="p-6 rounded-2xl bg-[#121212] border border-[#242424] shadow-card flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-heading mb-1">
                      {ind.name}
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded Development Process */}
      <DevelopmentProcess />

      {/* CTA Box */}
      <section className="pt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-gold-500/30 shadow-card">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-4">
            Ready to Build With JHRST?
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8">
            Tell us about your project or technology needs. We will review your inquiry and discuss practical steps forward.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start a Conversation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

