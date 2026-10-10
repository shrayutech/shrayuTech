"use client";

import Link from 'next/link';
import { ArrowRight, Code, Globe, Smartphone, Cpu, Cloud, Palette, Network, Layers, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const serviceCatalog = [
  {
    title: 'Custom Software Development',
    category: 'Engineering',
    icon: Code,
    desc: 'Robust, secure business logic engines tailored to your organizational workflows.',
    href: '/services'
  },
  {
    title: 'Web Application Engineering',
    category: 'Web',
    icon: Globe,
    desc: 'Responsive, fast frontend web portals and SaaS platforms built with Next.js & React.',
    href: '/services'
  },
  {
    title: 'Mobile App Development',
    category: 'Mobile',
    icon: Smartphone,
    desc: 'Native iOS & Android mobile applications featuring offline sync and fluid UI.',
    href: '/services'
  },
  {
    title: 'AI & Machine Learning Solutions',
    category: 'AI',
    icon: Cpu,
    desc: 'LLM orchestration, neural models, predictive forecasting, and automated vision pipelines.',
    href: '/services'
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    category: 'Cloud',
    icon: Cloud,
    desc: 'Auto-scaling AWS clusters, Docker containerization, and zero-downtime CI/CD delivery.',
    href: '/services'
  },
  {
    title: 'UI/UX Product Design',
    category: 'Design',
    icon: Palette,
    desc: 'High-fidelity wireframes, interactive Figma prototypes, and scalable design token systems.',
    href: '/services'
  }
];

/**
 * Reusable Related Services Component
 * - Displays contextually relevant service offerings across portfolio, about, and contact pages
 * - Guides visitors smoothly through the conversion funnel
 */
export default function RelatedServices({
  currentService,
  limit = 3,
  title = 'Complementary Engineering Services',
  subtitle = 'Pair your architectural requirements with our full-stack service capabilities'
}) {
  const { isDark } = useTheme();

  const services = serviceCatalog
    .filter((s) => !currentService || s.title.toLowerCase() !== currentService.toLowerCase())
    .slice(0, limit);

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {title && (
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] shadow-xl shadow-black/20'
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4
                  className={`text-base font-bold transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {service.title}
                </h4>
                <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {service.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <Link
                  href={service.href}
                  className="text-xs font-bold text-blue-500 hover:text-blue-400 inline-flex items-center space-x-1 group"
                >
                  <span>Explore Service Details</span>
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

