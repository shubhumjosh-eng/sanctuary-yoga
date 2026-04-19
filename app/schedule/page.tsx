"use client";

import BookingWidget from "@/components/global/BookingWidget";
import { motion } from "framer-motion";

export default function SchedulePage() {
  return (
    <div className="pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-10 max-w-7xl mx-auto"
      >
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
          Schedule
        </p>
        <h1 className="font-serif text-display-lg text-charcoal mb-6">
          Book Your Practice
        </h1>
        <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed mb-12">
          Schedule your yoga session below. Choose from our variety of classes 
          taught by San Francisco's finest independent instructors.
        </p>

        {/* Booking Widget */}
        <div className="w-full min-h-[600px] rounded-2xl overflow-hidden bg-white shadow-lg">
          <BookingWidget 
            companyId="demo" 
            buttonColor="#B87B6A"
          />
        </div>

        {/* Alternative booking methods */}
        <div className="mt-12 p-6 rounded-2xl bg-stone/20">
          <h2 className="font-serif text-xl text-charcoal mb-4">
            Need to book a private session?
          </h2>
          <p className="font-sans text-charcoal/60 mb-4">
            For private sessions with specific teachers, we recommend reaching out directly.
          </p>
          <a
            href="mailto:hello@sanctuary-yoga.com?subject=Private%20Yoga%20Session%20Inquiry"
            className="inline-flex items-center px-6 py-3 rounded-full bg-charcoal text-linen font-sans text-sm tracking-wider hover:bg-sage transition-colors"
          >
            Email for Private Sessions
          </a>
        </div>
      </motion.div>
    </div>
  );
}