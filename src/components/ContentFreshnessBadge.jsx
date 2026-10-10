"use client";

import { ShieldCheck, Calendar, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { contentRegistry } from '../data/contentRegistry';

/**
 * Reusable Content Freshness & Verification Badge
 * - Displays verifiable editorial and technical review dates
 * - Supports Google Search E-E-A-T and human reader trust
 * - Renders non-intrusive pill styling with version metadata
 */
export default function ContentFreshnessBadge({ pageKey, className = '' }) {
  const { isDark } = useTheme();
  const info = contentRegistry[pageKey];

  if (!info) return null;

  // Format date to human-readable month and year
  const dateObj = new Date(info.lastReviewed);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={`inline-flex items-center space-x-2 text-xs font-semibold ${className}`}>
      <div
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-colors ${
          isDark
            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}
        title={`Content Version: ${info.contentVersion} | Reviewer: ${info.reviewer} | Next review due: ${info.nextReviewDue}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        <span>Verified Content &bull; Reviewed {formattedDate}</span>
      </div>
    </div>
  );
}

