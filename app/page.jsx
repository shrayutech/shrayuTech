import { getPageDates } from '../src/data/contentRegistry';
import Home from '../src/views/Home';
import SchemaMarkup from '../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildItemListSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../src/utils/schema/schemaBuilders';
import { portfolioProjects } from '../src/data/portfolioProjects';
import { buildPageMetadata } from '../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Software Development & AI Engineering | Shrayu Technologies',
  description: 'Shrayu Technologies builds web applications, full-stack software solutions, and AI-powered systems tailored to business needs.',
  path: '/',
  keywords: ['software development', 'custom web design', 'mobile apps', 'enterprise solutions', 'AI engineering', 'cloud computing', 'Shrayu Technologies']
});


export default function HomePage() {
  const webPage = buildWebPageSchema({
    ...getPageDates('home'),
    title: 'Software Development & AI Engineering | Shrayu Technologies',
    description: 'Shrayu Technologies builds web applications, full-stack software solutions, and AI-powered systems tailored to business needs.',
    url: SCHEMA_BASE_URL
  });

  const featuredItemList = buildItemListSchema({
    name: 'Featured Public Software Projects',
    description: 'Public software development projects showcasing our technical capabilities',
    items: portfolioProjects.slice(0, 5).map((p) => ({
      name: p.title,
      description: p.highlight,
      url: `/portfolio/${p.repo.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`,
    })),
  });

  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: true,
    webPage,
    itemList: featuredItemList,
  });

  return (
    <>
      <SchemaMarkup schema={graph} />
      <Home />
    </>
  );
}
