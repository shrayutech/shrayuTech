/**
 * agentDiscovery.js
 * Markdown summary of the site for AI agents and LLM crawlers.
 * Served at /llms.txt (https://llmstxt.org) and as the text/markdown variant of the homepage
 * (middleware.js). Built from the same data files as the pages, so it adds no claims of its own.
 */

import { SITE_METADATA_CONFIG } from './metadataBuilders.js';
import { servicesData } from '../../data/servicesData.js';
import { getPublishedResearchReports } from '../../data/researchData.js';

const link = (title, path, note) =>
  `- [${title}](${SITE_METADATA_CONFIG.siteUrl}${path})${note ? `: ${note}` : ''}`;

export function buildLlmsTxt() {
  const { brandName, defaultDescription } = SITE_METADATA_CONFIG;

  const sections = [
    `# ${brandName}`,
    `> ${defaultDescription}`,
    [
      '## Main pages',
      link('Home', '/'),
      link('Services', '/services', 'all software development services'),
      link('Portfolio', '/portfolio', 'public software projects with source repositories'),
      link('Compare', '/compare', 'technology and service comparisons'),
      link('Research', '/research', 'first-party studies with published methodology'),
      link('About', '/about'),
      link('Contact', '/contact', 'project enquiries'),
    ].join('\n'),
    [
      '## Services',
      // Names only: several taglines carry capability claims that SECURITY_AUDIT.md section 6 lists
      // as unverified, and llms.txt should not hand them to AI systems as a summary of the business
      ...servicesData.map((s) => link(s.name, `/services/${s.slug}`)),
    ].join('\n'),
    [
      '## Research',
      ...getPublishedResearchReports().map((r) => link(r.title, `/research/${r.slug}`, r.description)),
    ].join('\n'),
    [
      '## Optional',
      link('Locations', '/locations'),
      link('Privacy policy', '/privacy'),
      link('Terms of service', '/terms'),
      link('Sitemap', '/sitemap.xml', 'every indexable URL'),
    ].join('\n'),
  ];

  return `${sections.join('\n\n')}\n`;
}
