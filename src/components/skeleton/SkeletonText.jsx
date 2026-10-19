"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonText = ({ width = '100%', height = '1rem', radius = '6px', className = '', ...props }) => {
  return <SkeletonBase variant="text" width={width} height={height} radius={radius} className={className} {...props} />;
};

export default SkeletonText;

