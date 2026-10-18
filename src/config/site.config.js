/**
 * Canonical site origin used for every absolute URL the site emits: canonical tags, sitemap,
 * robots.txt, JSON-LD and research citations. Set NEXT_PUBLIC_SITE_URL to the host that serves
 * pages without a redirect, so canonicals, sitemap entries and schema all agree.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://shrayutech.com').replace(/\/+$/, '');
