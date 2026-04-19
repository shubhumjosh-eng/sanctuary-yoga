"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const classTypes = [
  {
    id: "vinyasa",
    name: "Vinyasa Flow",
    description: "A breath-synchronized movement practice connecting postures in seamless, meditative flow. Build strength, flexibility, and presence.",
    duration: "60 min",
    level: "All Levels",
    price: 32,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    schedule: ["Mon/Wed/Fri 7:00 AM", "Tue/Thu 9:30 AM", "Sat 10:00 AM"],
  },
  {
    id: "yin",
    name: "Yin Yoga",
    description: "A slow, floor-based practice targeting deep connective tissue. Poses held for 3-5 minutes to release tension and cultivate stillness.",
    duration: "75 min",
    level: "Beginner Friendly",
    price: 32,
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    schedule: ["Mon/Wed 6:00 PM", "Sun 11:00 AM"],
  },
  {
    id: "meditation",
    name: "Breathwork & Meditation",
    description: "Guided meditation and pranayama techniques to calm the mind, balance the nervous system, and deepen awareness.",
    duration: "45 min",
    level: "All Levels",
    price: 28,
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80",
    schedule: ["Tue/Thu 12:00 PM", "Sat 9:00 AM"],
  },
  {
    id: "sound",
    name: "Sound Healing Journey",
    description: "Immersive sessions with crystal singing bowls, gongs, and tuning forks. Deeply restorative for stress relief and energy alignment.",
    duration: "60 min",
    level: "All Levels",
    price: 45,
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    schedule: ["Fri 7:00 PM", "Sun 4:00 PM"],
  },
  {
    id: "power",
    name: "Power Vinyasa",
    description: "An athletic, strength-building practice with challenging sequences. Expect to sweat and leave feeling empowered.",
    duration: "75 min",
    level: "Intermediate",
    price: 35,
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    schedule: ["Mon/Wed/Fri 5:30 PM", "Tue/Thu 6:00 AM"],
  },
  {
    id: "restore",
    name: "Restorative",
    description: "Deeply supported poses with props for complete relaxation. Perfect for recovery, stress, and nervous system reset.",
    duration: "90 min",
    level: "All Levels",
    price: 32,
    img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
    schedule: ["Sun 2:00 PM"],
  },
];

const levels = ["All", "Beginner Friendly", "Intermediate", "Advanced"];

export default function ClassesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const filteredClasses = filter === "All" 
    ? classTypes 
    : classTypes.filter(c => c.level === filter || c.level.includes(filter));

  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Our Practice
          </p>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">
            Classes & Schedule
          </h1>
          <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed">
            A complete practice offering — from dynamic flows to meditative stillness. 
            Find the class that meets you where you are today.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-5 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-300 ${
                filter === level
                  ? "bg-charcoal text-linen"
                  : "bg-stone/30 text-charcoal/60 hover:bg-stone/50"
              }`}
            >
              {level}
            </button>
          ))}
        </motion.div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((cls, i) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => router.push(`/classes/${cls.id}`)}
            >
              {/* Image */}
              <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cls.img}
                  alt={cls.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-sans text-charcoal">
                  {cls.level}
                </div>
                <div className="absolute bottom-4 right-4 font-serif text-2xl text-white/90">
                  ${cls.price}
                </div>
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-sage transition-colors duration-300">
                    {cls.name}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/50 mt-1">
                    {cls.duration}
                  </p>
                  <p className="font-sans text-sm text-charcoal/60 mt-3 leading-relaxed line-clamp-2">
                    {cls.description}
                  </p>
                </div>
              </div>

              {/* Schedule Preview */}
              <div className="mt-4 pt-4 border-t border-[rgba(28,28,28,0.08)]">
                <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mb-2">
                  This Week
                </p>
                <div className="flex flex-wrap gap-2">
                  {cls.schedule.slice(0, 3).map((time) => (
                    <span
                      key={time}
                      className="text-xs font-sans text-charcoal/60 bg-stone/20 px-2 py-1 rounded"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Private Sessions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-sage/10 border border-sage/20 text-center"
        >
          <h3 className="font-serif text-3xl text-charcoal mb-3">
            Private Sessions
          </h3>
          <p className="font-sans text-charcoal/60 max-w-md mx-auto mb-6">
            One-to-one instruction tailored to your unique body, goals, and pace. 
            Available with all teachers.
          </p>
          <button
            onClick={() => router.push(`/cart?plan=private&price=145`)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300"
          >
            Book Private Session · $145
          </button>
        </motion.div>
      </div>
    </div>
  );
}
