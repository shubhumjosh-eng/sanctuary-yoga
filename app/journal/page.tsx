// app/journal/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal — Sanctuary',
  description: 'Wellness insights for Hong Kong life.',
};

const posts = [
  {
    id: 1,
    title: '5 Breathwork Exercises for the MTR Morning Commute',
    date: '2024-11-10',
    excerpt:
      'The 8:23 AM Tsuen Wan Line doesn't have to stress you out. Here are five discreet, powerful breathwork techniques you can practice with your eyes closed and your hand on the rail.',
    body: `Box breathing for the platform wait, the 4-7-8 technique for a packed carriage, how to use the tunnel dark as a meditation moment, why holding the handrail can ground you, and a morning affirmation for the final stop.`,
    author: 'Anjali Mehta',
  },
  {
    id: 2,
    title: 'Where to Find Silence in the Loudest City on Earth',
    date: '2024-11-20',
    excerpt:
      "There's no such thing as total silence in Hong Kong, but these five urban oases come close. Our teacher Suki Li shares her secret spots for a quiet sunrise practice.",
    body: `The hidden garden at Nan Lian, the empty ferry terminal at dawn, a tucked-away corner of the Zoological and Botanical Gardens, a quiet pier at Cyberport, and the importance of a home sanctuary corner.`,
    author: 'Suki Li',
  },
  {
    id: 3,
    title: "Corporate Wellness: Why Your Company Needs More Than a Health Talk",
    date: '2024-12-01',
    excerpt:
      'Jason Tsang, our corporate mindfulness lead, explains why a single workshop isn't enough, and what a real wellness strategy looks like for Hong Kong teams.',
    body: `The burnout statistics in HK finance and law, the difference between a perk and a practice, how to design a 6-week mindfulness program, the ROI of reduced turnover, and a real case study of a team that saw a 30% drop in sick leave after implementing Jason's methods.`,
    author: 'Jason Tsang',
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Banner */}
      <section className="bg-emerald-800 text-white py-20 text-center">
        <p className="text-sm uppercase tracking-widest mb-2">Demo Content</p>
        <h1 className="text-4xl md:text-5xl font-light">The Journal</h1>
        <p className="mt-4 text-stone-200 max-w-xl mx-auto">
          Thoughts on movement, stillness, and navigating life in Hong Kong.
        </p>
      </section>

      {/* Posts grid */}
      <div className="max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <p className="text-xs text-stone-400 mb-1">{post.date}</p>
            <h2 className="text-xl font-medium text-stone-800 mb-2">{post.title}</h2>
            <p className="text-stone-600 text-sm mb-4">{post.excerpt}</p>
            <p className="text-stone-500 text-xs uppercase tracking-wide">by {post.author}</p>
          </article>
        ))}
      </div>

      {/* Demo disclaimer */}
      <div className="text-center pb-8 text-stone-400 text-xs">
        Demo content — placeholder posts for demonstration only. Replace with real data upon purchase.
      </div>
    </div>
  );
}