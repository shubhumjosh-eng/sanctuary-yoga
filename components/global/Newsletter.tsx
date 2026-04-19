"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubscribed(true);
  };

  return (
    <section className="py-16">
      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="font-serif text-2xl text-charcoal mb-2">You're on the list.</p>
          <p className="font-sans text-charcoal/50">
            Welcome to the community. Check your inbox for a welcome note.
          </p>
        </motion.div>
      ) : (
        <div className="max-w-md mx-auto text-center">
          <h3 className="font-serif text-2xl text-charcoal mb-2">
            Stay in the loop
          </h3>
          <p className="font-sans text-charcoal/50 mb-6">
            New classes, workshops, and occasional insights — no spam, ever.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
            <div className="flex-1">
              <input
                {...register("email")}
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl border border-[rgba(28,28,28,0.1)] bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300"
              />
              {errors.email && (
                <p className="text-terracotta text-xs text-left mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-charcoal text-linen font-sans text-sm tracking-wider hover:bg-charcoal/80 transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "..." : "Join"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}