/**
 * portfolioUtils.js
 * Utility functions for portfolio project slug normalization, entity retrieval,
 * architectural relationship linking, and JSON-LD schema generation.
 */

import { portfolioProjects } from '../data/portfolioProjects.js';

/**
 * Normalizes a project or repository title into a clean, canonical URL slug.
 */
export function normalizeProjectSlug(projectOrRepo) {
  if (!projectOrRepo) return '';
  const str = typeof projectOrRepo === 'string'
    ? projectOrRepo
    : (projectOrRepo.repo || projectOrRepo.title || '');
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Retrieves a portfolio project by its canonical slug or ID.
 */
export function getProjectBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();

  // Try matching numeric ID
  const numericId = Number(cleanSlug);
  if (!isNaN(numericId) && numericId > 0) {
    return portfolioProjects.find(p => p.id === numericId) || null;
  }

  return (
    portfolioProjects.find(p => {
      const repoSlug = normalizeProjectSlug(p.repo);
      const titleSlug = normalizeProjectSlug(p.title);
      return repoSlug === cleanSlug || titleSlug === cleanSlug;
    }) || null
  );
}

/**
 * Returns all valid portfolio project slugs.
 */
export function getAllProjectSlugs() {
  return portfolioProjects.map(p => normalizeProjectSlug(p.repo));
}

/**
 * Retrieves related portfolio projects for internal linking.
 */
export function getRelatedProjects(currentProject, limit = 3) {
  if (!currentProject) return [];
  return portfolioProjects
    .filter(p => p.id !== currentProject.id)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === currentProject.category && b.category !== currentProject.category) return -1;
      if (b.category === currentProject.category && a.category !== currentProject.category) return 1;
      return 0;
    })
    .slice(0, limit);
}

/**
 * Generates JSON-LD schema for a portfolio project.
 */
export function getProjectStructuredData(project, baseUrl = 'https://shrayutech.vercel.app') {
  if (!project) return null;
  const slug = normalizeProjectSlug(project.repo);
  const canonicalUrl = `${baseUrl}/portfolio/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': canonicalUrl,
        name: project.title,
        description: project.description,
        applicationCategory: project.category,
        operatingSystem: 'Cross-platform, Web, Linux, Cloud',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        softwareRequirements: project.techStack?.join(', '),
        author: {
          '@type': 'Organization',
          name: 'Shrayu Technologies',
          url: baseUrl
        },
        codeRepository: project.githubUrl,
        keywords: [project.category, ...(project.techStack || [])].join(', ')
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Portfolio',
            item: `${baseUrl}/portfolio`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.category,
            item: `${baseUrl}/portfolio?category=${encodeURIComponent(project.category)}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: project.title,
            item: canonicalUrl
          }
        ]
      }
    ]
  };
}

