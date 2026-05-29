import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { checkoutSchema } from '@/lib/validation';
import { checkRateLimit, corsHeaders, handleCors } from '@/lib/security';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2025-08-27.basil' }) : null;

const priceMap: Record<string, number> = {
  dropin: 3200,
  membership: 18000,
  private: 14500,
  intro: 7500,
};

const nameMap: Record<string, string> = {
  dropin: 'Drop-in Class',
  membership: 'Monthly Membership',
  private: 'Private Session',
  intro: 'Intro Offer (3 Classes)',
};

export async function POST(request: Request) {
  const corsRes = handleCors(request);
  if (corsRes) return corsRes;

  const rlRes = await checkRateLimit(request, 'checkout:create');
  if (rlRes) return rlRes;

  if (!stripe) {
    return NextResponse.json({ error: 'Payment service not configured' }, { status: 503, headers: corsHeaders(request.headers.get('origin')) });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400, headers: corsHeaders(request.headers.get('origin')) });
  }

  const validation = checkoutSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.issues.map(i => i.message) },
      { status: 400, headers: corsHeaders(request.headers.get('origin')) }
    );
  }

  const { mode, session, teacher, time, class_schedule_id, class_date, student_name, student_email, student_phone, price } = validation.data;

  const finalPrice = price ? Math.round(price * 100) : priceMap[mode] || 3200;
  const itemName = session
    ? `${session}${teacher ? ` with ${teacher}` : ''}${time ? ` at ${time}` : ''}`
    : nameMap[mode] || 'Yoga Class';

  const origin = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'http://localhost:3000';

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: itemName, description: 'Sanctuary Yoga Studio booking' },
          unit_amount: finalPrice,
        },
        quantity: 1,
      }],
      success_url: `${origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        mode,
        session: session || '',
        teacher: teacher || '',
        time: time || '',
        class_schedule_id: class_schedule_id || '',
        class_date: class_date || '',
        student_name: student_name || '',
        student_email: student_email || '',
        student_phone: student_phone || '',
      },
    });

    return NextResponse.json({ url: checkoutSession.url }, { headers: corsHeaders(request.headers.get('origin')) });
  } catch {
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500, headers: corsHeaders(request.headers.get('origin')) });
  }
}
