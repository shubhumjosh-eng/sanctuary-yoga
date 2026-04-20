"use client";

import { motion } from "framer-motion";
import { courses } from "@/data/courses";
import Link from "next/link";

export default function CoursesPage() {
  const teacherTraining = courses.filter(c => c.id.includes("ttc"));
  const retreats = courses.filter(c => c.id.includes("retreat"));

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
            Programs
          </p>
          <h1 className="font-serif text-display-lg text-charcoal mb-4">
            Yoga Teacher Training
          </h1>
          <p className="font-sans text-charcoal/60 max-w-2xl mx-auto text-lg">
            Transform your life with our authentic yoga teacher training programs. 
            certified by Yoga Alliance USA.
          </p>
        </div>

        {/* Teacher Training Courses */}
        <div className="mb-20">
          <h2 className="font-serif text-2xl text-charcoal mb-8 text-center">
            Teacher Training Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherTraining.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-sage/20 to-terracotta/20 flex items-center justify-center">
                  <span className="font-serif text-4xl text-sage/40">{course.shortTitle}</span>
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs text-sage uppercase tracking-wider mb-2">
                    {course.certification}
                  </p>
                  <h3 className="font-serif text-xl text-charcoal mb-2">
                    {course.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/60 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm font-sans text-charcoal/60 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-2xl text-charcoal font-medium">
                      ${course.price}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="px-4 py-2 bg-sage text-white rounded-lg font-sans text-sm hover:bg-sage/90 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Retreats */}
        <div>
          <h2 className="font-serif text-2xl text-charcoal mb-8 text-center">
            Wellness Retreats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {retreats.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/20 to-sage/20 flex items-center justify-center">
                  <span className="font-serif text-3xl text-terracotta/40">{course.duration}</span>
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs text-terracotta uppercase tracking-wider mb-2">
                    Wellness Retreat
                  </p>
                  <h3 className="font-serif text-xl text-charcoal mb-2">
                    {course.shortTitle}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/60 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-2xl text-charcoal font-medium">
                      ${course.price}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="px-4 py-2 bg-terracotta text-white rounded-lg font-sans text-sm hover:bg-terracotta/90 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center p-12 bg-charcoal rounded-2xl">
          <h3 className="font-serif text-2xl text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="font-sans text-white/60 mb-6 max-w-lg mx-auto">
            Have questions? Our team is here to help you choose the right program.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-sage text-white rounded-lg font-sans hover:bg-sage/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}