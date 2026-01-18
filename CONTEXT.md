# Proposal Hub context

This repo is a multi-proposal site deployed on Netlify. Each client lives in a root
folder with its own project, and builds into a shared `/dist` publish directory.

Current setup:
- Netlify reads `netlify.toml` at repo root.
- Publish directory is `dist`.
- Build command:
  - `mkdir -p dist && cp index.html dist/index.html && npm --prefix vintageSalon install && npm --prefix vintageSalon run build && mkdir -p dist/newdd && cp -R newDD/* dist/newdd/`
- Each proposal builds into `/dist/<lowercase-client>`.
- Vite projects set:
  - `base: '/<lowercase-client>/'`
  - `build.outDir: '../dist/<lowercase-client>'`
  - `build.emptyOutDir: false`

Current client:
- Vintage Salon: `vintageSalon` source folder, deploys to `/vintagesalon/`.
- New DD: `newDD` static folder, deploys to `/newdd/`.

To add a new project:
1. Create a root folder for the client project.
2. Configure that project's build to output to `/dist/<lowercase-client>`.
3. Extend the root `netlify.toml` build command to also build the new project.
4. Link it from `index.html` if desired.

To remove a project:
1. Delete the project folder.
2. Remove its build/copy step from `netlify.toml`
3. Remove its link from `index.html` if present
4. Commit, push and deploy