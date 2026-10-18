import { contentRegistry } from '../src/data/contentRegistry';
import { getAllIndexablePseoRoutes } from '../src/utils/pseoEngine';
import { getPublishedResearchReports } from '../src/data/researchData';
import { SITE_URL } from '../src/config/site.config';

export default function sitemap() {
  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString();
  // Real per-page edit dates from the content registry (falls back to build time for unknown keys)
  const pageDate = (key) => contentRegistry[key]?.lastUpdated || currentDate;

  const coreRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: pageDate('home'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: pageDate('services'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: pageDate('portfolio'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: pageDate('compare'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: pageDate('research'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: pageDate('about'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: pageDate('contact'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: pageDate('privacy'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: pageDate('terms'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Retrieve all validated, indexable Programmatic SEO routes
  const pseoRoutes = getAllIndexablePseoRoutes(baseUrl);

  // Retrieve all published, validated First-Party Research Studies
  const researchRoutes = getPublishedResearchReports().map((r) => ({
    url: `${baseUrl}/research/${r.slug}`,
    lastModified: r.updatedAt || currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...coreRoutes, ...pseoRoutes, ...researchRoutes];
}

