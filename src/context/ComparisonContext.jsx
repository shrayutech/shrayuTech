"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { COMPARISON_CONFIG } from '../config/comparison.config.js';

const ComparisonContext = createContext(null);

export function ComparisonProvider({ children }) {
  const [selected, setSelected] = useState({
    systems: [],
    services: [],
    locations: []
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARISON_CONFIG.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setSelected({
            systems: Array.isArray(parsed.systems) ? parsed.systems : [],
            services: Array.isArray(parsed.services) ? parsed.services : [],
            locations: Array.isArray(parsed.locations) ? parsed.locations : []
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored comparison items:', e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(COMPARISON_CONFIG.STORAGE_KEY, JSON.stringify(selected));
      } catch (e) {
        console.warn('Failed to persist comparison items:', e);
      }
    }
  }, [selected, isHydrated]);

  const addItem = useCallback((type, item) => {
    if (!item || !type) return;

    setSelected(prev => {
      const currentList = prev[type] || [];
      const itemId = item.id || item.slug;

      // Check if already in list
      if (currentList.some(i => (i.id || i.slug) === itemId)) {
        toast.info(`Already added to ${type} comparison.`);
        return prev;
      }

      // Check maximum limit
      if (currentList.length >= COMPARISON_CONFIG.MAX_ITEMS) {
        toast.warn(`Comparison limit reached. Maximum ${COMPARISON_CONFIG.MAX_ITEMS} items allowed.`);
        return prev;
      }

      const updated = [...currentList, item];
      toast.success(`Added "${item.name || item.title}" to compare (${updated.length}/${COMPARISON_CONFIG.MAX_ITEMS})`);
      return {
        ...prev,
        [type]: updated
      };
    });
  }, []);

  const removeItem = useCallback((type, itemId) => {
    if (!type || !itemId) return;

    setSelected(prev => {
      const currentList = prev[type] || [];
      const updated = currentList.filter(i => (i.id || i.slug) !== itemId);
      return {
        ...prev,
        [type]: updated
      };
    });
  }, []);

  const clearItems = useCallback((type) => {
    setSelected(prev => ({
      ...prev,
      [type]: []
    }));
    toast.info(`Cleared ${type} comparison list.`);
  }, []);

  const isInComparison = useCallback((type, itemId) => {
    if (!selected[type]) return false;
    return selected[type].some(i => (i.id || i.slug) === itemId);
  }, [selected]);

  const getCount = useCallback((type) => {
    return (selected[type] || []).length;
  }, [selected]);

  return (
    <ComparisonContext.Provider
      value={{
        selected,
        addItem,
        removeItem,
        clearItems,
        isInComparison,
        getCount,
        isHydrated
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}

