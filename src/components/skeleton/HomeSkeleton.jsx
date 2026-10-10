"use client";
import React from 'react';
import SkeletonHero from './SkeletonHero';
import SkeletonServiceCard from './SkeletonServiceCard';
import SkeletonProjectCard from './SkeletonProjectCard';
import SkeletonBase from './SkeletonBase';
import { useTheme } from '../../context/ThemeContext';

/**
 * HomeSkeleton — Complete homepage loading skeleton.
 *
 * Sections (matching real Home.jsx order):
 *   1. Hero (centered badge → heading → desc → buttons → trust indicators)
 *   2. Tech Stack (badge → section title → icon grid 7 cols)
 *   3. Services Overview (badge → title → desc → 3-col card grid)
 *   4. Why Choose Us (badge → title → desc → 3-col feature cards)
 *   5. Featured Case Studies (left title block + right CTA → 2 project cards)
 *   6. Final CTA banner
 */
const HomeSkeleton = () => {
  const { isDark } = useTheme();

  const sectionBg = isDark ? 'bg-[#070C1B]' : 'bg-[#F8FAFC]';
  const borderClass = isDark ? 'border-white/10' : 'border-slate-200';

  return (
    <div className="relative w-full overflow-hidden transition-colors duration-300">

      {/* ─────────── 1. HERO SECTION ─────────── */}
      <div className={isDark ? 'bg-[#030712]' : 'bg-[#F8FAFC]'}>
        <SkeletonHero />
      </div>

      {/* ─────────── 2. TECH STACK ─────────── */}
      <section className={`py-24 border-t relative z-10 px-6 sm:px-8 ${sectionBg} ${borderClass}`}>
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-3 flex flex-col items-center">
            <SkeletonBase variant="badge" width="130px" height="0.75rem" radius="9999px" />
            <SkeletonBase variant="heading" width="290px" height="1.875rem" radius="6px" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border flex flex-col items-center justify-center space-y-3 ${
                  isDark ? 'bg-[#0F1728]/60 border-white/[0.07]' : 'bg-white border-slate-200'
                }`}
              >
                <SkeletonBase variant="icon" width="2.75rem" height="2.75rem" radius="0.75rem" />
                <SkeletonBase variant="text" width="58px" height="0.75rem" radius="3px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 3. SERVICES OVERVIEW ─────────── */}
      <section className={`py-32 border-t relative z-10 px-6 sm:px-8 ${sectionBg} ${borderClass}`}>
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center">
            <SkeletonBase variant="badge" width="100px" height="0.75rem" radius="9999px" />
            <SkeletonBase variant="heading" width="340px" height="2.25rem" radius="8px" />
            <div className="space-y-2 w-full flex flex-col items-center">
              <SkeletonBase variant="text" width="80%" height="1.125rem" radius="6px" />
              <SkeletonBase variant="text" width="60%" height="1.125rem" radius="6px" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonServiceCard />
            <SkeletonServiceCard />
            <SkeletonServiceCard />
          </div>
        </div>
      </section>

      {/* ─────────── 4. WHY CHOOSE US ─────────── */}
      <section className={`py-32 border-t relative z-10 px-6 sm:px-8 ${isDark ? 'bg-[#080D1A]' : 'bg-[#F8FAFC]'} ${borderClass}`}>
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center">
            <SkeletonBase variant="badge" width="110px" height="0.75rem" radius="9999px" />
            <SkeletonBase variant="heading" width="370px" height="2.25rem" radius="8px" />
            <div className="space-y-2 w-full flex flex-col items-center">
              <SkeletonBase variant="text" width="75%" height="1.125rem" radius="6px" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-3xl p-8 space-y-5 border ${
                  isDark ? 'bg-[#0F1728]/70 border-white/[0.07]' : 'bg-white border-slate-200'
                }`}
              >
                <SkeletonBase variant="icon" width="2.75rem" height="2.75rem" radius="1rem" />
                <SkeletonBase variant="title" width="62%" height="1.25rem" radius="6px" />
                <div className="space-y-2">
                  <SkeletonBase variant="text" width="95%" height="0.85rem" radius="4px" />
                  <SkeletonBase variant="text" width="78%" height="0.85rem" radius="4px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 5. FEATURED CASE STUDIES ─────────── */}
      <section className={`py-32 border-t relative z-10 px-6 sm:px-8 ${isDark ? 'bg-[#090E1D]' : 'bg-[#F7F9FC]'} ${borderClass}`}>
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4 max-w-2xl w-full">
              <SkeletonBase variant="badge" width="150px" height="0.75rem" radius="9999px" />
              <SkeletonBase variant="heading" width="300px" height="2.25rem" radius="8px" />
              <SkeletonBase variant="text" width="85%" height="1rem" radius="4px" />
            </div>
            <SkeletonBase variant="button" width="178px" height="2.625rem" radius="9999px" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonProjectCard />
            <SkeletonProjectCard />
          </div>
        </div>
      </section>

      {/* ─────────── 6. FINAL CTA ─────────── */}
      <section className="py-32 relative z-10 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className={`rounded-[2.5rem] p-12 sm:p-16 text-center space-y-8 border ${
              isDark ? 'bg-[#0B1021] border-white/15' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="space-y-4 flex flex-col items-center">
              <SkeletonBase variant="heading" width="72%" height="2.5rem" radius="8px" />
              <div className="space-y-2 w-full flex flex-col items-center">
                <SkeletonBase variant="text" width="80%" height="1.125rem" radius="6px" />
                <SkeletonBase variant="text" width="60%" height="1.125rem" radius="6px" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <SkeletonBase variant="button" width="186px" height="3.25rem" radius="9999px" />
              <SkeletonBase variant="button" width="172px" height="3.25rem" radius="9999px" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeSkeleton;

