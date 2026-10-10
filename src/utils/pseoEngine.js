/**
 * pseoEngine.js
 * Programmatic SEO Engine for validation, canonical URL standardization,
 * sitemap aggregation, and structured data generation across Shrayu Technologies.
 */

import { PSEO_BASE_URL, pseoOpportunityMatrix, pseoQualityCriteria } from '../data/pseoRegistry.js';
import { statesData, locationCategories } from '../data/locationsData.js';
import { servicesData, getServiceBySlug } from '../data/servicesData.js';
import { portfolioProjects } from '../data/portfolioProjects.js';
import { curatedComparisons } from '../data/comparisonsData.js';
import { normalizeProjectSlug, getProjectBySlug } from './portfolioUtils.js';

/**
 * Validates whether a programmatic page combination meets all quality and data thresholds.
 * @param {string} templateType - One of: 'location_hub', 'location_state', 'location_city', 'location_category', 'service_detail', 'portfolio_case_study', 'comparison_detail'
 * @param {object} entityData - The entity or combination data to evaluate
 * @returns {{ isValid: boolean, isIndexable: boolean, canonicalUrl: string, reason?: string }}
 */
export function validateProgrammaticPage(templateType, entityData) {
  if (!entityData) {
    return {
      isValid: false,
      isIndexable: false,
      canonicalUrl: '',
      reason: 'Entity data is null or undefined'
    };
  }

  switch (templateType) {
    case 'location_hub': {
      const canonicalUrl = `${PSEO_BASE_URL}/locations`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    case 'location_state': {
      if (!entityData.slug || !entityData.name) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Missing state slug or name' };
      }
      const canonicalUrl = `${PSEO_BASE_URL}/locations/${entityData.slug.toLowerCase()}`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    case 'location_city': {
      if (!entityData.slug || !entityData.stateSlug || !entityData.name) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Missing city or state slug' };
      }
      const canonicalUrl = `${PSEO_BASE_URL}/locations/${entityData.stateSlug.toLowerCase()}/${entityData.slug.toLowerCase()}`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    case 'location_category': {
      const { city, category } = entityData;
      if (!city || !category) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Missing city or category object' };
      }

      // Check if city genuinely supports this category
      const isSupported = city.supportedCategories && city.supportedCategories.includes(category.slug);
      if (!isSupported) {
        return {
          isValid: false,
          isIndexable: false,
          canonicalUrl: '',
          reason: `City "${city.name}" does not actively provide category "${category.slug}"`
        };
      }

      // Check for thin content criteria
      if (!category.description || category.description.length < pseoQualityCriteria.minDescriptionLength) {
        return {
          isValid: false,
          isIndexable: false,
          canonicalUrl: '',
          reason: 'Category description fails minimum content depth'
        };
      }

      const canonicalUrl = `${PSEO_BASE_URL}/locations/${city.stateSlug.toLowerCase()}/${city.slug.toLowerCase()}/${category.slug.toLowerCase()}`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    case 'service_detail': {
      if (!entityData.slug || !entityData.name || !entityData.overview) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Missing service required fields' };
      }

      if (entityData.features?.length < pseoQualityCriteria.minFeaturesCount) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Insufficient feature count' };
      }

      const canonicalUrl = `${PSEO_BASE_URL}/services/${entityData.slug.toLowerCase()}`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    case 'portfolio_case_study': {
      if (!entityData.repo || !entityData.title || !entityData.description) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Missing portfolio required fields' };
      }

      if (!entityData.githubUrl) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Portfolio system requires verified GitHub repository' };
      }

      const slug = normalizeProjectSlug(entityData.repo);
      const canonicalUrl = `${PSEO_BASE_URL}/portfolio/${slug}`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    case 'comparison_detail': {
      if (!entityData.type || !entityData.slug || !entityData.title) {
        return { isValid: false, isIndexable: false, canonicalUrl: '', reason: 'Missing comparison required fields' };
      }

      const canonicalUrl = `${PSEO_BASE_URL}/compare/${entityData.type}/${entityData.slug}`;
      return {
        isValid: true,
        isIndexable: true,
        canonicalUrl
      };
    }

    default:
      return {
        isValid: false,
        isIndexable: false,
        canonicalUrl: '',
        reason: `Unknown template type: "${templateType}"`
      };
  }
}

/**
 * Returns all valid, indexable programmatic SEO routes formatted for Next.js sitemap.
 */
export function getAllIndexablePseoRoutes(baseUrl = PSEO_BASE_URL) {
  const routes = [];
  const currentDate = new Date().toISOString();

  // 1. Locations Hub
  routes.push({
    url: `${baseUrl}/locations`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8
  });

  // 2. States & Cities & Location Categories
  statesData.forEach(state => {
    routes.push({
      url: `${baseUrl}/locations/${state.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    });

    state.cities.forEach(city => {
      routes.push({
        url: `${baseUrl}/locations/${state.slug}/${city.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      });

      locationCategories.forEach(cat => {
        const validation = validateProgrammaticPage('location_category', { city, category: cat });
        if (validation.isValid && validation.isIndexable) {
          routes.push({
            url: `${baseUrl}/locations/${state.slug}/${city.slug}/${cat.slug}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7
          });
        }
      });
    });
  });

  // 3. Service Detail Pages (9 services)
  servicesData.forEach(service => {
    const validation = validateProgrammaticPage('service_detail', service);
    if (validation.isValid && validation.isIndexable) {
      routes.push({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85
      });
    }
  });

  // 4. Portfolio Case Studies (25 projects)
  portfolioProjects.forEach(project => {
    const validation = validateProgrammaticPage('portfolio_case_study', project);
    if (validation.isValid && validation.isIndexable) {
      const slug = normalizeProjectSlug(project.repo);
      routes.push({
        url: `${baseUrl}/portfolio/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    }
  });

  // 5. Curated Comparisons (9 comparisons)
  curatedComparisons.forEach(comp => {
    const validation = validateProgrammaticPage('comparison_detail', comp);
    if (validation.isValid && validation.isIndexable) {
      routes.push({
        url: `${baseUrl}/compare/${comp.type}/${comp.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    }
  });

  return routes;
}

/**
 * Computes audit summary stats across all programmatic candidate combinations.
 */
export function getPseoSummaryStats() {
  let totalPotential = 0;
  let totalValid = 0;
  let totalIndexable = 0;
  let emptyRejected = 0;

  // Locations Hub: 1 potential, 1 valid
  totalPotential += 1;
  totalValid += 1;
  totalIndexable += 1;

  // States: 2 potential, 2 valid
  totalPotential += statesData.length;
  totalValid += statesData.length;
  totalIndexable += statesData.length;

  // Cities: 6 potential, 6 valid
  const allCities = statesData.flatMap(s => s.cities);
  totalPotential += allCities.length;
  totalValid += allCities.length;
  totalIndexable += allCities.length;

  // Location + Category combinations: 6 cities * 6 categories = 36 potential
  allCities.forEach(city => {
    locationCategories.forEach(cat => {
      totalPotential += 1;
      const res = validateProgrammaticPage('location_category', { city, category: cat });
      if (res.isValid && res.isIndexable) {
        totalValid += 1;
        totalIndexable += 1;
      } else {
        emptyRejected += 1;
      }
    });
  });

  // Services: 9 potential, 9 valid
  totalPotential += servicesData.length;
  servicesData.forEach(s => {
    const res = validateProgrammaticPage('service_detail', s);
    if (res.isValid && res.isIndexable) {
      totalValid += 1;
      totalIndexable += 1;
    }
  });

  // Portfolio Case Studies: 25 potential, 25 valid
  totalPotential += portfolioProjects.length;
  portfolioProjects.forEach(p => {
    const res = validateProgrammaticPage('portfolio_case_study', p);
    if (res.isValid && res.isIndexable) {
      totalValid += 1;
      totalIndexable += 1;
    }
  });

  // Curated Comparisons: 9 potential, 9 valid
  totalPotential += curatedComparisons.length;
  curatedComparisons.forEach(c => {
    const res = validateProgrammaticPage('comparison_detail', c);
    if (res.isValid && res.isIndexable) {
      totalValid += 1;
      totalIndexable += 1;
    }
  });

  return {
    totalPotential,
    totalValid,
    totalIndexable,
    emptyRejected,
    templatesCount: pseoOpportunityMatrix.length
  };
}

