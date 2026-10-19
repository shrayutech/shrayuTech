"use client";

import { useEffect, useState } from 'react';

// Cycles through short statements under the hero heading. All statements stay in the DOM,
// stacked in one grid cell, so the block is always as tall as the longest one (no layout shift)
// and crawlers see every statement. Animation is CSS-only (opacity/transform), see globals.css.

const DISPLAY_MS = 4000; // time each full sentence stays readable
const TRANSITION_MS = 1000; // keep in sync with .hero-rotator-item in globals.css

const HeroRotatingText = ({ statements, className = '' }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % statements.length);
    }, DISPLAY_MS + TRANSITION_MS);
    return () => clearInterval(id);
  }, [statements.length]);

  const previous = (active - 1 + statements.length) % statements.length;

  return (
    <p className={`hero-rotator ${className}`}>
      {/* Screen readers get the statements once, not an announcement every few seconds */}
      <span className="sr-only">{statements.join(' ')}</span>
      <span className="hero-rotator-stack" aria-hidden="true">
        {statements.map((text, i) => (
          <span
            key={text}
            className="hero-rotator-item"
            data-state={i === active ? 'active' : i === previous ? 'leaving' : 'waiting'}
          >
            {text}
          </span>
        ))}
      </span>
    </p>
  );
};

export default HeroRotatingText;
