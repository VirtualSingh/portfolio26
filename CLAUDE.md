# Portfolio

Angular 21 SSR personal portfolio for Pushpendra Singh. Single lazy home route with incrementally-hydrated sections (Hero, About, Journey, Skills, Projects, Beyond, Contact); zoneless; SCSS design system with CSS custom properties; Jest + ESLint + Prettier.

**All site content is config-driven:** every word, link, job, and project lives in `src/app/core/content/portfolio.config.ts`. Edit that file to change content; never hardcode copy in components. `portfolio.config.spec.ts` guards the contract.

## Design Context

Strategic and visual context for all design work lives in two root files — read them before building or changing any UI:

- **PRODUCT.md** — register: brand (design IS the product), platform: web. Audience: recruiters and hiring managers. Positioning: "an engineer whose journey and personality come through in everything he builds." Primary CTA: resume download (pinned in nav + hero primary button). Energy & ambition lead the personality; anti-references: template portfolios, flashy 3D/WebGL showcases, corporate resume sites, cluttered everything-sites.
- **DESIGN.md** — Creative North Star: "The Builder's Journal." One accent (Electric Iris #6c63ff) on paper white, Plus Jakarta Sans Variable + JetBrains Mono, pill shapes, ambient soft shadows, refined 180ms interactions, light theme only. Signature components: the code-drawn SVG hero "Ascent" scene (v8→v19 version staircase with builder figure) and generated project covers. The hero has no typewriter — one committed role line. Machine-readable tokens in the frontmatter; extensions in `.impeccable/design.json`.

Deliberately removed (do not reintroduce): uppercase-tracked eyebrows, numbered section markers (01/02/03), skill percentage bars, the standalone Impact/Experience/Future sections (merged into Journey and Contact), dark-mode ThemeService, `@angular/animations` (CSS animations only), zone.js.
