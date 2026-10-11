import { notFound } from 'next/navigation';
import { getPageDates } from '../../src/data/contentRegistry';
import Careers from '../../src/views/Careers';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Careers & Software Engineering Opportunities',
  description: 'Join Shrayu Technologies and help build high-scale digital platforms. Explore engineering roles in frontend, backend, AI systems, and cloud devops.',
  path: '/careers',
  keywords: ['software careers', 'engineering roles', 'Next.js developer jobs', 'AI engineer jobs', 'remote tech jobs']
});

export default function CareersPage() {
  // Careers page is hidden for now. Delete this line (and restore the links) to bring it back.
  notFound();

  const url = `${SCHEMA_BASE_URL}/careers`;

  const webPage = buildWebPageSchema({
    ...getPageDates('careers'),
    title: 'Careers & Engineering Collective | Shrayu Technologies',
    description: 'Join Shrayu Technologies and help us build the digital future. Explore open positions in engineering, design, and product management.',
    url
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Careers', href: '/careers' }
  ]);

  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs
  });

  return (
    <>
      <SchemaMarkup schema={graph} />
      <Careers />
    </>
  );
}
