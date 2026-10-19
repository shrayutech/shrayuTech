"use client";
import React from 'react';
import SkeletonProjectCard from './SkeletonProjectCard';
import SkeletonBase from './SkeletonBase';

/**
 * PortfolioSkeleton — Portfolio / Case Studies page skeleton.
 * Sections:
 *   1. Header: badge → heading → description
 *   2. 4 case study cards (stacked, full-width)
 */
const PortfolioSkeleton = () => {
  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto space-y-6 flex flex-col items-center">
          <SkeletonBase variant="badge" width="190px" height="28px" radius="9999px" />
          <div className="w-full flex flex-col items-center space-y-3">
            <SkeletonBase variant="heading" width="80%" height="3.25rem" radius="8px" />
            <SkeletonBase variant="heading" width="62%" height="3.25rem" radius="8px" />
          </div>
          <div className="w-full flex flex-col items-center space-y-2">
            <SkeletonBase variant="text" width="90%" height="1.125rem" radius="6px" />
            <SkeletonBase variant="text" width="70%" height="1.125rem" radius="6px" />
          </div>
        </div>

        {/* ── 4 Case Study Cards — stacked ── */}
        <div className="space-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonProjectCard key={i} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default PortfolioSkeleton;

