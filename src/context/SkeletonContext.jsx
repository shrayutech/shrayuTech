"use client";

import React, { createContext, useContext, useState } from 'react';

const SkeletonContext = createContext({
  isLoading: false,
  isDemoMode: false,
  triggerLoading: () => {},
  toggleDemoMode: () => {},
  setIsLoading: () => {},
});

export const SkeletonProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const triggerLoading = (duration = 1200) => {
    setIsLoading(true);
    setTimeout(() => {
      if (!isDemoMode) {
        setIsLoading(false);
      }
    }, duration);
  };

  const toggleDemoMode = () => {
    setIsDemoMode((prev) => {
      const nextState = !prev;
      setIsLoading(nextState);
      return nextState;
    });
  };

  const activeLoadingState = isDemoMode || isLoading;

  return (
    <SkeletonContext.Provider
      value={{
        isLoading: activeLoadingState,
        isDemoMode,
        triggerLoading,
        toggleDemoMode,
        setIsLoading,
      }}
    >
      {children}
    </SkeletonContext.Provider>
  );
};

export const useSkeleton = () => {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error('useSkeleton must be used within a SkeletonProvider');
  }
  return context;
};

