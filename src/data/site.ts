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

// TODO: swap `dp` for real thumbnails/screens once they land in src/assets/projects/{thumbnail,images}
export const PROJECTS: Project[] = [
  // 4–8 entries, list order = display order
  {
    title: "Glaido",
    slug: "glaido",
    year: 2025,
    description:
      "AI-powered voice transcription desktop app for macOS. Speak, and it types for you, with agentic productivity workflows triggered by voice commands.<br/><br/><ul><li>Real-time audio streaming over WebSockets with SpeexDSP resampling, VAD and denoising, so transcription stays accurate in noisy rooms.</li><li>OpenAI Whisper (deployed on Baseten) for fast, accurate speech-to-text.</li><li>Persistent recording, custom dictionary and text snippets.</li><li>Companion web app for account and extended functionality.</li></ul>",
    role:
      "Built the Electron.js desktop app end to end, engineered the audio pipeline, and designed the Node.js / Express.js backend with Supabase for auth and data.",
    techStack: ["Electron.js", "Node.js", "Supabase", "Express.js", "WebSockets", "OpenAI Whisper", "SpeexDSP"],
    thumbnail: dp,
    images: [],
    liveUrl: "https://glaido.com/",
  },
  {
    title: "ResearchZone",
    slug: "researchzone",
    year: 2026,
    description:
      "Collaborative research platform (final year project). Workspaces with real-time chat, shared paper bookmarking and in-app paper discovery via the arXiv API.<br/><br/><ul><li>RAG microservice in FastAPI handling embeddings, vector search and LLM calls, with summarisation and indexing offloaded to ARQ workers to cut retrieval latency.</li><li>AI-powered 'chat with paper' for contextual querying over research documents.</li><li>Backend on AWS EC2 via Docker with Parameter Store for config, private S3 assets served through CloudFront, AI service on Hugging Face Spaces.</li></ul>",
    role:
      "Full-stack: Next.js frontend, Node.js API with Socket.IO and MongoDB, FastAPI RAG service, and the AWS deployment.",
    techStack: ["Next.js", "Node.js", "FastAPI", "Socket.IO", "MongoDB", "ARQ", "AWS", "Docker", "Hugging Face Spaces"],
    thumbnail: dp,
    images: [],
    liveUrl: "https://research-zone-frontend.vercel.app",
  },
  {
    title: "FairGig",
    slug: "fairgig",
    year: 2025, // TODO confirm hackathon year
    description:
      "Gig worker income and rights platform, built in a 24-hour hackathon. Tracks earnings across multiple gig platforms with role-based dashboards for workers, verifiers and analysts.<br/><br/><ul><li>Statistical anomaly detection service (FastAPI) that flags unusual deductions, sudden income drops and commission discrepancies.</li><li>Secure screenshot verification flow and a print-friendly certificate engine that renders verified income reports for banks and landlords.</li><li>Async grievance-tracking microservice in Node.js that logs, tags and clusters complaints, with anonymised city-wide medians to protect worker privacy.</li></ul>",
    role:
      "Architected the anomaly detection service, the verification and certificate flows, and the grievance microservice.",
    techStack: ["React", "Node.js", "FastAPI"],
    thumbnail: dp,
    images: [],
    sourceCode: "https://github.com/MZeeCoder/fairgig",
  },
];
