import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, ArrowRight, Code2, Sparkles, Filter } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { TiltCard } from '../components/common/TiltCard';
import { api, fallbackProjects } from '../lib/api';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  const categories = [
    'All',
    'AI Applications',
    'Web Applications',
    'Automation',
    'Data and Analytics',
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech_stack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
      {/* Header */}
      <section className="relative py-16 md:py-24 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">
            PORTFOLIO &amp; CASE STUDIES
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-heading mb-6">
            Selected Work &amp;{' '}
            <span className="text-gold-gradient">Digital Innovations.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Explore software architectures, AI implementations, and automation products built by JHRST Tech Solutions.
          </p>
        </div>
      </section>

      {/* Controls & Grid */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#00A6FB] to-[#0267D6] text-white font-semibold shadow-gold-sm'
                      : 'bg-white text-slate-700 hover:text-blue-600 border border-slate-200 shadow-sm hover:border-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-gray-400 mb-4">No projects match the selected criteria.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <TiltCard
                  key={project.slug}
                  className="flex h-full flex-col justify-between rounded-2xl bg-white border border-slate-200 group shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Visual card header */}
                  <div className="h-44 bg-gradient-to-br from-[#F1F5F9] via-[#E2E8F0] to-[#F8FAFC] border-b border-slate-200 p-6 relative flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                        {project.category}
                      </span>
                      <Badge variant={statusVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </div>

                    <div>
                      <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-2">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {project.short_description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech_stack.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Look</span>
                      </button>

                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-xs text-muted hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant(selectedProject.status)}>
                {selectedProject.status}
              </Badge>
              <span className="text-xs text-blue-600 font-medium">
                {selectedProject.category}
              </span>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                Overview
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedProject.short_description}
              </p>
            </div>

            {selectedProject.problem_statement && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                  Problem Statement
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.problem_statement}
                </p>
              </div>
            )}

            {selectedProject.solution && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                  Implemented Solution
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech_stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                to={`/projects/${selectedProject.slug}`}
                onClick={() => setSelectedProject(null)}
              >
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Read Full Case Study
                </Button>
              </Link>

              <Link
                to="/contact"
                onClick={() => setSelectedProject(null)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Discuss Similar Project &rarr;
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

