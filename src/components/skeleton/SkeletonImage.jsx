"use client";
import React, { useState } from 'react';
import SkeletonBase from './SkeletonBase';

/**
 * SkeletonImage - Image loading wrapper that displays a skeleton placeholder until the image loads,
 * then smoothly fades the actual image in with 200-350ms opacity transition.
 */
const SkeletonImage = ({
  src,
  alt = '',
  className = '',
  imageClassName = '',
  width,
  height,
  radius = '16px',
  aspectRatio,
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden inline-block w-full ${className}`}
      style={{
        ...(aspectRatio && { aspectRatio }),
        ...(width && { width }),
        ...(height && { height }),
        borderRadius: radius,
        ...style,
      }}
    >
      {/* Skeleton Placeholder while image is loading */}
      {!isLoaded && !hasError && (
        <SkeletonBase
          variant="image"
          width="100%"
          height="100%"
          radius={radius}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageClassName}`}
        style={{ borderRadius: radius }}
        {...props}
      />

      {/* Error Fallback */}
      {hasError && (
        <div
          className="absolute inset-0 bg-slate-800/80 flex items-center justify-center text-slate-400 text-xs font-semibold p-4 text-center"
          style={{ borderRadius: radius }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;

