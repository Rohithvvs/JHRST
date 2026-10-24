import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Eye, Code2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
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
    <section className="py-24 relative bg-[#090909] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PORTFOLIO"
          title="Selected Work and"
          highlight="Innovations"
          description="Explore the digital products, experiments, and software solutions we build."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#F5D76E] to-[#D4AF37] text-black font-semibold shadow-gold-sm'
                  : 'bg-[#141414] text-gray-300 hover:text-white border border-[#262626] hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col justify-between rounded-2xl bg-[#121212] border border-[#262626] hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-card overflow-hidden"
            >
              {/* Card Header / Visual Preview Bar */}
              <div className="h-44 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border-b border-[#222222] p-6 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-dark-radial opacity-30" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                    {project.category}
                  </span>
                  <Badge variant={statusVariant(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center text-gold-400 mb-2">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading line-clamp-1 group-hover:text-gold-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {project.short_description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#181818] border border-[#262626] text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#181818] border border-[#262626] text-muted">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#1e1e1e] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-xs text-muted hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/projects">
            <Button variant="secondary" size="md">
              Explore All Portfolio Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Details Modal */}
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
                  Problem Addressed
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedProject.problem_statement}
                </p>
              </div>
            )}

            {selectedProject.solution && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                  Solution Architecture
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
                Technologies Used
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
                  Go to Project Page
                </Button>
              </Link>

              <Link
                to="/contact"
                onClick={() => setSelectedProject(null)}
                className="text-xs text-gold-400 hover:text-gold-300 font-medium"
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

