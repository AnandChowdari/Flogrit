# Case study assets — Hussain Basha (round 1 of 2)

Scope for this pass: **assets only**, no copy changes. Pilot Gurujyoth gets the same treatment in a follow-up round.

## What ships

1. **Upload two CDN assets** via `lovable-assets create`:
   - `user-uploads://image-4.png` → `src/assets/case-studies/hussain-basha-portrait.jpg.asset.json` (B&W portrait, glasses, grey blazer)
   - `user-uploads://image-3.png` → `src/assets/case-studies/husle-lifestyle-logo.png.asset.json` (geometric mark)

2. **Extend the `CaseStudy` type in `src/lib/data.ts`** with two optional fields:
   ```ts
   portrait?: string;   // CDN URL — client headshot
   logo?: string;       // CDN URL — company mark
   ```
   Populate them on the `hazil-lifestyle` entry only. All other cases stay untouched and keep their current initial-letter avatar fallback.

3. **Update `src/routes/work.$slug.tsx` hero** to render, in this order:
   - Company **logo** (if `c.logo`) in a rounded tile — replaces the current lime initial-letter square.
   - Client **portrait** (if `c.portrait`) as a small circular avatar next to the client meta line (industry · pillar).
   - Fallback: current initial-letter tile when neither field is set (preserves other case studies exactly as they are today).

4. **No changes** to:
   - Case study copy, metrics, tech stack, or links
   - `/work` index cards, Testimonials section, home page
   - Pilot Gurujyoth's entry

## Technical notes

- Both uploads use `lovable-assets create --file /mnt/user-uploads/image-X.png --filename <name>` so the binary never lands in the repo.
- Portrait renders with `object-cover` inside a fixed-size circle; logo renders inside a `bg-secondary/50` rounded-xl tile with `object-contain` and a small inner padding (the Husle mark is dark on white — the tile background keeps it legible on the dark theme without inverting).
- Type addition is purely additive; existing cases compile unchanged.

After this ships, next turn we do the same for Pilot Gurujyoth using image-1 (portrait) and image-6 (Horizon Pilot Training Institute logo).
