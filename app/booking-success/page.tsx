import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id   } = await searchParams;

  let session: any = null;
  if (session_id) {
    const { default: Stripe } = await import("stripe");
    const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-08-27.basil",
    });
    session = await stripeClient.checkout.sessions.retrieve(session_id);
  }

  return (
    <section className="min-h-screen bg-linen text-charcoal px-6 py-24 md:px-10">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-sage"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
          Booking confirmed
        </p>
        <h1 className="font-serif text-display-md text-charcoal">
          Thank you for your booking!
        </h1>
        <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal/70">
          Your reservation has been confirmed and a confirmation email has been
          sent to {session?.customer_email || "your email"}.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-4 text-sm font-sans text-white tracking-[0.08em] hover:bg-[#a36b5a] transition-colors duration-300"
          >
            Back to homepage
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center rounded-full border border-charcoal/10 bg-white px-8 py-4 text-sm font-sans text-charcoal tracking-[0.08em] hover:bg-charcoal/5 transition-colors duration-300"
          >
            Book another class
          </Link>
        </div>
      </div>
    </section>
  );
}
