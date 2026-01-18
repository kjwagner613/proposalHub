# Proposal Hub

This repository hosts client-specific proposal sites for Discrete Development.  
Each proposal lives in its own folder at the root of the repo and is built into a subpath under:

https://proposal.discrete-dev.com/

## Structure

The root directory contains one folder per client project:

/proposalHub
    /vintageSalon  (actual proposal - source project)
    /bucks  (example purpose only)
    /trinity  (example purpose only)
    ...

Each folder contains the **source** for that client's proposal site.  
Build output is generated under `/dist/<client>`.

Netlify maps `/dist/<client>` folders directly to URL paths:

- /vintagesalon → https://proposal.discrete-dev.com/vintagesalon
- /bucks → https://proposal.discrete-dev.com/bucks
- /trinity → https://proposal.discrete-dev.com/trinity

## Deployment

This repo is connected to a dedicated Netlify site.  
Netlify is configured with:

- **Publish directory:** `/dist`  
- **Build:** builds each client project into `/dist/<client>`

Any commit to `main` triggers an automatic deploy.

## Adding a New Proposal

1. Create a new folder at the repo root (e.g., `/acmeCo`).
2. Add a project (Vite, static HTML, etc.) that can build to `/dist/acmeCo`.
3. Add a build step for the new project in `netlify.toml`.
4. Commit and push.

Netlify will automatically deploy it to:

https://proposal.discrete-dev.com/acmeco

## Removing a Proposal

1. Delete the client folder and its build step in `netlify.toml`.
2. Commit and push.

The path will no longer be served.

## Notes

- This repo is intentionally separate from the main Discrete Development site.
- Each proposal is isolated to prevent cross-contamination or accidental overwrites.
- The Netlify build aggregates outputs into `/dist`.
