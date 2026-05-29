import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — Sanctuary Yoga",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-charcoal/40 hover:text-charcoal transition-colors duration-200 mb-12"
        >
          &larr; Back to Sanctuary
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 leading-tight">
          Terms of Use
        </h1>
        <p className="font-sans text-xs text-charcoal/40 tracking-wide mb-12">
          Last updated: May 2026
        </p>

        <div className="space-y-8 font-sans text-sm text-charcoal/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Sanctuary Yoga (&quot;Sanctuary&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms of Use. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">2. Bookings &amp; Cancellations</h2>
            <p>
              Class bookings must be made through our online booking system. Cancellations made more than 4 hours before a class are eligible for a full refund or credit. Late cancellations and no-shows are charged in full. Membership cancellations require 14 days written notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">3. Memberships &amp; Pricing</h2>
            <p>
              Membership fees are billed monthly and are non-refundable except as outlined in our cancellation policy. We reserve the right to modify pricing with 30 days notice. Introductory offers are available to new students only.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">4. Teacher Conduct</h2>
            <p>
              All teachers on the Sanctuary platform are independent contractors. We verify credentials and maintain quality standards, but each teacher is responsible for their own instruction, methodology, and liability insurance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">5. Liability</h2>
            <p>
              Yoga involves physical movement and inherent risk. By participating in any class, you acknowledge that you are in good physical condition and understand that Sanctuary Yoga is not liable for any injuries sustained during practice. Always listen to your body and modify as needed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">6. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, video, and branding — is the property of Sanctuary Yoga unless otherwise credited. You may not reproduce, distribute, or use our content without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">7. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">8. Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:hello@sanctuary-yoga.com" className="text-sage hover:underline">hello@sanctuary-yoga.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(28,28,28,0.06)] flex gap-6 font-sans text-xs text-charcoal/30">
          <Link href="/terms" className="hover:text-charcoal/60 transition-colors">Terms of Use</Link>
          <Link href="/privacy" className="hover:text-charcoal/60 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </>
  );
}
