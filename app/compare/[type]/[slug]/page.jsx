import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import Breadcrumbs from '../../../../src/components/Breadcrumbs';
import ComparisonTable from '../../../../src/components/comparison/ComparisonTable';
import ComparisonSchema from '../../../../src/components/comparison/ComparisonSchema';
import SpotlightCard from '../../../../src/components/SpotlightCard';
import {
  curatedComparisons
} from '../../../../src/data/comparisonsData.js';
import {
  getCuratedComparisonBySlug,
  resolveComparisonEntities,
  formatComparisonRows,
  getComparisonSimilarities,
  getAllCuratedComparisons
} from '../../../../src/utils/comparisonUtils.js';
import { COMPARISON_CONFIG } from '../../../../src/config/comparison.config.js';

export function generateStaticParams() {
  return curatedComparisons.map((c) => ({
    type: c.type,
    slug: c.slug,
  }));
}

import { buildComparisonMetadata, buildNotFoundMetadata } from '../../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { type, slug } = await params;
  const curated = getCuratedComparisonBySlug(type, slug);

  if (!curated) {
    return buildNotFoundMetadata('Comparison');
  }

  return buildComparisonMetadata(curated);
}


export default async function CuratedComparisonPage({ params }) {
  const { type, slug } = await params;
  const curated = getCuratedComparisonBySlug(type, slug);
  const items = resolveComparisonEntities(type, slug);

  // Thin content protection: do not render if fewer than 2 real items exist
  if (!items || items.length < COMPARISON_CONFIG.MIN_ITEMS) {
    notFound();
  }

  const typeConfig = COMPARISON_CONFIG.SUPPORTED_TYPES[type] || COMPARISON_CONFIG.SUPPORTED_TYPES.systems;
  const title = curated ? curated.title : items.map((i) => i.name || i.title).join(' vs ');
  const overview = curated
    ? curated.overview
    : `Compare architectural specifications, technology stacks, and operational deliverables between ${items.map((i) => i.name || i.title).join(' and ')}.`;

  const rows = formatComparisonRows(type, items);
  const similarities = getComparisonSimilarities(type, items);

  // Related comparisons of the same type
  const relatedComparisons = getAllCuratedComparisons(type).filter((c) => c.slug !== slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' },
    { label: typeConfig.label, href: `/compare?type=${type}` },
    { label: title },
  ];

  return (
    <div className="relative min-h-screen pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <ComparisonSchema
        title={title}
        items={items}
        breadcrumbs={breadcrumbs}
      />

      {/* Multi-layered atmosphere background */}
      <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Compare Engine', href: '/compare' },
            { label: typeConfig.label, href: `/compare?type=${type}` },
            { label: title },
          ]}
        />

        {/* HERO SECTION */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              {curated?.categoryContext || typeConfig.label} • Technical Evaluation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            {overview}
          </p>
        </div>

        {/* SIMILARITIES / WHAT THEY HAVE IN COMMON */}
        {similarities.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl glass-card-3d border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                What These {typeConfig.label} Have in Common
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {similarities.map((sim, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sim}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPARISON TABLE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Attribute &amp; Feature Comparison
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Factual technical assessment — no artificial scoring or fake ratings
            </span>
          </div>

          <ComparisonTable
            type={type}
            items={items}
            rows={rows}
          />
        </div>

        {/* NEUTRAL TECHNICAL SUMMARY */}
        <div className="p-8 rounded-3xl glass-card-3d border border-slate-200 dark:border-white/10 space-y-4 max-w-4xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Architecture Guidance &amp; Selection Criteria</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Choosing between these {typeConfig.singularLabel.toLowerCase()} options depends directly on your organizational latency constraints, infrastructure scale, and algorithmic objectives. For tailored architectural review and codebase audits, connect with our principal engineering team.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="btn-secondary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Open Custom Compare Engine</span>
            </Link>
          </div>
        </div>

        {/* RELATED CURATED COMPARISONS */}
        {relatedComparisons.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
            <div className="space-y-1">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                Related Comparisons
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Other {typeConfig.label} Comparisons
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedComparisons.map((rc) => (
                <SpotlightCard
                  key={rc.slug}
                  className="glass-card-3d rounded-3xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {rc.categoryContext}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {rc.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {rc.overview}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                    <Link
                      href={`/compare/${rc.type}/${rc.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors uppercase tracking-wider group"
                    >
                      <span>Compare</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

