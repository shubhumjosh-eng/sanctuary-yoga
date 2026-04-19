"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    tag: "Practice",
    title: "On the intelligence of slowness",
    excerpt: "What Yin yoga taught me about the nervous system, and why the modern obsession with intensity is costing us.",
    date: "Nov 12, 2024",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    tag: "Breathwork",
    title: "The exhale you've been holding",
    excerpt: "A deep dive into the physiology of breath retention, and simple practices to release chronic tension patterns.",
    date: "Oct 28, 2024",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
  {
    tag: "Sound",
    title: "Resonance as medicine: a primer",
    excerpt: "How Tibetan bowls, gongs, and voice work with the vagus nerve to shift autonomic state.",
    date: "Oct 5, 2024",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
  },
];

export default function JournalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journal" className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4"
          >
            Journal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-md text-charcoal"
          >
            From the mat.
          </motion.h2>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          href="#"
          className="kinetic-link font-sans text-sm tracking-[0.1em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200"
        >
          All writings →
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-default"
          >
            {/* Image */}
            <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linen/10 group-hover:bg-linen/0 transition-colors duration-300" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-xs tracking-wide text-sage">{post.tag}</span>
              <span className="text-charcoal/20">·</span>
              <span className="font-sans text-xs text-charcoal/40">{post.readTime}</span>
              <span className="text-charcoal/20">·</span>
              <span className="font-sans text-xs text-charcoal/40">{post.date}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3 leading-tight group-hover:text-sage transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            <a href="#" className="kinetic-link inline-block mt-4 font-sans text-xs tracking-[0.12em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200">
              Read essay →
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
