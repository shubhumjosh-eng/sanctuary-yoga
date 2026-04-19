"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

const plans = [
  {
    name: "Drop-in",
    price: "32",
    period: "per class",
    description: "For the curious and the occasional visitor. No commitment required.",
    features: ["Single class access", "All class types", "Mat & props included", "Intro offer: 3 for $75"],
    cta: "Book a class",
    highlight: false,
  },
  {
    name: "Membership",
    price: "180",
    period: "per month",
    description: "Our most popular path. Unlimited access to the full weekly schedule.",
    features: [
      "Unlimited group classes",
      "2 guest passes / month",
      "10% off private sessions",
      "Priority booking",
      "Workshop discounts",
    ],
    cta: "Start membership",
    highlight: true,
  },
  {
    name: "Private",
    price: "145",
    period: "per session",
    description: "One-to-one sessions tailored entirely to your body, goals, and practice.",
    features: [
      "60 or 90 min sessions",
      "Choose your teacher",
      "Personalised sequence",
      "Flexible scheduling",
    ],
    cta: "Enquire",
    highlight: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();

  return (
    <section id="pricing" className="py-24 md:py-36 bg-charcoal/[0.02]">
      <div ref={ref} className="px-6 md:px-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4"
          >
            Investment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-md text-charcoal max-w-xl"
          >
            Your practice,<br />your terms.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-8 md:p-10 rounded-2xl transition-all duration-300 ${
                plan.highlight
                  ? "bg-charcoal text-linen"
                  : "bg-linen border border-[rgba(28,28,28,0.08)] hover:border-[rgba(28,28,28,0.16)]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-terracotta text-white text-xs font-sans tracking-wide">
                  Most popular
                </span>
              )}

              <div className="mb-8">
                <p className={`font-sans text-xs tracking-[0.15em] uppercase mb-4 ${plan.highlight ? "text-linen/50" : "text-charcoal/40"}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`font-serif text-5xl ${plan.highlight ? "text-linen" : "text-charcoal"}`}>${plan.price}</span>
                  <span className={`font-sans text-sm ${plan.highlight ? "text-linen/50" : "text-charcoal/40"}`}>{plan.period}</span>
                </div>
                <p className={`font-sans text-sm leading-relaxed ${plan.highlight ? "text-linen/60" : "text-charcoal/60"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 text-[9px] ${
                      plan.highlight ? "border-sage/60 text-sage" : "border-stone text-charcoal/40"
                    }`}>✓</span>
                    <span className={`font-sans text-sm ${plan.highlight ? "text-linen/70" : "text-charcoal/70"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push(`/cart?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`)}
                className={`w-full py-3.5 rounded-full font-sans text-sm tracking-[0.06em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-terracotta text-white hover:bg-[#a36b5a]"
                    : "border border-[rgba(28,28,28,0.15)] text-charcoal hover:bg-stone/30"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center font-sans text-xs text-charcoal/30 mt-10 tracking-wide"
        >
          Intro offer: First class $16 · Corporate wellness packages available
        </motion.p>
      </div>
    </section>
  );
}
