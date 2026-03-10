# Project Overview

This project is a modern, creative, responsive personal portfolio utilizing 3D graphics. It is a frontend application built with Vanilla TypeScript (using Object-Oriented patterns), Three.js for 3D elements and GLSL shaders, GSAP for sophisticated animations, and SCSS for styling. The application is bundled using Parcel and managed with Bun.

Key technologies

- **TypeScript** (Vanilla, OOP)
- **Three.js** (3D background, shaders, particle systems)
- **GSAP** (Loader and page animations)
- **Parcel 2** (Bundler with SCSS and GLSL support)
- **SCSS** (Styling)

## Building and Running

This project uses `bun` as the package manager and script runner.

**Install dependencies:**

```bash
bun install
```

**Start the development server (with hot reload):**

```bash
bun run dev
```

*(This runs `parcel src/index.html`)*

**Build for production:**

```bash
bun run build
```

*(This builds the project to the `dist/` directory and copies static assets from `public/` over to `dist/`.)*

## Architecture

The initialization flow is orchestrated centrally:

1. `DOMContentLoaded` triggers the `App` class constructor (`src/assets/js/app.ts`).
2. Registers plugins (Smooth Scrollbar plugins).
3. Initializes components (`LoaderManager`, `ReviewSwiper`, `AccordionManager`, etc.).
4. Initializes utilities (e.g., copyright year, `ImageManager`).
5. App starts: loader animation kicks off, waiting for images to load via `imagesloaded`, eventually revealing the 3D canvas and content sections.

**Key Directories and Files:**

- `src/index.html` - The Parcel entry point containing the structural HTML.
- `src/index.ts` - Bootstraps certain dynamic renderers like `ProjectsRenderer` and `ReviewSwiper`.
- `src/assets/js/app.ts` - The main central application class wiring together components.
- `src/assets/js/components/` - Sub-components (`loader.ts`, `projectsRenderer.ts`, `accordion.ts`, `reviewSwiper.ts`).
- `src/assets/js/threeBg.ts` - The interactive 3D particle background system (Three.js).
- `src/assets/js/shaded3dImage.ts` - Controls the WebGL shader distortions (mouse-tracked).
- `src/assets/shaders/` - Custom GLSL shaders (`vertex.glsl`, `fragment.glsl`).

## Development Conventions

- **Code Style:** Prettier is enforced via `.prettierrc.json`:
  - Indentation using Tabs (tabWidth: 4)
  - No semicolons (`semi: false`)
  - Double quotes
  - Trailing commas (ES5)
  - Omit arrow function parentheses for single parameters
- **TypeScript:** The code uses strictly typed object-oriented constructs.
- **Gitignored Data:** The `src/assets/js/projectsData.ts` file contains personalized portfolio data (like the `Project` interface and exports) and is often gitignored. Ensure the file exports a `Project` interface and a `projects` array to allow compilation.
- **Libraries:** Do not assume missing libraries/frameworks (like React or Vue) are part of the project; adhere strictly to the Vanilla TS environment.
