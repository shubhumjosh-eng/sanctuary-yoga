export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sanctuary-yoga.com";

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "classes", priority: 0.9 },
    { path: "schedule", priority: 0.8 },
    { path: "teachers", priority: 0.8 },
    { path: "about", priority: 0.7 },
    { path: "contact", priority: 0.7 },
    { path: "blog", priority: 0.6 },
    { path: "journal", priority: 0.6 },
    { path: "courses", priority: 0.6 },
    { path: "events", priority: 0.5 },
    { path: "testimonials", priority: 0.5 },
    { path: "cart", priority: 0.3 },
    { path: "checkout", priority: 0.3 },
    { path: "login", priority: 0.3 },
  ];

  const classRoutes = [
    "vinyasa", "yin", "meditation", "sound", "power", "restore"
  ].map((id) => ({
    path: `classes/${id}`,
    priority: 0.75,
  }));

  const allRoutes = [...staticRoutes, ...classRoutes];

  return allRoutes.map(({ path, priority }) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority,
  }));
}
