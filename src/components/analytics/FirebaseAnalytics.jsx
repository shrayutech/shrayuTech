"use client";

import { useEffect } from 'react';
import { initAnalytics } from '../../utils/analytics';

// Starts Firebase Analytics once the browser is idle, so it never competes with the first render
export default function FirebaseAnalytics() {
  useEffect(() => {
    const start = () => { initAnalytics(); };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 2000);
    return () => clearTimeout(id);
  }, []);

  return null;
}
