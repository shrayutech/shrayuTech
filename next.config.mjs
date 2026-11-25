import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { validateRecaptchaSiteKey } from './src/config/recaptcha.config.mjs';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Build-time configuration checks. NEXT_PUBLIC_* values are inlined into the client bundle when
 * `next build` runs, so a missing value cannot be fixed later at runtime, only by rebuilding.
 */
function checkBuildEnvironment() {
  // Anything named NEXT_PUBLIC_ is shipped to every browser; secrets must never be named that way
  const exposedSecrets = Object.keys(process.env).filter(
    (name) => name.startsWith('NEXT_PUBLIC_') && /SECRET|PASSWORD|PRIVATE/i.test(name)
  );
  if (exposedSecrets.length) {
    throw new Error(
      `Refusing to build: ${exposedSecrets.join(', ')} would be published to browsers. ` +
        'Secret keys belong on the backend only (RECAPTCHA_SECRET_KEY on Render).'
    );
  }

  const recaptchaError = validateRecaptchaSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  if (!recaptchaError) return;
  const help =
    `${recaptchaError}. The contact form cannot send enquiries without it. Set it in Vercel ` +
    '(Settings > Environment Variables, Production) to the reCAPTCHA v3 site key, then redeploy.';
  // Vercel Production must not ship a contact form that cannot submit; other builds only warn
  if (process.env.VERCEL_ENV === 'production') throw new Error(help);
  console.warn(`\n[config] Warning: ${help}\n`);
}

// Backend that /api/* is proxied to. Defaults to the local Express server in dev.
const BACKEND_URL = (
  process.env.BACKEND_URL ||
  (isDevelopment ? 'http://localhost:5000' : 'https://shrayutechbackend.onrender.com')
).replace(/\/+$/, '');

// Origin the browser calls directly for the contact form in production (see src/config/api.config.js)
const PUBLIC_API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || 'https://shrayutechbackend.onrender.com').origin;
  } catch {
    return '';
  }
})();

// 'unsafe-inline' scripts are required by Next.js hydration and the theme bootstrap script in
// app/layout.jsx unless the site moves to per-request nonces (which disables static rendering).
// Fonts are self-hosted by next/font (app/layout.jsx); the Google hosts are for the Maps embeds and
// reCAPTCHA v3 on the contact form (src/utils/recaptcha.js).
// Firebase Analytics (src/utils/analytics.js) loads gtag.js from googletagmanager.com and reports
// to the Google Analytics and Firebase endpoints in connect-src.
const ANALYTICS_CONNECT_SRC = [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
  'https://firebase.googleapis.com',
  'https://firebaseinstallations.googleapis.com',
].join(' ');

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  `connect-src 'self' ${PUBLIC_API_ORIGIN} https://www.google.com ${ANALYTICS_CONNECT_SRC}${isDevelopment ? ' ws: wss:' : ''}`,
  'frame-src https://www.google.com https://recaptcha.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  ...(isDevelopment ? [] : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // RFC 8288 discovery links for agents: the markdown site summary and the sitemap
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</llms.txt>; rel="describedby"; type="text/markdown", </sitemap.xml>; rel="sitemap"; type="application/xml"',
          },        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/portfolio',
        permanent: true,
      },
      {
        // Renamed: the study covers public portfolio repositories, not production systems.
        source: '/research/tech-stack-distribution-production-systems',
        destination: '/research/tech-stack-distribution-portfolio-repositories',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
  // next/image is not used; add specific hostnames here if it ever is. A wildcard pattern turns
  // /_next/image into an open proxy for any HTTPS URL.
};

export default function config(phase) {
  if (phase === PHASE_PRODUCTION_BUILD) checkBuildEnvironment();
  return nextConfig;
}
