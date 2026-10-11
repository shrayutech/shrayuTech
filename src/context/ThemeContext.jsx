"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
});

export const ThemeProvider = ({ children }) => {
  // Always start as 'dark' so the first client render matches the server HTML (avoids a
  // hydration mismatch), then switch to the real theme before the browser paints.
  const [theme, setThemeState] = useState('dark');
  const [resolved, setResolved] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // The inline script in app/layout.jsx has already applied the saved/system theme to <html>
    const root = document.documentElement;
    let initial = root.classList.contains('light') ? 'light' : root.classList.contains('dark') ? 'dark' : null;
    if (!initial) {
      const savedTheme = localStorage.getItem('shrayu_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        initial = savedTheme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        // Respect system preference on first visit
        initial = 'light';
      } else {
        // Default fallback is dark
        initial = 'dark';
      }
    }
    setThemeState(initial);
    setResolved(true);
  }, []);

  useEffect(() => {
    if (!resolved) return;
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      body.classList.remove('dark');
      body.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      body.classList.remove('light');
      body.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }

    localStorage.setItem('shrayu_theme', theme);
  }, [theme, resolved]);

  // Listen for system theme changes if user hasn't explicitly set preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('shrayu_theme');
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const setTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

