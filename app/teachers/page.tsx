"use client";

import { motion } from "framer-motion";
import { teachers } from "@/data/courses";

export default function TeachersPage() {
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
            Our Team
          </p>
          <h1 className="font-serif text-display-lg text-charcoal mb-4">
            Expert Teachers
          </h1>
          <p className="font-sans text-charcoal/60 max-w-2xl mx-auto text-lg">
            Learn from experienced teachers with decades of combined experience 
            in traditional and modern yoga practices.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, idx) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-sage/30 to-terracotta/30 flex items-center justify-center">
                <span className="font-serif text-6xl text-sage/40">{teacher.name.charAt(0)}</span>
              </div>
              
              {/* Info */}
              <div className="p-6">
                <p className="font-sans text-xs text-sage uppercase tracking-wider mb-1">
                  {teacher.experience}
                </p>
                <h3 className="font-serif text-xl text-charcoal mb-1">
                  {teacher.name}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 mb-4">
                  {teacher.title}
                </p>
                <p className="font-sans text-sm text-charcoal/70 mb-4 line-clamp-3">
                  {teacher.bio}
                </p>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.slice(0, 3).map((spec, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-stone/20 px-2 py-1 rounded-full text-charcoal/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10+", label: "Courses" },
            { number: "20+", label: "Teachers" },
            { number: "10+", label: "Years Experience" },
            { number: "5★", label: "Rating" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-4xl text-sage mb-2">{stat.number}</p>
              <p className="font-sans text-sm text-charcoal/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}