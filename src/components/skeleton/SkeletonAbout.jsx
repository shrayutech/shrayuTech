"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';
import { useTheme } from '../../context/ThemeContext';

/**
 * SkeletonAbout — About page skeleton matching actual page sections:
 *   1. Header: badge → large heading → description
 *   2. Story & Philosophy: left (Who We Are text + Vision/Mission cards) | right (Tech Philosophy card)
 *   3. Core Values: section title → 4-col cards
 *   4. Team: section title → 2 member cards (avatar + name + role + bio + social)
 *   5. Future Roadmap: section title → 3-col roadmap cards
 */
const SkeletonAbout = () => {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? 'bg-[#0F1728]/70 border-white/[0.07]'
    : 'bg-white border-slate-200';

  return (
    <div className="max-w-6xl mx-auto relative z-10 space-y-24">

      {/* ── 1. HEADER ── */}
      <div className="text-center max-w-3xl mx-auto space-y-6 flex flex-col items-center">
        <SkeletonBase variant="badge" width="200px" height="28px" radius="9999px" />
        <div className="w-full flex flex-col items-center space-y-3">
          <SkeletonBase variant="heading" width="85%" height="3.25rem" radius="8px" />
          <SkeletonBase variant="heading" width="68%" height="3.25rem" radius="8px" />
        </div>
        <div className="w-full flex flex-col items-center space-y-2">
          <SkeletonBase variant="text" width="92%" height="1.125rem" radius="6px" />
          <SkeletonBase variant="text" width="72%" height="1.125rem" radius="6px" />
        </div>
      </div>

      {/* ── 2. STORY & PHILOSOPHY — 2-col ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left: "Who We Are" text + Vision/Mission mini cards */}
        <div className="lg:col-span-6 space-y-6">
          <SkeletonBase variant="title" width="150px" height="2rem" radius="6px" />
          <div className="space-y-2.5">
            <SkeletonBase variant="text" width="98%" height="0.875rem" radius="4px" />
            <SkeletonBase variant="text" width="91%" height="0.875rem" radius="4px" />
            <SkeletonBase variant="text" width="84%" height="0.875rem" radius="4px" />
            <SkeletonBase variant="text" width="65%" height="0.875rem" radius="4px" />
          </div>

          {/* Vision + Mission side-by-side mini cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {['Vision', 'Mission'].map((_, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border-l-4 ${
                  i === 0 ? 'border-blue-500' : 'border-indigo-500'
                } border-t border-r border-b ${cardClass}`}
              >
                <SkeletonBase variant="text" width="70px" height="0.625rem" radius="3px" className="mb-2" />
                <SkeletonBase variant="text" width="92%" height="0.8rem" radius="4px" />
                <SkeletonBase variant="text" width="75%" height="0.8rem" radius="4px" className="mt-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tech Philosophy card */}
        <div className="lg:col-span-6">
          <div className={`rounded-3xl p-8 space-y-6 border ${cardClass}`}>
            <SkeletonBase variant="title" width="190px" height="1.5rem" radius="6px" />
            <div className="space-y-4">
              {[86, 91, 78, 83].map((w, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <SkeletonBase variant="circle" width="10px" height="10px" />
                  <SkeletonBase variant="text" width={`${w}%`} height="0.875rem" radius="4px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. CORE VALUES — 4-col ── */}
      <div className="space-y-12">
        <div className="flex justify-center">
          <SkeletonBase variant="heading" width="220px" height="2rem" radius="6px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`rounded-3xl p-8 space-y-4 border ${cardClass}`}>
              <SkeletonBase variant="icon" width="2.75rem" height="2.75rem" radius="1rem" />
              <SkeletonBase variant="title" width="68%" height="1.25rem" radius="6px" />
              <div className="space-y-2">
                <SkeletonBase variant="text" width="95%" height="0.8rem" radius="4px" />
                <SkeletonBase variant="text" width="78%" height="0.8rem" radius="4px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. TEAM — 2 member cards ── */}
      <div className="space-y-12 flex flex-col items-center">
        <div className="space-y-3 flex flex-col items-center">
          <SkeletonBase variant="heading" width="180px" height="2rem" radius="6px" />
          <SkeletonBase variant="text" width="260px" height="1rem" radius="4px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {[0, 1].map((i) => (
            <div key={i} className={`rounded-3xl p-8 space-y-6 flex flex-col items-center border ${cardClass}`}>
              {/* Avatar circle */}
              <SkeletonBase variant="circle" width="5rem" height="5rem" />
              {/* Name + role */}
              <div className="space-y-1.5 flex flex-col items-center">
                <SkeletonBase variant="title" width="160px" height="1.25rem" radius="4px" />
                <SkeletonBase variant="text" width="130px" height="0.75rem" radius="3px" />
              </div>
              {/* Bio */}
              <div className="space-y-2 w-full flex flex-col items-center">
                <SkeletonBase variant="text" width="92%" height="0.8rem" radius="4px" />
                <SkeletonBase variant="text" width="82%" height="0.8rem" radius="4px" />
                <SkeletonBase variant="text" width="65%" height="0.8rem" radius="4px" />
              </div>
              {/* Social icons */}
              <div className="flex space-x-3 pt-2">
                <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
                <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. FUTURE ROADMAP — 3-col ── */}
      <div className={`pt-12 border-t space-y-12 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex justify-center">
          <SkeletonBase variant="heading" width="200px" height="2rem" radius="6px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`rounded-3xl p-8 space-y-4 border ${cardClass}`}>
              <SkeletonBase variant="badge" width="80px" height="1.25rem" radius="9999px" />
              <SkeletonBase variant="title" width="75%" height="1.25rem" radius="6px" />
              <div className="space-y-2">
                <SkeletonBase variant="text" width="95%" height="0.8rem" radius="4px" />
                <SkeletonBase variant="text" width="80%" height="0.8rem" radius="4px" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SkeletonAbout;

