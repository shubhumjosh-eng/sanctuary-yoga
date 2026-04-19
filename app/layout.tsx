import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import CustomCursor from "@/components/global/CustomCursor";
import SmoothScrollProvider from "@/components/global/SmoothScrollProvider";
import { ToastProvider } from "@/components/global/Toast";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import BackToTop from "@/components/global/BackToTop";

export const metadata: Metadata = {
  title: "Sanctuary Yoga | Multi-Vendor Marketplace for Yoga Teachers",
  description:
    "Connect with San Francisco's best independent yoga teachers. Book classes, discover new instructors, and practice what you need.",
  keywords: ["yoga marketplace", "yoga teachers", "yoga classes san francisco", "book yoga class", "yoga instructor"],
  openGraph: {
    title: "Sanctuary | Breath-Led Yoga Practice",
    description: "Movement is Medicine. A digital sanctuary for breath-led practice.",
    type: "website",
    locale: "en_US",
    siteName: "Sanctuary Yoga",
    images: [{ url: "https://sanctuary-yoga.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Sanctuary Yoga Marketplace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanctuary Yoga | Multi-Vendor Marketplace",
    description: "Teach What You Love. Practice What You Need.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://sanctuary-yoga.vercel.app" },
  metadataBase: "https://sanctuary-yoga.vercel.app",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://sanctuary-yoga.com/#business",
      "name": "Sanctuary Yoga Studio",
      "description": "A private yoga studio offering breath-led practice in San Francisco.",
      "url": "https://sanctuary-yoga.com",
      "telephone": "+1-415-555-0190",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1847 Fillmore Street",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94115",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "37.7849",
        "longitude": "-122.4294",
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "06:30", "closes": "21:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "08:00", "closes": "18:00" },
      ],
      "priceRange": "$$$",
      "image": "https://sanctuary-yoga.com/studio.jpg",
      "sameAs": ["https://instagram.com/sanctuaryyoga", "https://facebook.com/sanctuaryyoga"],
    },
    {
      "@type": "Course",
      "@id": "https://sanctuary-yoga.com/#vinyasa",
      "name": "Vinyasa Flow",
      "description": "A breath-synchronized movement practice connecting postures in seamless, meditative flow.",
      "provider": { "@id": "https://sanctuary-yoga.com/#business" },
      "courseMode": "in-person",
      "educationalLevel": "Beginner to Advanced",
      "offers": {
        "@type": "Offer",
        "price": "32",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
      },
    },
    {
      "@type": "Course",
      "@id": "https://sanctuary-yoga.com/#yin",
      "name": "Yin Yoga",
      "description": "A slow, floor-based practice targeting deep connective tissue and promoting surrender.",
      "provider": { "@id": "https://sanctuary-yoga.com/#business" },
      "courseMode": "in-person",
      "educationalLevel": "All Levels",
      "offers": {
        "@type": "Offer",
        "price": "32",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="grain-overlay bg-linen text-charcoal antialiased">
        <ThemeProvider>
          <ToastProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              <Navbar />
<main>{children}</main>
          <Footer />
          <BackToTop />
            </SmoothScrollProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
