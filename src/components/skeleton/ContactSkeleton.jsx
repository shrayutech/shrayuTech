"use client";
import React from 'react';
import SkeletonContactForm from './SkeletonContactForm';
import SkeletonBase from './SkeletonBase';

/**
 * ContactSkeleton — Contact page skeleton.
 * Sections:
 *   1. Header: badge → heading → description
 *   2. Contact layout (via SkeletonContactForm): left info panel + right form
 */
const ContactSkeleton = () => {
  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto space-y-6 flex flex-col items-center">
          <SkeletonBase variant="badge" width="165px" height="28px" radius="9999px" />
          <div className="w-full flex flex-col items-center space-y-3">
            <SkeletonBase variant="heading" width="80%" height="3.25rem" radius="8px" />
            <SkeletonBase variant="heading" width="58%" height="3.25rem" radius="8px" />
          </div>
          <div className="w-full flex flex-col items-center space-y-2">
            <SkeletonBase variant="text" width="90%" height="1.125rem" radius="6px" />
            <SkeletonBase variant="text" width="72%" height="1.125rem" radius="6px" />
          </div>
        </div>

        {/* ── Contact Layout ── */}
        <SkeletonContactForm />

      </div>
    </div>
  );
};

export default ContactSkeleton;

