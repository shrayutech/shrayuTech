"use client";

import Link from 'next/link';
import { ArrowRight, Code, Globe, Smartphone, Cpu, Cloud, Palette, Network, Layers, Settings } from 'lucide-react';

const serviceCatalog = [
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    category: 'Engineering',
    icon: Code,
    desc: 'Robust, secure business logic engines tailored to your organizational workflows.',
    href: '/services/custom-software'
  },
  {
    slug: 'web-development',
    title: 'Web Application Engineering',
    category: 'Web',
    icon: Globe,
    desc: 'Responsive, fast frontend web portals and SaaS platforms built with Next.js & React.',
    href: '/services/web-development'
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile App Development',
    category: 'Mobile',
    icon: Smartphone,
    desc: 'Native iOS & Android mobile applications featuring offline sync and fluid UI.',
    href: '/services/mobile-apps'
  },
  {
    slug: 'ai-solutions',
    title: 'AI & Machine Learning Solutions',
    category: 'AI',
    icon: Cpu,
    desc: 'LLM orchestration, neural models, predictive forecasting, and automated vision pipelines.',
    href: '/services/ai-solutions'
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure & DevOps',
    category: 'Cloud',
    icon: Cloud,
    desc: 'Auto-scaling AWS clusters, Docker containerization, and zero-downtime CI/CD delivery.',
    href: '/services/cloud-infrastructure'
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Product Design',
    category: 'Design',
    icon: Palette,
    desc: 'High-fidelity wireframes, interactive Figma prototypes, and scalable design token systems.',
    href: '/services/ui-ux-design'
  }
];

/**
 * Reusable Related Services Component
 * - Displays contextually relevant service offerings across portfolio, about, and contact pages
 * - Each card links to its /services/[slug] deep-dive; `currentService` takes a slug or title
 */
export default function RelatedServices({
  currentService,
  limit = 3,
  title = 'Complementary Engineering Services',
  subtitle = 'Pair your architectural requirements with our full-stack service capabilities'
}) {

  const services = serviceCatalog
    .filter((s) => !currentService || (s.slug !== currentService && s.title.toLowerCase() !== currentService.toLowerCase()))
    .slice(0, limit);

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {title && (
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${'light:text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-xs sm:text-sm font-medium ${'light:text-slate-600 dark:text-slate-300'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                'light:bg-white light:border-slate-200 light:hover:border-blue-400 light:hover:bg-blue-50/30 light:shadow-sm light:hover:shadow-md dark:bg-white/[0.03] dark:border-white/10 dark:hover:border-blue-500/40 dark:hover:bg-white/[0.06] dark:shadow-xl dark:shadow-black/20'
              }`}
            >
              <div className="space-y-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    'light:bg-blue-50 light:text-blue-600 light:border light:border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4
                  className={`text-base font-bold transition-colors ${
                    'light:text-slate-900 dark:text-white'
                  }`}
                >
                  {service.title}
                </h4>
                <p className={`text-xs font-medium leading-relaxed ${'light:text-slate-600 dark:text-slate-300'}`}>
                  {service.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <Link
                  href={service.href}
                  className="text-xs font-bold text-blue-500 hover:text-blue-400 inline-flex items-center space-x-1 group"
                >
                  <span>Explore {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

