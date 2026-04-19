"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const teachers = [
  {
    id: "elena",
    name: "Elena Vasquez",
    role: "Lead Instructor · Vinyasa",
    bio: "200hr RYT, trained in Mysore with 12 years of dedicated practice. Elena's teaching draws from Ashtanga roots with a modern, breath-first philosophy. She believes the mat is a laboratory for presence.",
    fullBio: "Elena discovered yoga in 2012 during a difficult period of transition. What started as physical practice became a complete life transformation. She traveled to Mysore, India to study under Sharath Jois, immersing herself in the traditional Ashtanga method. Today, she weaves those roots into a contemporary breath-led approach that is both grounded and luminous. Elena's classes are known for their precise alignment cues, poetic language, and the quality of stillness she creates in the room.",
    years: "12 years",
    training: ["200hr RYT Mysore, India", "500hr Advanced Training", "Prenatal Yoga Certified"],
    focus: ["Vinyasa", "Ashtanga", "Adjustments", "Pranayama"],
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80",
    classes: ["Morning Vinyasa Flow", "Power Vinyasa", "Pranayama"],
    instagram: "@elenavasquezyoga",
  },
  {
    id: "kenji",
    name: "Kenji Tanaka",
    role: "Senior Teacher · Yin & Sound",
    bio: "Studied under Paul Grilley in California. Kenji's Yin and Yoga Nidra practice invites stillness as the deepest form of movement. His sound healing sessions weave ancient frequencies with modern science.",
    fullBio: "Kenji came to yoga through martial arts, seeking to understand the relationship between body, breath, and energy. He studied directly under Paul Grilley, the pioneer who brought Yin Yoga to the West, and later trained in sound healing with sound therapy pioneers in Bali. His teaching bridges Eastern philosophy and Western anatomy, making ancient wisdom accessible to modern bodies. Kenji's sessions are meditative, spacious, and profoundly restorative.",
    years: "9 years",
    training: ["200hr RYT California", "Yin Yoga Certification (Paul Grilley)", "Sound Healing Certification"],
    focus: ["Yin", "Nidra", "Meridians", "Sound Healing"],
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    classes: ["Yin Yoga", "Sound Healing Journey", "Restorative"],
    instagram: "@kenjiyoga",
  },
  {
    id: "amara",
    name: "Amara Osei",
    role: "Sound & Meditation",
    bio: "Ceremonial sound practitioner and vipassana teacher. Amara weaves ancient frequencies with contemporary mindfulness for deeply restorative sessions that touch body, mind, and spirit.",
    fullBio: "Amara's path has taken her from West Africa to Southeast Asia, studying ancient sound traditions and meditation practices. She trained in Vipassana meditation under Sayadaw U Tejaniya and completed ceremonial sound training with tambura masters in India. At Sanctuary, she leads our meditation, breathwork, and sound healing programs. Her sessions are an invitation to sink beneath the noise of the mind into the quieter spaces where healing happens.",
    years: "7 years",
    training: ["Vipassana Teacher Training", "Sound & Ceremony Training", "Breathwork Facilitator"],
    focus: ["Sound Healing", "Vipassana", "Breathwork", "Ceremony"],
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    classes: ["Breathwork & Meditation", "Sound Healing Journey", "New Moon Ceremony"],
    instagram: "@amarasounds",
  },
  {
    id: "sofia",
    name: "Sofia Reyes",
    role: "Yin & Restorative",
    bio: "Physical therapist turned yoga teacher, Sofia bridges anatomy and yoga with precision and care. Her classes are slow, specific, and deeply therapeutic.",
    fullBio: "Sofia spent eight years as a physical therapist before discovering yoga as a complement to her clinical work. She completed her 200hr training with Corina Benner and later specialized in Restorative Yoga with Judith Hanson Lasater. Her background in PT gives her a unique ability to read bodies and offer targeted adjustments. Sofia teaches anatomy-informed Yin and Restorative classes that are both healing and illuminating.",
    years: "6 years",
    training: ["Physical Therapy Degree", "200hr RYT", "Restorative Yoga Specialist"],
    focus: ["Yin", "Restorative", "Therapeutic Yoga", "Anatomy"],
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    classes: ["Gentle Yin & Restore", "Restorative", "Yoga Therapy"],
    instagram: "@sofiarestorative",
  },
];

export default function TeachersPage() {
  const router = useRouter();

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
            The Teachers
          </p>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">
            Held by those<br />who have walked it.
          </h1>
          <p className="font-sans text-charcoal/60 max-w-xl text-lg leading-relaxed">
            Our teachers are practitioners first. They bring not just training, 
            but direct experience — years of personal practice that inform every 
            adjustment, every word, every moment of teaching.
          </p>
        </motion.div>
      </section>

      {/* Teachers Grid */}
      <div className="space-y-24">
        {teachers.map((teacher, i) => (
          <motion.section
            key={teacher.id}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`px-6 md:px-10 max-w-7xl mx-auto ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center`}>
              {/* Image */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 md:-right-8 px-5 py-3 rounded-2xl glass">
                  <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider">
                    Experience
                  </p>
                  <p className="font-serif text-2xl text-charcoal">{teacher.years}</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-2">
                  {teacher.role}
                </p>
                <h2 className="font-serif text-display-md text-charcoal mb-4">
                  {teacher.name}
                </h2>
                <p className="font-sans text-charcoal/60 leading-relaxed mb-6">
                  {teacher.fullBio}
                </p>

                {/* Training */}
                <div className="mb-6">
                  <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mb-2">
                    Training & Certs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.training.map((cert) => (
                      <span
                        key={cert}
                        className="px-3 py-1 rounded-full text-xs font-sans bg-stone/30 text-charcoal/60"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="mb-8">
                  <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mb-2">
                    Focus Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.focus.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-full text-xs font-sans bg-sage/10 text-sage"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Classes & CTA */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[rgba(28,28,28,0.08)]">
                  <div>
                    <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mb-2">
                      Classes
                    </p>
                    <p className="font-sans text-sm text-charcoal/70">
                      {teacher.classes.join(" · ")}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/cart?plan=private&teacher=${encodeURIComponent(teacher.name)}&price=145`)}
                    className="ml-auto px-6 py-2.5 rounded-full bg-terracotta text-white text-sm font-sans tracking-wider hover:bg-[#a36b5a] transition-colors duration-300"
                  >
                    Book with {teacher.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Private Sessions CTA */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 mx-6 md:mx-10 p-10 md:p-16 rounded-3xl bg-charcoal text-center"
      >
        <h3 className="font-serif text-display-md text-linen mb-4">
          Train with a teacher one-to-one
        </h3>
        <p className="font-sans text-linen/60 max-w-lg mx-auto mb-8">
          Private sessions offer personalized guidance tailored to your body, goals, and pace. 
          Available with any teacher — book below.
        </p>
        <button
          onClick={() => router.push("/classes")}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-linen text-charcoal font-sans text-sm tracking-wider hover:bg-stone transition-colors duration-300"
        >
          View Class Schedule
        </button>
      </motion.div>
    </div>
  );
}
