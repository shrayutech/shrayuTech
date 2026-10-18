/**
 * researchExport.js
 * First-Party Research Dataset Export Utilities.
 * 
 * Generates sanitized, standards-compliant CSV data and BibTeX citation strings
 * for academic, developer, and business citation of original research reports.
 */

import { SITE_URL } from '../../config/site.config.js';

/**
 * Generates an auditable CSV representation of a research report's findings table.
 * 
 * @param {object} report - The research report object
 * @returns {string} Sanitized CSV string with metadata headers
 */
export function generateResearchCsv(report) {
  if (!report || !Array.isArray(report.metricsTable) || report.metricsTable.length === 0) {
    return '';
  }

  const lines = [];

  // Metadata comments in header
  lines.push(`# Title: ${report.title.replace(/"/g, '""')}`);
  lines.push(`# Slug: ${report.slug}`);
  lines.push(`# Publisher: Shrayu Technologies Research`);
  lines.push(`# Data Collection Period: ${report.dateRange.startDate} to ${report.dateRange.endDate}`);
  lines.push(`# Sample Size: ${report.sampleSize} ${report.sampleUnit || 'units'}`);
  lines.push(`# License: Creative Commons Attribution 4.0 International (CC BY 4.0)`);
  lines.push(`# Source URL: ${SITE_URL}/research/${report.slug}`);
  lines.push(`# Generated At: ${new Date().toISOString()}`);
  lines.push('');

  // Extract column keys from first item
  const firstItem = report.metricsTable[0];
  const headers = Object.keys(firstItem);
  lines.push(headers.map((h) => `"${h}"`).join(','));

  // Rows
  report.metricsTable.forEach((row) => {
    const values = headers.map((h) => {
      const val = row[h];
      if (val === null || val === undefined) return '""';
      if (typeof val === 'number') return val;
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    lines.push(values.join(','));
  });

  return lines.join('\n');
}

/**
 * Generates a BibTeX citation format for academic and research referencing.
 * 
 * @param {object} report - The research report object
 * @returns {string} BibTeX citation string
 */
export function generateBibtexCitation(report) {
  if (!report) return '';

  const citeKey = `shrayu_research_${report.slug.replace(/-/g, '_')}_${report.publishedYear || 2026}`;

  return `@techreport{${citeKey},
  title        = {${report.title}},
  author       = {{Shrayu Technologies Research Group}},
  institution  = {Shrayu Technologies},
  year         = {${report.publishedYear || 2026}},
  month        = {${report.publishedMonth || 'October'}},
  url          = {${SITE_URL}/research/${report.slug}},
  note         = {Sample Size: ${report.sampleSize} ${report.sampleUnit || 'units'}. First-party verified dataset.}
}`;
}

