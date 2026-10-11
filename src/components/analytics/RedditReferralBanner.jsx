"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import {
  checkRedditReferral,
  getRedditSessionData,
  dismissRedditBanner,
  isRedditBannerDismissed
} from '../../utils/redditReferralTracker.js';

export default function RedditReferralBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    // Only run on client after mount to prevent hydration mismatches
    const isReddit = checkRedditReferral();
    const isDismissed = isRedditBannerDismissed();

    if (isReddit && !isDismissed) {
      setIsVisible(true);
      setSessionInfo(getRedditSessionData());
    }
  }, []);

  const handleDismiss = () => {
    dismissRedditBanner();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Reddit Community Welcome Banner"
      className="relative z-30 transition-all duration-300 border-b shadow-sm"
    >
      <div
        className={`px-4 py-3 sm:py-2.5 transition-colors ${
          'light:bg-gradient-to-r light:from-orange-50 light:via-white light:to-orange-50/40 light:text-slate-800 light:border-orange-200/80 dark:bg-gradient-to-r dark:from-orange-950/60 dark:via-slate-900 dark:to-slate-900 dark:text-slate-200 dark:border-orange-500/20'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left badge & message */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500 text-white shadow-xs">
              <Sparkles className="w-3 h-3" />
              Reddit Welcome
            </span>
            <p className="font-medium">
              Visiting from Reddit? We share transparent technical specs, benchmarks, and production codebases.
            </p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/compare"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs"
            >
              Compare Tech Stacks
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/portfolio"
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold border transition-all ${
                'light:border-slate-300 light:text-slate-700 light:hover:bg-slate-100 light:hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              Verified Code
            </Link>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss Reddit welcome notification"
              className={`p-1 rounded-md transition-colors ${
                'light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

