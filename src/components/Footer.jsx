"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import { scrollToTop } from './SmoothScroll';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/shrayutech', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/shrayu-techolologies/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/shrayutechonologies?vrfl=MWJyZWgzemZ1OGRoZg==', icon: Instagram },
  { label: 'X (Twitter)', href: 'https://x.com/ayushkhobragade', icon: Twitter }
];

const LINK_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Custom Software', href: '/services/custom-software' },
      { label: 'Web Applications', href: '/services/web-development' },
      { label: 'Mobile Apps', href: '/services/mobile-apps' },
      { label: 'AI & Machine Learning', href: '/services/ai-solutions' },
      { label: 'SaaS Engineering', href: '/services/saas-development' },
      { label: 'All Services', href: '/services' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact Us', href: '/contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Original Research', href: '/research' },
      { label: 'Compare Systems', href: '/compare' },
      { label: 'Delivery Locations', href: '/locations' }
    ]
  }
];

const PHONES = [
  { label: '+91 70200 41614', href: 'tel:+917020041614' },
  { label: '+91 93595 14760', href: 'tel:+919359514760' }
];

const Footer = () => {
  const pathname = usePathname();
  const showCta = !pathname?.startsWith('/contact');

  const headingClass = `font-bold text-xs tracking-widest uppercase mb-5 ${
    'light:text-slate-900 dark:text-white'
  }`;
  const linkClass = `inline-block transition-all duration-200 hover:translate-x-1 ${
    'light:text-slate-600 light:hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
  }`;
  const contactLinkClass = `transition-colors hover:underline ${
    'light:text-slate-700 light:hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'
  }`;
  const iconAccent = `h-4 w-4 shrink-0 mt-0.5 ${'light:text-blue-600 dark:text-blue-400'}`;
  const iconButtonClass = `w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 hover:-translate-y-1 active:scale-95 ${
    'light:bg-white light:border-slate-200 light:text-slate-600 light:hover:text-blue-600 light:hover:border-blue-300 light:hover:bg-blue-50 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:border-blue-500/40 dark:hover:bg-blue-600/20'
  }`;

  return (
    <footer
      className={`relative border-t overflow-hidden transition-colors duration-300 ${
        'light:bg-slate-50 light:text-slate-600 light:border-slate-200/80 dark:bg-[#030712] dark:text-slate-300 dark:border-white/10'
      }`}
    >
      {/* Soft corner glow — plain gradient, no blur filter, so it costs nothing to paint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: 'radial-gradient(600px circle at 100% 100%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(500px circle at 0% 0%, rgba(79,70,229,0.08), transparent 60%)'
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background: 'radial-gradient(600px circle at 100% 100%, rgba(59,130,246,0.06), transparent 60%), radial-gradient(500px circle at 0% 0%, rgba(99,102,241,0.05), transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* CTA strip — hidden on the contact page, where it would point back to itself */}
        {showCta && (
        <div
          className={`py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b ${
            'light:border-slate-200 dark:border-white/10'
          }`}
        >
          <div>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${'light:text-slate-900 dark:text-white'}`}>
              Have a project in mind?
            </h2>
            <p className={`mt-1.5 text-sm font-medium ${'light:text-slate-600 dark:text-slate-400'}`}>
              Tell us what you&apos;re building — we usually reply within one business day.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shrink-0"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        )}

        {/* Main grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 py-14 border-b ${
            'light:border-slate-200 dark:border-white/10'
          }`}
        >
          {/* Brand */}
          <div className="col-span-2 lg:col-span-3 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group w-max">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 bg-transparent group-hover:scale-105"
              >
                <img
                  src="/logo-40.webp"
                  srcSet="/logo-40.webp 1x, /logo-80.webp 2x, /logo-120.webp 3x"
                  alt="Shrayu Technologies Logo"
                  width="40"
                  height="40"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-extrabold text-xl tracking-tight leading-none transition-colors ${
                    'light:text-slate-900 light:group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'
                  }`}
                >
                  Shrayu
                </span>
                <span
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-1 ${
                    'light:text-blue-600 dark:text-blue-400'
                  }`}
                >
                  Technologies
                </span>
              </div>
            </Link>
            <p className={`max-w-sm leading-relaxed text-sm font-medium ${'light:text-slate-600 dark:text-slate-400'}`}>
              We turn product ideas into scalable software — custom web platforms, mobile apps and AI
              integrations, built with clean engineering and thoughtful design.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={iconButtonClass}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h3 className={headingClass}>{column.title}</h3>
              <ul className="space-y-3 text-sm font-medium">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h3 className={headingClass}>Get in Touch</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <Phone className={iconAccent} />
                <div className="flex flex-col gap-1.5">
                  {PHONES.map((phone) => (
                    <a key={phone.href} href={phone.href} className={`${contactLinkClass} whitespace-nowrap`}>
                      {phone.label}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className={iconAccent} />
                <a href="mailto:shrayutech@gmail.com" className={`${contactLinkClass} whitespace-nowrap`}>
                  shrayutech@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className={iconAccent} />
                <Link href="/locations/maharashtra/chhatrapati-sambhajinagar" className={contactLinkClass}>
                  Chhatrapati Sambhajinagar, Maharashtra (HQ)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`py-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs font-medium ${
            'light:text-slate-500 dark:text-slate-400'
          }`}
        >
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Shrayu Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={scrollToTop} aria-label="Scroll back to top" className={iconButtonClass}>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
