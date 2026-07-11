# Pushpendra Singh — Portfolio v4

Personal portfolio built with Angular 21: statically prerendered, zoneless, config-driven, and hand-designed (no template). Live sections: Hero, About, Journey, Skills, Projects, Beyond, Contact.

## Editing content (the important part)

**All site content lives in one typed file: [`src/app/core/content/portfolio.config.ts`](src/app/core/content/portfolio.config.ts).**

Every section reads from the exported `PORTFOLIO` object. To change anything on the site, edit that file — no component changes needed:

| Want to… | Edit |
|---|---|
| Change name, roles, tagline, hero proof line | `identity` |
| Update the resume | Replace `public/Pushpendra_Singh_Resume.pdf` (keep the filename, or update `identity.resume`) |
| Add/remove a job or milestone | `journey.entries` (kind `'role'` for jobs, `'milestone'` for origin-story beats) |
| Change the highlight stat on a role | `journey.entries[n].highlight` |
| Add a skill or skill group | `skills.groups` / `skills.learning` |
| Add a project | `projects.items` (`monogram` + `coverHue` drive the generated cover art) |
| Update contact channels or form copy | `contact` |
| Change nav labels/order | `nav.items` (ids must match section element ids) |
| SEO title/description | `seo` + `src/index.html` meta tags |

A Jest suite (`portfolio.config.spec.ts`) guards the contract: nav ids must point at real sections, the resume file must exist in `public/`, and links must be well-formed. Run `npm run test:jest` after editing.

## Stack

- Angular 21 standalone components, signals, zoneless change detection
- Statically prerendered (SSG) with incremental hydration (`@defer (hydrate on viewport)`) — full HTML for crawlers, lazy hydration for users, no server to run
- Self-hosted fonts via Fontsource (Plus Jakarta Sans Variable + JetBrains Mono) — no external font CDN
- SCSS design system with CSS custom properties (see `DESIGN.md` for the full spec, `src/styles/_variables.scss` for tokens)
- Hero scene and project covers are code-drawn (SVG/CSS) — zero raster assets to break
- EmailJS contact form (optional; see below)
- ESLint + Prettier; one Jest spec guarding the content-config contract

## Scripts

```bash
npm install
npm start                  # dev server at http://localhost:4200
npm run build              # production build + prerender → dist/portfolio/browser
npm run test:jest          # Jest: the content-config contract spec
npm run lint
npm run format
```

## EmailJS setup (optional)

The contact form uses EmailJS. Until configured, submissions show a friendly "not wired up yet" message and the direct email link still works.

Fill these keys in `src/environments/environment.ts` and `environment.production.ts`:

- `serviceId`, `templateId`, `publicKey`

Note: these values are public by design (they ship in the browser bundle), but they will live in git history once committed.

## Design system

- `PRODUCT.md` — strategy: audience, positioning, brand personality, anti-references
- `DESIGN.md` — the visual spec: palette, type ramp, elevation, components, do's & don'ts
- `.impeccable/design.json` — machine-readable sidecar for design tooling

The rules that matter most: one accent color (Electric Iris `#6c63ff`, under 10% of any screen), JetBrains Mono for metadata only, soft ambient shadows, 1px fog borders, refined 180ms interactions, and a reduced-motion alternative for every animation.

## Deployment

`npm run build` prerenders the site into `dist/portfolio/browser` as plain static files — deploy that folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). There is no server to run. Allowed hosts for the dev server are configured in `angular.json` → `security.allowedHosts`.
