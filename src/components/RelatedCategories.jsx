"use client";

import Link from 'next/link';
import { Brain, Database, Cpu, Terminal, Layers, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { portfolioProjects } from '../data/portfolioProjects';

const categoryMeta = {
  AI: {
    icon: Brain,
    desc: 'Autonomous agents, neural networks & computer vision',
    badgeDark: 'hover:border-purple-500/50 hover:bg-purple-500/10 text-purple-400',
    badgeLight: 'hover:border-purple-300 hover:bg-purple-50 text-purple-700'
  },
  'Data Science': {
    icon: Database,
    desc: 'Predictive analytics, data pipelines & statistical models',
    badgeDark: 'hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400',
    badgeLight: 'hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700'
  },
  'Machine Learning': {
    icon: Cpu,
    desc: 'Classification, anomaly detection & forecasting pipelines',
    badgeDark: 'hover:border-blue-500/50 hover:bg-blue-500/10 text-blue-400',
    badgeLight: 'hover:border-blue-300 hover:bg-blue-50 text-blue-700'
  },
  Python: {
    icon: Terminal,
    desc: 'Automation scripts, web scrapers & system utilities',
    badgeDark: 'hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-400',
    badgeLight: 'hover:border-amber-300 hover:bg-amber-50 text-amber-700'
  },
  'Full-Stack Development': {
    icon: Layers,
    desc: 'MERN stack applications, multi-tenant SaaS & web portals',
    badgeDark: 'hover:border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400',
    badgeLight: 'hover:border-cyan-300 hover:bg-cyan-50 text-cyan-700'
  }
};

const categories = ['AI', 'Data Science', 'Machine Learning', 'Python', 'Full-Stack Development'];

/**
 * Reusable SEO Category Navigation Component
 * - Provides crawlable internal links to category-filtered portfolio views
 * - Displays project counts and visual icons
 */
export default function RelatedCategories({ title = 'Browse Engineering by Category', subtitle = 'Explore 25 verified systems organized by technical domain' }) {
  const { isDark } = useTheme();

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {categories.map((cat) => {
          const meta = categoryMeta[cat];
          const Icon = meta.icon;
          const count = portfolioProjects.filter((p) => p.category === cat).length;

          return (
            <Link
              key={cat}
              href={`/portfolio?category=${encodeURIComponent(cat)}`}
              className={`group p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-blue-500/40 shadow-lg shadow-black/20'
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isDark ? 'bg-white/5 text-blue-400' : 'bg-slate-100 text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}
                >
                  {count} Systems
                </span>
              </div>

              <div>
                <h4
                  className={`text-sm font-bold transition-colors group-hover:text-blue-500 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {cat}
                </h4>
                <p className={`text-[11px] font-medium line-clamp-2 mt-1 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {meta.desc}
                </p>
              </div>

              <div className="pt-1 flex items-center text-[11px] font-bold text-blue-500 group-hover:translate-x-0.5 transition-transform">
                <span>View {cat} Case Studies</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

