import type { ImageMetadata } from "astro";

export const GENERAL_INFO = {
  name: "Muhammad Salman",
  preloaderName: "SALMAN", // uppercase, 4–10 letters, shown letter by letter in the preloader
  email: "hello.salman@gmail.com",
  ctaUrl: "mailto:hello.salman@gmail.com", // "Let's Talk" target (Upwork, Calendly, mailto…)
  repoUrl: "", // optional: public GitHub repo of THIS site, enables star/fork counts in footer
  siteUrl: "https://TODO",
};

export const SOCIAL_LINKS = [
  // shown in drawer, order preserved
  { name: "github", url: "https://github.com/salmanghauri7" },
  { name: "linkedin", url: "https://linkedin.com/in/msalmanghauri" },
  { name: "Muhammad Salman", url: "hello.salman@gmail.com" },
];

export const MENU_LINKS = [
  // dot colours --dot-1..5 map by index
  { name: "Home", url: "/" },
  { name: "About Me", url: "/#about-me" },
  { name: "Experience", url: "/#my-experience" },
  { name: "Education", url: "/#education" },
  { name: "Projects", url: "/#selected-projects" },
];

export const HERO = {
  titleLine1: "FULL STACK", // rendered in --primary (amber)
  titleLine2: "DEVELOPER", // rendered in foreground, indented 16px
  intro:
    "Hi! I'm {name}. A creative Frontend Developer with 3+ years of experience in building high-performance, scalable, and responsive web solutions.", // TODO — {name} is bold foreground
  ctaLabel: "Let's Talk",
  availability: "Available for full-time opportunities", // TODO or ''
  stats: [
    // exactly three
    { value: "1+", label: "Years of Experience" },
    { value: "4+", label: "Completed Projects" },
    { value: "10K+", label: "Hours Worked" },
  ],
};

export const ABOUT = {
  statement:
    "I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users.", // TODO, 2–4 lines at 60px
  label: "This is me.",
  greeting: "Hi, I'm Salman.",
  paragraphs: ["TODO paragraph 1", "TODO paragraph 2"],
};

// object key = category label, rendered uppercase
export const MY_STACK: Record<string, { name: string; icon: string }[]> = {
  frontend: [
    { name: "JavaScript", icon: "/logo/javascript.svg" },
    { name: "Typescript", icon: "/logo/typescript.svg" },
    { name: "React.JS", icon: "/logo/react.svg" },
    { name: 'Next.JS', icon: '/logo/nextjs.svg' },
    { name: '', icon: '/logo/javascript.svg' }
  ],
  backend: [],
  database: [],
  tools: [],
};

export const MY_EXPERIENCE = [
  // newest first; rendered as the timeline
  {
    title: "TODO Job Title",
    company: "TODO Company",
    duration: "Jan 2024 - Present",
    summary: "TODO optional one or two lines on what you owned there",
  },
];

export const MY_EDUCATION = [
  // newest first
  {
    degree: "TODO BSc Computer Science",
    school: "TODO University",
    duration: "2018 - 2022",
    detail: "TODO optional: focus, thesis, honours",
  },
];

export interface Project {
  title: string;
  slug: string;
  year: number;
  description: string; // HTML string, may contain <ul><li>, <br/>
  role: string; // HTML string
  techStack: string[]; // first 3 shown in list
  thumbnail: ImageMetadata; // import from src/assets
  images: ImageMetadata[];
  liveUrl?: string;
  sourceCode?: string;
}

export const PROJECTS: Project[] = []; // 4–8 entries, list order = display order
