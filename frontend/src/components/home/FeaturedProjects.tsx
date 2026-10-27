import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Eye, Code2, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { TiltCard } from '../common/TiltCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { api, fallbackProjects } from '../../lib/api';
import { Project } from '../../types';

export const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState<string>('All');
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

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

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
    <section className="py-24 relative bg-[#F8FAFC] border-t border-slate-200 overflow-hidden">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="PORTFOLIO"
          title="Selected Work and"
          highlight="Innovations"
          description="Explore the digital products, software architectures, and automated platforms engineered by JHRST."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-200 ${
                activeCategory === cat
                  ? 'text-white font-bold border-transparent'
                  : 'bg-white text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-400 shadow-sm'
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A6FB] via-[#0267D6] to-[#014A96] shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
                style={{ perspective: 1000 }}
              >
                <TiltCard className="flex h-full flex-col justify-between rounded-2xl glass-card glass-card-glow group overflow-hidden">
                {/* Browser / Application Frame Header */}
                <div className="bg-slate-100 border-b border-slate-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-[10px] font-mono text-gray-500">
                      app.jhrst.io/{project.slug}
                    </span>
                  </div>
                  <Badge variant={statusVariant(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                {/* Visual Preview Showcase Area */}
                <div className="h-44 bg-gradient-to-br from-[#F1F5F9] via-[#E2E8F0] to-[#F8FAFC] p-6 relative flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-dark-radial opacity-30 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600">
                      {project.category}
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-105 transition-transform">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                      {project.short_description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                          +{project.tech_stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 group/link"
                    >
                      <span>Full Case Study</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 text-center">
          <Link to="/projects">
            <Button variant="secondary" size="md" className="border-slate-200 hover:border-blue-500/50">
              View Complete Innovation Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Look Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#222]">
              <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold font-mono">
                {selectedProject.category}
              </span>
              <Badge variant={statusVariant(selectedProject.status)}>
                {selectedProject.status}
              </Badge>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedProject.short_description}
            </p>

            {selectedProject.problem_statement && (
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                  Problem Addressed:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProject.problem_statement}
                </p>
              </div>
            )}

            {selectedProject.solution && (
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                  Engineered Solution:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Technology Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex items-center justify-between">
              <Link
                to={`/projects/${selectedProject.slug}`}
                onClick={() => setSelectedProject(null)}
              >
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Go to Project Page
                </Button>
              </Link>
              <Link
                to="/contact"
                onClick={() => setSelectedProject(null)}
                className="text-xs text-blue-600 hover:text-blue-600 font-medium"
              >
                Request Similar Solution &rarr;
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
