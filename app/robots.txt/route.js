import { SITE_METADATA_CONFIG } from '../../src/utils/seo/metadataBuilders.js';

// Hand-written instead of app/robots.js because Next's robots metadata has no field for
// Content-Signal (https://contentsignals.org). Policy: search indexing and use in AI answers
// allowed, model training opted out.
export const dynamic = 'force-static';

export function GET() {
  const baseUrl = SITE_METADATA_CONFIG.siteUrl;
  const body = [
    'User-Agent: *',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/*',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
