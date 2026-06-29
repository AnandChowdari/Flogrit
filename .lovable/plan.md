Updated plan with the new headline, hero animation, studio section, and the "two flows" adaptive narrative.

## The big idea

One homepage. One headline. **Reader picks their problem mid-scroll**, and the rest of the page reorders + rewords itself so their pillar leads and the other pillar gets pitched as the natural next step.

## Headline + hero

- H1: **"We create a flow of attention to leads for your business."**
- Sub: One line — *Content that earns reach. AI systems that turn that reach into booked calls.*
- CTAs: *Book a discovery call* (primary, lime) · *See the work* (ghost).
- Right side: the 3-circle hero animation (below).

## Hero animation — 3-circle flow

Canvas + particles, Framer Motion controls, ~60fps, respects `prefers-reduced-motion` (falls back to static SVG).

```text
   ┌─ Video Editing ─┐         ┌─ Meta Ads ──────┐         ┌─ CRM Sync ──────┐
   │ Content Strat.  │         │ AI Automation   │         │ WhatsApp/IG bots│
   │ Branding        │         │ SEO + Website   │         │ Voice Agents    │
   └────────┬────────┘         └────────┬────────┘         └────────┬────────┘
        ╭───▼───╮      ░░░         ╭────▼───╮     ░░░         ╭─────▼────╮
        │ REACH │ ━━━━━━━━━━━━━▶  │  LEADS │ ━━━━━━━━━━━━━▶  │ SYSTEMS  │
        ╰───────╯                  ╰────────╯                  ╰──────────╯
```

- 3 big nodes left→right, each pulsing in sequence; when a big node "lights up" its 3 sub-circles orbit in and dock.
- Particle stream flows between big nodes (lime particles, purple trails), continuous loop.
- On hover/tap a big node: sub-circles spread, labels animate in.
- Built with `<canvas>` for the particle field + a thin SVG overlay for the circles/labels so text stays crisp & accessible.

## Page flow

```text
1. HERO  (headline + 3-circle animation)
2. STUDIO STRIP  (reel wall — masonry of vertical reels, autoplay-on-hover, metric overlays)
3. THE GATE  ← personalization happens here
4. PILLAR A  (deep dive)
5. BRIDGE COPY  (rephrased per choice)
6. PILLAR B  (deep dive)
7. PROOF  (case studies + testimonials + stats)
8. PRICING  (video plans + AI engagement tiers + custom)
9. FAQ + FINAL CTA + FOOTER
```

## Studio strip (section 2)

Right after the hero, the vibe shifts hard — feels like walking into an edit bay.

- Dark masonry wall of 8–10 vertical reels (9:16), staggered heights.
- Each tile: poster frame → autoplays muted on hover, shows view-count + watch-time chip.
- Subtle film-grain overlay, lime scrubber line animating across the section header.
- Header: *"Built in our studio. Watched by your buyers."*
- No sales copy here — it's pure showcase, lets the work talk.

## The Gate (section 3) — inline, not modal

Full-bleed band with two giant tappable cards:

> **What's actually killing your growth right now?**
>
> - **A) "I can't build presence."** I'm invisible. Posts flop, no one knows the brand exists.
> - **B) "I get views but no customers."** Reach is fine, conversion is broken.

- Choice persists in `localStorage` (`flow=A|B`), can be re-toggled from a small chip in the sticky nav.
- No choice yet? Default = A. Page renders fine either way.
- Smooth Framer Motion reorder when toggled (`<Reorder.Group>` style, ~400ms).

## Two flows (same sections, reordered + reworded)

### Flow A — "Build presence first"

Pillar 1 = **Content & Reach** · Pillar 2 = **Conversion systems**

- Bridge line between them: *"Cool — you've got eyes on you. Now the harder part: turning watchers into buyers."*
- Pillar 1 gets the bigger visual real estate, Pillar 2 framed as "what comes next."

### Flow B — "I need conversion"

Pillar 1 = **Conversion systems** · Pillar 2 = **Content & Reach**

- Bridge line: *"Funnels only work if there's traffic in them. Here's how we keep filling the top."*
- Pillar 1 (AI/Ads) leads; Pillar 2 (Video) framed as the long-term moat.

Both flows pull from the same component library — only `order`, hero copy of each pillar section, and bridge-line text change. Driven by a single `useFlow()` hook.

## Pillar — Content & Reach (detailed)

- Section hero with lime scrubber animation.
- Services: **Video Editing · Content Strategy · Branding · Short-form reels · Long-form YouTube · Ad creatives**.
- Each service = card with mini animated icon + 2-line outcome + sample work link.
- Plans inline (from your sheet):
  - **Simple**: 4×4000 / 8×3800 / 12×3500
  - **Precise**: 4×7000 / 8×6800 / 12×6500
  - Chips: *Try one video first* · *Bulk campaign? Book a call*
- Custom band: SaaS animations · Product launch · Branding · *Starts ₹26,000*.

## Pillar — Conversion systems (detailed)

- Section hero with the **Ads → Automation → Conversion** SVG pipeline animating in.
- Services, each with its own subsection:
  - **Meta Ads** — creative + targeting + scaling.
  - **AI Automation Systems** — Meta/WhatsApp/Instagram message automations.
  - **Chatbots for websites** — qualify + book.
  - **Voice Agents** — 24/7 inbound + outbound.
  - **SEO Ranking** — content + technical + local.
  - **Websites that convert** — fast, tracked, lead-routed.
- "4 Lead Funnels" interactive diagram (4 nodes, tap to expand).
- Outbound arrow: *From messages to booked calls.*

## Sub-routes (depth + SEO)

```
/                      Adaptive home (everything above)
/services/content      Video + content + branding deep dive
/services/systems      Ads + AI + SEO + sites deep dive
/work                  Case study grid
/work/$slug            Long-form case study
/pricing               All plans side-by-side
/about                 Founder + studio + manifesto
/contact               Form + calendar CTA
```

Every route has its own `head()` (title, description, og:title/description). `og:image` only at leaves.

## Visual system

- **Palette**: bg `#121212`, fg `#F0F2C0`, primary lime `#C6FF34` (hover `#A8E109`), accent purple `#8671D3`. Tokens in `src/styles.css` as oklch.
- **Type**: Space Grotesk (display) · Inter Tight (body) · JetBrains Mono (numbers/labels), via `@fontsource`.
- **Texture**: subtle film grain overlay on dark sections, lime scanline accents in the studio strip.
- **Motion**: Framer Motion everywhere; one canvas animation (hero); reduced-motion path for everything.

## Technical

- TanStack Start file routes; `useFlow()` hook reads `localStorage` + URL `?flow=a|b` for shareable links.
- Page sections render through a single `<FlowOrdered />` component that takes an array and reorders by flow.
- Hero canvas isolated in its own client component, lazy-loaded, paused when off-screen via `IntersectionObserver`.
- Reel wall uses `<video muted playsinline preload="metadata">`; only plays on hover/in-view.
- All data (services, plans, cases, reels) in typed TS files — no backend in v1.
- Contact form posts to a stub server function (logs + returns ok). Real delivery later.
- SEO: per-route head(), semantic HTML, JSON-LD Organization on home + Article on case studies.

## Out of scope (v1)

Auth, CMS, real form delivery, blog, analytics dashboard, A/B testing infra. The flow toggle is the lightweight personalization — full A/B can come later.

## Build order

1. Tokens, fonts, nav, footer, root, `useFlow()` hook + flow context.
2. Hero (headline + canvas 3-circle animation + reduced-motion SVG fallback).
3. Studio reel-wall strip.
4. The Gate + flow reorder mechanics.
5. Pillar — Content & Reach (with both plan tables + custom band).
6. Pillar — Conversion systems (with 4-funnel + ads pipeline diagrams).
7. Proof, pricing, FAQ, final CTA.
8. Sub-routes: `/services/*`, `/work` + 1 case template + 3 cases, `/pricing`, `/about`, `/contact`.
9. SEO pass, reduced-motion pass, mobile pass.
