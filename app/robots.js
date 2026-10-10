import { SITE_METADATA_CONFIG } from '../src/utils/seo/metadataBuilders.js';

export default function robots() {
  const baseUrl = SITE_METADATA_CONFIG.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
