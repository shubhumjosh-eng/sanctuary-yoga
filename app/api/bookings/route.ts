import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { bookingSchema } from '@/lib/validation';
import { checkRateLimit, corsHeaders, handleCors, validateBookingOwnership } from '@/lib/security';
import { requireAuth, requireRole } from '@/lib/auth-middleware';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const isConfigured = supabaseUrl && supabaseServiceKey;

async function getDb() {
  if (!isConfigured) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

async function sendBookingEmail(booking: any, classDetails: any, instructor: any, type: 'confirmation' | 'notification') {
  const emailUser = process.env.EMAIL_USER;
  if (!emailUser || !process.env.EMAIL_APP_PASSWORD) return;

  const sanitizedStudentName = (booking.student_name || 'Guest').replace(/[<>]/g, '').trim();
  const sanitizedClassTitle = (classDetails?.title || 'Yoga Class').replace(/[<>]/g, '').trim();
  const sanitizedInstructorName = (instructor?.name || 'TBD').replace(/[<>]/g, '').trim();
  const sanitizedLocation = (classDetails?.location || 'Main Studio').replace(/[<>]/g, '').trim();

  const subject = type === 'confirmation'
    ? `Booking Confirmed - ${sanitizedClassTitle}`
    : `New Booking Request - ${sanitizedClassTitle}`;

  const html = type === 'confirmation' ? `
    <h2>Your booking is confirmed!</h2>
    <p>Hi ${sanitizedStudentName},</p>
    <p>Your booking for <strong>${sanitizedClassTitle}</strong> has been confirmed.</p>
    <h3>Class Details:</h3>
    <ul>
      <li><strong>Date:</strong> ${booking.class_date}</li>
      <li><strong>Time:</strong> ${classDetails?.start_time || ''} - ${classDetails?.end_time || ''}</li>
      <li><strong>Location:</strong> ${sanitizedLocation}</li>
      <li><strong>Instructor:</strong> ${sanitizedInstructorName}</li>
    </ul>
    <p>Please arrive 10 minutes early. Bring your mat and water bottle.</p>
    <p>Questions? Reply to this email.</p>
    <p>Warm regards,<br>Sanctuary Yoga Studio</p>
  ` : `
    <h2>New Booking Request</h2>
    <p>You have a new booking request from <strong>${sanitizedStudentName}</strong>.</p>
    <h3>Student Details:</h3>
    <ul>
      <li><strong>Name:</strong> ${sanitizedStudentName}</li>
      <li><strong>Email:</strong> ${booking.student_email}</li>
      <li><strong>Phone:</strong> ${booking.student_phone || 'Not provided'}</li>
    </ul>
    <h3>Class:</h3>
    <ul>
      <li><strong>Class:</strong> ${sanitizedClassTitle}</li>
      <li><strong>Date:</strong> ${booking.class_date}</li>
      <li><strong>Time:</strong> ${classDetails?.start_time || ''} - ${classDetails?.end_time || ''}</li>
    </ul>
    <p>Log in to your instructor dashboard to confirm or decline this booking.</p>
  `;

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: emailUser,
      to: type === 'confirmation' ? booking.student_email : emailUser,
      subject,
      html,
    });
  } catch {
    // Silently fail
  }
}

export async function GET(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const rlRes = await checkRateLimit(request, 'booking:read');
  if (rlRes) return rlRes;

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503, headers: corsHeaders(request.headers.get('origin')) });
  }

  const { data: bookings, error } = await db
    .from('bookings')
    .select(`
      id, class_schedule_id, class_date, student_name, student_email, status, payment_status, amount_paid, booked_at,
      class_schedules(id, day_of_week, start_time, end_time, location,
        classes(id, title, yoga_style, instructors(id, name))
      )
    `)
    .order('booked_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to retrieve bookings' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  return NextResponse.json(bookings, { headers: corsHeaders(request.headers.get('origin')) });
}

export async function POST(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const rlRes = await checkRateLimit(request, 'booking:create');
  if (rlRes) return rlRes;

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

  const validation = bookingSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.issues.map(i => i.message) },
      { status: 400, headers: corsHeaders(request.headers.get('origin')) }
    );
  }

  const { class_schedule_id, student_name, student_email, student_phone, notes, class_date } = validation.data;

  const { data: scheduleData, error: scheduleError } = await db
    .from('class_schedules')
    .select(`*, classes(id, title, description, price, instructors(id, name, email))`)
    .eq('id', class_schedule_id)
    .single();

  if (scheduleError || !scheduleData) {
    return NextResponse.json({ error: 'Class schedule not found' }, { status: 404, headers: corsHeaders(request.headers.get('origin')) });
  }

  const classDetails = scheduleData.classes;
  const instructor = classDetails?.instructors;

  const { data: existing } = await db
    .from('bookings')
    .select('id')
    .eq('class_schedule_id', class_schedule_id)
    .eq('student_email', student_email)
    .eq('class_date', class_date)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'You have already booked this class' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
  }

  const { data: booking, error } = await db
    .from('bookings')
    .insert({
      class_schedule_id,
      class_date,
      student_name,
      student_email,
      student_phone,
      notes,
      status: 'confirmed',
      amount_paid: classDetails?.price || 25,
    })
    .select('id, class_schedule_id, class_date, student_name, student_email, status, amount_paid, booked_at')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  await sendBookingEmail(booking, scheduleData, instructor, 'confirmation');
  await sendBookingEmail(booking, scheduleData, instructor, 'notification');

  return NextResponse.json(booking, { status: 201, headers: corsHeaders(request.headers.get('origin')) });
}

export async function PATCH(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const rlRes = await checkRateLimit(request, 'booking:update');
  if (rlRes) return rlRes;

  const authResult = await requireAuth(request);
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

  const { id, status, payment_status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'Missing required fields: id, status' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
  }

  const validStatuses = ['pending', 'confirmed', 'cancelled', 'declined'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
  }

  const userEmail = authResult.user.email;
  const isAdmin = authResult.user.role === 'admin';

  if (!isAdmin) {
    const ownsBooking = await validateBookingOwnership(id, userEmail);
    if (!ownsBooking) {
      return NextResponse.json({ error: 'You can only update your own bookings' }, { status: 403, headers: corsHeaders(request.headers.get('origin')) });
    }
  }

  const updates: any = { updated_at: new Date().toISOString(), status };
  if (payment_status) {
    const validPaymentStatuses = ['pending', 'paid', 'refunded', 'failed'];
    if (validPaymentStatuses.includes(payment_status)) {
      updates.payment_status = payment_status;
    }
  }

  const { data, error } = await db
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select('id, class_schedule_id, class_date, student_name, student_email, status, payment_status, amount_paid, booked_at')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }

  return NextResponse.json(data, { headers: corsHeaders(request.headers.get('origin')) });
}
