"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Site-wide scroll reveal: every top-level <section> inside <main> (and the footer) fades and
// slides up, with a short delay, the first time it scrolls into view. Sections already on screen
// when the page loads are left alone so nothing flashes. Styles live in globals.css (.reveal).

const SELECTOR = 'main section, footer';

const ScrollReveal = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.dataset.reveal) return;
        // Only animate outermost sections; nested ones move along with their parent
        if (el.parentElement?.closest('[data-reveal]')) return;
        el.dataset.reveal = 'true';
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.classList.add('reveal');
        io.observe(el);
      });
    };

    scan();
    // Pages render sections after skeletons/data load, so pick those up as they appear
    let frame;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
};

export default ScrollReveal;
