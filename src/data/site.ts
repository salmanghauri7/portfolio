import type { ImageMetadata } from "astro";
import dp from "../assets/dp.jpg";

export const GENERAL_INFO = {
  name: "Muhammad Salman",
  preloaderName: "SALMAN", // uppercase, 4–10 letters, shown letter by letter in the preloader
  email: "hello.salman@gmail.com",
  ctaUrl: "mailto:hello.salman@gmail.com", // "Let's Talk" target (Upwork, Calendly, mailto…)
  repoUrl: "", // optional: public GitHub repo of THIS site, links the "Built by" credit
  siteUrl: "https://TODO",
};

export const SOCIAL_LINKS = [
  // shown in drawer, order preserved
  { name: "github", url: "https://github.com/salmanghauri7" },
  { name: "linkedin", url: "https://linkedin.com/in/msalmanghauri" },
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
    "Hi! I'm {name}. A creative Full Stack Developer with 1+ years of experience in building high-performance, scalable, highly optimized applications.", // TODO — {name} is bold foreground
  ctaLabel: "Let's Talk",
  photo: dp, // portrait shown in the hero
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
  greeting: "Hi, I'm {name}.",
  paragraphs: ["TODO paragraph 1", "TODO paragraph 2"],
};

// object key = category label, rendered uppercase
export const MY_STACK: Record<string, { name: string; icon: string }[]> = {
  languages: [
    { name: "JavaScript", icon: "/logo/javascript.svg" },
    { name: "Typescript", icon: "/logo/typescript.svg" },
    { name: "C++", icon: "/logo/cpp.svg" },
  ],
  frontend: [
    { name: "JavaScript", icon: "/logo/javascript.svg" },
    { name: "Typescript", icon: "/logo/typescript.svg" },
    { name: "Electron.JS", icon: "/logo/electron.svg" },
    { name: "React.JS", icon: "/logo/react.svg" },
    { name: "Next.JS", icon: "/logo/nextjs.png" },
    { name: "Astro", icon: "/logo/astro.svg" },
    { name: "Redux", icon: "/logo/redux.svg" },
    {name: "Tailwind", icon: "/logo/tailwind.svg"},
  ],
  backend: [
    { name: "Node.JS", icon: "/logo/nodejs.svg" },
    { name: "Express.JS", icon: "/logo/express.png" },
    { name: "Fast Api", icon: "/logo/fastapi.svg" },
    { name: "BullMQ", icon: "/logo/bullmq.svg" },
    { name: "Socket.IO", icon: "/logo/socketio.svg" },
    { name: "Zod", icon: "/logo/zod.svg" },
  ],
  database: [
    { name: "MongoDb", icon: "/logo/mongodb.svg" },
    { name: "PostgreSQL", icon: "/logo/postgresql.svg" },
    { name: "Supabase", icon: "/logo/supabase.svg" },
  ],
  tools: [{name: "Git", icon: "/logo/git.svg"},
    {name: "AWS", icon: "/logo/aws.svg"},
    {name: "Vercel", icon: "/logo/vercel.svg"},
    {name: "Docker", icon: "/logo/docker.svg"},
    {name: "VS Code", icon: "/logo/vscode.svg"},
  ],
  "ai/ml": [
    { name: "Machine Learning", icon: "/logo/ml.svg" },
    { name: "Data Cleaning", icon: "/logo/data-cleaning.svg" },
    { name: "Feature Engineering", icon: "/logo/feature-engineering.svg" },
    { name: "RAG", icon: "/logo/rag.svg" },
    { name: "NumPy", icon: "/logo/numpy.svg" },
    { name: "Pandas", icon: "/logo/pandas.svg" },
    { name: "Matplotlib", icon: "/logo/matplotlib.svg" },
    { name: "Scikit-Learn", icon: "/logo/scikitlearn.svg" },
  ],
};

export const MY_EXPERIENCE = [
  // newest first; rendered as the timeline
  {
    title: "Full Stack Developer",
    company: "Nasmak Labs",
    duration: "April 2026 - Present",
    summary: "TODO optional one or two lines on what you owned there",
  },
   {
    title: "Full Stack Developer",
    company: "InvexTech",
    duration: "June 2025 - April 2026",
    summary: "TODO optional one or two lines on what you owned there",
  },
];

export const MY_EDUCATION = [
  // newest first
  {
    degree: "BS Computer Science",
    school: "University Of Okara",
    duration: "2022 - 2026",
    marks: "3.8",
    totalMarks: "4"
  },
  {
    degree: "FSc",
    school: "Aspire College Okara",
    duration: "2019 - 2021",
    marks: "976",
    totalMarks: "1100"
  },
  {
    degree: "Matric",
    school: "Govt. MC High School Okara",
    duration: "2017 - 2019",
    marks: "1050",
    totalMarks: "1100"
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
