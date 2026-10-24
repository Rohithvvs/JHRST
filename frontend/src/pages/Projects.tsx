import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, ArrowRight, Code2, Sparkles, Filter } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
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
      <section className="relative py-16 md:py-24 border-b border-[#1c1c1c] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">
            PORTFOLIO &amp; CASE STUDIES
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-heading mb-6">
            Selected Work &amp;{' '}
            <span className="text-gold-gradient">Digital Innovations.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Explore software architectures, AI implementations, and automation products built by JHRST Tech Solutions.
          </p>
        </div>
      </section>

      {/* Controls & Grid */}
      <section className="py-16 bg-[#050505]">
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
                      ? 'bg-gradient-to-r from-[#F5D76E] to-[#D4AF37] text-black font-semibold shadow-gold-sm'
                      : 'bg-[#121212] text-gray-300 hover:text-white border border-[#262626] hover:border-gold-500/30'
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
                className="w-full bg-[#121212] border border-[#292929] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0f0f0f] border border-[#222]">
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
                <div
                  key={project.slug}
                  className="flex flex-col justify-between rounded-2xl bg-[#101010] border border-[#262626] hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-card overflow-hidden"
                >
                  {/* Visual card header */}
                  <div className="h-44 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border-b border-[#222] p-6 relative flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                        {project.category}
                      </span>
                      <Badge variant={statusVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </div>

                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center text-gold-400 mb-2">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-heading line-clamp-1 group-hover:text-gold-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-300 leading-relaxed mb-4">
                        {project.short_description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech_stack.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#161616] border border-[#262626] text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[#1e1e1e] flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Look</span>
                      </button>

                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-xs text-muted hover:text-white transition-colors flex items-center gap-1 font-medium"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
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
              <span className="text-xs text-gold-400 font-medium">
                {selectedProject.category}
              </span>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                Overview
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed">
                {selectedProject.short_description}
              </p>
            </div>

            {selectedProject.problem_statement && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                  Problem Statement
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedProject.problem_statement}
                </p>
              </div>
            )}

            {selectedProject.solution && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                  Implemented Solution
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
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
                    className="text-xs px-2.5 py-1 rounded-md bg-[#161616] text-gray-300 border border-[#2b2b2b]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex items-center justify-between">
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
                className="text-xs text-gold-400 hover:text-gold-300 font-medium"
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

