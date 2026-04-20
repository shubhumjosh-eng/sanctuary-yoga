"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/courses";

export default function TestimonialsPage() {
  return (
    <div className="pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Testimonials
          </p>
          <h1 className="font-serif text-display-lg text-charcoal mb-4">
            What Our Students Say
          </h1>
          <p className="font-sans text-charcoal/60 max-w-2xl mx-auto text-lg">
            Real stories from our graduates around the world.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-sage">★</span>
                ))}
              </div>
              
              {/* Text */}
              <p className="font-sans text-charcoal/70 mb-6 italic">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                  <span className="font-sans text-sage text-sm">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-sans font-medium text-charcoal">{testimonial.name}</p>
                  <p className="font-sans text-xs text-charcoal/50">{testimonial.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-charcoal rounded-2xl p-8 text-center">
            <p className="font-serif text-4xl text-white mb-2">500+</p>
            <p className="font-sans text-white/60">Students Trained</p>
          </div>
          <div className="bg-charcoal rounded-2xl p-8 text-center">
            <p className="font-serif text-4xl text-white mb-2">50+</p>
            <p className="font-sans text-white/60">Countries</p>
          </div>
          <div className="bg-charcoal rounded-2xl p-8 text-center">
            <p className="font-serif text-4xl text-white mb-2">4.9</p>
            <p className="font-sans text-white/60">Average Rating</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}