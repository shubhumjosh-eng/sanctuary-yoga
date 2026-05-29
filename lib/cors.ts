import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map(o => o.trim());

export function corsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
    'Access-Control-Max-Age': '86400',
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

export function handleCors(request: Request) {
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return NextResponse.json({}, { headers: corsHeaders(origin) });
  }
  return null;
}
