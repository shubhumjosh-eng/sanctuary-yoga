"use client";

import { motion } from "framer-motion";

export default function CartLoading() {
  return (
    <section className="min-h-screen bg-linen text-charcoal px-6 py-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <div className="h-3 w-24 bg-stone/20 animate-pulse rounded mb-4" />
          <div className="h-10 w-32 bg-stone/20 animate-pulse rounded mb-4" />
        </motion.div>

        <div className="mt-10 rounded-3xl border border-[rgba(28,28,28,0.08)] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="h-3 w-28 bg-stone/20 animate-pulse rounded mb-2" />
              <div className="h-8 w-48 bg-stone/20 animate-pulse rounded mb-3" />
              <div className="h-4 w-72 bg-stone/20 animate-pulse rounded" />
            </div>
            <div className="rounded-3xl bg-charcoal/5 px-6 py-5">
              <div className="h-3 w-16 bg-stone/20 animate-pulse rounded mb-3" />
              <div className="h-10 w-20 bg-stone/20 animate-pulse rounded" />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <div className="h-12 w-44 bg-stone/20 animate-pulse rounded-full" />
            <div className="h-12 w-44 bg-stone/20 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}