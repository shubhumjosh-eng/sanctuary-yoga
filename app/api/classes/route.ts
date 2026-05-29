import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { classSchema } from '@/lib/validation';
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
  const instructorId = searchParams.get('instructor_id');
  const dayOfWeek = searchParams.get('day_of_week');

  if (instructorId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(instructorId)) {
    return NextResponse.json({ error: 'Invalid instructor ID format' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
  }

  if (dayOfWeek !== null) {
    const dayNum = parseInt(dayOfWeek, 10);
    if (isNaN(dayNum) || dayNum < 0 || dayNum > 6) {
      return NextResponse.json({ error: 'Invalid day_of_week parameter' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
    }
  }

  let query = db
    .from('classes')
    .select(`id, title, description, yoga_style, level, duration_minutes, capacity, price, is_recurring, created_at, instructors(id, name, avatar_url, specialties), class_schedules(id, day_of_week, start_time, end_time, location)`);

  if (instructorId) query = query.eq('instructor_id', instructorId);

  const { data: classes, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to retrieve classes' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  let filtered = classes;
  if (dayOfWeek !== null) {
    filtered = classes?.filter((c: any) =>
      c.class_schedules?.some((s: any) => s.day_of_week === parseInt(dayOfWeek!))
    ) || [];
  }

  return NextResponse.json({ classes: filtered }, { headers: corsHeaders(request.headers.get('origin')) });
}

export async function POST(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const rlRes = await checkRateLimit(request, 'class:create');
  if (rlRes) return rlRes;

  const authResult = await requireRole(request, ['admin', 'instructor']);
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

  const validation = classSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.issues.map(i => i.message) },
      { status: 400, headers: corsHeaders(request.headers.get('origin')) }
    );
  }

  const { instructor_id, title, description, yoga_style, level, duration_minutes, capacity, price, is_recurring } = validation.data;

  const { data, error } = await db
    .from('classes')
    .insert({ instructor_id, title, description, yoga_style, level, duration_minutes, capacity, price, is_recurring })
    .select('id, title, description, yoga_style, level, duration_minutes, capacity, price, is_recurring, created_at')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  return NextResponse.json(data, { status: 201, headers: corsHeaders(request.headers.get('origin')) });
}
