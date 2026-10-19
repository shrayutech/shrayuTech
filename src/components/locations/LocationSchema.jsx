import React from 'react';
import SchemaMarkup from '../seo/schema/SchemaMarkup';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../utils/schema/schemaBuilders';

/**
 * LocationSchema.jsx
 * Unified, XSS-safe Schema.org structured data for all Location pSEO routes.
 */
export default function LocationSchema({
  type = 'city', // 'hub' | 'city' | 'state' | 'service'
  cityData = null,
  stateData = null,
  categoryData = null,
  breadcrumbs = []
}) {
  const additionalEntities = [];

  // 1. LocalBusiness / ProfessionalService Schema
  if (cityData) {
    const business = buildLocalBusinessSchema(cityData, SCHEMA_BASE_URL);
    if (business) {
      if (cityData.isHeadquarters) {
        business.parentOrganization = {
          '@id': `${SCHEMA_BASE_URL}/#organization`
        };
      }
      additionalEntities.push(business);
    }
  }

  // 2. Localized Service Schema (for city + category combinations)
  if (categoryData && cityData) {
    const serviceEntity = {
      '@type': 'Service',
      '@id': `${SCHEMA_BASE_URL}/locations/${cityData.stateSlug}/${cityData.slug}/${categoryData.slug}#service`,
      name: `${categoryData.name} in ${cityData.name}`,
      serviceType: categoryData.name,
      description: `${categoryData.description} Provided by Shrayu Technologies in ${cityData.name}, ${cityData.stateName}.`,
      provider: {
        '@id': `${SCHEMA_BASE_URL}/locations/${cityData.stateSlug}/${cityData.slug}#localbusiness`
      },
      areaServed: {
        '@type': 'City',
        name: cityData.name
      }
    };
    additionalEntities.push(serviceEntity);
  }

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, SCHEMA_BASE_URL);

  const graphPayload = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false, // Page level
    breadcrumbs: breadcrumbSchema,
    additionalEntities
  });

  return <SchemaMarkup schema={graphPayload} />;
}
