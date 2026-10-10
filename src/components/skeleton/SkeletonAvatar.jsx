"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';

const SkeletonAvatar = ({ size = '2.5rem', className = '', ...props }) => {
  return <SkeletonBase variant="avatar" width={size} height={size} radius="9999px" className={className} {...props} />;
};

export default SkeletonAvatar;

