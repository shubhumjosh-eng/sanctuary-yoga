import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Sanctuary Yoga",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200 mb-12"
        >
          &larr; Back to Sanctuary
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 leading-tight">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-charcoal/40 tracking-wide mb-12">
          Last updated: May 2026
        </p>

        <div className="space-y-8 font-sans text-sm text-charcoal/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">1. Information We Collect</h2>
            <p>
              When you book a class, sign up for our newsletter, or submit a teacher application, we collect the personal information you provide — such as your name, email address, phone number, and payment details. We also collect anonymous usage data through cookies and analytics to improve our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">2. How We Use Your Information</h2>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>To process class bookings and payments</li>
              <li>To send you class confirmations and reminders</li>
              <li>To share occasional newsletters and studio updates (only if you opt in)</li>
              <li>To review and respond to teacher applications</li>
              <li>To improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">3. Payment Processing</h2>
            <p>
              All payments are processed securely through third-party payment providers. We do not store full credit card numbers or banking details on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">4. Data Sharing</h2>
            <p>
              We never sell your personal data. We may share necessary information with trusted third-party service providers (payment processors, email delivery services) solely for the purpose of operating our business.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time. To exercise these rights, email us at{" "}
              <a href="mailto:hello@sanctuary-yoga.com" className="text-sage hover:underline">hello@sanctuary-yoga.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">6. Cookies</h2>
            <p>
              We use minimal cookies for essential functionality and basic analytics. You can disable cookies in your browser settings, though some features of the site may not work as intended.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">7. Contact</h2>
            <p>
              Questions about this policy? Reach out to{" "}
              <a href="mailto:hello@sanctuary-yoga.com" className="text-sage hover:underline">hello@sanctuary-yoga.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(28,28,28,0.06)] flex gap-6 font-sans text-xs text-charcoal/30">
          <Link href="/terms" className="hover:text-charcoal/60 transition-colors">Terms of Use</Link>
          <Link href="/privacy" className="hover:text-charcoal/60 transition-colors">Privacy Policy</Link>
        </div>
      </main>
    </>
  );
}
