"use client";

import SimpleBookingForm from "@/components/global/SimpleBookingForm";
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
        <h1 className="font-serif text-display-lg text-charcoal mb-4">
          Book Your Practice
        </h1>
        <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed mb-8">
          Choose your session below. Fill in your details and we'll confirm within 24 hours.
        </p>

        {/* Simple Booking Form */}
        <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <SimpleBookingForm />
        </div>
      </motion.div>
    </div>
  );
}