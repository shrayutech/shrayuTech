/**
 * comparisonUtils.js
 * Utility functions for attribute normalization, slug generation, entity retrieval,
 * differences highlighting, and comparison formatting across systems, services, and hubs.
 */

import { portfolioProjects } from '../data/portfolioProjects.js';
import { locationCategories } from '../data/locationsData.js';
import { getAllCities } from './locationUtils.js';
import { curatedComparisons } from '../data/comparisonsData.js';
import { COMPARISON_CONFIG } from '../config/comparison.config.js';
import { SITE_URL } from '../config/site.config.js';

/**
 * Normalizes an attribute key to a canonical representation.
 */
export function normalizeAttribute(key) {
  if (!key || typeof key !== 'string') return '';
  return key.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Normalizes a list of item IDs/slugs into an alphabetically sorted, canonical comparison slug.
 * Example: ['pune', 'bengaluru'] -> 'bengaluru-vs-pune'
 * Ensures selection order NEVER generates duplicate URLs.
 */
export function normalizeComparisonSlug(itemSlugs = []) {
  if (!Array.isArray(itemSlugs) || itemSlugs.length === 0) return '';
  const sorted = [...itemSlugs].map(s => String(s).toLowerCase().trim()).sort();
  return sorted.join('-vs-');
}

/**
 * Parses a comparison slug back into item identifiers.
 * Example: 'bengaluru-vs-pune' -> ['bengaluru', 'pune']
 */
export function parseComparisonSlug(slug) {
  if (!slug || typeof slug !== 'string') return [];
  return slug.split('-vs-').map(s => s.trim()).filter(Boolean);
}

/**
 * Retrieves an entity by type and identifier.
 */
export function getEntityById(type, idOrSlug) {
  if (!idOrSlug) return null;

  if (type === 'systems') {
    const numericId = Number(idOrSlug);
    if (!isNaN(numericId)) {
      return portfolioProjects.find(p => p.id === numericId) || null;
    }
    const cleanSlug = String(idOrSlug).toLowerCase().replace(/[^a-z0-9]/g, '-');
    return portfolioProjects.find(p => {
      const repoSlug = p.repo.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const titleSlug = p.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return repoSlug === cleanSlug || titleSlug === cleanSlug;
    }) || null;
  }

  if (type === 'services') {
    const cleanSlug = String(idOrSlug).toLowerCase();
    return locationCategories.find(c => c.slug === cleanSlug) || null;
  }

  if (type === 'locations') {
    const cleanSlug = String(idOrSlug).toLowerCase();
    const cities = getAllCities();
    return cities.find(c => c.slug === cleanSlug) || null;
  }

  return null;
}

/**
 * Retrieves all available entities for a specific type.
 */
export function getAllEntitiesForType(type) {
  if (type === 'systems') {
    return portfolioProjects.map(p => ({
      id: p.id,
      slug: p.repo.toLowerCase(),
      name: p.title,
      category: p.category,
      subtitle: p.highlight,
      type: 'systems',
      raw: p
    }));
  }

  if (type === 'services') {
    return locationCategories.map(s => ({
      id: s.slug,
      slug: s.slug,
      name: s.name,
      category: s.shortName,
      subtitle: s.tagline,
      type: 'services',
      raw: s
    }));
  }

  if (type === 'locations') {
    const cities = getAllCities();
    return cities.map(c => ({
      id: c.slug,
      slug: c.slug,
      name: `${c.name}, ${c.stateName}`,
      category: c.stateName,
      subtitle: c.hubRole,
      type: 'locations',
      raw: c
    }));
  }

  return [];
}

/**
 * Defines comparable attributes schema dynamically per entity type.
 */
export function getComparableAttributes(type, items = []) {
  if (type === 'systems') {
    return [
      {
        key: 'category',
        label: 'Architecture Domain',
        format: 'badge',
        getValue: (p) => p.category
      },
      {
        key: 'highlight',
        label: 'Engineering Achievement',
        format: 'text',
        getValue: (p) => p.highlight || 'Not specified'
      },
      {
        key: 'techStack',
        label: 'Technology Stack',
        format: 'tags',
        getValue: (p) => p.techStack || []
      },
      {
        key: 'visualType',
        label: 'UI & Visualization Paradigm',
        format: 'badge',
        getValue: (p) => p.visualType || 'Standard'
      },
      {
        key: 'description',
        label: 'System Overview',
        format: 'text',
        getValue: (p) => p.description || 'Not specified'
      },
      {
        key: 'githubUrl',
        label: 'Production Repository',
        format: 'link',
        getValue: (p) => p.githubUrl ? { label: 'Verified GitHub Repository', url: p.githubUrl } : null
      },
      {
        key: 'demoUrl',
        label: 'Live Deployment Status',
        format: 'text',
        getValue: (p) => p.demoUrl ? 'Public Demo Available' : 'Self-Hosted / Open-Source Pipeline'
      }
    ];
  }

  if (type === 'services') {
    return [
      {
        key: 'tagline',
        label: 'Engineering Focus',
        format: 'text',
        getValue: (s) => s.tagline || 'Not specified'
      },
      {
        key: 'portfolioCategory',
        label: 'Domain Specialization',
        format: 'badge',
        getValue: (s) => s.portfolioCategory || 'Full-Stack'
      },
      {
        key: 'keyFeatures',
        label: 'Core Deliverables',
        format: 'list',
        getValue: (s) => s.keyFeatures || []
      },
      {
        key: 'description',
        label: 'Scope & Architecture',
        format: 'text',
        getValue: (s) => s.description || 'Not specified'
      },
      {
        key: 'portfolioLink',
        label: 'Verified Implementations',
        format: 'internal-link',
        getValue: (s) => ({ label: 'Browse Verified Projects', url: `/portfolio?category=${encodeURIComponent(s.portfolioCategory)}` })
      }
    ];
  }

  if (type === 'locations') {
    return [
      {
        key: 'stateName',
        label: 'State / Territory',
        format: 'badge',
        getValue: (l) => l.stateName
      },
      {
        key: 'hubRole',
        label: 'Operational Role',
        format: 'text',
        getValue: (l) => l.hubRole
      },
      {
        key: 'isHeadquarters',
        label: 'Headquarters Status',
        format: 'boolean',
        getValue: (l) => l.isHeadquarters ? 'Global Headquarters & Core Lab' : 'Regional Delivery Hub'
      },
      {
        key: 'postalCode',
        label: 'Postal Code (PIN)',
        format: 'text',
        getValue: (l) => l.postalCode
      },
      {
        key: 'address',
        label: 'Office & Facility Address',
        format: 'text',
        getValue: (l) => l.address
      },
      {
        key: 'keyLocalities',
        label: 'Key Tech Corridors',
        format: 'tags',
        getValue: (l) => l.keyLocalities || []
      },
      {
        key: 'supportedCategories',
        label: 'Available Services',
        format: 'count-and-list',
        getValue: (l) => l.supportedCategories || []
      },
      {
        key: 'phone',
        label: 'Direct Phone Inquiries',
        format: 'text',
        getValue: (l) => l.phone
      }
    ];
  }

  return [];
}

/**
 * Checks whether values differ across items for a given attribute.
 */
export function hasAttributeDifference(attribute, items) {
  if (!items || items.length <= 1) return false;
  const values = items.map(item => {
    const val = attribute.getValue(item);
    if (Array.isArray(val)) return val.slice().sort().join(',');
    if (typeof val === 'object' && val !== null) return JSON.stringify(val);
    return String(val);
  });
  const first = values[0];
  return values.some(v => v !== first);
}

/**
 * Generates serializable JSON comparison rows (safe for React Server Components).
 */
export function formatComparisonRows(type, items = []) {
  if (!items || items.length === 0) return [];
  const schema = getComparableAttributes(type, items);
  return schema.map(attr => {
    const values = items.map(item => attr.getValue(item));
    const isDiff = hasAttributeDifference(attr, items);
    return {
      key: attr.key,
      label: attr.label,
      format: attr.format,
      isDiff,
      values
    };
  });
}

/**
 * Extracts objective technical similarities shared by all items in comparison.
 */
export function getComparisonSimilarities(type, items) {
  if (!items || items.length < 2) return [];
  const similarities = [];

  if (type === 'systems') {
    // Check shared category
    const categories = new Set(items.map(i => i.category));
    if (categories.size === 1) {
      similarities.push(`All systems belong to the ${items[0].category} engineering discipline.`);
    }

    // Check shared technologies
    const allStacks = items.map(i => new Set(i.techStack || []));
    const sharedTech = (items[0].techStack || []).filter(tech =>
      allStacks.every(stack => stack.has(tech))
    );
    if (sharedTech.length > 0) {
      similarities.push(`Shared technology stack: ${sharedTech.join(', ')}.`);
    }

    // Check open source status
    const allGithub = items.every(i => Boolean(i.githubUrl));
    if (allGithub) {
      similarities.push('All systems provide open-source GitHub repositories for code audit.');
    }
  }

  if (type === 'services') {
    similarities.push('All services follow test-driven development, modular architectures, and agile sprints.');
    similarities.push('All projects include direct communication with principal engineering leads.');
  }

  if (type === 'locations') {
    const states = new Set(items.map(i => i.stateName));
    if (states.size === 1) {
      similarities.push(`Both hubs operate within ${items[0].stateName}, India.`);
    }
    similarities.push('All hubs have direct access to Shrayu Technologies centralized R&D lab.');
    similarities.push('All hubs support client consultations on Indian Standard Time (IST).');
  }

  return similarities;
}

/**
 * Retrieves curated comparisons by type or slug.
 */
export function getAllCuratedComparisons(type = null) {
  if (!type) return curatedComparisons;
  return curatedComparisons.filter(c => c.type === type);
}

export function getCuratedComparisonBySlug(type, slug) {
  if (!type || !slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return curatedComparisons.find(c => c.type === type && c.slug === cleanSlug) || null;
}

/**
 * Resolves item entities for a curated comparison or dynamic slug.
 */
export function resolveComparisonEntities(type, slugOrIds) {
  let itemIds = [];

  if (Array.isArray(slugOrIds)) {
    itemIds = slugOrIds;
  } else if (typeof slugOrIds === 'string') {
    // Check if it's a curated slug
    const curated = getCuratedComparisonBySlug(type, slugOrIds);
    if (curated) {
      itemIds = curated.itemIds;
    } else {
      // Dynamic slug parsing: 'id1-vs-id2'
      itemIds = parseComparisonSlug(slugOrIds);
    }
  }

  const items = itemIds
    .map(id => getEntityById(type, id))
    .filter(Boolean);

  return items;
}

/**
 * Builds sitemap entries for curated comparisons.
 */
export function getComparisonsForSitemap(baseUrl = SITE_URL) {
  const currentDate = new Date().toISOString();
  const entries = [
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  curatedComparisons.forEach(c => {
    entries.push({
      url: `${baseUrl}/compare/${c.type}/${c.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    });
  });

  return entries;
}

