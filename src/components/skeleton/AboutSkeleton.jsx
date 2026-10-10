"use client";
import React from 'react';
import SkeletonAbout from './SkeletonAbout';

/**
 * AboutSkeleton — Page-level wrapper for the About skeleton.
 * Preserves identical pt-36 pb-32 spacing as the real About page.
 */
const AboutSkeleton = () => {
  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <SkeletonAbout />
    </div>
  );
};

export default AboutSkeleton;

