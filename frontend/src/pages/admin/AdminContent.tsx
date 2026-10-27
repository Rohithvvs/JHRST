import React, { useState, useEffect } from 'react';
import { Layers, Code2, Cpu, Briefcase, Plus, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { api, fallbackServices, fallbackProjects, fallbackJobs, fallbackAIProducts } from '../../lib/api';
import { Service, Project, JobOpening, AIProduct } from '../../types';

export const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'projects' | 'products' | 'jobs'>('services');
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [products, setProducts] = useState<AIProduct[]>(fallbackAIProducts);
  const [jobs, setJobs] = useState<JobOpening[]>(fallbackJobs);
  const { success } = useToast();

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
    api.getAIProducts().then(setProducts).catch(() => {});
    api.getJobs().then(setJobs).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold">WEBSITE CONTENT MANAGER</Badge>
          <h1 className="text-2xl font-bold font-heading text-slate-900 mt-1">
            Publishing &amp; Records Management
          </h1>
          <p className="text-xs text-muted">
            Manage services, portfolio case studies, AI products, and job listings.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#222] overflow-x-auto">
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'services'
              ? 'border-gold-400 text-gold-300'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Services ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'projects'
              ? 'border-gold-400 text-gold-300'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Portfolio Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'products'
              ? 'border-gold-400 text-gold-300'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          AI Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'jobs'
              ? 'border-gold-400 text-gold-300'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Careers ({jobs.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'services' && (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.slug} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{s.title}</p>
                <p className="text-muted text-[11px] mt-0.5">{s.short_description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                  Published
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.slug} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{p.title}</p>
                <p className="text-gold-400 text-[11px] mt-0.5">{p.category} &bull; Status: {p.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 text-[10px] border border-gold-500/20">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-3">
          {products.map((prod) => (
            <div key={prod.slug} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{prod.title}</p>
                <p className="text-muted text-[11px] mt-0.5">{prod.category} &bull; Status: {prod.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 text-[10px] border border-gold-500/20">
                  {prod.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.slug} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{j.title}</p>
                <p className="text-gold-400 text-[11px] mt-0.5">{j.department} &bull; {j.employment_type} &bull; {j.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

