"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "I've practiced yoga for fifteen years across four continents. Sanctuary is in a different category — the level of attention, the space itself, the quality of instruction.",
    author: "Isabelle R.",
    role: "Member since 2021",
    col: 1,
  },
  {
    quote: "Kenji's Yin class changed how I relate to stillness. I came for flexibility. I stayed for everything else.",
    author: "Marcus T.",
    role: "Weekly practitioner",
    col: 1,
  },
  {
    quote: "Elena sees things in your body that you haven't seen in yourself. The adjustments are offered with such care — never forced, always illuminating.",
    author: "Priya S.",
    role: "Private session student",
    col: 2,
  },
  {
    quote: "Amara's sound journeys are transformative. I don't have better words for it. I leave as a different person.",
    author: "Theo K.",
    role: "Sound Healing attendee",
    col: 2,
  },
  {
    quote: "The studio itself is a work of art. The light, the materials, the scent. It's the one hour a week my nervous system fully rests.",
    author: "Claire M.",
    role: "Founding member",
    col: 2,
  },
];

function TestimonialCard({ quote, author, role, delay }: {
  quote: string;
  author: string;
  role: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 rounded-2xl border border-[rgba(28,28,28,0.07)] hover:border-[rgba(28,28,28,0.12)] transition-border duration-300 overflow-hidden group"
    >
      {/* Giant quote mark */}
      <span
        className="absolute -top-4 -left-2 font-serif text-[120px] leading-none text-charcoal pointer-events-none select-none"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        "
      </span>

      <blockquote className="relative z-10">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-charcoal/80 italic">
          {quote}
        </p>
        <footer className="mt-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone/60 flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-sm text-charcoal/50">{author[0]}</span>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-charcoal">{author}</p>
            <p className="font-sans text-xs text-charcoal/40">{role}</p>
          </div>
        </footer>
      </blockquote>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const col1 = testimonials.filter(t => t.col === 1);
  const col2 = testimonials.filter(t => t.col === 2);

  return (
    <section className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4"
        >
          From the community
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-serif text-display-md text-charcoal"
        >
          What they say.
        </motion.h2>
      </div>

      {/* Mobile: stack, Desktop: masonry */}
      <div className="block md:hidden space-y-4">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.author} {...t} delay={i * 0.08} />
        ))}
      </div>

      <div className="hidden md:grid grid-cols-2 gap-6 items-start">
        {/* Col 1 */}
        <div className="space-y-6">
          {col1.map((t, i) => (
            <TestimonialCard key={t.author} {...t} delay={i * 0.1} />
          ))}
          {/* Offset decorative stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl bg-charcoal text-linen"
          >
            <p className="font-serif text-[72px] leading-none text-sage">98%</p>
            <p className="font-sans text-sm text-linen/60 mt-3 leading-relaxed">
              of members report an improved relationship with their body within 8 weeks.
            </p>
          </motion.div>
        </div>

        {/* Col 2 — slightly offset */}
        <div className="space-y-6 mt-12">
          {col2.map((t, i) => (
            <TestimonialCard key={t.author} {...t} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
