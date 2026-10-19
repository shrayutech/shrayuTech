"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

/**
 * SkeletonHeroDashboard - Clean, high-fidelity hero visual skeleton.
 * Replaces fake charts & code editors with a unified rounded visual container
 * representing the real platform showcase visual.
 */
const SkeletonHeroDashboard = ({ className = '' }) => {

  return (
    <div
      className={`w-full h-[320px] sm:h-[400px] md:h-[460px] rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 ${
        'light:bg-[#E9EEF5] light:border-slate-200 dark:bg-[#141A2A]/90 dark:border-white/10'
      } ${className}`}
    >
      {/* Top Header Placeholder */}
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <SkeletonBase variant="text" width="140px" height="14px" radius="6px" />
        <SkeletonBase variant="badge" width="80px" height="22px" radius="9999px" />
      </div>

      {/* Main Structural Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto items-center">
        <div className="md:col-span-7 space-y-4">
          <SkeletonBase variant="heading" width="85%" height="2rem" radius="8px" />
          <SkeletonBase variant="text" width="95%" height="1rem" radius="6px" />
          <SkeletonBase variant="text" width="75%" height="1rem" radius="6px" />
          <div className="flex space-x-3 pt-2">
            <SkeletonBase variant="button" width="120px" height="2.5rem" radius="12px" />
            <SkeletonBase variant="button" width="100px" height="2.5rem" radius="12px" />
          </div>
        </div>

        <div className="md:col-span-5 hidden md:block">
          <div
            className={`p-6 rounded-2xl border space-y-3 ${
              'light:bg-[#E2E8F0] light:border-slate-300 dark:bg-[#1B2335] dark:border-white/10'
            }`}
          >
            <SkeletonBase variant="circle" width="3rem" height="3rem" />
            <SkeletonBase variant="title" width="70%" height="1.25rem" radius="6px" />
            <SkeletonBase variant="text" width="90%" height="0.85rem" radius="4px" />
            <SkeletonBase variant="text" width="60%" height="0.85rem" radius="4px" />
          </div>
        </div>
      </div>

      {/* Bottom Bar Status Placeholder */}
      <div className="pt-4 flex justify-between items-center border-t border-white/10">
        <SkeletonBase variant="text" width="160px" height="12px" radius="4px" />
        <SkeletonBase variant="pill" width="90px" height="18px" radius="9999px" />
      </div>
    </div>
  );
};

export default SkeletonHeroDashboard;

