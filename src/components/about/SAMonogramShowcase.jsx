"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Lightbulb, Cpu, Target } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SpotlightCard from '../SpotlightCard';

/**
 * Precision Vector Monogram (S + A) SVG
 * Renders an original, mathematically precise S + A monogram
 * with metallic silver facets and electric cyan neon accents.
 */
export const SAMonogramSVG = ({ className = "w-full h-full", isDark = true }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shrayu Technologies SA Monogram"
    >
      <defs>
        {/* Deep navy atmospheric glow filter */}
        <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Outer orbital soft glow */}
        <filter id="softOrbital" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="14" result="blur2" />
          <feComposite in="SourceGraphic" in2="blur2" operator="over" />
        </filter>

        {/* Metallic chrome gradient */}
        <linearGradient id="metallicChrome" x1="120" y1="80" x2="380" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#E2E8F0" />
          <stop offset="90%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>

        {/* Metallic dark bevel */}
        <linearGradient id="metallicBevel" x1="100" y1="120" x2="360" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="45%" stopColor="#334155" />
          <stop offset="75%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Electric cyan neon gradient */}
        <linearGradient id="electricCyan" x1="80" y1="100" x2="420" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="40%" stopColor="#00F0FF" />
          <stop offset="75%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Deep navy backfill */}
        <linearGradient id="navyBackfill" x1="250" y1="100" x2="250" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#082F49" />
          <stop offset="50%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Atmospheric radial halo */}
      <circle cx="250" cy="250" r="190" fill="url(#electricCyan)" opacity={isDark ? "0.08" : "0.05"} filter="url(#softOrbital)" />

      {/* Orbital cyan halo ring */}
      <path
        d="M 120 280 C 90 200, 140 100, 260 80 C 370 60, 430 160, 410 240 C 400 280, 370 340, 310 380"
        stroke="url(#electricCyan)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity={isDark ? "0.85" : "0.6"}
        filter="url(#cyanGlow)"
      />

      {/* Orbital Satellite Node */}
      <circle cx="410" cy="205" r="5" fill="#00F0FF" filter="url(#cyanGlow)" />
      <circle cx="410" cy="205" r="2.5" fill="#FFFFFF" />

      {/* Background Deep Shadow of Monogram */}
      <g opacity={isDark ? "0.7" : "0.35"} transform="translate(6, 10)">
        <path
          d="M 155 185 C 150 145, 185 110, 280 110 L 285 145 C 230 145, 205 160, 205 185 C 205 210, 225 225, 275 245 C 335 270, 360 305, 360 345 C 360 395, 310 425, 225 425 C 145 425, 115 390, 110 360 L 155 350 C 160 375, 185 395, 225 395 C 265 395, 290 380, 290 350 C 290 320, 265 305, 215 285 C 165 260, 155 225, 155 185 Z"
          fill="#020617"
        />
        <path
          d="M 315 120 L 440 395 L 365 395 L 340 335 L 290 335 L 315 275 L 340 275 L 315 210 Z"
          fill="#020617"
        />
      </g>

      {/* A letter — Right dynamic wing & leg */}
      <g>
        {/* A apex and right chiseled leg under-shadow */}
        <path
          d="M 310 120 L 445 400 L 375 400 L 348 335 L 275 335 L 295 285 L 368 285 L 320 180 Z"
          fill="url(#navyBackfill)"
          stroke="url(#electricCyan)"
          strokeWidth="1.5"
        />

        {/* A right chiseled leg facet (Metallic Silver) */}
        <path
          d="M 310 120 L 445 400 L 375 400 L 310 240 Z"
          fill="url(#metallicChrome)"
        />

        {/* A inner facet with cyan glow */}
        <path
          d="M 310 120 L 310 240 L 265 335 L 295 335 L 330 255 Z"
          fill="url(#metallicBevel)"
        />

        {/* A apex sharp highlight */}
        <path
          d="M 310 120 L 335 185 L 310 215 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </g>

      {/* S letter — Main ribbon loop */}
      <g>
        {/* S neon under-glow stroke */}
        <path
          d="M 140 180 C 135 130, 185 95, 285 95 L 285 135 C 220 135, 195 155, 195 180 C 195 210, 225 230, 280 255 C 345 285, 370 320, 370 365 C 370 415, 320 445, 220 445 C 130 445, 100 405, 95 365 L 145 350 C 150 380, 175 405, 220 405 C 275 405, 305 385, 305 355 C 305 325, 280 305, 220 280 C 160 250, 140 215, 140 180 Z"
          stroke="url(#electricCyan)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#cyanGlow)"
        />

        {/* S body main surface (brushed metallic) */}
        <path
          d="M 140 180 C 135 130, 185 95, 285 95 L 285 135 C 220 135, 195 155, 195 180 C 195 210, 225 230, 280 255 C 345 285, 370 320, 370 365 C 370 415, 320 445, 220 445 C 130 445, 100 405, 95 365 L 145 350 C 150 380, 175 405, 220 405 C 275 405, 305 385, 305 355 C 305 325, 280 305, 220 280 C 160 250, 140 215, 140 180 Z"
          fill="url(#metallicChrome)"
        />

        {/* S upper bevel curve */}
        <path
          d="M 140 180 C 135 130, 185 95, 285 95 L 285 115 C 200 115, 160 135, 160 175 C 160 200, 185 220, 240 245 L 225 275 C 165 245, 140 215, 140 180 Z"
          fill="url(#metallicBevel)"
        />

        {/* S central cross-ribbon highlight bridging into A */}
        <path
          d="M 195 245 C 240 270, 290 295, 350 330 L 325 360 C 270 330, 225 305, 180 280 Z"
          fill="url(#electricCyan)"
          opacity={isDark ? "0.9" : "0.75"}
        />

        {/* S bottom bevel sweep */}
        <path
          d="M 95 365 C 100 405, 130 445, 220 445 C 280 445, 325 430, 350 400 L 330 380 C 305 400, 270 415, 220 415 C 160 415, 135 385, 130 355 Z"
          fill="url(#metallicBevel)"
        />

        {/* Upper horizontal top cap specular glint */}
        <path
          d="M 240 95 L 285 95 L 285 105 L 250 105 Z"
          fill="#FFFFFF"
        />
        <circle cx="285" cy="95" r="2" fill="#00F0FF" filter="url(#cyanGlow)" />
      </g>
    </svg>
  );
};

/**
 * SAMonogramShowcase
 * Prominently presents the new SA monogram logo alongside the official
 * brand story: "The Meaning Behind Shrayu", description, supporting statement,
 * and the brand tagline: Ideas | Technology | Impact.
 */
const SAMonogramShowcase = () => {
  const { isDark } = useTheme();

  const taglinePillars = [
    {
      title: 'Ideas',
      desc: 'Purposeful creative vision & engineering strategy.',
      icon: <Lightbulb className="w-4 h-4 text-cyan-400" />,
      accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      title: 'Technology',
      desc: 'High-availability microservices & modern web engines.',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      accent: 'border-blue-500/40 text-blue-400 bg-blue-500/10'
    },
    {
      title: 'Impact',
      desc: 'Scalable solutions that generate measurable outcomes.',
      icon: <Target className="w-4 h-4 text-indigo-400" />,
      accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border transition-all duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(11, 16, 33, 0.95) 0%, rgba(15, 23, 42, 0.90) 50%, rgba(8, 47, 73, 0.40) 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #E0F2FE 100%)',
        borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(14, 165, 233, 0.25)',
        boxShadow: isDark
          ? '0 25px 60px -15px rgba(2, 6, 23, 0.8), 0 0 50px -10px rgba(6, 182, 212, 0.15)'
          : '0 20px 40px -15px rgba(14, 165, 233, 0.12), 0 0 30px -5px rgba(56, 189, 248, 0.10)'
      }}
    >
      {/* Ambient background volumetric glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(30, 58, 138, 0.1) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(186, 230, 253, 0.2) 70%, transparent 100%)'
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Premium SA Monogram Logo Presentation */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <SpotlightCard
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden transition-all duration-300 group ${
              isDark
                ? 'bg-slate-950/80 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40'
                : 'bg-white/95 border border-cyan-200 shadow-xl shadow-cyan-100'
            }`}
          >
            {/* Ambient inner rim glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

            {/* Top Monogram Identity Badge */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 mb-5 text-[11px] font-bold tracking-wider uppercase">
              <span className="flex items-center space-x-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400/80" />
                <span>SA Monogram</span>
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Shrayu Identity
              </span>
            </div>

            {/* Logo Viewer Display Area */}
            <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden flex items-center justify-center p-3">
              {/* Backlit glow disc */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 80%)'
                }}
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
                <Image
                  src="/images/about/sa-monogram.jpg"
                  alt="Shrayu Technologies SA Monogram Logo - Modern Futuristic Technology Identity"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 280px, 320px"
                />
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Official Brand Story & Meaning Behind Shrayu */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Brand Identity &amp; Origin</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              The Meaning Behind{' '}
              <span className="gradient-text-animated">
                Shrayu
              </span>
            </h2>
          </div>

          {/* Primary Description */}
          <p className={`text-base sm:text-lg leading-relaxed font-medium ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            “Shrayu represents dedication, life, growth, and a shared vision for the future. At Shrayu Technologies, we bring together creativity, technology, and innovation to transform ideas into meaningful digital solutions.”
          </p>

          {/* Supporting Statement in Callout Card */}
          <div className={`p-5 sm:p-6 rounded-2xl border-l-4 border-cyan-400 transition-colors ${
            isDark
              ? 'bg-cyan-500/5 border-t border-r border-b border-white/10 shadow-lg shadow-cyan-950/20'
              : 'bg-cyan-50/80 border-t border-r border-b border-cyan-100 shadow-sm'
          }`}>
            <p className={`text-sm sm:text-base font-semibold leading-relaxed italic ${
              isDark ? 'text-cyan-100' : 'text-slate-800'
            }`}>
              “Our identity reflects our commitment to continuous growth, purposeful innovation, and building technology that creates real impact.”
            </p>
          </div>

          {/* Tagline Showcase: Ideas | Technology | Impact */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Tagline</span>
            </div>

            {/* Tagline Banner Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-indigo-500/15 border border-cyan-500/40 text-sm sm:text-base font-black tracking-wide">
              <span className="text-cyan-400">Ideas</span>
              <span className="text-slate-400 opacity-60">|</span>
              <span className="text-blue-400">Technology</span>
              <span className="text-slate-400 opacity-60">|</span>
              <span className="text-indigo-400">Impact</span>
            </div>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {taglinePillars.map((pillar, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                      : 'bg-white border-slate-200 hover:border-cyan-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400">
                      {pillar.icon}
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {pillar.title}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default SAMonogramShowcase;

