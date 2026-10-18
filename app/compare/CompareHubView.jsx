"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowRightLeft,
  Sparkles,
  Layers,
  Building2,
  Code2,
  ArrowRight,
  Plus,
  Check,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import ComparisonTable from '../../src/components/comparison/ComparisonTable';
import SpotlightCard from '../../src/components/SpotlightCard';
import { useComparison } from '../../src/context/ComparisonContext.jsx';
import { COMPARISON_CONFIG } from '../../src/config/comparison.config.js';
import {
  getAllEntitiesForType,
  formatComparisonRows,
  getAllCuratedComparisons,
  getEntityById,
  normalizeComparisonSlug
} from '../../src/utils/comparisonUtils.js';

export default function CompareHubView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selected, addItem, removeItem, clearItems, isHydrated } = useComparison();

  // Active tab: 'systems' | 'services' | 'locations'
  const initialType = searchParams.get('type') || COMPARISON_CONFIG.DEFAULT_TYPE;
  const [activeType, setActiveType] = useState(initialType);

  // Available entities for active type
  const availableEntities = getAllEntitiesForType(activeType);
  const typeConfig = COMPARISON_CONFIG.SUPPORTED_TYPES[activeType] || COMPARISON_CONFIG.SUPPORTED_TYPES.systems;
  const curated = getAllCuratedComparisons(activeType);

  // Track active items to display in table
  const [comparedItems, setComparedItems] = useState([]);

  // Check URL query parameters for items (e.g. ?type=systems&items=1,3)
  useEffect(() => {
    const queryType = searchParams.get('type') || activeType;
    const queryItems = searchParams.get('items');

    if (queryItems) {
      const ids = queryItems.split(',').map(s => s.trim()).filter(Boolean);
      const resolved = ids.map(id => getEntityById(queryType, id)).filter(Boolean);
      if (resolved.length > 0) {
        setComparedItems(resolved);
        setActiveType(queryType);
        return;
      }
    }

    // Default to context-selected items if available
    if (selected[activeType] && selected[activeType].length > 0) {
      setComparedItems(selected[activeType]);
    } else {
      // Pick first 2 items as initial demonstration
      const defaults = availableEntities.slice(0, 2).map(e => e.raw);
      setComparedItems(defaults);
    }
  }, [searchParams, activeType, isHydrated]);

  const handleTypeChange = (newType) => {
    setActiveType(newType);
    const newAvailable = getAllEntitiesForType(newType);
    if (selected[newType] && selected[newType].length > 0) {
      setComparedItems(selected[newType]);
    } else {
      setComparedItems(newAvailable.slice(0, 2).map(e => e.raw));
    }
    router.push(`/compare?type=${newType}`);
  };

  const handleToggleEntity = (entity) => {
    const raw = entity.raw;
    const itemId = raw.id || raw.slug;
    const isAlready = comparedItems.some(i => (i.id || i.slug) === itemId);

    if (isAlready) {
      setComparedItems(prev => prev.filter(i => (i.id || i.slug) !== itemId));
    } else {
      if (comparedItems.length >= COMPARISON_CONFIG.MAX_ITEMS) {
        alert(`Maximum ${COMPARISON_CONFIG.MAX_ITEMS} items can be compared side-by-side.`);
        return;
      }
      setComparedItems(prev => [...prev, raw]);
    }
  };

  const handleRemoveFromTable = (itemId) => {
    setComparedItems(prev => prev.filter(i => (i.id || i.slug) !== itemId));
  };

  const rows = formatComparisonRows(activeType, comparedItems);

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      {/* Structured data for /compare is emitted server-side in app/compare/page.jsx */}

      {/* Multi-layered atmosphere background */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <Breadcrumbs items={[{ label: 'Compare Engine' }]} />

        {/* HERO HEADER */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Side-by-Side Evaluator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            Technical Architecture{' '}
            <span className="gradient-text-animated">Comparison Engine</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Objectively evaluate verified software systems, engineering capabilities, and delivery hubs using real production metrics without artificial scores.
          </p>

          {/* TYPE SELECTOR TABS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {Object.values(COMPARISON_CONFIG.SUPPORTED_TYPES).map((typeDef) => {
              const isActive = activeType === typeDef.key;
              return (
                <button
                  key={typeDef.key}
                  onClick={() => handleTypeChange(typeDef.key)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                      : 'light:bg-white light:hover:bg-slate-100 light:text-slate-700 light:border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:border-white/10'
                  }`}
                >
                  {typeDef.key === 'systems' && <Code2 className="w-4 h-4" />}
                  {typeDef.key === 'services' && <Layers className="w-4 h-4" />}
                  {typeDef.key === 'locations' && <Building2 className="w-4 h-4" />}
                  <span>{typeDef.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ENTITY PICKER DRAWER */}
        <div className="p-6 rounded-3xl glass-card-3d border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Select {typeConfig.label} to Compare
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any item to add or remove it from the table (Minimum {COMPARISON_CONFIG.MIN_ITEMS}, Maximum {COMPARISON_CONFIG.MAX_ITEMS}).
              </p>
            </div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {comparedItems.length} of {COMPARISON_CONFIG.MAX_ITEMS} Selected
            </div>
          </div>

          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
            {availableEntities.map((ent) => {
              const rawId = ent.raw.id || ent.raw.slug;
              const isSelected = comparedItems.some(i => (i.id || i.slug) === rawId);
              return (
                <button
                  key={rawId}
                  onClick={() => handleToggleEntity(ent)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-700 light:border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:border-white/10'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
                  <span className="max-w-[200px] truncate">{ent.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC COMPARISON TABLE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Comparative Analysis
            </h2>
            {comparedItems.length >= 2 && (
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Technical Attributes</span>
              </span>
            )}
          </div>

          <ComparisonTable
            type={activeType}
            items={comparedItems}
            rows={rows}
            onRemoveItem={handleRemoveFromTable}
          />
        </div>

        {/* CURATED POPULAR COMPARISONS */}
        {curated.length > 0 && (
          <div className="pt-12 border-t border-slate-200 dark:border-white/10 space-y-6">
            <div className="space-y-1">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                Recommended Benchmarks
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Curated Technical Comparisons
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                Explore pre-indexed, in-depth architectural comparisons evaluated by our senior practitioners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curated.map((c) => (
                <SpotlightCard
                  key={c.slug}
                  className="glass-card-3d rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {c.categoryContext}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
                      {c.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <Link
                      href={`/compare/${c.type}/${c.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors uppercase tracking-wider group"
                    >
                      <span>Read In-Depth Comparison</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

