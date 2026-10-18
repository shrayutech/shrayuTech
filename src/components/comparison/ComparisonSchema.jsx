import React from 'react';
import SchemaMarkup from '../seo/schema/SchemaMarkup';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../utils/schema/schemaBuilders';
import { getComparisonEntityLink } from '../../utils/internalLinks';

/**
 * ComparisonSchema.jsx
 * Unified Schema.org ItemList and BreadcrumbList JSON-LD for comparison pages.
 */
export default function ComparisonSchema({
  title = '',
  type = 'systems',
  items = [],
  breadcrumbs = []
}) {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs, SCHEMA_BASE_URL);

  const itemList = buildItemListSchema({
    name: title,
    items: items.map(item => {
      // Each compared item points at its own canonical page (case study or service)
      const link = getComparisonEntityLink(type, item);
      return {
        name: item.name || item.title,
        description: item.description || item.highlight || item.hubRole || undefined,
        url: link ? `${SCHEMA_BASE_URL}${link.href}` : undefined
      };
    }),
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
