import type { ImageMetadata } from "astro";
// PLACEHOLDER images — replace with real 400×500 thumbnails and ~1000×873 screenshots
import demo1Thumb from '../assets/projects/thumbnail/demo-1.jpg';
import demo1Img1 from '../assets/projects/images/demo-1-1.png';
import demo1Img2 from '../assets/projects/images/demo-1-2.png';
import demo2Thumb from '../assets/projects/thumbnail/demo-2.jpg';
import demo2Img1 from '../assets/projects/images/demo-2-1.png';
import demo2Img2 from '../assets/projects/images/demo-2-2.png';
import demo3Thumb from '../assets/projects/thumbnail/demo-3.jpg';
import demo3Img1 from '../assets/projects/images/demo-3-1.png';
import demo3Img2 from '../assets/projects/images/demo-3-2.png';
import demo4Thumb from '../assets/projects/thumbnail/demo-4.jpg';
import demo4Img1 from '../assets/projects/images/demo-4-1.png';
import demo4Img2 from '../assets/projects/images/demo-4-2.png';

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

// PLACEHOLDER entries — 4–8 real projects, list order = display order
export const PROJECTS: Project[] = [
  {
    title: "TODO Project One",
    slug: "demo-1",
    year: 2025,
    description: "TODO one paragraph on what the project is.<br/><ul><li>TODO key feature</li><li>TODO key feature</li></ul>",
    role: "TODO what you owned: frontend, API, infra…",
    techStack: ["Next.JS", "TypeScript", "PostgreSQL", "Docker"],
    thumbnail: demo1Thumb,
    images: [demo1Img1, demo1Img2],
    liveUrl: "https://example.com",
    sourceCode: "https://github.com/salmanghauri7",
  },
  {
    title: "TODO Project Two",
    slug: "demo-2",
    year: 2024,
    description: "TODO one paragraph on what the project is.<br/><ul><li>TODO key feature</li><li>TODO key feature</li></ul>",
    role: "TODO what you owned: frontend, API, infra…",
    techStack: ["React.JS", "Node.JS", "MongoDB"],
    thumbnail: demo2Thumb,
    images: [demo2Img1, demo2Img2],
    liveUrl: "https://example.com",
    sourceCode: "https://github.com/salmanghauri7",
  },
  {
    title: "TODO Project Three",
    slug: "demo-3",
    year: 2023,
    description: "TODO one paragraph on what the project is.<br/><ul><li>TODO key feature</li><li>TODO key feature</li></ul>",
    role: "TODO what you owned: frontend, API, infra…",
    techStack: ["FastAPI", "React.JS", "PostgreSQL", "AWS"],
    thumbnail: demo3Thumb,
    images: [demo3Img1, demo3Img2],
    liveUrl: "https://example.com",
    sourceCode: "https://github.com/salmanghauri7",
  },
  {
    title: "TODO Project Four",
    slug: "demo-4",
    year: 2022,
    description: "TODO one paragraph on what the project is.<br/><ul><li>TODO key feature</li><li>TODO key feature</li></ul>",
    role: "TODO what you owned: frontend, API, infra…",
    techStack: ["Astro", "TypeScript", "GSAP"],
    thumbnail: demo4Thumb,
    images: [demo4Img1, demo4Img2],
    liveUrl: "https://example.com",
    sourceCode: "https://github.com/salmanghauri7",
  },
];
