export interface YogaClass {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  duration: string;
  level: string;
  price: number;
  img: string;
  schedule: string[];
  benefits: string[];
  whatToExpect: string[];
  equipment: string[];
}

export const yogaClasses: YogaClass[] = [
  {
    id: "vinyasa",
    name: "Vinyasa Flow",
    description: "A breath-synchronized movement practice connecting postures in seamless, meditative flow.",
    longDescription: "Vinyasa is a dynamic practice that links movement with breath in a continuous flow. Each class is unique, building heat, strength, and flexibility while cultivating mindful awareness. Suitable for all levels, with modifications offered for beginners and advanced variations for experienced practitioners. You'll move through sun salutations, standing poses, balances, and a grounding cool-down to leave feeling energized and centered.",
    duration: "60 min",
    level: "All Levels",
    price: 32,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    schedule: ["Mon/Wed/Fri 7:00 AM", "Tue/Thu 9:30 AM", "Sat 10:00 AM"],
    benefits: ["Builds functional strength", "Improves flexibility", "Enhances cardiovascular health", "Develops breath awareness"],
    whatToExpect: ["Opening breathwork", "Sun salutations", "Standing & balancing sequences", "Peak pose exploration", "Cool down & Savasana"],
    equipment: ["Yoga mat", "Comfortable clothing", "Water bottle", "Optional: blocks & strap"],
  },
  {
    id: "yin",
    name: "Yin Yoga",
    description: "A slow, floor-based practice targeting deep connective tissue.",
    longDescription: "Yin Yoga is a meditative practice targeting the deep connective tissues — fascia, ligaments, and joints. Poses are held for 3-5 minutes, allowing the body to release tension gradually while the mind settles into stillness. This practice complements more active styles and is especially beneficial for stress relief, improved circulation, and joint mobility. Props like bolsters and blankets support the body fully in each pose.",
    duration: "75 min",
    level: "Beginner Friendly",
    price: 32,
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    schedule: ["Mon/Wed 6:00 PM", "Sun 11:00 AM"],
    benefits: ["Increases joint mobility", "Reduces stress & anxiety", "Improves circulation", "Cultivates patience & stillness"],
    whatToExpect: ["Gentle centering", "5-7 long-held poses", "Supported restorative shapes", "Guided breath awareness", "Extended Savasana"],
    equipment: ["Yoga mat", "Bolster or firm pillow", "Blanket", "Two yoga blocks"],
  },
  {
    id: "meditation",
    name: "Breathwork & Meditation",
    description: "Guided meditation and pranayama techniques to calm the mind and deepen awareness.",
    longDescription: "This class combines traditional pranayama (breath control) techniques with guided meditation practices. You'll learn to use the breath as an anchor for presence, developing tools that extend beyond the mat into daily life. Sessions include body scans, visualization, mantra work, and silent sitting. No experience required — simply come with an open mind and willingness to explore inward.",
    duration: "45 min",
    level: "All Levels",
    price: 28,
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80",
    schedule: ["Tue/Thu 12:00 PM", "Sat 9:00 AM"],
    benefits: ["Reduces cortisol levels", "Improves focus & clarity", "Strengthens emotional regulation", "Enhances sleep quality"],
    whatToExpect: ["Gentle stretching warm-up", "Pranayama techniques", "Guided meditation", "Silent sitting practice", "Closing reflection"],
    equipment: ["Cushion or chair", "Blanket for comfort", "Eye pillow (optional)"],
  },
  {
    id: "sound",
    name: "Sound Healing Journey",
    description: "Immersive sessions with crystal singing bowls, gongs, and tuning forks.",
    longDescription: "Sound healing uses vibrational frequencies to bring the body and mind into a state of deep relaxation and harmony. Using crystal singing bowls, Tibetan bowls, gongs, and tuning forks, these sessions create a soundscape that resonates with the body's natural frequencies. Participants lie fully supported in stillness while sound washes over them — a deeply restorative experience for nervous system regulation and energetic rebalancing.",
    duration: "60 min",
    level: "All Levels",
    price: 45,
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    schedule: ["Fri 7:00 PM", "Sun 4:00 PM"],
    benefits: ["Deep nervous system reset", "Reduces chronic tension", "Enhances meditation practice", "Promotes emotional release"],
    whatToExpect: ["Setting intention", "Supported lying position", "Progressive sound journey", "Silent integration", "Gentle return & grounding"],
    equipment: ["Yoga mat", "Blanket", "Eye pillow", "Small pillow for head support"],
  },
  {
    id: "power",
    name: "Power Vinyasa",
    description: "An athletic, strength-building practice with challenging sequences.",
    longDescription: "Power Vinyasa takes the vinyasa foundation and turns up the intensity. Expect athletic sequences, arm balance explorations, inversions, and sustained holds that build heat and challenge your edge. This class is designed for those who want a physically demanding practice that builds functional strength, stamina, and mental resilience. Modifications are always available — the practice meets you at your level.",
    duration: "75 min",
    level: "Intermediate",
    price: 35,
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    schedule: ["Mon/Wed/Fri 5:30 PM", "Tue/Thu 6:00 AM"],
    benefits: ["Builds muscular strength", "Boosts metabolism", "Improves balance & coordination", "Develops mental resilience"],
    whatToExpect: ["Dynamic warm-up", "Sun salutation variations", "Arm balance work", "Peak pose challenge", "Cool down integration"],
    equipment: ["Yoga mat", "Grip towel", "Water bottle", "Yoga blocks"],
  },
  {
    id: "restore",
    name: "Restorative",
    description: "Deeply supported poses with props for complete relaxation.",
    longDescription: "Restorative Yoga is the art of conscious rest. Using an abundance of props — bolsters, blankets, blocks, and eye pillows — poses are fully supported so the body can release completely. This practice activates the parasympathetic nervous system, allowing deep restoration on physical, mental, and emotional levels. Perfect for those recovering from injury, managing stress, or anyone needing a gentle counterbalance to a busy life.",
    duration: "90 min",
    level: "All Levels",
    price: 32,
    img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
    schedule: ["Sun 2:00 PM"],
    benefits: ["Deep stress relief", "Supports recovery & healing", "Improves sleep", "Calms the nervous system"],
    whatToExpect: ["Gentle arrival", "4-5 fully supported poses", "Guided relaxation", "Minimal instruction", "Extended Savasana (15+ min)"],
    equipment: ["Yoga mat", "2 blankets", "Bolster or firm pillow", "Eye pillow", "2 blocks"],
  },
];

export function getClassById(id: string): YogaClass | undefined {
  return yogaClasses.find((c) => c.id === id);
}

export function getAllClassIds(): string[] {
  return yogaClasses.map((c) => c.id);
}
