import Link from "next/link";

function getFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CartPage({
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
  const search = await searchParams;
  const plan = getFirst(search.plan);
  const price = getFirst(search.price);
  const session = getFirst(search.session);
  const teacher = getFirst(search.teacher);
  const time = getFirst(search.time);

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

  const urlParams = new URLSearchParams();
  if (plan) urlParams.set("plan", plan);
  if (price) urlParams.set("price", amount);
  if (session) urlParams.set("session", session);
  if (teacher) urlParams.set("teacher", teacher);
  if (time) urlParams.set("time", time);

  const hasItem = Boolean(plan || session);
  const checkoutHref = urlParams.toString() ? `/checkout?${urlParams.toString()}` : "/checkout";

  return (
    <section className="min-h-screen bg-linen text-charcoal px-6 py-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">Your booking cart</p>
        <h1 className="font-serif text-display-md text-charcoal">Cart</h1>

        {hasItem ? (
          <div className="mt-10 rounded-3xl border border-[rgba(28,28,28,0.08)] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage mb-2">Selected booking</p>
                <h2 className="font-serif text-2xl text-charcoal">{itemName}</h2>
                <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-charcoal/70">
                  Review your selection here before you checkout. If you want to change your reservation, head back to the homepage and choose a different offer.
                </p>
              </div>
              <div className="rounded-3xl bg-charcoal/5 px-6 py-5 text-right">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/50">Total</p>
                <p className="mt-3 font-serif text-4xl text-charcoal">${amount}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={checkoutHref}
                className="inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-4 text-sm font-sans text-white tracking-[0.08em] hover:bg-[#a36b5a] transition-colors duration-300"
              >
                Proceed to checkout
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-charcoal/10 bg-white px-8 py-4 text-sm font-sans text-charcoal tracking-[0.08em] hover:bg-charcoal/5 transition-colors duration-300"
              >
                Continue browsing
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-[rgba(28,28,28,0.08)] bg-white p-8 text-center shadow-sm">
            <p className="font-sans text-sm text-charcoal/70">
              You don't have a booking in your cart yet.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-4 text-sm font-sans text-white tracking-[0.08em] hover:bg-[#a36b5a] transition-colors duration-300"
            >
              Explore classes
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
