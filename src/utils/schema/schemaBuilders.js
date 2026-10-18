/**
 * schemaBuilders.js
 * Centralized Schema.org Structured Data Builders for Shrayu Technologies.
 * 
 * Generates accurate, semantic, and inter-connected Schema.org JSON-LD graphs
 * using real application data without fabricated claims or duplicate entities.
 */

export const SCHEMA_BASE_URL = 'https://shrayutech.vercel.app';
export const ORG_ID = `${SCHEMA_BASE_URL}/#organization`;
export const WEBSITE_ID = `${SCHEMA_BASE_URL}/#website`;

/**
 * Strips null, undefined, and empty objects/arrays recursively.
 */
export function cleanSchema(obj) {
  if (obj === null || obj === undefined) return undefined;
  if (Array.isArray(obj)) {
    const cleaned = obj.map(cleanSchema).filter(v => v !== undefined);
    return cleaned.length > 0 ? cleaned : undefined;
  }
  if (typeof obj === 'object') {
    const cleaned = {};
    for (const [k, v] of Object.entries(obj)) {
      const val = cleanSchema(v);
      if (val !== undefined) {
        cleaned[k] = val;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  return obj;
}

/**
 * Builds the canonical Organization schema.
 */
export function buildOrganizationSchema(baseUrl = SCHEMA_BASE_URL) {
  return {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Shrayu Technologies',
    legalName: 'Shrayu Technologies Private Limited',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Premier software engineering company specializing in bespoke backend microservices, Next.js web applications, artificial intelligence, and cloud architectures.',
    email: 'contact@shrayutech.com',
    telephone: '+91-70200-41614',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chhatrapati Sambhajinagar Headquarters, CIDCO Industrial Belt',
      addressLocality: 'Chhatrapati Sambhajinagar',
      addressRegion: 'Maharashtra',
      postalCode: '431001',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://github.com/Saru2248'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-70200-41614',
        contactType: 'technical support & enterprise inquiries',
        email: 'contact@shrayutech.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Marathi']
      }
    ]
  };
}

/**
 * Builds the canonical WebSite schema with SearchAction support.
 */
export function buildWebSiteSchema(baseUrl = SCHEMA_BASE_URL) {
  return {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Shrayu Technologies',
    url: baseUrl,
    description: 'Custom software development, Next.js portals, AI models, and regional engineering delivery hubs.',
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/portfolio?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Builds standard WebPage schema connecting to WebSite and Organization.
 */
export function buildWebPageSchema({
  title,
  description,
  url,
  pageType = 'WebPage',
  datePublished,
  dateModified,
  baseUrl = SCHEMA_BASE_URL
}) {
  const cleanUrl = url || baseUrl;
  return {
    '@type': pageType,
    '@id': `${cleanUrl}#webpage`,
    url: cleanUrl,
    name: title,
    description,
    isPartOf: {
      '@id': `${baseUrl}/#website`
    },
    about: {
      '@id': `${baseUrl}/#organization`
    },
    inLanguage: 'en-US',
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {})
  };
}

/**
 * Builds BreadcrumbList schema dynamically from navigation items.
 */
export function buildBreadcrumbSchema(breadcrumbs = [], baseUrl = SCHEMA_BASE_URL) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) return null;

  return {
    '@type': 'BreadcrumbList',
    '@id': `${(breadcrumbs[breadcrumbs.length - 1]?.href ? `${baseUrl}${breadcrumbs[breadcrumbs.length - 1].href}` : baseUrl)}#breadcrumbs`,
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.label || b.name,
      ...(b.href ? { item: b.href.startsWith('http') ? b.href : `${baseUrl}${b.href}` } : {})
    }))
  };
}

/**
 * Builds SoftwareApplication / Product schema for verified portfolio systems.
 */
export function buildSoftwareApplicationSchema(project, baseUrl = SCHEMA_BASE_URL) {
  if (!project) return null;
  const slug = project.repo
    ? project.repo.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : String(project.id);
  const canonicalUrl = `${baseUrl}/portfolio/${slug}`;

  return {
    '@type': 'SoftwareApplication',
    '@id': `${canonicalUrl}#software`,
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: 'Cross-platform, Linux, Web, Cloud',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl
    },
    softwareRequirements: Array.isArray(project.techStack) ? project.techStack.join(', ') : undefined,
    author: {
      '@id': `${baseUrl}/#organization`
    },
    codeRepository: project.githubUrl,
    keywords: [project.category, ...(project.techStack || [])].join(', ')
  };
}

/**
 * Builds Service schema for technical disciplines.
 */
export function buildServiceSchema(service, baseUrl = SCHEMA_BASE_URL) {
  if (!service) return null;
  const canonicalUrl = `${baseUrl}/services/${service.slug}`;

  return {
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: service.name,
    serviceType: service.shortName || service.name,
    description: service.overview || service.description,
    provider: {
      '@id': `${baseUrl}/#organization`
    },
    termsOfService: `${baseUrl}/terms`,
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'State', name: 'Maharashtra' },
      { '@type': 'State', name: 'Karnataka' }
    ]
  };
}

/**
 * Builds ProfessionalService / LocalBusiness schema for regional delivery hubs.
 */
export function buildLocalBusinessSchema(city, baseUrl = SCHEMA_BASE_URL) {
  if (!city) return null;
  const canonicalUrl = `${baseUrl}/locations/${city.stateSlug}/${city.slug}`;

  return {
    '@type': 'ProfessionalService',
    '@id': `${canonicalUrl}#localbusiness`,
    name: `Shrayu Technologies - ${city.name} Hub`,
    image: `${baseUrl}/logo.png`,
    url: canonicalUrl,
    telephone: city.phone,
    email: city.email,
    priceRange: '$$',
    parentOrganization: {
      '@id': `${baseUrl}/#organization`
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: city.address,
      addressLocality: city.name,
      addressRegion: city.stateName,
      postalCode: city.postalCode,
      addressCountry: 'IN'
    },
    geo: city.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng
    } : undefined,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00'
      }
    ]
  };
}

/**
 * Builds ItemList schema for catalog / listing / comparison pages.
 */
export function buildItemListSchema({
  name,
  description,
  items = [],
  baseUrl = SCHEMA_BASE_URL
}) {
  if (!items || items.length === 0) return null;

  return {
    '@type': 'ItemList',
    name,
    ...(description ? { description } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name || item.title,
      ...(item.url ? { url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}` } : {}),
      ...(item.description ? { description: item.description } : {})
    }))
  };
}

/**
 * Builds FAQPage schema from visible question-answer pairs.
 */
export function buildFAQSchema(faqs = []) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Assembles a complete, deduplicated Schema.org @graph container.
 */
export function composeSchemaGraph({
  baseUrl = SCHEMA_BASE_URL,
  includeOrganization = true,
  includeWebSite = true,
  webPage = null,
  breadcrumbs = null,
  mainEntity = null,
  faqs = null,
  itemList = null,
  additionalEntities = []
}) {
  const graph = [];

  if (includeOrganization) {
    graph.push(buildOrganizationSchema(baseUrl));
  }

  if (includeWebSite) {
    graph.push(buildWebSiteSchema(baseUrl));
  }

  if (webPage) {
    graph.push(webPage);
  }

  if (breadcrumbs) {
    const breadcrumbSchema = Array.isArray(breadcrumbs)
      ? buildBreadcrumbSchema(breadcrumbs, baseUrl)
      : breadcrumbs;
    if (breadcrumbSchema) graph.push(breadcrumbSchema);
  }

  if (mainEntity) {
    if (Array.isArray(mainEntity)) {
      graph.push(...mainEntity.filter(Boolean));
    } else {
      graph.push(mainEntity);
    }
  }

  if (faqs && faqs.length > 0) {
    const faqSchema = buildFAQSchema(faqs);
    if (faqSchema) graph.push(faqSchema);
  }

  if (itemList) {
    graph.push(itemList);
  }

  if (Array.isArray(additionalEntities) && additionalEntities.length > 0) {
    graph.push(...additionalEntities.filter(Boolean));
  }

  const cleanedGraph = cleanSchema(graph) || [];

  return {
    '@context': 'https://schema.org',
    '@graph': cleanedGraph
  };
}

/**
 * Builds TechArticle schema for peer-audited research reports.
 */
export function buildTechArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = 'Shrayu Technologies Systems Architecture Group',
  keywords,
  articleSection = 'Computer Science & Software Architecture',
  baseUrl = SCHEMA_BASE_URL
}) {
  return {
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`
    },
    articleSection,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords
  };
}

/**
 * Builds Dataset schema for downloadable first-party research metrics.
 */
export function buildDatasetSchema({
  name,
  description,
  url,
  license = 'https://creativecommons.org/licenses/by/4.0/',
  temporalCoverage,
  spatialCoverage = 'India',
  keywords,
  baseUrl = SCHEMA_BASE_URL
}) {
  return {
    '@type': 'Dataset',
    '@id': `${url}#dataset`,
    name,
    description,
    url,
    license,
    temporalCoverage,
    spatialCoverage,
    creator: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`
    },
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${url}?format=csv`
      }
    ],
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords
  };
}

