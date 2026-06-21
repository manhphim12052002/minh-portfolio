---
phase: 1
title: "Site config + Content Signals"
status: complete
priority: P1
effort: "30m"
dependencies: []
---

# Phase 1: Site config + Content Signals

## Overview
Fix the placeholder `site` URL and declare AI content-usage preferences by extending the
already-dynamic `robots.txt` with `Content-Signal` directives.

## Requirements
- Functional: `astro.config.mjs` `site` points to the real production domain; `robots.txt`
  emits a valid `Content-Signal` line.
- Non-functional: no new deps; output stays static.

## Architecture
`src/pages/robots.txt.ts` already returns a dynamic `text/plain` response. Add a
`Content-Signal` directive inside the `User-agent: *` group (signals apply to the
preceding user-agent group, like `Allow`/`Disallow`).

## Related Code Files
- Modify: `astro.config.mjs` → `site: "https://manhphim.com"`
- Modify: `src/pages/robots.txt.ts`

## Implementation Steps
1. Replace `site: "https://astro-nano-demo.vercel.app"` with `site: "https://manhphim.com"`.
2. In `robots.txt.ts`, add the `Content-Signal` line + an explanatory comment.
   **Policy (confirmed): block AI training, allow search + AI citation:**
   ```
   User-agent: *
   Allow: /
   # Content usage preferences — https://contentsignals.org/
   Content-Signal: search=yes, ai-input=yes, ai-train=no

   Sitemap: https://manhphim.com/sitemap-index.xml
   ```
   (`Sitemap:` already derives from `import.meta.env.SITE`; just keep it absolute.)
3. **Verify exact syntax** against the raw draft before shipping — the comma-separated
   `name=yes|no` form is correct per contentsignals.org, but confirm signal names
   (`search`, `ai-input`, `ai-train`) and value casing:
   `curl -s https://www.ietf.org/archive/id/draft-romm-aipref-contentsignals-00.txt | grep -iA3 -m1 "content-signal"`

## Success Criteria
- [ ] `astro.config.mjs` `site` = real domain (no `astro-nano-demo`)
- [ ] `npm run build` succeeds; `dist/robots.txt` contains a `Content-Signal` line and the
      correct absolute `Sitemap:` URL
- [ ] `curl -s https://manhphim.com/robots.txt` shows the directive in production

## Risk Assessment
- Wrong domain → broken sitemap/llms.txt links downstream. Mitigate by confirming first.
- Content-Signal is a draft spec; syntax may shift. Low blast radius (a comment-like line);
  keep it isolated so it's easy to update.
