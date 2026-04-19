"use client";

import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="h-64 bg-stone/20 animate-pulse rounded-2xl mb-5" />
      <div className="h-6 w-3/4 bg-stone/20 animate-pulse rounded mb-3" />
      <div className="h-4 w-1/4 bg-stone/20 animate-pulse rounded mb-4" />
      <div className="h-4 w-full bg-stone/20 animate-pulse rounded mb-2" />
      <div className="h-4 w-2/3 bg-stone/20 animate-pulse rounded" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-4 w-20 bg-stone/20 animate-pulse rounded mb-4" />
          <div className="h-12 w-2/3 bg-stone/20 animate-pulse rounded mb-6" />
          <div className="h-6 w-full max-w-xl bg-stone/20 animate-pulse rounded mb-16" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <SkeletonCard />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}