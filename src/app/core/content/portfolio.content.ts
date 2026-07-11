import type { Experience } from '../models/experience.model';
import type { Project } from '../models/project.model';
import type { SkillCategory } from '../models/skill.model';

export interface NavItem {
  number: string;
  id: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { number: '01', id: 'hero', label: 'Home' },
  { number: '02', id: 'about', label: 'About' },
  { number: '03', id: 'skills', label: 'Skills' },
  { number: '04', id: 'journey', label: 'Journey' },
  { number: '05', id: 'experience', label: 'Experience' },
  { number: '06', id: 'impact', label: 'Impact' },
  { number: '07', id: 'projects', label: 'Projects' },
  { number: '08', id: 'beyond', label: 'Beyond' },
  { number: '09', id: 'future', label: 'Future' },
  { number: '10', id: 'contact', label: 'Contact' },
] as const;

export const HERO_ROLES = [
  'Angular Developer',
  'Frontend Engineer',
  'UI Architecture Specialist',
] as const;

export const ABOUT_STATS = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: '', label: 'Companies' },
  { value: 2, suffix: '', label: 'Certifications' },
] as const;

export const ABOUT_BIO = [
  'My passion for technology began in college. I started with the basics — HTML, CSS & JavaScript — and discovered the joy of turning ideas into real experiences.',
  'That glowing moment of seeing code come alive in the browser? I never got old.',
] as const;

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    name: 'Core',
    proficiency: 94,
    items: [
      { label: 'Angular (v8-v19)', icon: 'A' },
      { label: 'TypeScript', icon: 'TS' },
      { label: 'RxJS', icon: 'Rx' },
      { label: 'JavaScript', icon: 'JS' },
      { label: 'Single SPA', icon: 'µ' },
    ],
  },
  {
    name: 'UI & Styling',
    proficiency: 91,
    items: [
      { label: 'HTML5', icon: '</>' },
      { label: 'SCSS', icon: 'S' },
      { label: 'LESS', icon: 'L' },
      { label: 'Tailwind CSS', icon: 'T' },
      { label: 'Angular Material', icon: 'M' },
      { label: 'PrimeNG', icon: 'P' },
    ],
  },
  {
    name: 'Testing & Tools',
    proficiency: 88,
    items: [
      { label: 'Jest', icon: 'J' },
      { label: 'Playwright', icon: 'PW' },
      { label: 'Cucumber', icon: 'C' },
      { label: 'Git', icon: 'G' },
      { label: 'SonarQube', icon: 'SQ' },
      { label: 'JIRA', icon: 'JR' },
      { label: 'Webpack', icon: 'W' },
    ],
  },
] as const;

export const CURRENTLY_LEARNING = ['React', 'Three.js', 'OpenSeaDragon'] as const;

export const EXPERIENCE_ITEMS: readonly Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Aira Matrix',
    location: 'Thane, MH',
    dateRange: 'Aug 2025 - Present',
    bullets: [
      'Upgraded the production codebase to Angular 19, improving build performance and ensuring forward compatibility for a team of 8+ engineers.',
      'Resolved 30+ critical SonarQube issues and raised code coverage by roughly 18% through focused quality remediation.',
      'Architecting an in-house component library with 15+ components to reduce delivery time by 25% across product squads.',
      'Working across Angular Material, LESS, OpenSeaDragon, and internal standards to keep UI delivery consistent and maintainable.',
    ],
    stack: ['Angular 19', 'Angular Material', 'LESS', 'OpenSeaDragon', 'SonarQube'],
  },
  {
    title: 'Software Engineer',
    company: 'Vitrana',
    location: 'Noida, UP',
    dateRange: 'Aug 2022 - Mar 2025',
    bullets: [
      'Built configurable intake forms with conditional logic, improving data-collection efficiency by 30%.',
      'Architected drag-and-drop field grouping to cut form setup time by about 35%.',
      'Led migration of 6 modules from Angular 8 to Angular 14, lowering maintenance overhead by 20%.',
      'Built Playwright and Cucumber UI automation suites that reduced manual testing time by 40%.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'PrimeNG', 'SCSS', 'Single SPA'],
  },
  {
    title: 'Angular Developer Intern',
    company: 'Vitrana',
    location: 'Noida, UP',
    dateRange: 'Feb 2022 - Jul 2022',
    bullets: [
      'Built functional prototypes from Figma wireframes for 2 client presentations.',
      'Developed Angular Reactive Forms with complex validation flows, reducing form errors by about 20%.',
      'Recommended targeted performance improvements that improved perceived responsiveness during early UAT.',
    ],
    stack: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
  },
  {
    title: 'Web Development Intern',
    company: 'FULL Creative',
    location: 'Remote',
    dateRange: 'Sep 2021 - Dec 2021',
    bullets: [
      'Delivered 4 responsive websites from scratch using HTML, CSS, and JavaScript.',
      'Created and tested 4 HTML email templates for consistent rendering across Gmail, Outlook, and Apple Mail.',
      'Built with a strong focus on cross-browser support, layout quality, and production readiness.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
] as const;

export const IMPACT_METRICS = [
  { value: '30%', label: 'Better data collection efficiency', icon: '📊' },
  { value: '40%', label: 'Less manual testing time', icon: '🤖' },
  { value: '20%', label: 'Reduced code maintenance efforts', icon: '🧹' },
  { value: '18%', label: 'Increase in code coverage score', icon: '✅' },
] as const;

export const BEYOND_ITEMS = [
  { icon: '📷', label: 'Photography' },
  { icon: '🎵', label: 'Music' },
  { icon: '🎨', label: 'Design' },
  { icon: '🌿', label: 'Exploring' },
] as const;

export const FEATURED_PROJECTS: readonly Project[] = [
  {
    id: 'autocrypto-v3',
    name: 'AutoCrypto v3',
    description: 'Real-time crypto dashboard with live price charts and portfolio tracking.',
    category: 'Angular',
    techStack: ['Angular', 'TypeScript', 'Chart.js', 'RxJS'],
    live: { label: 'Live Demo', url: 'https://virtualsingh.github.io/autocrypto-v3' },
    repository: { label: 'GitHub', url: 'https://github.com/virtualsingh/autocrypto-v3' },
    imagePath: '/portfolio-v3/trails.jpg',
    status: 'Featured',
  },
  {
    id: 'portfolio-v3',
    name: 'Portfolio v3',
    description: 'Personal portfolio with smooth animations and a fully responsive layout.',
    category: 'JavaScript',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    live: { label: 'Live Demo', url: 'https://virtualsingh.github.io/portfolio-v3' },
    repository: { label: 'GitHub', url: 'https://github.com/virtualsingh/portfolio-v3' },
    imagePath: '/portfolio-v3/hop-1.jpg',
    status: 'Featured',
  },
  {
    id: 'exploring-learning',
    name: 'Exploring & Learning',
    description: 'React, Three.js, OpenSeaDragon and more exciting tech.',
    category: 'Angular',
    techStack: ['React', 'Three.js', 'OpenSeaDragon'],
    status: 'In Progress',
  },
] as const;

export const META_TITLES: Record<string, string> = {
  hero: 'Pushpendra Singh | Senior Angular Frontend Developer',
  about: 'About | Pushpendra Singh',
  skills: 'Technical Skills | Pushpendra Singh',
  journey: 'My Journey | Pushpendra Singh',
  experience: 'Experience | Pushpendra Singh',
  impact: 'Impact | Pushpendra Singh',
  projects: 'Projects | Pushpendra Singh',
  beyond: 'Beyond the Code | Pushpendra Singh',
  future: "What's Next | Pushpendra Singh",
  contact: 'Contact | Pushpendra Singh',
};
