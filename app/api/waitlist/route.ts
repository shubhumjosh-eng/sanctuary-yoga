import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, style, instagram, bio } = body;

    if (!name || !email || !style || !bio) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In production, store to Supabase or forward to email
    console.log("[Waitlist]", { name, email, style, instagram, bio });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
