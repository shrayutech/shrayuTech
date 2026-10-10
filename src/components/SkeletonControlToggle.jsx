"use client";

import React from 'react';
import { useSkeleton } from '../context/SkeletonContext';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Play, Check } from 'lucide-react';

/**
 * SkeletonControlToggle - Floating badge tool in dev/testing mode allowing direct inspection
 * and simulation of the skeleton loading state across Light & Dark themes.
 */
const SkeletonControlToggle = () => {
  const { isDemoMode, toggleDemoMode, triggerLoading } = useSkeleton();
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-2">
      <button
        onClick={toggleDemoMode}
        className={`px-4 py-2.5 rounded-full font-bold text-xs flex items-center space-x-2 shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
          isDemoMode
            ? 'bg-blue-600 text-white border-blue-400 shadow-blue-500/30'
            : isDark
            ? 'bg-[#0B1020]/90 text-slate-300 border-white/15 hover:text-white hover:border-blue-500/40'
            : 'bg-white/90 text-slate-700 border-slate-300 hover:text-slate-900 hover:border-blue-500/40'
        }`}
        title="Toggle persistent Skeleton loading state to inspect UI structure"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span>{isDemoMode ? 'Exit Skeleton View' : 'Skeleton Mode'}</span>
        {isDemoMode && <Check className="w-3.5 h-3.5 ml-1" />}
      </button>

      {!isDemoMode && (
        <button
          onClick={() => triggerLoading(1500)}
          className={`p-2.5 rounded-full font-bold text-xs flex items-center shadow-xl backdrop-blur-xl border transition-all duration-300 ${
            isDark
              ? 'bg-[#0B1020]/90 text-slate-300 border-white/15 hover:text-white hover:border-blue-500/40'
              : 'bg-white/90 text-slate-700 border-slate-300 hover:text-slate-900 hover:border-blue-500/40'
          }`}
          title="Simulate 1.5s page load transition"
        >
          <Play className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      )}
    </div>
  );
};

export default SkeletonControlToggle;

