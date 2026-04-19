import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendBookingEmail(booking: any, classDetails: any, instructor: any, type: 'confirmation' | 'notification') {
  const emailUser = process.env.EMAIL_USER;
  if (!emailUser || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Email credentials not configured');
    return;
  }

  const subject = type === 'confirmation'
    ? `Booking Confirmed - ${classDetails.title}`
    : `New Booking Request - ${classDetails.title}`;

  const html = type === 'confirmation' ? `
    <h2>Your booking is confirmed!</h2>
    <p>Hi ${booking.student_name},</p>
    <p>Your booking for <strong>${classDetails.title}</strong> has been confirmed.</p>
    <h3>Class Details:</h3>
    <ul>
      <li><strong>Date:</strong> ${booking.class_date}</li>
      <li><strong>Time:</strong> ${classDetails.start_time} - ${classDetails.end_time}</li>
      <li><strong>Location:</strong> ${classDetails.location}</li>
      <li><strong>Instructor:</strong> ${instructor?.name || 'TBD'}</li>
    </ul>
    <p>Please arrive 10 minutes early. Bring your mat and water bottle.</p>
    <p>Questions? Reply to this email.</p>
    <p>Warm regards,<br>Sanctuary Yoga Studio</p>
  ` : `
    <h2>New Booking Request</h2>
    <p>You have a new booking request from <strong>${booking.student_name}</strong>.</p>
    <h3>Student Details:</h3>
    <ul>
      <li><strong>Name:</strong> ${booking.student_name}</li>
      <li><strong>Email:</strong> ${booking.student_email}</li>
      <li><strong>Phone:</strong> ${booking.student_phone || 'Not provided'}</li>
    </ul>
    <h3>Class:</h3>
    <ul>
      <li><strong>Class:</strong> ${classDetails.title}</li>
      <li><strong>Date:</strong> ${booking.class_date}</li>
      <li><strong>Time:</strong> ${classDetails.start_time} - ${classDetails.end_time}</li>
    </ul>
    <p>Log in to your instructor dashboard to confirm or decline this booking.</p>
  `;

  const mailOptions = {
    from: emailUser,
    to: type === 'confirmation' ? booking.student_email : emailUser,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
  }
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      class_schedules(
        id,
        day_of_week,
        start_time,
        end_time,
        location,
        classes(
          id,
          title,
          description,
          yoga_style,
          instructors(id, name)
        )
      )
    `)
    .order('booked_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { class_schedule_id, student_name, student_email, student_phone, notes, class_date } = body;

  const { data: scheduleData, error: scheduleError } = await supabase
    .from('class_schedules')
    .select(`
      *,
      classes(
        id,
        title,
        description,
        price,
        instructors(id, name, email)
      )
    `)
    .eq('id', class_schedule_id)
    .single();

  if (scheduleError || !scheduleData) {
    return NextResponse.json({ error: 'Class schedule not found' }, { status: 404 });
  }

  const classDetails = scheduleData.classes;
  const instructor = classDetails?.instructors;

  // Check for duplicate booking
  const { data: existing } = await supabase
    .from('bookings')
    .select('id')
    .eq('class_schedule_id', class_schedule_id)
    .eq('student_email', student_email)
    .eq('class_date', class_date)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'You have already booked this class' }, { status: 400 });
  }

  // Create booking
  const { data: booking, error } = await supabase
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
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send confirmation email to student
  await sendBookingEmail(booking, scheduleData, instructor, 'confirmation');

  // Send notification to instructor
  await sendBookingEmail(booking, scheduleData, instructor, 'notification');

  return NextResponse.json(booking, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { id, status, payment_status } = body;

  const updates: any = { updated_at: new Date().toISOString() };
  if (status) updates.status = status;
  if (payment_status) updates.payment_status = payment_status;

  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}