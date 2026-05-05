export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sanctuary-yoga.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/classes", "/schedule", "/teachers", "/about", "/blog", "/contact"],
      disallow: ["/api", "/cart", "/checkout", "/login", "/account"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
