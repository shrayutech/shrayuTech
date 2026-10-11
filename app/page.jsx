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
  title: 'Shrayu Technologies | Premium Software Development & AI Engineering',
  description: 'Premier software engineering company specializing in bespoke backend microservices, Next.js web applications, artificial intelligence, and cloud architectures.',
  path: '/',
  keywords: ['software development', 'custom web design', 'mobile apps', 'enterprise solutions', 'AI engineering', 'cloud computing', 'Shrayu Technologies']
});


export default function HomePage() {
  const webPage = buildWebPageSchema({
    ...getPageDates('home'),
    title: 'Shrayu Technologies | Premium Software Development & AI Engineering',
    description: 'Premier software engineering company specializing in bespoke backend microservices, Next.js web applications, artificial intelligence, and cloud architectures.',
    url: SCHEMA_BASE_URL
  });

  const featuredItemList = buildItemListSchema({
    name: 'Featured Production Software Systems',
    description: 'Verified production architectures and open-source systems developed by Shrayu Technologies',
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
