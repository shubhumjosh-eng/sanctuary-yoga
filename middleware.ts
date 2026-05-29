import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from './lib/security';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    if (proto && proto !== 'https') {
      const httpsUrl = url.toString().replace('http://', 'https://');
      return NextResponse.redirect(httpsUrl, 301);
    }
  }

  if (url.pathname.startsWith('/api/')) {
    const rlResponse = await checkRateLimit(request as unknown as Request);
    if (rlResponse) return rlResponse;
  }

  const response = NextResponse.next();
  response.headers.set('X-Request-Id', crypto.randomUUID());
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
