"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BookingWidgetProps {
  companyId?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
}

export default function BookingWidget({
  companyId = "demo",
  backgroundColor = "#FFFFFF",
  textColor = "#1C1C1C",
  buttonColor = "#7C8B7A",
}: BookingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openBooking = () => {
    setIsLoading(true);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      {/* Booking Button */}
      <button
        onClick={openBooking}
        style={{ backgroundColor: buttonColor }}
        className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-sans text-sm tracking-wider hover:opacity-90 transition-opacity duration-300"
      >
        Book a Class
      </button>

      {/* Booking Modal/Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(28, 28, 28, 0.8)" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl h-[80vh] md:h-[80vh] rounded-2xl overflow-hidden"
            style={{ backgroundColor }}
          >
            {/* Close button */}
            <button
              onClick={closeBooking}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: textColor }}
              aria-label="Close booking"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Picktime Embed - Replace 'demo' with your actual company ID */}
            {isLoading && (
              <iframe
                src={`https://www.picktime.com/${companyId}?embed=true`}
                className="w-full h-full border-0"
                style={{ backgroundColor }}
                title="Book a Yoga Class"
                allow="camera; microphone; autoplay; clipboard-write; encrypted-media"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

/**
 * HOW TO SET UP PICKTIME (Free Forever):
 * 
 * 1. Go to https://picktime.com and sign up for free
 * 2. Create your business account
 * 3. Set up your services (yoga classes, private sessions)
 * 4. Set your availability hours
 * 5. Copy your company ID from the booking page URL
 *    (e.g., from picktime.com/YOUR_COMPANY_ID)
 * 6. Replace 'demo' in the companyId prop with your company ID
 * 
 * ALTERNATIVES:
 * - Calendly: Replace iframe src with `https://calendly.com/YOUR_LINK`
 * - Square Appointments: Use their embed code
 * - Acuity Scheduling: Use their scheduling widget
 */