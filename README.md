# Sanctuary Yoga - Multi-Vendor Marketplace Demo

A Next.js/Tailwind website for a yoga teacher marketplace demo.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Booking:** Picktime (free forever) or iframe embed
- **Forms:** Tally.so (teacher waitlist)
- **Deployment:** Vercel
- **Future:** Zoneless for payment splitting (see below)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment (Vercel)

1. Connect GitHub repo to Vercel
2. Deploy automatically on push to main
3. Custom domain: sanctuary-yoga.com

## Admin Guide

### Update Contact Information

Edit `components/global/Footer.tsx`:
- Line 32-34: Address
- Line 35: Email (mailto:hello@sanctuary-yoga.com)
- Line 37: Phone (tel:+14155551234)

### Update Forms

**Teacher Waitlist:**
Edit `components/sections/TeacherWaitlistSection.tsx` - Replace form with Tally embed:
```jsx
<iframe src="https://tally.sh/embed/YOUR_FORM_ID"></iframe>
```

**Booking:**
Edit `components/global/Navbar.tsx` - Update booking modal or link to Cal.com

### Replace Images

- Hero video: `components/sections/HeroSection.tsx` (line 30)
- Replace with your own video URL

## Sections

- Hero (home)
- How It Works
- Philosophy
- Schedule
- Teachers
- Pricing
- Journal
- Teacher Waitlist
- Contact/Footer

## Pages

- `/` - Home
- `/about` - About page
- `/classes` - Class listings
- `/teachers` - Teacher profiles
- `/contact` - Contact form
- `/blog` - Journal

## Future: Payment Splitting with Zoneless

Zoneless (https://github.com/zoneless) is an open-source alternative to Stripe Connect for split payments.

**For Phase 2 (multi-vendor payments):**
- Teachers can receive payments directly through the platform
- Automatic commission splitting between platform and instructors
- Research Zoneless integration when ready for production

## License

Proprietary - All rights reserved.