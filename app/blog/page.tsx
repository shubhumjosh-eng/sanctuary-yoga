"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
  {
    slug: "breath-as-anchor",
    title: "The Breath as Anchor: Finding Stillness in Motion",
    excerpt: "In the chaos of modern life, the breath remains the one tool always available to us. Here's how to use it.",
    category: "Practice",
    author: "Elena Vasquez",
    authorRole: "Lead Instructor · Vinyasa",
    date: "April 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    featured: true,
  },
  {
    slug: "why-yin",
    title: "Why Your Body Needs Yin",
    excerpt: "We live in a culture obsessed with Yang — effort, output, results. But the missing piece might be in the stillness.",
    category: "Philosophy",
    author: "Kenji Tanaka",
    date: "April 5, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
  {
    slug: "sound-healing-101",
    title: "Sound Healing 101: Frequencies and the Nervous System",
    excerpt: "How the ancient practice of sound healing is being validated by modern neuroscience.",
    category: "Science",
    author: "Amara Osei",
    date: "March 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
  },
  {
    slug: "morning-ritual",
    title: "Building a Morning Ritual That Actually Sticks",
    excerpt: "Not another productivity hack. A practice rooted in presence, not performance.",
    category: "Lifestyle",
    author: "Sofia Reyes",
    date: "March 21, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
  {
    slug: "props-as-teachers",
    title: "When the Block Falls: Props as Teachers",
    excerpt: "Why using props isn't cheating — it's intelligent. A PT's perspective on support in yoga.",
    category: "Practice",
    author: "Sofia Reyes",
    date: "March 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
  },
  {
    slug: "meditation-not-empty",
    title: "Meditation Isn't About Emptying the Mind",
    excerpt: "The biggest misconception in modern meditation culture — and what to do instead.",
    category: "Philosophy",
    author: "Amara Osei",
    date: "February 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80",
  },
];

const categories = ["All", "Practice", "Philosophy", "Science", "Lifestyle"];

export default function BlogPage() {
  const [filter, setFilter] = useState("All");

  const filteredArticles = filter === "All" ? articles : articles.filter((a) => a.category === filter);
  const featuredArticle = articles.find((a) => a.featured);
  const restArticles = filteredArticles.filter((a) => !a.featured || filter !== "All");

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">Journal</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">Words on practice</h1>
          <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed">
            Reflections from our teachers on yoga, breath, stillness, and the art of being human.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-300 ${
                filter === cat ? "bg-charcoal text-linen" : "bg-stone/30 text-charcoal/60 hover:bg-stone/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filter === "All" && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden">
                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-sans bg-sage/20 text-sage">{featuredArticle.category}</span>
                  <span className="font-sans text-xs text-charcoal/40">{featuredArticle.readTime}</span>
                </div>
                <h2 className="font-serif text-display-md text-charcoal group-hover:text-sage transition-colors duration-300 mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="font-sans text-charcoal/60 leading-relaxed mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4">
                  <p className="font-sans text-sm text-charcoal/50">{featuredArticle.author} · {featuredArticle.date}</p>
                  <span className="kinetic-link font-sans text-sm text-charcoal/60">Read more →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filter === "All" ? restArticles : filteredArticles).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${article.slug}`} className="group cursor-pointer">
                <div className="relative h-52 rounded-2xl overflow-hidden mb-5">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-sans text-charcoal">{article.category}</div>
                </div>
                <h3 className="font-serif text-xl text-charcoal group-hover:text-sage transition-colors duration-300 mb-2">{article.title}</h3>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-xs text-charcoal/40">{article.author}</p>
                  <p className="font-sans text-xs text-charcoal/40">{article.readTime}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 p-10 md:p-16 rounded-3xl bg-sage/10 border border-sage/20 text-center"
        >
          <h3 className="font-serif text-3xl text-charcoal mb-3">Stay in the loop</h3>
          <p className="font-sans text-charcoal/60 max-w-md mx-auto mb-8">
            New reflections from our teachers, monthly. No spam, just practice.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3 rounded-full border border-[rgba(28,28,28,0.1)] bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none transition-colors duration-300" />
            <button type="submit" className="px-8 py-3 rounded-full bg-charcoal text-linen font-sans text-sm tracking-wider hover:bg-charcoal/80 transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}