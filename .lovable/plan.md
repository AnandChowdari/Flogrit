
# Flogrit restructure — corrected implementation plan

## Confirmations (all seven decisions applied)
- **Dynamic in-journey `PricingMatrix` reveal** — each journey renders its own `<PricingMatrix pillar=... />`, toggled open/closed by the journey's CTA. No pricing data duplication; reuses `pillarPricing`.
- **No journey pricing deep-links** — no `/pricing#<pillar>` from any journey CTA. The standalone `/pricing` route stays untouched for direct navigation only.
- **No SOCIAL footer column** — three columns only: SERVICES, COMPANY, LEGAL.
- **No `#` social placeholders** — nothing ships in the DOM at all; no disabled items, no founder personal links. Optional `socials?: { instagram?: string; linkedin?: string }` may exist in the footer data type for future use, but no column is rendered.
- **No public draft labels** — legal pages ship conservative copy with zero user-visible review status. Any internal notes are `// TODO(founder)` code comments only.
- **No scroll-direction indicator logic** — sticky `SystemIndicator` is always visible while inside the journey (`position: sticky; top: navHeight`). No scroll listeners, no hide-on-scroll-down.
- **Structured `systemJourneys` data model** — new typed module (e.g. `src/lib/systemJourneys.ts`) owns all journey content; journey components only render and handle interaction.

---

## Phase 1 — Audit (unchanged)
Homepage stacks all three pillars after `Gate`, plus Proof/Testimonials/FAQ/FinalCTA — this is the "unlimited buffet" root cause. `FlowProvider` already exists (uses `?flow=` + localStorage). `pillarPricing`, `cases`, `testimonials`, `PricingMatrix` are all reusable as-is. No Calendly, no legal routes, no `?system=` URL support.

---

## Phase 2 — Implementation

### 1. State + URL
- Extend `FlowProvider`: read `?system=` (primary) + `?flow=` (back-compat); add `clearSystem()`; `setSystem()` updates URL via router-scoped `navigate({ to: ".", search: (s) => ({ ...s, system: key }) })`.
- Add `validateSearch` on `/` (Zod `fallback`) for `system: "attention" | "conversion" | "automation" | undefined` so `/?system=attention` works first paint.

### 2. Homepage (`src/routes/index.tsx`)
```
<HeroSection />          ← CTA rewired to Calendly popup + "or explore where you're stuck ↓"
<StudioStrip />          ← kept, heading reframed as capability teaser
<SystemSelector />       ← NEW (replaces Gate)
{system && <SystemJourney key={system} system={system} />}
<CaptiongritPopup />
```
Removed from default homepage: stacked `PillarSection` loop, `Proof`, `Testimonials`, `FAQ`, `FinalCTA` (each moves inside the relevant journey where appropriate).

### 3. New components

- **`SystemSelector`** (`src/components/home/SystemSelector.tsx`) — heading + three semantic `<button>` gateway cards, keyboard-accessible, lime hover border, subtle lift. Copy from `systemJourneys[key].problem` (below).

- **`SystemIndicator`** — sticky compact pill:
  ```
  EXPLORING   ATTENTION   SWITCH ↕
  ```
  `position: sticky; top: var(--nav-h)`; always visible while inside the journey; no scroll-direction logic. "SWITCH" re-expands the three doors (either in place or via `AnimatePresence` toggle back to `SystemSelector`).

- **`SystemJourney`** (`src/components/home/SystemJourney.tsx`) — swaps between the three journey components via `AnimatePresence mode="wait"`; scrolls into view on selection (respects `prefers-reduced-motion`).

- **`AttentionJourney` / `ConversionJourney` / `AutomationJourney`** (`src/components/home/journeys/*.tsx`) — thin render layers over `systemJourneys[key]`. Each journey ends with:
  1. `EXPLORE <PILLAR> PLANS ↓` (or `ENGAGEMENTS ↓` for Automation) — toggles an in-journey `<PricingMatrix pillar=... compact />` reveal (`AnimatePresence` + `layout`, restrained motion, `prefers-reduced-motion` respected).
  2. Primary CTA `DISCUSS YOUR BRAND` / `BUILD YOUR CONVERSION PATH` / `DISCUSS YOUR WORKFLOW` → Calendly popup.
  3. Next directions rendered from `systemJourneys[key].nextDirections` (two links that swap `setSystem(...)`).

  Journey-specific content:
  - **Attention**: capability groups + process + Proof (`50M+ views` stat + evidence slot rendered only when assets exist) + Attention-tagged cases + `<Testimonials pillar="attention" />` (add optional `pillar` filter prop to existing component).
  - **Conversion**: leak-vs-path visual reusing the `HeroFlowAnimation` grid aesthetic (no new library) + capability groups (no SEO ranking guarantees) + process + case study rendered from the existing `gurujyoth` case, presented in narrative as **"Gurujyoth × Horizon Pilot Academy"** (slug and data identifier unchanged) + conditional WhatsApp/customer-message artifacts block (renders only when real assets exist under `src/assets/proof/whatsapp/` — no placeholder, no fake UI, no "coming soon").
  - **Automation**: five **Implementation Framework** cards (never "case study") from `systemJourneys.automation.frameworks`, each with pain scenario + inline flow diagram reusing the tech-grid aesthetic + capabilities list + custom automation positioning + implementation process.

### 4. `systemJourneys` data model (`src/lib/systemJourneys.ts`)
Typed structured content module. Journey components read from it; they do not embed the copy inline. Rough shape:

```ts
type CapabilityGroup = { label: string; blurb: string; items: string[] };
type NextDirection   = { toSystem: SystemKey; label: string };
type ProcessStep     = { n: string; title: string; body: string };

type AutomationFramework = {
  id: string;                // stable slug
  n: string;                 // "01".."05"
  title: string;
  painScenario: string;
  systemFlow: string[];      // node labels for the inline flow diagram
};

type AttentionJourney = {
  problem: { headline: string; body: string };
  capabilityGroups: CapabilityGroup[];
  process: ProcessStep[];
  proof: { headlineStat: string; body: string };
  nextDirections: [NextDirection, NextDirection];
};

type ConversionJourney = {
  problem: { headline: string; body: string };
  capabilityGroups: CapabilityGroup[];
  process: ProcessStep[];
  caseStudy: { caseSlug: "gurujyoth"; academyName: "Horizon Pilot Academy" };
  nextDirections: [NextDirection, NextDirection];
};

type AutomationJourney = {
  problem: { headline: string; body: string };
  frameworks: AutomationFramework[];        // exactly 5
  capabilities: string[];
  process: ProcessStep[];
  nextDirections: [NextDirection, NextDirection];
};

export const systemJourneys: {
  attention: AttentionJourney;
  conversion: ConversionJourney;
  automation: AutomationJourney;
};
```

Does not touch `pillars`, `pillarPricing`, `cases`, or `testimonials` in `data.ts`.

### 5. Calendly
- `bun add react-calendly`. Use `PopupModal` only.
- `src/components/site/CalendlyButton.tsx` wraps existing button styles, manages `isOpen`, renders `<PopupModal url="https://calendly.com/astrophileanand/30min" />`.
- Rewire hero + every journey primary CTA. `/contact` remains reachable via nav.

### 6. Nav / Logo
- Keep `Nav`. Verify `LogoMark` and `Footer` both import `src/assets/flogrit-logo.svg.asset.json` with explicit `w-*/h-*` + `shrink-0`. Remove any accidental founder-area text logo recreation.

### 7. Footer rewrite (`src/components/site/Footer.tsx`)
Three columns only:
- **SERVICES** — Attention / Conversion / Automation → `<Link to="/" search={{ system: <key> }}>` (selects the system + scrolls to the journey).
- **COMPANY** — Work / About / Contact.
- **LEGAL** — Privacy Policy / Terms of Service / Refund Policy.
- Bottom: `© 2026 Flogrit. All rights reserved.` Domain: `https://flogrit.com`.
- No SOCIAL column, no `#` placeholders, no disabled items.

### 8. Legal pages
- New routes `src/routes/privacy.tsx`, `src/routes/terms.tsx`, `src/routes/refund-policy.tsx`.
- Conservative first-person copy for a service agency (Guntur, AP + Hyderabad operations). No CIN/GST/registered-office fabrication.
- Refund policy: baseline no-refunds, service-based, scope agreed pre-engagement, per-pillar delivery notes; explicitly separate from CaptionGrit.
- **Zero user-visible review status.** Any internal reminders live as `// TODO(founder)` code comments only.
- Each page has its own `head()` meta.

### 9. Motion + responsive
- Selector cards: stacked mobile, three-col `md+`.
- Journey swap: `AnimatePresence mode="wait"`. Selector ↔ indicator: `layout` transition. In-journey pricing reveal: `AnimatePresence` height/opacity, restrained.
- All new motion respects `prefers-reduced-motion` (mirror `HeroFlowAnimation`).
- Calendly modal validated at mobile widths.

### 10. Order of work
1. `?system=` search validation on `/` + `FlowProvider` extension (with `?flow=` back-compat).
2. Author `src/lib/systemJourneys.ts` typed data module.
3. Add optional `pillar` filter prop to `<Testimonials />`.
4. `SystemSelector` + `SystemIndicator` (leave `Gate.tsx` in tree until swap is verified).
5. Install `react-calendly`; add `CalendlyButton`; swap hero CTA first, verify.
6. `AttentionJourney` (fastest — most existing assets), wire it, replace stacked pillars on `/`.
7. `ConversionJourney` (with in-journey `PricingMatrix` reveal + conditional WhatsApp block).
8. `AutomationJourney` (five Implementation Framework cards + in-journey pricing reveal).
9. Footer rewrite + legal routes.
10. Logo consistency pass.
11. Cleanup: remove `Gate.tsx` once no importers remain.

---

## Content Integrity Guardrails (corrected)
- No fabricated metrics, logos, testimonials, dashboards, or WhatsApp screenshots. Real data flows from `data.ts` only.
- Automation scenarios are always labeled **"Implementation framework"**, never "case study."
- Conversion uses only the existing `gurujyoth` case data, presented as **"Gurujyoth × Horizon Pilot Academy"** in narrative; slug and data identifier are unchanged.
- **Pricing is revealed contextually inside the currently selected journey via `<PricingMatrix pillar=... />`.** Journey CTAs do NOT navigate to `/pricing`. `pillarPricing` remains the single source of truth. The standalone `/pricing` route stays for direct navigation only.
- No SEO ranking guarantees anywhere in Conversion copy.
- Footer has no SOCIAL column and no `#` placeholder links — Flogrit has no official Instagram or LinkedIn accounts today.
- Legal pages ship with zero user-visible review status; conservative draft copy only, reviewed by founder before deploy.
