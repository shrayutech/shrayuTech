import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Quote,
  Building2,
  FolderGit2,
  Layers,
  Sparkles
} from 'lucide-react';
import SchemaMarkup from '../../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildTechArticleSchema,
  buildDatasetSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../../src/utils/schema/schemaBuilders';
import {
  getResearchReportBySlug,
  getAllPublishedResearchSlugs,
  getPublishedResearchReports
} from '../../../src/data/researchData';
import { portfolioProjects } from '../../../src/data/portfolioProjects';
import ResearchExportActions from '../../../src/components/research/ResearchExportActions';

export async function generateStaticParams() {
  const slugs = getAllPublishedResearchSlugs();
  return slugs.map((slug) => ({ slug }));
}

import { buildResearchMetadata, buildNotFoundMetadata } from '../../../src/utils/seo/metadataBuilders';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const report = getResearchReportBySlug(slug);

  if (!report || report.status !== 'published') {
    return buildNotFoundMetadata('Research Report');
  }

  return buildResearchMetadata(report);
}


export default async function ResearchReportDetailPage({ params }) {
  const { slug } = await params;
  const report = getResearchReportBySlug(slug);

  if (!report || report.status !== 'published') {
    notFound();
  }

  const canonicalUrl = `${SCHEMA_BASE_URL}/research/${report.slug}`;

  // Structured Data Composition
  const webPage = buildWebPageSchema({
    title: `${report.title} | Shrayu Technologies Research`,
    description: report.description,
    url: canonicalUrl
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Original Research', href: '/research' },
    { label: report.shortTitle || report.title, href: `/research/${report.slug}` }
  ]);

  const techArticle = buildTechArticleSchema({
    title: report.title,
    description: report.description,
    url: canonicalUrl,
    datePublished: report.publishedAt,
    dateModified: report.updatedAt,
    author: report.author,
    keywords: [report.topic, report.category, 'Empirical Software Engineering'],
    articleSection: report.topic
  });

  const dataset = buildDatasetSchema({
    name: `${report.title} - Raw Metrics Dataset`,
    description: `Sanitized empirical metrics and observation logs for ${report.title}`,
    url: canonicalUrl,
    temporalCoverage: `${report.dateRange.startDate}/${report.dateRange.endDate}`,
    spatialCoverage: report.location
  });

  const schemaGraph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs,
    mainEntity: [techArticle, dataset]
  });

  // Related Portfolio Projects
  const relatedProjects = Array.isArray(report.relatedPortfolioIds)
    ? portfolioProjects.filter((p) => report.relatedPortfolioIds.includes(p.id))
    : [];

  // Related Research Reports
  const allPublished = getPublishedResearchReports();
  const relatedReports = allPublished.filter((r) => r.slug !== report.slug && (report.relatedResearchSlugs || []).includes(r.slug));

  // Extract table headers dynamically
  const tableHeaders = report.metricsTable && report.metricsTable.length > 0
    ? Object.keys(report.metricsTable[0])
    : [];

  return (
    <>
      <SchemaMarkup schema={schemaGraph} />

      <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Navigation & Breadcrumbs */}
          <div className="space-y-4">
            <Link
              href="/research"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Research Hub</span>
            </Link>

            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center space-x-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/research" className="hover:text-white transition-colors">Research</Link>
              <span>/</span>
              <span className="text-slate-200 font-medium truncate max-w-xs">{report.shortTitle || report.title}</span>
            </nav>
          </div>

          {/* Report Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                {report.topic}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                First-Party Data Verified
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                Sample: {report.sampleSize} {report.sampleUnit}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {report.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {report.description}
            </p>

            {/* Author, Date, and Export Actions Bar */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
                <div>
                  <span className="text-slate-500">Author:</span>{' '}
                  <span className="text-white font-medium">{report.author}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>
                    <span className="text-slate-500">Published:</span>{' '}
                    <span className="text-white font-medium">{report.publishedMonth} {report.publishedYear}</span>
                  </span>
                  <span>
                    <span className="text-slate-500">Scope:</span>{' '}
                    <span className="text-white font-medium">{report.location}</span>
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Data Collection Window: <strong className="text-white">{report.dateRange.startDate}</strong> to <strong className="text-white">{report.dateRange.endDate}</strong>
                </span>
                <ResearchExportActions report={report} />
              </div>
            </div>
          </header>

          {/* Summary Metrics Cards */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Key Empirical Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {report.summaryMetrics.map((m, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">{m.label}</div>
                  <div className="text-xl sm:text-2xl font-black text-white">{m.value}</div>
                  <div className="text-[11px] text-slate-500 leading-snug">{m.note}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Research Question & Methodology */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Research Question</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                "{report.researchQuestion}"
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Methodology &amp; Verification</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {report.methodology}
              </p>
            </div>
          </section>

          {/* Data Sources Attribution */}
          <section className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs text-slate-400">
              Data Source Classification &amp; Provenance
            </h2>
            <div className="space-y-3">
              {report.dataSources.map((ds, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="text-white font-semibold">{ds.name}</strong>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ds.type}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{ds.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Findings */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Main Findings</h2>
            <div className="space-y-3">
              {report.keyFindings.map((finding, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {finding}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Observations Table */}
          {report.metricsTable && report.metricsTable.length > 0 && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Detailed Observations Table
                </h2>
                <span className="text-xs text-slate-400">
                  {report.metricsTable.length} Records Analyzed
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-white/10 text-slate-300 font-semibold uppercase text-[11px] tracking-wider border-b border-white/10">
                    <tr>
                      {tableHeaders.map((head, idx) => (
                        <th key={idx} className="py-3.5 px-4">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {report.metricsTable.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                        {tableHeaders.map((col, cIdx) => (
                          <td key={cIdx} className="py-3 px-4 font-mono text-xs">
                            {row[col] !== undefined && row[col] !== null ? String(row[col]) : '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Clear Distinction: Editorial Interpretation vs Observed Data */}
          <section className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Engineering Interpretation vs. Observed Data</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Analytical Discussion &amp; Architectural Context
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {report.editorialAnalysis}
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400">
              <strong className="text-slate-200">Standard Disclosure:</strong> Observed metrics in the data table above represent direct physical measurements. The analytical commentary represents the architectural evaluation of the Shrayu Technologies engineering group.
            </div>
          </section>

          {/* Limitations Section */}
          <section className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Research Limitations</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {report.limitations}
            </p>
          </section>

          {/* Contextual Cross-Links & Integration */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Related Platform Systems &amp; Disciplines
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.relatedServiceSlug && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>Related Engineering Discipline</span>
                  </div>
                  <div className="text-base font-bold text-white capitalize">
                    {report.relatedServiceSlug.replace(/-/g, ' ')}
                  </div>
                  <Link
                    href={`/services/${report.relatedServiceSlug}`}
                    className="inline-block text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1"
                  >
                    View Service Deep-Dive &rarr;
                  </Link>
                </div>
              )}

              {relatedProjects.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    <FolderGit2 className="w-4 h-4" />
                    <span>Audited Systems in Study</span>
                  </div>
                  <div className="space-y-1">
                    {relatedProjects.slice(0, 2).map((p) => (
                      <Link
                        key={p.id}
                        href={`/portfolio/${p.repo.toLowerCase()}`}
                        className="block text-xs font-medium text-slate-300 hover:text-white truncate"
                      >
                        &bull; {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Related Research Reports */}
            {relatedReports.length > 0 && (
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Further Reading &amp; Companion Research
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedReports.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/research/${rel.slug}`}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors block group"
                    >
                      <div className="text-xs text-blue-400 font-semibold">{rel.topic}</div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mt-1 line-clamp-1">
                        {rel.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}

