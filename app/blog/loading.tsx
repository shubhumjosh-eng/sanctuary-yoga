"use client";

import { motion } from "framer-motion";

function SkeletonPost() {
  return (
    <div className="flex gap-6 p-6 border-b border-[rgba(28,28,28,0.08)]">
      <div className="w-32 h-24 bg-stone/20 animate-pulse rounded-lg flex-shrink-0" />
      <div className="flex-1">
        <div className="h-3 w-16 bg-stone/20 animate-pulse rounded mb-2" />
        <div className="h-6 w-3/4 bg-stone/20 animate-pulse rounded mb-2" />
        <div className="h-4 w-full bg-stone/20 animate-pulse rounded mb-2" />
        <div className="h-4 w-2/3 bg-stone/20 animate-pulse rounded" />
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-4 w-20 bg-stone/20 animate-pulse rounded mb-4" />
          <div className="h-12 w-2/3 bg-stone/20 animate-pulse rounded mb-6" />
          <div className="h-6 w-full max-w-lg bg-stone/20 animate-pulse rounded mb-16" />
        </motion.div>

        <div className="bg-white rounded-3xl border border-[rgba(28,28,28,0.08)] overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonPost key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}