import Link from "next/link";
import PayNowButton from "@/components/checkout/PayNowButton";

function getFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    plan?: string | string[];
    price?: string | string[];
    session?: string | string[];
    teacher?: string | string[];
    time?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const plan = getFirst(params.plan);
  const price = getFirst(params.price);
  const session = getFirst(params.session);
  const teacher = getFirst(params.teacher);
  const time = getFirst(params.time);

  const itemName = session
    ? `${session}${teacher ? ` with ${teacher}` : ""}${time ? ` at ${time}` : ""}`
    : plan
    ? plan
    : "Your booking";

  const amount = price
    ? price
    : plan === "Membership"
    ? "180"
    : plan === "Private"
    ? "145"
    : plan === "Intro offer"
    ? "75"
    : "32";

  return (
    <section className="min-h-screen bg-charcoal/5 text-charcoal px-6 py-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">Checkout</p>
        <h1 className="font-serif text-display-md text-charcoal">Secure payment</h1>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm border border-[rgba(28,28,28,0.08)]">
          <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage mb-3">Booking details</p>
              <h2 className="font-serif text-3xl text-charcoal">{itemName}</h2>
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-charcoal/70">
                Complete your booking and confirm your reservation. This page is the last step before payment.
              </p>
              {time || teacher ? (
                <div className="mt-6 space-y-2 text-sm text-charcoal/70">
                  {time && <p>Time: {time}</p>}
                  {teacher && <p>Teacher: {teacher}</p>}
                  {plan && <p>Plan: {plan}</p>}
                </div>
              ) : null}
            </div>

            <div className="rounded-3xl bg-charcoal/5 p-6 flex flex-col justify-between">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/50">Order total</p>
                <p className="mt-4 font-serif text-5xl text-charcoal">${amount}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <PayNowButton />
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center rounded-full border border-charcoal/10 bg-white px-6 py-3 text-sm font-sans text-charcoal tracking-[0.08em] hover:bg-charcoal/5 transition-colors duration-300"
                >
                  Back to cart
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-dashed border-charcoal/15 bg-charcoal/5 p-6">
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
              Note: This is currently a checkout flow placeholder. To accept real payments, integrate a payment provider such as Stripe and connect your booking backend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
