"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { defaultServiceFAQs } from '../data/servicesData';

export { defaultServiceFAQs };


/**
 * Reusable Accessible FAQ Accordion Component
 * - Injects Google Search-compliant Schema.org FAQPage JSON-LD
 * - Provides keyboard-accessible expand/collapse interaction
 * - Styled consistently with dark/light themes
 */
export default function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Clear answers about our engineering methodology, intellectual property rights, and delivery standards',
  faqs = defaultServiceFAQs
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // Structured Data Schema for Search Engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <div className="space-y-8">
      {/* Search Engine Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Engineering FAQ</span>
        </div>
        <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${'light:text-slate-900 dark:text-white'}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-xs sm:text-sm font-medium ${'light:text-slate-600 dark:text-slate-300'}`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto space-y-3.5">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                'light:bg-white light:border-slate-200 light:hover:border-blue-300 light:shadow-sm dark:bg-white/[0.03] dark:border-white/10 dark:hover:border-blue-500/30'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen
                      ? 'text-blue-500'
                      : 'light:text-slate-900 dark:text-white'
                  }`}
                >
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 text-blue-500 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  className={`px-6 pb-5 pt-1 text-xs sm:text-sm font-medium leading-relaxed border-t ${
                    'light:text-slate-600 light:border-slate-100 light:bg-slate-50/50 dark:text-slate-300 dark:border-white/5 dark:bg-black/20'
                  }`}
                >
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

