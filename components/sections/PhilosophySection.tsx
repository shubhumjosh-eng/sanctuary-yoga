"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  { number: "01", title: "Breath First", body: "Every movement is an expression of the breath. We learn to listen before we lead." },
  { number: "02", title: "Present Body", body: "The mat is not a performance space. It is a laboratory for inhabiting the present moment." },
  { number: "03", title: "Long Arc", body: "We practice for decades, not sessions. Sustainable, evolving, deeply personal." },
];

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="practice" ref={ref} className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-6"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md text-charcoal"
          >
            The body knows
            <br />
            <em className="text-sage not-italic">what the mind</em>
            <br />
            has forgotten.
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[0.8px] bg-sage mt-8 origin-left"
          />
        </div>

        {/* Right: Pillars */}
        <div className="space-y-10 md:space-y-12 pt-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8 group"
            >
              <span className="font-serif text-sm text-charcoal/20 pt-1 flex-shrink-0 group-hover:text-sage transition-colors duration-300">
                {p.number}
              </span>
              <div className="border-t border-[rgba(28,28,28,0.08)] pt-6">
                <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3">{p.title}</h3>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed max-w-sm">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
