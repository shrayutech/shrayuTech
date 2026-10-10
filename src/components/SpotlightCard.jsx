"use client";

import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor,
  ...props
}) => {
  const cardRef = useRef(null);
  const { isDark } = useTheme();

  const handleMouseMove = (e) => {
    // Only track if device supports hover
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const defaultSpotlightColor = isDark
    ? 'rgba(59, 130, 246, 0.15)'
    : 'rgba(37, 99, 235, 0.08)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
            spotlightColor || defaultSpotlightColor
          }, transparent 70%)`
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;

