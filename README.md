# Pushpendra Singh Portfolio

Production-ready personal portfolio built with Angular standalone components, SCSS, signals, deferred section loading, dark mode, and SSR-backed prerendering.

## Stack

- Angular 21 standalone components with lazy home route and deferred section loading
- SCSS design system with CSS custom properties and dark theme support
- Angular signals for filters, typewriter state, theme state, and UI feedback
- Angular animations for staged hero, skills, timeline, and card transitions
- EmailJS placeholder integration for the contact form
- Angular SSR/prerender output for static deployment to Netlify or Vercel
- Jest, ESLint, and Prettier configuration for quality checks

## Project scripts

```bash
npm install
npm start
npm run build
npm run prerender
npm run test:jest
npm run test
npm run lint
```

## Local development

Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:4200`.

## EmailJS setup

Add your EmailJS values in both files below:

- `src/environments/environment.ts`
- `src/environments/environment.production.ts`

Fill in these keys:

- `serviceId`
- `templateId`
- `publicKey`

The contact form will show an inline error toast until all three values are configured.

## Build and deployment

Run the production build:

```bash
npm run build
```

Angular now prerenders the app during build. The generated static files live in:

```bash
dist/portfolio/browser
```

### Netlify

- Build command: `npm run build`
- Publish directory: `dist/portfolio/browser`

### Vercel

- Framework preset: `Other`
- Build command: `npm run build`
- Output directory: `dist/portfolio/browser`

## Testing and quality

- `npm run test:jest` runs Jest component and service tests.
- `npm run test` runs Angular's built-in unit test pipeline.
- `npm run lint` runs ESLint with TypeScript and Angular template checks.
- `npm run format` formats the project with Prettier.

## Lighthouse targets

- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## Notes

- Resume download buttons currently point to `public/Pushpendra_Singh_Resume.pdf`.
- Project screenshots reuse assets from the earlier portfolio inside `public/portfolio-v3`.
- Replace the hero initials badge with a real profile photo when available.
- `public/sitemap.xml` ships with a placeholder production domain. Update it before deployment.
