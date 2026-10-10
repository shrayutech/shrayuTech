import { getAllIndexablePseoRoutes } from '../src/utils/pseoEngine';
import { getPublishedResearchReports } from '../src/data/researchData';

export default function sitemap() {
  const baseUrl = 'https://shrayutech.vercel.app';
  const currentDate = new Date().toISOString();

  const coreRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
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

