## Goal

Two changes, both on the homepage hero and the global background:

1. Reshape the Attention / Conversion / Automation hero animation from a cramped horizontal row of glowing discs into a clean **triangle**, with the labels sitting on the triangle's edges — no filled disc "chip" behind each label, just the natural glow.
2. Add subtle **animated gradient movement** to the site background so the page feels alive (Lovable-style ambient blobs), using the existing lime + purple palette. Cursor behavior stays as-is.

---

## 1. Hero flow → triangle (`src/components/home/HeroFlowAnimation.tsx`)

- Re-layout the three nodes as a triangle inside the canvas:
  - Attention → top-left, Conversion → top-right, Automation → bottom-center (apex down). This reads left-to-right at the top and resolves downward into Automation, matching the pillar order.
- Replace the three horizontal connectors with **three triangle edges**. Keep the animated dashed gradient stroke and flowing particles along each edge (particles now cycle around the triangle instead of a straight line).
- **Remove the dark disc + ring background** behind each label. Keep only:
  - a soft radial glow (lime, low alpha, gently pulsing) as the "natural glow",
  - the label text (`ATTENTION`, `CONVERSION`, `AUTOMATION`) rendered directly on the canvas at each vertex,
  - the small sub-labels beneath each vertex.
- Drop the orbiting purple sub-dots (they add to the "too busy / too close" feel). Sub-labels stay as quiet text.
- Adjust vertex positions so labels have breathing room from the canvas edges and from each other (padding ~12–15% on each side; slightly taller aspect if needed, e.g. `aspect-[5/4]` → `aspect-[4/4]` or `[5/4.5]`) so nothing feels cramped.
- Keep the top-left "the system · attention → conversion → automation" caption and the top-right `flogrit.live` pulse.
- Respect `prefers-reduced-motion` (already handled — keep it).

## 2. Ambient gradient background (global)

- Add a new component `src/components/site/AmbientBackground.tsx`: a fixed, full-viewport, `pointer-events-none`, `z -10` layer sitting behind all content, with 2–3 large blurred radial "blobs" using the brand tokens (`--color-lime`, `--color-purple`, a hint of ink). Blobs drift slowly via CSS keyframes (translate + scale, 20–40s loops, staggered), very low opacity (~8–14%) so it reads as ambient life, not decoration. Include a faint film-grain / vignette mask so it stays premium and doesn't muddy typography.
- Mount it once in `src/routes/__root.tsx` inside `RootComponent`, above `<Outlet />`, so every route inherits it.
- Remove the local `BackgroundGrid` from `HeroSection` (or keep it but lower its opacity) so the hero doesn't double up on background texture. Recommended: keep the grid, since it defines the hero, and let the ambient gradient live behind everything else — the grid's radial mask will let the gradient show through subtly.
- Honor `prefers-reduced-motion`: pause the drift animation.
- No JS on scroll/pointer — pure CSS keyframes for performance.

## 3. Verification

- Playwright screenshot of `/` at 1280×1800 and 390×844 to confirm:
  - triangle layout reads clearly, labels are legible, no dark discs, glow feels natural, nothing is cramped.
  - ambient gradient is visible but subtle across home + one inner route.
- Check console for errors.

## Files touched

- `src/components/home/HeroFlowAnimation.tsx` — rewrite layout + node rendering.
- `src/components/site/AmbientBackground.tsx` — new.
- `src/routes/__root.tsx` — mount `<AmbientBackground />`.
- `src/styles.css` — add the two/three drift keyframes + utility classes for the blobs.

No copy, routing, or data changes.
