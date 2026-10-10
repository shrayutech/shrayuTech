"use client";
import React from 'react';
import SkeletonBase from './SkeletonBase';
import { useTheme } from '../../context/ThemeContext';

/**
 * SkeletonContactForm — Contact page layout skeleton.
 * 12-col grid: left (5 cols) direct communication card + map frame | right (7 cols) inquiry form.
 */
const SkeletonContactForm = ({ className = '' }) => {
  const { isDark } = useTheme();

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${className}`}>

      {/* LEFT: Direct Communication + Map (5 cols) */}
      <div className="lg:col-span-5 space-y-8">

        {/* Direct Communication card */}
        <div
          className={`rounded-3xl p-8 space-y-6 border ${
            isDark ? 'bg-[#0F1728]/70 border-white/[0.07]' : 'bg-white border-slate-200'
          }`}
        >
          {/* Section title: "Direct Communication" */}
          <SkeletonBase variant="title" width="66%" height="1.5rem" radius="6px" />

          {/* Contact info rows: Email, Phone, WhatsApp, Business Hours */}
          <div className="space-y-5">
            {[
              { iconColor: 'text-blue-500', labelW: 90, valueW: 168 },
              { iconColor: 'text-indigo-500', labelW: 86, valueW: 196 },
              { iconColor: 'text-emerald-500', labelW: 94, valueW: 150 },
              { iconColor: 'text-purple-500', labelW: 100, valueW: 210 },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                {/* Icon box */}
                <SkeletonBase variant="icon" width="2.75rem" height="2.75rem" radius="1rem" />
                <div className="space-y-1.5 pt-0.5">
                  {/* Label (e.g. "BUSINESS EMAIL") */}
                  <SkeletonBase variant="text" width={`${item.labelW}px`} height="0.625rem" radius="3px" />
                  {/* Value */}
                  <SkeletonBase variant="text" width={`${item.valueW}px`} height="0.875rem" radius="4px" />
                </div>
              </div>
            ))}
          </div>

          {/* Social icons row: GitHub + LinkedIn */}
          <div className={`pt-5 border-t flex space-x-3 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
            <SkeletonBase variant="icon" width="2.5rem" height="2.5rem" radius="0.75rem" />
          </div>
        </div>

        {/* Map embed area */}
        <div className="space-y-4 pt-2">
          {/* "Headquarters Location" label */}
          <div className="flex items-center space-x-2">
            <SkeletonBase variant="circle" width="16px" height="16px" />
            <SkeletonBase variant="text" width="160px" height="0.75rem" radius="4px" />
          </div>
          {/* Map frame */}
          <SkeletonBase variant="image" height="192px" radius="1rem" />
        </div>
      </div>

      {/* RIGHT: Project Inquiry Form card (7 cols) */}
      <div
        className={`lg:col-span-7 rounded-3xl p-8 sm:p-10 space-y-6 border ${
          isDark ? 'bg-[#0F1728]/70 border-white/[0.07]' : 'bg-white border-slate-200'
        }`}
      >
        {/* Card header: "Project Inquiry Form" + subtitle */}
        <div className="space-y-2">
          <SkeletonBase variant="title" width="58%" height="1.75rem" radius="6px" />
          <SkeletonBase variant="text" width="82%" height="0.875rem" radius="4px" />
        </div>

        {/* Form fields */}
        <div className="space-y-6 pt-2">

          {/* Row 1: Full Name + Email Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <SkeletonBase variant="text" width="75px" height="0.75rem" radius="3px" />
              <SkeletonBase variant="input" height="50px" radius="1rem" />
            </div>
            <div className="space-y-2">
              <SkeletonBase variant="text" width="100px" height="0.75rem" radius="3px" />
              <SkeletonBase variant="input" height="50px" radius="1rem" />
            </div>
          </div>

          {/* Company (Optional) */}
          <div className="space-y-2">
            <SkeletonBase variant="text" width="125px" height="0.75rem" radius="3px" />
            <SkeletonBase variant="input" height="50px" radius="1rem" />
          </div>

          {/* Project Brief / Scope (textarea) */}
          <div className="space-y-2">
            <SkeletonBase variant="text" width="145px" height="0.75rem" radius="3px" />
            <SkeletonBase variant="textarea" height="144px" radius="1rem" />
          </div>

          {/* Submit button — full width */}
          <SkeletonBase variant="button" width="100%" height="3.5rem" radius="1rem" />

          {/* reCAPTCHA notice */}
          <div className="flex justify-center">
            <SkeletonBase variant="text" width="230px" height="0.625rem" radius="3px" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default SkeletonContactForm;

