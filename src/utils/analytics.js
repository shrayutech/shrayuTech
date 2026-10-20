"use client";

import { firebaseConfig, ANALYTICS_ENABLED } from '../config/firebase.config';

// Firebase is imported dynamically so its SDK stays out of the initial page bundle. Every caller
// shares one promise; it resolves to null when analytics is disabled or unsupported (SSR, blocked
// cookies/IndexedDB, ad blockers).
let analyticsPromise = null;

export function initAnalytics() {
  if (typeof window === 'undefined' || !ANALYTICS_ENABLED) return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      try {
        const [{ initializeApp, getApps }, { getAnalytics, isSupported }] = await Promise.all([
          import('firebase/app'),
          import('firebase/analytics'),
        ]);
        if (!(await isSupported())) return null;
        const app = getApps()[0] || initializeApp(firebaseConfig);
        // Page views are recorded automatically, including client-side navigations (GA4 enhanced
        // measurement tracks browser history changes)
        return getAnalytics(app);
      } catch {
        return null;
      }
    })();
  }
  return analyticsPromise;
}

// Log a custom event, e.g. trackEvent('contact_form_submit', { service: 'web-development' }).
// Safe to call anywhere; it is a no-op when analytics is unavailable.
export async function trackEvent(name, params) {
  const analytics = await initAnalytics();
  if (!analytics) return;
  const { logEvent } = await import('firebase/analytics');
  logEvent(analytics, name, params);
}
