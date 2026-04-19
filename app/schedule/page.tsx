"use client";

import SimpleBookingForm from "@/components/global/SimpleBookingForm";
import { motion } from "framer-motion";
import Link from "next/link";

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
          Schedule your yoga session directly below. Choose from our variety of classes 
          taught by San Francisco's finest independent instructors.
        </p>

        {/* Simple Booking Form */}
        <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <SimpleBookingForm />
        </div>

        {/* Direct contact alternative */}
        <div className="mt-12 p-6 rounded-2xl bg-stone/20 max-w-xl mx-auto">
          <h2 className="font-serif text-xl text-charcoal mb-4">
            Prefer to book directly?
          </h2>
          <p className="font-sans text-charcoal/60 mb-4">
            Email us your preferred session type, date, and time. We'll confirm within 24 hours.
          </p>
          <Link
            href="mailto:hello@sanctuary-yoga.com?subject=Yoga%20Session%20Booking%20Request&body=Name:%20%0D%0AEmail:%20%0D%0APhone:%20%0D%0ASession:%20%0D%0ADate:%20%0D%0ATime:%20%0D%0ANotes:"
            className="inline-flex items-center px-6 py-3 rounded-full bg-charcoal text-linen font-sans text-sm tracking-wider hover:bg-sage transition-colors"
          >
            Email to Book
          </Link>
        </div>
      </motion.div>
    </div>
  );
}