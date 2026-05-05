import { getClassById, getAllClassIds } from "@/data/classes";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Users, DollarSign, Check, MapPin } from "lucide-react";

const LOCATIONS = ["Studio A, Central", "Wellness Space, TST"];
const DAYS_MAP: Record<number, string> = {
  0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday",
  4: "Thursday", 5: "Friday", 6: "Saturday",
};

function parseSchedule(schedule: string[]) {
  return schedule.map((s) => {
    const parts = s.split(" ");
    const dayPart = parts[0];
    const timePart = parts[1];
    return { dayPart, timePart, raw: s };
  });
}

function generateJSONLD(cls: NonNullable<ReturnType<typeof getClassById>>) {
  return {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: cls.name,
    description: cls.longDescription,
    category: "Yoga",
    level: cls.level,
    duration: `PT${parseInt(cls.duration) || 60}M`,
    offers: {
      "@type": "Offer",
      price: cls.price.toFixed(2),
      priceCurrency: "HKD",
    },
  };
}

export function generateStaticParams() {
  return getAllClassIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = { id: "vinyasa" };
  const cls = getClassById(id);
  if (!cls) return { title: "Class Not Found | Sanctuary Yoga" };
  return {
    title: `${cls.name} · Sanctuary Yoga Studio`,
    description: cls.description,
  };
}

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = { id: "vinyasa" };
  const cls = getClassById(id);

  if (!cls) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl text-charcoal mb-4">Class Not Found</h1>
          <Link href="/classes" className="text-sage hover:underline">← Back to all classes</Link>
        </div>
      </div>
    );
  }

  const scheduleParsed = parseSchedule(cls.schedule);

  return (
    <div className="pb-24">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJSONLD(cls)) }}
      />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[350px] max-h-[600px]">
        <Image
          src={cls.img}
          alt={`${cls.name} yoga class at Sanctuary Yoga Studio`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-linen via-linen/20 to-transparent" />
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-sans text-charcoal/70 hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Classes
          </Link>
        </div>
        <div className="absolute bottom-10 left-6 md:left-10 z-10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-2">
            {cls.level}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal">
            {cls.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 mb-10 p-6 rounded-2xl bg-white/80 backdrop-blur border border-[rgba(28,28,28,0.07)]">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-sage" />
                <div>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wide">Duration</p>
                  <p className="font-sans text-sm font-medium">{cls.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-sage" />
                <div>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wide">Price</p>
                  <p className="font-sans text-sm font-medium">HK${cls.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sage" />
                <div>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wide">Location</p>
                  <p className="font-sans text-sm font-medium">{LOCATIONS[0]}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-charcoal mb-4">About This Class</h2>
              <p className="font-sans text-charcoal/65 leading-relaxed text-base">{cls.longDescription}</p>
            </div>

            {/* What to Expect */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-charcoal mb-6">What to Expect</h2>
              <div className="space-y-3">
                {cls.whatToExpect.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center font-sans text-xs font-medium text-sage">
                      {i + 1}
                    </span>
                    <p className="font-sans text-charcoal/65 pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-charcoal mb-6">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cls.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-sage flex-shrink-0" />
                    <p className="font-sans text-sm text-charcoal/65">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="font-serif text-3xl text-charcoal mb-6">What to Bring</h2>
              <div className="flex flex-wrap gap-2">
                {cls.equipment.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-sans bg-stone/30 text-charcoal/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Book Now Card */}
              <div className="rounded-2xl bg-charcoal text-linen p-8 mb-8">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-linen/40 mb-2">
                  {cls.name}
                </p>
                <p className="font-serif text-5xl text-linen mb-6">
                  HK${cls.price}
                </p>
                <Link
                  href={`/cart?session=${encodeURIComponent(cls.name)}&price=${cls.price}`}
                  className="block w-full text-center py-4 rounded-full bg-terracotta text-white font-sans text-sm tracking-wider hover:bg-[#a36b5a] transition-colors duration-300"
                >
                  Book Now
                </Link>
              </div>

              {/* Schedule */}
              <div className="rounded-2xl border border-[rgba(28,28,28,0.07)] p-6">
                <h3 className="font-serif text-xl text-charcoal mb-4">Weekly Schedule</h3>
                <div className="space-y-3">
                  {scheduleParsed.map(({ raw, dayPart, timePart }, i) => (
                    <Link
                      key={i}
                      href={`/cart?session=${encodeURIComponent(cls.name)}&price=${cls.price}&time=${encodeURIComponent(raw)}`}
                      className="flex items-center justify-between py-3 border-b border-[rgba(28,28,28,0.06)] last:border-0 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-sage" />
                        <span className="font-sans text-sm text-charcoal/70">{raw}</span>
                      </div>
                      <span className="font-sans text-xs text-charcoal/30 group-hover:text-terracotta transition-colors">
                        Book →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
