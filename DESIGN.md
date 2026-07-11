---
name: Pushpendra Singh Portfolio
description: A builder's journal — an Angular engineer's story told with electric-iris energy and refined restraint.
colors:
  electric-iris: '#6c63ff'
  iris-strong: '#5a50f0'
  iris-mist: '#eeeeff'
  midnight-ink: '#1a1a2e'
  slate-muted: '#5d6673'
  cloud-surface: '#f5f5f7'
  fog-border: '#e5e7eb'
  paper-white: '#ffffff'
  scene-dusk-ink: '#232342'
  scene-moonlight: '#dcdaff'
  error-red: '#b91c1c'
  error-surface: '#fef2f2'
  success-green: '#15803d'
  success-surface: '#f0fdf4'
typography:
  display:
    fontFamily: 'Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif'
    fontSize: 'clamp(3.2rem, 7vw, 5.5rem)'
    fontWeight: 800
    lineHeight: 1
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif'
    fontSize: 'clamp(2rem, 4vw, 3.5rem)'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.03em'
  title:
    fontFamily: 'Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif'
    fontSize: 'clamp(1.35rem, 2vw, 1.75rem)'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.03em'
  body:
    fontFamily: 'Plus Jakarta Sans, DM Sans, Segoe UI, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.7
  lede:
    fontFamily: 'Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 500
    lineHeight: 1.6
  small:
    fontFamily: 'Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: 'JetBrains Mono, Consolas, monospace'
    fontSize: '0.78rem'
    fontWeight: 400
    letterSpacing: '0.08em'
  card-title:
    fontFamily: 'Plus Jakarta Sans Variable, Plus Jakarta Sans, Segoe UI, sans-serif'
    fontSize: '1.35rem'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  chip:
    fontFamily: 'JetBrains Mono, Consolas, monospace'
    fontSize: '0.84rem'
    fontWeight: 400
  ui-mark:
    fontFamily: 'JetBrains Mono, Consolas, monospace'
    fontSize: '1.25rem'
    fontWeight: 500
  ui-mark-lg:
    fontFamily: 'JetBrains Mono, Consolas, monospace'
    fontSize: '1.5rem'
    fontWeight: 500
rounded:
  sm: '8px'
  md: '12px'
  xl: '24px'
  pill: '9999px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '20px'
  '6': '24px'
  '8': '32px'
  '10': '40px'
  '12': '48px'
  '16': '64px'
  '24': '96px'
components:
  button-primary:
    backgroundColor: '{colors.electric-iris}'
    textColor: '#ffffff'
    rounded: '{rounded.pill}'
    padding: '0 24px'
    height: '48px'
  button-secondary:
    backgroundColor: '{colors.paper-white}'
    textColor: '{colors.midnight-ink}'
    rounded: '{rounded.pill}'
    padding: '0 24px'
    height: '48px'
  tech-badge:
    backgroundColor: '{colors.iris-mist}'
    textColor: '{colors.midnight-ink}'
    rounded: '{rounded.pill}'
    padding: '0 16px'
    height: '36px'
  nav-link:
    textColor: '{colors.slate-muted}'
    rounded: '{rounded.sm}'
    padding: '10px 12px'
  nav-link-active:
    backgroundColor: '{colors.iris-mist}'
    textColor: '{colors.electric-iris}'
    rounded: '{rounded.sm}'
    padding: '10px 12px'
  section-card:
    backgroundColor: '{colors.paper-white}'
    rounded: '{rounded.xl}'
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
- **Scene ramp** (#948dff, #8f88ff, #7b73ff, #2d2b52, #232342 Dusk Ink, #dcdaff Moonlight): Tonal steps of the iris hue reserved for the code-drawn illustrations — the hero's Ascent scene, the Beyond night garden, and generated project covers. Dusk Ink is the gradient step between Midnight Ink and #2d2b52 for night-scene backgrounds; Moonlight is the caption/text tint on those ink panels. Illustration-only; never interface chrome.

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

- **Style:** A fixed 172px left sidebar (light, Paper White, 1px Fog Border right edge); collapses to a 64px top bar under 1024px. Nav links read at 1rem — the sidebar is narrow but its text is not small.
- **Links:** 8px-radius soft pills; Slate Muted at rest, Midnight Ink on Cloud Surface when hovered, Electric Iris on Iris Mist when active, with a small iris dot marking the active section. 180ms color/background ease.
- **Resume:** A pinned outline pill (iris text, iris-tinted border) at the sidebar's bottom and in the mobile top bar — the primary conversion is always one click away.

### Hero Scene: "The Ascent" (signature component)

The code-drawn SVG staircase of version blocks — v8 → v14 → v17 rising left to right, a builder figure on the top step reaching toward the floating iris v19 block above its dash-outlined landing slot, sparks around it, clouds below (we are at altitude). It is his actual migration ladder drawn as a scene: energy and ascent, not decoration. Drawn entirely from the brand palette and the iris scene ramp — no raster assets, nothing to 404. Reduced motion freezes every layer. The block labels come from `PORTFOLIO.identity.ascent`.

### Ink Marquee Ticker (signature component)

A single slow band of Midnight Ink directly under the hero, scrolling mono craft phrases (from `PORTFOLIO.marquee.items`) separated by small iris sparks — the one place the ink of the Ascent scene bleeds into the page as a surface. Paper-white text on ink, 36s linear loop, pauses on hover, static under reduced motion. There is exactly one marquee on the site; a second would make it wallpaper.

### Journey Scene: "The Range" (signature component)

The journey as an ink-drawn mountain panorama stretching the full section width — every peak is a chapter, drawn taller as the career climbs (college-lab foothill on the left up to the current role's summit on the right). Generated at runtime from `PORTFOLIO.journey.entries`: silhouettes and inner contour echo lines are SVG paths computed per entry with deterministic jitter, so adding a chapter adds a mountain. Each summit carries a minimal marker — dot, leader line, start year, `peakLabel` (defaults to `place`) — and hover/focus/tap selects that chapter: its mountain tints Iris Mist with iris strokes, and the full journal card (story, bullets, highlight, stack) swaps in below the panorama, one at a time, never covering a peak. All cards stay in the DOM (`[hidden]` toggling) for prerender/SEO, and print shows every chapter. Mountains rise staggered on scroll-into-view; reduced motion renders them in place. This is the daylight scene — ink line-work on Cloud Surface paper with a mono corner caption from `PORTFOLIO.journey.rangeCaption` — the section-scale echo of the hero's Ascent altitude metaphor.

### Skills Scene: "Borrow the Light" (signature component)

A glass fish bowl of skills disguised as fireflies beside the skills list — each is one entry from `PORTFOLIO.skills.bowl.items` (max 9, `{ label, icon }`; the scene defines 9 spots and the icon set lives in `BowlSkillIcon`). The bowl is drawn in CSS on the same dusk-ink panel language as the Night Garden: a glass sphere with a flat-cut top and rim ellipse, half-filled with iris-tinted water under a shimmering surface line, two small fish idling back and forth below the waterline, bubbles rising from dusk-ink pebbles, light pooled at the bottom, faint stars behind. Inside float ghostly stroke-SVG skill glyphs (Angular shield, TS mark, RxJS marble stream, Sass S, Jest check, Playwright mask, git branch, `</>`, Tailwind waves) glowing via layered drop-shadows — four in the air above the waterline, five in the water. They blink and drift idly, light up one by one when the panel scrolls into view, and on hover/focus flare brighter and name themselves in a mono pill (keyboard-reachable via `tabindex` + `aria-label`; the full skill list remains as real text in the right column, so the bowl is enhancement, not the record). The fireflies live on an overlay layer above the globe so labels never clip against the sphere's `overflow: hidden`. Caption from `PORTFOLIO.skills.bowl.caption`. Same illustration exemptions as the Night Garden: scene geometry and scene-ramp colors are drawing, not chrome. The narrative pairing is deliberate — the bowl (Skills) is where the fireflies are kept; the garden (Beyond) is where they fly free.

### Beyond Scene: "The Night Garden" (signature component)

An ink dusk panel beside the Beyond copy: blooming iris flowers with layered 3D-tilted petals, gradient stems that grow on scroll-into-view, rising light motes, silhouetted foliage, faint stars, and a dashed moon ring echoing the hero's ring — the after-hours counterpart to the Ascent's daytime altitude. Built entirely from HTML divs and CSS (organic border-radius petals, gradients, keyframes — the CodePen flowers technique) in the scene ramp; no images, no SVG, no canvas, no WebGL, no libraries. Sized in container-query units so the scene scales with its panel; per-flower scale via an `--u` em base. The grow/bloom entrance plays only when the panel scrolls into view (`.is-visible`); the settled scene is the natural state for no-JS, print, and reduced motion, where ambient sway/blink/motes also freeze. **Scene geometry is drawing, not chrome:** its border-radius values (petal blobs like `51% 49% 47% 53%`, `1em`/`4em`–`10em` shape corners) are illustration shapes exempt from the interface radius scale, exactly as scene-ramp colors are exempt from the interface palette. The mono caption comes from `PORTFOLIO.beyond.sceneCaption`.

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
