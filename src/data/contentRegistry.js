/**
 * Centralized Content Freshness & Lifecycle Registry
 * - Tracks page-level content versions, audit logs, and review cadences
 * - Distinguishes between evergreen content and time-sensitive materials
 * - Enables automated stale-content reporting and freshness badge rendering
 */

export const contentRegistry = {
  home: {
    id: 'page_home',
    title: 'Homepage & Core Positioning',
    route: '/',
    contentType: 'Landing & Service Showcase',
    contentVersion: '2.2.0',
    createdAt: '2025-11-15',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2026-12-10',
    cadenceDays: 60,
    status: 'Fresh',
    reviewer: 'Ayush Khobragade (Founding Tech Lead)',
    summary: 'Refreshed service deep-links, tech stack authority documentation links, and 25 verified case study categorization.'
  },
  services: {
    id: 'page_services',
    title: 'Technical Services Catalog',
    route: '/services',
    contentType: 'Service Offerings & Architecture',
    contentVersion: '2.1.0',
    createdAt: '2025-11-20',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2026-12-10',
    cadenceDays: 60,
    status: 'Fresh',
    reviewer: 'Engineering Leadership',
    summary: 'Updated 9 service specifications with direct category links to verified GitHub systems and architectural FAQs.'
  },
  portfolio: {
    id: 'page_portfolio',
    title: 'Engineering Showcase & Case Studies',
    route: '/portfolio',
    contentType: 'Product Catalog & Repositories',
    contentVersion: '2.3.0',
    createdAt: '2025-12-01',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2026-11-10',
    cadenceDays: 30,
    status: 'Fresh',
    reviewer: 'Core Architecture Team',
    summary: 'Verified active links for 25 production-grade systems across AI, Data Science, Machine Learning, Python, and Full-Stack.'
  },
  about: {
    id: 'page_about',
    title: 'Company Philosophy & Roadmap',
    route: '/about',
    contentType: 'Company & Vision',
    contentVersion: '2.0.0',
    createdAt: '2025-11-18',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-01-10',
    cadenceDays: 90,
    status: 'Fresh',
    reviewer: 'Founding Team',
    summary: 'Updated roadmap milestones to reflect delivered Q1-Q3 2026 open-source systems and upcoming 2027 enterprise initiatives.'
  },
  careers: {
    id: 'page_careers',
    title: 'Careers & Engineering Collective',
    route: '/careers',
    contentType: 'Recruitment & Culture',
    contentVersion: '2.1.0',
    createdAt: '2025-12-10',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2026-11-10',
    cadenceDays: 30,
    status: 'Fresh',
    reviewer: 'Talent & Engineering',
    summary: 'Synchronized job locations with Maharashtra HQ and remote-first collective policies; added culture cross-links.'
  },
  contact: {
    id: 'page_contact',
    title: 'Direct Inquiries & Headquarters',
    route: '/contact',
    contentType: 'Contact & Lead Capture',
    contentVersion: '2.0.0',
    createdAt: '2025-11-15',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2026-12-10',
    cadenceDays: 60,
    status: 'Fresh',
    reviewer: 'Operations Lead',
    summary: 'Verified telephone numbers, Google Maps headquarters embed, reCAPTCHA v3 keys, and added Pre-Inquiry Hub.'
  },
  privacy: {
    id: 'page_privacy',
    title: 'Data Privacy & Protection Policy',
    route: '/privacy',
    contentType: 'Legal & Compliance',
    contentVersion: '1.2.0',
    createdAt: '2025-11-15',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-04-10',
    cadenceDays: 180,
    status: 'Fresh',
    reviewer: 'Legal & Compliance Council',
    summary: 'Reviewed data collection practices, encryption standards, and contact channels for data queries.'
  },
  terms: {
    id: 'page_terms',
    title: 'Terms of Service & Statements of Work',
    route: '/terms',
    contentType: 'Legal & Compliance',
    contentVersion: '1.2.0',
    createdAt: '2025-11-15',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-04-10',
    cadenceDays: 180,
    status: 'Fresh',
    reviewer: 'Legal & Compliance Council',
    summary: 'Verified intellectual property ownership clauses, deliverable specifications, and client statement of work protocols.'
  },
  locations: {
    id: 'page_locations',
    title: 'Software Engineering Delivery Hubs & Locations',
    route: '/locations',
    contentType: 'Location & Delivery Directory',
    contentVersion: '1.0.0',
    createdAt: '2026-10-10',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-01-10',
    cadenceDays: 90,
    status: 'Fresh',
    reviewer: 'DevOps & Regional Delivery Leads',
    summary: 'Audited and verified the Chhatrapati Sambhajinagar headquarters hub, ensuring accurate geo-coordinates, postal codes, and service deliverables.'
  },
  compare: {
    id: 'page_compare',
    title: 'Technical Comparison Engine & Benchmarks',
    route: '/compare',
    contentType: 'Technical Comparison & Evaluation',
    contentVersion: '1.0.0',
    createdAt: '2026-10-10',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-01-10',
    cadenceDays: 90,
    status: 'Fresh',
    reviewer: 'Principal Software Architect',
    summary: 'Configured comparison system for 25 verified systems, 6 services, and 6 delivery hubs, with differences highlighting and Schema.org ItemList microdata.'
  },
  services_detail: {
    id: 'page_services_detail',
    title: 'Programmatic Engineering Service Deep-Dives',
    route: '/services/[slug]',
    contentType: 'Service Specifications & Deliverables',
    contentVersion: '1.0.0',
    createdAt: '2026-10-10',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-01-10',
    cadenceDays: 90,
    status: 'Fresh',
    reviewer: 'Founding Technical Lead',
    summary: 'Generated 9 comprehensive service detail pages with technology stacks, deliverables, regional hubs, and technical FAQs.'
  },
  portfolio_case_study: {
    id: 'page_portfolio_case_study',
    title: 'Programmatic System Case Studies & Repositories',
    route: '/portfolio/[slug]',
    contentType: 'System Architecture & Benchmark Specs',
    contentVersion: '1.0.0',
    createdAt: '2026-10-10',
    lastUpdated: '2026-10-10',
    lastReviewed: '2026-10-10',
    nextReviewDue: '2027-01-10',
    cadenceDays: 90,
    status: 'Fresh',
    reviewer: 'Core Architecture Team',
    summary: 'Generated 25 production system case studies with GitHub repository links, performance highlights, and schema microdata.'
  }
};

/**
 * Returns content status for a specific page key
 */
export function getContentFreshness(pageKey) {
  return contentRegistry[pageKey] || null;
}


/**
 * Returns schema.org datePublished / dateModified for a page key (empty object if unknown)
 */
export function getPageDates(pageKey) {
  const info = contentRegistry[pageKey];
  if (!info) return {};
  return { datePublished: info.createdAt, dateModified: info.lastUpdated };
}
