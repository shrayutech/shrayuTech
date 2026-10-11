import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Code,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRightLeft,
  ShieldCheck,
  Terminal,
  Activity,
  Zap
} from 'lucide-react';
import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SpotlightCard from '../../../src/components/SpotlightCard';
import CompareButton from '../../../src/components/comparison/CompareButton';
import SchemaMarkup from '../../../src/components/seo/schema/SchemaMarkup';
import {
  buildSoftwareApplicationSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph
} from '../../../src/utils/schema/schemaBuilders';
import { portfolioProjects } from '../../../src/data/portfolioProjects';
import {
  getProjectBySlug,
  getAllProjectSlugs,
  normalizeProjectSlug,
  getRelatedProjects
} from '../../../src/utils/portfolioUtils';
import { servicesData } from '../../../src/data/servicesData';

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

import { buildProductMetadata, buildNotFoundMetadata } from '../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildNotFoundMetadata('Case Study');
  }

  return buildProductMetadata(project);
}


export default async function PortfolioCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSlug = normalizeProjectSlug(project.repo);
  const relatedProjects = getRelatedProjects(project, 3);

  // Match related service
  const matchedService = servicesData.find((s) => {
    if (project.category === 'AI') return s.slug === 'ai-solutions';
    if (project.category === 'Machine Learning') return s.slug === 'ai-solutions';
    if (project.category === 'Data Science') return s.slug === 'ai-solutions' || s.slug === 'custom-software';
    if (project.category === 'Full-Stack Development') return s.slug === 'web-development' || s.slug === 'saas-development';
    if (project.category === 'Python') return s.slug === 'custom-software' || s.slug === 'api-development';
    return false;
  }) || servicesData[0];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: project.category, href: `/portfolio?category=${encodeURIComponent(project.category)}` },
    { label: project.title },
  ];

  const softwareSchema = buildSoftwareApplicationSchema(project);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    breadcrumbs: breadcrumbSchema,
    mainEntity: softwareSchema
  });

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <SchemaMarkup schema={graph} />

      {/* Atmospheric backgrounds */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Portfolio', href: '/portfolio' },
            { label: project.category, href: `/portfolio?category=${encodeURIComponent(project.category)}` },
            { label: project.title },
          ]}
        />

        {/* HERO SECTION */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1 rounded-full text-blue-500 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </span>

            {project.visualType && (
              <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full text-emerald-700 dark:text-emerald-500 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Activity className="w-3.5 h-3.5" />
                <span>{project.visualType} visual engine</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {project.title}
          </h1>

          <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold text-sm sm:text-base flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <span>Key Benchmark: {project.highlight}</span>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                <span>Inspect GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>
            )}

            <CompareButton
              item={{
                id: project.id,
                slug: projectSlug,
                name: project.title,
                category: project.category,
                subtitle: project.highlight,
                type: 'systems',
              }}
              type="systems"
              variant="outline"
              size="md"
            />
          </div>
        </div>

        {/* ARCHITECTURE & SPECS BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Stack Specs */}
          <SpotlightCard className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Technical Stack & Runtime
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Verified languages, toolkits, and algorithmic modules implemented in this system:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Delivery & Architecture Details */}
          <SpotlightCard className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Engineering Blueprint
                </h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Production-tested code with modular dependency isolation</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Lightweight deployment without excessive GPU/hardware overhead</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Direct public repository verification on Shrayu Technologies GitHub</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Compatible with enterprise microservice and event-driven architectures</span>
                </li>
              </ul>
            </div>
          </SpotlightCard>
        </div>

        {/* RELATED SERVICE CORRELATION */}
        {matchedService && (
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                Related Engineering Discipline
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {matchedService.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                {matchedService.tagline}. Discover how our engineering team provisions architectures like this in enterprise environments.
              </p>
            </div>
            <Link
              href={`/services/${matchedService.slug}`}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0"
            >
              <span>Explore {matchedService.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* RELATED CASE STUDIES (Cross-linking) */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Related Production Case Studies
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Other verified repositories in {project.category}:
                </p>
              </div>
              <Link
                href="/portfolio"
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-blue-500 hover:text-blue-400"
              >
                <span>View All Repositories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => {
                const relSlug = normalizeProjectSlug(rel.repo);
                return (
                  <SpotlightCard
                    key={rel.id}
                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {rel.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                        {rel.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 mt-4 flex items-center justify-between">
                      <Link
                        href={`/portfolio/${relSlug}`}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        Architecture Spec
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {rel.techStack[0]}
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* COMPARISON CTA */}
        <div className="p-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-50 via-white to-slate-50 dark:from-purple-950/20 dark:via-slate-900/40 dark:to-slate-900/60 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Interactive Comparison
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Compare This System Against Alternative Architectures
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Use our technical comparison engine to benchmark {project.title} against other production systems in algorithmic complexity, throughput, and hardware requirements.
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Launch Comparison</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

