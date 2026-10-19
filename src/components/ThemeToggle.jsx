"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ compact = false }) => {
  const { theme, setTheme } = useTheme();

  if (compact) {
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center light:bg-slate-100 light:border-slate-200 light:text-indigo-600 light:hover:bg-slate-200 light:hover:border-indigo-400/40 dark:bg-white/5 dark:border-white/10 dark:text-amber-400 dark:hover:bg-white/10 dark:hover:border-amber-400/40"
        aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      >
        {/* Icon chosen by CSS so the server-rendered HTML already shows the right one */}
        <Sun className="w-4 h-4 transition-transform hover:rotate-45 duration-300 hidden dark:block" />
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12 duration-300 dark:hidden" />
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className={`relative inline-flex items-center p-1 rounded-full border transition-all duration-300 backdrop-blur-md ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-white/10 shadow-inner'
          : 'bg-slate-100 border-slate-200 shadow-sm'
      }`}
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        onClick={() => setTheme('light')}
        className={`relative z-10 flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          theme === 'light' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {theme === 'light' && (
          <motion.div
            layoutId="theme-active-pill"
            className="absolute inset-0 bg-white rounded-full shadow-md border border-slate-200/80"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <Sun className="w-3.5 h-3.5 relative z-10" />
        <span className="relative z-10">Light</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={`relative z-10 flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          theme === 'dark' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {theme === 'dark' && (
          <motion.div
            layoutId="theme-active-pill"
            className="absolute inset-0 bg-blue-600/30 border border-blue-500/40 rounded-full shadow-sm"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <Moon className="w-3.5 h-3.5 relative z-10" />
        <span className="relative z-10">Dark</span>
      </button>
    </div>
  );
};

export default ThemeToggle;

