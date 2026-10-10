"use client";
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Brain,
  Database,
  Cpu,
  Terminal,
  Search,
  ArrowUpRight,
  ArrowRight,
  Code2,
  RotateCcw
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedCategories from '../components/RelatedCategories';
import ContentFreshnessBadge from '../components/ContentFreshnessBadge';
import CompareButton from '../components/comparison/CompareButton';
import { useTheme } from '../context/ThemeContext';
import { useSkeleton } from '../context/SkeletonContext';
import SkeletonWrapper from '../components/skeleton/SkeletonWrapper';
import PortfolioSkeleton from '../components/skeleton/PortfolioSkeleton';
import SpotlightCard from '../components/SpotlightCard';
import { portfolioProjects, portfolioCategories } from '../data/portfolioProjects';
import { normalizeProjectSlug } from '../utils/portfolioUtils';

const categoryConfig = {
  AI: {
    icon: Brain,
    badgeDark: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    badgeLight: 'bg-purple-50 text-purple-700 border-purple-200',
    highlightDark: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
    highlightLight: 'bg-purple-50/80 border-purple-200 text-purple-800',
    headerGradientDark: 'from-purple-950/40 via-purple-900/20 to-transparent',
    headerGradientLight: 'from-purple-100/70 via-purple-50/30 to-transparent',
    spotlight: 'rgba(168, 85, 247, 0.15)',
    accentColor: 'text-purple-400'
  },
  'Data Science': {
    icon: Database,
    badgeDark: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    badgeLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    highlightDark: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    highlightLight: 'bg-emerald-50/80 border-emerald-200 text-emerald-800',
    headerGradientDark: 'from-emerald-950/40 via-emerald-900/20 to-transparent',
    headerGradientLight: 'from-emerald-100/70 via-emerald-50/30 to-transparent',
    spotlight: 'rgba(16, 185, 129, 0.15)',
    accentColor: 'text-emerald-400'
  },
  'Machine Learning': {
    icon: Cpu,
    badgeDark: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    badgeLight: 'bg-blue-50 text-blue-700 border-blue-200',
    highlightDark: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    highlightLight: 'bg-blue-50/80 border-blue-200 text-blue-800',
    headerGradientDark: 'from-blue-950/40 via-blue-900/20 to-transparent',
    headerGradientLight: 'from-blue-100/70 via-blue-50/30 to-transparent',
    spotlight: 'rgba(59, 130, 246, 0.15)',
    accentColor: 'text-blue-400'
  },
  Python: {
    icon: Terminal,
    badgeDark: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    badgeLight: 'bg-amber-50 text-amber-700 border-amber-200',
    highlightDark: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    highlightLight: 'bg-amber-50/80 border-amber-200 text-amber-800',
    headerGradientDark: 'from-amber-950/40 via-amber-900/20 to-transparent',
    headerGradientLight: 'from-amber-100/70 via-amber-50/30 to-transparent',
    spotlight: 'rgba(245, 158, 11, 0.15)',
    accentColor: 'text-amber-400'
  },
  'Full-Stack Development': {
    icon: Layers,
    badgeDark: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    badgeLight: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    highlightDark: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    highlightLight: 'bg-cyan-50/80 border-cyan-200 text-cyan-800',
    headerGradientDark: 'from-cyan-950/40 via-cyan-900/20 to-transparent',
    headerGradientLight: 'from-cyan-100/70 via-cyan-50/30 to-transparent',
    spotlight: 'rgba(6, 182, 212, 0.15)',
    accentColor: 'text-cyan-400'
  }
};

const Products = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const { isDark } = useTheme();
  const { isLoading } = useSkeleton();

  // Synchronize category state from URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && portfolioCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      router.replace('/portfolio', { scroll: false });
    } else {
      router.replace(`/portfolio?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    router.replace('/portfolio', { scroll: false });
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: portfolioProjects.length };
    portfolioCategories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = portfolioProjects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const titleMatch = project.title.toLowerCase().includes(query);
      const descMatch = project.description.toLowerCase().includes(query);
      const highlightMatch = project.highlight.toLowerCase().includes(query);
      const techMatch = project.techStack.some((tech) =>
        tech.toLowerCase().includes(query)
      );

      return titleMatch || descMatch || highlightMatch || techMatch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SkeletonWrapper loading={isLoading} skeleton={<PortfolioSkeleton />}>
      <div className="relative min-h-screen bg-portfolio-atmosphere pt-36 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <SEO
          title="Portfolio & Engineering Projects — Shrayu Technologies"
          description="Explore 25 verified systems across AI, Data Science, Machine Learning, Python automation, and Full-Stack development from Shrayu Technologies."
          keywords="AI systems, machine learning portfolio, data science projects, Python automation, Full Stack MERN, Shrayu Technologies, open source"
        />

        {/* ATMOSPHERE OVERLAYS */}
        <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={
                selectedCategory !== 'All'
                  ? [{ label: 'Portfolio', href: '/portfolio' }, { label: `${selectedCategory} Systems` }]
                  : [{ label: 'Portfolio & Case Studies' }]
              }
            />
            <ContentFreshnessBadge pageKey="portfolio" />
          </div>

          {/* ========================================================= */}
          {/* HEADER SECTION */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Showcase & Verified Work</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Case Studies &{' '}
              <span className="gradient-text-animated">
                Engineering Portfolio
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Explore 25 verified production-grade systems across AI, Data Science,
              Machine Learning, Python automation, and Full-Stack engineering,
              architected with clean modular code and published open-source.
            </p>
          </motion.div>

          {/* ========================================================= */}
          {/* FILTERING & SEARCH CONTROLS */}
          {/* ========================================================= */}
          <div className="space-y-6">
            {/* Search Input Bar */}
            <div className="max-w-md mx-auto">
              <div
                className={`relative flex items-center rounded-2xl border transition-all duration-200 shadow-sm ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20'
                    : 'bg-white border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
                }`}
              >
                <Search
                  className={`w-4 h-4 ml-4 shrink-0 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by title, stack (e.g. React, XGBoost, A*)..."
                  className={`w-full py-3 px-3 text-xs sm:text-sm bg-transparent border-0 focus:outline-none ${
                    isDark
                      ? 'text-white placeholder-slate-500'
                      : 'text-slate-900 placeholder-slate-400'
                  }`}
                  aria-label="Filter portfolio projects"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`mr-3 p-1 rounded-lg text-xs font-semibold transition-colors ${
                      isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {portfolioCategories.map((category) => {
                const isActive = selectedCategory === category;
                const count = categoryCounts[category] || 0;
                return (
                  <button
                    key={category}
                    onClick={() => handleSelectCategory(category)}
                    className={`relative inline-flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                      isActive
                        ? isDark
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                          : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-700'
                        : isDark
                        ? 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : isDark
                          ? 'bg-white/10 text-slate-400'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Query Status */}
            <div className="flex items-center justify-between text-xs px-2 text-slate-500 dark:text-slate-400 max-w-6xl mx-auto">
              <span>
                Showing{' '}
                <strong
                  className={isDark ? 'text-slate-200' : 'text-slate-800'}
                >
                  {filteredProjects.length}
                </strong>{' '}
                of {portfolioProjects.length} projects
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </span>

              {(selectedCategory !== 'All' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* PROJECTS GRID */}
          {/* ========================================================= */}
          {filteredProjects.length === 0 ? (
            <div
              className={`text-center py-20 px-6 rounded-3xl border ${
                isDark
                  ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <Code2 className="w-12 h-12 mx-auto mb-4 opacity-40 text-blue-500" />
              <h2
                className={`text-lg font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                No projects matched your filter
              </h2>
              <p className="text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                Try searching for a different keyword or switch to another category.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 btn-primary text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, idx) => {
                const config =
                  categoryConfig[project.category] || categoryConfig.AI;
                const IconComponent = config.icon;
                const isExpanded = expandedId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min((idx % 3) * 0.1, 0.3),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="flex flex-col h-full"
                  >
                    <SpotlightCard
                      spotlightColor={config.spotlight}
                      className={`glass-card-3d rounded-3xl overflow-hidden border shadow-xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
                        isDark
                          ? 'border-white/10 bg-[#0F1728]/80 hover:border-white/20'
                          : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-2xl'
                      }`}
                    >
                      {/* CARD TOP DECORATIVE HEADER */}
                      <div
                        className={`p-5 sm:p-6 bg-gradient-to-b border-b flex items-center justify-between ${
                          isDark
                            ? `${config.headerGradientDark} border-white/5`
                            : `${config.headerGradientLight} border-slate-100`
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${
                              isDark
                                ? 'bg-slate-900/80 border-white/10 text-white'
                                : 'bg-white border-slate-200 text-slate-800'
                            }`}
                          >
                            <IconComponent className={`w-4 h-4 ${config.accentColor}`} />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSelectCategory(project.category)}
                            title={`Filter projects by ${project.category}`}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                              isDark ? config.badgeDark : config.badgeLight
                            }`}
                          >
                            {project.category}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <CompareButton type="systems" item={project} variant="compact" />
                          <span
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                              isDark
                                ? 'bg-white/5 text-slate-400'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{String(project.id).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* CARD MAIN CONTENT */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-4">
                        {/* Title */}
                        <div>
                          <h2
                            className={`text-lg sm:text-xl font-extrabold tracking-tight leading-snug break-words transition-colors ${
                              isDark
                                ? 'text-white group-hover:text-blue-300'
                                : 'text-slate-900 group-hover:text-blue-600'
                            }`}
                          >
                            {project.title}
                          </h2>
                        </div>

                        {/* Highlight Banner */}
                        <div
                          className={`p-3 rounded-xl border text-xs font-semibold leading-relaxed flex items-start space-x-2 ${
                            isDark ? config.highlightDark : config.highlightLight
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                          <span>{project.highlight}</span>
                        </div>

                        {/* Professional Verified Description */}
                        <p
                          className={`text-xs sm:text-sm font-medium leading-relaxed flex-1 ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {project.description}
                        </p>

                        {/* Tech Stack Badges */}
                        <div className="pt-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border transition-colors ${
                                  isDark
                                    ? 'bg-white/5 border-white/10 text-slate-300 group-hover:border-blue-500/30'
                                    : 'bg-slate-100 border-slate-200 text-slate-700 group-hover:border-blue-200'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CARD FOOTER ACTIONS */}
                      <div
                        className={`p-5 sm:p-6 pt-4 border-t mt-auto flex items-center justify-between gap-3 ${
                          isDark
                            ? 'border-white/5 bg-slate-900/40'
                            : 'border-slate-100 bg-slate-50/60'
                        }`}
                      >
                        {/* Primary GitHub Link */}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-95 group/btn"
                          title="Open GitHub Repository"
                        >
                          <Github className="w-4 h-4 shrink-0" />
                          <span>GitHub Repo</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>

                        {/* Conditional Live Demo Button */}
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white hover:border-blue-400'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-300'
                            }`}
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            <span>Demo</span>
                          </a>
                        ) : null}

                        {/* Repo Details Drawer Toggle */}
                        <button
                          onClick={() => toggleExpand(project.id)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 active:scale-95 shrink-0 cursor-pointer ${
                            isDark
                              ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                          title="Repository Details"
                          aria-label="Toggle repository details"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Expandable Architecture Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`border-t overflow-hidden text-xs ${
                              isDark
                                ? 'border-white/10 bg-black/50 text-slate-300'
                                : 'border-slate-200 bg-slate-100/90 text-slate-700'
                            }`}
                          >
                            <div className="p-5 space-y-3 font-mono">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-sans font-bold">
                                  Repository Name
                                </span>
                                <span className="text-blue-400 break-all">
                                  Saru2248/{project.repo}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-sans font-bold">
                                  Domain Category
                                </span>
                                <span>{project.category}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-sans font-bold">
                                  Architecture Visual Class
                                </span>
                                <span className="text-emerald-400">
                                  {project.visualType}
                                </span>
                              </div>

                              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans not-italic">
                                <Link
                                  href={`/portfolio/${normalizeProjectSlug(project.repo)}`}
                                  className="text-[11px] font-bold text-blue-400 hover:text-blue-300 inline-flex items-center space-x-1"
                                >
                                  <span>View Architecture Spec & Case Study</span>
                                  <ArrowRight className="w-3 h-3 ml-0.5" />
                                </Link>
                                <Link
                                  href="/services"
                                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-200 inline-flex items-center space-x-1"
                                >
                                  <span>Services</span>
                                  <ArrowRight className="w-3 h-3 ml-0.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ========================================================= */}
          {/* RELATED CATEGORIES NAVIGATION */}
          {/* ========================================================= */}
          <div className="pt-12 border-t border-white/10">
            <RelatedCategories />
          </div>

          {/* ========================================================= */}
          {/* BOTTOM INTERNAL-LINKING CONVERSION SECTION */}
          {/* ========================================================= */}
          <div
            className={`mt-20 p-8 sm:p-12 rounded-3xl border text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl ${
              isDark
                ? 'bg-gradient-to-br from-slate-900/90 via-blue-950/20 to-slate-900/90 border-blue-500/20 shadow-blue-950/40'
                : 'bg-gradient-to-br from-white via-blue-50/50 to-slate-50 border-blue-200/60 shadow-blue-500/5'
            }`}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
              <span>Next Steps for Your Architecture</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Need a Production System Built to These Standards?
            </h2>
            <p
              className={`text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Whether you need scalable enterprise full-stack development, distributed data pipelines, or fine-tuned AI workflows, explore our full spectrum of offerings or contact our engineering team directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore Technical Services</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm border transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-blue-400'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                <span>Request Architecture Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default Products;

