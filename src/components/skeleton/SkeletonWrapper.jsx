"use client";
import React from 'react';

/**
 * SkeletonWrapper — Renders skeleton when loading, or real content cleanly.
 * Zero layout shift, no cascading effect setState.
 */
const SkeletonWrapper = ({
  loading = false,
  skeleton,
  children,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`relative w-full ${className}`} aria-busy="true">
        {skeleton}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {children}
    </div>
  );
};

export default SkeletonWrapper;

