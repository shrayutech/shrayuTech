"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

/**
 * SkeletonNavbar — Mirrors the real Shrayu Technologies navbar exactly.
 * Fixed positioned. Logo + company name | nav links | theme toggle | CTA button.
 * Mobile: logo + hamburger icon.
 */
const SkeletonNavbar = () => {

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 ${
        'light:bg-white/85 light:backdrop-blur-xl light:border-b light:border-slate-200/80 dark:bg-[#030712]/80 dark:backdrop-blur-xl dark:border-b dark:border-white/8'
      }`}
      aria-label="Navigation loading"
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center">

          {/* LEFT: Logo + Brand Name */}
          <div className="flex items-center space-x-3">
            {/* Logo icon square */}
            <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
            <div className="flex flex-col space-y-1.5">
              {/* "Shrayu" wordmark */}
              <SkeletonBase variant="text" width="68px" height="1.0rem" radius="4px" />
              {/* "TECHNOLOGIES" subtext */}
              <SkeletonBase variant="text" width="52px" height="0.55rem" radius="3px" />
            </div>
          </div>

          {/* CENTER-RIGHT: Nav items + theme toggle + CTA — Desktop only */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Nav pill container */}
            <div
              className={`flex items-center space-x-1 px-2 py-1.5 rounded-full border ${
                'light:bg-slate-100 light:border-slate-200 dark:bg-white/[0.04] dark:border-white/10'
              }`}
            >
              {/* Home, About, Services, Portfolio, Contact */}
              {[44, 46, 62, 60, 56].map((w, i) => (
                <SkeletonBase
                  key={i}
                  variant="pill"
                  width={`${w}px`}
                  height="1.875rem"
                  radius="9999px"
                />
              ))}
            </div>

            {/* Theme toggle circle */}
            <SkeletonBase variant="circle" width="2.25rem" height="2.25rem" />

            {/* "Get In Touch →" CTA button */}
            <SkeletonBase variant="button" width="138px" height="2.625rem" radius="9999px" />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center space-x-3">
            <SkeletonBase variant="circle" width="2.25rem" height="2.25rem" />
            <SkeletonBase variant="icon" width="2.25rem" height="2.25rem" radius="0.6rem" />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default SkeletonNavbar;

