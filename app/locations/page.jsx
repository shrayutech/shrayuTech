import Link from 'next/link';
import { MapPin, Building, Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import LocationSearch from '../../src/components/locations/LocationSearch';
import LocationCard from '../../src/components/locations/LocationCard';
import LocationSchema from '../../src/components/locations/LocationSchema';
import { getAllStates, getAllCities } from '../../src/utils/locationUtils';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Regional Engineering Hubs & Locations in India',
  description: 'Discover software engineering hubs and delivery centers across India, including Chhatrapati Sambhajinagar HQ, Pune, Mumbai, Nagpur, Nashik, and Bengaluru.',
  path: '/locations',
  keywords: ['engineering hubs India', 'software delivery centers', 'Maharashtra tech corridor', 'Karnataka IT hub']
});

export default function LocationsLandingPage() {
  const states = getAllStates();
  const allCities = getAllCities();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations' },
  ];

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <LocationSchema breadcrumbs={breadcrumbs} type="hub" />

      {/* Multi-layered atmosphere background */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <Breadcrumbs items={[{ label: 'Locations' }]} />

        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>National Delivery Network</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Software Engineering &amp;{' '}
            <span className="gradient-text-animated">Delivery Hubs</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto text-slate-300">
            Shrayu Technologies operates from our global headquarters in Maharashtra, partnering with venture-backed startups and enterprises across India's premier tech corridors.
          </p>

          {/* Interactive Search Bar */}
          <div className="pt-4">
            <LocationSearch />
          </div>
        </div>

        {/* HEADQUARTERS HIGHLIGHT BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/40 border border-blue-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Global Headquarters &amp; Central Lab
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Chhatrapati Sambhajinagar, Maharashtra
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Our central engineering laboratory houses our core systems architects, AI researchers, and founding leadership. All primary R&amp;D, client code audits, and sprint planning originate from our Maharashtra headquarters.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-1">
                <span>📍 PIN: 431001</span>
                <span>📞 +91 70200 41614</span>
                <span>✉️ shrayutech@gmail.com</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/locations/maharashtra/chhatrapati-sambhajinagar"
                className="btn-primary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <span>Explore HQ Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center"
              >
                <span>Schedule Consultation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* STATES EXPLORER */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                Regional Coverage
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white">
                Explore by State &amp; Territory
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium max-w-md">
              We deploy dedicated engineering squads across key metropolitan regions, providing both remote and on-site technical architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {states.map((state) => (
              <div
                key={state.slug}
                className="glass-card-3d rounded-3xl p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                      {state.region} • {state.country}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {state.cities.length} Hubs
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{state.name}</h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {state.overview}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Active Tech Hubs:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {state.cities.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/locations/${state.slug}/${c.slug}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 group"
                        >
                          <span>{c.name}</span>
                          {c.isHeadquarters && (
                            <span className="text-[9px] font-bold text-emerald-400 uppercase">
                              HQ
                            </span>
                          )}
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/locations/${state.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider group"
                  >
                    <span>View all {state.name} engineering centers</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALL ENGINEERING HUBS GRID */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
              All Delivery Hubs
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Verified Technical Delivery Hubs
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Explore localized software capabilities, key tech corridors, and verified case studies per city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCities.map((city) => (
              <LocationCard key={city.slug} city={city} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

