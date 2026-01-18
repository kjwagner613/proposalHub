# Proposal Hub context

This repo is a multi-proposal site deployed on Netlify. Each client lives in a root
folder with its own project, and builds into a shared `/dist` publish directory.

Current setup:
- Netlify reads `netlify.toml` at repo root.
- Publish directory is `dist`.
- Build command:
  - `mkdir -p dist && cp index.html dist/index.html && npm --prefix vintageSalon install && npm --prefix vintageSalon run build`
- Each proposal builds into `/dist/<lowercase-client>`.
- Vite projects set:
  - `base: '/<lowercase-client>/'`
  - `build.outDir: '../dist/<lowercase-client>'`
  - `build.emptyOutDir: false`

Current client:
- Vintage Salon: `vintageSalon` source folder, deploys to `/vintagesalon/`.

To add a new client:
1. Create a root folder for the client project.
2. Configure that project's build to output to `/dist/<lowercase-client>`.
3. Extend the root `netlify.toml` build command to also build the new project.
4. Link it from `index.html` if desired.
