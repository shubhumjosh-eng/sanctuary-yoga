"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="border-t border-[rgba(28,28,28,0.08)] bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-5 rounded-full border border-[rgba(28,28,28,0.3)]" />
              <span className="font-serif text-lg tracking-[0.12em] uppercase">Sanctuary</span>
            </div>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed max-w-xs">
              A private space where movement becomes medicine. Rooted in tradition, guided by breath.
            </p>
            <p className="font-sans text-xs text-charcoal/40 mt-8">
              1847 Fillmore Street<br />
              San Francisco, CA 94115
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal/40 mb-6">Navigate</p>
            <ul className="space-y-3">
              {[
                { label: "Classes", href: "/classes" },
                { label: "About", href: "/about" },
                { label: "Teachers", href: "/teachers" },
                { label: "Journal", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="kinetic-link font-sans text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div>
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal/40 mb-6">
              Letters from the mat
            </p>
            <p className="font-sans text-sm text-charcoal/60 mb-6 leading-relaxed">
              Reflections on practice, seasonal offerings, and studio news. Never noisy.
            </p>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-lg text-sage italic"
              >
                Thank you. We'll be in touch.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 text-sm font-sans bg-transparent border border-[rgba(28,28,28,0.12)] border-r-0 rounded-l-full focus:outline-none focus:border-sage/60 text-charcoal placeholder:text-charcoal/30 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 text-sm font-sans bg-charcoal text-linen rounded-r-full hover:bg-terracotta transition-colors duration-300 whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
            <div className="flex gap-5 mt-8">
              {["Instagram", "Pinterest"].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="font-sans text-xs tracking-[0.1em] text-charcoal/40 hover:text-charcoal kinetic-link transition-colors duration-200"
                >
                  {soc}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[rgba(28,28,28,0.06)] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-sans text-xs text-charcoal/30 tracking-wide">
            © {new Date().getFullYear()} Sanctuary Yoga. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <a key={item} href="#" className="font-sans text-xs text-charcoal/30 hover:text-charcoal/60 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
