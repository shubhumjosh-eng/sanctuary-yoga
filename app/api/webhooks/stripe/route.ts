import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2025-08-27.basil' }) : null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function getDb() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !stripe || !stripeWebhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  // Idempotency: check if we've already processed this Stripe event
  const { data: existingEvent } = await db
    .from('webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single();

  if (existingEvent) {
    return NextResponse.json({ received: true });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const {
      student_email,
      class_schedule_id,
      class_date,
      student_name,
      student_phone,
      session: sessionName,
      teacher,
    } = session.metadata || {};

    if (!student_email || !class_schedule_id || !class_date) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    const { data: scheduleData } = await db
      .from('class_schedules')
      .select(`*, classes(id, title, description, price, instructors(id, name, email))`)
      .eq('id', class_schedule_id)
      .single();

    const classDetails = scheduleData?.classes;
    const instructor = classDetails?.instructors;

    const { data: existing } = await db
      .from('bookings')
      .select('id')
      .eq('class_schedule_id', class_schedule_id)
      .eq('student_email', student_email)
      .eq('class_date', class_date)
      .single();

    if (!existing) {
      const { data: booking, error } = await db
        .from('bookings')
        .insert({
          class_schedule_id,
          class_date,
          student_name: student_name || 'Guest',
          student_email,
          student_phone: student_phone || null,
          status: 'confirmed',
          payment_status: 'paid',
          amount_paid: (session.amount_total || 0) / 100,
        })
        .select('id')
        .single();

      if (!error && booking && student_email) {
        const sanitizedStudentName = (student_name || 'there').replace(/[<>]/g, '').trim();
        const sanitizedClassTitle = (classDetails?.title || sessionName || 'Yoga Class').replace(/[<>]/g, '').trim();
        const sanitizedInstructorName = (instructor?.name || teacher || 'TBD').replace(/[<>]/g, '').trim();
        const sanitizedLocation = (scheduleData?.location || 'Main Studio').replace(/[<>]/g, '').trim();

        const html = `
          <h2>Your booking is confirmed!</h2>
          <p>Hi ${sanitizedStudentName},</p>
          <p>Your booking for <strong>${sanitizedClassTitle}</strong> has been confirmed.</p>
          <h3>Class Details:</h3>
          <ul>
            <li><strong>Date:</strong> ${class_date}</li>
            <li><strong>Time:</strong> ${scheduleData?.start_time || ''} - ${scheduleData?.end_time || ''}</li>
            <li><strong>Location:</strong> ${sanitizedLocation}</li>
            <li><strong>Instructor:</strong> ${sanitizedInstructorName}</li>
          </ul>
          <p>Please arrive 10 minutes early. Bring your mat and water bottle.</p>
          <p>Questions? Reply to this email.</p>
          <p>Warm regards,<br>Sanctuary Yoga Studio</p>
        `;

        try {
          const nodemailer = await import('nodemailer');
          const transporter = nodemailer.default.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_APP_PASSWORD },
          });
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: student_email,
            subject: `Booking Confirmed - ${sanitizedClassTitle}`,
            html,
          });
        } catch {
          // Silently fail
        }
      }
    }
  }

  // Record the event for idempotency
  await db.from('webhook_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    processed_at: new Date().toISOString(),
  });

  return NextResponse.json({ received: true });
}
