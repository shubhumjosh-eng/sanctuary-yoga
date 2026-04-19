"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <p className="font-serif text-9xl text-terracotta/5 mb-4">500</p>
        <h1 className="font-serif text-display-md text-charcoal mb-4">Something went wrong</h1>
        <p className="font-sans text-charcoal/50 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex px-8 py-3 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}