---
target: home page (full site)
total_score: 30
p0_count: 1
p1_count: 2
timestamp: 2026-07-12T16-45-59Z
slug: src-app-features-home-home-component-html
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Journey peak selection swaps a card that sits below the fold at 1440×900 — feedback lands off-screen |
| 2 | Match System / Real World | 3 | "hover a firefly" instructs hover on touch devices; mono captions charming but slightly cryptic |
| 3 | User Control and Freedom | 3 | Marquee pauses on hover only — no touch equivalent; Esc closes mobile menu (good) |
| 4 | Consistency and Standards | 3 | Nav items are buttons with no URL hash sync — no deep-linking to sections, back-button inert |
| 5 | Error Prevention | 1 | Contact form lets a recruiter compose a full message, then always fails: EmailJS keys are empty in environment.production.ts |
| 6 | Recognition Rather Than Recall | 3 | Journey chapters viewable only one at a time; no cue for visited peaks |
| 7 | Flexibility and Efficiency | 4 | Skip link, resume reachable from every viewport state, back-to-top, clean verified tab order |
| 8 | Aesthetic and Minimalist Design | 4 | Genuinely restrained; one accent held; hierarchy carried by weight/scale |
| 9 | Error Recovery | 3 | Field errors specific ("At least 20 characters, please."); error toast offers mailto fallback; no scroll-to-error |
| 10 | Help and Documentation | 3 | Scene captions orient well; firefly glyphs unlabeled until hover/focus |
| **Total** | | **30/40** | **Good — solid foundation, address weak areas** |

## Anti-Patterns Verdict

**Not slop — this is a designed object.** No banned patterns: no gradient text (accent words are solid iris italic), no side-stripe borders on UI chrome, no uppercase-tracked eyebrows, no 01/02/03 markers, no hero-metric template, no glassmorphism. The signature scenes (black-hole hero, ink marquee, generated mountain Range, firefly bowl, CSS Night Garden, generated covers) are bespoke and cohere as one material system.

**Surviving reflexes:** the "Hi, I'm" greeting; three structurally identical project cards; and — the real one — an iris accent word in all 6 of 6 section headings, which turns DESIGN.md's own device ("one word… and not in every heading") into a template tic. "the code." is also a phrase, violating the one-word rule.

**Deterministic scan:** 12 CLI findings (8 design-system-color, 4 design-system-radius), all advisory, and all 12 verified false positives — 7 are the detector defaulting unstyled template elements to UA black (browser-verified: body renders #1a1a2e), 1 is the mask-image `#000` (pure alpha geometry), 4 are Night Garden / Skills bowl scene geometry exempt as "drawing, not chrome." Zero actionable CLI findings.

**In-browser detector (27 findings):** most are the same scene exemptions or a suspect low-contrast pass skewed by headless WebGL readback. The defensible real signals: 5 Journey chapter cards pair a hairline border with a wide diffuse shadow; 2 line-length findings (Journey card bullets, footer copy); a "theater framing" copy tic; and wide letter-spacing on the `.mono-label` cluster (intentional label style, worth a conscious keep/drop decision). Zero console errors or warnings at either viewport; no horizontal overflow; 0 of 36 interactive elements missing accessible names; exactly one h1 with no heading-order violations.

No user-visible overlay was possible (headless-only environment — fallback signal recorded; evidence gathered programmatically).

## Overall Impression

The site earns its "design IS the product" register: one material system, real restraint, and an accessibility floor far above portfolio average. The black-hole hero is the memorable opening PRODUCT.md asks for. The failure pattern is consistent though: the best content is gated behind interactions or viewport positions most recruiters will never reach — the Journey payoff renders below the fold, the proof metrics hide inside non-default chapters, and the one action a convinced recruiter takes (the contact form) cannot succeed in production.

## What's Working

1. **The Range** — career-as-panorama with seeded non-repeating mountains, active-peak iris tint, cards kept in DOM for SEO/print. Concept, craft, and engineering aligned.
2. **Accessibility floor:** skip link, global reduced-motion kill-switch, :focus-visible ring, aria-pressed peaks, aria-live card slot, measured contrast passing (5.81:1 body, 5.34:1 mono). B confirms 0 unlabeled controls and 0 console errors.
3. **Resume-first discipline:** the primary CTA is reachable from every viewport state without nagging.

## Priority Issues

- **[P0] The contact form is dead in production.** environment.production.ts ships empty EmailJS serviceId/templateId/publicKey; every valid submit ends in the "not wired up yet" error toast — after the user wrote a 20+ character message. Peak-end rule makes failure the last memory. **Fix:** configure EmailJS keys, or hide the form and promote mailto/LinkedIn until it's live. **Suggested command:** /impeccable harden (plus the user supplying real keys).
- **[P1] Journey's payoff is below the fold at 1440×900.** The chapter card slot starts at ~y858; hover/click a peak and nothing visibly changes. **Fix:** cap panorama height at wide widths, trim `.journey__range` padding-top, or scrollIntoView the card on selection. **Suggested command:** /impeccable layout.
- **[P1] The belief-ladder metrics are hidden behind interaction.** 40% regression cut, 30% efficiency, 2/2 contracts live only inside non-default chapters. A skimming recruiter sees mountains, not numbers. **Fix:** render each entry's highlight.value as a mono annotation at its summit marker, or add a stat strip under the panorama. **Suggested command:** /impeccable bolder.
- **[P2] Mobile Journey collisions and tap targets (390px).** The range caption overlaps the active marker label; inactive peaks collapse to ~10px dots with hidden labels — far under 44px targets, no tap affordance. **Fix:** hide/shorten caption under 640px; min 44×44 marker hit areas. **Suggested command:** /impeccable adapt.
- **[P2] Accent-word device at 100% saturation.** All six h2s use it; DESIGN.md forbids exactly this, and "the code." breaks the one-word rule. **Fix:** drop the accent from 2–3 headings. **Suggested command:** /impeccable quieter.

## Persona Red Flags

- **Jordan (recruiter, skimming):** hero passes the 10-second test (name, role, resume, proof line above the fold). Red flag: Journey's headline promise "what each one actually shipped" is only redeemable by clicking five peaks; Jordan clicks zero.
- **Casey (distracted mobile):** the event horizon renders as a flat gray smudge behind the proof line at 390px; Journey caption/label overlap looks broken; nothing signals the dots are tappable; the bowl caption tells Casey to hover.
- **Sam (keyboard/SR):** 9 decorative firefly tab stops stand between Skills and the actual list; peak buttons fire select() on focus, so tabbing across five peaks pushes five full card announcements through aria-live; the marquee never stops for touch users.
- **Senior hiring manager, 90 seconds:** sees one employer's detail and one external product; two of three project cards are this website and its previous version. Density of verifiable work evidence per scroll-second is lower than density of illustration.

## Minor Observations

- Nav buttons mean no #section URLs — nothing shareable/deep-linkable.
- .range__card-slot has no min-height; card swaps cause layout jump below.
- Journey cards pair a hairline border with a wide soft shadow (detector-confirmed on all 5) — pick one material.
- Line length slightly over budget on Journey card bullets and footer copy.
- Empty-submit validation is exemplary, but there's no scroll-to-error.
- The hero h1 textContent reads "PushpendraSingh" (no space across the line break) — check SR pronunciation.

## Questions to Consider

1. Does the Range serve the story or guard it? Four of five chapters sit behind an interaction most recruiters never perform — would you accept a resume with experience collapsed by default?
2. Is a black hole the right myth for an "ascent" brand? It's beautiful — is it *his*?
3. When two of three "built and shipped" proofs are this site and its predecessor, what real work artifact could take that third slot?
