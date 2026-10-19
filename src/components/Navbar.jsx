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

const PILL_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const PILL_DURATION = 380;
const PILL_MID_WIDTH = 100; // the middle piece is laid out at this width and scaled to fit

// Transforms for the three pieces of the pill (left cap, stretchable middle, right cap) so that
// together they cover `box`. Each cap is a half-circle plus a 2px flat strip the middle overlaps.
const pillTransforms = ({ left, top, width, height }) => {
  const r = height / 2;
  return [
    `translate(${left}px, ${top}px)`,
    `translate(${left + r}px, ${top}px) scaleX(${Math.max(width - 2 * r, 0) / PILL_MID_WIDTH})`,
    `translate(${left + width - r - 2}px, ${top}px)`,
  ];
};

// Moves the pill onto `box` (or fades it out when `box` is null). Only transform and opacity are
// animated, so the browser runs the slide off the main thread and it keeps moving while the next
// page mounts. A JS-driven animation of left/width freezes for that whole time in a production
// build, where routes are prefetched and render the instant a link is clicked.
const placePillEl = (wrapper, state, box, animate) => {
  const pieces = [...wrapper.children[0].children];
  const prev = state.current;

  if (!box) {
    state.current = null;
    if (!prev) return;
    wrapper.getAnimations().forEach((a) => a.cancel());
    const from = getComputedStyle(wrapper).opacity;
    wrapper.style.opacity = '0';
    if (animate) wrapper.animate({ opacity: [from, '0'] }, { duration: 200, easing: PILL_EASING });
    return;
  }

  if (prev && ['left', 'top', 'width', 'height'].every((k) => Math.abs(prev[k] - box[k]) < 0.5)) return;
  state.current = box;

  const capWidth = `${box.height / 2 + 2}px`;
  const height = `${box.height}px`;
  const to = pillTransforms(box);
  // Read where each piece is drawn right now (mid-slide included) before cancelling
  const from = pieces.map((el) => getComputedStyle(el).transform);
  const slide = animate && prev && prev.height === box.height;

  pieces.forEach((el, i) => {
    el.getAnimations().forEach((a) => a.cancel());
    el.style.height = height;
    if (i !== 1) el.style.width = capWidth;
    el.style.transform = to[i];
    if (slide) el.animate({ transform: [from[i], to[i]] }, { duration: PILL_DURATION, easing: PILL_EASING });
  });

  if (!prev) {
    // First show, or showing again after being hidden: appear in place
    wrapper.getAnimations().forEach((a) => a.cancel());
    wrapper.style.opacity = '1';
    if (animate) wrapper.animate({ opacity: [0, 1] }, { duration: 200, easing: PILL_EASING });
  }
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

  // Active pill sliding indicator refs
  const navContainerRef = useRef(null);
  const itemRefs = useRef({});
  const pillRef = useRef(null);
  const pillBox = useRef(null);
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

  const setItemRef = (key) => (el) => {
    if (el) {
      itemRefs.current[key] = el;
    } else {
      delete itemRefs.current[key];
    }
  };

  const activeKeyRef = useRef(activeKey);
  activeKeyRef.current = activeKey;

  // Positions the pill imperatively (no re-render) on the active item
  const updatePill = useCallback((animate) => {
    const container = navContainerRef.current;
    const wrapper = pillRef.current;
    // Skip while the desktop bar is display:none (below lg), where everything measures as 0
    if (!container || !wrapper || container.clientWidth === 0) return;

    const key = activeKeyRef.current;
    const targetEl = key ? itemRefs.current[key] : null;
    if (!targetEl) {
      placePillEl(wrapper, pillBox, null, animate && !shouldReduceMotion);
      return;
    }

    // Relative to the container's padding box, which is what the pill's left/top: 0 resolves to
    const c = container.getBoundingClientRect();
    const t = targetEl.getBoundingClientRect();
    placePillEl(wrapper, pillBox, {
      left: t.left - c.left - container.clientLeft,
      top: t.top - c.top - container.clientTop,
      width: t.width,
      height: t.height,
    }, animate && !shouldReduceMotion);
  }, [shouldReduceMotion]);

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

  // Recalculate active indicator on pathname / state change. Measured before paint, so on
  // back/forward the highlighted label and the pill never show a frame out of sync. Runs in the
  // click's own render, so the slide is handed to the browser before the next page starts mounting.
  useLayoutEffect(() => {
    updatePill(true);
  }, [activeKey, updatePill]);

  // Re-measure without animating on viewport changes, font load, or container resize
  useEffect(() => {
    const snap = () => updatePill(false);

    window.addEventListener('resize', snap, { passive: true });
    window.addEventListener('orientationchange', snap, { passive: true });

    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && snap());

    let observer;
    if (navContainerRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(snap);
      observer.observe(navContainerRef.current);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('resize', snap);
      window.removeEventListener('orientationchange', snap);
      if (observer) observer.disconnect();
    };
  }, [updatePill]);

  const openResources = () => {
    clearTimeout(closeTimer.current);
    setResourcesOpen(true);
  };

  const scheduleCloseResources = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setResourcesOpen(false), 220);
  };

  // Fluid spring animation preset (hover pill and dropdown; the active pill uses placePillEl)
  const springTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: 'spring', stiffness: 420, damping: 30, mass: 0.8 };

  return (
    <nav
      aria-label="Main navigation"
      // Only paint properties change with scroll state. Height, padding and blur stay fixed, so the
      // scroll reset on every route change doesn't resize the bar while the pill is sliding.
      className={`fixed top-0 left-0 right-0 z-50 py-3.5 sm:py-4 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'light:bg-white/80 light:border-slate-200/80 light:shadow-md light:shadow-slate-200/50 dark:bg-[#030712]/80 dark:border-white/10 dark:shadow-2xl dark:shadow-black/60'
          : 'light:bg-white/50 light:border-slate-200/40 dark:bg-[#030712]/40 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-[72px]">
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
              ref={navContainerRef}
              onMouseLeave={() => setHoveredKey(null)}
              className="relative flex items-center gap-1 p-1 rounded-full border backdrop-blur-md transition-all duration-300 light:bg-slate-100/80 light:border-slate-200/90 dark:bg-white/[0.04] dark:border-white/10"
            >
              {/* Active pill, sliding between items. Built from three opaque pieces (see placePillEl) so it can slide and stretch with
                  transforms alone without squashing its rounded ends. The tone layer's group
                  opacity gives the dark theme its translucency without doubling where pieces overlap. */}
              <span
                ref={pillRef}
                aria-hidden="true"
                style={{ opacity: 0 }}
                className="absolute top-0 left-0 z-1 pointer-events-none"
              >
                <span className="absolute top-0 left-0 light:drop-shadow-sm dark:opacity-35">
                  {['rounded-l-full border border-r-0', 'border-y', 'rounded-r-full border border-l-0'].map((shape, i) => (
                    <span
                      key={shape}
                      style={{ width: i === 1 ? PILL_MID_WIDTH : undefined, transformOrigin: '0 0', willChange: 'transform' }}
                      className={`absolute top-0 left-0 ${shape} light:bg-white light:border-slate-200 dark:bg-blue-600 dark:border-blue-400`}
                    />
                  ))}
                </span>
              </span>

              {primaryLinks.map((link) => {
                const isActive = activeKey === link.path;
                const isHovered = hoveredKey === link.path;
                return (
                  <li
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setHoveredKey(link.path)}
                  >
                    {/* Smooth Sliding Hover Pill (drawn under the active pill) */}
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
                      ref={setItemRef(link.path)}
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
                  ref={setItemRef('resources')}
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
