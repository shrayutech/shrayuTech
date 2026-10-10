"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRightLeft, X, ArrowRight, Trash2 } from 'lucide-react';
import { useComparison } from '../../context/ComparisonContext.jsx';
import { useTheme } from '../../context/ThemeContext';
import { COMPARISON_CONFIG } from '../../config/comparison.config.js';
import { normalizeComparisonSlug } from '../../utils/comparisonUtils.js';

export default function ComparisonBar() {
  const { selected, removeItem, clearItems, isHydrated } = useComparison();
  const { isDark } = useTheme();
  const router = useRouter();

  if (!isHydrated) return null;

  // Determine active type that has selected items
  const activeType = Object.keys(selected).find(k => (selected[k] || []).length > 0);
  if (!activeType) return null;

  const items = selected[activeType] || [];
  if (items.length === 0) return null;

  const typeConfig = COMPARISON_CONFIG.SUPPORTED_TYPES[activeType] || {
    label: 'Items',
    singularLabel: 'Item'
  };

  const handleCompareClick = () => {
    const slugs = items.map(i => i.slug || i.id || i.repo);
    const comparisonSlug = normalizeComparisonSlug(slugs);
    router.push(`/compare?type=${activeType}&items=${encodeURIComponent(slugs.join(','))}`);
  };

  return (
    <div className="fixed bottom-6 inset-x-4 sm:inset-x-8 md:max-w-4xl md:mx-auto z-40 animate-slide-up">
      <div
        className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark
            ? 'bg-slate-900/90 border-blue-500/40 shadow-blue-950/50 text-white'
            : 'bg-white/95 border-blue-400/50 shadow-slate-300/60 text-slate-900'
        }`}
      >
        {/* Left: Info & Chips */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-tight block">
                {items.length} {items.length === 1 ? typeConfig.singularLabel : typeConfig.label} Selected
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Min {COMPARISON_CONFIG.MIN_ITEMS}, Max {COMPARISON_CONFIG.MAX_ITEMS}
              </span>
            </div>
          </div>

          {/* Item Chips */}
          <div className="flex flex-wrap items-center gap-1.5 max-h-20 overflow-y-auto">
            {items.map((it) => {
              const itemId = it.id || it.slug;
              const name = it.name || it.title || 'Item';
              return (
                <div
                  key={itemId}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                    isDark
                      ? 'bg-white/10 border-white/15 text-slate-200'
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className="max-w-[140px] truncate">{name}</span>
                  <button
                    onClick={() => removeItem(activeType, itemId)}
                    aria-label={`Remove ${name}`}
                    className="text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
          <button
            onClick={() => clearItems(activeType)}
            className="text-xs font-semibold px-3 py-2 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={handleCompareClick}
            disabled={items.length < COMPARISON_CONFIG.MIN_ITEMS}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              items.length >= COMPARISON_CONFIG.MIN_ITEMS
                ? 'btn-primary !py-2.5 shadow-lg shadow-blue-500/25'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

