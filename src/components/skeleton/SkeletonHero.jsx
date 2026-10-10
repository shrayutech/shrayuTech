"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';
import { useTheme } from '../../context/ThemeContext';

/**
 * SkeletonHero — Homepage hero section skeleton.
 * CENTERED single-column layout (matches actual homepage):
 *   badge → large heading (2 lines) → description (2 lines)
 *   → CTA buttons row → trust indicators bar
 *
 * No fake charts. No dashboard. No code editors.
 */
const SkeletonHero = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 px-6 sm:px-8 max-w-5xl mx-auto z-10">
      <div className="flex flex-col items-center space-y-8 text-center">

        {/* Eyebrow badge: "World-Class Software Engineering" */}
        <SkeletonBase variant="badge" width="240px" height="28px" radius="9999px" />

        {/* Large hero heading — 2 lines */}
        <div className="w-full max-w-4xl flex flex-col items-center space-y-3">
          <SkeletonBase variant="heading" width="82%" height="3.5rem" radius="8px" />
          <SkeletonBase variant="heading" width="68%" height="3.5rem" radius="8px" />
        </div>

        {/* Description paragraph — 2 lines */}
        <div className="w-full max-w-2xl flex flex-col items-center space-y-2.5">
          <SkeletonBase variant="text" width="95%" height="1.25rem" radius="6px" />
          <SkeletonBase variant="text" width="78%" height="1.25rem" radius="6px" />
        </div>

        {/* CTA buttons: "Start Your Project" | "View Case Studies" */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
          <SkeletonBase variant="button" width="186px" height="3.25rem" radius="9999px" />
          <SkeletonBase variant="button" width="168px" height="3.25rem" radius="9999px" />
        </div>

        {/* Trust indicators: ✓ Technical Excellence  ✓ Startup Agility  ✓ Process Transparency */}
        <div
          className={`pt-8 border-t flex flex-wrap justify-center gap-8 w-full max-w-xl ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          {[116, 96, 132].map((w, i) => (
            <div key={i} className="flex items-center space-x-2">
              <SkeletonBase variant="circle" width="16px" height="16px" />
              <SkeletonBase variant="text" width={`${w}px`} height="0.875rem" radius="4px" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkeletonHero;

