"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

/**
 * SkeletonProjectCard — Matches the real Portfolio case study card layout.
 * 12-column grid: col-span-5 visual preview window | col-span-7 case study details.
 *
 * Visual preview: mimics the real code/dashboard/terminal windows (simplified).
 * Right side: category label, title, short desc, impact badge, tech tags, action buttons.
 *
 * NO fake charts. NO analytics panels. Just clean structural skeleton.
 */
const SkeletonProjectCard = ({ className = '' }) => {

  return (
    <div
      className={`rounded-3xl overflow-hidden border ${
        'light:bg-white light:border-slate-200 dark:bg-[#0F1728]/70 dark:border-white/[0.07]'
      } ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 items-center">

        {/* LEFT: Visual project preview (5 cols) — simplified dark panel */}
        <div className="lg:col-span-5 w-full">
          <div
            className={`w-full rounded-2xl border p-5 space-y-4 ${
              'light:bg-slate-100 light:border-slate-200 dark:bg-[#090d16] dark:border-white/10'
            }`}
            style={{ minHeight: '200px' }}
          >
            {/* Top bar: window dots + label */}
            <div className={`flex items-center justify-between pb-3 border-b ${'light:border-slate-200 dark:border-white/10'}`}>
              <div className="flex space-x-1.5">
                <SkeletonBase variant="circle" width="10px" height="10px" />
                <SkeletonBase variant="circle" width="10px" height="10px" />
                <SkeletonBase variant="circle" width="10px" height="10px" />
              </div>
              <SkeletonBase variant="text" width="80px" height="10px" radius="4px" />
            </div>

            {/* Content blocks: 2 stat-like boxes */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className={`p-3 rounded-xl space-y-2 ${'light:bg-white dark:bg-white/5'}`}>
                <SkeletonBase variant="text" width="60%" height="8px" radius="3px" />
                <SkeletonBase variant="heading" width="80%" height="1.25rem" radius="4px" />
              </div>
              <div className={`p-3 rounded-xl space-y-2 ${'light:bg-white dark:bg-white/5'}`}>
                <SkeletonBase variant="text" width="65%" height="8px" radius="3px" />
                <SkeletonBase variant="heading" width="75%" height="1.25rem" radius="4px" />
              </div>
            </div>

            {/* Bottom text lines */}
            <div className="space-y-2 pt-2">
              <SkeletonBase variant="text" width="90%" height="9px" radius="3px" />
              <SkeletonBase variant="text" width="70%" height="9px" radius="3px" />
            </div>
          </div>
        </div>

        {/* RIGHT: Case study details (7 cols) */}
        <div className="lg:col-span-7 space-y-5">

          {/* Category label + title + short description */}
          <div className="space-y-2">
            <SkeletonBase variant="text" width="160px" height="0.75rem" radius="4px" />
            <SkeletonBase variant="title" width="88%" height="1.875rem" radius="8px" />
            <div className="space-y-1.5 pt-1">
              <SkeletonBase variant="text" width="96%" height="0.875rem" radius="4px" />
              <SkeletonBase variant="text" width="80%" height="0.875rem" radius="4px" />
            </div>
          </div>

          {/* Business impact banner */}
          <div
            className={`p-4 rounded-2xl flex items-center space-x-3 border ${
              'light:bg-slate-50 light:border-slate-200 dark:bg-white/[0.04] dark:border-white/[0.07]'
            }`}
          >
            <SkeletonBase variant="icon" width="20px" height="20px" radius="6px" />
            <SkeletonBase variant="text" width="70%" height="0.875rem" radius="4px" />
          </div>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-2">
            {[62, 50, 74, 58, 48].map((w, i) => (
              <SkeletonBase key={i} variant="pill" width={`${w}px`} height="1.375rem" radius="6px" />
            ))}
          </div>

          {/* Action buttons: "Architecture Deep Dive" + GitHub icon + (optional) external link */}
          <div className="flex items-center space-x-3 pt-1">
            <SkeletonBase variant="button" width="188px" height="2.625rem" radius="12px" />
            <SkeletonBase variant="icon" width="2.25rem" height="2.25rem" radius="0.75rem" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkeletonProjectCard;

