import { NextResponse } from "next/server";

export async function GET() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://sanctuary-yoga.com/#business",
        "name": "Sanctuary Yoga Studio",
        "description": "A private yoga studio offering breath-led practice in San Francisco. Specializing in Vinyasa, Yin, Meditation, and Sound Healing.",
        "url": "https://sanctuary-yoga.com",
        "telephone": "+1-415-555-0190",
        "email": "hello@sanctuary-yoga.com",
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
        "hasMap": "https://maps.google.com/?q=1847+Fillmore+Street+San+Francisco",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "06:30",
            "closes": "21:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "18:00",
          },
        ],
        "priceRange": "$$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Credit Card, Cash",
        "image": [
          "https://sanctuary-yoga.com/images/studio-1.jpg",
          "https://sanctuary-yoga.com/images/studio-2.jpg",
        ],
        "sameAs": [
          "https://instagram.com/sanctuaryyoga",
          "https://facebook.com/sanctuaryyoga",
          "https://pinterest.com/sanctuaryyoga",
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
        },
      },
      {
        "@type": "Course",
        "@id": "https://sanctuary-yoga.com/#vinyasa",
        "name": "Vinyasa Flow",
        "description": "A breath-synchronized movement practice connecting postures in seamless, meditative flow. Suitable for all levels.",
        "provider": { "@id": "https://sanctuary-yoga.com/#business" },
        "courseMode": "in-person",
        "educationalLevel": "Beginner to Advanced",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "32",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01",
        },
      },
      {
        "@type": "Course",
        "@id": "https://sanctuary-yoga.com/#yin",
        "name": "Yin Yoga",
        "description": "A slow, floor-based practice targeting deep connective tissue. Promotes flexibility, surrender, and nervous system regulation.",
        "provider": { "@id": "https://sanctuary-yoga.com/#business" },
        "courseMode": "in-person",
        "educationalLevel": "All Levels",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "32",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
        },
      },
      {
        "@type": "Course",
        "@id": "https://sanctuary-yoga.com/#sound-healing",
        "name": "Sound Healing Journey",
        "description": "Immersive ceremonial sound bathing using Tibetan bowls, gongs, and voice. Deeply restorative and transformative.",
        "provider": { "@id": "https://sanctuary-yoga.com/#business" },
        "courseMode": "in-person",
        "educationalLevel": "All Levels",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "40",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
        },
      },
    ],
  };

  return NextResponse.json(schema, {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
