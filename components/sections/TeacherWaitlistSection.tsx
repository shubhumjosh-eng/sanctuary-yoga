"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// TODO: Replace this with your Tally form embed URL
// Go to https://tally.so to create a form, then copy the embed URL
const TALLY_EMBED_URL = "https://tally.so/embed/wQ5PGl?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export default function TeacherWaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    style: "",
    instagram: "",
    bio: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="teacher-waitlist" className="py-24 md:py-32 px-6 md:px-10 bg-charcoal">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">Teach at Sanctuary</p>
          <h2 className="font-serif text-display-md text-linen mb-6">Join Our Founding Cohort</h2>
          <p className="font-sans text-linen/60 max-w-xl mx-auto mb-12 leading-relaxed">
            We're onboarding San Francisco's best independent yoga instructors. 
            Apply below for early access and <span className="text-sage font-medium">0% platform fees for your first 3 months</span>.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-sage/10 border border-sage/20 text-center"
          >
            <p className="font-serif text-2xl text-linen mb-2">Thank you for applying!</p>
            <p className="font-sans text-linen/60">We'll be in touch soon.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-xs text-linen/50 mb-2 tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-linen/10 bg-linen/5 font-sans text-linen placeholder:text-linen/30 focus:border-sage focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-linen/50 mb-2 tracking-wide">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-linen/10 bg-linen/5 font-sans text-linen placeholder:text-linen/30 focus:border-sage focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-xs text-linen/50 mb-2 tracking-wide">Yoga Style</label>
                <select
                  required
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-linen/10 bg-linen/5 font-sans text-linen focus:border-sage focus:outline-none transition-colors"
                >
                  <option value="" className="text-charcoal">Select your style</option>
                  <option value="vinyasa" className="text-charcoal">Vinyasa</option>
                  <option value="yin" className="text-charcoal">Yin</option>
                  <option value="restorative" className="text-charcoal">Restorative</option>
                  <option value="power" className="text-charcoal">Power</option>
                  <option value="meditation" className="text-charcoal">Meditation</option>
                  <option value="sound" className="text-charcoal">Sound Healing</option>
                  <option value="其他" className="text-charcoal">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-sans text-xs text-linen/50 mb-2 tracking-wide">Instagram (optional)</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-linen/10 bg-linen/5 font-sans text-linen placeholder:text-linen/30 focus:border-sage focus:outline-none transition-colors"
                  placeholder="@instagram"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs text-linen/50 mb-2 tracking-wide">Short Bio</label>
              <textarea
                required
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-linen/10 bg-linen/5 font-sans text-linen placeholder:text-linen/30 focus:border-sage focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your teaching background..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 rounded-full bg-sage text-white font-sans text-sm tracking-wider hover:bg-sage/90 transition-colors duration-300"
            >
              Apply to Teach
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}