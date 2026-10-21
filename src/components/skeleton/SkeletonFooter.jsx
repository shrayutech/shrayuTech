"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

/**
 * SkeletonFooter — Matches the real Shrayu Technologies footer.
 * 5-column grid: Brand col (span 2) | Company links | Services links | Get in Touch.
 * Bottom bar: copyright | privacy | terms | scroll-top.
 */
const SkeletonFooter = () => {

  return (
    <footer
      className={`relative pt-24 pb-12 border-t overflow-hidden ${
        'light:bg-slate-100 light:border-slate-200 dark:bg-[#02050D] dark:border-white/10'
      }`}
      aria-label="Footer loading"
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">

          {/* Column 1-2: Brand info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo + wordmark */}
            <div className="flex items-center space-x-3">
              <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
              <div className="flex flex-col space-y-1.5">
                <SkeletonBase variant="text" width="68px" height="1.0rem" radius="4px" />
                <SkeletonBase variant="text" width="52px" height="0.55rem" radius="3px" />
              </div>
            </div>
            {/* Description */}
            <div className="space-y-2 max-w-sm">
              <SkeletonBase variant="text" width="96%" height="0.85rem" radius="4px" />
              <SkeletonBase variant="text" width="90%" height="0.85rem" radius="4px" />
              <SkeletonBase variant="text" width="80%" height="0.85rem" radius="4px" />
              <SkeletonBase variant="text" width="60%" height="0.85rem" radius="4px" />
            </div>
            {/* Social icons */}
            <div className="flex space-x-3 pt-2">
              <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
              <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
              <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
            </div>
          </div>

          {/* Column 3: Company links */}
          <div className="space-y-6">
            <SkeletonBase variant="text" width="70px" height="0.75rem" radius="3px" />
            <div className="space-y-3.5">
              {[54, 46, 118, 72].map((w, i) => (
                <SkeletonBase key={i} variant="text" width={`${w}px`} height="0.875rem" radius="3px" />
              ))}
            </div>
          </div>

          {/* Column 4: Services links */}
          <div className="space-y-6">
            <SkeletonBase variant="text" width="60px" height="0.75rem" radius="3px" />
            <div className="space-y-3.5">
              {[100, 82, 112, 90].map((w, i) => (
                <SkeletonBase key={i} variant="text" width={`${w}px`} height="0.875rem" radius="3px" />
              ))}
            </div>
          </div>

          {/* Column 5: Get in touch */}
          <div className="space-y-6">
            <SkeletonBase variant="text" width="90px" height="0.75rem" radius="3px" />
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-start space-x-2.5">
                <SkeletonBase variant="circle" width="14px" height="14px" style={{ marginTop: '2px' }} />
                <div className="space-y-1.5">
                  <SkeletonBase variant="text" width="100px" height="0.875rem" radius="3px" />
                  <SkeletonBase variant="text" width="110px" height="0.875rem" radius="3px" />
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-2.5">
                <SkeletonBase variant="circle" width="14px" height="14px" />
                <SkeletonBase variant="text" width="148px" height="0.875rem" radius="3px" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright | privacy | terms | scroll-top */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <SkeletonBase variant="text" width="260px" height="0.75rem" radius="4px" />
          <div className="flex items-center space-x-6">
            <SkeletonBase variant="text" width="82px" height="0.75rem" radius="3px" />
            <SkeletonBase variant="text" width="98px" height="0.75rem" radius="3px" />
            <SkeletonBase variant="icon" width="2.25rem" height="2.25rem" radius="0.75rem" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SkeletonFooter;

