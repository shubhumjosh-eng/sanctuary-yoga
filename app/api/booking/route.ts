import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const SERVICE_NAMES: Record<string, string> = {
  vinyasa: "Vinyasa Flow",
  yin: "Yin Yoga",
  restore: "Restorative",
  private: "Private Session",
  sound: "Sound Healing",
  meditation: "Meditation"
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

// Mock handler when Resend is not configured
async function mockBookingHandler(body: BookingRequest) {
  const serviceName = SERVICE_NAMES[body.service] || body.service;
  const bookingId = `BK${Date.now()}`;
  const formattedDate = new Date(body.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  console.log("\n=== NEW BOOKING ===");
  console.log("ID:", bookingId);
  console.log("Service:", serviceName);
  console.log("Date:", formattedDate);
  console.log("Time:", body.time);
  console.log("Student:", body.name);
  console.log("Email:", body.email);
  console.log("Phone:", body.phone || "Not provided");
  console.log("Notes:", body.notes || "None");
  console.log("==================\n");
  
  return {
    success: true,
    message: "Booking request received! Check server logs or configure email.",
    bookingId
  };
}

// Email sender
async function sendBookingEmails(body: BookingRequest, bookingId: string) {
  const serviceName = SERVICE_NAMES[body.service] || body.service;
  const formattedDate = new Date(body.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Send email to teacher
  await resend!.emails.send({
    from: "Sanctuary Bookings <bookings@sanctuary-yoga.com>",
    to: "hello@sanctuary-yoga.com",
    subject: `New Booking: ${body.name} - ${serviceName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #1C1C1C;">New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666;">Booking ID</td><td style="padding: 8px 0;"><strong>${bookingId}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0;">${serviceName}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0;">${formattedDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Time</td><td style="padding: 8px 0;">${body.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Student</td><td style="padding: 8px 0;">${body.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${body.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${body.phone || 'Not provided'}</td></tr>
          ${body.notes ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Notes</td><td style="padding: 8px 0;">${body.notes}</td></tr>` : ''}
        </table>
      </div>
    `
  });

  // Send confirmation to student
  await resend!.emails.send({
    from: "Sanctuary Yoga <bookings@sanctuary-yoga.com>",
    to: body.email,
    subject: "Your Booking Request - Sanctuary Yoga",
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #1C1C1C;">Hi ${body.name.split(' ')[0]},</h2>
        <p>We've received your booking request!</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0;"><strong>${serviceName}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date & Time</td><td style="padding: 8px 0;">${formattedDate} at ${body.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Confirmation #</td><td style="padding: 8px 0;">${bookingId}</td></tr>
        </table>
        <p>We'll confirm your session within 24 hours.</p>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">See you on the mat!<br/>Sanctuary Yoga</p>
      </div>
    `
  });
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();
    
    if (!body.name || !body.email || !body.service || !body.date || !body.time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bookingId = `BK${Date.now()}`;

    // If Resend is configured, send emails
    if (resend) {
      await sendBookingEmails(body, bookingId);
      return NextResponse.json({
        success: true,
        message: "Booking request received! Check your email for confirmation.",
        bookingId
      });
    }
    
    // Otherwise just log and return success
    const result = await mockBookingHandler(body);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Booking API is running",
    services: [
      { id: "vinyasa", name: "Vinyasa Flow", price: 32 },
      { id: "yin", name: "Yin Yoga", price: 32 },
      { id: "restore", name: "Restorative", price: 28 },
      { id: "private", name: "Private Session", price: 100 },
      { id: "sound", name: "Sound Healing", price: 45 },
      { id: "meditation", name: "Meditation", price: 20 }
    ]
  });
}