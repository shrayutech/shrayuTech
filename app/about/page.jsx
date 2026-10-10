import About from '../../src/views/About';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'About Us | Software Engineering & Enterprise Values',
  description: 'Learn about Shrayu Technologies, our mission, core engineering values, leadership team, and our commitment to clean code software craftsmanship.',
  path: '/about',
  keywords: ['about Shrayu Technologies', 'software engineering team', 'company mission', 'tech values', 'clean code craftsmanship'],
  appendBrandToTitle: true
});


export default function AboutPage() {
  const url = `${SCHEMA_BASE_URL}/about`;
  const webPage = buildWebPageSchema({
    title: 'About Us | Shrayu Technologies',
    description: 'Learn about Shrayu Technologies, our mission, core values, leadership team, and our commitment to software craftsmanship.',
    url,
    pageType: 'AboutPage'
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' }
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
      <About />
    </>
  );
}
