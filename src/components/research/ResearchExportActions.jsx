"use client";

import { useState } from 'react';
import { Download, Copy, Check, FileSpreadsheet, Quote } from 'lucide-react';
import { generateResearchCsv, generateBibtexCitation } from '../../utils/research/researchExport';

export default function ResearchExportActions({ report }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!report) return null;

  const handleDownloadCsv = () => {
    try {
      setDownloading(true);
      const csvContent = generateResearchCsv(report);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `shrayutech-research-${report.slug}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download CSV:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleCopyCitation = () => {
    try {
      const bibtex = generateBibtexCitation(report);
      navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button
        onClick={handleDownloadCsv}
        disabled={downloading || !report.metricsTable || report.metricsTable.length === 0}
        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
        title="Download sanitized first-party metrics table as CSV"
      >
        <FileSpreadsheet className="w-4 h-4" />
        <span>{downloading ? 'Preparing CSV...' : 'Download Dataset (CSV)'}</span>
      </button>

      <button
        onClick={handleCopyCitation}
        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
        title="Copy academic BibTeX citation to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-400">Citation Copied!</span>
          </>
        ) : (
          <>
            <Quote className="w-4 h-4" />
            <span>Copy BibTeX Citation</span>
          </>
        )}
      </button>
    </div>
  );
}

