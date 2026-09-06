# Parallel build plan — PROMPT.md §11 steps 5–9

Status 2026-09-06: steps 1–4 are done (scaffold, Curtain/Preloader/Backdrop/Cursor/ScrollProgress/StickyEmail, Nav drawer, Hero).
This plan splits the rest into four lanes that run at the same time without touching each other's files,
with one prep step before and one integration step after. PROMPT.md stays the spec; this file only says who builds what, where.

## 1. Why lanes: the files more than one step would fight over

| File | Who would want it | Rule |
|---|---|---|
| `src/pages/index.astro` | every section is imported here | written once in prep, then frozen |
| `src/layouts/Base.astro` | Footer is mounted here | prep mounts a Footer stub, then frozen |
| `src/components/SectionTitle.astro` | Stack, Experience, Education, Projects | built in prep, read-only after |
| `src/data/site.ts` | every section reads it | content owner only; no agent edits it, ever |
| `src/styles/global.css`, `src/lib/motion.ts` | anyone wanting a token or helper | frozen; ask via INTEGRATION REQUEST |
| `dist/`, `.astro/` | every build | build only in your own worktree |
| dev server port 4321 | everyone | one port per lane (table below) |

Everything else a lane needs is already built and read-only: `Button`, `ChevronArrow`, `Curtain` (handles `a[data-transition]` clicks), `Nav`, `Hero`.

## 2. Step 0 — prep (one agent, sequential, must finish before any lane starts)

1. `git init`, `.gitignore` already exists, commit as `chore: steps 1-4`. Worktrees need git; so does undo.
2. Create stubs so the frozen files are final now. Each stub renders its `<section id="…">` with the spec padding and a one-line `TODO lane X` placeholder so the page still scrolls:
   `src/components/home/About.astro`, `Stack.astro`, `Experience.astro`, `Education.astro`, `Projects.astro`,
   `src/components/Footer.astro`, `src/pages/projects/[slug].astro` (getStaticPaths from `PROJECTS`, empty is fine).
3. Rewrite `src/pages/index.astro`: Hero, About, Stack, Experience, Education, Projects in that order inside `<main>`. Remove the 150vh spacer. Mount `<Footer />` in `Base.astro` right after `<slot />`.
4. Build `SectionTitle.astro` fully (§5.9) and add `public/icons/section-flower.svg` (copy from the original repo, or draw an 8-petal asterisk in a 25×29 viewBox).
5. If `PROJECTS` is still empty: add three placeholder projects with generated images so lanes C and D have something to render.
   Images: `node scripts/shot.mjs "data:text/html,<body style='margin:0;background:%23334'>" 400 500 src/assets/projects/thumbnail/demo-1.png`
   and the same at 1000 873 for `src/assets/projects/images/demo-1-1.png`. PNG is fine where the spec says jpg.
   The content owner pauses edits to `site.ts` while this happens, and replaces the placeholders later.
6. Verify: `npm run build` passes; `node scripts/shot.mjs http://localhost:4321/ 1440 900 a.png` and `… 390 844 b.png` print `overflowing: []`.
7. Commit `chore: prep for parallel lanes`.

## 3. Lanes

| Lane | Builds | Owns (the only files it may edit) | Spec | Needs from content owner | Dev port |
|---|---|---|---|---|---|
| A | About + Stack | `src/components/home/About.astro`, `src/components/home/Stack.astro` | §6.2, §6.3 | `ABOUT`, `MY_STACK` (logos already in `public/logo/`) | 4322 |
| B | Experience + Education | `src/components/home/Experience.astro`, `src/components/home/Education.astro` | §6.4, §6.5 | `MY_EXPERIENCE`, `MY_EDUCATION` | 4323 |
| C | Projects list + Footer | `src/components/home/Projects.astro`, `src/components/Footer.astro` | §6.6, §6.7 | `PROJECTS` with thumbnails, `repoUrl` optional | 4324 |
| D | Project detail page | `src/pages/projects/[slug].astro` | §7 | `PROJECTS` with detail images | 4325 |

A and B can start the moment prep is committed. C and D need real or placeholder projects (prep step 5).

Why paired this way: Stack sits inside About's bottom padding, so About's scroll-out and Stack's scroll-in overlap on screen and one agent should tune both. Experience and Education share the hairline and section-title language. Projects runs straight into the Footer with no scroll-out. The detail page is its own route and only shares the `Project` type.

### Lane A — About + Stack

- `About.astro` (§6.2): `section#about-me`, statement in Roboto Flex 100 at 60/36px, "This is me." label with the 1px hairline, 12-col grid (5/7) from 768px, greeting 48px, two muted paragraphs. Scroll-in `from` tween with stagger 0.05, scroll-out `to` with stagger 0.02, both scrubbed, selectors scoped to `#about-me`.
- `Stack.astro` (§6.3): `section#my-stack`, `SectionTitle "My Stack"`, rows with 80px gap, 5/7 grid from 640px, label Anton 48px uppercase muted, items with 40×40 logo + 24px capitalised name. Scroll-in is the scrubbed `stagger: 0.4` over `.slide-up`; scroll-out moves the whole section. Skip empty categories.
- Accept: About drifts in staggered, then out. Stack items appear strictly one after another tied to scroll and hide in reverse on scroll up. Logos have `alt`. No overflow at 390.

### Lane B — Experience + Education

- `Experience.astro` (§6.4): `section#my-experience`, `SectionTitle "My Experience"`, `ol.timeline` with the `--rail` variable (40px, 56px from 768px), `::before` rail, `div.timeline-fill` scaled from 0 with `scrub: 0.5` between `top 60%` and `bottom 60%`, one ScrollTrigger per item at `top 60%` that removes/adds `is-pending` and slides the item in from x −24. Scroll-out on the container. CSS rest state is fully filled and lit.
- `Education.astro` (§6.5): `section#education`, `SectionTitle "Education"`, hairline rows, `5fr 7fr` from 640px, degree Anton 36/28px. Scroll-in `from` stagger 0.15, scroll-out on the container.
- Accept: rail fills with scroll and each node lights exactly as the amber tip reaches it; scrolling back un-lights and reverses the slide-in. Education rows stagger in; hairlines match the About label rule; rows stack below 640.

### Lane C — Projects list + Footer

- `Projects.astro` (§6.6): `section#selected-projects`, `SectionTitle "Selected Projects"`, `div.projects` with the floating 3:4 thumbnail stack (Astro `<Image>`, 200px, 350px from 1280px, desktop only), list of `a.project-item[data-transition][data-slug]` rows with `_01.` index, Anton 60px title carrying the amber wipe, external-link icon with the three path ids, first three tech tags with 8px separators, inline 3:2 thumbnails below 768px. Hover: dimming via `.projects:hover .project-item`, icon draw loop on `mouseenter`, global `mousemove` float follow with the 1s lag and hide outside the box. Scroll-in only. Clicking a row is handled by the existing Curtain; do not add navigation code.
- `Footer.astro` (§6.7): `footer#contact`, "Have a project in mind?", email in Anton 36/30px, credit block with the required "Design by Tajmirul Islam" link and "Built by {name}". GitHub stars/forks fetched in frontmatter when `repoUrl` is set, wrapped in try/catch.
- Accept: wipe left→right in 0.7s; icon draws and holds 1s, loops; thumbnail lags the cursor by about 1s and hides when the pointer leaves the list box; siblings at 30%; mobile shows inline thumbnails and no dimming; footer renders with and without `repoUrl`.

### Lane D — Project detail page

- `pages/projects/[slug].astro` (§7): `getStaticPaths` from `PROJECTS`, `Base` with `title="{title} - {first 3 techStack}"`, Back link `a[data-transition][href="/"]`, `div#info` with title row, icon links, Year / Tech & Technique / Description / My Role blocks, `ChevronArrow`; `div#images` with `aspect-ratio: 750/400` backgrounds and the hover open button. Entrance stagger after 0.5s, pin-blur of `#info` from 992px, per-image background parallax.
- Accept: entrance stagger; at ≥992 the info block stays put and blurs while images scroll over it; below 992 nothing pins; Back link plays the curtain then navigates home; page title correct; no overflow at 390.

## 4. Shared rules (paste into every lane prompt)

1. Read `PROMPT.md` §0–§5, §8–§10 and your own sections in full before writing anything.
2. Edit only the files in your "Owns" column. Never edit `site.ts`, `global.css`, `motion.ts`, `Base.astro`, `index.astro`, or another lane's files. If you need something there, write an INTEGRATION REQUEST in your report with the exact diff; do not work around it.
3. Every tween that moves things lives inside `mm.add('(prefers-reduced-motion: no-preference)', …)`. Use `from` tweens for reveals so the no-JS and reduced-motion states are the final, visible state.
4. Scope every DOM query to your section id, e.g. `#my-stack .slide-up`. Hero and About both use `.slide-up-and-fade`.
5. Do not pass `class` to a child component; Astro scoped styles will not reach it. Wrap it in a div you style.
6. GSAP reads a CSS percentage transform as pixels. If CSS sets `translateY(100%)` and you tween `yPercent`, run `gsap.set(el, { y: 0, yPercent: 100 })` first.
7. One `<script>` per component importing from `../../lib/motion` (sections) or `../lib/motion` (top-level components). No new dependencies. No Tailwind, React, or client router.
8. Dev server: `npx astro dev --background --port <your port>`. Stop it with `npx astro dev stop`.
9. Before reporting: `npm run build` passes; `node scripts/shot.mjs http://localhost:<port>/ 1440 900 a.png` and `… 390 844 b.png` print `overflowing: []` and no `PAGE ERRORS`; look at the PNGs. Use the `scrollY` argument for scroll states and the `js` argument for hover or click states (see the header comment in `scripts/shot.mjs`).
10. Commit on your branch as `feat(lane-x): …`. Do not merge.

Report format at the end of the task:

```
Files changed:
Verified: (what, at which widths, screenshot names)
INTEGRATION REQUESTS: (frozen-file changes needed, exact diff, or "none")
Deviations from spec / open questions:
```

## 5. Step 9 — integration and QA (one agent, sequential, after every lane is merged)

1. Merge `lane-a` … `lane-d` into `main`. They touch distinct files, so merges are clean.
2. Apply the INTEGRATION REQUESTS.
3. Full-page pass at 1440 and 390: hero → about → stack → experience → education → projects → footer. Watch the handoffs nobody could test alone: About-out under Stack-in, Stack-out into Experience-in, Education-out into Projects-in.
4. Drawer anchors smooth-scroll to `#about-me`, `#my-experience`, `#education`, `#selected-projects`.
5. Curtain round trip: project row click → detail page → Back.
6. Reduced motion (OS setting on, or `REDUCE=1 node scripts/shot.mjs …`): static page, all content visible, native cursor, rail full, nodes lit, no preloader or curtain.
7. Keyboard pass: tab order, drawer focus trap, project rows and Back link reachable.
8. Lighthouse mobile 95+ across the board. Images go through `<Image>`, fonts are already preloaded.
9. Content owner replaces placeholder projects and TODO strings before publishing.

## 6. How to launch

### Option 1 — git worktrees, one Claude Code terminal per lane (recommended)

```
git worktree add ../portfolio-lane-a -b lane-a
git worktree add ../portfolio-lane-b -b lane-b
git worktree add ../portfolio-lane-c -b lane-c
git worktree add ../portfolio-lane-d -b lane-d
```

In each worktree: `npm ci`, then start `claude` and paste the lane brief plus the shared rules. Each lane runs its own dev server on its own port and builds into its own `dist/`.
Merge when all four reports are in: `git checkout main && git merge lane-a lane-b lane-c lane-d`.

### Option 2 — one Claude Code session driving four subagents

Ask the main session to run lanes A–D in parallel as agents with worktree isolation, each given its brief and the shared rules. Same isolation as option 1, less typing, but the four reports come back through one session.

### Option 3 — no git, same folder

Works only if every agent obeys the ownership table, and there is no undo. Several dev servers on one folder are fine (one port each), but do not run `astro build` in a lane; the shared `dist/` would be overwritten mid-check. Build only at integration.

## 7. Risks

- Scroll choreography between neighbouring sections can only be judged on the full page. Integration owns that tuning, not the lanes.
- `Project` shape in `site.ts` is the contract between C and D. Neither lane changes it.
- Astro's dev server caches a failed import if a file is imported before it exists. The stubs in prep exist to prevent exactly that.
- Windows: `scripts/shot.mjs` expects Chrome at the default Program Files path; set `CHROME=` otherwise.
