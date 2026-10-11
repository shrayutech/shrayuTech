"use client";

import React from 'react';
import { MotionConfig } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '../context/ThemeContext';
import { SkeletonProvider } from '../context/SkeletonContext';
import { ComparisonProvider } from '../context/ComparisonContext.jsx';
import ComparisonBar from './comparison/ComparisonBar.jsx';
import RedditReferralBanner from './analytics/RedditReferralBanner.jsx';
import MainLayout from '../layouts/MainLayout';
import SmoothScroll from './SmoothScroll';

export default function ClientProviders({ children }) {
  return (
    // reducedMotion="user" tones down every framer-motion animation for users who prefer less motion
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ThemeProvider>
        <SkeletonProvider>
          <ComparisonProvider>
            <RedditReferralBanner />
            <MainLayout>
              {children}
            </MainLayout>
            <ComparisonBar />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ComparisonProvider>
        </SkeletonProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
