import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const admin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10);
const BAN_THRESHOLD = parseInt(process.env.RATE_LIMIT_BAN_THRESHOLD || '50', 10);
const BAN_DURATION_MS = 30 * 60 * 1000;

const PER_ENDPOINT_LIMITS: Record<string, { limit: number; banAfter: number }> = {
  'booking:create': { limit: 5, banAfter: 20 },
  'booking:update': { limit: 10, banAfter: 30 },
  'checkout:create': { limit: 5, banAfter: 15 },
  'class:create': { limit: 3, banAfter: 10 },
  'instructor:create': { limit: 3, banAfter: 10 },
};

async function getSupabase() {
  if (!admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  }
  return admin;
}

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri.trim();
  const cf = request.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();
  return '127.0.0.1';
}

function getFingerprint(request: Request): string {
  const ip = getClientIp(request);
  const ua = (request.headers.get('user-agent') || '').substring(0, 120);
  const raw = `${ip}|${ua}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = ((h << 5) - h) + raw.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

export async function checkRateLimit(request: Request, endpointKey?: string): Promise<NextResponse | null> {
  const ip = getClientIp(request);
  const fingerprint = getFingerprint(request);
  const key = endpointKey || 'global';
  const config = PER_ENDPOINT_LIMITS[key] || { limit: MAX_REQUESTS, banAfter: BAN_THRESHOLD };

  const db = await getSupabase();
  if (!db) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const { data: entry } = await db
    .from('rate_limits')
    .select('*')
    .eq('fingerprint', fingerprint)
    .eq('endpoint_key', key)
    .single();

  if (!entry) {
    await db.from('rate_limits').insert({
      fingerprint,
      endpoint_key: key,
      count: 1,
      window_start: new Date(windowStart).toISOString(),
      abuse_count: 0,
    });
    return null;
  }

  const entryTime = new Date(entry.window_start).getTime();
  if (now - entryTime > WINDOW_MS) {
    await db.from('rate_limits').update({
      count: 1,
      window_start: new Date(windowStart).toISOString(),
    }).eq('fingerprint', fingerprint).eq('endpoint_key', key);
    return null;
  }

  if (entry.count >= config.limit) {
    const newAbuseCount = (entry.abuse_count || 0) + 1;
    await db.from('rate_limits').update({
      abuse_count: newAbuseCount,
    }).eq('fingerprint', fingerprint).eq('endpoint_key', key);

    if (newAbuseCount >= config.banAfter) {
      await db.from('rate_limits').upsert({
        fingerprint,
        endpoint_key: `banned:${ip}`,
        count: 1,
        window_start: new Date(now + BAN_DURATION_MS).toISOString(),
        abuse_count: 99,
      }, { onConflict: 'fingerprint,endpoint_key' });
      return NextResponse.json(
        { error: 'Too many requests. You have been temporarily banned.' },
        { status: 429, headers: { 'Retry-After': String(BAN_DURATION_MS / 1000) } }
      );
    }

    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }

  await db.from('rate_limits').update({
    count: entry.count + 1,
  }).eq('fingerprint', fingerprint).eq('endpoint_key', key);

  return null;
}

export async function isIPBanned(ip: string): Promise<boolean> {
  const db = await getSupabase();
  if (!db) return false;
  const { data } = await db
    .from('rate_limits')
    .select('window_start')
    .eq('endpoint_key', `banned:${ip}`)
    .single();
  if (!data) return false;
  return Date.now() < new Date(data.window_start).getTime();
}

export async function checkOrigin(request: Request): Promise<NextResponse | null> {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map(o => o.trim());
  if (allowedOrigins.includes(origin)) return null;
  return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
}

export async function checkCSRF(request: Request): Promise<NextResponse | null> {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') return null;
  const csrfToken = request.headers.get('x-csrf-token');
  if (csrfToken === 'sanctuary-csrf-v1') return null;
  return NextResponse.json({ error: 'CSRF token required' }, { status: 403 });
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
    'Access-Control-Max-Age': '86400',
  };
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map(o => o.trim());
  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  return headers;
}

export function handleCors(request: Request) {
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
  }
  return null;
}

export async function validateBookingOwnership(bookingId: string, userEmail: string): Promise<boolean> {
  const db = await getSupabase();
  if (!db) return false;
  const { data } = await db
    .from('bookings')
    .select('student_email')
    .eq('id', bookingId)
    .single();
  return data?.student_email === userEmail;
}
