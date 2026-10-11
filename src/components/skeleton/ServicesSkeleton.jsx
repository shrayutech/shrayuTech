"use client";
import React from 'react';
import SkeletonServiceCard from './SkeletonServiceCard';
import SkeletonBase from './SkeletonBase';

/**
 * ServicesSkeleton — Services page skeleton.
 * Sections:
 *   1. Header: badge → heading → description
 *   2. 9 service cards (3-col grid)
 *   3. Bottom CTA banner
 */
const ServicesSkeleton = () => {

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">

        {/* ── Header ── */}
        <div className="text-center max-w-4xl mx-auto space-y-6 flex flex-col items-center">
          <SkeletonBase variant="badge" width="190px" height="28px" radius="9999px" />
          <div className="w-full flex flex-col items-center space-y-3">
            <SkeletonBase variant="heading" width="82%" height="3.25rem" radius="8px" />
            <SkeletonBase variant="heading" width="64%" height="3.25rem" radius="8px" />
          </div>
          <div className="w-full flex flex-col items-center space-y-2">
            <SkeletonBase variant="text" width="90%" height="1.125rem" radius="6px" />
            <SkeletonBase variant="text" width="70%" height="1.125rem" radius="6px" />
          </div>
        </div>

        {/* ── 9 Service Cards — 3-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonServiceCard key={i} />
          ))}
        </div>

        {/* ── Bottom CTA Banner ── */}
        <div className="pt-8">
          <div
            className={`rounded-[2.5rem] p-12 sm:p-16 text-center space-y-6 border ${
              'light:bg-slate-900 light:border-slate-800 dark:bg-[#0B1021] dark:border-white/15'
            }`}
          >
            <div className="space-y-4 flex flex-col items-center">
              <SkeletonBase variant="heading" width="60%" height="2.25rem" radius="8px" />
              <div className="space-y-2 flex flex-col items-center w-full">
                <SkeletonBase variant="text" width="72%" height="1.125rem" radius="6px" />
              </div>
            </div>
            <div className="pt-4 flex justify-center">
              <SkeletonBase variant="button" width="220px" height="3.25rem" radius="9999px" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesSkeleton;

