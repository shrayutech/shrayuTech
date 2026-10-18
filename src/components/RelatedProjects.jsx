"use client";

import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Code2 } from 'lucide-react';
import { portfolioProjects } from '../data/portfolioProjects';
import { getProjectPath } from '../utils/internalLinks';

/**
 * Reusable SEO Related Projects / Case Studies Component
 * - Dynamically surfaces related projects based on category or technical similarity
 * - Avoids circular linking by filtering out the current active project
 * - Contextually connects services and category pages with concrete case studies
 */
export default function RelatedProjects({
  currentCategory,
  currentProjectId,
  limit = 3,
  title = 'Verified Engineering Case Studies',
  subtitle = 'Production-grade implementations demonstrating technical execution'
}) {

  // Filter projects
  const related = portfolioProjects
    .filter((project) => {
      if (currentProjectId && project.id === currentProjectId) return false;
      if (currentCategory && project.category !== currentCategory) return false;
      return true;
    })
    .slice(0, limit);

  // If no matching projects found for category, fall back to top projects excluding current
  const finalProjects =
    related.length > 0
      ? related
      : portfolioProjects
          .filter((p) => p.id !== currentProjectId)
          .slice(0, limit);

  if (finalProjects.length === 0) return null;

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {title && (
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${'light:text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-xs sm:text-sm font-medium ${'light:text-slate-600 dark:text-slate-300'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalProjects.map((project) => (
          <div
            key={project.id}
            className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
              'light:bg-white light:border-slate-200 light:hover:border-blue-400 light:hover:bg-blue-50/30 light:shadow-sm light:hover:shadow-md dark:bg-white/[0.03] dark:border-white/10 dark:hover:border-blue-500/40 dark:hover:bg-white/[0.06] dark:shadow-xl dark:shadow-black/20'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Link
                  href={`/portfolio?category=${encodeURIComponent(project.category)}`}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                    'light:bg-blue-50 light:border-blue-200 light:text-blue-700 light:hover:bg-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/20'
                  }`}
                >
                  {project.category}
                </Link>
                <div className="flex items-center space-x-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1.5 rounded-lg border transition-colors ${
                      'light:bg-slate-100 light:border-slate-200 light:text-slate-600 light:hover:text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10'
                    }`}
                    title="View GitHub Repository"
                    aria-label={`${project.title} source code on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        'light:bg-slate-100 light:border-slate-200 light:text-slate-600 light:hover:text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10'
                      }`}
                      title="View Live Demo"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4
                  className={`text-base font-bold transition-colors ${
                    'light:text-slate-900 light:hover:text-blue-600 dark:text-white dark:hover:text-blue-400'
                  }`}
                >
                  <Link href={getProjectPath(project)}>{project.title.replace(/-/g, ' ')}</Link>
                </h4>
                <p className={`text-xs font-medium line-clamp-3 mt-1.5 leading-relaxed ${'light:text-slate-600 dark:text-slate-300'}`}>
                  {project.highlight}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                      'light:bg-slate-100 light:border-slate-200 light:text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
              <Link
                href={getProjectPath(project)}
                className="text-blue-500 hover:text-blue-400 inline-flex items-center space-x-1 group"
              >
                <span>Read the Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

