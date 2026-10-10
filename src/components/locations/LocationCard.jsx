"use client";

import Link from 'next/link';
import { MapPin, Phone, Building2, ArrowRight, ExternalLink } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';
import { useTheme } from '../../context/ThemeContext';
import { locationCategories } from '../../data/locationsData';
import CompareButton from '../comparison/CompareButton';

export default function LocationCard({ city }) {
  const { isDark } = useTheme();

  return (
    <SpotlightCard className="glass-card-3d rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  isDark
                    ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                    : 'text-blue-700 bg-blue-50 border-blue-200'
                }`}
              >
                {city.stateName}
              </span>
              {city.isHeadquarters && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Global HQ
                </span>
              )}
            </div>
            <h3
              className={`text-2xl font-black tracking-tight mt-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {city.name}
            </h3>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDark
                ? 'bg-white/5 border-white/10 text-blue-400'
                : 'bg-slate-50 border-slate-200 text-blue-600'
            }`}
          >
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <p
          className={`text-xs font-semibold leading-relaxed ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}
        >
          {city.hubRole}
        </p>

        <p
          className={`text-xs font-medium leading-relaxed line-clamp-3 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {city.overview}
        </p>

        {/* Address and details */}
        <div className="space-y-2 pt-2 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              {city.address} (PIN: {city.postalCode})
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 shrink-0 text-slate-400" />
            <a
              href={`tel:${city.phone}`}
              className={`font-semibold hover:underline ${
                isDark ? 'text-slate-200 hover:text-blue-400' : 'text-slate-800 hover:text-blue-600'
              }`}
            >
              {city.phone}
            </a>
          </div>
        </div>

        {/* Key Localities */}
        {city.keyLocalities && city.keyLocalities.length > 0 && (
          <div className="pt-2 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Key Tech Corridors:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {city.keyLocalities.slice(0, 3).map((loc, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div
        className={`pt-5 border-t space-y-3 ${
          isDark ? 'border-white/10' : 'border-slate-200'
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
          <CompareButton type="locations" item={city} variant="compact" />
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
                  isDark
                    ? 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
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

