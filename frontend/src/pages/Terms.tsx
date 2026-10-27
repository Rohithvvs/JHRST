import React from 'react';
import { Badge } from '../components/common/Badge';

export const Terms: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <section className="relative py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">LEGAL DOCUMENTATION</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-600">
            Last Updated: October 24, 2026 &bull; JHRST Tech Solutions
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the official website of JHRST Tech Solutions (&quot;JHRST&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use this site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">2. Scope of Content &amp; Product Status</h2>
            <p>
              The materials and case studies published on this website are provided for informational and demonstrative purposes regarding our engineering capabilities. Projects labeled as &quot;Concept&quot; or &quot;In Development&quot; represent internal architectures or development milestones and do not imply general public commercial release unless explicitly noted as &quot;Available&quot;.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">3. Intellectual Property Rights</h2>
            <p>
              All intellectual property rights associated with the website, including but not limited to the brand mark &quot;JHRST&quot;, company name &quot;JHRST Tech Solutions&quot;, tagline &quot;BUILD. INNOVATE. GROW.&quot;, visual layouts, icons, custom graphics, and software code are the exclusive property of JHRST Tech Solutions. No content may be reproduced or mirrored without prior written consent.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">4. Project Inquiries &amp; Engagement Contracts</h2>
            <p>
              Submitting an inquiry through our &quot;Start a Project&quot; form does not constitute a binding development contract. Legally binding commitments occur solely through mutually executed Master Services Agreements (MSA) and formal Statements of Work (SOW).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">5. Prohibited Website Use</h2>
            <p>
              Users agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Attempt unauthorized penetration testing, vulnerability scanning, or disruption of server services.</li>
              <li>Submit fraudulent contact requests, automated spam, or malicious payloads through file upload portals.</li>
              <li>Impersonate any individual, brand, or corporate entity when submitting applications.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-heading">6. Contact &amp; Governance</h2>
            <p>
              For inquiries regarding these Terms and Conditions, please contact us at <a href="mailto:jhrst9966@gmail.com" className="text-gold-400 hover:underline">jhrst9966@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

