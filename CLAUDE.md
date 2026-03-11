# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start Parcel dev server with hot reload (entry: src/index.html)
bun run build    # Production build → dist/, copy public/ assets, then restart dev
```

No test suite is configured.

## Code Style

Prettier is enforced (`.prettierrc.json`):

- Tabs for indentation (tabWidth: 4)
- No semicolons
- Double quotes
- Trailing commas (ES5)
- Arrow parens omitted for single params

## Architecture

**Stack**: Vanilla TypeScript (OOP, no React/Vue) + Three.js + GSAP + Parcel 2 + SCSS

**Initialization flow**:

```text
DOMContentLoaded
  → index.ts
    → initializeBackground() — Inits Three.js background and handles visibility/unload lifecycle
    → Instantiates ProjectsRenderer, ReviewSwiper, LoaderManager
    → LoaderManager.start() triggers rendering projects and populating reviews on completion
  → App (app.ts) constructor
    → initializePlugins()    — registers smooth-scrollbar plugins
    → initializeComponents() — Instantiates LoaderManager, ReviewSwiper, AccordionManager
    → initializeUtilities()  — updates copyright year, ImageManager
    → startApp()             — Starts loader animation, populates reviews
  → LoaderManager.start()
    → Animates progress bar with GSAP
    → Waits for all images via imagesloaded
    → Inits Smooth Scrollbar
    → Executes completion callbacks
```

**Key files**:

- `src/index.html` — Parcel entry; contains all static HTML sections
- `src/index.ts` — Bootstraps ThreeJS lifecycle, `ProjectsRenderer`, `ReviewSwiper`, and `LoaderManager`
- `src/assets/js/app.ts` — Central `App` class wiring layout plugins and DOM utilities
- `src/assets/js/components/` — `loader.ts`, `reviewSwiper.ts`, `projectsRenderer.ts`, `accordion.ts`, `imageManager.ts`
- `src/assets/js/utils/` — Utility functions (e.g., `url.ts` for fail-closed URL sanitization, `domUtils.ts`)
- `src/assets/js/threeBg.ts` — Animated wavy plane background (Three.js)
- `src/assets/js/shaded3dImage.ts` — Mouse-tracked GLSL shader distortion on hero text
- `src/assets/shaders/vertex.glsl` / `fragment.glsl` — Custom WebGL shaders
- `src/assets/js/projectsData.ts` — **Gitignored** (personal data); contains `Project[]` array
- `src/assets/js/data.ts` — `Review[]` interface and data
- `src/assets/styles/main.scss` — SCSS entry that imports all partials

**3D effects**:

- `threeBg.ts`: sine-wave deformed plane for background
- `shaded3dImage.ts`: shader-based texture morphing with mouse tracking on intro text

**Data flow for projects**: `projectsData.ts` exports `projects: Project[]` → `ProjectsRenderer` reads it and dynamically injects HTML into the projects section after the loader completes.

## Build Notes

- Parcel config (`.parcelrc`) treats `.jpg` files as raw URLs (not inlined)
- GLSL shaders are bundled via `@parcel/transformer-glsl`
- `public/` directory (avatars, project images, wallpapers) must be manually copied to `dist/` — the build script does this via `cp -r public dist`
- `src/assets/js/projectsData.ts` is gitignored. Create it with:

```typescript
export interface Project {
  id: number
  title: string
  subtitle: string
  image: string
  githubUrl: string
  liveUrl: string
  date: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Name",
    subtitle: "Web Application",
    image: "/projects/wild-oasis.png",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    date: "2024",
    tags: ["React", "TypeScript", "Node.js"]
  }
]
```

## PWA & Deployment

- Deployed on Netlify; contact form uses Netlify Forms (`netlify` attribute on `<form>`)
- `src/manifest.json` configures PWA metadata
- Favicons in `src/assets/favicons/` cover Apple, Android, Windows, and standard favicon formats
