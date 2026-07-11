---
target: entire project (post-refinement)
total_score: 32
p0_count: 0
p1_count: 2
timestamp: 2026-07-11T16-18-59Z
slug: src-app-features-home-home-component-html
---
Method: dual-agent (A: general-purpose a574f23a311dabe6e design review with browser evidence · B: general-purpose a0eb942008faa0c6e detector + overlay)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active nav dot, form spinner, aria-live toast all present |
| 2 | Match System / Real World | 3 | Human voice; "zoneless"/"SonarQube" assume a technical screener |
| 3 | User Control and Freedom | 3 | Esc doesn't close mobile menu; no focus trap |
| 4 | Consistency and Standards | 4 | Token discipline genuinely excellent; one accent holds site-wide |
| 5 | Error Prevention | 3 | touched-only validation, aria-invalid; required fields unmarked until error |
| 6 | Recognition Rather Than Recall | 3 | Text nav labels; socials icon-only (aria-labeled) |
| 7 | Flexibility and Efficiency | 3 | Resume reachable 4 ways; no skip link slows keyboard path |
| 8 | Aesthetic and Minimalist Design | 3 | Very clean; hero illustration decorates rather than narrates |
| 9 | Error Recovery | 4 | Specific messages, input preserved, honest not-configured state |
| 10 | Help and Documentation | 3 | Self-explanatory; right for the register |
| **Total** | | **32/40** | **Good — solid foundation (up from 25)** |

## Anti-Patterns Verdict

Absolute bans: ALL PASS (verified in source + screenshots — no side-stripes, no gradient text, no glassmorphism, no stat strips, no eyebrows, no numbered scaffolding, 0px horizontal overflow at 390 and 1440).

Category-reflex check FAILS at first order, localized to the hero: "Hi, I'm" + typewriter cycling roles with blinking caret + flat purple illustration-right + Download CV is the modal developer-portfolio hero, element for element. #6c63ff is the signature unDraw purple and the meditating-figure scene reads as unDraw-style stock art. The footer claims "no template" while the fold performs the template. Below the fold the site earns the claim.

Deterministic scan: 7 CLI findings, ALL false positives (the detector's unresolved-CSS-variable rgb(0,0,0) pattern — verified zero literal blacks in source). Browser overlay ran successfully via playwright injection: 16 hits — 4 low-contrast readings are overlay artifacts (it assumed #000000 backgrounds; real backgrounds are white, actual ratios 5.6:1/16.9:1), 2 wide-tracking hits are the documented mono label step, 1 "purple palette" note is the committed brand, 9 line-length hits (~90-100 chars) are real but minor (70ch CSS max-width yields >80 actual characters).

Measured: body text #5d6673 at 5.8:1 on white (passes AA comfortably).

## Overall Impression

The redesign works: 25 → 32. The journey timeline is now the differentiator PRODUCT.md promised, copy is genuinely personal, token discipline is excellent, and a11y is done in code. What remains is concentrated in one place: the hero's first 10 seconds are the most generic pixels on the page — typewriter + flat purple illustration — on a site whose footer stakes the brand on "no template."

## What's Working

1. The journey timeline: story beat + evidence bullets + one highlight metric per chapter, ending on the college-lab origin — the belief ladder executed in markup.
2. System discipline that survives every surface: one-accent rule, 1px fog borders, ambient shadows, two-voices typography — heuristic 4 earned its 4.
3. Accessibility in code: SR-safe typewriter, reduced-motion kill-switches (global + per-component + JS), persistent aria-live toast, visible focus ring (screenshot-verified).

## Priority Issues

**[P1] The hero is the template it claims not to be.** Typewriter + caret + flat unDraw-purple scene = the modal dev-portfolio fold. PRODUCT.md's goal is "unforgettable"; anti-reference #1 is template portfolios. Fix: kill or redesign the typewriter as a typographic moment; re-art-direct the scene to tell HIS story (the college-lab refresh, a v8→v19 ascent) instead of a stock meditation pose; lead the tagline with story, not stack. Also: the meditation pose contradicts "energy & ambition lead". Suggested: /impeccable bolder hero.

**[P1] Scroll-reveal gates content visibility.** .scroll-reveal { opacity: 0 } is a static host class; only IntersectionObserver restores visibility. Screenshot evidence: post-hydration render showed journey cards 2-5 blank. Violates DESIGN.md's own "content visible by default" invariant; breaks print and find-in-page. Fix: visible by default, arm the hidden state from the directive at observe-time (rAF), add @media print reset. Suggested: /impeccable harden.

**[P2] Iris #6c63ff at 4.31:1 used below large-text threshold** — 14px project links, 16px/600 contact links, sidebar Resume pill. Fix: swap text-sized iris to --color-primary-strong #5a50f0 (5.5:1), token already exists. Suggested: /impeccable audit or direct fix.

**[P2] Keyboard/mobile ergonomics:** no skip link (12 tab stops to content), Esc doesn't close mobile menu, hamburger 40px < 44pt. Suggested: /impeccable harden.

**[P2] "This website" card links to a GitHub profile, not a repo** (portfolio.config.ts) — the one proof link a technical screener clicks. Fix: point at the actual repo or drop the link. (Assessment A also claimed a duplicate resume PDF in /public; verified false — only the Dec 2025 file exists under the canonical name.)

## Persona Red Flags

Jordan (recruiter): primary action succeeds — resume is first-fold primary + pinned everywhere; but mid-cycle the typewriter can read a truncated "Angular Engine" as the visible role, and the memorable thing (journey) is below the fold.
Casey (mobile): zero overflow, full-width thumb-zone CTAs, tel: link works; hamburger under 44pt.
Sam (a11y): typewriter handling better than 95% of portfolios; but no skip link, no Esc-close/focus trap on menu, iris links at 4.31:1, no pause control on the infinite typewriter (WCAG 2.2.2).

## Minor Observations

- h2 clamp max 3.25rem vs DESIGN.md's 3.5rem — token drift (docs or code, pick one).
- Beyond section: two paragraphs saying the same thing; thinnest beat on the page — cut one, consider a single real artifact (one photo or sketch).
- Journey: five white cards on white — could borrow one rhythm change.
- nth-child stagger caps at 7 hero children — silently breaks if one is added.
- PRODUCT.md's memorable line never appears on the page in any form.
- Line lengths in journey bullets reach ~90-100 chars at 1440.

## Questions to Consider

1. PRODUCT.md says energy leads — why is the signature image a person meditating? What would a builder mid-build look like?
2. If a recruiter described this site in one sentence, would it mention anything a template couldn't have? The honest answer (the journey timeline) is four screens down.
3. Is the typewriter worth keeping if it's the single element every template shares?
