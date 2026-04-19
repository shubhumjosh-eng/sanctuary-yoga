"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Welcome Back
          </p>
          <h1 className="font-serif text-display-md text-charcoal">Sign in</h1>
          <p className="font-sans text-charcoal/50 mt-2">
            Access your bookings and membership
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-terracotta/10 text-terracotta text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block font-sans text-sm text-charcoal/60 mb-2 tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[rgba(28,28,28,0.1)] bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-sans text-sm text-charcoal/60 mb-2 tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[rgba(28,28,28,0.1)] bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="font-sans text-sm text-charcoal/40 text-center mt-8">
          Demo: demo@sanctuary-yoga.com / demo123
        </p>

        <Link href="/" className="block text-center mt-6 font-sans text-sm text-charcoal/50 hover:text-charcoal">
          ← Back to home
        </Link>
      </motion.div>
    </div>
  );
}