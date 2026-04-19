"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactInfo = [
  {
    label: "Visit Us",
    value: "1847 Fillmore Street\nSan Francisco, CA 94115",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Hours",
    value: "Mon–Fri: 6:30 AM – 9:00 PM\nSat–Sun: 8:00 AM – 6:00 PM",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Contact",
    value: "+1 (415) 555-0190\nhello@sanctuary-yoga.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "Do I need to book in advance?",
    answer: "We recommend booking at least 2 hours before class to guarantee your spot. Walk-ins are welcome space permitting.",
  },
  {
    question: "What should I bring?",
    answer: "Just yourself and comfortable clothing. We provide mats, blocks, straps, and blankets. We also have changing rooms and showers.",
  },
  {
    question: "Is there parking?",
    answer: "Street parking is available. We also recommend using public transit — we're a 5-minute walk from the Fillmore/Japanese Peace Center bus stop.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer: "Yes, you can cancel up to 12 hours before class for a full credit. Within 12 hours, a $15 fee applies.",
  },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">
            We'd love to hear from you
          </h1>
          <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed">
            Questions about classes, memberships, or private sessions? 
            Drop us a line and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center p-12 rounded-3xl bg-sage/10 border border-sage/20">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">Message sent</h3>
                  <p className="font-sans text-charcoal/60">
                    We'll be in touch within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm text-charcoal/60 mb-2 tracking-wide">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl border bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-terracotta text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-charcoal/60 mb-2 tracking-wide">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-terracotta text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2 tracking-wide">
                    Subject
                  </label>
                  <select
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-xl border bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a topic</option>
                    <option value="classes">Classes & Schedule</option>
                    <option value="membership">Memberships</option>
                    <option value="private">Private Sessions</option>
                    <option value="events">Events & Workshops</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-terracotta text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block font-sans text-sm text-charcoal/60 mb-2 tracking-wide">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && (
                    <p className="text-terracotta text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="p-8 rounded-3xl border border-[rgba(28,28,28,0.08)]">
              <h3 className="font-serif text-xl text-charcoal mb-6">Studio Info</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0 text-sage">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mb-1">
                        {info.label}
                      </p>
                      <p className="font-sans text-sm text-charcoal/70 whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden h-64 border border-[rgba(28,28,28,0.08)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977904878!2d-122.4349!3d37.7849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580d8d8f0f0f0%3A0x0!2sFillmore%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sanctuary Yoga Studio Location"
              />
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 pt-16 border-t border-[rgba(28,28,28,0.08)]"
        >
          <h2 className="font-serif text-display-md text-charcoal mb-10 text-center">
            Common Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[rgba(28,28,28,0.08)] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-stone/10 transition-colors duration-200"
                >
                  <span className="font-sans text-sm font-medium text-charcoal pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: activeFaq === i ? 45 : 0 }}
                    className="text-charcoal/40 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === i ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 font-sans text-sm text-charcoal/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
