/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONFIG — the single place to edit site content.
 *
 *  Every section of the site reads from the `PORTFOLIO` object below.
 *  Add a job? Extend `journey.entries`. New project? Add to `projects.items`.
 *  Changed roles/tagline/links? Edit `identity`. No component changes needed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface NavItem {
  /** Section element id the link scrolls to. */
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  url: string;
  /** Which built-in icon to render. */
  icon: 'github' | 'linkedin' | 'email';
}

export interface JourneyEntry {
  /** 'role' renders the full card; 'milestone' renders the compact origin card. */
  kind: 'role' | 'milestone';
  title: string;
  place: string;
  location: string;
  dateRange: string;
  /** Short narrative line shown under the title — the story beat, not a duty list. */
  story: string;
  bullets: readonly string[];
  stack: readonly string[];
  /** One real, measured outcome for this chapter. Shown as the highlight stat. */
  highlight?: { value: string; label: string };
}

export interface SkillGroup {
  name: string;
  items: readonly string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  techStack: readonly string[];
  /** Two-letter mark drawn on the generated cover art. */
  monogram: string;
  /** Cover accent hue rotation in degrees (0 = brand iris). Keep subtle: 0–40. */
  coverHue: number;
  live?: { label: string; url: string };
  repository?: { label: string; url: string };
  status?: string;
}

export interface ContactChannel {
  kind: 'email' | 'phone' | 'location' | 'linkedin';
  label: string;
  href?: string;
}

export const PORTFOLIO = {
  identity: {
    firstName: 'Pushpendra',
    lastName: 'Singh',
    greeting: "Hi, I'm",
    role: 'Frontend engineer · builder of UI systems',
    tagline:
      "It started with one HTML file in a college lab. Four years later I lead Angular migrations and build component libraries for teams I've never met — and every screen still gets the care of that first page.",
    /** The version blocks drawn in the hero's Ascent scene — the real migration ladder. */
    ascent: ['v8', 'v14', 'v17', 'v19'],
    /** The quiet mono proof line under the hero CTAs. Keep it to real, checkable facts. */
    proofLine: 'Angular v8→v19 migrations · micro-frontends · 40% regression-testing time cut',
    resume: {
      label: 'Download Resume',
      /** File lives in /public. Replace the PDF there to update the download. */
      url: '/Pushpendra_Singh_Resume.pdf',
      fileName: 'Pushpendra_Singh_Resume.pdf',
    },
    socials: [
      { label: 'GitHub', url: 'https://github.com/virtualsingh', icon: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ps-rajput', icon: 'linkedin' },
      { label: 'Email', url: 'mailto:singh16195@gmail.com', icon: 'email' },
    ] as readonly SocialLink[],
  },

  nav: {
    items: [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'journey', label: 'Journey' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'beyond', label: 'Beyond' },
      { id: 'contact', label: 'Contact' },
    ] as readonly NavItem[],
  },

  about: {
    titleStart: 'Every journey starts with',
    accentWord: 'curiosity.',
    paragraphs: [
      'Mine started in a college lab, hand-writing HTML and refreshing the browser to watch a page come alive. That moment never got old — it just got bigger: from static pages to email templates, to reactive forms, to entire component libraries used by teams I have never met.',
      "Today I'm a frontend engineer with 4+ years in Angular, currently at Aira Matrix — where I led the upgrade to Angular 19 and I'm building an in-house library of 15+ components for three product squads.",
    ],
    facts: [
      '4+ years across 3 companies',
      'Meta Front-End Developer certificate',
      'Front-End JavaScript Frameworks: Angular — Coursera',
    ],
  },

  journey: {
    titleStart: 'Turning curiosity into',
    accentWord: 'career.',
    description:
      'One timeline, told honestly — what each chapter taught me and what it actually shipped.',
    entries: [
      {
        kind: 'role',
        title: 'Software Engineer',
        place: 'Aira Matrix',
        location: 'Thane, MH',
        dateRange: 'Aug 2025 — Present',
        story: 'The systems chapter: making an entire codebase easier for the next engineer.',
        bullets: [
          'Led the production upgrade to Angular 19 for a team of 8+ engineers.',
          'Resolved 30+ critical SonarQube issues, lifting code coverage by ~18%.',
          'Architecting an in-house component library — 15+ components serving three product squads.',
        ],
        stack: ['Angular 19', 'Angular Material', 'LESS', 'OpenSeaDragon', 'SonarQube'],
        highlight: { value: '15+', label: 'library components across 3 squads' },
      },
      {
        kind: 'role',
        title: 'Software Engineer',
        place: 'Vitrana',
        location: 'Noida, UP',
        dateRange: 'Aug 2022 — Mar 2025',
        story: 'The depth chapter: forms, migrations, and learning to automate myself out of repetition.',
        bullets: [
          'Built configurable intake forms with conditional logic — data-collection efficiency up 30%.',
          'Led the migration of 6 modules from Angular 8 to 14, cutting maintenance overhead by 20%.',
          'Built Playwright + Cucumber automation suites that cut manual regression testing by 40%.',
        ],
        stack: ['Angular', 'TypeScript', 'RxJS', 'PrimeNG', 'SCSS', 'Single SPA'],
        highlight: { value: '40%', label: 'less manual regression testing' },
      },
      {
        kind: 'role',
        title: 'Angular Developer Intern',
        place: 'Vitrana',
        location: 'Noida, UP',
        dateRange: 'Feb 2022 — Jul 2022',
        story: 'The proving chapter: wireframes in, working prototypes out.',
        bullets: [
          'Turned Figma wireframes into working prototypes for 2 client pitches — both won contracts.',
          'Built reactive forms with multi-step validation, cutting submission errors by ~20%.',
        ],
        stack: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
        highlight: { value: '2/2', label: 'prototypes that won the contract' },
      },
      {
        kind: 'role',
        title: 'Web Development Intern',
        place: 'FULL Creative',
        location: 'Remote',
        dateRange: 'Sep 2021 — Dec 2021',
        story: 'The fundamentals chapter: no framework, no safety net — just HTML, CSS, and deadlines.',
        bullets: [
          'Designed and shipped 4 responsive websites from scratch.',
          'Built and cross-tested 4 HTML email templates across Gmail, Outlook, and Apple Mail.',
        ],
        stack: ['HTML', 'CSS', 'JavaScript'],
        highlight: { value: '4', label: 'sites shipped from a blank editor' },
      },
      {
        kind: 'milestone',
        title: 'The first webpage',
        place: 'IEC College of Engineering, Greater Noida',
        location: '',
        dateRange: '2016 — 2021',
        story:
          'B.Tech in Computer Science — and a college lab where I wrote my first HTML page, hit refresh, and decided this was the job.',
        bullets: [],
        stack: [],
      },
    ] as readonly JourneyEntry[],
  },

  skills: {
    titleStart: 'Tools I',
    accentWord: 'think',
    titleEnd: 'in.',
    description:
      'Angular-first engineering with strong styling discipline and real test-automation experience.',
    groups: [
      { name: 'Core', items: ['Angular (v8–v19)', 'TypeScript', 'RxJS', 'JavaScript', 'Single SPA'] },
      { name: 'UI & Styling', items: ['HTML5', 'SCSS', 'LESS', 'Tailwind CSS', 'Angular Material', 'PrimeNG'] },
      { name: 'Testing & Tools', items: ['Jest', 'Playwright', 'Cucumber', 'Git', 'SonarQube', 'Webpack'] },
    ] as readonly SkillGroup[],
    learningLabel: 'Currently learning',
    learning: ['React', 'Three.js', 'OpenSeaDragon'],
  },

  projects: {
    titleStart: "Things I've",
    accentWord: 'built',
    titleEnd: 'and shipped.',
    description: 'Selected work — from live dashboards to the site you are reading right now.',
    items: [
      {
        name: 'AutoCrypto v3',
        description:
          'Real-time cryptocurrency dashboard with live price charts and portfolio tracking, built on RxJS data streams.',
        techStack: ['Angular', 'TypeScript', 'Chart.js', 'RxJS'],
        monogram: 'AC',
        coverHue: 0,
        live: { label: 'Live Demo', url: 'https://virtualsingh.github.io/autocrypto-v3' },
        repository: { label: 'GitHub', url: 'https://github.com/virtualsingh/autocrypto-v3' },
      },
      {
        name: 'Portfolio v3',
        description:
          'The previous generation of this site — hand-rolled HTML, CSS, and JavaScript with smooth scroll animations.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        monogram: 'P3',
        coverHue: 24,
        live: { label: 'Live Demo', url: 'https://virtualsingh.github.io/portfolio-v3' },
        repository: { label: 'GitHub', url: 'https://github.com/virtualsingh/portfolio-v3' },
      },
      {
        name: 'This website',
        description:
          'Portfolio v4: Angular 21, server-side rendered, zoneless, and fully config-driven — every word on this page lives in one typed file.',
        techStack: ['Angular 21', 'SSR', 'SCSS', 'Jest'],
        monogram: 'V4',
        coverHue: 340,
        status: 'You are here',
      },
    ] as readonly ProjectItem[],
  },

  beyond: {
    titleStart: 'Beyond',
    accentWord: 'the code.',
    description: 'Capturing moments, listening to music, and exploring new places.',
    extended:
      'The notebook habit is the real one — interface ideas get sketched in pen first, and a few of them ended up on this very page.',
    hobbies: [
      { icon: 'camera', label: 'Photography' },
      { icon: 'music', label: 'Music' },
      { icon: 'pen', label: 'Design sketching' },
      { icon: 'compass', label: 'Exploring' },
    ] as readonly { icon: 'camera' | 'music' | 'pen' | 'compass'; label: string }[],
  },

  contact: {
    titleStart: "Let's build what's",
    accentWord: 'next.',
    description:
      "I'm always open to new opportunities, collaborations, and good conversations about frontend. The form is the fastest way to reach me — or grab the resume and skip ahead.",
    channels: [
      { kind: 'email', label: 'singh16195@gmail.com', href: 'mailto:singh16195@gmail.com' },
      { kind: 'phone', label: '+91 93100 81407', href: 'tel:+919310081407' },
      { kind: 'location', label: 'Thane, Maharashtra, India' },
      { kind: 'linkedin', label: 'linkedin.com/in/ps-rajput', href: 'https://www.linkedin.com/in/ps-rajput' },
    ] as readonly ContactChannel[],
    form: {
      submitLabel: 'Send message',
      sendingLabel: 'Sending…',
      successMessage: "Message sent — I'll get back to you soon.",
      errorMessage: "That didn't go through. Please try again, or email me directly.",
      notConfiguredMessage: 'The contact form is not wired up yet — please email me directly.',
    },
  },

  footer: {
    line: 'Designed & built by Pushpendra Singh',
    stackNote: 'Angular 21 · SSR · no template',
  },

  seo: {
    title: 'Pushpendra Singh — Angular & Frontend Engineer',
    description:
      'Frontend engineer with 4+ years in Angular (v8–v19): micro-frontends, component libraries, and measurable outcomes. Portfolio, experience, and contact.',
    siteUrl: 'https://pushpendra-singh.dev',
  },
} as const;

export type Portfolio = typeof PORTFOLIO;
