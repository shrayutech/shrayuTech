import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building, MapPin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../../../src/components/Breadcrumbs';
import LocationCard from '../../../src/components/locations/LocationCard';
import LocationSchema from '../../../src/components/locations/LocationSchema';
import { getStateBySlug, getAllStates } from '../../../src/utils/locationUtils';

export function generateStaticParams() {
  const states = getAllStates();
  return states.map((s) => ({ state: s.slug }));
}

import { buildLocationMetadata, buildNotFoundMetadata } from '../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return buildNotFoundMetadata('State Hub');
  }

  return buildLocationMetadata({ state });
}


export default async function StateLocationPage({ params }) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const allStates = getAllStates();
  const otherStates = allStates.filter((s) => s.slug !== state.slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: state.name },
  ];

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <LocationSchema stateData={state} breadcrumbs={breadcrumbs} type="state" />

      {/* Multi-layered atmosphere background */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Locations', href: '/locations' },
            { label: state.name },
          ]}
        />

        {/* HERO SECTION */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State Delivery Network • {state.country}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
            Software Development in{' '}
            <span className="gradient-text-animated">{state.name}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-300">
            {state.overview}
          </p>
        </div>

        {/* STATE HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {state.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card-3d border border-white/10 flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-300 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* CITIES IN STATE */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                Active Hubs in {state.name}
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white">
                Available Engineering Centers ({state.cities.length})
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium max-w-md">
              Each delivery center is backed by senior engineers, transparent sprint tracking, and verifiable production code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.cities.map((city) => (
              <LocationCard key={city.slug} city={city} />
            ))}
          </div>
        </div>

        {/* RELATED STATES INTERNAL LINKING */}
        {otherStates.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">
              Other Regional Software Engineering Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/locations/${s.slug}`}
                  className="p-6 rounded-2xl glass-card-3d border border-white/10 hover:border-blue-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      {s.region}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {s.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {s.cities.length} delivery centers available
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

