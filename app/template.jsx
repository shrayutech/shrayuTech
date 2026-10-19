"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';

// The first paint (including the server-rendered HTML) is never hidden, so content stays
// visible for crawlers and no-JS users. Only client-side navigations get the fade-in.
// The flag only flips inside an effect, so it never changes on the server.
let hasHydrated = false;

export default function Template({ children }) {
  const animate = hasHydrated;

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
