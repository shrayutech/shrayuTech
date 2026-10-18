/**
 * metadataBuilders.js
 * Centralized, Production-Ready SEO Metadata Builders for Shrayu Technologies.
 * 
 * Provides unified, dynamic, and strictly validated Next.js metadata generation
 * across core static routes, dynamic entities, location hubs, comparisons,
 * first-party research papers, and protected admin interfaces.
 * 
 * Guarantees:
 * - HTTPS canonical URLs without query parameter or trailing slash pollution
 * - Coordinated OpenGraph, Twitter, and native robots directives
 * - Zero hallucinated specs, prices, or fake review counts
 * - Consistent title branding without double-suffix truncation
 */

import { SITE_URL } from '../../config/site.config.js';

export const SITE_METADATA_CONFIG = {
  siteUrl: SITE_URL,
  brandName: 'Shrayu Technologies',
  defaultTitle: 'Shrayu Technologies | Premium Software Development & Custom Web Design',
  titleTemplate: '%s | Shrayu Technologies',
  defaultDescription: 'Premier software engineering company specializing in bespoke backend microservices, Next.js web applications, artificial intelligence, and cloud architectures.',
  defaultImage: `${SITE_URL}/logo.png`,
  locale: 'en_US',
  twitterHandle: '@ayushkhobragade',
  supportedLanguages: ['en']
};

/**
 * Normalizes a relative or absolute path into a clean, canonical HTTPS URL.
 * Strips query parameters, hash fragments, and trailing slashes (except root).
 * 
 * @param {string} path - Target path or URL
 * @returns {string} Standardized canonical URL
 */
export function buildCanonicalUrl(path = '/') {
  const base = SITE_METADATA_CONFIG.siteUrl;
  if (!path || path === '/' || path === '') return base;

  // Remove existing protocol/domain if present
  let clean = path.replace(/^https?:\/\/[^/]+/i, '');
  // Strip query parameters and fragments
  clean = clean.split('?')[0].split('#')[0];
  // Ensure leading slash
  if (!clean.startsWith('/')) clean = `/${clean}`;
  // Strip trailing slashes
  clean = clean.replace(/\/+$/, '');

  return `${base}${clean}`;
}

/**
 * Generates standards-compliant language alternates (hreflang) metadata.
 * 
 * @param {string} path - Canonical path
 * @param {string[]} languages - Supported language codes
 * @returns {object} Next.js alternates metadata
 */
export function buildLanguageAlternates(path = '/', languages = SITE_METADATA_CONFIG.supportedLanguages) {
  const canonicalUrl = buildCanonicalUrl(path);

  const langMap = {
    'x-default': canonicalUrl
  };

  languages.forEach((lang) => {
    langMap[lang] = canonicalUrl;
  });

  return {
    canonical: canonicalUrl,
    languages: langMap
  };
}

/**
 * Constructs native Next.js robots directives.
 * 
 * @param {{ index?: boolean, follow?: boolean, noarchive?: boolean }} options
 * @returns {object} Next.js robots metadata
 */
export function buildRobotsMetadata({ index = true, follow = true, noarchive = false } = {}) {
  return {
    index,
    follow,
    googleBot: {
      index,
      follow,
      noarchive,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  };
}

/**
 * Constructs OpenGraph metadata object.
 */
export function buildOpenGraphMetadata({
  title,
  description,
  url,
  type = 'website',
  image = SITE_METADATA_CONFIG.defaultImage,
  publishedTime,
  modifiedTime,
  authors
}) {
  const og = {
    title,
    description,
    url,
    siteName: SITE_METADATA_CONFIG.brandName,
    locale: SITE_METADATA_CONFIG.locale,
    type,
    images: [
      {
        url: image,
        width: 800,
        height: 600,
        alt: `${title} - ${SITE_METADATA_CONFIG.brandName}`
      }
    ]
  };

  if (type === 'article' && publishedTime) {
    og.publishedTime = publishedTime;
    if (modifiedTime) og.modifiedTime = modifiedTime;
    if (authors) og.authors = Array.isArray(authors) ? authors : [authors];
  }

  return og;
}

/**
 * Constructs Twitter card metadata object.
 */
export function buildTwitterMetadata({
  title,
  description,
  image = SITE_METADATA_CONFIG.defaultImage,
  card = 'summary_large_image'
}) {
  return {
    card,
    title,
    description,
    site: SITE_METADATA_CONFIG.twitterHandle,
    creator: SITE_METADATA_CONFIG.twitterHandle,
    images: [image]
  };
}

/**
 * Base metadata builder combining canonical, robots, OG, and Twitter fields.
 */
export function buildPageMetadata({
  title,
  description = SITE_METADATA_CONFIG.defaultDescription,
  path = '/',
  keywords,
  image = SITE_METADATA_CONFIG.defaultImage,
  robots = { index: true, follow: true },
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  appendBrandToTitle = false
}) {
  const canonicalUrl = buildCanonicalUrl(path);
  const cleanTitle = title || SITE_METADATA_CONFIG.defaultTitle;
  const isAlreadyBranded = cleanTitle.includes(SITE_METADATA_CONFIG.brandName);
  const fullTitle = isAlreadyBranded
    ? cleanTitle
    : `${cleanTitle} | ${SITE_METADATA_CONFIG.brandName}`;
  const displayTitle = appendBrandToTitle ? fullTitle : cleanTitle;

  return {
    title: displayTitle.includes(SITE_METADATA_CONFIG.brandName)
      ? { absolute: displayTitle }
      : displayTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    alternates: buildLanguageAlternates(path),
    openGraph: buildOpenGraphMetadata({
      title: fullTitle,
      description,
      url: canonicalUrl,
      type,
      image,
      publishedTime,
      modifiedTime,
      authors
    }),
    twitter: buildTwitterMetadata({
      title: fullTitle,
      description,
      image
    }),
    robots: buildRobotsMetadata(robots)
  };
}

/**
 * Builds metadata for a Software System / Production Codebase (Product equivalent).
 */
export function buildProductMetadata(project) {
  if (!project) return buildNotFoundMetadata('Case Study');

  const slug = (project.repo || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const shortTitle = project.shortTitle || (project.title && project.title.length > 36 ? `${project.title.slice(0, 33)}...` : project.title);
  const title = `${shortTitle} | Architecture & Code`;
  const baseDesc = project.highlight || project.description || '';
  const descSnippet = baseDesc.length > 85 ? `${baseDesc.slice(0, 82)}...` : baseDesc;
  const description = `${descSnippet} Architecture specs, production codebase, and benchmarks by ${SITE_METADATA_CONFIG.brandName}.`.slice(0, 160);

  const keywords = [
    project.category,
    ...(Array.isArray(project.techStack) ? project.techStack : []),
    'Software Architecture',
    'Open Source Code'
  ];

  return buildPageMetadata({
    title,
    description,
    path: `/portfolio/${slug}`,
    keywords,
    type: 'article'
  });
}

/**
 * Builds metadata for an Engineering Service practice.
 */
export function buildServiceMetadata(service) {
  if (!service) return buildNotFoundMetadata('Service');

  const title = `${service.name} | Technical Services`;
  const baseOverview = service.tagline || service.overview || '';
  const snippet = baseOverview.length > 80 ? `${baseOverview.slice(0, 77)}...` : baseOverview;
  const description = `${snippet} Dedicated agile engineering pods with 100% IP ownership transfer by ${SITE_METADATA_CONFIG.brandName}.`.slice(0, 160);

  const keywords = [
    service.name,
    service.category,
    ...(Array.isArray(service.techStack) ? service.techStack : []),
    'Custom Software',
    'Enterprise IT Consulting'
  ];

  return buildPageMetadata({
    title,
    description,
    path: `/services/${service.slug}`,
    keywords
  });
}

/**
 * Builds metadata for a State, City, or Localized Service Category Delivery Hub.
 */
export function buildLocationMetadata({ state, city, category } = {}) {
  // Case 1: Location + Category (e.g. Custom Software in Pune)
  if (state && city && category) {
    const title = `${category.name} in ${city.name}, ${state.name}`;
    const description = `Deploy dedicated engineering squads for ${category.name.toLowerCase()} in ${city.name}, ${state.name}. 100% IP ownership transfer by Shrayu Technologies.`.slice(0, 160);
    return buildPageMetadata({
      title,
      description,
      path: `/locations/${state.slug}/${city.slug}/${category.slug}`,
      keywords: [category.name, city.name, state.name, 'Software Development Hub']
    });
  }

  // Case 2: City Delivery Hub (e.g. Pune)
  if (state && city) {
    const title = `Software Development in ${city.name}, ${state.name}`;
    const description = `Shrayu Technologies software engineering hub in ${city.name}, ${state.name}. Dedicated agile squads for custom software, web apps, and AI systems.`.slice(0, 160);
    return buildPageMetadata({
      title,
      description,
      path: `/locations/${state.slug}/${city.slug}`,
      keywords: [city.name, state.name, 'IT Delivery Hub', 'Software Engineers']
    });
  }

  // Case 3: State Technology Hub (e.g. Maharashtra)
  if (state) {
    const title = `Software Delivery Hubs in ${state.name}`;
    const description = `Explore Shrayu Technologies software development delivery hubs across ${state.name}, featuring dedicated agile pods, AI labs, and enterprise IT consulting.`;
    return buildPageMetadata({
      title,
      description,
      path: `/locations/${state.slug}`,
      keywords: [state.name, 'Software Hubs', 'Western India IT', 'Enterprise Delivery Network']
    });
  }

  // Default: National Locations Hub
  return buildPageMetadata({
    title: 'Regional Software Engineering Delivery Hubs in India',
    description: 'Explore Shrayu Technologies headquarters and delivery hub in Chhatrapati Sambhajinagar, Maharashtra, serving clients across India.',
    path: '/locations',
    keywords: ['Software Development Hubs India', 'Maharashtra IT', 'Chhatrapati Sambhajinagar', 'Delivery Centers']
  });
}

/**
 * Builds metadata for a Curated Architectural Comparison.
 */
export function buildComparisonMetadata(comparison) {
  if (!comparison) return buildNotFoundMetadata('Comparison');

  const baseTitle = comparison.shortTitle || (comparison.title && comparison.title.length > 36 ? `${comparison.title.slice(0, 33)}...` : comparison.title);
  const title = `${baseTitle} | Architecture Comparison`;
  const baseOverview = comparison.overview || '';
  const snippet = baseOverview.length > 80 ? `${baseOverview.slice(0, 77)}...` : baseOverview;
  const description = comparison.metaDescription || `${snippet} Objective architectural benchmark and trade-off analysis by ${SITE_METADATA_CONFIG.brandName}.`.slice(0, 160);

  return buildPageMetadata({
    title,
    description,
    path: `/compare/${comparison.type}/${comparison.slug}`,
    keywords: [comparison.title, 'Architectural Comparison', 'Software Benchmark', 'Trade-off Analysis']
  });
}

/**
 * Builds metadata for an Empirical Original Research Report.
 */
export function buildResearchMetadata(report) {
  if (!report) return buildNotFoundMetadata('Research Study');

  const title = `${report.shortTitle || report.title} | Empirical Study`;
  const description = report.metaDescription || (report.description && report.description.length > 160 ? `${report.description.slice(0, 157)}...` : report.description) || SITE_METADATA_CONFIG.defaultDescription;

  return buildPageMetadata({
    title,
    description,
    path: `/research/${report.slug}`,
    keywords: [report.topic, report.category, 'Empirical Software Engineering Research', 'First-Party Data'],
    type: 'article',
    publishedTime: report.publishedAt,
    modifiedTime: report.updatedAt,
    authors: [report.author || SITE_METADATA_CONFIG.brandName]
  });
}

/**
 * Builds metadata for protected Admin / Internal consoles (strictly noindex).
 */
export function buildAdminMetadata(title = 'Admin Console', description = 'Internal management dashboard.') {
  return {
    title: `${title} | Admin | ${SITE_METADATA_CONFIG.brandName}`,
    description,
    robots: buildRobotsMetadata({ index: false, follow: false, noarchive: true })
  };
}

/**
 * Builds metadata for 404 / Not Found scenarios (strictly noindex).
 */
export function buildNotFoundMetadata(entityName = 'Page') {
  return {
    title: `${entityName} Not Found | ${SITE_METADATA_CONFIG.brandName}`,
    description: 'The requested resource or architectural case study does not exist or has been relocated.',
    robots: buildRobotsMetadata({ index: false, follow: false })
  };
}

