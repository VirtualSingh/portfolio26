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
  /** Short name at this entry's peak in the Journey range scene. Defaults to `place`. */
  peakLabel?: string;
}

export interface SkillGroup {
  name: string;
  items: readonly string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  techStack: readonly string[];
  /** Cover screenshot, served from /public (e.g. 'images/foo.png' — keep it
   *  relative so it resolves against <base href> on GitHub Pages).
   *  Omit to fall back to the generated monogram cover. */
  image?: string;
  /** Two-letter mark drawn on the generated cover art (fallback when no image). */
  monogram: string;
  /** Cover accent hue rotation in degrees (0 = brand iris). Keep subtle: 0–40. */
  coverHue: number;
  live?: { label: string; url: string };
  repository?: { label: string; url: string };
  status?: string;
}

/** Icons available for bowl fireflies — each maps to a hand-drawn SVG glyph in the Skills scene. */
export type BowlSkillIcon =
  | 'angular'
  | 'typescript'
  | 'rxjs'
  | 'sass'
  | 'jest'
  | 'playwright'
  | 'git'
  | 'html'
  | 'tailwind';

export interface BowlSkill {
  label: string;
  icon: BowlSkillIcon;
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
      "It started with one HTML file in a college lab. Now I lead Angular migrations and build component libraries for teams I've never met.",
    /** The version blocks drawn in the hero's Ascent scene — the real migration ladder. */
    ascent: ['v8', 'v14', 'v19', 'v22'],
    /** The quiet mono proof line under the hero CTAs. Keep it to real, checkable facts. */
    proofLine: 'Angular v14→v22 migrations · micro-frontends · 40% regression-testing time cut',
    resume: {
      label: 'Resume',
      /** File lives in /public. Kept relative (no leading slash) so it resolves
       *  against <base href> and works at the domain root or any subpath. */
      url: 'Pushpendra_Singh_Resume.pdf',
      fileName: 'Pushpendra_Singh_Resume.pdf',
    },
    socials: [
      { label: 'GitHub', url: 'https://github.com/virtualsingh', icon: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ps-rajput', icon: 'linkedin' },
      { label: 'Email', url: 'mailto:singh16195@gmail.com', icon: 'email' },
    ] as readonly SocialLink[],
  },

  /** Phrases scrolling through the ink ticker strip under the hero. Keep each ≤3 words. */
  marquee: {
    items: [
      'Angular v14→v22',
      'Component libraries',
      'Micro-frontends',
      'Design systems',
      'Test automation',
      'Pixel care',
    ],
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
      'Hand-writing HTML in a college lab, hitting refresh, watching a page come alive — that moment never got old. It just got bigger: pages, then forms, then entire component libraries.',
      "Four years of Angular later, I'm at Aira Matrix — leading the v22 upgrade, building dashboards and refactoring entire codebases end to end.",
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
    description: 'Five chapters. What each one actually shipped.',
    /** Mono caption inside the mountain-range scene panel. */
    rangeCaption: 'the range · every peak is a chapter',
    /** Chapter cards preview 2 bullets and 4 stack badges; the expand toggles
     *  read "+N more" / this collapse label. */
    moreLabel: 'more',
    lessLabel: 'Show less',
    entries: [
      {
        kind: 'role',
        title: 'Software Engineer',
        place: 'Aira Matrix',
        location: 'Thane, MH',
        dateRange: 'Aug 2025 — Present',
        story: 'The systems chapter: making an entire codebase easier for the next engineer.',
        bullets: [
          'Revamped complete dashboard of existing product, replaced chart.js with ngx-echarts, and improved performance by 30%.',
          'Led the production upgrade to Angular 22 for 3 products end to end.',
          'Resolved 30+ critical and Blocker SonarQube issues, lifting code coverage by 85%.',
          'Set up a AI pipeline for fixing SonarQube issues and adding test cases to increase coverage, cutting manual effort by 60% and improving code quality.',
        ],
        stack: ['Angular 22', 'RxJS','LESS', 'TypeScript','Angular Material',  'SonarQube Cloud','SonarQube MCP Server', 'Claude Code', 'Ngx-Echarts'],
        highlight: { value: '85%', label: 'Code Coverage across 3 products' },
      },
      {
        kind: 'role',
        title: 'Software Engineer',
        place: 'Vitrana',
        location: 'Noida, UP',
        dateRange: 'Aug 2022 — Mar 2025',
        story:
          'The depth chapter: forms, migrations, and learning to automate myself out of repetition.',
        bullets: [
          'Built configurable intake forms with conditional logic — data-collection efficiency up 30%.',
          'Helped the migration of 3 modules from Angular 8 to 14, cutting maintenance overhead by 20%.',
          'Built Playwright + Cucumber automation suites with 3 team members that cut manual regression testing by 50%.',
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
          'Turned Figma wireframes into working prototypes for client pitches.',
          'Built reactive forms with multi-step validation, cutting submission errors by ~20%.',
        ],
        stack: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
        highlight: { value: '2/2', label: 'prototypes' },
        peakLabel: 'Vitrana · intern',
      },
      {
        kind: 'role',
        title: 'Web Development Intern',
        place: 'FULL Creative',
        location: 'Remote',
        dateRange: 'Sep 2021 — Dec 2021',
        story:
          'The fundamentals chapter: no framework, no safety net — just HTML, CSS, and deadlines.',
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
        peakLabel: 'College lab',
      },
    ] as readonly JourneyEntry[],
  },

  skills: {
    titleStart: 'Tools I think in.',
    accentWord: '',
    titleEnd: '',
    description: 'Angular-first, styling-disciplined, automation-tested.',
    /** The "borrow the light" fish bowl beside the skills list — each item is a
     *  glowing skill icon disguised as a firefly that flares and names itself on
     *  hover. Maximum 9 (the scene has 9 spots); icons come from BowlSkillIcon. */
    bowl: {
      caption: 'borrow the light · hover a firefly',
      items: [
        { label: 'Angular', icon: 'angular' },
        { label: 'TypeScript', icon: 'typescript' },
        { label: 'RxJS', icon: 'rxjs' },
        { label: 'SCSS', icon: 'sass' },
        { label: 'Jest', icon: 'jest' },
        { label: 'Playwright', icon: 'playwright' },
        { label: 'Git', icon: 'git' },
        { label: 'HTML5', icon: 'html' },
        { label: 'Tailwind', icon: 'tailwind' },
      ] as readonly BowlSkill[],
    },
    groups: [
      {
        name: 'Core',
        items: ['Angular (v14–v22)', 'TypeScript', 'RxJS', 'JavaScript', 'Single SPA'],
      },
      {
        name: 'UI & Styling',
        items: ['HTML5', 'SCSS', 'LESS', 'Tailwind CSS', 'Angular Material', 'PrimeNG'],
      },
      {
        name: 'Testing & Tools',
        items: ['Jest', 'Playwright', 'Cucumber', 'Git', 'SonarQube', 'Webpack'],
      },
    ] as readonly SkillGroup[],
    learningLabel: 'Currently learning',
    learning: ['React', 'Three.js', 'OpenSeaDragon'],
  },

  projects: {
    titleStart: "Things I've built and shipped.",
    accentWord: '',
    titleEnd: '',
    description: 'From live dashboards to the page you are reading.',
    items: [
      {
        name: 'Ngx-Echarts Implementation',
        description:
          'A professional, responsive analytics dashboard showcasing comprehensive metrics through interactive data visualizations.',
        techStack: ['Angular', 'TypeScript', 'Chart.js', 'RxJS'],
        image: 'images/ngxecharts.png',
        monogram: 'AC',
        coverHue: 0,
        live: { label: 'Live Demo', url: 'https://virtualsingh.github.io/echarts-dashboard-implementation/' },
        repository: { label: 'GitHub', url: 'https://github.com/VirtualSingh/echarts-dashboard-implementation' },
      },
      {
        name: 'Portfolio v3',
        description:
          'The previous generation of this site — hand-rolled HTML, CSS, and JavaScript with smooth scroll animations.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: 'images/portfolio3.png',
        monogram: 'P3',
        coverHue: 24,
        live: { label: 'Live Demo', url: 'https://virtualsingh.github.io/portfolio-v3' },
        repository: { label: 'GitHub', url: 'https://github.com/virtualsingh/portfolio-v3' },
      },
      {
        name: 'This website',
        description:
          'Portfolio v4: Angular 22, prerendered, zoneless, config-driven — every word on this page lives in one typed file.',
        techStack: ['Angular 22', 'SSG', 'SCSS', 'Jest'],
        image: 'images/portfolio4.png',
        monogram: 'V4',
        coverHue: 340,
        status: 'You are here',
        live: { label: 'Live Demo', url: 'https://pushpendrasingh.dev/' },
        repository: { label: 'GitHub', url: 'https://github.com/VirtualSingh/portfolio26' },
      },
    ] as readonly ProjectItem[],
  },

  beyond: {
    titleStart: 'Beyond the',
    accentWord: 'code.',
    description: 'Capturing moments, listening to music, and exploring new places.',
    extended: 'Interface ideas get sketched in pen first — a few ended up on this very page.',
    /** Mono caption inside the code-drawn night-garden scene panel. */
    sceneCaption: 'the night garden · drawn in code, no images',
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
      "That's the work. This is the reaching-out part — pick whichever channel suits, or grab the resume and skip ahead.",
    channels: [
      { kind: 'email', label: 'singh16195@gmail.com', href: 'mailto:singh16195@gmail.com' },
      { kind: 'phone', label: '+91 93100 81407', href: 'tel:+919310081407' },
      { kind: 'location', label: 'Thane, Maharashtra, India' },
      {
        kind: 'linkedin',
        label: 'linkedin.com/in/ps-rajput',
        href: 'https://www.linkedin.com/in/ps-rajput',
      },
    ] as readonly ContactChannel[],
    form: {
      submitLabel: 'Send message',
      sendingLabel: 'Sending…',
      successMessage: "Message sent — I'll get back to you soon.",
      errorMessage: "That didn't go through. Please try again, or email me directly.",
      notConfiguredMessage: 'The contact form is not wired up yet — please email me directly.',
      /** Shown instead of the form while EmailJS credentials are not configured. */
      offlineNote:
        "The form is still warming up — until it's live, email reaches me fastest. I reply within a day.",
      offlineCta: 'Email me directly',
    },
  },

  footer: {
    line: 'Designed & built by Pushpendra Singh',
    stackNote: 'Angular 22 · zoneless · probably tweaking this footer again',
  },

  seo: {
    title: 'Pushpendra Singh — Angular & Frontend Engineer',
    description:
      'Frontend engineer with 4+ years in Angular (v14–v22): micro-frontends, component libraries, and measurable outcomes. Portfolio, experience, and contact.',
    siteUrl: 'https://pushpendra-singh.dev',
  },
} as const;

export type Portfolio = typeof PORTFOLIO;
