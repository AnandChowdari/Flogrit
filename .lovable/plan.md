# Captiongrit v2 tweaks — Blue swap + polish

## 1. Coral → Blue

Global find-and-replace of the coral accent with a vibrant blue that harmonizes with lime.

- Old: `#FF5A3C` (coral) / `#FF7A5C`
- New: `**#3B82F6**` (vivid blue, primary playful accent) / `**#60A5FA**` (soft)
- Token rename: `--color-cg-coral` → `--color-cg-blue` (keep the old name as alias for one commit so nothing breaks mid-refactor, then rename call sites)
- Every place currently painted coral (sticker shadows, "Pro only" badge, tape badge on Pro plan, hero underline SVG, hero "Live Demo" badge, navbar dot, FAQ open state, testimonial ring, comparison highlights) picks up blue.
- Coral radial in `.captiongrit-container::before` → blue radial.
- The lime + blue combo lands the same "sport tech / toy" energy without competing with lime like coral did.

## 2. Hero plugin demo — kill the scrollbars

Root cause: the right-side CEP panel stacks 9 sub-components inside a fixed 550px column, forcing vertical scroll. There is also a redundant caption-log inner scroll.

Trim to 5 essentials so it fits in one frame:

Keep: Source Language cycle · Selected Clip · Status bar · Caption Output list · Pause/Resume button.

Remove (redundant with the left timeline/monitor):

- Standalone Audio Waveform panel (already shown on the left timeline)
- Progress-steps 4-segment line (status text already communicates step)
- Auto-looping dot indicator (source-language cycle already highlights current)

Merge: STT / AI / Output pills collapse into a single mono line under the status bar (`Deepgram · Groq Llama · Native`), one row, no wrap.

Also:

- Remove `overflow-y-auto` on the outer right-panel container; give the caption-log a fixed height that fits (~5 lines, no scroll — captions auto-cycle anyway).
- Cap the entire demo height at `540px` on desktop so nothing spills.

Left side stays as-is.

## 3. "Pro only" badge is masked

The AI Verification Pass card has `overflow-hidden` on its container, which clips the `-top-2` badge. Fix by removing `overflow-hidden` from feature cards (or moving the badge inside the padding with a small inline sticker instead of a floating tab). Going with **inline sticker** — a small blue pill inside the card next to the title — so it always renders regardless of card clipping.

## 4. LanguageMarquee — Roman + native script pairs

Currently chips show one Roman/English name per chip. Replace with dual-script chips:

```
Hindi हिन्दी    Telugu తెలుగు    Tamil தமிழ்    Kannada ಕನ್ನಡ
Malayalam മലയാളം    Marathi मराठी    Bengali বাংলা
Gujarati ગુજરાતી    Punjabi ਪੰਜਾਬੀ    Odia ଓଡ଼ିଆ
```

Non-Indian languages (English, Spanish, French, German, Japanese, Korean, Arabic, etc.) also get their native form where meaningful (`Japanese 日本語`, `Korean 한국어`, `Arabic العربية`, `Russian Русский`, `Chinese 中文`). Latin-script European languages that already read the same either get their native spelling (`Français`, `Español`, `Português`, `Deutsch`) or stay single.

Chip layout: Roman on left in bold, native script on right in a lighter weight and slightly smaller — same chip, no extra space cost.

## 5. Neo-brutalist button press feel

New `.cg-brut` utility applied to every meaningful button (Hero Buy Now, Hero secondary, Final CTA both buttons, Navbar Buy Now, Pricing plan cards' "View details" hover state, Pricing Buy Now inside detail view, Comparison CTA if any, plugin demo Pause/Resume).

Behavior:

- Rest: solid color, hard 6px offset shadow in a contrasting color
- Hover: translate `-2px, -2px`, shadow grows to 8px offset (button "lifts")
- Active: translate `+3px, +3px`, shadow collapses to 0 (button "clicks into" the shadow)
- No transition on active — instant snap for tactile feel; smooth spring on hover release

This replaces `cg-squish` where a brutalist press is more appropriate. Non-button links (nav links, breadcrumbs) keep the subtle hover.

## Files touched

- `src/styles.css` — swap coral tokens to blue, add `.cg-brut` utility, update `.cg-sticker-*` shadow color, radial color.
- `src/components/captiongrit/components/product/CaptiongritPluginDemo.jsx` — trim right panel, remove inner scroll.
- `src/components/captiongrit/components/product/FeaturesSection.jsx` — remove `overflow-hidden`, move "Pro only" badge inline.
- `src/components/captiongrit/components/product/LanguageMarquee.jsx` — dual-script chip data.
- `src/components/captiongrit/components/product/HeroSection.jsx` — apply `.cg-brut` to CTAs, swap coral shadow to blue.
- `src/components/captiongrit/components/product/FinalCtaSection.jsx` — apply `.cg-brut` to both CTAs.
- `src/components/captiongrit/components/product/PricingSection.jsx` — swap tape/shadow color; apply `.cg-brut` to Buy Now.
- `src/components/captiongrit/components/product/FaqSection.jsx` — swap coral open-state color to blue.
- `src/components/captiongrit/components/product/TestimonialsSection.jsx` — avatar ring blue.
- `src/components/captiongrit/components/product/SocialProofBar.jsx` — alternating shadow color blue.
- `src/components/captiongrit/components/layout/CaptiongritNavbar.jsx` — logo dot blue, Buy now button `.cg-brut`.

## Out of scope

- No content rewrites.
- No layout restructuring beyond the plugin-demo trim.
- No new sections.  
  
So I think we should keep the metadata also very clean so that we should get this website at the top if someone searches for "captiongrit". Make sure that is good if it is not products, all that stuff. If it is not fit for that, you can make it flowgrit/caption[grit.com](http://grid.com), whatever. Think about it 