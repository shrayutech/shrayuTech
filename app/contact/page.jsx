import Contact from '../../src/views/Contact';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Contact Our Engineering Team | Consultation',
  description: 'Get in touch with Shrayu Technologies. Request a confidential software project consultation or submit an enterprise project brief.',
  path: '/contact',
  keywords: ['contact software team', 'request consultation', 'enterprise brief', 'hire software engineers']
});

export default function ContactPage() {
  const url = `${SCHEMA_BASE_URL}/contact`;

  const webPage = buildWebPageSchema({
    title: 'Contact Us | Shrayu Technologies',
    description: 'Get in touch with Shrayu Technologies. Request a free project consultation or submit a project brief.',
    url,
    pageType: 'ContactPage'
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' }
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
      <Contact />
    </>
  );
}
