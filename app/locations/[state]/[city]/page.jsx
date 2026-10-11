import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Code,
  Globe,
  Layers,
  Cpu,
  Smartphone,
  Cloud,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import Breadcrumbs from '../../../../src/components/Breadcrumbs';
import LocationSchema from '../../../../src/components/locations/LocationSchema';
import SpotlightCard from '../../../../src/components/SpotlightCard';
import {
  getCityBySlug,
  getStateBySlug,
  getNearbyCities,
  getValidLocationParams,
  getCategoryBySlug
} from '../../../../src/utils/locationUtils';
import { locationCategories } from '../../../../src/data/locationsData';
import { portfolioProjects } from '../../../../src/data/portfolioProjects';

export function generateStaticParams() {
  const { cityParams } = getValidLocationParams();
  return cityParams;
}

import { buildLocationMetadata, buildNotFoundMetadata } from '../../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);

  if (!city || !state) {
    return buildNotFoundMetadata('City Hub');
  }

  return buildLocationMetadata({ state, city });
}


export default async function CityLocationPage({ params }) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);

  if (!city || !state) {
    notFound();
  }

  const nearbyCities = getNearbyCities(city.slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: city.stateName, href: `/locations/${city.stateSlug}` },
    { label: city.name },
  ];

  // Pick top 3 verified projects relevant to this hub
  const hubProjects = portfolioProjects.slice(0, 3);

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <LocationSchema
        cityData={city}
        stateData={state}
        breadcrumbs={breadcrumbs}
        type="city"
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
            { label: city.name },
          ]}
        />

        {/* HERO SECTION */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{city.stateName} Hub</span>
            </span>
            {city.isHeadquarters ? (
              <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Global Headquarters
              </span>
            ) : (
              <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Enterprise Delivery Hub
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            Software Development in{' '}
            <span className="gradient-text-animated">{city.name}</span>
          </h1>

          <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
            {city.hubRole}
          </p>

          <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            {city.overview}
          </p>
        </div>

        {/* HUB CONTACT & LOCATION DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SpotlightCard className="glass-card-3d rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>Delivery Hub &amp; Operations</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Address:
                  </span>
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    {city.address}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">Postal Code: {city.postalCode}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Direct Contact:
                  </span>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">
                    <a href={`tel:${city.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {city.phone}
                    </a>
                  </p>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">
                    <a href={`mailto:${city.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {city.email}
                    </a>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">{city.businessHours}</p>
                </div>
              </div>

              {/* Local Ecosystem */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Regional Tech Ecosystem
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {city.localEcosystem}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  <span>Request {city.name} Project Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </SpotlightCard>
          </div>

          {/* Right: Map Embed (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="glass-card-3d rounded-3xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{city.name} Regional Location</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {city.coordinates.lat.toFixed(4)}° N, {city.coordinates.lng.toFixed(4)}° E
                </span>
              </div>
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900">
                <iframe
                  title={`${city.name} Map Location`}
                  src={city.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter contrast-125 opacity-90"
                />
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* SUPPORTED SERVICES IN THIS CITY */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
              Specialized Capabilities
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Software Engineering Services in {city.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              Select a specialized capability to view tailored architecture frameworks, technical deliverables, and case studies for {city.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.supportedCategories.map((catSlug) => {
              const cat = getCategoryBySlug(catSlug);
              if (!cat) return null;

              return (
                <SpotlightCard
                  key={catSlug}
                  className="glass-card-3d rounded-3xl p-6 sm:p-8 space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      {city.name} Engineering
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {cat.description}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Core Deliverables:
                      </span>
                      <div className="space-y-1">
                        {cat.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center text-xs text-slate-600 dark:text-slate-300 gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <Link
                      href={`/locations/${city.stateSlug}/${city.slug}/${cat.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors uppercase tracking-wider group"
                    >
                      <span>Explore {cat.shortName} in {city.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* VERIFIED PRODUCTION CASE STUDIES PREVIEW */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                Verifiable Work
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Systems Deployed by Our Engineering Teams
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              <span>View all 25 portfolio projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubProjects.map((p) => (
              <div
                key={p.id}
                className="glass-card-3d rounded-3xl p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {p.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{p.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>View Repository</span>
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

        {/* NEARBY HUBS & REGIONAL CONNECTIVITY */}
        {nearbyCities.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Nearby Engineering Hubs &amp; Corridors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {nearbyCities.map((nc) => (
                <Link
                  key={nc.slug}
                  href={`/locations/${nc.stateSlug}/${nc.slug}`}
                  className="p-5 rounded-2xl glass-card-3d border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {nc.stateName}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {nc.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {nc.hubRole}
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

