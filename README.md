# Proposal Hub

This repository hosts client-specific proposal sites for Discrete Development.  
Each proposal lives in its own folder at the root of the repo and is deployed as a subpath under:

https://proposal.discrete-dev.com/

## Structure

The root directory contains one folder per client:

/proposalHub
    /vintageSalon  (actual proposal)
    /bucks  (example purpose only)
    /trinity  (example purpose only)
    ...

Each folder contains the **static build output** for that client's proposal site  
(e.g., `index.html`, CSS, JS, images, assets).

Netlify maps these folders directly to URL paths:

- /vintage → https://proposal.discrete-dev.com/vintage
- /bucks → https://proposal.discrete-dev.com/bucks
- /trinity → https://proposal.discrete-dev.com/trinity

## Deployment

This repo is connected to a dedicated Netlify site.  
Netlify is configured with:

- **Publish directory:** the root of this repo  
- **Build:** none (static files only)

Any commit to `main` triggers an automatic deploy.

## Adding a New Proposal

1. Build the client’s static site locally.
2. Create a new folder at the repo root (e.g., `/acmeCo`).
3. Drop the build output into that folder.
4. Commit and push.

Netlify will automatically deploy it to:

https://proposal.discrete-dev.com/acmeCo

## Removing a Proposal

1. Delete the client folder.
2. Commit and push.

The path will no longer be served.

## Notes

- This repo is intentionally separate from the main Discrete Development site.
- Each proposal is isolated to prevent cross-contamination or accidental overwrites.
- No shared build pipeline is used; each proposal is self-contained.