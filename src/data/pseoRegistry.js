/**
 * pseoRegistry.js
 * Central Programmatic SEO (pSEO) Architecture Registry for Shrayu Technologies.
 * 
 * Defines the pSEO Opportunity Matrix, canonical URL patterns, quality validation thresholds,
 * crawl budget directives, and indexing policies across all programmatic routes.
 */

import { SITE_URL } from '../config/site.config.js';

export const PSEO_BASE_URL = SITE_URL;

export const pseoOpportunityMatrix = [
  {
    template: 'location_hub',
    templateName: 'National Locations Directory',
    urlPattern: '/locations',
    dataSource: 'statesData (Maharashtra, Karnataka)',
    potentialPages: 1,
    validPages: 1,
    indexable: true,
    searchIntent: 'National software engineering presence & regional office network in India',
    uniqueDataFields: ['Total active states', 'Total cities', 'Headquarters coordinates', 'Service coverage'],
    priority: 0.9,
    changeFrequency: 'weekly'
  },
  {
    template: 'location_state',
    templateName: 'State Technology Delivery Hub',
    urlPattern: '/locations/[state]',
    dataSource: 'statesData',
    potentialPages: 2,
    validPages: 2,
    indexable: true,
    searchIntent: 'State-level software engineering hubs (Maharashtra, Karnataka)',
    uniqueDataFields: ['State highlights', 'Capital', 'State regional IT overview', 'List of active cities'],
    priority: 0.8,
    changeFrequency: 'weekly'
  },
  {
    template: 'location_city',
    templateName: 'City Engineering Hub',
    urlPattern: '/locations/[state]/[city]',
    dataSource: 'statesData.cities',
    potentialPages: 6,
    validPages: 6,
    indexable: true,
    searchIntent: 'City-specific software development teams (Pune Hinjawadi, Mumbai BKC, Bengaluru ORR)',
    uniqueDataFields: ['Physical address', 'Phone', 'Geo coordinates', 'Key tech corridors', 'Local IT ecosystem', 'Verified projects'],
    priority: 0.8,
    changeFrequency: 'weekly'
  },
  {
    template: 'location_category',
    templateName: 'Localized Service Delivery Hub',
    urlPattern: '/locations/[state]/[city]/[category]',
    dataSource: 'Intersection of city.supportedCategories, locationCategories, and portfolioProjects',
    potentialPages: 36, // 6 cities * 6 categories
    validPages: 29,    // Only cities that actively support the category with real delivery capabilities
    indexable: true,
    searchIntent: 'Targeted service in specific city (e.g. "Custom Software in Pune", "AI Solutions in Bengaluru")',
    uniqueDataFields: ['Localized delivery specs', 'Local business address', 'Verified portfolio case studies', 'Tech corridor coverage', 'Localized FAQs'],
    priority: 0.7,
    changeFrequency: 'monthly'
  },
  {
    template: 'service_detail',
    templateName: 'Engineering Service Deep-Dive',
    urlPattern: '/services/[slug]',
    dataSource: 'servicesData (9 core services)',
    potentialPages: 9,
    validPages: 9,
    indexable: true,
    searchIntent: 'In-depth technical capability evaluation (Custom Software, Next.js Web Dev, AI, Cloud DevOps)',
    uniqueDataFields: ['Architecture overview', 'Tech stack list', 'Deliverables breakdown', 'Verified portfolio case studies', 'Active regional delivery hubs', 'Technical FAQs'],
    priority: 0.85,
    changeFrequency: 'weekly'
  },
  {
    template: 'portfolio_case_study',
    templateName: 'Production System Architecture Case Study',
    urlPattern: '/portfolio/[slug]',
    dataSource: 'portfolioProjects (25 verified repositories)',
    potentialPages: 25,
    validPages: 25,
    indexable: true,
    searchIntent: 'Software system specifications, open-source code repositories, and algorithmic benchmarks',
    uniqueDataFields: ['Direct GitHub repository', 'Tech stack tags', 'Benchmark metrics (<3% MAPE, 270k records)', 'Architecture overview', 'Visual indicator', 'Related service and comparisons'],
    priority: 0.8,
    changeFrequency: 'weekly'
  },
  {
    template: 'comparison_detail',
    templateName: 'Architectural Benchmark Comparison',
    urlPattern: '/compare/[type]/[slug]',
    dataSource: 'curatedComparisons (comparisonsData.js)',
    potentialPages: 9,
    validPages: 9,
    indexable: true,
    searchIntent: 'Head-to-head decision matrix (Custom Software vs SaaS, Bengaluru vs Pune, CommSphere vs SmartSpend)',
    uniqueDataFields: ['Multi-vector criteria matrix', 'Objective pros & cons', 'Decision framework', 'Direct entity links'],
    priority: 0.8,
    changeFrequency: 'weekly'
  }
];


export const pseoIndexingPolicy = {
  INDEX: {
    description: 'Pages generated from verified data with unique technical value and clear search intent',
    metaRobots: 'index, follow'
  },
  NOINDEX: {
    description: 'Filter queries, sorting, internal search states, or temporary facet selections',
    metaRobots: 'noindex, follow'
  },
  DO_NOT_GENERATE: {
    description: 'Combinations lacking real business data or delivery presence (must return 404 via notFound())',
    httpStatus: 404
  }
};

export const pseoQualityCriteria = {
  minDescriptionLength: 40,
  minFeaturesCount: 2,
  minTechStackItems: 2,
  requireVerifiedEntity: true,
  requireCanonicalUrl: true,
  requireBreadcrumbs: true,
  forbidKeywordSwapping: true,
  forbidFabricatedData: true
};

