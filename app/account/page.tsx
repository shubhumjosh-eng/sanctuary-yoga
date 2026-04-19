"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">Your Account</p>
          <h1 className="font-serif text-display-md text-charcoal">Welcome back</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="p-8 rounded-3xl border border-[rgba(28,28,28,0.08)]"
          >
            <h3 className="font-serif text-xl text-charcoal mb-4">Your Bookings</h3>
            <p className="font-sans text-charcoal/50 mb-6">
              You don't have any upcoming bookings.
            </p>
            <button
              onClick={() => router.push("/classes")}
              className="px-6 py-2.5 rounded-full bg-charcoal text-linen text-sm font-sans tracking-wider hover:bg-terracotta transition-colors duration-300"
            >
              Book a Class
            </button>
          </motion.div>

          {/* Membership */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="p-8 rounded-3xl border border-[rgba(28,28,28,0.08)]"
          >
            <h3 className="font-serif text-xl text-charcoal mb-4">Membership</h3>
            <p className="font-sans text-charcoal/50 mb-6">
              No active membership.
            </p>
            <button
              onClick={() => router.push("/cart?plan=Membership&price=180")}
              className="px-6 py-2.5 rounded-full bg-sage text-white text-sm font-sans tracking-wider hover:opacity-90 transition-opacity"
            >
              View Plans
            </button>
          </motion.div>

          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="p-8 rounded-3xl border border-[rgba(28,28,28,0.08)]"
          >
            <h3 className="font-serif text-xl text-charcoal mb-4">Profile</h3>
            <div className="space-y-2 text-sm text-charcoal/70 mb-6">
              <p>Demo User</p>
              <p className="text-charcoal/50">demo@sanctuary-yoga.com</p>
            </div>
            <button className="px-6 py-2.5 rounded-full border border-[rgba(28,28,28,0.12)] text-sm font-sans text-charcoal/60 hover:bg-stone/30 transition-colors">
              Edit Profile
            </button>
          </motion.div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="p-8 rounded-3xl border border-[rgba(28,28,28,0.08)] flex flex-col"
          >
            <h3 className="font-serif text-xl text-charcoal mb-4">Sign Out</h3>
            <p className="font-sans text-charcoal/50 mb-auto">
              Sign out of your account.
            </p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-6 py-2.5 rounded-full border border-terracotta/30 text-terracotta text-sm font-sans tracking-wider hover:bg-terracotta/10 transition-colors"
            >
              Sign Out
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}