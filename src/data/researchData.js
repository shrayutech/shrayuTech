/**
 * researchData.js
 * Authoritative First-Party Research Registry and Dataset for Shrayu Technologies.
 * 
 * Published reports must be calculated from data held in this repository.
 * 
 * CRITICAL RULE ENFORCEMENT:
 * - ZERO fabricated statistics or hypothetical user surveys.
 * - Minimum sample size validation enforced before publication.
 * - Strict separation between observed first-party data and editorial analysis.
 */

import { portfolioProjects } from './portfolioProjects.js';
import { statesData, locationCategories } from './locationsData.js';
import {
  calculateTechStackDistribution,
  calculateRegionalHubDensity
} from '../utils/research/researchCalculators.js';

// Execute pure calculators over actual dataset
const techStackStats = calculateTechStackDistribution(portfolioProjects);
const regionalStats = calculateRegionalHubDensity(statesData, locationCategories);
const pythonEcosystem = techStackStats.languageBreakdown.find((l) => l.ecosystem === 'Python');
const jsEcosystem = techStackStats.languageBreakdown.find((l) => l.ecosystem === 'JavaScript / TypeScript');
const scikitLearn = techStackStats.frameworkBreakdown.find((f) => f.name === 'Scikit-learn');

export const researchReports = [
  // =========================================================================
  // STUDY 1: Software Architecture & Tech Stack Distribution
  // =========================================================================
  {
    slug: 'tech-stack-distribution-portfolio-repositories',
    title: 'Tech Stack Distribution Across 25 Public Portfolio Repositories',
    shortTitle: 'Portfolio Tech Stack Distribution',
    description: 'How often each language, framework and library appears in the tech-stack tags of the 25 public repositories in the Shrayu Technologies portfolio.',
    researchType: 'software_systems',
    topic: 'Software Architecture & Engineering Practices',
    category: 'Engineering & Architecture',
    location: 'Public GitHub repositories',
    dateRange: {
      startDate: '2026-11-05',
      endDate: '2026-11-05'
    },
    publishedAt: '2026-10-05T00:00:00.000Z',
    updatedAt: '2026-11-05T00:00:00.000Z',
    publishedYear: 2026,
    publishedMonth: 'October',
    author: 'Shrayu Technologies',
    status: 'published',
    isIndexable: true,
    sampleSize: techStackStats.sampleSize,
    sampleUnit: 'portfolio repositories',
    researchQuestion: 'Which languages, frameworks and libraries appear most often across the public repositories in our portfolio?',
    methodology: 'Each portfolio entry lists its tech stack as tags. We count how many entries carry each tag and group language tags into ecosystems. The figures are recalculated from the portfolio data on every build.',
    dataSources: [
      {
        name: 'Shrayu Technologies portfolio tech-stack tags',
        type: 'calculated_metric',
        description: 'Tech-stack tags recorded on the 25 portfolio entries published on this site.'
      }
    ],
    summaryMetrics: [
      { label: 'Repositories Counted', value: `${techStackStats.sampleSize} Repositories`, note: 'Public portfolio entries' },
      { label: 'Unique Technologies', value: `${techStackStats.uniqueTechnologiesCount} Tags`, note: 'Distinct tech-stack tags' },
      { label: 'Most Common Ecosystem', value: `Python (${pythonEcosystem.percentage}%)`, note: `${pythonEcosystem.count} of ${techStackStats.sampleSize} repositories` },
      { label: 'JavaScript / TypeScript', value: `${jsEcosystem.percentage}%`, note: `${jsEcosystem.count} of ${techStackStats.sampleSize} repositories` }
    ],
    metricsTable: techStackStats.frameworkBreakdown.map((f, idx) => ({
      Rank: idx + 1,
      Technology: f.name,
      Occurrences: f.count,
      AdoptionRatePercent: f.adoptionRate,
      Category: f.name.includes('Python') || f.name.includes('Scikit') || f.name.includes('Tensor') ? 'AI/ML' : 'Full-Stack/Core'
    })),
    keyFindings: [
      `Python is the most common ecosystem: ${pythonEcosystem.count} of ${techStackStats.sampleSize} repositories (${pythonEcosystem.percentage}%) carry a Python tag.`,
      `Scikit-learn appears in ${scikitLearn.count} of ${techStackStats.sampleSize} repositories (${scikitLearn.adoptionRate}%).`,
      `JavaScript or TypeScript technologies appear in ${jsEcosystem.count} of ${techStackStats.sampleSize} repositories (${jsEcosystem.percentage}%).`
    ],
    editorialAnalysis: 'This portfolio leans heavily toward Python data-science and machine-learning projects. That reflects the projects we chose to publish, so it should not be read as a trend across the wider industry.',
    limitations: 'These are counts of declared tags, not an analysis of dependency files or source code. They say nothing about performance or production use, and they describe this portfolio only.',
    relatedServiceSlug: 'custom-software',
    relatedPortfolioIds: [1, 2, 3, 5],
    relatedResearchSlugs: []
  },

  // =========================================================================
  // STUDY 2: Regional Tech Corridors and Engineering Hubs
  // =========================================================================
  {
    slug: 'regional-tech-corridors-and-engineering-hubs',
    title: 'Regional Software Engineering Infrastructure & Hub Capacity: An Empirical Analysis of Maharashtra and Karnataka Delivery Hubs',
    shortTitle: 'Regional Software Engineering Hub Capacity',
    description: 'An analysis of regional office infrastructure, tech corridor connectivity, and service capability coverage across 6 delivery hubs in Western and Southern India.',
    researchType: 'regional_hubs',
    topic: 'Regional IT Infrastructure & Delivery Networks',
    category: 'Regional Infrastructure',
    location: 'Maharashtra & Karnataka, India',
    dateRange: {
      startDate: '2024-06-01',
      endDate: '2026-10-01'
    },
    publishedAt: '2026-10-06T00:00:00.000Z',
    updatedAt: '2026-10-10T14:00:00.000Z',
    publishedYear: 2026,
    publishedMonth: 'October',
    author: 'Shrayu Technologies Regional Operations Group',
    status: 'draft', // unpublished: describes the removed Pune/Mumbai/Nagpur/Nashik/Bengaluru hubs
    isIndexable: true,
    sampleSize: regionalStats.totalCities,
    sampleUnit: 'physical engineering delivery hubs',
    researchQuestion: 'How does software service specialization distribute across Tier-1 IT metropolitan centers versus Tier-2 R&D headquarters in Western and Southern India?',
    methodology: 'Geographic and service endpoint audit of all 6 Shrayu Technologies delivery hubs across Maharashtra and Karnataka. Metrics were derived from verified physical office locations, operational hours, local tech corridor mapping, and active service capabilities.',
    dataSources: [
      {
        name: 'Shrayu Technologies Facility & Hub Records',
        type: 'first_party_platform_data',
        description: 'Verified operational hubs with physical street addresses, coordinates, and local client engagement records.'
      },
      {
        name: 'Regional Delivery Capability Matrix',
        type: 'first_party_platform_data',
        description: 'Documented capability mapping cross-referenced with active client engineering contracts.'
      }
    ],
    summaryMetrics: [
      { label: 'Active Delivery Hubs', value: `${regionalStats.totalCities} Hubs`, note: 'Across 2 Indian States' },
      { label: 'Headquarters Location', value: 'Chhatrapati Sambhajinagar', note: 'Central R&D Engineering Lab' },
      { label: 'Service Capability Rate', value: `${regionalStats.availabilityRate}%`, note: `${regionalStats.totalCategoryEndpoints} of ${regionalStats.maxPotentialEndpoints} combinations` },
      { label: 'Local Tech Corridors', value: '6 Major Zones', note: 'Hinjawadi, BKC, ORR, CIDCO, MIHAN, Ambad' }
    ],
    metricsTable: regionalStats.hubSpecialization.map((h, idx) => ({
      Rank: idx + 1,
      City: h.city,
      State: h.state,
      PostalCode: h.postalCode,
      HubRole: h.hubRole,
      ActiveCategoriesCount: h.supportedCategoriesCount
    })),
    keyFindings: [
      'Maharashtra represents 83.3% of the company physical delivery network, anchored by the central R&D engineering laboratory in Chhatrapati Sambhajinagar and commercial pods in Pune and Mumbai.',
      'Bengaluru (Karnataka) serves as the primary southern deep-tech hub, specifically focused on autonomous systems and AI pipeline integrations.',
      'Service availability across all hubs reaches 80.6% (29 out of 36 potential combinations), reflecting specialized regional pod assignments rather than generic, unstaffed claims.',
      'Physical presence in Tier-2 centers (Chhatrapati Sambhajinagar, Nashik, Nagpur) provides competitive cost efficiency while maintaining full on-site client collaboration.'
    ],
    editorialAnalysis: 'The distributed hub architecture—combining a deep-work core R&D laboratory in Chhatrapati Sambhajinagar with high-touch client pods in Mumbai BKC and Pune Hinjawadi—enables sustainable talent retention and lower infrastructure overhead without sacrificing enterprise delivery speed.',
    limitations: 'Metrics are restricted to Shrayu Technologies operational hubs and do not evaluate third-party software firms operating within the same industrial corridors.',
    relatedServiceSlug: 'cloud-infrastructure',
    relatedPortfolioIds: [1, 25],
    relatedResearchSlugs: ['tech-stack-distribution-portfolio-repositories']
  },
];

/**
 * Returns all published, indexable research reports.
 */
export function getPublishedResearchReports() {
  return researchReports.filter((r) => r.status === 'published' && r.isIndexable);
}

/**
 * Retrieves a single research report by slug.
 */
export function getResearchReportBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.trim().toLowerCase();
  return researchReports.find((r) => r.slug === clean) || null;
}

/**
 * Returns all valid published research slugs for static generation.
 */
export function getAllPublishedResearchSlugs() {
  return getPublishedResearchReports().map((r) => r.slug);
}

