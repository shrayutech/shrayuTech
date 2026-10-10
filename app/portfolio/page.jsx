import { Suspense } from 'react';
import Products from '../../src/views/Products';
import PortfolioSkeleton from '../../src/components/skeleton/PortfolioSkeleton';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';
import { portfolioProjects } from '../../src/data/portfolioProjects';
import { normalizeProjectSlug } from '../../src/utils/portfolioUtils';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Products & Portfolio | Software Showcase',
  description: 'Explore enterprise products, open-source repositories, and software engineering case studies created by Shrayu Technologies.',
  path: '/portfolio',
  keywords: ['software portfolio', 'open source projects', 'full-stack apps', 'AI case studies', 'machine learning models']
});

export default function PortfolioPage() {
  const url = `${SCHEMA_BASE_URL}/portfolio`;

  const webPage = buildWebPageSchema({
    title: 'Products & Engineering Showcase | Shrayu Technologies',
    description: 'Explore enterprise products, open-source repositories, and software engineering case studies created by Shrayu Technologies.',
    url
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' }
  ]);

  const projectsItemList = buildItemListSchema({
    name: 'Verified Open Source Production Systems & Repositories',
    description: '25 production software applications, AI models, and algorithmic pipelines created by Shrayu Technologies',
    items: portfolioProjects.map(p => ({
      name: p.title,
      description: p.highlight,
      url: `/portfolio/${normalizeProjectSlug(p.repo)}`
    }))
  });

  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs,
    itemList: projectsItemList
  });

  return (
    <>
      <SchemaMarkup schema={graph} />
      <Suspense fallback={<PortfolioSkeleton />}>
        <Products />
      </Suspense>
    </>
  );
}
