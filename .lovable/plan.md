
# Plan — Pricing, Looping Reels, Testimonials, Live Feel

Goal: each pillar page (Attention / Conversion / Automation) gets its own dynamic pricing system inline. Attention gets a looping video gallery showing edited work. Every page picks up testimonials, scroll/hover animations, and a richer dark texture so the site feels alive instead of static.

## 1. Pricing data (per pillar)

Extend `src/lib/data.ts` with a new `pillarPricing` record keyed by pillar. Each pillar has 2–3 "tiers" (cards), and each tier has multiple **selectable quantity options** powering the dynamic card.

- **Attention**
  - *Simple Edits* — toggles: 4 / 8 / 12 / 20 videos (₹4k → ₹3.2k per video)
  - *Precise Edits* — toggles: 4 / 8 / 12 videos (cinematic, ₹7k → ₹6.2k per video)
  - *Content Engine retainer* — toggles: 1 / 3 / 6 months (strategy + shoot direction + posting)
- **Conversion**
  - *Landing page* — toggles: 1 / 3 / 5 pages (₹35k → ₹28k per page)
  - *Full site build* — toggles: 5 / 8 / 12 pages (from ₹1.2L)
  - *Funnel + copy system* — toggles: 1 / 2 / 3 funnels (research-backed market rates ₹60k–₹1.8L)
- **Automation**
  - *AI Chatbot (web + WhatsApp)* — toggles: 1 / 2 / 3 channels (₹45k → ₹95k setup + retainer)
  - *Voice AI agent* — toggles: 500 / 1500 / 3000 mins/mo (₹25k → ₹70k)
  - *CRM + workflow system* — toggles: Starter / Growth / Engine (₹35k / ₹75k / ₹1.4L per month)

Each tier card shows: tier name, tagline, the segmented toggle, the live computed price, per-unit price, included bullets, CTA.

## 2. Component: `<PricingMatrix pillar="…" />`

New file `src/components/pricing/PricingMatrix.tsx`.
- Renders the tier cards for a given pillar from `pillarPricing`.
- Each card uses local `useState` for selected option index.
- Segmented control (pill buttons) flips the option; price + per-unit animate (Framer Motion `AnimatePresence` + numeric tween).
- Hover: lime glow + slight lift (`shadow-[0_0_0_1px_var(--lime)/40,0_30px_60px_-20px_var(--lime)/20]`).
- Mount on `services.attention.tsx`, `services.conversion.tsx`, `services.automation.tsx` as a new "Pricing" section.
- Update `/pricing` page to render all three matrices stacked under section headers so the global pricing page stays consistent.

## 3. Looping reel gallery (Attention page)

New `src/components/attention/ReelGallery.tsx`.
- 6–8 cards, each is a CSS-driven looping "edit" preview: a small SVG/Canvas mock of a video player (timeline scrubber animates, waveform pulses, cut-marks flash) — no real video files needed. Uses the existing `reels` data for titles/clients/views.
- Auto-scrolling marquee row (uses existing `@keyframes marquee`) on top, static grid below; hover pauses marquee and shows a "play" lime ring with title overlay slide-up.
- Sits between hero and pricing on `/services/attention`.

## 4. Testimonials

Add `testimonials` array to `src/lib/data.ts` (6 entries, one+ tied to each pillar, with name/role/company/quote/metric).
New `src/components/site/Testimonials.tsx`:
- Marquee row of quote cards (infinite horizontal scroll, pauses on hover) + a featured "spotlight" card with avatar initials and metric chip.
- Cards have subtle lime border-glow on hover and a quote-mark watermark.
- Mounted on: home (`index.tsx`) before FinalCTA, and at the bottom of each pillar page.

## 5. Live feel — animations & dark texture

- **Global background texture:** layer the existing `grain` utility on `<body>` plus a new fixed `@utility noise-bg` (radial vignette + faint lime/purple aurora blobs that slowly drift via `@keyframes aurora-drift`). Implemented as a single fixed `<div aria-hidden>` inside `__root.tsx`.
- **Nav:** keep glass pill; add a soft animated lime underglow that pulses on scroll-stuck state and a hairline scanline texture inside the pill.
- **Section reveals:** wrap each pillar service card, pricing card, testimonial, reel card with Framer Motion `whileInView` (y:24 → 0, stagger 0.06s).
- **Hover micro-interactions:**
  - Buttons/cards → lime ring + scale 1.02 + cursor-tracking radial highlight (CSS `--mx/--my` vars updated on `onMouseMove`).
  - Service titles → `story-link` underline reveal.
  - Pricing numbers → swap with motion `key={option}` for a slot-machine feel.
- **Scroll progress bar** in nav (1px lime line) tied to `useScroll` from motion.
- **3D tilt** on the pricing tier cards and reel cards (lightweight: `rotateX/rotateY` from pointer position, no library).

## 6. Files

New:
- `src/components/pricing/PricingMatrix.tsx`
- `src/components/attention/ReelGallery.tsx`
- `src/components/site/Testimonials.tsx`
- `src/components/site/AmbientBackground.tsx` (fixed aurora + grain layer)
- `src/components/ui/TiltCard.tsx` (shared pointer-tilt wrapper)

Modified:
- `src/lib/data.ts` — add `pillarPricing`, `testimonials`.
- `src/styles.css` — `noise-bg`, `aurora-drift`, `tilt-card`, hover-glow utilities, scrollbar-progress keyframes.
- `src/routes/__root.tsx` — mount `<AmbientBackground />`, scroll progress bar.
- `src/routes/services.attention.tsx` — add ReelGallery + PricingMatrix + Testimonials.
- `src/routes/services.conversion.tsx` — add PricingMatrix + Testimonials.
- `src/routes/services.automation.tsx` — add PricingMatrix + Testimonials.
- `src/routes/pricing.tsx` — replace static tier blocks with three `<PricingMatrix>` instances.
- `src/routes/index.tsx` — slot Testimonials before FinalCTA.
- `src/components/site/Nav.tsx` — scroll progress + subtle inner scanline.

## Technical notes
- No new dependencies; uses already-installed `motion` and Tailwind v4 utilities.
- All prices live in `data.ts` so they stay editable in one place.
- Tilt + cursor-glow use pure React state + CSS vars — no perf hit.
- Aurora background is a single fixed element with `pointer-events:none` so it never blocks clicks.
- Respects `prefers-reduced-motion` (disables aurora drift, marquee, tilt).
