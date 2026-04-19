"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const values = [
  {
    title: "Breath First",
    description: "Every practice begins and ends with the breath. It is the bridge between body and being.",
  },
  {
    title: "Presence Over Perfection",
    description: "We are not building poses. We are building presence. The pose is just where it lives.",
  },
  {
    title: "Small by Design",
    description: "Our intimate space holds 12 students maximum. This is not a limitation — it is the practice.",
  },
  {
    title: "Teachers Who Practice",
    description: "Our instructors teach from direct experience, not just training. They are practitioners first.",
  },
];

const timeline = [
  { year: "2018", event: "Founded by Elena Vasquez in a 400 sq ft space on Fillmore" },
  { year: "2019", event: "Expanded to include Yin and Meditation offerings" },
  { year: "2020", event: "Launched online classes during the pandemic — community grew worldwide" },
  { year: "2022", event: "Moved to current location, a restored Victorian with natural light" },
  { year: "2024", event: "Introduced Sound Healing and breathwork programs" },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-display-lg text-charcoal max-w-3xl">
            A sanctuary for the body, mind, and breath.
          </h1>
        </motion.div>
      </section>

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[50vh] md:h-[70vh] overflow-hidden mb-24"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80"
          alt="Sanctuary yoga studio interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-linen/60 via-transparent to-transparent" />
      </motion.div>

      {/* Story Section */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-display-md text-charcoal mb-6">
              How it began
            </h2>
            <p className="font-sans text-charcoal/70 leading-relaxed mb-6">
              Sanctuary was born from a simple belief: that yoga should feel like coming home. 
              Not a performance, not a product — a practice. Something you return to, not to achieve, 
              but to remember.
            </p>
            <p className="font-sans text-charcoal/70 leading-relaxed">
              In 2018, Elena Vasquez opened our doors on Fillmore Street with one room, 
              twelve mats, and an intention: to create a space where the intensity of city life 
              could be met with deep, deliberate calm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-display-md text-charcoal mb-6">
              Where we are now
            </h2>
            <p className="font-sans text-charcoal/70 leading-relaxed mb-6">
              Today, Sanctuary holds space for over 200 regular practitioners. Our restored 
              Victorian studio on Fillmore Street is bathed in natural light, warmed by radiant 
              heat, and scented with sage and cedar.
            </p>
            <p className="font-sans text-charcoal/70 leading-relaxed">
              We offer Vinyasa, Yin, Meditation, and Sound Healing — always rooted in breath, 
              always grounded in presence. The studio holds 12 students maximum, by design. 
              Intimacy is not a constraint; it is the practice itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-10 py-20 bg-charcoal mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="font-serif text-3xl md:text-5xl text-linen/90 italic leading-tight">
            "The body is not a thing to be fixed. It is a place to inhabit, to listen to, 
            to come home to."
          </blockquote>
          <p className="font-sans text-sage mt-8 tracking-wide">— Elena Vasquez, Founder</p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            What we believe
          </p>
          <h2 className="font-serif text-display-md text-charcoal">
            Our principles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl border border-[rgba(28,28,28,0.08)] hover:border-sage/30 transition-colors duration-300"
            >
              <span className="font-sans text-xs text-sage tracking-wider uppercase">
                0{i + 1}
              </span>
              <h3 className="font-serif text-2xl text-charcoal mt-2 mb-3">
                {value.title}
              </h3>
              <p className="font-sans text-charcoal/60 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Our journey
          </p>
          <h2 className="font-serif text-display-md text-charcoal">
            Timeline
          </h2>
        </motion.div>

        <div className="space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex gap-8 py-6 border-b border-[rgba(28,28,28,0.08)] last:border-b-0"
            >
              <span className="font-serif text-2xl text-sage w-20 flex-shrink-0">
                {item.year}
              </span>
              <p className="font-sans text-charcoal/70 leading-relaxed">
                {item.event}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 border-t border-[rgba(28,28,28,0.08)]"
        >
          <h3 className="font-serif text-display-md text-charcoal mb-4">
            Experience the studio
          </h3>
          <p className="font-sans text-charcoal/60 max-w-md mx-auto mb-8">
            Your first class is always $20. Come as you are.
          </p>
          <button
            onClick={() => router.push("/classes")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300"
          >
            View Classes
          </button>
        </motion.div>
      </section>
    </div>
  );
}
