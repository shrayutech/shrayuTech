import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Layers,
  ShieldCheck,
  Zap,
  Code
} from 'lucide-react';
import Breadcrumbs from '../../../../../src/components/Breadcrumbs';
import LocationSchema from '../../../../../src/components/locations/LocationSchema';
import SpotlightCard from '../../../../../src/components/SpotlightCard';
import {
  getCityBySlug,
  getStateBySlug,
  getCategoryBySlug,
  getValidLocationParams,
  getVerifiedProjectsForCategory
} from '../../../../../src/utils/locationUtils';
import { locationCategories } from '../../../../../src/data/locationsData';
import {
  getServiceForLocationCategory,
  getServicePath,
  getProjectPath
} from '../../../../../src/utils/internalLinks';

export function generateStaticParams() {
  const { categoryParams } = getValidLocationParams();
  return categoryParams;
}

import { buildLocationMetadata, buildNotFoundMetadata } from '../../../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { state: stateSlug, city: citySlug, category: categorySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!city || !state || !category || !city.supportedCategories.includes(category.slug)) {
    return buildNotFoundMetadata('Service in Location');
  }

  return buildLocationMetadata({ state, city, category });
}


export default async function LocationCategoryPage({ params }) {
  const { state: stateSlug, city: citySlug, category: categorySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);
  const category = getCategoryBySlug(categorySlug);

  // Guard against non-existent or unsupported combinations (Thin content protection)
  if (!city || !state || !category || !city.supportedCategories.includes(category.slug)) {
    notFound();
  }

  // Get other categories supported in this city
  const otherCategories = city.supportedCategories
    .filter((slug) => slug !== category.slug)
    .map((slug) => locationCategories.find((c) => c.slug === slug))
    .filter(Boolean);

  // Get real verified portfolio projects for this category
  const verifiedProjects = getVerifiedProjectsForCategory(category.slug);

  // Canonical service page for this capability (cloud-devops maps to cloud-infrastructure)
  const service = getServiceForLocationCategory(category.slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: city.stateName, href: `/locations/${city.stateSlug}` },
    { label: city.name, href: `/locations/${city.stateSlug}/${city.slug}` },
    { label: category.shortName },
  ];

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <LocationSchema
        cityData={city}
        stateData={state}
        categoryData={category}
        breadcrumbs={breadcrumbs}
        type="service"
      />

      {/* Multi-layered atmosphere background */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Locations', href: '/locations' },
            { label: city.stateName, href: `/locations/${city.stateSlug}` },
            { label: city.name, href: `/locations/${city.stateSlug}/${city.slug}` },
            { label: category.shortName },
          ]}
        />

        {/* HERO SECTION */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {city.name} Engineering Hub • {category.shortName}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {category.name} in{' '}
            <span className="gradient-text-animated">{city.name}</span>
          </h1>

          <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
            {category.tagline}
          </p>

          <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            {category.description} Shrayu Technologies provides organizations in {city.name} with dedicated software architects, rapid agile deployment cadences, and robust technical infrastructure.
          </p>
        </div>

        {/* TECHNICAL CAPABILITIES & LOCAL DELIVERY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Deliverables (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SpotlightCard className="glass-card-3d rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                <span>Architecture Deliverables for {city.name}</span>
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Our engineering sprints for {category.name.toLowerCase()} adhere to strict software quality benchmarks, comprehensive unit test coverage, and automated CI/CD pipelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {category.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Local corridor context */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Service Availability in {city.name}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Available for remote sprints and on-site engineering workshops across {city.name} and the rest of India.
                </p>
              </div>

              {service && (
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  See the full scope, tech stack and FAQs on our{' '}
                  <Link
                    href={getServicePath(service.slug)}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {service.name} service page
                  </Link>
                  .
                </p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  <span>Request {category.shortName} Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/locations/${city.stateSlug}/${city.slug}`}
                  className="btn-secondary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center"
                >
                  <span>Back to {city.name} Hub</span>
                </Link>
              </div>
            </SpotlightCard>
          </div>

          {/* Hub Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="glass-card-3d rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {city.stateName} Hub Contact
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Shrayu Technologies - {city.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{city.hubRole}</p>
              </div>

              <div className="space-y-3 text-xs pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Office:</span>
                  <span className="text-slate-600 dark:text-slate-300">{city.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Phone:</span>
                  <a href={`tel:${city.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {city.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Email:</span>
                  <a href={`mailto:${city.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {city.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">Hours:</span>
                  <span className="text-slate-500 dark:text-slate-400">{city.businessHours}</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* VERIFIED PROJECTS FOR THIS CATEGORY */}
        {verifiedProjects.length > 0 && (
          <div className="space-y-8 pt-4">
            <div className="space-y-2">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                Verified Systems
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Relevant Engineering Systems in {category.shortName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                Explore open source production repositories demonstrating our core competencies in this domain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verifiedProjects.map((p) => (
                <div
                  key={p.id}
                  className="glass-card-3d rounded-3xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {p.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1">
                      <Link href={getProjectPath(p)}>{p.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} repository on GitHub`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                      {p.techStack[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RELATED SERVICES IN THIS CITY */}
        {otherCategories.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Other Software Capabilities in {city.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCategories.map((oc) => (
                <Link
                  key={oc.slug}
                  href={`/locations/${city.stateSlug}/${city.slug}/${oc.slug}`}
                  className="p-5 rounded-2xl glass-card-3d border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {oc.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {oc.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

