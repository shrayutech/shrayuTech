"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  ChevronDown,
  GitCompare,
  FlaskConical,
  MapPin,
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

const resourceLinks = [
  { name: 'Compare', path: '/compare', description: 'Side-by-side tech & service comparisons', icon: GitCompare },
  { name: 'Research', path: '/research', description: 'Data-backed engineering insights', icon: FlaskConical },
  { name: 'Locations', path: '/locations', description: 'Cities and regions we serve', icon: MapPin },
];

const isPathActive = (pathname, path) => {
  if (!pathname) return false;
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pendingKey, setPendingKey] = useState(null);

  const pathname = usePathname();
  const resourcesRef = useRef(null);
  const closeTimer = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection with smooth threshold
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute active key based on pathname
  const getActiveKey = useCallback((currentPath) => {
    if (!currentPath) return null;
    if (resourceLinks.some((link) => isPathActive(currentPath, link.path))) {
      return 'resources';
    }
    for (const link of primaryLinks) {
      if (isPathActive(currentPath, link.path)) {
        return link.path;
      }
    }
    return null;
  }, []);

  const activeKey = pendingKey ?? getActiveKey(pathname);
  const resourcesActive = activeKey === 'resources';

  // Close menus and clear pending key on navigation
  useEffect(() => {
    setIsOpen(false);
    setResourcesOpen(false);
    setPendingKey(null);
    setHoveredKey(null);
  }, [pathname]);

  // Escape key and click-outside listeners
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setResourcesOpen(false);
      }
    };
    const handleClick = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e) => e.matches && setIsOpen(false);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const openResources = () => {
    clearTimeout(closeTimer.current);
    setResourcesOpen(true);
  };

  const scheduleCloseResources = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setResourcesOpen(false), 220);
  };

  // Fluid spring animation preset
  const springTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: 'spring', stiffness: 420, damping: 30, mass: 0.8 };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'py-2 sm:py-2.5 backdrop-blur-2xl backdrop-saturate-150 light:bg-white/80 light:border-b light:border-slate-200/80 light:shadow-md light:shadow-slate-200/50 dark:bg-[#030712]/80 dark:border-b dark:border-white/10 dark:shadow-2xl dark:shadow-black/60'
          : 'py-3.5 sm:py-4 backdrop-blur-xl backdrop-saturate-150 light:bg-white/50 light:border-b light:border-slate-200/40 dark:bg-[#030712]/40 dark:border-b dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-[72px]'
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group rounded-xl focus-visible:outline-2 focus-visible:outline-blue-500"
            aria-label="Shrayu Technologies home"
          >
            <span
              // No tile background: the logo PNG is transparent, so the navbar's own color shows through in both themes
              className="w-10 h-10 flex items-center justify-center bg-transparent transition-transform duration-300 group-hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="Shrayu Technologies Logo"
                width="40"
                height="40"
                className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </span>
            <span className="flex flex-col justify-center">
              <span
                className="font-extrabold text-xl tracking-tight leading-none transition-colors duration-300 group-hover:text-blue-500 light:text-slate-900 dark:text-white"
              >
                Shrayu
              </span>
              <span className="text-[10px] leading-none text-blue-600 dark:text-blue-500 font-bold tracking-[0.2em] uppercase mt-1.5 transition-opacity duration-300 group-hover:opacity-80">
                Technologies
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links with Smooth Magnetic Pill */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0">
            <ul
              onMouseLeave={() => setHoveredKey(null)}
              className="relative flex items-center gap-1 p-1 rounded-full border backdrop-blur-md transition-all duration-300 light:bg-slate-100/80 light:border-slate-200/90 dark:bg-white/[0.04] dark:border-white/10"
            >
              {primaryLinks.map((link) => {
                const isActive = activeKey === link.path;
                const isHovered = hoveredKey === link.path;
                return (
                  <li
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setHoveredKey(link.path)}
                  >
                    {/* Active Pill Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full light:bg-white light:shadow-sm light:border light:border-slate-200/90 dark:bg-gradient-to-r dark:from-blue-600/30 dark:to-indigo-600/30 dark:border dark:border-blue-500/40 dark:shadow-[0_0_12px_rgba(59,130,246,0.25)] pointer-events-none"
                        transition={springTransition}
                      />
                    )}

                    {/* Smooth Sliding Hover Pill */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.span
                          layoutId="navbar-hover-pill"
                          className="absolute inset-0 rounded-full light:bg-slate-200/70 dark:bg-white/10 pointer-events-none"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={springTransition}
                        />
                      )}
                    </AnimatePresence>

                    <Link
                      href={link.path}
                      onClick={() => setPendingKey(link.path)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative z-10 inline-flex items-center h-9 px-3.5 xl:px-4 rounded-full text-sm font-semibold leading-none whitespace-nowrap transition-colors duration-200 ${
                        isActive
                          ? 'light:text-blue-600 dark:text-white'
                          : 'light:text-slate-600 light:hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Resources Dropdown Item */}
              <li
                ref={resourcesRef}
                className="relative"
                onMouseEnter={() => {
                  setHoveredKey('resources');
                  openResources();
                }}
                onMouseLeave={scheduleCloseResources}
              >
                {/* Active Pill for Resources */}
                {resourcesActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full light:bg-white light:shadow-sm light:border light:border-slate-200/90 dark:bg-gradient-to-r dark:from-blue-600/30 dark:to-indigo-600/30 dark:border dark:border-blue-500/40 dark:shadow-[0_0_12px_rgba(59,130,246,0.25)] pointer-events-none"
                    transition={springTransition}
                  />
                )}

                {/* Hover Pill for Resources */}
                <AnimatePresence>
                  {hoveredKey === 'resources' && !resourcesActive && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 rounded-full light:bg-slate-200/70 dark:bg-white/10 pointer-events-none"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={springTransition}
                    />
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  className={`relative z-10 inline-flex items-center gap-1.5 h-9 px-3.5 xl:px-4 rounded-full text-sm font-semibold leading-none whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    resourcesActive
                      ? 'light:text-blue-600 dark:text-white'
                      : 'light:text-slate-600 light:hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                  onClick={() => setResourcesOpen((v) => !v)}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
                      resourcesOpen ? 'rotate-180 text-blue-500' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu with Safe Hover Bridge & Spring Physics */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full w-84 pt-2.5 z-50 pointer-events-auto"
                  onMouseEnter={openResources}
                  onMouseLeave={scheduleCloseResources}
                >
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={springTransition}
                      >
                        <ul
                          className="p-2 rounded-2xl border shadow-2xl backdrop-blur-2xl transition-colors light:bg-white/95 light:border-slate-200/90 light:shadow-slate-300/40 dark:bg-[#0B1021]/95 dark:border-white/10 dark:shadow-black/60"
                        >
                          {resourceLinks.map(({ name, path, description, icon: Icon }, index) => {
                            const active = isPathActive(pathname, path);
                            return (
                              <motion.li
                                key={path}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03, duration: 0.2 }}
                              >
                                <Link
                                  href={path}
                                  onClick={() => {
                                    setPendingKey('resources');
                                    setResourcesOpen(false);
                                  }}
                                  aria-current={active ? 'page' : undefined}
                                  className={`group flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 ${
                                    active
                                      ? 'light:bg-blue-50 light:text-blue-600 dark:bg-blue-600/20 dark:text-white'
                                      : 'light:hover:bg-slate-100/80 dark:hover:bg-white/[0.06]'
                                  }`}
                                >
                                  <span
                                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 group-hover:scale-105 ${
                                      active
                                        ? 'light:bg-blue-600 light:border-blue-600 light:text-white dark:bg-blue-500 dark:border-blue-400 dark:text-white shadow-sm shadow-blue-500/20'
                                        : 'light:bg-blue-50 light:border-blue-100 light:text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white'
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="flex-1 flex flex-col gap-1 min-w-0">
                                    <span className="flex items-center justify-between">
                                      <span
                                        className="text-sm font-bold leading-none transition-colors duration-200 group-hover:text-blue-500 light:text-slate-900 dark:text-white"
                                      >
                                        {name}
                                      </span>
                                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-blue-500" />
                                    </span>
                                    <span
                                      className="text-xs leading-snug line-clamp-2 light:text-slate-500 dark:text-slate-400"
                                    >
                                      {description}
                                    </span>
                                  </span>
                                </Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            </ul>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle compact />
            <Link
              href="/contact"
              className="relative group inline-flex items-center gap-2 h-10 px-5 rounded-full font-bold text-sm leading-none whitespace-nowrap overflow-hidden transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.03] active:scale-[0.97] border border-blue-400/30 text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500"
            >
              <span className="relative z-10">Get In Touch</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </Link>
          </div>

          {/* Mobile Actions with Animated Morphing Hamburger Icon */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className={`relative w-10 h-10 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 ${
                isOpen
                  ? 'light:bg-blue-50 light:border-blue-200 light:text-blue-600 dark:bg-blue-600/20 dark:border-blue-500/40 dark:text-blue-400'
                  : 'light:bg-slate-100 light:border-slate-200 light:text-slate-700 light:hover:text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:text-white'
              }`}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                  isOpen ? 'rotate-45 translate-y-2 bg-current' : 'bg-current'
                }`}
              />
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-200 ${
                  isOpen ? 'opacity-0 scale-x-0' : 'bg-current'
                }`}
              />
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 transform origin-center ${
                  isOpen ? '-rotate-45 -translate-y-2 bg-current' : 'bg-current'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Smooth Animation & Staggered Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t overflow-hidden backdrop-blur-2xl transition-colors light:bg-white/95 light:border-slate-200/90 light:shadow-2xl light:shadow-slate-300/40 dark:bg-[#030712]/95 dark:border-white/10 dark:shadow-2xl dark:shadow-black/60"
          >
            <div className="max-h-[calc(100dvh-72px)] overflow-y-auto px-4 sm:px-6 py-5">
              <p
                className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] light:text-slate-400 dark:text-slate-500"
              >
                Company
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {primaryLinks.map((link, idx) => {
                  const active = isPathActive(pathname, link.path);
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                    >
                      <Link
                        href={link.path}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between h-12 px-3.5 rounded-xl text-base font-semibold border transition-all duration-200 active:scale-[0.98] ${
                          active
                            ? 'light:text-blue-600 light:bg-blue-50 light:border-blue-200 dark:text-white dark:bg-blue-600/20 dark:border-blue-500/40 font-bold'
                            : 'light:text-slate-700 light:border-transparent light:hover:text-slate-900 light:hover:bg-slate-100/80 dark:text-slate-300 dark:border-transparent dark:hover:text-white dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{link.name}</span>
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500/50" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <p
                className="px-3 pt-5 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] light:text-slate-400 dark:text-slate-500"
              >
                Resources
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {resourceLinks.map(({ name, path, icon: Icon }, idx) => {
                  const active = isPathActive(pathname, path);
                  return (
                    <motion.li
                      key={path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (primaryLinks.length + idx) * 0.03, duration: 0.2 }}
                    >
                      <Link
                        href={path}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-3 h-12 px-3.5 rounded-xl text-base font-semibold border transition-all duration-200 active:scale-[0.98] ${
                          active
                            ? 'light:text-blue-600 light:bg-blue-50 light:border-blue-200 dark:text-white dark:bg-blue-600/20 dark:border-blue-500/40 font-bold'
                            : 'light:text-slate-700 light:border-transparent light:hover:text-slate-900 light:hover:bg-slate-100/80 dark:text-slate-300 dark:border-transparent dark:hover:text-white dark:hover:bg-white/5'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <span className="flex-1">{name}</span>
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500/50" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-5 pt-5 border-t light:border-slate-200 dark:border-white/10">
                <Link
                  href="/contact"
                  className="w-full h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
