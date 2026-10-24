import React from 'react';
import { Badge } from '../components/common/Badge';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <section className="relative py-16 border-b border-[#1c1c1c] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">LEGAL DOCUMENTATION</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            Last Updated: October 24, 2026 &bull; JHRST Tech Solutions
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-gray-300 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white font-heading">1. Introduction</h2>
            <p>
              JHRST Tech Solutions (&quot;JHRST&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of our website visitors, clients, and prospective job applicants. This Privacy Policy details how we collect, use, store, and safeguard personal and business information gathered through our official website and communication channels.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white font-heading">2. Information We Collect</h2>
            <p>We collect information you explicitly provide when interacting with our digital touchpoints:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Contact &amp; Project Inquiries:</strong> Full name, business email address, phone number, company name, industry, project requirements, budget parameters, and project description.</li>
              <li><strong>Job Applications:</strong> Full name, email address, phone number, experience level, technical skillsets, resume documents (in PDF format), LinkedIn profile URL, GitHub profile URL, and candidate cover notes.</li>
              <li><strong>Technical Metadata:</strong> Non-personally identifiable server logs including browser type, operating system, and request timestamps to monitor system security and service uptime.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white font-heading">3. How We Use Your Information</h2>
            <p>Your information is used strictly for legitimate commercial and administrative purposes, specifically:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Reviewing project inquiries and generating custom technical proposals.</li>
              <li>Evaluating qualifications of candidates who submit job applications.</li>
              <li>Preventing unauthorized server abuse, automated spam, and security breaches.</li>
              <li>Fulfilling legal obligations and maintaining administrative records.</li>
            </ul>
            <p className="pt-2 text-gray-400">
              We do not sell, rent, monetize, or publicly share personal or proprietary client details with third-party advertisers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white font-heading">4. Resume &amp; File Storage Security</h2>
            <p>
              Uploaded resume files are validated for permitted MIME types, verified against size quotas (max 5MB), sanitized with random identifiers, and stored in protected server directories. These documents are accessible strictly by authorized administrative personnel.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white font-heading">5. Data Retention &amp; User Rights</h2>
            <p>
              Inquiries and job applications are retained only as long as necessary for evaluation or ongoing business discussions. You retain the right to request review, correction, or deletion of your submitted information by contacting our privacy coordinator at <a href="mailto:contact@jhrst.com" className="text-gold-400 hover:underline">contact@jhrst.com</a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white font-heading">6. Policy Revisions</h2>
            <p>
              JHRST Tech Solutions reserves the right to update this policy periodically as our software offerings and legal standards evolve. Changes will be reflected directly on this page with an updated timestamp.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

