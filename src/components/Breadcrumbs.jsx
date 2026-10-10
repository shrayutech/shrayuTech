"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable SEO Breadcrumbs Component
 * - Generates accessible semantic HTML with schema microdata
 * - Injects structured JSON-LD BreadcrumbList for Google Search
 * - Supports dark/light mode with smooth hover transitions
 */
const Breadcrumbs = ({ items = [] }) => {
  const { isDark } = useTheme();

  const baseUrl = 'https://shrayutech.vercel.app';

  // Construct structured data for Google Rich Results
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `${baseUrl}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 inline-flex">
        <ol
          className={`flex flex-wrap items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-white/5 border-white/10 text-slate-400'
              : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          <li className="inline-flex items-center">
            <Link
              href="/"
              className={`inline-flex items-center space-x-1.5 transition-colors ${
                isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="inline-flex items-center space-x-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 opacity-60" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;

