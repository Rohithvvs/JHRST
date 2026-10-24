import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from '../common/SocialIcons';
import { api, fallbackSettings } from '../../lib/api';
import { CompanySettings } from '../../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<CompanySettings>(fallbackSettings);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {});
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] border-t border-[#222222] text-gray-400 pt-16 pb-12 overflow-hidden">
      {/* Subtle top gold accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1c1c1c]">
          {/* Column 1: Company Profile (spans 2 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#141414] border border-gold-500/40 flex items-center justify-center p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M26 30 H74 M50 30 V70 M34 70 H66"
                    stroke="#D4AF37"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="50" cy="50" r="4" fill="#F5D76E" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white font-heading tracking-tight">
                JHRST Tech Solutions
              </span>
            </Link>

            <p className="text-xs font-semibold tracking-widest text-gold-400 uppercase">
              BUILD. INNOVATE. GROW.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Architecting dependable digital products through high-performance software engineering, applied artificial intelligence, and intelligent business automation.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-gray-400 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-gray-400 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-gray-400 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors">
                  Technology Services
                </Link>
              </li>
              <li>
                <Link to="/ai-solutions" className="hover:text-gold-300 transition-colors">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-gold-300 transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-gold-300 transition-colors">
                  Careers &amp; Openings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-heading">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/ai-and-machine-learning" className="hover:text-gold-300 transition-colors">
                  AI &amp; Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/services/web-application-development" className="hover:text-gold-300 transition-colors">
                  Web Application Dev
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-application-development" className="hover:text-gold-300 transition-colors">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link to="/services/custom-software-development" className="hover:text-gold-300 transition-colors">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link to="/services/automation-and-ai-agents" className="hover:text-gold-300 transition-colors">
                  Automation &amp; Agents
                </Link>
              </li>
              <li>
                <Link to="/services/ui-ux-and-digital-product-design" className="hover:text-gold-300 transition-colors">
                  UI/UX Product Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-heading">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-300 transition-colors break-all">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="text-xs text-gray-500 pt-1">
                {settings.business_hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} JHRST Tech Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gold-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/admin" className="hover:text-gold-400 transition-colors inline-flex items-center gap-1 text-gray-500 hover:text-gold-400">
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
