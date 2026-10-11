"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

/**
 * SkeletonServiceCard — Matches the real Services page card:
 *   tagline badge → icon box → title → description lines
 *   → feature list (4 items with check icon) → tech tag pills
 *
 * Used on both HomeSkeleton (3 cards) and ServicesSkeleton (9 cards).
 */
const SkeletonServiceCard = ({ className = '' }) => {

  return (
    <div
      className={`rounded-3xl p-8 space-y-6 border ${
        'light:bg-white light:border-slate-200 dark:bg-[#0F1728]/70 dark:border-white/[0.07]'
      } ${className}`}
    >
      {/* Tagline badge: "Enterprise Core Logic" */}
      <SkeletonBase variant="badge" width="140px" height="22px" radius="9999px" />

      {/* Icon box */}
      <SkeletonBase variant="icon" width="3rem" height="3rem" radius="1rem" />

      {/* Service title */}
      <SkeletonBase variant="title" width="65%" height="1.375rem" radius="6px" />

      {/* Description — 3 lines */}
      <div className="space-y-2">
        <SkeletonBase variant="text" width="96%" height="0.875rem" radius="4px" />
        <SkeletonBase variant="text" width="88%" height="0.875rem" radius="4px" />
        <SkeletonBase variant="text" width="70%" height="0.875rem" radius="4px" />
      </div>

      {/* Feature list — 4 items, each with small check icon + text */}
      <div className="space-y-2.5">
        {[85, 90, 78, 82].map((w, i) => (
          <div key={i} className="flex items-center space-x-2.5">
            <SkeletonBase variant="circle" width="14px" height="14px" />
            <SkeletonBase variant="text" width={`${w}%`} height="0.8rem" radius="3px" />
          </div>
        ))}
      </div>

      {/* Technology tag pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[62, 56, 72, 60, 68].map((w, i) => (
          <SkeletonBase key={i} variant="pill" width={`${w}px`} height="1.5rem" radius="6px" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonServiceCard;

