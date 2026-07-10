# Phase 1 — Foundation & Premium Polish

This phase focuses on improving the overall quality of the website without changing its architecture. Do **not** redesign any existing sections. Preserve the current layouts and interactions while upgrading implementation quality, performance, and consistency.

Everything implemented in this phase should be reusable for future case studies and future products.

---

# 1. Global Branding Consistency

Perform a repository-wide brand consistency pass.

Replace every occurrence of:

`FloGrit`

with

`Flogrit`

Keep `FLOGRIT` unchanged if intentionally all caps.

Search through:

- `.tsx`
- `.ts`
- `.jsx`
- `.js`
- `.md`
- `.html`
- `.json`
- `.svg`

Exclude:

- node_modules
- lockfiles
- generated files
- `.lovable`
- build output

Verify manually:

- Navbar
- Hero
- Footer
- SEO metadata
- Open Graph metadata
- Alt text
- Testimonials
- Case Studies
- Captiongrit pages
- Product badges
- Hidden metadata
- Loading screens

No remaining occurrences should exist.

---

# 2. Fix Client-Side Hydration Issues

Audit all Captiongrit components for hydration mismatches caused by browser-only APIs.

Examples include:

- locale detection
- timezone
- geo lookup
- window
- navigator
- media queries

Use deterministic SSR defaults.

Move browser detection into `useEffect()` after mount.

The application should produce zero hydration warnings.

---

# 3. Premium Animated Background

Replace the current background implementation with a modern animated mesh gradient inspired by Linear and Vercel.

Requirements:

- Multiple large blurred radial gradients
- Brand colors
- Extremely slow movement (30–60 second loops)
- Non-repeating animation
- Soft depth
- Layered opacity
- Fine grain noise overlay
- GPU accelerated transforms only
- No layout reflows
- 60 FPS target

Add a subtle mouse-follow radial glow.

Requirements:

- requestAnimationFrame updates
- Passive listeners
- Disabled on touch devices
- Disabled for reduced-motion users
- Opacity below 0.06

The animation should feel alive without becoming distracting.

---

# 4. Captiongrit Workflow

Remove all nested scrolling.

No horizontal scrollbar.

No vertical scrollbar.

Convert the workflow into a responsive animated pipeline.

Desktop:

Single horizontal flow.

Tablet:

Wrapped layout.

Mobile:

Vertical timeline.

Do not reduce the information.

Only improve presentation.

All widths should be fluid.

No fixed pixel layouts.

---

# 5. Future-Proof Demo Video Component

Create a reusable media component.

Component:

DemoVideo

Supported media:

- MP4
- WebM
- YouTube
- Vimeo

Component automatically detects source type.

Features:

- Responsive
- Rounded corners
- Poster image
- Lazy loading
- Intersection Observer
- Play overlay
- Custom controls
- Smooth transitions

Replace the current placeholder image with this component.

For now use the existing screenshot as the poster.

Future videos should only require changing the source URL.

---

# 6. Professional Technology Logos

Replace every generic technology icon across the website.

Create a reusable component:

TechLogo

Priority:

1. Local official SVG assets
2. Iconify
3. React Icons

Never use generic placeholders when an official logo exists.

Support:

Adobe Premiere Pro

Adobe After Effects

Adobe Photoshop

Adobe Illustrator

OpenAI

n8n

Make

Zapier

React

Next.js

Tailwind CSS

PostHog

Supabase

Twilio

GoHighLevel

Google Analytics

Vercel

MongoDB

Node.js

TypeScript

Framer Motion

Each logo appears inside a reusable

TechBadge

containing:

Logo

↓

Technology Name

Hover:

- Slight lift
- 3° icon rotation
- Border glow
- Soft lime shadow
- Background tint
- Tooltip

Replace every technology badge on the website using this reusable component.

---

# 7. Client Information

Update client information using the provided official links.

## Husain Basha

Company

Husle Lifestyle

Website

[https://www.huslelifestyle.com/](https://www.huslelifestyle.com/)

YouTube

[https://www.youtube.com/@ThinkBigwithHussain](https://www.youtube.com/@ThinkBigwithHussain)

Instagram

[https://www.instagram.com/_hussain___basha/](https://www.instagram.com/_hussain___basha/)

If branding assets are publicly available from these official sources, use them.

Otherwise gracefully fall back to initials.

Do not invent branding.

---

## Pilot Gurujyoth

Instagram

[https://www.instagram.com/pilot.gurujyoth/](https://www.instagram.com/pilot.gurujyoth/)

Use publicly available branding where possible.

Otherwise use placeholders.

---

# 8. Performance Preparation

Prepare the website for future media-heavy content.

All future images should support:

- Lazy loading
- Responsive sizing
- Blur placeholders
- No layout shifts
- Proper aspect ratios

Videos should mount only when entering the viewport.

---

# 9. Reusable Architecture

Instead of hardcoding future case studies,

create reusable presentation components.

Suggested components:

CaseStudyHero

BusinessContext

ProblemSection

StrategySection

ImplementationTimeline

EvidenceGallery

TechStack

ResultsGrid

TestimonialCard

DemoVideo

These should be reusable across all future case studies.

---

# 10. Accessibility

Ensure all new components include:

- Keyboard navigation
- Focus states
- Proper aria labels
- Reduced-motion support
- WCAG-compliant contrast
- Semantic HTML

---

# 11. Phase 1 UI Polish

Since these improvements don't depend on media assets, implement them now.

Include:

- Animated KPI counters
- Scroll reveal animations
- Improved section spacing
- Better typography hierarchy
- Premium hover interactions
- Consistent card radius
- Smooth transitions
- Better responsive behavior

Do not wait until Phase 2.

---

# Verification Checklist

Before marking Phase 1 complete:

- Zero "FloGrit" references remain.
- Zero hydration warnings.
- No page-level overflow.
- All technology logos render correctly.
- Background animation performs smoothly.
- Captiongrit workflow is fully responsive.
- DemoVideo component supports multiple media sources.
- TechBadge component is used consistently site-wide.
- All client links work.
- Build passes without warnings.
- Desktop, tablet, and mobile layouts are verified.
- All animations respect `prefers-reduced-motion`.