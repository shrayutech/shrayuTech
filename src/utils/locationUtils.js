import { statesData, locationCategories } from '../data/locationsData.js';
import { portfolioProjects } from '../data/portfolioProjects.js';
import { SITE_URL } from '../config/site.config.js';

/**
 * Normalizes state name, alias, or code to canonical slug.
 * Handles: 'Maharashtra', 'maharashtra', 'MAHARASHTRA', 'MH' -> 'maharashtra'
 */
export function normalizeState(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  if (clean === 'mh' || clean === 'maharashtra') return 'maharashtra';
  if (clean === 'ka' || clean === 'karnataka') return 'karnataka';

  const match = statesData.find(
    s => s.slug === clean || s.name.toLowerCase() === input.trim().toLowerCase() || s.stateCode.toLowerCase() === clean
  );
  return match ? match.slug : null;
}

/**
 * Normalizes city name or alias to canonical slug.
 * Handles: 'Pune', 'pune', 'PUNE', 'Aurangabad' -> 'chhatrapati-sambhajinagar', 'Bangalore' -> 'bengaluru'
 */
export function normalizeCity(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().toLowerCase();

  // Alias lookups
  if (clean === 'aurangabad' || clean === 'sambhajinagar' || clean === 'chhatrapati-sambhajinagar' || clean === 'chhatrapati sambhajinagar') {
    return 'chhatrapati-sambhajinagar';
  }
  if (clean === 'bangalore' || clean === 'bengaluru') {
    return 'bengaluru';
  }
  if (clean === 'poona' || clean === 'pune') {
    return 'pune';
  }
  if (clean === 'bombay' || clean === 'mumbai') {
    return 'mumbai';
  }
  if (clean === 'nasik' || clean === 'nashik') {
    return 'nashik';
  }
  if (clean === 'nagpur') {
    return 'nagpur';
  }

  // Iterate all cities
  for (const state of statesData) {
    for (const city of state.cities) {
      if (
        city.slug === clean ||
        city.name.toLowerCase() === clean ||
        city.altNames?.some(alt => alt.toLowerCase() === clean)
      ) {
        return city.slug;
      }
    }
  }

  return clean.replace(/[^a-z0-9]/g, '-');
}

/**
 * Normalizes category slug or name.
 */
export function normalizeCategory(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().toLowerCase();

  const match = locationCategories.find(
    c => c.slug === clean || c.name.toLowerCase() === clean || c.shortName.toLowerCase() === clean
  );
  return match ? match.slug : null;
}

/**
 * Converts any string into a URL-safe lowercase slug.
 */
export function generateLocationSlug(name) {
  if (!name || typeof name !== 'string') return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Retrieves all registered states.
 */
export function getAllStates() {
  return statesData;
}

/**
 * Retrieves a state by its normalized slug.
 */
export function getStateBySlug(stateSlug) {
  const normalized = normalizeState(stateSlug);
  if (!normalized) return null;
  return statesData.find(s => s.slug === normalized) || null;
}

/**
 * Retrieves a city by state and city slug.
 */
export function getCityBySlug(stateSlug, citySlug) {
  const state = getStateBySlug(stateSlug);
  if (!state) return null;

  const normalizedCity = normalizeCity(citySlug);
  return state.cities.find(c => c.slug === normalizedCity) || null;
}

/**
 * Retrieves a category object by its slug.
 */
export function getCategoryBySlug(categorySlug) {
  const normalized = normalizeCategory(categorySlug);
  if (!normalized) return null;
  return locationCategories.find(c => c.slug === normalized) || null;
}

/**
 * Retrieves all cities across all states.
 */
export function getAllCities() {
  const cities = [];
  for (const state of statesData) {
    for (const city of state.cities) {
      cities.push({
        ...city,
        stateName: state.name,
        stateSlug: state.slug
      });
    }
  }
  return cities;
}

/**
 * Retrieves nearby cities for a given city slug.
 */
export function getNearbyCities(citySlug) {
  const all = getAllCities();
  const current = all.find(c => c.slug === citySlug);
  if (!current || !current.nearbyCities) return [];

  return current.nearbyCities
    .map(nearbySlug => all.find(c => c.slug === nearbySlug))
    .filter(Boolean);
}

/**
 * Cross-references verified projects in portfolioProjects.js for a category.
 */
export function getVerifiedProjectsForCategory(categorySlug) {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];

  // Match by portfolio category
  return portfolioProjects.filter(p => {
    if (cat.portfolioCategory === 'Python') {
      return p.category === 'Python' || p.category === 'Data Science';
    }
    if (cat.portfolioCategory === 'Full-Stack Development') {
      return p.category === 'Full-Stack Development' || p.category === 'Frontend Development';
    }
    if (cat.portfolioCategory === 'AI') {
      return p.category === 'AI';
    }
    return p.category === cat.portfolioCategory;
  }).slice(0, 4); // return top 4 verified case studies
}

/**
 * Searches locations (states, cities, and services) based on query string.
 */
export function searchLocations(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();

  const results = [];

  // Match cities
  for (const city of getAllCities()) {
    if (
      city.name.toLowerCase().includes(q) ||
      city.district.toLowerCase().includes(q) ||
      city.altNames?.some(alt => alt.toLowerCase().includes(q)) ||
      city.keyLocalities?.some(loc => loc.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'city',
        title: `${city.name}, ${city.stateName}`,
        subtitle: city.hubRole,
        url: `/locations/${city.stateSlug}/${city.slug}`,
        city
      });
    }
  }

  // Match states
  for (const state of statesData) {
    if (state.name.toLowerCase().includes(q) || state.stateCode.toLowerCase().includes(q)) {
      results.push({
        type: 'state',
        title: `${state.name} State`,
        subtitle: `${state.cities.length} Engineering Hubs Available`,
        url: `/locations/${state.slug}`,
        state
      });
    }
  }

  return results;
}

/**
 * Generates all valid static route parameters for Next.js App Router (generateStaticParams).
 */
export function getValidLocationParams() {
  const stateParams = [];
  const cityParams = [];
  const categoryParams = [];

  for (const state of statesData) {
    stateParams.push({ state: state.slug });

    for (const city of state.cities) {
      cityParams.push({
        state: state.slug,
        city: city.slug
      });

      for (const catSlug of city.supportedCategories) {
        categoryParams.push({
          state: state.slug,
          city: city.slug,
          category: catSlug
        });
      }
    }
  }

  return { stateParams, cityParams, categoryParams };
}

/**
 * Generates sitemap entries for all indexable location pages.
 */
export function getLocationsForSitemap(baseUrl = SITE_URL) {
  const currentDate = new Date().toISOString();
  const entries = [
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  for (const state of statesData) {
    entries.push({
      url: `${baseUrl}/locations/${state.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75
    });

    for (const city of state.cities) {
      entries.push({
        url: `${baseUrl}/locations/${state.slug}/${city.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: city.isHeadquarters ? 0.8 : 0.7
      });

      for (const catSlug of city.supportedCategories) {
        entries.push({
          url: `${baseUrl}/locations/${state.slug}/${city.slug}/${catSlug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.65
        });
      }
    }
  }

  return entries;
}
