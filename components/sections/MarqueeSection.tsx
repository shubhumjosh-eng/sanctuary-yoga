"use client";

import { motion } from "framer-motion";

const items = ["Vinyasa", "Yin", "Meditation", "Sound Healing", "Pranayama", "Restore"];

export default function MarqueeSection() {
  // Repeat items enough to fill the marquee seamlessly
  const marqueeContent = [...items, ...items, ...items, ...items];

  return (
    <section className="py-10 md:py-14 overflow-hidden border-y border-[rgba(28,28,28,0.06)]">
      {/* Top row - left scroll */}
      <div className="relative flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="flex gap-10 md:gap-14 items-center whitespace-nowrap gpu"
        >
          {marqueeContent.map((item, i) => (
            <span
              key={i}
              className={`font-serif tracking-[0.08em] uppercase select-none transition-all ${
                i % 3 === 0
                  ? "text-[clamp(2rem,4vw,3.5rem)] text-stroke text-charcoal/90"
                  : "text-[clamp(2rem,4vw,3.5rem)] text-stone/60"
              }`}
              style={
                i % 3 === 0
                  ? { WebkitTextStroke: "1px rgba(28,28,28,0.35)", color: "transparent" }
                  : undefined
              }
            >
              {item}
              <span
                className="mx-6 md:mx-8 inline-block"
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(124,139,122,0.4)",
                  verticalAlign: "middle",
                }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
