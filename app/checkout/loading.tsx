"use client";

import { motion } from "framer-motion";

export default function CheckoutLoading() {
  return (
    <section className="min-h-screen bg-charcoal/5 text-charcoal px-6 py-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <div className="h-3 w-24 bg-stone/20 animate-pulse rounded mb-4" />
          <div className="h-10 w-40 bg-stone/20 animate-pulse rounded mb-4" />
        </motion.div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm border border-[rgba(28,28,28,0.08)]">
          <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="h-3 w-24 bg-stone/20 animate-pulse rounded mb-3" />
              <div className="h-9 w-56 bg-stone/20 animate-pulse rounded mb-4" />
              <div className="h-4 w-72 bg-stone/20 animate-pulse rounded mb-6" />
              <div className="h-16 w-full max-w-xs bg-stone/20 animate-pulse rounded" />
            </div>

            <div className="rounded-3xl bg-charcoal/5 p-6">
              <div className="h-3 w-20 bg-stone/20 animate-pulse rounded mb-4" />
              <div className="h-12 w-24 bg-stone/20 animate-pulse rounded mb-6" />
              <div className="h-12 w-full bg-stone/20 animate-pulse rounded mb-3" />
              <div className="h-12 w-full bg-stone/20 animate-pulse rounded" />
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-dashed border-charcoal/15 bg-charcoal/5 p-6">
            <div className="h-4 w-full bg-stone/20 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}