import { NextResponse } from "next/server";

// This is a demo endpoint - in production, you'd connect to a database or email service
// For now, it just logs the booking and returns success

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.service || !body.date || !body.time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Save to a database (Supabase, PostgreSQL, etc.)
    // 2. Send confirmation email using Resend, SendGrid, etc.
    // 3. Add to Google Calendar
    
    // For demo, we just log and return success
    console.log("New booking received:", body);
    
    return NextResponse.json({
      success: true,
      message: "Booking request received! We'll confirm within 24 hours.",
      bookingId: `BK${Date.now()}`
    });
    
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

// Handle GET requests
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