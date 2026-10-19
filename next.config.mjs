const isDevelopment = process.env.NODE_ENV === 'development';

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
// Google hosts are for Google Fonts (app/globals.css) and the Maps embeds.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  `connect-src 'self' ${PUBLIC_API_ORIGIN}${isDevelopment ? ' ws: wss:' : ''}`,
  'frame-src https://www.google.com',
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

export default nextConfig;
