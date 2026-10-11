"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Native browser scrolling is used instead of a JS smooth-scroll library (Lenis):
// it responds instantly to wheel/trackpad input and to text-selection auto-scroll.
// Anchor offsets are handled by `scroll-padding-top` in globals.css.

export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const SmoothScroll = () => {
  const pathname = usePathname();

  // Start every new page at the top without a long glide from the previous position
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};

export default SmoothScroll;
