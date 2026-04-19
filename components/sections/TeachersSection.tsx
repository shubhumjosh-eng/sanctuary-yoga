"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

const teachers = [
  {
    name: "Elena Vasquez",
    role: "Lead Instructor · Vinyasa",
    bio: "200hr RYT, trained in Mysore with 12 years of dedicated practice. Elena's teaching draws from Ashtanga roots with a modern, breath-first philosophy.",
    years: "12 years",
    focus: ["Vinyasa", "Ashtanga", "Adjustments"],
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80",
  },
  {
    name: "Kenji Tanaka",
    role: "Senior Teacher · Yin",
    bio: "Studied under Paul Grilley in California. Kenji's Yin and Yoga Nidra practice invites stillness as the deepest form of movement.",
    years: "9 years",
    focus: ["Yin", "Nidra", "Meridians"],
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
  },
  {
    name: "Amara Osei",
    role: "Sound & Meditation",
    bio: "Ceremonial sound practitioner and vipassana teacher. Amara weaves ancient frequencies with contemporary mindfulness for deeply restorative sessions.",
    years: "7 years",
    focus: ["Sound Healing", "Vipassana", "Breathwork"],
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  },
];

export default function TeachersSection() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="teachers" ref={ref} className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4"
          >
            The teachers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-md text-charcoal"
          >
            Held by those<br />who have walked it.
          </motion.h2>
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {teachers.map((teacher, i) => (
          <motion.div
            key={teacher.name}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-[rgba(28,28,28,0.07)] hover:border-[rgba(28,28,28,0.15)] transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-72 md:h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teacher.img}
                alt={`${teacher.name} — yoga instructor`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-linen/90 via-linen/10 to-transparent" />
              {/* Years badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-sans text-charcoal/60 tracking-wide">
                {teacher.years}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-serif text-2xl text-charcoal">{teacher.name}</h3>
              <p className="font-sans text-xs tracking-wide text-sage mt-1 mb-3">{teacher.role}</p>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{teacher.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {teacher.focus.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-sans bg-stone/40 text-charcoal/60">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => router.push(`/cart?plan=Private%20session&teacher=${encodeURIComponent(teacher.name)}&price=145`)}
                className="kinetic-link inline-block mt-5 font-sans text-xs tracking-[0.12em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200"
              >
                Book with {teacher.name.split(" ")[0]} →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
