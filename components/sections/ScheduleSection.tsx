"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const schedule: Record<string, Array<{ time: string; name: string; teacher: string; type: string; duration: string }>> = {
  Mon: [
    { time: "07:00", name: "Morning Vinyasa Flow", teacher: "Elena Vasquez", type: "Vinyasa", duration: "60 min" },
    { time: "12:00", name: "Midday Breathwork", teacher: "Amara Osei", type: "Breathwork", duration: "45 min" },
    { time: "18:00", name: "Evening Yin", teacher: "Kenji Tanaka", type: "Yin", duration: "75 min" },
  ],
  Tue: [
    { time: "06:30", name: "Early Flow", teacher: "Elena Vasquez", type: "Vinyasa", duration: "60 min" },
    { time: "10:00", name: "Gentle Restore", teacher: "Kenji Tanaka", type: "Restore", duration: "60 min" },
    { time: "19:00", name: "Sound Healing", teacher: "Amara Osei", type: "Sound", duration: "90 min" },
  ],
  Wed: [
    { time: "07:00", name: "Power Vinyasa", teacher: "Elena Vasquez", type: "Vinyasa", duration: "60 min" },
    { time: "12:00", name: "Noon Meditation", teacher: "Amara Osei", type: "Meditation", duration: "30 min" },
    { time: "17:30", name: "Yin & Nidra", teacher: "Kenji Tanaka", type: "Yin", duration: "90 min" },
  ],
  Thu: [
    { time: "06:30", name: "Sunrise Vinyasa", teacher: "Elena Vasquez", type: "Vinyasa", duration: "60 min" },
    { time: "10:00", name: "Gentle Flow", teacher: "Kenji Tanaka", type: "Restore", duration: "60 min" },
    { time: "18:30", name: "Evening Breathwork", teacher: "Amara Osei", type: "Breathwork", duration: "45 min" },
  ],
  Fri: [
    { time: "07:00", name: "Friday Flow", teacher: "Elena Vasquez", type: "Vinyasa", duration: "60 min" },
    { time: "12:00", name: "Midday Yin", teacher: "Kenji Tanaka", type: "Yin", duration: "60 min" },
    { time: "19:00", name: "Weekend Sound Bath", teacher: "Amara Osei", type: "Sound", duration: "90 min" },
  ],
  Sat: [
    { time: "08:00", name: "Saturday Workshop", teacher: "Elena Vasquez", type: "Vinyasa", duration: "90 min" },
    { time: "10:30", name: "Community Yin", teacher: "Kenji Tanaka", type: "Yin", duration: "75 min" },
    { time: "16:00", name: "Afternoon Nidra", teacher: "Amara Osei", type: "Meditation", duration: "60 min" },
  ],
  Sun: [
    { time: "09:00", name: "Sunday Restore", teacher: "Kenji Tanaka", type: "Restore", duration: "75 min" },
    { time: "11:00", name: "Slow Flow", teacher: "Elena Vasquez", type: "Vinyasa", duration: "60 min" },
    { time: "17:00", name: "Closing Meditation", teacher: "Amara Osei", type: "Meditation", duration: "45 min" },
  ],
};

const typeColors: Record<string, string> = {
  Vinyasa: "bg-terracotta/10 text-terracotta",
  Yin: "bg-sage/15 text-sage",
  Restore: "bg-stone/40 text-charcoal/60",
  Sound: "bg-charcoal/8 text-charcoal/70",
  Breathwork: "bg-sage/10 text-sage",
  Meditation: "bg-stone/30 text-charcoal/60",
};

export default function ScheduleSection() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState("Mon");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const classes = schedule[activeDay] || [];

  return (
    <section id="schedule" className="py-24 md:py-36 bg-charcoal/[0.02]">
      <div ref={ref} className="px-6 md:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4"
            >
              Weekly Schedule
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-display-md text-charcoal"
            >
              Find your practice.
            </motion.h2>
          </div>

          {/* Day picker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex gap-1"
          >
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 py-2 rounded-lg text-xs font-sans tracking-wide transition-all duration-200 ${
                  activeDay === day
                    ? "bg-charcoal text-linen"
                    : "text-charcoal/50 hover:text-charcoal hover:bg-stone/30"
                }`}
              >
                {day}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[4.5rem] top-0 bottom-0 w-[0.8px] bg-[rgba(28,28,28,0.06)] hidden md:block" />

          <div className="space-y-3">
            {classes.map((cls, i) => (
              <motion.div
                key={`${activeDay}-${cls.time}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-stretch gap-8 md:gap-12"
              >
                {/* Time */}
                <div className="w-16 flex-shrink-0 flex items-center">
                  <span className="font-serif text-base text-charcoal/40 group-hover:text-charcoal/70 transition-colors duration-300 tabular-nums">
                    {cls.time}
                  </span>
                </div>

                {/* Dot on timeline */}
                <div className="relative hidden md:flex items-center flex-shrink-0 w-3">
                  <div className="w-2 h-2 rounded-full bg-stone group-hover:bg-sage transition-colors duration-300 z-10" />
                </div>

                {/* Card */}
                <div className="flex-1 p-5 md:p-6 rounded-2xl border border-[rgba(28,28,28,0.07)] hover:border-[rgba(28,28,28,0.14)] hover:bg-stone/20 transition-all duration-300 group cursor-default">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div>
                        <h3 className="font-serif text-lg md:text-xl text-charcoal group-hover:translate-x-0.5 transition-transform duration-300">
                          {cls.name}
                        </h3>
                        <p className="font-sans text-xs text-charcoal/50 mt-1">{cls.teacher} · {cls.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide ${typeColors[cls.type] || "bg-stone/30 text-charcoal/60"}`}>
                        {cls.type}
                      </span>
                      <button
                        onClick={() => router.push(`/cart?session=${encodeURIComponent(cls.name)}&teacher=${encodeURIComponent(cls.teacher)}&time=${encodeURIComponent(cls.time)}&price=32`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-1.5 rounded-full border border-[rgba(28,28,28,0.15)] text-xs font-sans text-charcoal/70 hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-200"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View full schedule CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a href="#" className="kinetic-link font-sans text-sm tracking-[0.1em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200">
            View full schedule →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
