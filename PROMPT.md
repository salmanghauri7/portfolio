# SUPERPROMPT — Rebuild tajmirul.site as an Astro portfolio, with deliberate departures

## 0. What to build and the reference boundary

Build a personal developer portfolio that is a **structural and motion-faithful recreation** of https://www.tajmirul.site/ with **four deliberate departures**, so the result is clearly its own site and not a clone:

1. **Colour palette** — ink + amber instead of grey + neon green (§4.1).
2. **Background** — a fixed dot-grid backdrop with scroll parallax instead of the drifting particle field (§5.4).
3. **Experience** — a vertical timeline with a self-filling rail instead of a flat list (§6.4).
4. **Education** — a new section between Experience and Projects (§6.5).

Everything else — layout, typography, section order, every animation, every timing value and every quirk listed below — is kept as specified. Replace only the **content** (name, copy, stats, stack, experience, education, projects, images, links) with the values in `src/data/site.ts`.

Reference evidence: 69-second screen recording at 1920×1080, 60 fps, desktop Chrome. Timeline of the recording, for pacing:

| Seconds | What is on screen |
|---|---|
| 0–8 | Hero idle. Chevron arrow draws itself at ~3 s and ~7 s, drops, restarts. Particles drift. |
| 8–13 | Scroll. Hero content slides up and fades out; About statement slides up and fades in, staggered. |
| 13–24 | About section fully visible, then slides up and fades out as it leaves. |
| 24–40 | Stack section. Category labels and items pop in **one by one** tied to scroll position (scrubbed stagger). |
| 40–46 | Experience list fades in staggered, then slides up and fades out. |
| 46–61 | Projects list. Hovering a title: title wipes green left→right, external-link icon draws itself, a 3:4 thumbnail follows the cursor vertically on the right edge, other titles dim to 30%. |
| 61–64 | Footer: "Have a project in mind?", email, credit with star and fork counts. |
| 64–67 | Hamburger → X, right drawer slides in with a circular grey reveal, page dims to 70% black. |
| 67–69 | Drawer closes, back to project hover. |

The table describes the **original**. In the rebuild, where it says particles drift you will see the grid backdrop (§5.4), and the 40–46 s experience beat becomes the timeline (§6.4) followed by Education (§6.5). All other rows apply unchanged.

The original site is Next.js 15 + Tailwind + GSAP 3.12 + Lenis 1.1 + @gsap/react. **Rebuild target is Astro 5, static output, plain CSS with custom properties, GSAP 3 (core + ScrollTrigger), Lenis. No React, no Tailwind, no Framer Motion.**

---

## 1. Stack and project structure

```
package.json deps: astro, gsap, lenis, @fontsource/anton, @fontsource-variable/roboto-flex
astro.config.mjs: output 'static', site '<your-domain>'

src/
  data/site.ts                  # ALL content lives here (see §3)
  styles/global.css             # tokens, reset, fonts, utilities
  lib/motion.ts                 # registers ScrollTrigger once, creates Lenis, exports { gsap, ScrollTrigger, lenis, mm }
  layouts/Base.astro            # <head>, fonts, global.css, Curtain, Preloader, Nav, <slot/>, Footer, Cursor, ScrollProgress, Backdrop, StickyEmail, motion init script
  components/
    Curtain.astro               # page-transition sheets
    Preloader.astro
    Nav.astro                   # hamburger + overlay + drawer
    Footer.astro
    Cursor.astro
    ScrollProgress.astro
    Backdrop.astro              # fixed dot-grid, replaces the original's particle field
    StickyEmail.astro
    SectionTitle.astro          # spinning flower icon + uppercase label
    Button.astro                # primary button with white blob hover fill
    ChevronArrow.astro          # self-drawing chevron used in hero and project page
    home/Hero.astro
    home/About.astro
    home/Stack.astro
    home/Experience.astro       # vertical timeline
    home/Education.astro        # new section
    home/Projects.astro
  pages/index.astro             # Hero, About, Stack, Experience, Education, Projects (in this order)
  pages/projects/[slug].astro   # getStaticPaths from PROJECTS
  assets/projects/thumbnail/<slug>.jpg      # 400×500 (3:4)
  assets/projects/images/<slug>-N.png       # ~1000×873 or wider, shown at 750:400
public/
  logo/<tech>.svg|png           # 40×40 rendering, source files ~58×56
  icons/section-flower.svg      # copy from repo: components/icons/svgs/section-flower.svg (viewBox 0 0 25 29)
  favicon.svg, og.png
```

Rules:
- Each `.astro` component that animates owns one `<script>` block that imports from `src/lib/motion.ts`. Scripts run once per full page load; there is no client-side router, so no re-init logic is needed.
- Every tween that moves things is registered inside `mm.add('(prefers-reduced-motion: no-preference)', …)` (GSAP `matchMedia`). Use `from` tweens for reveals so the no-JS and reduced-motion states are the final, visible state.
- Navigation between pages is a full page load wrapped in the Curtain animation (§5.8). This replaces Next's `template.tsx` + `TransitionLink`.
- Data files only. No CMS, no markdown collections.

---

## 2. Asset map

| Asset | Path | Status |
|---|---|---|
| Anton 400 | `@fontsource/anton` | install |
| Roboto Flex variable (use weights 100, 400, 500) | `@fontsource-variable/roboto-flex` | install |
| Section flower icon (8-petal asterisk, 25×29) | `public/icons/section-flower.svg` | copy from repo, MIT |
| Custom cursor arrow | inline SVG, path in §5.3 | included below |
| Hero chevron | inline SVG, paths in §6.1 | included below |
| External-link icon (3 paths) | inline SVG, paths in §6.6 | included below |
| Star, fork, arrow-left, move-up-right icons | inline SVG from Lucide (ISC) | copy from lucide.dev |
| Tech logos, one per stack item | `public/logo/<name>.svg` | PLACEHOLDER — supply your own (simple-icons or devicon) |
| Project thumbnails, 400×500 | `src/assets/projects/thumbnail/<slug>.jpg` | PLACEHOLDER — one per project |
| Project detail images, 750:400 crop | `src/assets/projects/images/<slug>-N.png` | PLACEHOLDER — 2 to 5 per project |
| Favicon, OG image 1200×630 | `public/` | PLACEHOLDER |

No AI-generated imagery is needed. No video. No WebGL.

---

## 3. Content model — `src/data/site.ts`

Every string marked `TODO` is a placeholder to be replaced with the owner's real content. Keep the shapes.

```ts
export const GENERAL_INFO = {
  name: 'TODO Full Name',
  preloaderName: 'TODO',            // uppercase, 4–10 letters, shown letter by letter in the preloader
  email: 'todo@example.com',
  ctaUrl: 'https://TODO',           // "Let's Talk" target (Upwork, Calendly, mailto…)
  repoUrl: '',                      // optional: public GitHub repo of THIS site, enables star/fork counts in footer
  siteUrl: 'https://TODO',
};

export const SOCIAL_LINKS = [        // shown in drawer, order preserved
  { name: 'github',   url: 'https://github.com/TODO' },
  { name: 'linkedin', url: 'https://linkedin.com/in/TODO' },
  { name: 'TODO',     url: 'https://TODO' },
];

export const MENU_LINKS = [          // dot colours in §5.7 map by index
  { name: 'Home',       url: '/' },
  { name: 'About Me',   url: '/#about-me' },
  { name: 'Experience', url: '/#my-experience' },
  { name: 'Education',  url: '/#education' },
  { name: 'Projects',   url: '/#selected-projects' },
];

export const HERO = {
  titleLine1: 'FRONTEND',            // rendered in --primary (amber)
  titleLine2: 'DEVELOPER',           // rendered in foreground, indented 16px
  intro: 'Hi! I\'m {name}. A creative Frontend Developer with 3+ years of experience in building high-performance, scalable, and responsive web solutions.',  // TODO — {name} is bold foreground
  ctaLabel: "Let's Talk",
  availability: 'Available for full-time opportunities',   // TODO or ''
  stats: [                           // exactly three
    { value: '3+',   label: 'Years of Experience' },
    { value: '7+',   label: 'Completed Projects' },
    { value: '10K+', label: 'Hours Worked' },
  ],
};

export const ABOUT = {
  statement: 'I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users.',  // TODO, 2–4 lines at 60px
  label: 'This is me.',
  greeting: "Hi, I'm {name}.",
  paragraphs: ['TODO paragraph 1', 'TODO paragraph 2'],
};

export const MY_STACK: Record<string, { name: string; icon: string }[]> = {
  frontend: [{ name: 'JavaScript', icon: '/logo/js.svg' } /* … */],
  backend:  [],
  database: [],
  tools:    [],
};                                    // object key = category label, rendered uppercase

export const MY_EXPERIENCE = [       // newest first; rendered as the timeline in §6.4
  { title: 'TODO Job Title', company: 'TODO Company', duration: 'Jan 2024 - Present', summary: 'TODO optional one or two lines on what you owned there' },
];

export const MY_EDUCATION = [        // newest first; rendered in §6.5
  { degree: 'TODO BSc Computer Science', school: 'TODO University', duration: '2018 - 2022', detail: 'TODO optional: focus, thesis, honours' },
];

export interface Project {
  title: string; slug: string; year: number;
  description: string;                // HTML string, may contain <ul><li>, <br/>
  role: string;                       // HTML string
  techStack: string[];                // first 3 shown in list
  thumbnail: ImageMetadata;           // import from src/assets
  images: ImageMetadata[];
  liveUrl?: string; sourceCode?: string;
}
export const PROJECTS: Project[] = [];   // 4–8 entries, list order = display order
```

---

## 4. Global design language

### 4.1 Colour tokens (single dark theme, no light mode)

**Departure from the original.** The reference is neutral grey + neon green. This build is a cool ink ground with a warm off-white and an amber accent. Same roles, same number of tokens, different hues — every rule below that says "green" means `--primary`.

```css
:root {
  --bg:          hsl(230 16% 8%);         /* #111218 ink page background        */
  --bg-light:    hsl(230 14% 14%);        /* #1F2029 drawer, curtain, tracks    */
  --fg:          hsl(40 25% 92%);         /* #F0ECE6 warm off-white text        */
  --muted-fg:    hsl(230 10% 66%);        /* #A0A2B1 secondary text             */
  --primary:     hsl(36 100% 58%);        /* #FFA929 amber accent               */
  --primary-fg:  hsl(230 16% 8%);         /* text on amber                      */
  --border:      hsl(230 10% 20%);        /* #2E3038 hairlines, timeline rail   */
  --grid-dot:    hsl(230 10% 24%);        /* backdrop dots (§5.4)               */
  --chevron:     hsl(230 10% 22%);        /* hero chevron stroke                */
  --chevron-fill:#F0ECE608;               /* faint warm fill after the draw     */
  --overlay:     hsl(230 16% 4% / .7);
  --dot-1: hsl(36 100% 58%);  --dot-2: hsl(200 90% 60%);  --dot-3: hsl(160 60% 50%);
  --dot-4: hsl(350 80% 65%);  --dot-5: hsl(260 70% 68%);  /* menu dots, one per MENU_LINKS entry */
}
body { background: var(--bg); color: var(--fg); -webkit-font-smoothing: antialiased; }
```

Contrast on `--bg`: `--fg` ≈ 17:1, `--muted-fg` ≈ 7.4:1, `--primary` ≈ 9.7:1 (all pass AA, amber also for body size). Do not "warm up" the background further or push the accent toward orange-red; the pairing is ink/amber, not brown/orange.

### 4.2 Typography

- Display: **Anton 400**, uppercase where noted, `line-height: 1` unless noted.
- Body: **Roboto Flex**. Default weight 400. The About statement uses weight **100**. Name inside hero intro uses 500.
- Scale (px / line-height): 80/0.95 hero h1 (60 below 640px) · 60/1 about statement (36 below 768px) · 48/1 section big labels and timeline titles (36 below 640px) · 36/1 education degrees (28 below 640px) · 60/1 project titles (36 below 420px) · 40/1 preloader-free stat numbers are 36 (30 below 640) · 36/40 footer email (30 below 640) · 24/32 stack item names · 20/28 section titles and company names · 18/28 body-large · 16/24 default · 14/20 small · 12/16 tech tags.
- Letter-spacing: buttons `0.1em`; sticky email `1px`; everything else 0.

### 4.3 Layout

- Container: `max-width: 1148px; margin-inline: auto; padding-inline: 16px`.
- Section rhythm: `--section: 250px`. About uses padding-bottom 250; Experience padding-block 250; Education padding-bottom 250; Projects padding-bottom 250; Stack has none (it sits inside About's bottom padding); Hero is 100svh.
- Breakpoints: xs 420, sm 640, md 768, lg 1024, xl 1280.
- Grid gap default 25px.

### 4.4 Fixed layers (z-index)

| z | Element |
|---|---|
| 0 | Backdrop grid (fixed, full screen, pointer-events none) |
| auto | Page content |
| 2 | Drawer overlay |
| 3 | Drawer |
| 4 | Hamburger wrapper (sticky top 0) |
| 5 | Curtain |
| 6 | Preloader |
| 50 | Custom cursor |

### 4.5 Scrollbar and cursor

- Native scrollbar hidden: `::-webkit-scrollbar { display: none }` and `scrollbar-width: none` on html. The ScrollProgress pill (§5.5) replaces it.
- `@media (pointer: fine) and (min-width: 768px) { * { cursor: none !important } }` — the custom cursor replaces the system cursor.

---

## 5. Global systems

### 5.1 `src/lib/motion.ts`

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
export const mm = gsap.matchMedia();
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, duration: 1.4, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
export { gsap, ScrollTrigger };
```

Lenis values are the originals: `lerp 0.1`, `duration 1.4`. Under reduced motion Lenis is not created and native scrolling is used; ScrollTrigger still works but no tween is registered.

### 5.2 Preloader (`Preloader.astro`)

- Runs only on the first page load of a session: `if (sessionStorage.getItem('preloaded')) remove(); else run(); sessionStorage.setItem('preloaded','1')`.
- DOM: `div.preloader` fixed inset 0, z 6, `display:flex`. Ten children `div.preloader-item`, each `height:100%; width:10%; background:#000`. A `p.name-text` absolutely centred (`top:50%; left:50%; translate(-50%,-50%)`), Anton, `font-size: 20vw` (200px from 1024px), `line-height:1`, `overflow:hidden`, `display:flex`; one `span` per letter of `preloaderName`, each `display:inline-block; transform: translateY(100%)`.
- Timeline, `defaults: { ease: 'power1.inOut' }`:
  1. `.name-text span` → `y: 0`, `stagger: 0.05`, `duration: 0.2`
  2. `.preloader-item` → `y: '100%'`, `delay: 1`, `duration: 0.5`, `stagger: 0.1` (columns fall away left to right)
  3. at `'<0.5'`: `.name-text span` → `autoAlpha: 0`
  4. at `'<1'`: `.preloader` → `autoAlpha: 0`, then remove from DOM.
- Reduced motion: remove immediately. `<noscript>` rule hides `.preloader` and `.curtain`.

### 5.3 Custom cursor (`Cursor.astro`)

- `svg#cursor` 27×30, `viewBox 0 0 27 30`, fixed top 0 left 0, z 50, `pointer-events:none`, initial `opacity:0`, hidden below 768px. Single path, `fill: var(--fg)`, `stroke: hsl(0 0% 13% / .5)`, `stroke-width: 2`:
  `M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z`
- On `mousemove` (only when `(pointer:fine) and (min-width:768px)` and not reduced motion): `gsap.to(cursor, { x: clientX, y: clientY, ease: 'power2.out', duration: 0.25, opacity: 1 })`. **Quirk to keep:** the SVG is not offset by −50%, so its top-left corner sits at the pointer, exactly like the original.
- No hover-state scaling. The cursor never changes shape.

### 5.4 Backdrop (`Backdrop.astro`) — departure from the original

Replaces the original's 100 drifting particle `div`s with a CSS dot grid that parallaxes with scroll. Two elements, no GSAP.

- `div.backdrop` fixed inset 0, z 0, `pointer-events:none; overflow:hidden`. Mask so the grid fades out at the top and bottom edges of the viewport and never collides with the burger or footer: `mask-image: linear-gradient(transparent, #000 12%, #000 78%, transparent)` (plus `-webkit-mask-image`).
- Child `div.backdrop-grid` `position:absolute; inset:-32px 0 0 0` (one extra tile above the viewport so the loop below never shows a gap), `background-image: radial-gradient(circle, var(--grid-dot) 1px, transparent 1.5px); background-size: 32px 32px; will-change: transform`.
- Parallax, one listener in the component script, only inside `mm.add('(prefers-reduced-motion: no-preference)', …)`:
```
lenis?.on('scroll', e => { grid.style.transform = `translateY(${-(e.scroll * 0.15) % 32}px)`; });
```
  The grid moves at 0.15× scroll speed; the modulo keeps the shift inside one tile so it loops seamlessly. No resize handling needed.
- Reduced motion (Lenis is not created, `lenis` is `null`): the grid renders static. Nothing else changes.
- Do not add a radial "spotlight" mask at the centre, a second gradient layer, noise, or animated dot sizes. It is a flat, quiet grid.

### 5.5 Scroll progress (`ScrollProgress.astro`)

- Track: fixed, `top: 50svh; right: 2%; translateY(-50%)`, `width: 6px; height: 100px; border-radius: 9999px; background: var(--bg-light); overflow: hidden`.
- Fill: `width:100%; height:100%; background: var(--primary); border-radius: 9999px`, `transform: translateY(-(100 - progress)%)` so it fills top→bottom.
- Drive it from `lenis.on('scroll', e => …)` with `e.progress`; under reduced motion use a native `scroll` listener with `scrollY / (scrollHeight - innerHeight)`.

### 5.6 Sticky email (`StickyEmail.astro`)

- Hidden below 1280px. Fixed `bottom: 128px; left: 0`. `a[href=mailto:]` with `writing-mode: vertical-rl; text-orientation: mixed; padding-inline: 12px; letter-spacing: 1px; color: var(--muted-fg)`; hover `color: var(--fg)`, `transition: all .15s`.

### 5.7 Navbar and drawer (`Nav.astro`)

- Wrapper `div` `position: sticky; top: 0; z-index: 4; height: 0`. Inside, `button.burger` 48×48, `position:absolute; top:20px; right:20px` (right 40px from 768px). Two `span` bars: `width:60%; height:2px; background: var(--fg); border-radius:9999px; position:absolute; left:50%; top:50%; transform: translate(-50%, ±5px)`; `transition: transform .3s`. Hover (closed): top bar `rotate(12deg)`, bottom `rotate(-12deg)`. Open: top `translate(-50%,-50%) rotate(45deg)`, bottom `translate(-50%,-50%) rotate(-45deg)` → an X.
- Overlay: fixed inset 0, z 2, `background: var(--overlay)`, `transition: opacity .15s, visibility .15s`; closed = `opacity:0; visibility:hidden; pointer-events:none`. Click closes.
- Drawer: fixed `top:0; right:0; height:100dvh; width:500px; max-width: calc(100vw - 3rem)`, z 3, `transform: translateX(100%)`, `transition: transform .7s`, `overflow:hidden`, `display:flex; flex-direction:column; padding-block:40px; row-gap:56px`; from 1024px `justify-content:center`. Open = `translateX(0)`.
- Drawer background shape: a child `div` `position:fixed; inset:0; z-index:-1; border-radius:50%; background: var(--bg-light); transform: scale(1.5) translateX(50%); transition: transform .7s .15s`. Open = `scale(1.5) translateX(0)`. This makes the grey panel enter as a huge circle whose curved left edge sweeps in slightly after the panel.
- Content block: `flex-grow:1; display:flex; align-items:center (from 768px); width:100%; max-width:300px; margin-inline: 32px` (auto from 640px). Inside, two columns (`display:flex; gap:40px`; stacked below 1024px with SOCIAL second):
  - **SOCIAL**: label `color: var(--muted-fg); margin-bottom: 20px` (32px from 768px), uppercase. List `row-gap:12px`, links 18px, `text-transform: capitalize`, hover underline, `target=_blank`.
  - **MENU**: same label. Items 20px, `display:flex; align-items:center; gap:12px`. Before each: a 14px circle, colours `--dot-1..5` by index, `display:flex; align-items:center; justify-content:center; transition: all .15s`; inside it an 8px Lucide `move-up-right` icon at `scale(0)`. Hover: circle `scale(2)`, icon `scale(1)`. Clicking an item closes the drawer and follows the anchor (Lenis `anchors:true` smooth-scrolls same-page hashes).
- Bottom block (same width rules): label **GET IN TOUCH** muted, `margin-bottom:16px`, then the email as a mailto link.
- Escape key closes. Focus moves into the drawer when opened and returns to the burger when closed. `aria-expanded` on the burger, `aria-hidden` on the drawer when closed.

### 5.8 Curtain page transition (`Curtain.astro`)

- `div.curtain` fixed inset 0, `background: var(--bg-light)`, z 5. Child `div.curtain-inner` fixed inset 0, `background: var(--primary)`, `transform: translateY(100%)`.
- **On every page load** (after `DOMContentLoaded`): timeline → `.curtain-inner { yPercent: 0, duration: 0.2 }` → `.curtain-inner { yPercent: -100, duration: 0.2 }` → `.curtain { yPercent: -100 }` (default 0.5 s). Then `visibility:hidden`. Visual result: an amber sheet sweeps up through the grey cover, then the grey cover lifts off, revealing the page.
- **On click of any `a[data-transition]`** (project list items, Back link): `preventDefault()`; `gsap.set('.curtain', { yPercent: 100 }); gsap.set('.curtain-inner', { yPercent: 100 })`; `gsap.to('.curtain', { yPercent: 0, duration: 0.3 })`; on complete `location.assign(href)`. Grey rises from the bottom, page unloads, next page starts covered.
- Reduced motion: `gsap.set` the curtain straight to hidden; links navigate immediately.

### 5.9 `SectionTitle.astro`

`div` `display:flex; align-items:center; gap:16px; margin-bottom:40px`. Flower SVG at `width:25px`, spinning: `animation: spin 7s linear infinite` (off under reduced motion). `h2` 20px, uppercase, `line-height:1`, weight 400. Props: `title`.

### 5.10 `Button.astro` (primary)

`a` or `button`: `height:48px; padding-inline:32px; display:inline-flex; align-items:center; justify-content:center; gap:8px; font: 400 18px Anton; text-transform:uppercase; letter-spacing:.1em; background: var(--primary); color: var(--primary-fg); position:relative; overflow:hidden; transition: color .15s`. Inner label `span` `position:relative; z-index:1`. Hover fill: a `span` `position:absolute; left:0; right:0; height:100%; top:200%; background:#fff; border-radius:50%; transform: scale(1.5); transition: top .5s`; on hover `top:0` — a white rounded blob rises and fills the button. **Quirk to keep:** text stays dark on white, no colour swap.

---

## 6. Home page sections (in order)

### 6.1 Hero (`Hero.astro`, `section#banner`)

**Purpose.** State role, one-line pitch, CTA, three proof stats.

**Layout.** `section { position:relative; overflow:hidden }`. Container `height:100svh; min-height:530px; display:flex; justify-content:space-between; align-items:center`. Below 768px: `flex-direction:column; padding-bottom:40px`, left block `flex-grow:1; display:flex; flex-direction:column; justify-content:center; align-items:flex-start`.

- Left block `max-width:544px`:
  - `h1` Anton, 80px (60px below 640px), `line-height:.95`. Line 1 `color: var(--primary)`; `<br>`; line 2 `margin-left:16px`.
  - `p` intro `margin-top:24px; font-size:18px; color: var(--muted-fg)`; the name is `font-weight:500; color: var(--fg)`.
  - `Button` "Let's Talk", `margin-top:36px`, `href = GENERAL_INFO.ctaUrl`, `target=_blank`.
  - Availability row `margin-top:12px; display:flex; align-items:center; gap:8px`: 12px white circle + 14px muted text.
- Stats block: from 768px `position:absolute; bottom:10%; right:4%; display:flex; flex-direction:column; gap:32px; text-align:right`. Below 768px: `display:flex; gap:16px; text-align:center` under the left block. Each stat: value Anton 36px (30px below 640px) `color: var(--primary); margin-bottom:6px`; label muted 16px.
- `ChevronArrow` component absolutely positioned `bottom:80px; left:50%; translateX(-50%); z-index:0` (behind text).

**ChevronArrow.** `svg#banner-arrow-svg` 376×111, `viewBox 0 0 376 111`, `fill: transparent`. Two paths, `stroke: var(--chevron)`, `stroke-width:1`:
`M1 1V39.9286L188 110V70.6822L1 1Z` and `M375 1V39.9286L188 110V70.6822L375 1Z` (left and right halves of a downward chevron).
Timeline `repeat: -1`, after `gsap.set(svg, { autoAlpha: 0 })` and `strokeDasharray = strokeDashoffset = path.getTotalLength()` on both paths:
1. svg `autoAlpha: 1, duration: 0.1`
2. both paths `strokeDashoffset: 0, duration: 2, delay: 1` (chevron draws itself)
3. svg `fill: '#F0ECE608', duration: 0.5, delay: 0.5` (same value as `--chevron-fill`; GSAP needs the literal)
4. svg `y: 300, duration: 1` (drops out of view)
5. svg `autoAlpha: 0, duration: 0` → loop restarts from recorded start values.
Reduced motion: chevron rendered static, fully drawn, `fill: transparent`.

**Scroll-out.** All of `h1`, intro `p`, button, and the three stat blocks carry class `slide-up-and-fade`. One timeline:
```
scrollTrigger: { trigger: container, start: 'bottom 70%', end: 'bottom 10%', scrub: 1 }
tl.fromTo('.slide-up-and-fade', { y: 0 }, { y: -150, opacity: 0, stagger: 0.02 })
```
Content drifts up 150px and fades as the hero bottom passes 70%→10% of the viewport. No scroll-in animation on the hero (it is visible on load behind the preloader).

### 6.2 About (`About.astro`, `section#about-me`, `padding-bottom: var(--section)`)

**Layout.** Container:
- `h2` statement: Roboto Flex weight 100, 60px (36px below 768px), `margin-bottom:80px`.
- `p` label "This is me.": `padding-bottom:12px; border-bottom:1px solid var(--border); color: var(--muted-fg)`.
- Grid `margin-top:36px`, 12 columns from 768px, gap 25px: col-span 5 → `p` greeting 48px; col-span 7 → `div { max-width:450px; font-size:18px; color: var(--muted-fg) }` with two paragraphs, second `margin-top:12px`.
- Elements carrying `slide-up-and-fade`: statement, label, greeting, paragraph 1, paragraph 2.

**Scroll-in.**
```
scrollTrigger: { trigger: container, start: 'top 70%', end: 'bottom bottom', scrub: 0.5 }
tl.from('.slide-up-and-fade', { y: 150, opacity: 0, stagger: 0.05 })
```
**Scroll-out.**
```
scrollTrigger: { trigger: container, start: 'bottom 50%', end: 'bottom 10%', scrub: 0.5 }
tl.to('.slide-up-and-fade', { y: -150, opacity: 0, stagger: 0.02 })
```

### 6.3 Stack (`Stack.astro`, `section#my-stack`, no section padding)

**Layout.** Container: `SectionTitle "My Stack"`. Then a column of category rows with `row-gap:80px`. Each row is a grid (12 columns from 640px):
- col-span 5: category label, Anton 48px uppercase, `line-height:1; color: var(--muted-fg)`. Class `slide-up`.
- col-span 7: `display:flex; flex-wrap:wrap; column-gap:44px; row-gap:36px`. Each item `display:flex; align-items:center; gap:14px; line-height:1`, class `slide-up`: `img` 40×40 (`max-height:40px`, `alt = name`) + `span` 24px `text-transform: capitalize`.

**Scroll-in** (the signature "items pop in one at a time as you scroll" effect):
```
scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 80%', scrub: 0.5 }
tl.from('.slide-up', { opacity: 0, y: 40, ease: 'none', stagger: 0.4 })
```
Because the stagger is 0.4 and the timeline is scrubbed, each label/item appears sequentially in document order as the section scrolls through; scrolling back hides them in reverse.

**Scroll-out.**
```
scrollTrigger: { trigger: section, start: 'bottom 50%', end: 'bottom 10%', scrub: 1 }
tl.to(section, { y: -150, opacity: 0 })
```

### 6.4 Experience (`Experience.astro`, `section#my-experience`, `padding-block: var(--section)`) — departure from the original

**Purpose.** Same content as the original's flat list, presented as a vertical timeline: a rail on the left that fills with `--primary` as you scroll, a node per role that lights up when the fill reaches it, and each entry sliding in from the left at that moment.

**Layout.** Container: `SectionTitle "My Experience"`. Then `ol.timeline` `position:relative; list-style:none; margin:0; padding:0 0 0 var(--rail)` with `--rail: 40px` (56px from 768px).

- Rail: `.timeline::before` `content:''; position:absolute; left:0; top:10px; bottom:0; width:2px; background: var(--border)`.
- Rail fill: `div.timeline-fill` (first child of the `ol`, `aria-hidden`) `position:absolute; left:0; top:10px; bottom:0; width:2px; background: var(--primary); transform-origin: top`. Its CSS rest state is fully drawn; JS scales it from 0.
- Each `li.timeline-item` `position:relative; padding-bottom:56px`; `:last-child { padding-bottom:0 }`.
  - Node: `.timeline-item::before` `content:''; position:absolute; left: calc(-1 * var(--rail) - 5px); top:4px; width:12px; height:12px; border-radius:50%; background: var(--primary); border:2px solid var(--primary); transition: background .3s, border-color .3s`. (The −5px centres the 12px node on the 2px rail.) Pending state `.is-pending::before { background: var(--bg); border-color: var(--border) }`. Rest state is lit; JS adds `is-pending` and removes it as the fill arrives.
  - Duration `p` 14px uppercase `letter-spacing:.08em; color: var(--muted-fg)`.
  - Title `p` Anton 48px (36px below 640px) `line-height:1; margin-top:14px; margin-bottom:10px`.
  - Company `p` 20px muted.
  - Summary `p` (only if set) 16px muted `max-width:520px; margin-top:12px`.
- No logos, no cards, no alternating left/right layout. One rail, entries on the right, at every width.

**Motion.** All inside `mm.add`.
1. Rail fill, scrubbed:
```
gsap.from('.timeline-fill', { scaleY: 0, ease: 'none',
  scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } })
```
2. Per item (one ScrollTrigger each; add `is-pending` to every item first):
```
gsap.from(item, { x: -24, autoAlpha: 0, duration: 0.6,
  scrollTrigger: { trigger: item, start: 'top 60%', toggleActions: 'play none none reverse',
    onEnter: () => item.classList.remove('is-pending'),
    onLeaveBack: () => item.classList.add('is-pending') } })
```
Both use the 60% line on purpose: because the fill is scrubbed from `top 60%` to `bottom 60%`, its tip always sits exactly on the viewport's 60% line, so a node lights precisely when the amber tip reaches it. Change one and you must change the other.

3. Scroll-out, unchanged from the original:
```
scrollTrigger: { trigger: container, start: 'bottom 50%', end: 'bottom 20%', scrub: 1 }
tl.to(container, { y: -150, opacity: 0 })
```
Reduced motion / no JS: rail fully filled, every node lit, all entries visible.

### 6.5 Education (`Education.astro`, `section#education`, `padding-bottom: var(--section)`) — new, not in the original

**Purpose.** Degrees and schools, compact, visually distinct from the timeline above it: hairline rows that echo the About label rule and the Stack's 5/7 grid, so it reads as native to the page rather than a bolt-on.

**Layout.** Container: `SectionTitle "Education"`. Then `ul.education` `list-style:none; margin:0; padding:0; border-top:1px solid var(--border)`. Each `li.edu-item` `padding-block:32px; border-bottom:1px solid var(--border); display:grid; gap:12px 25px`; from 640px `grid-template-columns: 5fr 7fr`.
- Left cell: duration `p` 14px uppercase `letter-spacing:.08em; color: var(--muted-fg)`; school `p` 20px `margin-top:8px`.
- Right cell: degree `p` Anton 36px (28px below 640px) `line-height:1`; detail `p` (only if set) 16px muted `margin-top:10px; max-width:450px`.
- No school logos, no badges, no cards, no GPA pills.

**Scroll-in.**
```
scrollTrigger: { trigger: container, start: 'top 70%', end: 'bottom bottom', scrub: 0.5 }
tl.from('.edu-item', { y: 50, opacity: 0, stagger: 0.15 })
```
**Scroll-out.**
```
scrollTrigger: { trigger: container, start: 'bottom 50%', end: 'bottom 20%', scrub: 1 }
tl.to(container, { y: -150, opacity: 0 })
```

### 6.6 Selected Projects (`Projects.astro`, `section#selected-projects`, `padding-bottom: var(--section)`)

**Layout.** Container: `SectionTitle "Selected Projects"`. Then `div.projects` `position:relative`:

- **Floating thumbnail** (desktop ≥768px only): `div.float` `position:absolute; right:0; top:0; z-index:1; pointer-events:none; width:200px (350px from 1280px); aspect-ratio:3/4; overflow:hidden; opacity:0`. Contains one `<Image>` per project, `position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition: opacity .5s`; all `opacity:0` except the one whose slug matches `data-active`.
- **List** `display:flex; flex-direction:column` (`row-gap:40px` below 768px). Each item is `a.project-item[data-transition][data-slug]` to `/projects/<slug>`:
  - `display:block; line-height:1; padding-block:20px; border-bottom:1px solid var(--border)` from 768px; first item `padding-top:0`; last item `padding-bottom:0; border:none`. `transition: all .15s`.
  - When any item in the list is hovered (`.projects:hover .project-item`), all items go `opacity:.3`; the hovered one stays `opacity:1` (desktop only).
  - Row `display:flex; gap:20px` (8px below 768px): index `_01.` Anton 16px muted (zero-padded, prefixed with underscore, suffixed with a period) + content block.
  - Title `h4` Anton 60px (36px below 420px), `display:flex; gap:16px`, with the **amber wipe**: `background-image: linear-gradient(to right, var(--primary) 0 50%, var(--fg) 50% 100%); background-size: 200% 100%; background-position: right; -webkit-background-clip:text; background-clip:text; color:transparent; transition: background-position .7s`. On item hover `background-position: left` — amber sweeps across the letters left→right.
  - Next to the title: `span` `color: var(--fg); opacity:0; transition: opacity .15s`, hover `opacity:1`, containing the external-link `svg` 36×36, `viewBox 0 0 24 24`, `fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round`, three paths with ids: `#box M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`, `#arrow-line M10 14 21 3`, `#arrow-curb M15 3h6v6`.
  - Below the title `margin-top:8px; display:flex; flex-wrap:wrap; gap:12px; font-size:12px; color: var(--muted-fg)`: the first three `techStack` entries, separated by 8px circles `background: var(--bg-light)`.
  - **Mobile (<768px):** each item shows its own thumbnail above the row: `width:100%; aspect-ratio:3/2; object-fit:cover; object-position:top; margin-bottom:24px`, lazy-loaded. The floating thumbnail is not rendered.

**Hover behaviours (desktop, not reduced motion).**
1. `mouseenter` on an item sets `.float[data-active] = slug` (swaps which stacked image is visible, CSS 0.5 s cross-fade) and starts the icon draw loop: `gsap.set` each of `#box, #arrow-line, #arrow-curb` to `opacity:0, strokeDasharray = strokeDashoffset = getTotalLength()`; timeline `{ repeat:-1, repeatDelay:1 }`: svg `autoAlpha:1` → box `opacity:1, strokeDashoffset:0` → arrow-line same at `'<0.2'` → arrow-curb same → svg `autoAlpha:0` at `'+=1'`. `mouseleave` kills that timeline and reverts the icon.
2. Global `mousemove`: if the pointer is outside the `.projects` bounding box → `gsap.to(float, { opacity: 0, duration: 0.3 })`. Otherwise `gsap.to(float, { y: (clientY - rect.top) - floatHeight / 2, opacity: 1, duration: 1 })` — the thumbnail trails the cursor vertically with a 1 s ease-out lag, pinned to the right edge.

**Scroll-in.**
```
scrollTrigger: { trigger: .projects, start: 'top bottom', end: 'top 80%', scrub: 1, toggleActions: 'restart none none reverse' }
tl.from(.projects, { y: 150, opacity: 0 })
```
No scroll-out; the list runs into the footer.

### 6.7 Footer (`Footer.astro`, `footer#contact`, `text-align:center; padding-bottom:20px`)

- `p` "Have a project in mind?" 18px.
- Email `a[mailto]` Anton 36px (30px below 640px), `display:inline-block; margin-top:20px; margin-bottom:40px`, hover underline.
- Credit block `a` muted, `line-height:1`, hover underline + white: two lines — `Design by Tajmirul Islam` linking to https://tajmirul.site (required by the licence) and `Built by {name}` linking to `repoUrl` when set.
- If `GENERAL_INFO.repoUrl` is set: fetch `https://api.github.com/repos/<owner>/<repo>` in Astro frontmatter at build time and render `★ {stargazers_count}` and `⑂ {forks_count}` as an inline row (`gap:20px; padding-top:4px`, 18px Lucide icons). Wrap in try/catch and omit on failure.

---

## 7. Project detail page (`pages/projects/[slug].astro`)

`getStaticPaths` from `PROJECTS`. `<title>` = `"{title} - {first 3 techStack}"`, description = plain-text description.

**Layout.** `section { padding-top:20px; padding-bottom:56px }` → container:
- Back link `a[data-transition][href="/"]` `margin-bottom:64px; display:inline-flex; gap:8px; align-items:center; height:48px`: Lucide `arrow-left` + "Back"; hover: icon `translateX(-4px)` and `color: var(--primary)`, `transition: all .3s`.
- `div#info` `min-height: calc(100svh - 100px); display:flex` → inner `position:relative; width:100%`:
  - Title row `display:flex; align-items:flex-start; gap:24px; max-width:635px; margin:0 auto 40px`: `h1` Anton 60px (36px below 768px) `line-height:1; overflow:hidden` with an `inline-block span`; then icon links (Lucide `github` 30px if `sourceCode`, `external-link` 30px if `liveUrl`), hover `color: var(--primary)`.
  - Meta blocks `max-width:635px; margin-inline:auto; padding-bottom:80px; row-gap:28px`: **Year**, **Tech & Technique** (joined by ", "), **Description** (HTML, `ul` gets `padding-left:20px; margin-top:8px; list-style:disc`), **My Role** (HTML, only if set). Each block: label Anton 16px muted `margin-bottom:12px`, value 18px.
  - `ChevronArrow` inside `#info` (same loop as the hero).
  - Every title/icon/meta block carries `fade-in-later`.
- `div#images` `position:relative; display:flex; flex-direction:column; gap:8px; max-width:800px; margin-inline:auto`, class `fade-in-later`. Each image: `div` `position:relative; width:100%; aspect-ratio:750/400; background: var(--bg-light) url(image) center 50% / cover no-repeat`. Top-right hover button `a[href=image][target=_blank]` 48×48, `background: hsl(0 0% 13% / .7)`, external-link icon, `opacity:0`, parent hover `opacity:1`, hover `background: var(--primary); color: var(--primary-fg)`.

**Motion.**
1. Entrance: `gsap.set('.fade-in-later', { autoAlpha: 0, y: 30 })`; timeline `delay: 0.5` → `to('.fade-in-later', { autoAlpha: 1, y: 0, stagger: 0.1 })`. Under reduced motion skip the `set` entirely.
2. Pinned blur-out (≥992px only): `gsap.to('#info', { filter: 'blur(3px)', autoAlpha: 0, scale: 0.9, scrollTrigger: { trigger: '#info', start: 'bottom bottom', end: 'bottom top', pin: true, pinSpacing: false, scrub: 0.5 } })` — the info block stays put and blurs/shrinks while the images scroll up over it.
3. Image parallax: for each `#images > div` at index `i`: `gsap.to(div, { backgroundPosition: 'center 0%', ease: 'none', scrollTrigger: { trigger: div, start: i ? 'top bottom' : 'top 50%', end: 'bottom top', scrub: true } })`.

---

## 8. Responsive rules (summary)

| Range | Behaviour |
|---|---|
| < 420 | Project titles 36px. |
| < 640 | Hero h1 60px, stats 30px, footer email 30px; timeline titles 36px; education degrees 28px and rows stack to one column; drawer content margin 32px. |
| < 768 | Hero stacks vertically with stats in a row; about statement 36px; timeline rail inset 40px (56px above); no custom cursor; no floating thumbnail (inline 3:2 thumbnails instead); no project dimming; burger `right:20px`; nothing hovers. |
| < 992 | Project page info block is not pinned or blurred. |
| < 1024 | Drawer content not vertically centred; preloader letters 20vw; drawer columns stack. |
| < 1280 | Sticky email hidden; floating thumbnail 200px wide. |
| ≥ 1280 | Floating thumbnail 350px; sticky email visible. |

Never allow horizontal page scroll. Hero `overflow:hidden` contains the chevron drop.

---

## 9. Accessibility and performance

- All motion behind `prefers-reduced-motion: no-preference` via `gsap.matchMedia`. Reduced state: no preloader, no Lenis, static backdrop grid, no chevron, no flower spin, no curtain, native cursor, all sections visible at rest (timeline rail filled, nodes lit).
- `<noscript>` hides preloader and curtain so the page is readable with JS off.
- Burger is a `<button>` with `aria-label`, `aria-expanded`, `aria-controls`; drawer has `role="dialog"`, Escape closes, focus trapped while open.
- Project list items are real links with accessible names (the title); the decorative icon is `aria-hidden`.
- Logos have `alt` = name; project thumbnails `alt` = project title; detail images `alt` = "{title} screenshot N".
- Text colour contrast: `--fg`, `--muted-fg` and `--primary` on `--bg` all pass AA (§4.1). Amber is still reserved for display text, the rail, and the hover wipe; body copy stays `--fg` / `--muted-fg`.
- Fonts self-hosted, `font-display: swap`, preload the Anton woff2.
- Thumbnails through Astro `<Image>` (WebP, width-capped). Logos as SVG in `public/`. Lazy-load everything below the hero.
- GSAP core + ScrollTrigger + Lenis is the entire JS budget (about 40 KB gzipped). No other runtime deps.
- Lighthouse target: 95+ across the board on mobile.

---

## 10. Anti-patterns — do not do these

- No light theme, no theme toggle. Single dark palette.
- No Tailwind, no React, no Framer Motion, no client-side router.
- No card grids for projects: the list is text rows with the hover thumbnail, exactly as specified.
- No extra sections beyond Education: no testimonials, services, blog teaser, contact form, or logo carousel.
- No gradient blobs, glassmorphism, glow shadows, noise textures, or particles. The backdrop is the flat 1px dot grid in §5.4 and nothing else.
- No cards, logos, badges, or alternating left/right layout in Experience or Education. The timeline is one rail with entries on the right; Education is hairline rows.
- No bounce/elastic easings. Reveals use GSAP defaults (`power1.out`) or the stated `none`/`power1.inOut`/`power2.out`.
- No scroll-snap, no pinned hero, no video.
- Do not offset the custom cursor to its centre, do not add hover-scale to it.
- Do not swap Anton for another condensed sans, do not swap Roboto Flex 100 for a regular-weight statement.
- Do not let the floating thumbnail or drawer cause horizontal overflow.
- Do not run the preloader on every navigation; once per session.

---

## 11. Build order and QA checklist

Build in this order, checking each step in the browser at 1440px and 390px before moving on:

1. Scaffold: Astro, fonts, `global.css` tokens, `Base.astro`, `motion.ts`. Blank page scrolls smoothly with Lenis.
2. Curtain + Preloader + Backdrop + Cursor + ScrollProgress + StickyEmail.
3. Nav drawer with all hover states (five menu dots).
4. Hero with chevron loop and scroll-out.
5. About in/out. Stack scrubbed stagger. Experience timeline: rail fill, node light-up, item slide-in, scroll-out. Education in/out.
6. Projects list: amber wipe, icon draw loop, floating thumbnail follow, dimming, mobile thumbnails.
7. Footer with optional GitHub stats.
8. Project detail page with entrance, pin-blur, parallax, Back curtain.
9. Reduced-motion pass with the OS setting on. Keyboard pass. Lighthouse.

QA:
- [ ] Preloader letters rise, columns fall, once per session.
- [ ] Amber sheet then grey cover lift on every load; grey rises on project link click.
- [ ] Chevron draws, fills faintly, drops, loops; hidden under reduced motion.
- [ ] Hero content drifts up as you leave; About drifts in staggered then out.
- [ ] Stack items appear strictly one after another tied to scroll; reverse on scroll up.
- [ ] Backdrop grid drifts at 0.15× scroll with no visible seam; fades at top and bottom edges; static under reduced motion.
- [ ] Timeline rail fills with scroll and each node lights exactly as the amber tip reaches it; scrolling back un-lights and reverses the slide-in.
- [ ] Education rows stagger in; hairlines match the About label rule; rows stack below 640px.
- [ ] Drawer shows five menu items with five distinct dot colours; Education anchor smooth-scrolls to `#education`.
- [ ] Project hover: wipe left→right in 0.7 s, icon draws with 1 s hold, thumbnail lags cursor by ~1 s, siblings at 30%.
- [ ] Floating thumbnail hides when the pointer leaves the list box.
- [ ] Drawer: burger→X, 70% dim, panel slides 0.7 s with circular edge arriving 0.15 s later, Escape closes.
- [ ] Sticky email only ≥1280; cursor only ≥768 with a fine pointer.
- [ ] No horizontal scroll at any width. Nothing overlaps at 390px.
- [ ] Reduced motion: page is static, readable, all content visible, native cursor.
