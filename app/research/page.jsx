import Link from 'next/link';
import { ArrowRight, BookOpen, Database, ShieldCheck, CheckCircle2, AlertTriangle, FileSpreadsheet, Layers, Cpu, MapPin } from 'lucide-react';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';
import { getPublishedResearchReports, researchReports } from '../../src/data/researchData';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Original Research & Engineering Benchmarks',
  description: 'First-party empirical research, machine learning benchmarks, and software architecture distributions derived directly from verified production codebases.',
  path: '/research',
  keywords: ['software engineering research', 'first-party data', 'tech stack distribution', 'AI performance benchmarks', 'reproducible software research']
});

export default function ResearchIndexPage() {
  const publishedReports = getPublishedResearchReports();
  const blockedReport = researchReports.find((r) => r.status === 'insufficient_data');
  const canonicalUrl = `${SCHEMA_BASE_URL}/research`;

  const webPage = buildWebPageSchema({
    title: 'Original Research & Engineering Benchmarks | Shrayu Technologies',
    description: 'First-party empirical research, machine learning benchmarks, and software architecture distributions derived directly from 25 production codebases.',
    url: canonicalUrl
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Original Research', href: '/research' }
  ]);

  const itemList = buildItemListSchema({
    name: 'Shrayu Technologies First-Party Research Studies',
    description: 'Peer-verifiable empirical software engineering reports and benchmark studies',
    items: publishedReports.map((r) => ({
      name: r.title,
      description: r.description,
      url: `/research/${r.slug}`
    }))
  });

  const schemaGraph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs,
    itemList
  });

  return (
    <>
      <SchemaMarkup schema={schemaGraph} />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-28 pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">Original Research</span>
          </nav>

          {/* Hero Section */}
          <header className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>First-Party Empirical Data</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Original Research &amp; Engineering Benchmarks
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed">
              We publish reproducible, first-party data and insights computed directly from our 25 production codebases and continuous integration test suites. Zero fabricated claims, zero sponsored bias.
            </p>
          </header>

          {/* Research Integrity Code Banner */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-white dark:from-slate-900 to-slate-50 dark:to-slate-900/50 border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Our First-Party Research Integrity Code
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zero Fabrication</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  We never generate fake surveys, artificial customer reviews, or synthetic pricing trends. Every metric is computed from real code and infrastructure.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transparent Methodology</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  Every published report discloses its sample size, input manifests, testbed hardware, time period, mathematical formulas, and operational limitations.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Privacy by Design</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  All platform analytics are aggregated and anonymized. No customer-level PII, private keys, or confidential client records are ever exposed.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sample Size Gates</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  Research studies with insufficient statistical samples are strictly gated as unindexed drafts to prevent premature or misleading claims.
                </p>
              </div>
            </div>
          </section>

          {/* Published Reports Grid */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Published Empirical Studies
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Peer-audited research papers available for citation, review, and raw dataset export.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                {publishedReports.length} Published Reports
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {publishedReports.map((report) => (
                <article
                  key={report.slug}
                  className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">
                        {report.topic}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                        Sample: {report.sampleSize} {report.sampleUnit}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                        {report.publishedMonth} {report.publishedYear}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      <Link href={`/research/${report.slug}`}>
                        {report.title}
                      </Link>
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {report.description}
                    </p>

                    {/* Summary Metrics Chips */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {report.summaryMetrics.slice(0, 4).map((m, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                          <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{m.label}</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Source: First-Party Platform Data
                    </div>
                    <Link
                      href={`/research/${report.slug}`}
                      className="inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold text-sm transition-transform group-hover:translate-x-1"
                    >
                      <span>Read Full Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Statistical Quality Safeguard Demonstration */}
          {blockedReport && (
            <section className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 shadow-xl space-y-4">
              <div className="flex items-start space-x-3 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sample Size Safeguard in Action: Non-Published Study
                  </h3>
                  <p className="text-xs text-amber-800 dark:text-amber-200/80 mt-1">
                    Study: <span className="font-semibold">{blockedReport.title}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In strict adherence to our Research Quality Code, this pilot inquiry currently has an observed sample of only <strong className="text-slate-900 dark:text-white">{blockedReport.sampleSize} {blockedReport.sampleUnit}</strong>, which is below our required significance threshold of 500 respondents. Therefore, this study is marked with <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-black/40 rounded text-amber-700 dark:text-amber-300 font-mono">status: "insufficient_data"</code>, blocked from search engine indexation, and withheld from general publication until sufficient empirical data is gathered.
              </p>
            </section>
          )}

          {/* Academic & Open Data Attribution */}
          <footer className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Open Data &amp; Academic Citation Policy
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
              All metrics published by Shrayu Technologies Research are licensed under the{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="license noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                Creative Commons Attribution 4.0 International (CC BY 4.0)
              </a>{' '}
              license. You are free to share and adapt our research provided that appropriate attribution is given to Shrayu Technologies.
            </p>
          </footer>

        </div>
      </main>
    </>
  );
}

