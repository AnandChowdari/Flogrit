# Captiongrit — Calm Linear-style Redesign

## What's wrong right now
- Home view is packed: hero text + big rotated demo + floating badge + trust chips + underline squiggle all fight for attention.
- The neo-brutalist sticker vocabulary (blue offset shadows on Buy Now, rotated tape badges, hand-drawn coral/blue underline, rotated demo card) reads as immature next to a premium plugin.
- Live demo mock is busy and doesn't feel like the real Adobe panel.
- Blue is used as a *decoration* (shadows, tape) instead of as a *highlight* for meaning.

## Direction
Move from "playful sticker" → "calm engineered product page" (Linear / Mercury / Framer register). Lime + blue stay, but their **role** changes: lime is the primary product accent, blue is used sparingly as a semantic highlight on key words ("seconds", "one‑time", "24 languages"). Backgrounds carry a soft lime→blue gradient wash for the premium feel.

## 1. Kill the sticker layer (global)
- Remove `.cg-brut` hard offset shadows, rotated tape badges, `cg-underline-coral` squiggle SVG, `-rotate-*` transforms on chips/cards, and the "Live Demo" floating tab.
- Replace with: flat rounded buttons, 1px hairline borders (`white/8`), soft shadows (`shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_20px_60px_-30px_rgba(198,255,52,0.25)]`), and quiet hover states (subtle brightness/translate-y-[1px]).
- Buttons: primary = solid lime on ink, no offset shadow; secondary = ghost with hairline border. Both get a gentle lime glow on hover, not a clunk.

## 2. Blue as a highlight token, not a shadow
- Introduce `.cg-hl` utility: `color: #60A5FA; font-weight: inherit;` — used inline on 1–2 words per headline max.
- Hero: "Don't waste hours. Create captions in <span class="cg-hl">seconds</span>."
- Pricing header, Features header, FAQ header: same pattern — one blue word.
- Remove blue from Buy Now shadow, Pro badge background, navbar dot, ambient radial. Those revert to lime or neutral.

## 3. Premium gradient background
- Body: base `#0B0B0F` ink.
- Add a single soft radial: lime (top‑left, 15% opacity, 900px blur) blending into blue (bottom‑right, 10%, 900px blur) — one layer, page-wide, fixed. This is the Lovable/Linear "aurora" feel.
- Kill per-section colored blobs.

## 4. Home view (above the fold) — breathe
Restructure hero to a **single-column, centered, narrow** layout:

```text
        [ small pill: v1.0 · Adobe Premiere + After Effects ]

              Don't waste hours.
        Create captions in seconds.          ← blue highlight on "seconds"

           [one-line subhead, muted, max-w-xl]

        [ Buy Now — from ₹399 ]   [ See how it works ]

            ·  one-time  ·  24 languages  ·  Win + Mac  ·
```

- No demo in the hero. The demo moves to its own dedicated section below the fold with proper framing.
- Trust items become a single thin inline row with `·` separators — not chips.
- Vertical rhythm: `pt-32 pb-40`, generous whitespace.

## 5. Redesign the "live demo" section
- Give it its own section titled "See it work inside Premiere Pro."
- Replace the current 9-widget mock with a **still, high-fidelity Adobe panel screenshot mock** (dark panel, real-looking dropdown for language, one "Generate Captions" lime button, one clean caption preview line). Static > animated for calm.
- Frame it inside a realistic browser/app chrome (three dots, title bar) with soft shadow. No rotation, no floating badges.
- One subtle motion: caption line typewriters in once on scroll, then rests.

## 6. Thin the home page (defer content down or into sub-pages)
Current order = 12 sections stacked. New order, tightened:

1. Hero (new, minimal)
2. Logo/social proof strip (thinner, one line)
3. Live demo section (new)
4. How it works (3 steps, horizontal, icon+label only)
5. Features (6 → 4 cards, one-line each, icon on left)
6. Languages (marquee stays, but muted — no rotated chips)
7. Pricing (kept, but cards flattened — see below)
8. FAQ (accordion, tighter)
9. Final CTA (single line + button, no giant panel)

Cut from home (move to standalone routes or delete):
- `CaptionModesSection` → merge one line into Features.
- `ComparisonSection` → move to `/captiongrit/compare` route or delete.
- `TestimonialsSection` → keep only 1 quote inline above pricing, drop the section.

## 7. Pricing cards — flatten
- Remove sticker shadow, rotated "Most Popular" tape, blue Pro badge.
- Cards: hairline border, 1px, `bg-white/[0.02]`. Featured card gets a lime hairline + soft lime glow, nothing more.
- "Pro only" AI Verification badge → small inline lime pill next to feature name, not a floating tab.
- Buy button inside each card: flat lime on featured, ghost on others.

## 8. Typography & spacing pass
- Hero H1: drop from 4.5rem → `clamp(2.5rem, 5vw, 4rem)`, tighter tracking `-0.03em`, weight 700 not 900.
- Section headers: 2.5rem, weight 600, one blue word max.
- Body: `text-white/70`, `leading-[1.7]`.
- Section padding: `py-28 sm:py-32` uniformly.

## Files to touch
- `src/styles.css` — remove `.cg-brut`, `.cg-underline-coral`, sticker shadows, coral radial; add `.cg-hl`, aurora background, hairline utilities.
- `src/components/captiongrit/components/product/HeroSection.jsx` — rebuild as centered single-column, remove demo, remove chips.
- New `src/components/captiongrit/components/product/LiveDemoSection.jsx` — quiet Adobe-panel mock.
- `src/components/captiongrit/components/product/CaptiongritPluginDemo.jsx` — replace with static mock (or delete + inline into LiveDemoSection).
- `src/components/captiongrit/components/product/PricingSection.jsx` — flatten cards, fix Pro badge.
- `src/components/captiongrit/components/product/FeaturesSection.jsx` — 4 cards, remove tape.
- `src/components/captiongrit/components/product/LanguageMarquee.jsx` — remove rotation, quiet chips.
- `src/components/captiongrit/components/product/FinalCtaSection.jsx` — one-line CTA.
- `src/components/captiongrit/components/product/FaqSection.jsx` — remove blue open-state sticker.
- `src/components/captiongrit/components/layout/CaptiongritNavbar.jsx` — remove blue dot + brut button.
- `src/components/captiongrit/pages/products/CaptiongritPage.jsx` — new section order, drop CaptionModes/Comparison/Testimonials from home.

## Questions before I build
1. **Live demo replacement** — OK with a static, screenshot-style Adobe panel mock (typewriter-in on scroll only)? Or do you want me to try one clean animation (e.g., language dropdown → click Generate → caption line appears, once, then stops)?
2. **Sections to drop from home** — OK to remove CaptionModes, Comparison, and the full Testimonials section from the home page? (Comparison + Testimonials could live on `/captiongrit/compare` and inline as a single quote.)
3. **Playful tone** — full removal (no rotations, no sticker shadows, no hand-drawn underline anywhere), correct?
