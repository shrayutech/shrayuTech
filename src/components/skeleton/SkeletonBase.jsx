"use client";
import React from 'react';

/**
 * SkeletonBase — Core primitive for all Shrayu Technologies skeleton components.
 * Uses CSS variables from index.css for theme-aware dark/light mode shimmer.
 * Supports prefers-reduced-motion via .skeleton-shimmer class.
 */
const SkeletonBase = ({
  variant = 'text',
  width,
  height,
  radius,
  className = '',
  style = {},
  ariaLabel = 'Loading...',
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'heading':
        return { height: height || '2.25rem', borderRadius: radius || '8px', width: width || '75%' };
      case 'title':
        return { height: height || '1.75rem', borderRadius: radius || '8px', width: width || '60%' };
      case 'button':
        return { height: height || '2.75rem', borderRadius: radius || '9999px', width: width || '140px' };
      case 'pill':
      case 'badge':
        return { height: height || '1.625rem', borderRadius: radius || '9999px', width: width || '110px' };
      case 'circle':
      case 'avatar': {
        const size = height || width || '2.5rem';
        return { width: size, height: size, borderRadius: '9999px' };
      }
      case 'icon': {
        const iconSize = height || width || '2.5rem';
        return { width: iconSize, height: iconSize, borderRadius: radius || '12px' };
      }
      case 'image':
        return { height: height || '220px', borderRadius: radius || '20px', width: width || '100%' };
      case 'card':
        return { height: height || '320px', borderRadius: radius || '24px', width: width || '100%' };
      case 'input':
        return { height: height || '48px', borderRadius: radius || '12px', width: width || '100%' };
      case 'textarea':
        return { height: height || '140px', borderRadius: radius || '12px', width: width || '100%' };
      case 'text':
      default:
        return { height: height || '1rem', borderRadius: radius || '6px', width: width || '100%' };
    }
  };

  const defaultStyles = getVariantStyles();

  const combinedStyles = {
    ...defaultStyles,
    ...(width && { width }),
    ...(height && { height }),
    ...(radius && { borderRadius: radius }),
    display: 'block',
    ...style,
  };

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={ariaLabel}
      className={`skeleton-shimmer relative overflow-hidden shrink-0 transition-colors duration-200 select-none ${className}`}
      style={combinedStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export default SkeletonBase;

