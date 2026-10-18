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
import CompareButton from '../components/comparison/CompareButton';
import { useSkeleton } from '../context/SkeletonContext';
import SkeletonWrapper from '../components/skeleton/SkeletonWrapper';
import PortfolioSkeleton from '../components/skeleton/PortfolioSkeleton';
import SpotlightCard from '../components/SpotlightCard';
import { portfolioProjects, portfolioCategories } from '../data/portfolioProjects';
import { getProjectPath, getServiceForProject, getServicePath } from '../utils/internalLinks';

const categoryConfig = {
  AI: {
    icon: Brain,
    badgeDark: 'dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30',
    badgeLight: 'light:bg-purple-50 light:text-purple-700 light:border-purple-200',
    highlightDark: 'dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-300',
    highlightLight: 'light:bg-purple-50/80 light:border-purple-200 light:text-purple-800',
    headerGradientDark: 'dark:from-purple-950/40 dark:via-purple-900/20 dark:to-transparent',
    headerGradientLight: 'light:from-purple-100/70 light:via-purple-50/30 light:to-transparent',
    spotlight: 'rgba(168, 85, 247, 0.15)',
    accentColor: 'text-purple-400'
  },
  'Data Science': {
    icon: Database,
    badgeDark: 'dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
    badgeLight: 'light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200',
    highlightDark: 'dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300',
    highlightLight: 'light:bg-emerald-50/80 light:border-emerald-200 light:text-emerald-800',
    headerGradientDark: 'dark:from-emerald-950/40 dark:via-emerald-900/20 dark:to-transparent',
    headerGradientLight: 'light:from-emerald-100/70 light:via-emerald-50/30 light:to-transparent',
    spotlight: 'rgba(16, 185, 129, 0.15)',
    accentColor: 'text-emerald-400'
  },
  'Machine Learning': {
    icon: Cpu,
    badgeDark: 'dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
    badgeLight: 'light:bg-blue-50 light:text-blue-700 light:border-blue-200',
    highlightDark: 'dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300',
    highlightLight: 'light:bg-blue-50/80 light:border-blue-200 light:text-blue-800',
    headerGradientDark: 'dark:from-blue-950/40 dark:via-blue-900/20 dark:to-transparent',
    headerGradientLight: 'light:from-blue-100/70 light:via-blue-50/30 light:to-transparent',
    spotlight: 'rgba(59, 130, 246, 0.15)',
    accentColor: 'text-blue-400'
  },
  Python: {
    icon: Terminal,
    badgeDark: 'dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
    badgeLight: 'light:bg-amber-50 light:text-amber-700 light:border-amber-200',
    highlightDark: 'dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300',
    highlightLight: 'light:bg-amber-50/80 light:border-amber-200 light:text-amber-800',
    headerGradientDark: 'dark:from-amber-950/40 dark:via-amber-900/20 dark:to-transparent',
    headerGradientLight: 'light:from-amber-100/70 light:via-amber-50/30 light:to-transparent',
    spotlight: 'rgba(245, 158, 11, 0.15)',
    accentColor: 'text-amber-400'
  },
  'Full-Stack Development': {
    icon: Layers,
    badgeDark: 'dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30',
    badgeLight: 'light:bg-cyan-50 light:text-cyan-700 light:border-cyan-200',
    highlightDark: 'dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-300',
    highlightLight: 'light:bg-cyan-50/80 light:border-cyan-200 light:text-cyan-800',
    headerGradientDark: 'dark:from-cyan-950/40 dark:via-cyan-900/20 dark:to-transparent',
    headerGradientLight: 'light:from-cyan-100/70 light:via-cyan-50/30 light:to-transparent',
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
                'light:text-slate-900 dark:text-white'
              }`}
            >
              Case Studies &{' '}
              <span className="gradient-text-animated">
                Engineering Portfolio
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto ${
                'light:text-slate-600 dark:text-slate-300'
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
                  'light:bg-white light:border-slate-300 light:focus-within:border-blue-500 light:focus-within:ring-2 light:focus-within:ring-blue-500/20 dark:bg-slate-900/60 dark:border-slate-800 dark:focus-within:border-blue-500/60 dark:focus-within:ring-2 dark:focus-within:ring-blue-500/20'
                }`}
              >
                <Search
                  className={`w-4 h-4 ml-4 shrink-0 ${
                    'light:text-slate-500 dark:text-slate-400'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by title, stack (e.g. React, XGBoost, A*)..."
                  className={`w-full py-3 px-3 text-xs sm:text-sm bg-transparent border-0 focus:outline-none ${
                    'light:text-slate-900 light:placeholder-slate-400 dark:text-white dark:placeholder-slate-500'
                  }`}
                  aria-label="Filter portfolio projects"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`mr-3 p-1 rounded-lg text-xs font-semibold transition-colors ${
                      'light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
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
                        ? 'light:bg-blue-600 light:text-white light:shadow-lg light:shadow-blue-600/20 light:border light:border-blue-700 dark:bg-blue-600 dark:text-white dark:shadow-lg dark:shadow-blue-600/30 dark:border dark:border-blue-500'
                        : 'light:bg-white light:border light:border-slate-200 light:text-slate-700 light:hover:bg-slate-50 light:hover:text-slate-900 dark:bg-slate-900/60 dark:border dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'light:bg-slate-100 light:text-slate-600 dark:bg-white/10 dark:text-slate-400'
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
                  className={'light:text-slate-800 dark:text-slate-200'}
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
                'light:bg-slate-50 light:border-slate-200 light:text-slate-600 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400'
              }`}
            >
              <Code2 className="w-12 h-12 mx-auto mb-4 opacity-40 text-blue-500" />
              <h2
                className={`text-lg font-bold ${
                  'light:text-slate-900 dark:text-white'
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
                const service = getServiceForProject(project);

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -15% 0px' }}
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
                        'light:border-slate-200 light:bg-white light:hover:border-blue-200 light:hover:shadow-2xl dark:border-white/10 dark:bg-[#0F1728]/80 dark:hover:border-white/20'
                      }`}
                    >
                      {/* CARD TOP DECORATIVE HEADER */}
                      <div
                        className={`p-5 sm:p-6 bg-gradient-to-b border-b flex items-center justify-between ${
                          `${config.headerGradientLight} ${config.headerGradientDark} light:border-slate-100 dark:border-white/5`
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${
                              'light:bg-white light:border-slate-200 light:text-slate-800 dark:bg-slate-900/80 dark:border-white/10 dark:text-white'
                            }`}
                          >
                            <IconComponent className={`w-4 h-4 ${config.accentColor}`} />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSelectCategory(project.category)}
                            title={`Filter projects by ${project.category}`}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                              `${config.badgeLight} ${config.badgeDark}`
                            }`}
                          >
                            {project.category}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <CompareButton type="systems" item={project} variant="compact" />
                          <span
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                              'light:bg-slate-100 light:text-slate-600 dark:bg-white/5 dark:text-slate-400'
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
                              'light:text-slate-900 light:hover:text-blue-600 dark:text-white dark:hover:text-blue-300'
                            }`}
                          >
                            {/* Always-rendered link so every case study is reachable (and crawlable) from the listing */}
                            <Link href={getProjectPath(project)}>{project.title}</Link>
                          </h2>
                        </div>

                        {/* Highlight Banner */}
                        <div
                          className={`p-3 rounded-xl border text-xs font-semibold leading-relaxed flex items-start space-x-2 ${
                            `${config.highlightLight} ${config.highlightDark}`
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                          <span>{project.highlight}</span>
                        </div>

                        {/* Professional Verified Description */}
                        <p
                          className={`text-xs sm:text-sm font-medium leading-relaxed flex-1 ${
                            'light:text-slate-600 dark:text-slate-300'
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
                                  'light:bg-slate-100 light:border-slate-200 light:text-slate-700 light:group-hover:border-blue-200 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:group-hover:border-blue-500/30'
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
                          'light:border-slate-100 light:bg-slate-50/60 dark:border-white/5 dark:bg-slate-900/40'
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
                              'light:bg-white light:border-slate-200 light:text-slate-700 light:hover:bg-slate-100 light:hover:text-blue-600 light:hover:border-blue-300 dark:bg-white/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-blue-400'
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
                            'light:bg-white light:border-slate-200 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10'
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
                              'light:border-slate-200 light:bg-slate-100/90 light:text-slate-700 dark:border-white/10 dark:bg-black/50 dark:text-slate-300'
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
                                  href={getProjectPath(project)}
                                  className="text-[11px] font-bold text-blue-400 hover:text-blue-300 inline-flex items-center space-x-1"
                                >
                                  <span>View Architecture Spec & Case Study</span>
                                  <ArrowRight className="w-3 h-3 ml-0.5" />
                                </Link>
                                <Link
                                  href={service ? getServicePath(service.slug) : '/services'}
                                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-200 inline-flex items-center space-x-1"
                                >
                                  <span>{service ? `${service.shortName} Services` : 'Services'}</span>
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
              'light:bg-gradient-to-br light:from-white light:via-blue-50/50 light:to-slate-50 light:border-blue-200/60 light:shadow-blue-500/5 dark:bg-gradient-to-br dark:from-slate-900/90 dark:via-blue-950/20 dark:to-slate-900/90 dark:border-blue-500/20 dark:shadow-blue-950/40'
            }`}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
              <span>Next Steps for Your Architecture</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 ${
                'light:text-slate-900 dark:text-white'
              }`}
            >
              Need a Production System Built to These Standards?
            </h2>
            <p
              className={`text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed ${
                'light:text-slate-600 dark:text-slate-300'
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
                  'light:bg-white light:border-slate-300 light:text-slate-800 light:hover:bg-slate-100 light:hover:text-blue-600 light:hover:border-blue-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:hover:border-blue-400'
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

