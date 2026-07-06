
# Captiongrit Redesign — Bold & Toy-like

## Positioning we're designing around
- **One-time purchase.** No subs, no seat licenses.
- **Lives inside Premiere Pro & After Effects** (Win + Mac).
- **Native + Roman captions** for Indian languages, hand-pickable.
- **Seconds, not hours.**

Every section will carry one of these four beats — no filler.

## Visual direction

Captiongrit needs to feel like a **toy that ships in a Flogrit box**: same DNA, different energy. Playful, chunky, tactile — but still engineered.

**Palette (Captiongrit-only tokens, scoped under `.captiongrit-container`):**
- Base: `#0B0B0F` ink, `#13131A` card
- Primary accent: `#C6FF34` (shared with Flogrit — the family tie)
- **New playful accent: `#FF5A3C` (hot coral)** — used on badges, stickers, tab pills, "Buy" hover states. This is what separates Captiongrit from Flogrit at a glance.
- Support: `#8B7BFF` soft violet for secondary chips
- Text: `#F5F5F0` / `#9A9AA5`

**Type:**
- Display: **Bricolage Grotesque** at very heavy weights (800/900) with tighter tracking — already in the Flogrit family, dialed up chunkier.
- Body: keep Inter Tight.
- Mono labels: JetBrains Mono for "SRT.file", timecodes, keyboard hints.

**Shape language:**
- Rounded-3xl everywhere (24–32px radii), no sharp corners.
- Chunky drop shadows offset (`8px 8px 0 #C6FF34` sticker-style) on key cards.
- Sticker-badges: rotated ±3°, dashed borders, tape-corner accents.
- Hand-drawn underline SVGs under key phrases.

**Motion register:**
- Springy (stiffness 400, damping 20) on hover — buttons squish and rebound.
- Elements enter with a slight overshoot + rotate (`rotate: -2 → 0`).
- **No heavy WebGL.** Ambient = 1 lime blob + faint grain (per your "Subtle" pick).

## Signature hero scene — "Watch the plugin work"

A stylized, isometric mock of the Premiere panel, ~500px wide, sitting to the right of the headline. Autoplaying loop, ~6s:

```text
1. Video clip pill slides into a timeline lane      (0.0s)
2. Captiongrit panel pops in, tilts 6° into place   (0.8s)
3. Language dropdown flips: "Telugu"                (1.6s)
4. Toggle switches ON: "Roman transliteration"      (2.2s)
5. Big lime "Generate" button squishes on click     (2.8s)
6. Progress bar zips left→right                     (3.4s)
7. Two caption tracks type onto the video preview:
     Native (Telugu script)  +  Roman (below it)    (4.0s)
8. An "SRT.file" chip ejects out the side, spins    (5.4s)
9. Loop restarts                                    (6.0s)
```

Built with Framer Motion timelines + a `useEffect` interval, no video assets, no 3D lib. Cursor over the panel pauses the loop and lets the user click through it manually.

## Section-by-section plan (order unchanged)

1. **Navbar** — Keep pill glass. Coral dot next to logo. Nav links get a coral underline squiggle on hover.
2. **Hero** — Restructured around the signature scene above. Headline gets a coral hand-drawn underline under "seconds". Trust chips become chunky sticker pills.
3. **SocialProofBar** — 4 features become 4 sticker cards with offset lime shadows, slight rotation, hover-bounce.
4. **CaptionModes** — "Native / Roman / Both" as three chunky toggle cards, each with a mini live caption preview inside.
5. **HowItWorks** — Keep desktop split (steps left, sticky panel right). The sticky panel now mirrors the hero plugin, scroll-scrubbed: each step scroll = one panel action. Mobile accordion stays.
6. **Features** — Grid of tactile "trading card" tiles. Coral corner-fold on hover. Keep "AI Verification Pass — Pro only" copy.
7. **LanguageMarquee** — Language chips become sticker-badges (rotation, tape corners). Speed slows on hover instead of pausing hard.
8. **Pricing** — Keep 3-column layout. Cards get sticker shadows; Pro tier gets a rotated "Most Popular" tape badge in coral. **Fix SSR hydration mismatch on the region toggle** (India/International) — read region only in `useEffect` after mount and initialize to India on both server and client.
9. **Comparison** — Restyle table as two mascot columns ("Manual You" 😩 vs "Captiongrit You" 😎), coral vs lime.
10. **Testimonials** — Chunky quote cards, rotated ±2°, avatar as circle sticker with lime ring.
11. **FAQ** — Accordion items become tactile pills; open state slides down with spring, "+" rotates to "×".
12. **FinalCTA** — Oversized display type, coral "Buy Now" button with lime shadow that squishes.
13. **Footer** — Keep as-is (already fixed last round).

## Ambient background (subtle)
- One slow-drifting lime radial (already there) + one smaller coral radial in the lower-third
- Faint film grain overlay (already there)
- No particles, no canvas

## Consistency with Flogrit
- Same nav pill shape, same section-divider component, same footer link back to Flogrit — the chrome ties them together.
- Playfulness lives inside sections, not in the shell.

## Technical notes
- All new tokens (`--coral`, `--violet-soft`, `--shadow-sticker`) added to `src/styles.css` under a `.captiongrit-container` scope so Flogrit is untouched.
- Bricolage Grotesque already loaded — bump weight utilities only.
- Motion via existing `motion/react` (framer-motion drop-in) — no new deps.
- Fix `PricingSection` region toggle SSR mismatch (see step 8) as part of this pass.

## Out of scope
- No content/copy rewrites beyond micro-labels.
- No new sections, no removed sections.
- No changes to Flogrit routes or shared components.
