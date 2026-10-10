import React from 'react';
import SchemaMarkup from '../seo/schema/SchemaMarkup';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../utils/schema/schemaBuilders';

/**
 * ComparisonSchema.jsx
 * Unified Schema.org ItemList and BreadcrumbList JSON-LD for comparison pages.
 */
export default function ComparisonSchema({
  title = '',
  items = [],
  breadcrumbs = []
}) {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, SCHEMA_BASE_URL);

  const itemList = buildItemListSchema({
    name: title,
    items: items.map(item => ({
      name: item.name || item.title,
      description: item.description || item.highlight || item.hubRole || undefined,
      url: item.slug ? `${SCHEMA_BASE_URL}/compare/${item.type || 'systems'}/${item.slug}` : undefined
    })),
    baseUrl: SCHEMA_BASE_URL
  });

  const graph = composeSchemaGraph({
    includeOrganization: false,
    includeWebSite: false,
    breadcrumbs: breadcrumbSchema,
    itemList
  });

  return <SchemaMarkup schema={graph} />;
}
