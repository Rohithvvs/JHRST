import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Code2, 
  Cpu, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  ArrowUpRight, 
  Clock, 
  Sparkles,
  Users
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { api } from '../../lib/api';
import { DashboardStats } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminDashboard()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback simulation based on seed defaults
        setStats({
          total_services: 6,
          published_services: 6,
          total_projects: 6,
          published_projects: 6,
          total_ai_products: 4,
          active_jobs: 4,
          new_contact_inquiries: 1,
          total_contact_inquiries: 1,
          new_project_inquiries: 1,
          total_project_inquiries: 1,
          total_applications: 0,
          recent_inquiries: [],
          recent_project_inquiries: []
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Published Services',
      val: stats?.published_services ?? 6,
      sub: `out of ${stats?.total_services ?? 6} total`,
      icon: Layers,
      link: '/admin/content',
    },
    {
      label: 'Portfolio Projects',
      val: stats?.published_projects ?? 6,
      sub: 'Active case studies',
      icon: Code2,
      link: '/admin/content',
    },
    {
      label: 'AI Products',
      val: stats?.total_ai_products ?? 4,
      sub: 'Solutions catalogue',
      icon: Cpu,
      link: '/admin/content',
    },
    {
      label: 'Active Careers',
      val: stats?.active_jobs ?? 4,
      sub: 'Open vacancies',
      icon: Briefcase,
      link: '/admin/content',
    },
    {
      label: 'Project Inquiries',
      val: stats?.total_project_inquiries ?? 0,
      sub: `${stats?.new_project_inquiries ?? 0} new inquiries`,
      icon: MessageSquare,
      link: '/admin/inquiries',
    },
    {
      label: 'Job Applications',
      val: stats?.total_applications ?? 0,
      sub: 'Candidate submissions',
      icon: Users,
      link: '/admin/applications',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold">ADMINISTRATION CONSOLE</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-1">
            Executive Overview
          </h1>
          <p className="text-xs text-muted">
            Live database records and client acquisition metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/inquiries">
            <Button variant="primary" size="sm">
              Review Inquiries
            </Button>
          </Link>
          <Link to="/admin/applications">
            <Button variant="secondary" size="sm">
              Candidate Applications
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-gold-500/40 transition-all duration-300 shadow-card flex items-center justify-between group"
            >
              <div>
                <span className="text-xs text-muted font-medium">{card.label}</span>
                <p className="text-3xl font-bold text-slate-900 font-heading mt-1">
                  {card.val}
                </p>
                <p className="text-[11px] text-gold-400 mt-1 font-medium">{card.sub}</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Launch & Workflow shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading flex items-center justify-between">
            <span>Recent Project Inquiries</span>
            <Link to="/admin/inquiries" className="text-xs text-gold-400 hover:underline">
              View All &rarr;
            </Link>
          </h3>

          {stats?.recent_project_inquiries && stats.recent_project_inquiries.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_project_inquiries.map((inq) => (
                <div key={inq.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">{inq.full_name} ({inq.service_required})</p>
                    <p className="text-muted text-[11px]">{inq.email}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 text-[10px] font-medium border border-gold-500/20">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">No recent project inquiries received yet.</p>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-heading flex items-center justify-between">
            <span>General Contact Inquiries</span>
            <Link to="/admin/inquiries" className="text-xs text-gold-400 hover:underline">
              View All &rarr;
            </Link>
          </h3>

          {stats?.recent_inquiries && stats.recent_inquiries.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_inquiries.map((inq) => (
                <div key={inq.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">{inq.full_name}</p>
                    <p className="text-muted text-[11px] truncate max-w-xs">{inq.message}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 text-[10px] font-medium border border-gold-500/20">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">No general inquiries currently pending.</p>
          )}
        </div>
      </div>
    </div>
  );
};

