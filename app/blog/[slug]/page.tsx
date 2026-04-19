"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";

const articles: Record<string, {
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  img: string;
  content: string[];
}> = {
  "breath-as-anchor": {
    title: "The Breath as Anchor: Finding Stillness in Motion",
    category: "Practice",
    author: "Elena Vasquez",
    authorRole: "Lead Instructor · Vinyasa",
    date: "April 12, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80",
    content: [
      "There is a moment in every practice — whether you're holding Warrior II or sitting in traffic — when the breath becomes audible. Not to the room, but to yourself. You notice it. The inhale, the pause, the release. And in that noticing, something shifts.",
      "This is what I mean by the breath as anchor. Not a technique you perform, but a frequency you tune into. The breath is always happening, which means the anchor is always available. You don't need a mat. You don't need twenty minutes. You need a moment of remembering.",
      "In yoga, we call this pratyahara — drawing the senses inward. But you don't need a Sanskrit term to practice it. You just need to pause, and breathe, and notice.",
      "Try this right now: Without changing anything, simply notice your breath. Don't deepen it. Don't slow it. Just notice the sensation of air moving through your nose, the rise and fall of your chest. Set a timer for sixty seconds and stay with it.",
      "Did you notice how the mind wanted to jump ahead? Mine does too. The to-do list, the conversation from yesterday, the vague anxiety about something unnamed. The mind is a jumping bean. The breath is the mat it lands on.",
      "This is why in vinyasa practice we link movement with breath. The linking is not mechanical. It's relational. The breath becomes the container for everything else — the thoughts, the sensations, the emotions. You stop fighting them and start holding them.",
      "Over time, this practice of noticing the breath begins to leak out of the yoga room. You catch yourself in an argument, and you notice your breath shortening. You pause. You let the breath come back. And the argument either ends or softens or continues with more space in it. Either way, you've gained something.",
      "The stillness we're after isn't the absence of motion. It's the presence of awareness. The breath is the easiest doorway in.",
    ],
  },
  "why-yin": {
    title: "Why Your Body Needs Yin",
    category: "Philosophy",
    author: "Kenji Tanaka",
    authorRole: "Senior Teacher · Yin & Sound",
    date: "April 5, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80",
    content: [
      "We live in a culture obsessed with yang. Output, effort, results, efficiency. The gym is full of people trying to burn something. We're always pushing, building, achieving.",
      "And yet — something is missing. Chronic tension. Chronic fatigue. Chronic restlessness. We are a culture that has forgotten how to be still.",
      "Yin yoga is not about doing less. It's about receiving more. In a yin practice, we hold postures for three to five minutes — sometimes longer. We move past the muscle and into the connective tissue, the fascia, the places that hold our deepest tensions.",
      "This is uncomfortable at first. Not because the poses are difficult, but because we're not used to being with ourselves without distraction. The first five minutes of yin are usually the hardest. The mind wants to leave. The body wants to fidget. We stay anyway.",
      "What happens next is worth the discomfort. Around minute three, something softens. The edge where you were fighting becomes a place you can be with. The resistance becomes receptivity. This is the yin quality — the capacity to receive rather than push, to soften rather than strengthen.",
      "We need this quality now more than ever. The nervous system is constantly under siege — notifications, deadlines, social comparison, noise. Yin practice is an antidote. Not an escape, but a practice of returning to the body, which returns us to the present, which is the only place peace is available.",
    ],
  },
  "sound-healing-101": {
    title: "Sound Healing 101: Frequencies and the Nervous System",
    category: "Science",
    author: "Amara Osei",
    authorRole: "Sound & Meditation",
    date: "March 28, 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80",
    content: [
      "For thousands of years, cultures around the world have used sound as medicine. Tibetan monks used singing bowls. Indigenous peoples used drums and chanting. Now, modern neuroscience is beginning to understand why.",
      "When we hear sound — particularly sustained, harmonic sound like a singing bowl or crystal tone — the brain waves begin to entrain with that frequency. This is called auditory driving. The nervous system, which is constantly scanning for threats, receives a signal: everything is okay. The sound is consistent. The world is not attacking us.",
      "This signal cascades through the body. Heart rate slows. Breath deepens. The default mode network — the part of the brain responsible for self-referential thought and worry — quiets. The amygdala, the brain's threat detector, reduces its activity. We move from survival mode to rest mode.",
      "In a sound healing session at Sanctuary, we use crystal singing bowls tuned to specific frequencies, planetary gongs, and Himalayan bowls. Each instrument creates different overtones and vibrations that interact with the body's own resonant frequencies. The effect is cumulative — the longer you rest in sound, the deeper the relaxation.",
      "This is not woo. It's physics. Everything vibrates. The body is approximately 70% water, and water is an excellent conductor of sound. When you lie on a mat surrounded by bowls and gongs, you are literally being immersed in sound waves that affect you at a cellular level.",
      "The experience is often profound. People report feelings of deep peace, emotional release, expanded awareness, and sometimes — in the case of gong sessions — complete dissolution of the sense of self for moments at a time. This is not mystical. This is neuroscience. When the self-referential thinking quiets enough, what remains is simply presence.",
    ],
  },
  "morning-ritual": {
    title: "Building a Morning Ritual That Actually Sticks",
    category: "Lifestyle",
    author: "Sofia Reyes",
    authorRole: "Yin & Restorative",
    date: "March 21, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80",
    content: [
      "I'm not going to tell you to wake up at 5am. I've tried it. It made me tired and resentful, which is not a great foundation for presence.",
      "What I will suggest is this: the quality of your morning shapes the quality of your day, and the quality of your day shapes the quality of your life. This is not a productivity hack. It's a practice of intentionality.",
      "The key word is 'ritual,' not 'routine.' A routine is something you do on autopilot. A ritual is something you do with attention. The difference is not in the activities but in how you approach them.",
      "Here's what I do: I wake up, I don't reach for my phone, and I sit on the edge of my bed for five minutes. I just breathe. I notice the quality of light, the sounds in the house, the feeling of my body. This is not meditation. It's just waking up slowly.",
      "Then I make tea — a ritual in itself. Heating the water, selecting the tea, the smell, the warmth of the cup. Everything is an opportunity for attention. The washing of the cup is a practice. The first sip is a practice.",
      "Then I move. Sometimes it's yin, sometimes it's a walk, sometimes it's just standing in the garden and breathing. The point is not what I do. The point is that I'm present while I do it.",
      "Start small. Five minutes of intentional breathing. One cup of tea without your phone. See what happens when you begin your day on purpose instead of by default.",
    ],
  },
  "props-as-teachers": {
    title: "When the Block Falls: Props as Teachers",
    category: "Practice",
    author: "Sofia Reyes",
    authorRole: "Yin & Restorative",
    date: "March 14, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1600&q=80",
    content: [
      "As a physical therapist, I'm often asked: 'Isn't using a block cheating?'",
      "My answer is always the same: The yoga pose is not the goal. The relationship between your body and the pose is the goal. If a prop helps you find that relationship, the prop is the teacher.",
      "Here's the thing about anatomy: everyone is different. Your hip sockets are shaped differently than mine. Your shoulder capsule has a different range than hers. Your hamstrings have been affected by years of sitting in ways that may or may not be reversible.",
      "When you use a block in a forward fold, you're not making the pose easier. You're making it appropriate. You're finding the version of the pose that teaches your body what the pose is meant to teach — not what it teaches the flexible person next to you.",
      "Props are intelligence. They allow us to work with reality instead of against it. They let us receive rather than force. In yin, where we're holding poses for minutes, a bolster under the knees in a reclined twist means the difference between relaxing into the pose and fighting to stay there.",
      "The resistance to props is ego. The willingness to use them is wisdom. The next time your block falls over — which it will, because they do — see if you can receive it as feedback rather than failure.",
    ],
  },
  "meditation-not-empty": {
    title: "Meditation Isn't About Emptying the Mind",
    category: "Philosophy",
    author: "Amara Osei",
    authorRole: "Sound & Meditation",
    date: "February 28, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1600&q=80",
    content: [
      "The biggest misconception in modern meditation culture is that meditation is about having no thoughts. You sit down, you close your eyes, and you wait for the silence to descend. When it doesn't — because it never does, not like that — you assume you're doing it wrong.",
      "You're not doing it wrong. That experience of thoughts, arising and dissolving, is the meditation. The noticing of thoughts is the practice.",
      "Think of the mind as a sky and thoughts as weather. You don't need to stop the weather to experience the sky. You just need to recognize that you are not the weather — you are the sky that contains it.",
      "In vipassana practice, which I teach, we call this 'noting.' When a thought arises, we note it gently — 'thinking' — and return to the breath. Not because the breath is more important than the thought, but because the breath is a stable reference point. It gives the mind something to come back to.",
      "Over time, the gap between noticing and being swept away by thoughts grows wider. You develop a slight separation. This is not detachment — it's observation. You can have the thought and also be aware that you're having it. You can feel the emotion and also be aware that you're feeling it.",
      "This is the gift of meditation. Not a blank mind, but a clear one. Not an absence of experience, but a presence within it. The practice is not about escaping the human experience. It's about inhabiting it fully.",
    ],
  },
};

export default function BlogArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-display-md text-charcoal mb-4">Article not found</h1>
          <p className="font-sans text-charcoal/60 mb-8">This article doesn't exist or may have been moved.</p>
          <button onClick={() => router.push("/blog")} className="px-6 py-2.5 rounded-full bg-charcoal text-linen text-sm font-sans">
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] overflow-hidden mb-12"
      >
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-linen via-linen/20 to-transparent" />
      </motion.div>

      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onClick={() => router.push("/blog")}
          className="kinetic-link font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors mb-12 inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </motion.button>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-sans bg-sage/20 text-sage">{article.category}</span>
            <span className="font-sans text-xs text-charcoal/40">{article.readTime}</span>
          </div>
          <h1 className="font-serif text-display-lg text-charcoal leading-tight mb-6">{article.title}</h1>
          <div className="flex items-center gap-4 pt-6 border-t border-[rgba(28,28,28,0.08)]">
            <div>
              <p className="font-sans text-sm font-medium text-charcoal">{article.author}</p>
              <p className="font-sans text-xs text-charcoal/50">{article.authorRole}</p>
            </div>
            <span className="text-charcoal/20">|</span>
            <p className="font-sans text-sm text-charcoal/50">{article.date}</p>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="prose"
        >
          {article.content.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
              className="font-sans text-charcoal/70 text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.article>
      </div>
    </div>
  );
}