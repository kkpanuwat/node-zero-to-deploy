# Project Overview

This project is a documentation website built with [Docusaurus](https://docusaurus.io/). The main purpose of this site is to host educational content, specifically a course titled "Node.js: Zero to Deploy".

The content is structured into modules and chapters, covering topics from JavaScript basics to deploying a full-stack Node.js application.

## Building and Running

The project uses `yarn` for package management.

**Installation:**

```bash
yarn
```

**Local Development:**

To start the local development server:

```bash
yarn start
```

This will open a browser window with the documentation site. Changes to the source files will be reflected live.

**Build:**

To generate a static build of the website:

```bash
yarn build
```

The output will be in the `build` directory.

## Development Conventions

*   **Content:** The documentation is written in Markdown (`.md` and `.mdx`) and is located in the `docs` directory.
*   **Structure:** The sidebar and navigation are defined in `sidebars.ts`.
*   **Customization:** The main page is a React component located at `src/pages/index.tsx`. Custom components used in the documentation are in `src/components`.
*   **Styling:** Custom CSS is in `src/css/custom.css`.
*   **Typescript:** The project uses TypeScript, and the configuration is in `tsconfig.json`. You can run the type checker with `yarn typecheck`.
