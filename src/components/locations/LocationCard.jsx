"use client";

import Link from 'next/link';
import { MapPin, Phone, Building2, ArrowRight, ExternalLink } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';
import { locationCategories } from '../../data/locationsData';

export default function LocationCard({ city }) {

  return (
    <SpotlightCard className="glass-card-3d rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  'light:text-blue-700 light:bg-blue-50 light:border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20'
                }`}
              >
                {city.stateName}
              </span>
              {city.isHeadquarters && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Global HQ
                </span>
              )}
            </div>
            <h3
              className={`text-2xl font-black tracking-tight mt-2 ${
                'light:text-slate-900 dark:text-white'
              }`}
            >
              {city.name}
            </h3>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              'light:bg-slate-50 light:border-slate-200 light:text-blue-600 dark:bg-white/5 dark:border-white/10 dark:text-blue-400'
            }`}
          >
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <p
          className={`text-xs font-semibold leading-relaxed ${
            'light:text-blue-600 dark:text-blue-400'
          }`}
        >
          {city.hubRole}
        </p>

        <p
          className={`text-xs font-medium leading-relaxed line-clamp-3 ${
            'light:text-slate-600 dark:text-slate-300'
          }`}
        >
          {city.overview}
        </p>

        {/* Address and details */}
        <div className="space-y-2 pt-2 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
            <span className={'light:text-slate-700 dark:text-slate-300'}>
              {city.address} (PIN: {city.postalCode})
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 shrink-0 text-slate-400" />
            <a
              href={`tel:${city.phone}`}
              className={`font-semibold hover:underline ${
                'light:text-slate-800 light:hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400'
              }`}
            >
              {city.phone}
            </a>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div
        className={`pt-5 border-t space-y-3 ${
          'light:border-slate-200 dark:border-white/10'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/locations/${city.stateSlug}/${city.slug}`}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors group"
            >
              <span>View {city.name} Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick category chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {city.supportedCategories.slice(0, 3).map((catSlug) => {
            const catObj = locationCategories.find((c) => c.slug === catSlug);
            if (!catObj) return null;
            return (
              <Link
                key={catSlug}
                href={`/locations/${city.stateSlug}/${city.slug}/${catSlug}`}
                className={`text-[10px] font-semibold px-2 py-1 rounded transition-colors ${
                  'light:bg-blue-50 light:text-blue-700 light:hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20'
                }`}
              >
                {catObj.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </SpotlightCard>
  );
}

