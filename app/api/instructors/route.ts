import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const active = searchParams.get('active');

  let query = supabase
    .from('instructors')
    .select('*');

  if (active !== 'false') {
    query = query.eq('is_active', true);
  }

  const { data: instructors, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(instructors);
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { name, email, phone, bio, specialties, hourly_rate } = body;

  const { data, error } = await supabase
    .from('instructors')
    .insert({
      name,
      email,
      phone,
      bio,
      specialties,
      hourly_rate,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}