"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function CTASection() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={ref} className="py-24 md:py-36 overflow-hidden bg-charcoal">
      <div className="relative px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        {/* Text */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-6"
          >
            Begin your practice
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-lg text-linen leading-none"
            >
              Your first class<br />
              <span className="italic text-terracotta">is waiting.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-sans text-sm text-linen/50 mt-6 max-w-sm leading-relaxed"
          >
            Introductory offer — 3 classes for HK$500. No contract, no pressure. Just practice.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => router.push("/cart?plan=Intro%20offer&price=500")}
            className="px-8 py-4 rounded-full bg-terracotta text-white font-sans text-sm tracking-[0.08em] hover:bg-[#a36b5a] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Book your intro offer
          </button>
          <button onClick={() => router.push("/contact")} className="px-8 py-4 rounded-full border border-linen/20 text-linen font-sans text-sm tracking-[0.08em] hover:border-linen/50 hover:bg-linen/5 transition-all duration-300">
            Schedule a tour
          </button>
        </motion.div>
      </div>

      {/* Kinetic background text */}
      <motion.div
        style={{ x }}
        className="mt-16 pointer-events-none select-none overflow-hidden gpu"
      >
        <p
          className="font-serif whitespace-nowrap tracking-[0.05em]"
          style={{
            fontSize: "clamp(5rem, 14vw, 12rem)",
            lineHeight: 1,
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            color: "transparent",
          }}
        >
          Sanctuary · Breath · Practice · Sanctuary · Breath · Practice ·
        </p>
      </motion.div>
    </section>
  );
}
