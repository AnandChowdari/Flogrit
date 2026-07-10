## Hero triangle refinement

**1. Kill the glow on vertex circles** (`src/components/home/HeroFlowAnimation.tsx`)
- Remove the outer radial lime gradient behind each node.
- Remove `shadowBlur`/`shadowColor` on the solid circle fill.
- Replace the bright lime fill with a **premium dark disc**:
  - Fill: near-black (`#0d0d0f`) with a subtle top-to-bottom inner gradient (`#1a1a1c` → `#0a0a0b`) for depth.
  - Border: 1px hairline in `hex(limeStr, 0.35)` for a crisp lime edge (the only accent color on the circle).
  - Small inner highlight arc at the top (1px, white 8%) for a glassy bevel.
  - Label inside: lime text (`limeStr`), same JetBrains Mono, uppercase, tracked out slightly.
- Keep particle glow on the edges (that's the "life"), but drop particle `shadowBlur` from 12 → 6 so it reads cleaner against dark discs.

**2. Enlarge the container so circles have breathing room**
- Current aspect `5/4.5` is too tight — bump to `aspect-[5/5.2]` (or `min-h-[560px] lg:min-h-[640px]`) so the triangle isn't cramped and the discs sit comfortably inside.
- Reduce vertex R slightly (`0.11` → `0.1`) and pull nodes inward (`x: 0.22/0.78`, `y: 0.3/0.78`) to guarantee margin.

**3. "Half-square from the right" container shape**
Reshape the glass panel so it reads like a card sliced in half and pushed off the right edge of the hero column:
- Rounded corners **only on the left side**: `rounded-l-3xl rounded-r-none`.
- Extend it past the right edge of its grid cell using negative right margin: `-mr-8 lg:-mr-16` (or `mr-[calc(-1*var(--container-padding))]`) so it visually bleeds off-canvas.
- Border only on top / left / bottom (drop right border): `border-y border-l border-r-0 border-white/10`.
- Keep the glassmorphism: `bg-white/[0.03] backdrop-blur-xl` + inset top highlight. (Yes — glassmorphism is the right term: translucent fill + blur + hairline border.)

**4. Verify**
- Playwright screenshot at 1280×1800 of `/` to confirm: no lime bloom, dark premium discs with lime labels, edges + particles still animated, container half-bleeds right with left-only rounding, no overflow clipping the triangle.

Only `HeroFlowAnimation.tsx` changes.
