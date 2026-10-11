import { getPageDates } from '../../src/data/contentRegistry';
import Services from '../../src/views/Services';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';
import { servicesData, defaultServiceFAQs } from '../../src/data/servicesData';
import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Enterprise Software Services & Engineering Disciplines',
  description: 'Explore our 9 enterprise software services: custom web and mobile development, AI & ML solutions, cloud infrastructure, microservices, and UI/UX design.',
  path: '/services',
  keywords: ['software services', 'custom web development', 'mobile apps', 'AI solutions', 'cloud infrastructure', 'DevOps', 'microservices'],
  appendBrandToTitle: true
});


export default function ServicesPage() {
  const url = `${SCHEMA_BASE_URL}/services`;

  const webPage = buildWebPageSchema({
    ...getPageDates('services'),
    title: 'Software Engineering Services | Shrayu Technologies',
    description: 'Explore our enterprise software services: custom web and mobile development, AI & ML solutions, cloud infrastructure, and UI/UX design.',
    url
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' }
  ]);

  const serviceItemList = buildItemListSchema({
    name: 'Enterprise Software Engineering Disciplines',
    description: 'High-availability software engineering services provided by Shrayu Technologies',
    items: servicesData.map(s => ({
      name: s.name,
      description: s.tagline,
      url: `/services/${s.slug}`
    }))
  });

  const faqs = defaultServiceFAQs.map(f => ({
    question: f.q,
    answer: f.a
  }));

  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs,
    itemList: serviceItemList,
    faqs
  });

  return (
    <>
      <SchemaMarkup schema={graph} />
      <Services />
    </>
  );
}
