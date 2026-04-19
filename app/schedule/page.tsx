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
        <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed mb-4">
          Schedule your yoga session directly below. Choose from our variety of classes 
          taught by San Francisco's finest independent instructors.
        </p>

        {/* Email option - more visible */}
        <div className="mb-8">
          <Link
            href="mailto:hello@sanctuary-yoga.com?subject=Yoga%20Session%20Booking&body=Name:%20%0D%0AEmail:%20%0D%0APhone:%20%0D%0ASession%20Type:%20%0D%0APreferred%20Date:%20%0D%0APreferred%20Time:%20%0D%0ANotes:"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Or email us directly
          </Link>
        </div>

        {/* Simple Booking Form */}
        <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <SimpleBookingForm />
        </div>
      </motion.div>
    </div>
  );
}