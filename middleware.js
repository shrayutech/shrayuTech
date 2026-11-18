import { NextResponse } from 'next/server';

/**
 * Homepage: agents that send Accept: text/markdown get /llms.txt (the site summary) instead of HTML.
 * Browsers never list text/markdown, so they keep getting HTML.
 *
 * Protects the /admin console with HTTP Basic auth.
 * - ADMIN_CONSOLE_USER / ADMIN_CONSOLE_PASSWORD set: credentials required.
 * - Not set: open in development, hidden (404) everywhere else.
 */

const timingSafeEqual = (a, b) => {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
};

// q value (RFC 9110 section 12.4.2) the Accept header gives an exact media type; 0 when not listed
const qualityFor = (accept, mediaType) => {
  let best = 0;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.toLowerCase().split(';').map((p) => p.trim());
    if (type !== mediaType) continue;
    const q = params.find((p) => p.startsWith('q='));
    const value = q ? Number(q.slice(2)) : 1;
    if (Number.isFinite(value)) best = Math.max(best, Math.min(value, 1));
  }
  return best;
};

// Markdown only when the client names it explicitly and does not rank text/html above it.
// Wildcards (*/*, text/*) never select markdown, so browsers and generic clients keep HTML.
const acceptsMarkdown = (accept) => {
  const markdown = qualityFor(accept, 'text/markdown');
  return markdown > 0 && markdown >= qualityFor(accept, 'text/html');
};

export function middleware(request) {
  if (request.nextUrl.pathname === '/') {
    const wantsMarkdown = acceptsMarkdown(request.headers.get('accept') || '');
    const response = wantsMarkdown
      ? NextResponse.rewrite(new URL('/llms.txt', request.url))
      : NextResponse.next();
    // Caches must key the homepage on Accept now that it has two representations. Next replaces
    // Vary on rendered HTML, so this only survives on the markdown response; Vercel runs middleware
    // before its edge cache, and browsers never request markdown, so the HTML side is still safe.
    response.headers.set('Vary', 'Accept');
    return response;
  }

  const user = process.env.ADMIN_CONSOLE_USER;
  const password = process.env.ADMIN_CONSOLE_PASSWORD;

  if (!user || !password) {
    if (process.env.NODE_ENV === 'development') return NextResponse.next();
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const separator = decoded.indexOf(':');
      if (
        separator !== -1 &&
        timingSafeEqual(decoded.slice(0, separator), user) &&
        timingSafeEqual(decoded.slice(separator + 1), password)
      ) {
        return NextResponse.next();
      }
    } catch {
      // Malformed header: fall through to the challenge
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Shrayu Admin", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}

export const config = {
  matcher: ['/', '/admin', '/admin/:path*'],
};
