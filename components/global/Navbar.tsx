"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Teachers", href: "/teachers" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-[rgba(28,28,28,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group kinetic-link" aria-label="Sanctuary Home">
            <span className="w-6 h-6 rounded-full border border-[rgba(28,28,28,0.3)] group-hover:border-sage transition-colors duration-300" />
            <span className="font-serif text-xl tracking-[0.12em] uppercase text-charcoal">
              Sanctuary
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="kinetic-link text-sm font-sans tracking-[0.06em] text-charcoal/70 hover:text-charcoal transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-[rgba(28,28,28,0.12)] flex items-center justify-center hover:bg-stone/40 transition-colors text-charcoal/60"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            <a
              href="/courses"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta text-white text-sm font-sans tracking-[0.06em] hover:bg-[#a36b5a] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Enroll Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[0.8px] bg-charcoal origin-center transition-transform"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[0.8px] bg-charcoal"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[0.8px] bg-charcoal origin-center transition-transform"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl text-charcoal tracking-tight"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { setMenuOpen(false); setBookingOpen(true); }}
              className="mt-4 px-8 py-3 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider"
            >
              Book a class
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] bg-charcoal/30 backdrop-blur-xl"
            onClick={onClose}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[9001] max-h-[90vh] bg-linen rounded-t-3xl overflow-hidden flex flex-col"
            style={{ maxWidth: "100%", margin: "0 auto" }}
          >
            {/* Modal Handle */}
            <div className="flex justify-center pt-4 pb-2 flex-shrink-0">
              <div className="w-10 h-[3px] bg-stone rounded-full" />
            </div>

            {/* Modal Header */}
            <div className="px-8 pt-4 pb-6 flex items-start justify-between border-b border-[rgba(28,28,28,0.08)] flex-shrink-0">
              <div>
                <Dialog.Title className="font-serif text-3xl text-charcoal">Book a session</Dialog.Title>
                <p className="font-sans text-sm text-charcoal/60 mt-1 tracking-wide">
                  Reserve your space in sanctuary
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[rgba(28,28,28,0.12)] flex items-center justify-center hover:bg-stone/40 transition-colors text-charcoal/60 hover:text-charcoal"
                aria-label="Close booking"
              >
                ✕
              </button>
            </div>

            {/* Schedule embedded */}
            <div className="overflow-y-auto flex-1 px-8 py-8">
              <p className="font-sans text-sm text-charcoal/50 text-center mb-8 tracking-wide">
                Select a class below to reserve your spot
              </p>
              <div className="grid gap-3">
                {[
                  { time: "07:00", name: "Morning Vinyasa Flow", teacher: "Elena Vasquez", spots: 3 },
                  { time: "09:30", name: "Gentle Yin & Restore", teacher: "Kenji Tanaka", spots: 7 },
                  { time: "12:00", name: "Breathwork & Meditation", teacher: "Amara Osei", spots: 5 },
                  { time: "17:30", name: "Evening Power Vinyasa", teacher: "Elena Vasquez", spots: 2 },
                  { time: "19:00", name: "Sound Healing Journey", teacher: "Kenji Tanaka", spots: 8 },
                ].map((cls) => (
                  <div
                    key={cls.time}
                    className="flex items-center justify-between p-5 rounded-2xl border border-[rgba(28,28,28,0.08)] hover:border-sage/40 hover:bg-sage/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-serif text-lg text-charcoal/50 w-14">{cls.time}</span>
                      <div>
                        <p className="font-sans text-sm font-medium text-charcoal">{cls.name}</p>
                        <p className="font-sans text-xs text-charcoal/50 mt-0.5">{cls.teacher}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-sans text-charcoal/40">{cls.spots} spots</span>
                      <button
                        onClick={() => {
                          router.push(`/cart?session=${encodeURIComponent(cls.name)}&teacher=${encodeURIComponent(cls.teacher)}&time=${encodeURIComponent(cls.time)}&price=32`);
                          onClose();
                        }}
                        className="px-4 py-2 rounded-full bg-charcoal text-linen text-xs font-sans tracking-wider hover:bg-terracotta transition-colors duration-300"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-sans text-xs text-charcoal/30 text-center mt-8 pb-4">
                All sessions $32 · Memberships from $180/mo
              </p>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
