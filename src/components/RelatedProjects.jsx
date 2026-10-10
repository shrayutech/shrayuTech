"use client";

import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { portfolioProjects } from '../data/portfolioProjects';

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
  const { isDark } = useTheme();

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
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
              isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] shadow-xl shadow-black/20'
                : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Link
                  href={`/portfolio?category=${encodeURIComponent(project.category)}`}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                    isDark
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                      : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
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
                      isDark
                        ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4
                  className={`text-base font-bold transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {project.title.replace(/-/g, ' ')}
                </h4>
                <p className={`text-xs font-medium line-clamp-3 mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.highlight}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
              <Link
                href={`/portfolio?category=${encodeURIComponent(project.category)}`}
                className="text-blue-500 hover:text-blue-400 inline-flex items-center space-x-1 group"
              >
                <span>Explore {project.category} Systems</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

