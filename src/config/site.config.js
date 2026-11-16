/**
 * The site's public origin, for canonical URLs, structured data, sitemap, robots and share links.
 * Set NEXT_PUBLIC_SITE_URL per environment. This is the only place the production domain is written.
 */
const PRODUCTION_SITE_URL = 'https://www.shrayutech.com';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_URL).trim().replace(/\/+$/, '');
