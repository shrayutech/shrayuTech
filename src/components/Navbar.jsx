"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  GitCompare,
  FlaskConical,
  MapPin
} from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
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
  const pathname = usePathname();
  const resourcesRef = useRef(null);
  const closeTimer = useRef(null);

  // Active pill sliding indicator state & refs
  const navContainerRef = useRef(null);
  const itemRefs = useRef({});
  const [pendingKey, setPendingKey] = useState(null);
  const [pillBounds, setPillBounds] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const [isInitial, setIsInitial] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimer = useRef(null);
  const wasHidden = useRef(true);
  const shouldReduceMotion = useReducedMotion();

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

  const setItemRef = (key) => (el) => {
    if (el) {
      itemRefs.current[key] = el;
    } else {
      delete itemRefs.current[key];
    }
  };

  const updatePill = useCallback(() => {
    const container = navContainerRef.current;
    const currentKey = pendingKey ?? getActiveKey(pathname);
    const targetEl = currentKey ? itemRefs.current[currentKey] : null;

    if (!container || !targetEl) {
      wasHidden.current = true;
      setPillBounds((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const targetRect = targetEl.getBoundingClientRect();
    const left = targetRect.left - containerRect.left;
    const top = targetRect.top - containerRect.top;
    const width = targetRect.width;
    const height = targetRect.height;

    setPillBounds({
      left,
      top,
      width,
      height,
      opacity: 1,
    });
    wasHidden.current = false;
  }, [pathname, pendingKey, getActiveKey]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close any open menu after navigating and reset pending key
  useEffect(() => {
    setIsOpen(false);
    setResourcesOpen(false);
    setPendingKey(null);
  }, [pathname]);

  // Escape closes menus; clicking outside closes the Resources dropdown
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

  // Collapse the mobile menu if the viewport grows into desktop layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e) => e.matches && setIsOpen(false);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Recalculate active indicator on pathname / state change. Measured before paint, so on
  // back/forward the highlighted label and the pill never show a frame out of sync.
  useLayoutEffect(() => {
    updatePill();
    const frame = requestAnimationFrame(() => {
      setIsInitial(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [updatePill]);

  // Recalculate on viewport changes, font load, or container resize
  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      updatePill();
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        setIsResizing(false);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updatePill);
    }

    let observer;
    if (navContainerRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updatePill();
      });
      observer.observe(navContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimer.current);
      if (observer) observer.disconnect();
    };
  }, [updatePill]);

  const openResources = () => {
    clearTimeout(closeTimer.current);
    setResourcesOpen(true);
  };

  const scheduleCloseResources = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setResourcesOpen(false), 120);
  };

  // Not positioned, so a link's hover background paints under the pill (z-1) while its label
  // (z-10) stays on top: the clicked item's fading hover can't show through the arriving pill
  const linkClass = (active) =>
    `inline-flex items-center h-9 px-3 xl:px-4 rounded-full text-sm font-semibold leading-none whitespace-nowrap transition-colors duration-300 ${
      active
        ? 'light:text-blue-600 dark:text-white'
        : 'light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-200/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
    }`;

  const pillTransition = shouldReduceMotion || isInitial || isResizing
    ? { duration: 0 }
    : {
        type: 'tween',
        ease: [0.22, 1, 0.36, 1],
        duration: 0.38,
      };

  return (
    <nav
      aria-label="Main navigation"
      // Only paint properties change with scroll state. Height and blur stay fixed, so the scroll
      // reset on every route change doesn't resize the bar while the pill is sliding.
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'light:bg-white/85 light:border-slate-200/80 light:shadow-md dark:bg-[#030712]/85 dark:border-white/10 dark:shadow-2xl'
          : 'light:bg-white/70 light:border-slate-200/50 dark:bg-[#030712]/60 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group rounded-xl focus-visible:outline-2 focus-visible:outline-blue-500"
            aria-label="Shrayu Technologies home"
          >
            <span
              className={`w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 shadow-md group-hover:scale-105 ${
                'light:bg-slate-900 light:border light:border-slate-800 light:group-hover:border-blue-500/40 light:shadow-slate-300/50 dark:bg-white/5 dark:border dark:border-white/10 dark:group-hover:border-blue-500/40 dark:shadow-blue-500/10'
              }`}
            >
              <img
                src="/logo.png"
                alt="Shrayu Technologies Logo"
                width="40"
                height="40"
                className="w-full h-full object-cover drop-shadow-md"
              />
            </span>
            <span className="flex flex-col justify-center">
              <span
                className={`font-extrabold text-xl tracking-tight leading-none transition-colors group-hover:text-blue-500 ${
                  'light:text-slate-900 dark:text-white'
                }`}
              >
                Shrayu
              </span>
              <span className="text-[10px] leading-none text-blue-600 dark:text-blue-500 font-bold tracking-[0.2em] uppercase mt-1.5">
                Technologies
              </span>
            </span>
          </Link>

          {/* Desktop links (centered) */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0">
            <ul
              ref={navContainerRef}
              className={`relative flex items-center gap-0.5 p-1 rounded-full border backdrop-blur-md ${
                'light:bg-slate-100/80 light:border-slate-200 dark:bg-white/[0.04] dark:border-white/10'
              }`}
            >
              {/* Smooth sliding active indicator pill */}
              {pillBounds.width > 0 && (
                <motion.span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 z-1 rounded-full pointer-events-none border ${
                    'light:bg-white light:border-slate-200 light:shadow-sm dark:bg-blue-600/30 dark:border-blue-500/50 dark:shadow-inner dark:shadow-blue-500/20'
                  }`}
                  initial={false}
                  animate={{
                    x: pillBounds.left,
                    y: pillBounds.top,
                    width: pillBounds.width,
                    height: pillBounds.height,
                    opacity: pillBounds.opacity,
                  }}
                  transition={pillTransition}
                />
              )}

              {primaryLinks.map((link) => {
                const active = activeKey === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      ref={setItemRef(link.path)}
                      href={link.path}
                      onClick={() => setPendingKey(link.path)}
                      className={linkClass(active)}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Resources dropdown */}
              <li
                ref={resourcesRef}
                className="relative"
                onMouseEnter={openResources}
                onMouseLeave={scheduleCloseResources}
              >
                <button
                  ref={setItemRef('resources')}
                  type="button"
                  className={`${linkClass(resourcesActive)} gap-1`}
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                  onClick={() => setResourcesOpen((v) => !v)}
                >
                  <span className="relative z-10">Resources</span>
                  <ChevronDown
                    className={`relative z-10 h-4 w-4 transition-transform duration-200 ${
                      resourcesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Positioning lives on a static wrapper so framer's transform can't override the centering */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-80">
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="pt-3"
                      >
                        <ul
                          className={`p-2 rounded-2xl border shadow-2xl backdrop-blur-xl ${
                            'light:bg-white/95 light:border-slate-200 light:shadow-slate-300/40 dark:bg-[#0B1021]/95 dark:border-white/10 dark:shadow-black/40'
                          }`}
                        >
                          {resourceLinks.map(({ name, path, description, icon: Icon }) => {
                            const active = isPathActive(pathname, path);
                            return (
                              <li key={path}>
                                <Link
                                  href={path}
                                  onClick={() => {
                                    setPendingKey('resources');
                                    setResourcesOpen(false);
                                  }}
                                  aria-current={active ? 'page' : undefined}
                                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                                    active
                                      ? 'light:bg-blue-50 dark:bg-blue-600/20'
                                      : 'light:hover:bg-slate-100 dark:hover:bg-white/5'
                                  }`}
                                >
                                  <span
                                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                                      'light:bg-blue-50 light:border-blue-100 light:text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400'
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="flex flex-col gap-1">
                                    <span
                                      className={`text-sm font-bold leading-none ${
                                        'light:text-slate-900 dark:text-white'
                                      }`}
                                    >
                                      {name}
                                    </span>
                                    <span
                                      className={`text-xs leading-snug ${
                                        'light:text-slate-500 dark:text-slate-400'
                                      }`}
                                    >
                                      {description}
                                    </span>
                                  </span>
                                </Link>
                              </li>
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

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle compact />
            <Link
              href="/contact"
              className="btn-primary group inline-flex items-center gap-2 h-10 px-5 rounded-full text-white font-bold text-sm leading-none whitespace-nowrap shadow-md shadow-blue-500/20 border border-blue-400/30 active:scale-95"
            >
              <span>Get In Touch</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile / tablet actions */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className={`p-2.5 rounded-xl border transition-colors ${
                'light:text-slate-700 light:hover:text-slate-900 light:bg-slate-100 light:border-slate-200 dark:text-slate-300 dark:hover:text-white dark:bg-white/5 dark:border-white/10'
              }`}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden border-t overflow-hidden ${
              'light:bg-white/95 light:border-slate-200 dark:bg-[#030712]/95 dark:border-white/10'
            }`}
          >
            <div className="max-h-[calc(100dvh-72px)] overflow-y-auto px-4 sm:px-6 py-5">
              <p
                className={`px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] ${
                  'light:text-slate-400 dark:text-slate-500'
                }`}
              >
                Company
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {primaryLinks.map((link) => {
                  const active = isPathActive(pathname, link.path);
                  return (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center h-12 px-3 rounded-xl text-base font-semibold border transition-colors duration-300 ${
                          active
                            ? 'light:text-blue-600 light:bg-blue-50 light:border-blue-200 dark:text-white dark:bg-blue-600/20 dark:border-blue-500/40'
                            : 'light:text-slate-700 light:border-transparent light:hover:text-slate-900 light:hover:bg-slate-100 dark:text-slate-300 dark:border-transparent dark:hover:text-white dark:hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p
                className={`px-3 pt-5 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] ${
                  'light:text-slate-400 dark:text-slate-500'
                }`}
              >
                Resources
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {resourceLinks.map(({ name, path, icon: Icon }) => {
                  const active = isPathActive(pathname, path);
                  return (
                    <li key={path}>
                      <Link
                        href={path}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-3 h-12 px-3 rounded-xl text-base font-semibold border transition-colors duration-300 ${
                          active
                            ? 'light:text-blue-600 light:bg-blue-50 light:border-blue-200 dark:text-white dark:bg-blue-600/20 dark:border-blue-500/40'
                            : 'light:text-slate-700 light:border-transparent light:hover:text-slate-900 light:hover:bg-slate-100 dark:text-slate-300 dark:border-transparent dark:hover:text-white dark:hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${'light:text-blue-600 dark:text-blue-400'}`} />
                        <span>{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className={`mt-5 pt-5 border-t ${'light:border-slate-200 dark:border-white/10'}`}>
                <Link
                  href="/contact"
                  className="w-full btn-primary text-white rounded-xl h-12 font-bold text-base flex items-center justify-center gap-2 border border-blue-400/30"
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
