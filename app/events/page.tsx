// app/events/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events — Sanctuary',
  description: 'Past wellness events and gatherings.',
};

const events = [
  {
    id: 1,
    name: 'Full Moon Meditation on the Rooftop',
    date: '15 November 2024',
    leader: 'Anjali Mehta & Suki Li',
    description:
      'A 90-minute gathering under the full moon on the rooftop garden of a Sheung Wan creative space. We combined gentle yin yoga with a guided sound bath, ending with a silent moonlit tea ceremony. 40 attendees. A night for exhaling.',
    testimonial: '"It felt like a reset button for my entire nervous system." — Emma L.',
  },
  {
    id: 2,
    name: 'Desk Detox: A Pop-Up Lunchtime Session',
    date: '3 December 2024',
    leader: 'Jason Tsang',
    description:
      'We took over a conference room in Central for a 45-minute "desk detox." Jason led a chair-based yoga flow and mindfulness exercise designed to fit into a lunch break. No mat, no changing clothes. 15 participants from three different companies.',
    testimonial: '"I\'d never done yoga before, but I could actually focus for the rest of the afternoon." — Michael C.',
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Banner */}
      <section className="bg-amber-700 text-white py-20 text-center">
        <p className="text-sm uppercase tracking-widest mb-2">Demo Content</p>
        <h1 className="text-4xl md:text-5xl font-light">Past Events</h1>
        <p className="mt-4 text-stone-200 max-w-xl mx-auto">
          Glimpses of what we've built together.
        </p>
      </section>

      {/* Events list */}
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm p-8 hover:.shadow-md transition">
            <p className="text-xs text-stone-400 uppercase tracking-wide">{event.date}</p>
            <h2 className="text-2xl font-medium text-stone-800 mt-1">{event.name}</h2>
            <p className="text-emerald-700 text-sm mt-1 mb-4">Led by {event.leader}</p>
            <p className="text-stone-600 mb-4">{event.description}</p>
            <blockquote className="italic text-stone-500 border-l-4 border-amber-400 pl-4">
              {event.testimonial}
            </blockquote>
          </div>
        ))}
      </div>

      {/* Demo disclaimer */}
      <div className="text-center pb-8 text-stone-400 text-xs">
        Demo content — placeholder events for demonstration only. Replace with real data upon purchase.
      </div>
    </div>
  );
}