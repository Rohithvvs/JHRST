import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  QrCode
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../components/common/SocialIcons';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { useToast } from '../context/ToastContext';
import { api, fallbackSettings } from '../lib/api';
import { CompanySettings } from '../types';

const contactSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid business email'),
  phone: z.string().optional(),
  company_name: z.string().optional(),
  service_required: z.string().min(1, 'Please select a service'),
  estimated_budget: z.string().optional(),
  expected_timeline: z.string().optional(),
  project_description: z.string().min(10, 'Please provide details about your project requirements (min 10 characters)'),
  consent_given: z.boolean().refine((val) => val === true, {
    message: 'You must consent to privacy terms before sending your inquiry',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const location = useLocation();
  const { success, error } = useToast();
  const [settings, setSettings] = useState<CompanySettings>(fallbackSettings);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  // Pre-fill service from URL param if available (?service=...)
  const queryParams = new URLSearchParams(location.search);
  const initialService = queryParams.get('service') || 'Web Development';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service_required: initialService,
      estimated_budget: 'Flexible',
      expected_timeline: '1-3 months',
      consent_given: false,
    },
  });

  useEffect(() => {
    const s = queryParams.get('service');
    if (s) {
      setValue('service_required', s);
    }
  }, [location.search, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await api.submitProjectInquiry({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        company_name: data.company_name,
        industry: 'General Technology',
        service_required: data.service_required,
        estimated_budget: data.estimated_budget,
        expected_timeline: data.expected_timeline,
        project_description: data.project_description,
        preferred_contact: 'Email',
        consent_given: data.consent_given,
      });

      setIsSubmittedSuccess(true);
      success('Thank you for contacting JHRST Tech Solutions. Your inquiry has been submitted successfully.');
      reset();
    } catch (err: any) {
      error(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 md:py-24 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="primary" className="mb-4">
            START A CONVERSATION
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-heading mb-6">
            Have an Idea?{' '}
            <span className="text-gradient-primary">Let's Build It.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Tell us about your project, business challenge, or technology requirements. Our team can review your inquiry and discuss the next steps.
          </p>
        </div>
      </section>

      {/* Main Form and Info Grid */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md shadow-card space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-heading">
                    JHRST Tech Solutions
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mt-1">
                    BUILD. INNOVATE. GROW.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We partner with startups, established businesses, and innovators to architect dependable digital products and practical AI systems.
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted uppercase font-medium">Business Email</p>
                      <a href={`mailto:${settings.email}`} className="text-xs sm:text-sm text-slate-900 font-medium hover:text-blue-600 transition-colors">
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted uppercase font-medium">Direct Telephone</p>
                      <p className="text-xs sm:text-sm text-slate-900 font-medium">{settings.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted uppercase font-medium">Headquarters</p>
                      <p className="text-xs sm:text-sm text-slate-900 font-medium">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted uppercase font-medium">Operating Hours</p>
                      <p className="text-xs sm:text-sm text-slate-900 font-medium">{settings.business_hours}</p>
                    </div>
                  </div>
                </div>

                {/* Social channels */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[11px] text-muted uppercase font-medium mb-3">Verified Profiles</p>
                  <div className="flex items-center gap-3">
                    {settings.linkedin_url && (
                      <a
                        href={settings.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-500/40 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {settings.github_url && (
                      <a
                        href={settings.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-500/40 transition-colors"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {settings.instagram_url && (
                      <a
                        href={settings.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-500/40 transition-colors"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Verified Digital Business Card Card */}
              <div className="p-6 rounded-3xl bg-white border border-blue-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      Official Executive Card
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Scannable QR
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group relative">
                  <img
                    src="/jhrst_business_card.png"
                    alt="JHRST Executive Business Card - V.V.S Rohit Founder"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href="/jhrst_business_card_hd.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition-colors"
                    >
                      View Full HD Card
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div>
                    <p className="text-slate-900 font-bold">V.V.S Rohit</p>
                    <p className="text-slate-500 text-[11px]">Founder</p>
                  </div>
                  <a
                    href="/jhrst_business_card_hd.png"
                    download="JHRST_Business_Card.png"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 text-xs"
                  >
                    <span>Download HD</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  <QrCode className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="leading-snug">
                    Scan card QR to visit{' '}
                    <a
                      href="https://jhrst.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-blue-700 hover:text-blue-800"
                    >
                      jhrst.vercel.app
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Project Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md shadow-card">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 font-heading">
                    Project Inquiry
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    Provide your requirements and timeline to receive a structured technical proposal.
                  </p>
                </div>

                {isSubmittedSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 font-heading">
                      Inquiry Received
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting JHRST Tech Solutions. Your inquiry has been submitted successfully. A technical advisor will review your specifications and contact you shortly.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSubmittedSuccess(false)}
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register('full_name')}
                          placeholder="Jordan Vance"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                        {errors.full_name && (
                          <p className="text-[11px] text-red-400 mt-1">{errors.full_name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Work Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="jordan@company.com"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          {...register('phone')}
                          placeholder="+1 (555) 012-3456"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company / Organization Name (Optional)
                        </label>
                        <input
                          {...register('company_name')}
                          placeholder="Vance Innovations Ltd"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service Required <span className="text-red-400">*</span>
                      </label>
                      <select
                        {...register('service_required')}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:border-blue-500"
                      >
                        <option value="AI and Machine Learning">Artificial Intelligence and Machine Learning</option>
                        <option value="Web Development">Web Application Development</option>
                        <option value="Mobile Application Development">Mobile Application Development</option>
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="Automation and AI Agents">Automation and AI Agents</option>
                        <option value="UI/UX and Digital Product Design">UI/UX and Digital Product Design</option>
                        <option value="Technology Consulting">Technology Consulting</option>
                        <option value="Other">Other Specialized Inquiry</option>
                      </select>
                      {errors.service_required && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.service_required.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Estimated Budget (Optional)
                        </label>
                        <select
                          {...register('estimated_budget')}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Flexible">Flexible / Open to discussion</option>
                          <option value="Under $10,000">Under $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000+">$50,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Expected Timeline (Optional)
                        </label>
                        <select
                          {...register('expected_timeline')}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:border-blue-500"
                        >
                          <option value="1-3 months">1 - 3 months</option>
                          <option value="Urgent (< 1 month)">Urgent (&lt; 1 month)</option>
                          <option value="3-6 months">3 - 6 months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Project Description &amp; Technical Requirements <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register('project_description')}
                        rows={4}
                        placeholder="Describe the solution you want to build, existing systems, user roles, and primary goals..."
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-blue-500 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                      {errors.project_description && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.project_description.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('consent_given')}
                          className="mt-0.5 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[11px] text-slate-500 leading-relaxed">
                          I consent to JHRST Tech Solutions reviewing and storing my project details according to the Privacy Policy to prepare an estimate and proposal.
                        </span>
                      </label>
                      {errors.consent_given && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.consent_given.message}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        isLoading={isSubmitting}
                        rightIcon={<Send className="w-4 h-4" />}
                      >
                        Send Project Inquiry
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
