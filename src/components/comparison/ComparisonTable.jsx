"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Check, X, Eye, EyeOff, Trash2, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { formatComparisonRows } from '../../utils/comparisonUtils.js';

export default function ComparisonTable({
  type = 'systems',
  items = [],
  rows = null,
  onRemoveItem = null
}) {
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const { isDark } = useTheme();

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 space-y-3 glass-card-3d rounded-3xl p-8">
        <p className="text-slate-400 font-medium">No items selected for comparison.</p>
        <Link href="/portfolio" className="btn-primary inline-flex items-center text-xs px-5 py-2.5 rounded-full">
          Browse Verified Systems
        </Link>
      </div>
    );
  }

  // Pre-formatted serializable rows or compute on client
  const allRows = rows || formatComparisonRows(type, items);

  // Filter rows if showDifferencesOnly is checked
  const filteredRows = allRows.filter(row => {
    if (!showDifferencesOnly) return true;
    return row.isDiff;
  });

  const renderValue = (format, val, item) => {
    if (val === null || val === undefined || val === '') {
      return <span className="text-slate-500 italic text-xs">Not specified</span>;
    }

    switch (format) {
      case 'badge':
        return (
          <span
            className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
              isDark
                ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}
          >
            {String(val)}
          </span>
        );

      case 'tags':
        if (!Array.isArray(val) || val.length === 0) {
          return <span className="text-slate-500 italic text-xs">None listed</span>;
        }
        return (
          <div className="flex flex-wrap gap-1.5">
            {val.map((t, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        );

      case 'list':
        if (!Array.isArray(val) || val.length === 0) {
          return <span className="text-slate-500 italic text-xs">Not specified</span>;
        }
        return (
          <ul className="space-y-1 text-xs">
            {val.map((it, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                <span className="text-blue-400 shrink-0">•</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        );

      case 'link':
        if (typeof val === 'object' && val?.url) {
          return (
            <a
              href={val.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <span>{val.label || 'View Resource'}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          );
        }
        return <span className="text-slate-400 text-xs">None</span>;

      case 'internal-link':
        if (typeof val === 'object' && val?.url) {
          return (
            <Link
              href={val.url}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>{val.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          );
        }
        return null;

      case 'boolean':
        return <span className="text-xs font-semibold text-slate-200">{String(val)}</span>;

      case 'count-and-list':
        if (Array.isArray(val)) {
          return (
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400">{val.length} Capabilities</span>
              <div className="flex flex-wrap gap-1">
                {val.map((c, i) => (
                  <span key={i} className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          );
        }
        return null;

      default:
        return <span className="text-xs text-slate-300 leading-relaxed font-medium">{String(val)}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass-card-3d border border-white/10">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-300 select-none">
            <input
              type="checkbox"
              checked={showDifferencesOnly}
              onChange={(e) => setShowDifferencesOnly(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0 bg-slate-800 border-white/20"
            />
            <span>Show differences only</span>
          </label>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Comparing <strong className="text-white">{items.length}</strong> items across{' '}
          <strong className="text-white">{filteredRows.length}</strong> attributes
        </div>
      </div>

      {/* Semantic Accessible Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-white/10 glass-card-3d shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Header row with item titles */}
          <thead>
            <tr className={`border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
              <th
                scope="col"
                className="p-6 w-1/4 min-w-[200px] text-xs font-bold uppercase tracking-widest text-slate-400 align-top"
              >
                Attributes
              </th>
              {items.map((item, idx) => {
                const itemId = item.id || item.slug;
                const title = item.name || item.title;
                return (
                  <th
                    key={itemId || idx}
                    scope="col"
                    className="p-6 min-w-[240px] align-top space-y-2 border-l border-white/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                        Item {idx + 1}
                      </span>
                      {onRemoveItem && items.length > 2 && (
                        <button
                          onClick={() => onRemoveItem(itemId)}
                          aria-label={`Remove ${title}`}
                          title="Remove item"
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {title}
                    </h3>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/10">
            {filteredRows.length > 0 ? (
              filteredRows.map((row, aIdx) => {
                return (
                  <tr
                    key={row.key || aIdx}
                    className={`transition-colors ${
                      row.isDiff
                        ? isDark
                          ? 'bg-blue-500/[0.03] hover:bg-blue-500/[0.07]'
                          : 'bg-blue-50/40 hover:bg-blue-50/70'
                        : isDark
                          ? 'hover:bg-white/[0.02]'
                          : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Attribute Label */}
                    <th
                      scope="row"
                      className="p-5 text-xs font-bold text-slate-300 align-top flex items-center justify-between gap-2"
                    >
                      <span>{row.label}</span>
                      {row.isDiff && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Differs
                        </span>
                      )}
                    </th>

                    {/* Values per item */}
                    {row.values.map((val, iIdx) => {
                      const item = items[iIdx];
                      return (
                        <td
                          key={item?.id || item?.slug || iIdx}
                          className="p-5 align-top border-l border-white/10"
                        >
                          {renderValue(row.format, val, item)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={items.length + 1}
                  className="p-8 text-center text-slate-400 text-xs italic"
                >
                  All attributes are identical between the selected items.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
