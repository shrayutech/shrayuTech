import { getPageDates } from '../../src/data/contentRegistry';
import CompareHubView from './CompareHubView';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';
import { curatedComparisons } from '../../src/data/comparisonsData';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Compare Software Architectures & Delivery Hubs',
  description: 'Compare public software development projects showcasing our technical capabilities, and our engineering services.',
  path: '/compare',
  keywords: ['software comparison', 'architecture comparison', 'tech stack benchmarks', 'delivery hubs']
});

export default function ComparePage() {
  const url = `${SCHEMA_BASE_URL}/compare`;

  const webPage = buildWebPageSchema({
    ...getPageDates('compare'),
    title: 'Technical Comparison Engine | Shrayu Technologies',
    description: 'Compare public software development projects showcasing our technical capabilities, and our engineering services.',
    url
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' }
  ]);

  const comparisonItemList = buildItemListSchema({
    name: 'Curated Software & Architecture Benchmarks',
    description: 'Direct head-to-head architectural decision matrices across systems and services',
    items: curatedComparisons.map(c => ({
      name: c.title,
      description: c.overview,
      url: `/compare/${c.type}/${c.slug}`
    }))
  });

  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs,
    itemList: comparisonItemList
  });

  return (
    <>
      <SchemaMarkup schema={graph} />
      {/* No Suspense wrapper: CompareHubView reads the URL query inside its own boundary, and an
          outer fallback here would put the server HTML behind a hidden, script-swapped block */}
      <CompareHubView />
    </>
  );
}
