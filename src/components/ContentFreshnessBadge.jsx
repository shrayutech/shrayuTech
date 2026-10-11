"use client";

import { Calendar } from 'lucide-react';
import { contentRegistry } from '../data/contentRegistry';

/**
 * "Last updated" date pill for pages where the date matters to readers (Privacy, Terms)
 */
export default function ContentFreshnessBadge({ pageKey, className = '' }) {
  const info = contentRegistry[pageKey];

  if (!info) return null;

  // Format date to human-readable month and year
  const dateObj = new Date(info.lastUpdated);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={`inline-flex items-center space-x-2 text-xs font-semibold ${className}`}>
      <div
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-colors ${
          'light:bg-emerald-50 light:border-emerald-200 light:text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-400'
        }`}
        title={`Reviewed by ${info.reviewer}`}
      >
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <span>Last updated {formattedDate}</span>
      </div>
    </div>
  );
}

