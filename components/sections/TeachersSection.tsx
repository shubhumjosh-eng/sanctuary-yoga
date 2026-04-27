"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

interface Instructor {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  avatar_url: string;
  hourly_rate: number;
  is_active: boolean;
}

const DEMO_TEACHERS: Instructor[] = [
  {
    id: "demo-1",
    name: "Anjali Mehta",
    bio: "200hr RYT, trained in Mysore with 12 years of dedicated practice. Anjali's teaching draws from Ashtanga roots with a modern, breath-first philosophy.",
    specialties: ["Vinyasa", "Ashtanga", "Breathwork"],
    avatar_url: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80",
    hourly_rate: 1200,
    is_active: true,
  },
  {
    id: "demo-2",
    name: "Jason Tsang",
    bio: "Studied under Paul Grilley in California. Jason's Yin and Yoga Nidra practice invites stillness as the deepest form of movement.",
    specialties: ["Yin", "Nidra", "Meditation"],
    avatar_url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    hourly_rate: 1000,
    is_active: true,
  },
  {
    id: "demo-3",
    name: "Suki Li",
    bio: "Ceremonial sound practitioner and vipassana teacher. Suki weaves ancient frequencies with contemporary mindfulness for deeply restorative sessions.",
    specialties: ["Sound Healing", "Vipassana", "Breathwork"],
    avatar_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    hourly_rate: 1100,
    is_active: true,
  },
  {
    id: "demo-4",
    name: "Carlos Pereira",
    bio: "Former professional athlete turned yoga teacher. Carlos brings athletic precision and functional movement to his vinyasa classes.",
    specialties: ["Vinyasa", "Power", "Functional"],
    avatar_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    hourly_rate: 1000,
    is_active: true,
  },
];

export default function TeachersSection() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [teachers, setTeachers] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstructors() {
      try {
        const res = await fetch('/api/instructors');
        const data = await res.json();
        if (data && data.length > 0) {
          setTeachers(data);
        }
      } catch (e) {
        console.log('Using demo instructors');
      } finally {
        setLoading(false);
      }
    }
    fetchInstructors();
  }, []);

  const displayTeachers = teachers.length > 0 ? teachers : DEMO_TEACHERS;

  return (
    <section id="teachers" ref={ref} className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-80 bg-stone/20 rounded-2xl" />
              <div className="h-6 bg-stone/20 rounded mt-4 w-1/2" />
              <div className="h-4 bg-stone/20 rounded mt-2 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayTeachers.map((teacher, i) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(28,28,28,0.07)] hover:border-[rgba(28,28,28,0.15)] transition-all duration-500"
            >
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={teacher.avatar_url}
                  alt={`${teacher.name} — yoga instructor`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-linen/90 via-linen/10 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-sans text-charcoal/60 tracking-wide">
                  {teacher.hourly_rate ? `HK$${teacher.hourly_rate}/hr` : 'Available'}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl text-charcoal">{teacher.name}</h3>
                <p className="font-sans text-xs tracking-wide text-sage mt-1 mb-3">
                  {teacher.specialties?.[0] || 'Yoga Instructor'}
                </p>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{teacher.bio}</p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {teacher.specialties?.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-sans bg-stone/40 text-charcoal/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => router.push(`/cart?plan=Private%20session&teacher=${encodeURIComponent(teacher.name)}&price=${teacher.hourly_rate || 1200}`)}
                  className="kinetic-link inline-block mt-5 font-sans text-xs tracking-[0.12em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200"
                >
                  Book with {teacher.name.split(" ")[0]} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-charcoal/30 mt-12">
        Demo content — placeholder instructors for demonstration only. Replace with real data upon purchase.
      </p>
    </section>
  );
}