import { NextResponse } from 'next/server';

/**
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

export function middleware(request) {
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
  matcher: ['/admin', '/admin/:path*'],
};
