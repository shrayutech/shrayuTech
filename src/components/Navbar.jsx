"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Compare', path: '/compare' },
    { name: 'Research', path: '/research' },
    { name: 'Locations', path: '/locations' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? scrolled
            ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-[#030712]/60 backdrop-blur-lg border-b border-white/5 py-5'
          : scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-md py-3.5'
            : 'bg-white/70 backdrop-blur-lg border-b border-slate-200/50 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center space-x-3 group focus:outline-none">
            <div
              className={`relative w-10 h-10 flex items-center justify-center rounded-xl p-1 group-hover:scale-105 transition-all duration-300 shadow-md ${
                isDark
                  ? 'bg-white/5 border border-white/10 group-hover:border-blue-500/40 shadow-blue-500/10'
                  : 'bg-slate-100 border border-slate-200 group-hover:border-blue-500/40 shadow-slate-200/50'
              }`}
            >
              <img
                src="/logo.png"
                alt="Shrayu Technologies Logo"
                width="40"
                height="40"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-extrabold text-xl tracking-tight leading-none group-hover:text-blue-500 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Shrayu
              </span>
              <span className="text-[10px] text-blue-500 font-bold tracking-[0.2em] uppercase mt-1">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-3">
            <div
              className={`flex space-x-1 p-1.5 rounded-full border backdrop-blur-md ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 shadow-inner'
                  : 'bg-slate-100/80 border-slate-200 shadow-inner'
              }`}
            >
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? pathname === '/'
                    : pathname ? pathname.startsWith(link.path) : false;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? isDark
                          ? 'text-white font-bold'
                          : 'text-blue-600 font-bold'
                        : isDark
                          ? 'text-slate-300 hover:text-white hover:bg-white/10 hover:-translate-y-[1px]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 hover:-translate-y-[1px]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className={`absolute inset-0 rounded-full border shadow-sm ${
                          isDark
                            ? 'bg-blue-600/30 border-blue-500/50 shadow-inner shadow-blue-500/20'
                            : 'bg-white border-slate-200 shadow-sm'
                        }`}
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle Control */}
            <div className="ml-1">
              <ThemeToggle />
            </div>

            {/* Desktop CTA Button */}
            <Link
              href="/contact"
              className="ml-2 btn-primary group text-white font-bold text-sm px-6 py-2.5 rounded-full flex items-center space-x-2 shadow-md shadow-blue-500/20 border border-blue-400/30 active:scale-95 transition-all"
            >
              <span>Start Project</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Actions (Compact Theme Toggle + Hamburger) */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle compact />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl border transition-colors focus:outline-none ${
                isDark
                  ? 'text-slate-300 hover:text-white bg-white/5 border-white/10'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 border-slate-200'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden border-b backdrop-blur-2xl shadow-2xl overflow-hidden ${
              isDark
                ? 'bg-[#030712]/95 border-white/10'
                : 'bg-white/95 border-slate-200'
            }`}
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? pathname === '/'
                    : pathname ? pathname.startsWith(link.path) : false;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? isDark
                          ? 'text-white bg-blue-600/20 border border-blue-500/40'
                          : 'text-blue-600 bg-blue-50 border border-blue-200'
                        : isDark
                          ? 'text-slate-300 hover:text-white hover:bg-white/5'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 flex items-center justify-between px-2">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Appearance
                </span>
                <ThemeToggle />
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-primary text-white rounded-xl py-3.5 font-bold text-base flex items-center justify-center space-x-2 border border-blue-400/30"
                >
                  <span>Start Your Project</span>
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

