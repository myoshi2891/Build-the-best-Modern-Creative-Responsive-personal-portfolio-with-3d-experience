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

The initialization flow is orchestrated via `index.ts` and `app.ts`:

1. `DOMContentLoaded` triggers both `index.ts` and the `App` class constructor (`src/assets/js/app.ts`).
2. `index.ts` initializes the Three.js background, binding to visibility/unload lifecycles.
3. `index.ts` instantiates core components (`ProjectsRenderer`, `ReviewSwiper`, `LoaderManager`) and triggers their rendering logic on load completion.
4. `App` registers UI plugins (Smooth Scrollbar).
5. `App` initializes side-components (`AccordionManager`, `ImageManager`) and DOM utilities.
6. The `LoaderManager` coordinates the initial site loading phase (progress bar, image loading via `imagesloaded`) before revealing the content and 3D canvas.

**Key Directories and Files:**

- `src/index.html` - The Parcel entry point containing the structural HTML.
- `src/index.ts` - Bootstraps ThreeJS background lifecycle and core UI renderers/loaders.
- `src/assets/js/app.ts` - The main central application class wiring together plugins and UI components.
- `src/assets/js/components/` - Sub-components (`loader.ts`, `projectsRenderer.ts`, `accordion.ts`, `reviewSwiper.ts`, `imageManager.ts`).
- `src/assets/js/utils/` - Shared utilities like `url.ts` (for security sanitization) and `domUtils.ts`.
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
