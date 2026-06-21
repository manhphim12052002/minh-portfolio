---
phase: 5
title: "Link headers + verification"
status: complete
priority: P2
effort: "1h"
dependencies: [2, 3, 4]
---

# Phase 5: Link headers (RFC 8288) + verification

## Overview
Advertise agent resources via HTTP `Link` response headers on the homepage, then verify the
whole feature set end-to-end in production.

## Requirements
- Functional: homepage (and ideally all pages) returns `Link` headers pointing to real,
  existing resources (llms.txt, sitemap, RSS).
- Non-functional: static-host config (`_headers`), no code.

## Architecture
Cloudflare Pages serves a `_headers` file from the build output. Place it at `public/_headers`
so Astro copies it to `dist/_headers`. Point only at resources that exist after Phases 2–3.
Use IANA-registered relation types.

Example `public/_headers`:
```
/*
  Link: </llms.txt>; rel="llms-txt"; type="text/plain", </sitemap-index.xml>; rel="sitemap"; type="application/xml", </rss.xml>; rel="alternate"; type="application/rss+xml"
```
(Use absolute or root-relative URI-References per RFC 8288. `rel="describedby"` to `llms.txt`
is an acceptable registered alternative if a custom `llms-txt` rel is undesirable.)

## Related Code Files
- Create: `public/_headers`
- Read for context: `src/pages/rss.xml.ts`, sitemap output, Phase 3 `llms.txt`

## Implementation Steps
1. Create `public/_headers` with the `Link` header above; confirm each target resolves.
2. Choose relation types from IANA Link Relations; avoid inventing rels where a registered one
   fits (`sitemap`, `alternate`). Note: `api-catalog`/`service-doc` rels from the audit are
   **not** used — no API exists.
3. Build; confirm `dist/_headers` present.

## Verification (whole plan)
Run against production after deploy:
- [ ] `curl -sI https://manhphim.com/ | grep -i ^link` → Link header present, targets resolve
- [ ] `curl -s https://manhphim.com/robots.txt | grep -i content-signal` → directive present
- [ ] `curl -s https://manhphim.com/llms.txt` → valid index, links resolve
- [ ] `curl -H "Accept: text/markdown" https://manhphim.com/writing/<slug>` → markdown
- [ ] `curl https://manhphim.com/writing/<slug>.md` → markdown twin
- [ ] Browser load of every page unchanged (Lighthouse still ~100; no client JS added)
- [ ] (Optional) re-run isitagentready.com audit; confirm the 4 targeted checks pass and the
      8 skipped ones are understood as N/A

## Success Criteria
- [ ] `Link` header on homepage with resolving targets
- [ ] All verification curls pass in production
- [ ] `docs/` updated (codebase-summary + a short "agent discovery" note)

## Risk Assessment
- `_headers` ordering/format is strict on Cloudflare — validate with `curl -I` post-deploy.
- Linking to a non-existent resource is worse than no Link header; only list verified targets.
