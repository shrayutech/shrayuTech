import { getPageDates } from '../../src/data/contentRegistry';
import { Suspense } from 'react';
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
  description: 'Objectively compare verified open-source software architectures and engineering services. Evaluate tech stacks and benchmarks.',
  path: '/compare',
  keywords: ['software comparison', 'architecture comparison', 'tech stack benchmarks', 'delivery hubs']
});

export default function ComparePage() {
  const url = `${SCHEMA_BASE_URL}/compare`;

  const webPage = buildWebPageSchema({
    ...getPageDates('compare'),
    title: 'Technical Comparison Engine | Shrayu Technologies',
    description: 'Objectively compare verified open-source software architectures and engineering services.',
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
      <Suspense fallback={<div className="min-h-screen pt-36 text-center text-slate-400">Loading comparison engine...</div>}>
        <CompareHubView />
      </Suspense>
    </>
  );
}
