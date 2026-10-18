import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Code,
  Layers,
  Building2,
  HelpCircle,
  ArrowRightLeft,
  BookOpen,
  FlaskConical
} from 'lucide-react';
import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SpotlightCard from '../../../src/components/SpotlightCard';
import CompareButton from '../../../src/components/comparison/CompareButton';
import SchemaMarkup from '../../../src/components/seo/schema/SchemaMarkup';
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph
} from '../../../src/utils/schema/schemaBuilders';
import { getServiceBySlug, getAllServiceSlugs } from '../../../src/data/servicesData';
import { portfolioProjects } from '../../../src/data/portfolioProjects';
import { statesData } from '../../../src/data/locationsData';
import { normalizeProjectSlug } from '../../../src/utils/portfolioUtils';
import {
  getRelatedServices,
  getComparisonsForService,
  getResearchForService,
  getLocationCategorySlugForService,
  getComparisonPath,
  getResearchPath,
  getServicePath
} from '../../../src/utils/internalLinks';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

import { buildServiceMetadata, buildNotFoundMetadata } from '../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildNotFoundMetadata('Service');
  }

  return buildServiceMetadata(service);
}


export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Find verified case studies in portfolio matching this service
  const matchedProjects = portfolioProjects.filter((p) => {
    if (service.slug === 'custom-software') return p.category === 'Python' || p.techStack.includes('Python');
    if (service.slug === 'web-development') return p.category === 'Full-Stack Development';
    if (service.slug === 'mobile-apps') return p.category === 'Full-Stack Development';
    if (service.slug === 'ai-solutions') return p.category === 'AI' || p.category === 'Machine Learning';
    if (service.slug === 'cloud-infrastructure' || service.slug === 'devops-ci-cd') return p.techStack.includes('Docker') || p.category === 'Python';
    if (service.slug === 'api-development') return p.techStack.includes('Flask') || p.techStack.includes('Python');
    if (service.slug === 'saas-development') return p.category === 'Full-Stack Development';
    return p.category === service.portfolioCategory;
  }).slice(0, 3);

  // Find all regional hubs supporting this service
  const allCities = statesData.flatMap((state) => state.cities);
  const locationCategorySlug = getLocationCategorySlugForService(service.slug);
  const regionalHubs = allCities.filter((city) => city.supportedCategories.includes(locationCategorySlug));

  // Contextual cross-links: neighbouring services, the matching comparison and research citing this service
  const relatedServices = getRelatedServices(service.slug, 3);
  const comparison = getComparisonsForService(service.slug)[0];
  const relatedResearch = getResearchForService(service.slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.shortName },
  ];

  const serviceSchema = buildServiceSchema(service);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    breadcrumbs: breadcrumbSchema,
    mainEntity: serviceSchema,
    faqs: service.faqs
  });

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <SchemaMarkup schema={graph} />

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: service.shortName },
          ]}
        />

        {/* HERO SECTION */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{service.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {service.name}
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-blue-600 dark:text-blue-400">
            {service.tagline}
          </p>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {service.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Consult Engineering Lead</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <CompareButton
              item={{
                id: service.slug,
                slug: service.slug,
                name: service.name,
                category: service.shortName,
                subtitle: service.tagline,
                type: 'services',
              }}
              type="services"
              variant="outline"
              size="md"
            />
          </div>
        </div>

        {/* TECH STACK & ARCHITECTURE SPECS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SpotlightCard className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Technology Stack
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Core languages, frameworks, and datastores utilized in production for this discipline:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {service.techStack.map((tech) => (
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

          <SpotlightCard className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Architectural Capabilities
                </h2>
              </div>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>

        {/* PRODUCTION DELIVERABLES */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Engineering Deliverables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.deliverables.map((deliv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md flex items-start space-x-3"
              >
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {deliv}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* REGIONAL DELIVERY HUBS (Location Integration) */}
        {regionalHubs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Active Regional Delivery Corridors
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  On-ground delivery labs and enterprise software engineering teams providing this capability:
                </p>
              </div>
              <Link
                href="/locations"
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-blue-500 hover:text-blue-400"
              >
                <span>All Locations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {regionalHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/locations/${hub.stateSlug}/${hub.slug}/${locationCategorySlug}`}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md transition-all group hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                      {hub.stateName}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {hub.name} Hub
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {hub.address}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED CASE STUDIES */}
        {matchedProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Verified Production Systems & Repositories
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Open-source production systems and algorithmic blueprints illustrating this capability:
                </p>
              </div>
              <Link
                href="/portfolio"
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-blue-500 hover:text-blue-400"
              >
                <span>View All 25 Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedProjects.map((p) => {
                const projectSlug = normalizeProjectSlug(p.repo);
                return (
                  <SpotlightCard
                    key={p.id}
                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          {p.category}
                        </span>
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.title} source code on GitHub`}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 mt-4 flex items-center justify-between">
                      <Link
                        href={`/portfolio/${projectSlug}`}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        Architecture Spec
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.techStack[0]}
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQS SECTION */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <HelpCircle className="w-7 h-7 text-blue-500" />
              Frequently Asked Technical Questions
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md space-y-2"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED SERVICES (curated neighbours from src/utils/internalLinks.js) */}
        {relatedServices.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Services Often Paired With {service.shortName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.slug}
                  href={getServicePath(rs.slug)}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md transition-all group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
                    {rs.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors mt-1.5 flex items-center justify-between gap-2">
                    {rs.name}
                    <ArrowRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {rs.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* RESEARCH & EXTERNAL STANDARDS */}
        {(relatedResearch.length > 0 || service.references?.length > 0) && (
          <div className={`grid grid-cols-1 gap-6 ${relatedResearch.length > 0 && service.references?.length > 0 ? 'md:grid-cols-2' : ''}`}>
            {relatedResearch.length > 0 && (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-500" />
                  Related Original Research
                </h2>
                <ul className="space-y-2">
                  {relatedResearch.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={getResearchPath(r)}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.references?.length > 0 && (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Standards &amp; References We Follow
                </h2>
                <ul className="space-y-2">
                  {service.references.map((ref) => (
                    <li key={ref.url}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                      >
                        {ref.label}
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* RELATED COMPARISONS & CROSS-LINKING */}
        <div className="p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-900/40 dark:to-slate-900/60 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Architectural Tradeoffs
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {comparison ? comparison.title : 'Evaluating Between Different Delivery Models?'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {comparison
                ? comparison.overview
                : 'Inspect our multi-vector comparison benchmark matrix analyzing maintenance, security, and TCO across custom software vs off-the-shelf platforms.'}
            </p>
          </div>
          <Link
            href={comparison ? getComparisonPath(comparison) : '/compare'}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{comparison ? 'Read the Full Comparison' : 'Open Comparison Engine'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

