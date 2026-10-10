"use client";

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`relative pt-20 sm:pt-24 pb-12 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#030712] text-slate-300 border-white/10'
          : 'bg-slate-50 text-slate-600 border-slate-200/80'
      }`}
    >
      {/* Subtle background radial glow */}
      <div
        className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none ${
          isDark ? 'bg-blue-600/10' : 'bg-blue-500/5'
        }`}
      />
      <div
        className={`absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/5'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-16 border-b ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group w-max">
              <div
                className={`relative w-10 h-10 flex items-center justify-center rounded-xl p-1 group-hover:scale-105 transition-all duration-300 shadow-md ${
                  isDark
                    ? 'bg-white/5 border border-white/10 group-hover:border-blue-500/40 shadow-blue-500/10'
                    : 'bg-white border border-slate-200 group-hover:border-blue-500/40 shadow-slate-200/60'
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
                  className={`font-extrabold text-xl tracking-tight leading-none transition-colors ${
                    isDark
                      ? 'text-white group-hover:text-blue-400'
                      : 'text-slate-900 group-hover:text-blue-600'
                  }`}
                >
                  Shrayu
                </span>
                <span
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  Technologies
                </span>
              </div>
            </Link>
            <p
              className={`max-w-sm leading-relaxed text-sm font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              We help startups, small businesses, and enterprise clients transform ambitious software product visions into scalable digital platforms through clean code engineering, AI integrations, and exceptional user experience design.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://github.com/shrayutech"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-600/20 hover:shadow-blue-500/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:shadow-blue-500/10'
                }`}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayushkhobragade"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-600/20 hover:shadow-blue-500/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:shadow-blue-500/10'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-600/20 hover:shadow-blue-500/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:shadow-blue-500/10'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3
              className={`font-bold text-xs tracking-widest uppercase mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Company
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <Link
                  href="/about"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Software Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Case Studies &amp; Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Careers &amp; Openings
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Delivery Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Compare Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Original Research
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3
              className={`font-bold text-xs tracking-widest uppercase mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Expertise
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <Link
                  href="/services"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Software Services Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio?category=AI"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  AI &amp; Neural Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio?category=Full-Stack%20Development"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Full-Stack Web Platforms
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio?category=Python"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Python Automation Utilities
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio?category=Data%20Science"
                  className={`inline-block transition-all duration-200 hover:translate-x-1 ${
                    isDark
                      ? 'text-slate-400 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Data Science Pipelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3
              className={`font-bold text-xs tracking-widest uppercase mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start space-x-3">
                <Phone
                  className={`h-4 w-4 shrink-0 mt-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <div className="flex flex-col gap-1.5 min-w-0">
                  <a
                    href="tel:+917020041614"
                    className={`transition-colors cursor-pointer hover:underline ${
                      isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    +91 70200 41614
                  </a>
                  <a
                    href="tel:+919359514760"
                    className={`transition-colors cursor-pointer hover:underline ${
                      isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    +91 93595 14760
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail
                  className={`h-4 w-4 shrink-0 mt-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <a
                  href="mailto:shrayutech@gmail.com"
                  className={`transition-colors cursor-pointer hover:underline break-all ${
                    isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  shrayutech@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin
                  className={`h-4 w-4 shrink-0 mt-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <Link
                  href="/locations/maharashtra/chhatrapati-sambhajinagar"
                  className={`text-sm font-medium transition-colors hover:underline ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  Chhatrapati Sambhajinagar, Maharashtra (HQ)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          className={`pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium gap-4 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <p>&copy; {new Date().getFullYear()} Shrayu Technologies. All rights reserved.</p>
          <div className="flex space-x-6 items-center">
            <Link
              href="/privacy"
              className={`transition-colors ${
                isDark ? 'hover:text-slate-200' : 'hover:text-slate-800'
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`transition-colors ${
                isDark ? 'hover:text-slate-200' : 'hover:text-slate-800'
              }`}
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-200 hover:-translate-y-1 active:scale-95 shadow-sm ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-blue-600/30 hover:border-blue-500/40 hover:shadow-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:shadow-blue-500/10'
              }`}
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

