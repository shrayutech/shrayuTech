"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonButton = ({ width = '140px', height = '2.75rem', radius = '9999px', className = '', ...props }) => {
  return <SkeletonBase variant="button" width={width} height={height} radius={radius} className={className} {...props} />;
};

export default SkeletonButton;

