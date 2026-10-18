/**
 * internalLinks.js
 * Single source of truth for contextual internal links between services, case studies,
 * comparisons, research reports and location hubs. Every path is built from the data
 * files, so links always match the canonical routes generated in app/ and the sitemap.
 */

import { servicesData, getServiceBySlug } from '../data/servicesData.js';
import { curatedComparisons } from '../data/comparisonsData.js';
import { getPublishedResearchReports } from '../data/researchData.js';
import { normalizeProjectSlug } from './portfolioUtils.js';

export const getServicePath = (slug) => `/services/${slug}`;
export const getProjectPath = (project) => `/portfolio/${normalizeProjectSlug(project.repo)}`;
export const getComparisonPath = (comparison) => `/compare/${comparison.type}/${comparison.slug}`;
export const getResearchPath = (report) => `/research/${report.slug}`;

// Portfolio category -> the service that delivers that kind of system
const PORTFOLIO_CATEGORY_SERVICE = {
  AI: 'ai-solutions',
  'Machine Learning': 'ai-solutions',
  'Data Science': 'ai-solutions',
  Python: 'custom-software',
  'Full-Stack Development': 'web-development',
};

// Location hubs and service comparisons group two services under one 'cloud-devops' category
const LOCATION_CATEGORY_SERVICE = { 'cloud-devops': 'cloud-infrastructure' };
const SERVICE_LOCATION_CATEGORY = { 'cloud-infrastructure': 'cloud-devops', 'devops-ci-cd': 'cloud-devops' };

// Hand-picked neighbours: services a buyer of the key service most often needs next.
// Every service appears as a neighbour at least twice so none is left without inbound links.
const SERVICE_NEIGHBOURS = {
  'custom-software': ['api-development', 'ai-solutions', 'cloud-infrastructure'],
  'web-development': ['ui-ux-design', 'saas-development', 'api-development'],
  'mobile-apps': ['ui-ux-design', 'api-development', 'web-development'],
  'ai-solutions': ['custom-software', 'api-development', 'cloud-infrastructure'],
  'cloud-infrastructure': ['devops-ci-cd', 'custom-software', 'saas-development'],
  'ui-ux-design': ['web-development', 'mobile-apps', 'saas-development'],
  'api-development': ['custom-software', 'mobile-apps', 'ai-solutions'],
  'saas-development': ['web-development', 'devops-ci-cd', 'ui-ux-design'],
  'devops-ci-cd': ['cloud-infrastructure', 'custom-software', 'api-development'],
};

export function getLocationCategorySlugForService(serviceSlug) {
  return SERVICE_LOCATION_CATEGORY[serviceSlug] || serviceSlug;
}

export function getServiceForLocationCategory(categorySlug) {
  return getServiceBySlug(LOCATION_CATEGORY_SERVICE[categorySlug] || categorySlug);
}

export function getServiceForProject(project) {
  return getServiceBySlug(PORTFOLIO_CATEGORY_SERVICE[project?.category]) || null;
}

export function getRelatedServices(serviceSlug, limit = 3) {
  const neighbours = SERVICE_NEIGHBOURS[serviceSlug] || [];
  const picked = neighbours.map((slug) => getServiceBySlug(slug)).filter(Boolean);
  // Top up from the catalog if the curated list is shorter than requested
  for (const s of servicesData) {
    if (picked.length >= limit) break;
    if (s.slug !== serviceSlug && !picked.includes(s)) picked.push(s);
  }
  return picked.slice(0, limit);
}

export function getComparisonsForService(serviceSlug) {
  const ids = [serviceSlug, getLocationCategorySlugForService(serviceSlug)];
  return curatedComparisons.filter(
    (c) => c.type === 'services' && c.itemIds.some((id) => ids.includes(id))
  );
}

export function getComparisonsForProject(project) {
  return curatedComparisons.filter((c) => c.type === 'systems' && c.itemIds.includes(project?.id));
}

export function getResearchForService(serviceSlug) {
  return getPublishedResearchReports().filter((r) => r.relatedServiceSlug === serviceSlug);
}

// Published reports whose dataset includes this portfolio system (reverse of relatedPortfolioIds)
export function getResearchForProject(project) {
  return getPublishedResearchReports().filter((r) => (r.relatedPortfolioIds || []).includes(project?.id));
}

/**
 * Canonical page for an entity shown in a comparison (a portfolio system or a service category).
 */
export function getComparisonEntityLink(type, entity) {
  if (!entity) return null;
  if (type === 'systems') {
    return { label: entity.title, href: getProjectPath(entity) };
  }
  if (type === 'services') {
    const service = getServiceForLocationCategory(entity.slug);
    return service ? { label: service.name, href: getServicePath(service.slug) } : null;
  }
  return null;
}
