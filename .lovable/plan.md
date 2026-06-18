## Goal
Replace the current static homepage hero with a rotating 3-slide Carnival 2026 hero, themed around stamina, recovery, and local pickup at Lower Nevis Street. Keep the rest of the homepage (featured products, categories, etc.) unchanged.

## Slides

**Slide 1 — Stamina (Pre-Carnival)**
- Headline: "Feel the Rhythm. Build Your Stamina."
- Sub: "Prepare for the road with Treasure Man and Treasure Woman. Energy, focus and endurance from T-Shirt Mas to Last Lap."
- CTA: "Shop Endurance Boosters" → `/products?cat=natural-wellness`
- Background: existing Treasure lineup image with botanical/gold overlay.

**Slide 2 — J'ouvert Recovery**
- Headline: "J'ouvert Morning Clear-Up & Recovery."
- Sub: "Wash off paint, powder and festival exhaustion. Rehydrate and protect your liver with Treasure Herbs and our herbal detox blends."
- CTA: "Browse Recovery Teas" → `/products?cat=natural-wellness`
- Background: deep botanical gradient with leaf accents (no new image generation unless requested).

**Slide 3 — Local Pickup + WhatsApp**
- Headline: "Stock Up Locally in St. John's."
- Sub: "Lower Nevis Street, by Cherry Jamdon Club. Pop in before Carnival City or tap to order on WhatsApp for regional delivery."
- CTA: "Message to Order Instantly" → WhatsApp deep link with pre-filled Carnival Stamina Combo message
- Background: existing storefront image.

## Behavior
- Auto-advance every 6s; pause on hover/focus.
- Prev/next arrows, slide dots, swipe on touch.
- Respect `prefers-reduced-motion` (no auto-advance, no slide animation).
- Each slide has its own H1 only when active (use a single visible `<h1>` per page — slide 1's headline is the H1, others render as `<h2>` for accessibility).
- All copy goes through `tr()` so Spanish / French / Portuguese translations stay in sync (i18n keys added).

## SEO / GEO
- Add a visually-subtle "Carnival 2026" eyebrow on slides 1 & 2 so the term appears in rendered HTML.
- Inject Carnival keywords into the homepage `head()` description and add a hidden `<p className="sr-only">` block with the three target phrases:
  - "Antigua Carnival 2026 health recovery remedies"
  - "Best energy boosters for T-Shirt Mas Antigua"
  - "Natural detox teas in Saint John's"
- Add an `Event` JSON-LD entry to the existing `@graph` in `__root.tsx` for Antigua Carnival 2026 (Jul 25 – Aug 4, 2026, St. John's) with `organizer: Noyis Africa` so AI search can attribute the page to the event.
- Add one factual-grounding line under the active slide subhead: "Formulated with Caribbean botanical extracts to support recovery from intense dehydration."

## WhatsApp link
- Reuse existing `src/lib/whatsapp.ts` helper. New message template:
  > "Hello NOYIS AFRICA! I'm preparing for Antigua Carnival 2026. I'd like to order the Stamina Combo (Treasure Man + Treasure Herbs) for pickup at Lower Nevis Street. Please send total pricing. Thank you!"

## Technical

- New file: `src/components/carnival-hero.tsx` — self-contained slider using local `useState` + `useEffect` interval, no new dependencies (no Embla/Swiper). Reuses existing `Button`, lucide icons, and Tailwind tokens (`botanical`, `gold`).
- Edit `src/routes/index.tsx`: replace the current `<section>` HERO block (lines ~58-90) with `<CarnivalHero />`. Leave everything below the hero alone.
- Edit `src/routes/__root.tsx`: extend the JSON-LD `@graph` with the `Event` node; do not touch existing nodes.
- Edit `src/lib/i18n.ts`: add new translation keys for slide copy in en/es/fr/pt.
- No DB or backend changes.

## Out of scope (ask before adding)
- New imagegen artwork for slides 1 & 2 (current plan uses existing assets + gradient).
- A standalone `/carnival` route.
- Storewide banner outside the homepage.

After approval I'll implement and you can publish to push it live.
