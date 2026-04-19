import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const instructorId = searchParams.get('instructor_id');
  const dayOfWeek = searchParams.get('day_of_week');

  let query = supabase
    .from('classes')
    .select(`
      *,
      instructors(id, name, avatar_url, specialties),
      class_schedules(id, day_of_week, start_time, end_time, location)
    `);

  if (instructorId) {
    query = query.eq('instructor_id', instructorId);
  }

  const { data: classes, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message, details: 'Database query failed' }, { status: 500 });
  }

  console.log('[Classes API] Found:', classes?.length, 'classes');

  let filtered = classes;
  if (dayOfWeek !== null) {
    filtered = classes?.filter((c: any) =>
      c.class_schedules?.some((s: any) => s.day_of_week === parseInt(dayOfWeek!))
    ) || [];
  }

  return NextResponse.json({ classes: filtered, debug: { count: filtered?.length || 0 } });
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { instructor_id, title, description, yoga_style, level, duration_minutes, capacity, price, is_recurring } = body;

  const { data, error } = await supabase
    .from('classes')
    .insert({
      instructor_id,
      title,
      description,
      yoga_style,
      level,
      duration_minutes,
      capacity,
      price,
      is_recurring
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}