"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Browse verified teachers and their unique styles. Each instructor has a personal profile showcasing their specialty, schedule, and approach.",
  },
  {
    number: "02",
    title: "Book Instantly",
    description: "Secure your spot in intimate, small-group sessions. Real-time availability with instant confirmation — no phone calls, no hassle.",
  },
  {
    number: "03",
    title: "Practice",
    description: "Show up and connect. We handle the logistics — payments, scheduling, and communications — so you can focus on your practice.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-linen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">How It Works</p>
          <h2 className="font-serif text-display-md text-charcoal">The Sanctuary Way</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="font-serif text-6xl md:text-7xl text-sage/20 block mb-6">{step.number}</span>
              <h3 className="font-serif text-2xl text-charcoal mb-4">{step.title}</h3>
              <p className="font-sans text-charcoal/60 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}