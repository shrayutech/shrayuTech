"use client";

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '../context/ThemeContext';
import { SkeletonProvider } from '../context/SkeletonContext';
import { ComparisonProvider } from '../context/ComparisonContext.jsx';
import ComparisonBar from './comparison/ComparisonBar.jsx';
import RedditReferralBanner from './analytics/RedditReferralBanner.jsx';
import MainLayout from '../layouts/MainLayout';

export default function ClientProviders({ children }) {
  return (
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
  );
}
