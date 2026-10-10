"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 pointer-events-none shadow-sm shadow-blue-500/30"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;

