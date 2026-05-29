import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { instructorSchema } from '@/lib/validation';
import { checkRateLimit, corsHeaders, handleCors } from '@/lib/security';
import { requireRole } from '@/lib/auth-middleware';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function getDb() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function GET(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503, headers: corsHeaders(request.headers.get('origin')) });
  }

  const { searchParams } = new URL(request.url);
  const active = searchParams.get('active');

  let query = db.from('instructors').select('id, name, email, phone, bio, specialties, hourly_rate, is_active, avatar_url');
  if (active !== 'false') query = query.eq('is_active', true);

  const { data: instructors, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to retrieve instructors' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  return NextResponse.json(instructors, { headers: corsHeaders(request.headers.get('origin')) });
}

export async function POST(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const rlRes = await checkRateLimit(request, 'instructor:create');
  if (rlRes) return rlRes;

  const authResult = await requireRole(request, ['admin']);
  if (authResult instanceof NextResponse) return authResult;

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503, headers: corsHeaders(request.headers.get('origin')) });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
  }

  const validation = instructorSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.issues.map(i => i.message) },
      { status: 400, headers: corsHeaders(request.headers.get('origin')) }
    );
  }

  const { name, email, phone, bio, specialties, hourly_rate } = validation.data;

  const { data, error } = await db
    .from('instructors')
    .insert({ name, email, phone, bio, specialties, hourly_rate })
    .select('id, name, email, phone, bio, specialties, hourly_rate, is_active')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to create instructor' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  return NextResponse.json(data, { status: 201, headers: corsHeaders(request.headers.get('origin')) });
}
