import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Code2, Check, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/common/SocialIcons';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { api, fallbackProjects } from '../lib/api';
import { Project } from '../types';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProjectBySlug(slug)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        const fb = fallbackProjects.find((p) => p.slug === slug) || null;
        setProject(fb);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-28 text-center px-4">
        <h2 className="text-2xl font-bold text-white font-heading mb-4">Project Not Found</h2>
        <p className="text-gray-400 mb-6">The requested case study could not be found.</p>
        <Link to="/projects">
          <Button variant="secondary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const statusVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Beta':
        return 'gold';
      default:
        return 'default';
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-gold-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative py-12 md:py-16 border-y border-[#1c1c1c] bg-[#090909] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              {project.category}
            </span>
            <Badge variant={statusVariant(project.status)}>
              Status: {project.status}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-heading mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-gray-300 leading-relaxed font-normal max-w-3xl mb-8">
            {project.short_description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Live Demo
                </Button>
              </a>
            )}
            {project.source_code_url && (
              <a href={project.source_code_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" leftIcon={<GithubIcon className="w-3.5 h-3.5" />}>
                  Source Repository
                </Button>
              </a>
            )}
            <Link to={`/contact?service=${encodeURIComponent(project.category)}`}>
              <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Build Similar Solution
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10">
              {project.problem_statement && (
                <div className="p-8 rounded-2xl bg-[#0f0f0f] border border-[#222] shadow-card">
                  <h3 className="text-xl font-bold text-white font-heading mb-3">
                    The Problem
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project.problem_statement}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-8 rounded-2xl bg-[#0f0f0f] border border-gold-500/30 shadow-card">
                  <h3 className="text-xl font-bold text-white font-heading mb-3">
                    The Solution &amp; Technical Approach
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.key_features && project.key_features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-6">
                    Core Functionality &amp; Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.key_features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#0f0f0f] border border-[#222] flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#262626] shadow-card space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold font-heading">
                  Architecture &amp; Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-md bg-[#161616] border border-[#262626] text-gold-300 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] border border-gold-500/30 shadow-card text-center space-y-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-heading">
                  Interested in this Architecture?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  JHRST Tech Solutions can adapt this platform or build custom capabilities for your specific business use case.
                </p>
                <Link to={`/contact?service=${encodeURIComponent(project.category)}`}>
                  <Button variant="primary" size="md" className="w-full">
                    Schedule Technical Discussion
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
