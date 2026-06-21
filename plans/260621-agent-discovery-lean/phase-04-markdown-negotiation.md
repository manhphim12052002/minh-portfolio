---
phase: 4
title: "Markdown-for-Agents negotiation"
status: complete
priority: P1
effort: "1.5h"
dependencies: [2]
---

# Phase 4: Markdown-for-Agents content negotiation

## Overview
Serve markdown when an agent sends `Accept: text/markdown`, HTML otherwise — at the same URL.
A Cloudflare Pages Function intercepts requests and returns the Phase 2 `.md` twin.

## Requirements
- Functional: `GET /writing/<slug>` with `Accept: text/markdown` → the `.md` twin body,
  `Content-Type: text/markdown; charset=utf-8`; without that header → normal HTML.
- Non-functional: no SSR adapter; static build untouched; function only runs the negotiation.

## Architecture
Cloudflare Pages Functions coexist with static assets (confirmed:
developers.cloudflare.com/pages/functions/middleware/). `functions/_middleware.js` runs in
front of all assets. On a markdown-accepting request, map the path to its `.md` twin and
fetch it via `context.env.ASSETS.fetch`; on miss or non-markdown, `context.next()`.

Path mapping: `/p` → `/p.md`; `/p/` → `/p.md`; `/` → `/index.md`. Only rewrite when the twin
exists (check `response.ok`), else fall through to HTML so nothing breaks.

Also emit `Vary: Accept` on negotiated responses so caches don't serve markdown to browsers.

## Related Code Files
- Create: `functions/_middleware.js` (Cloudflare Pages Functions root, sibling of `dist`)
- Read for context: Phase 2 twin output paths

## Implementation Steps
1. Create `functions/_middleware.js` with `onRequest(context)`:
   - read `Accept`; if it does not include `text/markdown`, `return context.next()`.
   - derive `mdPath` from `url.pathname` (handle trailing slash + root → `/index.md`).
   - `const res = await context.env.ASSETS.fetch(new Request(new URL(mdPath, url.origin)))`.
   - if `res.ok`, return new `Response(res.body, { headers: { Content-Type: "text/markdown;
     charset=utf-8", "Vary": "Accept" } })`; else `context.next()`.
2. (Optional) add `x-markdown-tokens` estimate header to mirror Cloudflare's native feature —
   skip unless cheap; do not pull in a tokenizer dep (YAGNI).
3. Confirm Pages project deploys `functions/` (default). No `wrangler.toml` needed for Pages;
   if one is later added, keep `pages_build_output_dir = "dist"`.

## Fallback (if not self-hosting the function)
If the domain is a Cloudflare **Pro/Business proxied zone**, enable the native
**AI Crawl Control → Markdown for Agents** toggle instead (no code). The free Pages static
case is not covered by that toggle, so the function above is the primary path.

## Success Criteria
- [ ] `curl -H "Accept: text/markdown" https://manhphim.com/writing/<slug>` → markdown body +
      `Content-Type: text/markdown`
- [ ] Same URL without the header → HTML (unchanged)
- [ ] `Vary: Accept` present on negotiated responses
- [ ] Unknown paths with markdown Accept fall through cleanly (no 500s)

## Risk Assessment
- `_middleware.js` runs in front of *every* asset → keep it minimal and fail-open
  (`context.next()` on any error) so a bug can't take the site down.
- `context.env.ASSETS` binding name is the Pages default; verify in the deploy environment.
