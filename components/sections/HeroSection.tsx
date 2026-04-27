"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] max-h-[1000px] overflow-hidden" aria-label="Hero">
      {/* Video BG */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-[-10%] gpu"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/3225526/3225526-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linen/55" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 max-w-7xl mx-auto gpu"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs tracking-[0.25em] uppercase text-charcoal/50 mb-8"
        >
          Hong Kong · Marketplace
        </motion.p>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-4xl overflow-visible break-words">
          <motion.span
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Teach What You Love.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block italic text-sage"
          >
            Practice What You Need.
          </motion.span>
        </h1>

        {/* Subhead + CTA row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-8 gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base md:text-lg text-charcoal/65 max-w-lg leading-relaxed"
          >
            Sanctuary is the platform connecting Hong Kong&apos;s best independent yoga teachers with students seeking authentic, breath-led practice.
          </motion.p>

          {/* Two Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="/schedule"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300"
            >
              Find a Class
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-charcoal/20 bg-transparent text-charcoal font-sans text-sm tracking-wider hover:bg-charcoal/5 transition-colors duration-300"
            >
              Become a Teacher
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity }}
        className="absolute bottom-8 right-10 md:right-10 flex flex-col items-center gap-2 gpu"
      >
        <div className="w-[0.8px] h-16 bg-charcoal/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-sage"
            animate={{ height: ["0%", "100%"], y: ["0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}