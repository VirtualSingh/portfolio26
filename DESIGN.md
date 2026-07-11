---
name: Pushpendra Singh Portfolio
description: A builder's journal — an Angular engineer's story told with electric-iris energy and refined restraint.
colors:
  electric-iris: "#6c63ff"
  iris-strong: "#5a50f0"
  iris-mist: "#eeeeff"
  midnight-ink: "#1a1a2e"
  slate-muted: "#5d6673"
  cloud-surface: "#f5f5f7"
  fog-border: "#e5e7eb"
  paper-white: "#ffffff"
  error-red: "#b91c1c"
  error-surface: "#fef2f2"
  success-green: "#15803d"
  success-surface: "#f0fdf4"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif"
    fontSize: "clamp(3.2rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  lede:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.6
  small:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, Consolas, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  card-title:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  chip:
    fontFamily: "JetBrains Mono, Consolas, monospace"
    fontSize: "0.84rem"
    fontWeight: 400
  ui-mark:
    fontFamily: "JetBrains Mono, Consolas, monospace"
    fontSize: "1.25rem"
    fontWeight: 500
  ui-mark-lg:
    fontFamily: "JetBrains Mono, Consolas, monospace"
    fontSize: "1.5rem"
    fontWeight: 500
rounded:
  sm: "8px"
  md: "12px"
  xl: "24px"
  pill: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.electric-iris}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  tech-badge:
    backgroundColor: "{colors.iris-mist}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  nav-link:
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  nav-link-active:
    backgroundColor: "{colors.iris-mist}"
    textColor: "{colors.electric-iris}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  section-card:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.xl}"
---

# Design System: Pushpendra Singh Portfolio

## 1. Overview

**Creative North Star: "The Builder's Journal"**

This is a personal record of a career under construction — the story of what was built and who built it. The system reads like a well-kept engineer's journal: clean white pages, one electric ink color reserved for what matters, monospace annotations in the margins, and generous whitespace that lets each chapter of the journey breathe. Energy and ambition come from the typography (heavy 800-weight headings at large clamped scales) and the pacing of sections, never from visual noise.

The system explicitly rejects what PRODUCT.md rejects: generic template portfolios, flashy effect-heavy showcases that bury content, dry corporate resume pages, and cluttered badge-wall noise. The page is a single voice telling one story, with Electric Iris as its only raised tone.

**Key Characteristics:**
- One accent color (Electric Iris) on white paper; everything else is ink, slate, and fog
- Heavy, tightly-tracked display type against calm 1.7-line-height body prose
- Pill-shaped interactive elements; large 24px+ radii on section surfaces
- Monospace used as an annotation voice (eyebrows, section numbers, badges)
- Ambient, low-opacity shadows that float surfaces rather than rank them
- Refined, restrained interactions: small lifts, 180ms eases, nothing bouncy

## 2. Colors

A restrained single-accent palette: one electric voice against a quiet paper-and-ink neutral field.

### Primary
- **Electric Iris** (#6c63ff): The journal's ink for everything alive — links in their active state, the typewriter role line in the hero, mono annotations, active nav items, badge borders, the hero scene's foliage, and the primary button gradient. It is the color of momentum and appears only where attention should land.
- **Iris Strong** (#5a50f0): The pressed/deep step of the accent — hover states on iris links and the value color inside journey highlight pills.
- **Iris Mist** (#eeeeff): Electric Iris diluted to a wash. Backgrounds for active nav pills, tech badges (at 75% opacity via color-mix), highlight pills, and the hero gradient's start. Never used for text.
- **Scene ramp** (#948dff, #8f88ff, #7b73ff, #2d2b52): Tonal steps of the iris hue reserved for the hero's code-drawn island illustration and generated project covers. Illustration-only; never interface chrome.

### Neutral
- **Midnight Ink** (#1a1a2e): Headings, primary body emphasis, and the dark end of the accent gradient. A deep navy-violet black that keeps even the darkest text in the brand's hue family.
- **Slate Muted** (#5d6673): Paragraph text and inactive nav links. Cool gray at ~5.2:1 on white and ~4.8:1 on Cloud Surface, safe at small sizes on both.

### State
- **Error Red** (#b91c1c on #fef2f2) and **Success Green** (#15803d on #f0fdf4): Form validation and toast states only. Both pass 4.5:1 on their surfaces.
- **Cloud Surface** (#f5f5f7): Hovered nav pills, muted badge fills, and the hero gradient's end. The lightest structural step above the page.
- **Fog Border** (#e5e7eb): All hairline borders — cards, badges, the sidebar's right edge, footer dividers. Always 1px.
- **Paper White** (#ffffff): The page itself and all card surfaces.

### Named Rules
**The One Ink Rule.** Electric Iris is the only saturated color in the system and covers well under 10% of any screen. If a second accent seems needed, the answer is weight, size, or whitespace — not a new color.

**The Gradient Exception.** The only gradients permitted are the two committed ones: the accent gradient (135deg, Electric Iris → Midnight Ink) on primary buttons, and the hero wash (Iris Mist → Cloud Surface). No new gradients.

## 3. Typography

**Display Font:** Plus Jakarta Sans (with DM Sans, Segoe UI fallback)
**Body Font:** Plus Jakarta Sans (same family, lighter weight)
**Label/Mono Font:** JetBrains Mono (with Consolas fallback)

**Character:** One geometric-humanist sans doing all the talking, in two registers — shouting confidently at 800 weight with negative tracking in headings, and speaking calmly at 400 weight with a relaxed 1.7 line height in prose. JetBrains Mono is the marginalia: small technical annotations that remind you an engineer keeps this journal.

### Hierarchy
- **Display** (800, clamp(3.2rem, 7vw, 5.5rem), line-height 1, letter-spacing -0.04em): The hero name only. The loudest moment on the page.
- **Headline** (800, clamp(2rem, 4vw, 3.5rem), line-height 1.1, letter-spacing -0.03em): Section headings (h2).
- **Title** (800, clamp(1.35rem, 2vw, 1.75rem), line-height 1.1): Card and subsection headings (h3).
- **Body** (400, 1rem, line-height 1.7): Paragraphs, set in Slate Muted. Cap measure near 50–65ch (the hero tagline uses max-width: 50ch).
- **Label** (JetBrains Mono, 0.78rem, letter-spacing 0.08em, sentence case): Mono annotations — the hero proof line, timeline dates, fact-card labels. Never uppercase-tracked eyebrows; that scaffold is banned.
- **Small** (500, 0.875rem, line-height 1.6): Interface text — nav links, footer, card descriptions, form labels.
- **Lede** (500, 1.125rem): The hero greeting and skill group names.
- **Card Title** (800, 1.35rem): Headings inside cards (projects, journey entries).

### Named Rules
**The Two Voices Rule.** Jakarta Sans carries meaning; JetBrains Mono carries metadata. Never set a heading in mono, never set an annotation in the display face.

**The Accent Word Rule.** Inside a heading, a single word may take Electric Iris with italic 800 weight (`.accent-word`) — one word, not a phrase, and not in every heading.

## 4. Elevation

Depth in this system is ambient lift: surfaces float gently on soft, large-blur, heavily-offset shadows whose opacity never exceeds ~0.18. Shadows create atmosphere and separation from the page — they do not rank importance. Hierarchy is the job of type scale and spacing; a bigger shadow never means a more important element. Hairline Fog Borders do the precise edge-drawing; the shadow underneath only suggests air.

### Shadow Vocabulary
- **Card float** (`box-shadow: 0 4px 32px -8px rgba(26, 26, 46, 0.08)`): Default for `.section-card` surfaces.
- **Section lift** (`box-shadow: 0 24px 80px -48px rgba(26, 26, 46, 0.18)`): The section-surface mixin; a deeper ambient pool under large containers.
- **Iris glow** (`box-shadow: 0 18px 42px -22px rgba(108, 99, 255, 0.55)`): Primary buttons only — the shadow takes the accent's own hue, reading as light cast by the button rather than darkness under it.

### Named Rules
**The Soft Air Rule.** Every shadow is large-blur, negative-spread, and low-opacity. Tight, dark, small-blur shadows are forbidden; if an element looks like a 2014 material card, the blur is too small and the opacity too high.

## 5. Components

### Buttons
- **Shape:** Full pill (border-radius 9999px), 48px minimum height, 0 24px horizontal padding, 700 weight text.
- **Primary:** Accent gradient background (135deg Electric Iris → Midnight Ink), white text, Iris glow shadow.
- **Secondary:** Paper White background, Midnight Ink text, 1px Fog Border.
- **Hover / Focus:** A refined -2px translateY lift over 180ms ease; the focus ring is a 3px Electric Iris outline at 35% opacity, offset 3px. No scale, no bounce.

### Chips (Tech Badges)
- **Style:** Pill-shaped, 36px min-height, JetBrains Mono at 0.84rem. Default tone: Iris Mist fill at 75% opacity with a border of Electric Iris mixed 20% into Fog Border.
- **State:** A `muted` tone swaps to Cloud Surface fill with a plain Fog Border — used to de-emphasize secondary technologies.

### Cards / Containers
- **Corner Style:** Generous — 24px on `.section-card`, 28px on the section-surface mixin.
- **Background:** Paper White (the mixin adds a near-invisible top-down white sheen).
- **Shadow Strategy:** Ambient lift only (see Elevation).
- **Border:** Always 1px Fog Border; the border defines the edge, the shadow gives it air.
- **Internal Padding:** From the spacing scale, typically 24–48px.

### Inputs / Fields
- **Style:** Inherit the page font; borders follow the Fog Border convention.
- **Focus:** The global focus ring — 3px Electric Iris at 35% opacity, 3px offset. Applies to every focusable element without exception.

### Navigation
- **Style:** A fixed 200px left sidebar (light, Paper White, 1px Fog Border right edge); collapses to a 64px top bar under 1024px.
- **Links:** 8px-radius soft pills; Slate Muted at rest, Midnight Ink on Cloud Surface when hovered, Electric Iris on Iris Mist when active, with a small iris dot marking the active section. 180ms color/background ease.
- **Resume:** A pinned outline pill (iris text, iris-tinted border) at the sidebar's bottom and in the mobile top bar — the primary conversion is always one click away.

### Hero Scene (signature component)
The code-drawn SVG floating island: a meditating figure on an iris-toned island with abstract trees, soft white clouds, and a dotted orbit ring, floating on layered `float-slow`/`float-medium` loops. Drawn entirely from the brand palette and the iris scene ramp — no raster assets, nothing to 404. Reduced motion freezes every layer.

### Generated Project Covers (signature component)
Project cards draw their own cover art: a `--cover-hue`-rotated iris gradient wash with an oversized mono monogram (AC, P3, V4). Hue rotation stays subtle (±40° around the brand hue). No stock photos, no screenshots that go stale.

### Scroll Reveal (signature behavior)
Sections enter with a 20px rise-and-fade over 480ms ease, staggered per element via `--reveal-delay`. Content is visible by default and the reveal enhances it. Under `prefers-reduced-motion: reduce`, reveals render instantly in place — this is already wired globally and must stay.

## 6. Do's and Don'ts

### Do:
- **Do** keep Electric Iris (#6c63ff) under 10% of any viewport; it must always be the rarest color on screen.
- **Do** use JetBrains Mono for all metadata voice — proof lines, timeline dates, badges — at 0.78–0.84rem, sentence case.
- **Do** keep every border 1px Fog Border (#e5e7eb) and every shadow soft, large-blur, low-opacity.
- **Do** give every animation its reduced-motion alternative; the global kill-switch in global.scss must survive refactors.
- **Do** keep hover feedback at the refined register: -2px lifts, 180ms eases, color shifts — nothing springy or elastic.
- **Do** keep body prose in Slate Muted at 1rem+ on white only; on any tinted surface, step up to Midnight Ink.

### Don't:
- **Don't** build anything resembling a "generic template/theme portfolio" (PRODUCT.md's words): stock card grids of identical icon-heading-text tiles are prohibited.
- **Don't** add flashy 3D/WebGL showcase effects that bury content — spectacle never outranks the story.
- **Don't** drift into "corporate resume site" dryness: every section keeps a personal, first-person voice.
- **Don't** add badge walls, skill percentage bars, or star ratings — the "cluttered everything-site" is a named anti-reference.
- **Don't** introduce new gradients, new saturated colors, or gradient text (background-clip: text is forbidden).
- **Don't** use side-stripe borders (border-left/right > 1px as a colored accent) on cards, callouts, or list items.
- **Don't** reintroduce uppercase-tracked eyebrows or numbered section markers (01/02/03) as section scaffolding — both were removed deliberately.
- **Don't** ship dark-theme UI until real `[data-theme='dark']` token overrides exist; light is the committed theme.
