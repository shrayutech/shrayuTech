/**
 * Central API Configuration
 * 
 * In development (locally), API_BASE_URL is empty ('') to route API requests
 * through Next.js proxy rewrite (next.config.mjs), avoiding browser CORS restrictions.
 * In production, it uses NEXT_PUBLIC_API_URL or defaults to the Render backend URL.
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const PROD_API_URL = 'https://shrayutechbackend.onrender.com';

export const API_BASE_URL = isDevelopment
  ? ''
  : (process.env.NEXT_PUBLIC_API_URL || PROD_API_URL);

if (typeof window !== 'undefined') {
  console.log(`[API Config] Mode: ${process.env.NODE_ENV}, Base URL: ${API_BASE_URL || '(Relative Next Proxy)'}`);
}

