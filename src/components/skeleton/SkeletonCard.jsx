"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonCard = ({ width = '100%', height = '320px', radius = '24px', className = '', ...props }) => {
  return <SkeletonBase variant="card" width={width} height={height} radius={radius} className={className} {...props} />;
};

export default SkeletonCard;

