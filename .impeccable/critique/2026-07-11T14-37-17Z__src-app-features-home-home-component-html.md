---
target: entire project (home page, all 10 sections)
total_score: 25
p0_count: 1
p1_count: 3
timestamp: 2026-07-11T14-37-17Z
slug: src-app-features-home-home-component-html
---
Method: dual-agent (A: Explore design review · B: general-purpose a6cf2536783384424 detector)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Broken hero images have no fallback; toast not announced to screen readers |
| 2 | Match System / Real World | 3 | "10+ Commits" (hero.component.html:34) is a meaningless metric to a recruiter |
| 3 | User Control and Freedom | 3 | Smooth-scroll nav, back-to-top, mobile dismiss all present |
| 4 | Consistency and Standards | 2 | "3+ Years" (hero) vs "4+ Years" (about); 3 different chip treatments; same data as two timelines; 39 off-system values (detector) |
| 5 | Error Prevention | 3 | Reactive validators + disabled-while-sending + credential guard |
| 6 | Recognition Rather Than Recall | 3 | Labelled sidebar with active dot; but resume CTA is not persistent |
| 7 | Flexibility and Efficiency | 2 | Resume absent from nav; recruiter must scroll the fold; 3-item project filter is pointless overhead |
| 8 | Aesthetic and Minimalist Design | 2 | Skill % bars, duplicated Journey/Experience, broken hero, emoji metrics |
| 9 | Error Recovery | 2 | "checking EmailJS credentials" leaks dev jargon (contact.component.ts:77); toast has no role/aria-live |
| 10 | Help and Documentation | 2 | Minimal, appropriate for a portfolio |
| **Total** | | **25/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment: yes — this would read as AI-generated.** The shell is competent Angular and the single-accent palette is disciplined, but the surface stacks the exact scaffolds the skill names as tells, and violates the project's own DESIGN.md in writing:

- **Skill percentage bars** (skills.component.html:16-21, data at portfolio.content.ts:44,55,67) — a named anti-reference in PRODUCT.md itself
- **New gradient + second accent** #a78bfa (skills.component.scss:51) — breaks the One Ink Rule and Gradient Exception
- **Hero-metric template ×3** — hero stat strip (hero.component.html:24-37), about stat cards, impact grid
- **Numbered section markers on all 10 sections** (01–10 via section-header + portfolio.content.ts:12-21) — the ban's uniform-scaffold case exactly
- **Identical card grids ×4** (skills, about, impact, projects)
- **Duplicate career data** — Journey (04) and Experience (05) both render EXPERIENCE_ITEMS back-to-back
- **The differentiator is broken**: hero loads five PNGs from public/assets/3d/ that do not exist on disk

**Deterministic scan: 51 findings, 39 real after triage.** design-system-font-size 26 (25 real — 0.72–1.8rem literals off the documented ramp), design-system-color 14 (4 real: #a78bfa, #dc2626 ×2, #16a34a; 10 rgb(0,0,0) hits are false positives from unresolved CSS variables), design-system-radius 9 (all real: 2/16/20px literals off the 8/12/24/9999 scale), layout-transition 1 (real: transition: width on the skill bar), broken-image 1 (false positive: ngSrc inside an @if guard). Detector corroborates the heuristic-4 consistency score and caught token sprawl the design review only sensed.

**Visual overlays:** skipped — no browser automation tool exposed this session; findings are source-verified only.

## Overall Impression

Strong engineering shell (SSR guards, OnPush, @defer, reduced-motion handling) wearing a template's clothes. The "builder with a story" positioning never materializes: the story exists in section names, not in the experience — and the one element built to carry personality (the 3D hero scene) renders as five broken images. Single biggest opportunity: fix the hero and make Journey genuinely narrative instead of a second copy of the resume.

## What's Working

1. **Disciplined token system** — _variables.scss, shared .section-card/.button-* primitives, one-accent palette, ambient shadow vocabulary matching DESIGN.md intent.
2. **Real engineering rigor** — SSR-safe guards (scroll-reveal.directive.ts:22-26), OnPush everywhere, @defer(on viewport) with shimmer placeholders, scroll observer outside Angular zone; the reveal correctly enhances visible-by-default content.
3. **Honest metrics in the copy** — the 40%/30%/20%/18% figures with context (portfolio.content.ts:102-107,136-141) are exactly the belief-ladder proof PRODUCT.md calls for.

## Priority Issues

**[P0] Hero centerpiece is broken — its five PNG assets don't exist.** hero.component.html:42-46 loads /assets/3d/*.png; public/assets/ is empty. The recruiter's first fold is five failed images. Fix: ship the PNGs or replace with a committed visual; add error fallback. Suggested: /impeccable shape (hero scene) then /impeccable polish.

**[P1] Primary conversion buried and pointing at the wrong file.** Resume is the quiet secondary button ("View Resume", hero.component.html:21), links the 7.6KB stub instead of the Dec 2025 PDF, and appears nowhere else. PRODUCT.md's success metric IS the resume download. Fix: resume = primary hero CTA with download attr + persistent nav link + correct file. Suggested: /impeccable polish.

**[P1] Journey (04) and Experience (05) render the same data twice.** journey.component.ts:21 reverses the same EXPERIENCE_ITEMS Experience re-lists. Doubles reading cost, kills momentum. Fix: make Journey the narrative (short personal prose, turning points), Experience the evidence (metrics-first) — or merge. Suggested: /impeccable distill.

**[P1] Own-rulebook violations: skill % bars + #a78bfa gradient.** skills.component.html:16-21, skills.component.scss:51-52 (also the detector's only layout-transition hit). Fix: delete proficiency numbers/bars; remove #a78bfa. Suggested: /impeccable distill + /impeccable polish.

**[P2] Content bugs erode trust.** "Top 10." placeholder junk (contact.component.html:10); "3+ Years" vs "4+ Years" contradiction; "10+ Commits" as a headline metric. Fix: remove/reconcile/replace. Suggested: /impeccable clarify.

## Persona Red Flags

**Jordan (recruiter, first-timer):** lands on five broken images; the loud button says "Explore My Journey" while her actual goal (resume) is the quiet one; reads the same four jobs twice; hits "Top 10." mid-sentence and reads the page as unfinished.

**Casey (distracted mobile):** resume/contact require scrolling the whole 10-section stack (no persistent CTA in the top bar); contact form loses all state on interruption; broken hero images still cost layout and load attempts on a slow connection.

**Sam (accessibility):** typewriter announces every keystroke via aria-live="polite" (hero.component.html:10) — "A… An… Ang…" every 84ms; form toast is a plain <p> with no role="status"; contact.component.scss:73-76 sets outline: none, killing the global 3px focus ring in the one flow keyboard users must complete; muted #6b7280 at 0.78–0.88rem on tinted surfaces sits at/below 4.5:1, and placeholders add opacity 0.7 on top.

## Minor Observations

- Dead theme system: ThemeService writes data-theme="dark" on system preference but zero dark tokens exist and toggle() is wired to nothing — DESIGN.md's named "broken promise."
- Three inconsistent chip components (tech-badge, .beyond__chip, .future__tag).
- Project filter over-engineered for 3 items; "exploring-learning" is categorized Angular but its stack is React/Three.js.
- Emoji icon system (📊🤖📷🎵) renders inconsistently and reads generic against the refined brand.
- Undocumented form-state colors #dc2626/#16a34a — functional, but DESIGN.md needs error/success tokens.
- Journey/Experience timeline lines add two more accent gradients beyond the two committed ones.
- 25 off-ramp font sizes and 9 off-scale radii (detector) — token discipline eroding at the component level.

## Questions to Consider

1. If the hero PNGs were never going to ship, what is the actual differentiator? Strip them and this is a resume in HTML. What's the one un-templatable thing this page does?
2. Why does the career appear twice but the story zero times? What would Journey look like as genuine narrative — the college HTML moment, the v8→v19 grind, the automation win?
3. If a recruiter has 10 seconds, why is the resume the quietest button on the page?
