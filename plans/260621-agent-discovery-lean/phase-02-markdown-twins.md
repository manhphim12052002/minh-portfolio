---
phase: 2
title: "Markdown twins (.md endpoints)"
status: complete
priority: P1
effort: "2h"
dependencies: []
---

# Phase 2: Markdown twins (.md endpoints)

## Overview
Emit a raw-markdown twin for every content entry and key page so agents can fetch clean,
token-cheap text. These static `.md` files are the payload Phase 4's negotiation serves.

## Requirements
- Functional: each `writing`, `projects`, `work` entry is reachable as `<path>.md`;
  the homepage/about have markdown twins too.
- Non-functional: build-time static generation (no SSR), no new runtime deps.

## Architecture
Content lives in `src/content/{writing,projects,work}` as `.md`/`.mdx` via the glob loader.
Astro static endpoints (`.ts` files exporting `GET` + `getStaticPaths`) render one `.md`
file per entry into the static output. The collection `body` holds the raw markdown source —
prefer serving `body` (cheap, faithful) over re-rendering HTML.

Route shape (mirror the existing HTML routes so twins sit at `<html-path>.md`):
- `src/pages/writing/[...slug].md.ts` → `/writing/<slug>.md`
- `src/pages/projects/[...slug].md.ts` → `/projects/<slug>.md`
- `src/pages/work/[...slug].md.ts` → `/work/<slug>.md` (work has no detail HTML page today;
  twins are still useful for agents — confirm slugs from the collection)
- Static pages: `src/pages/index.md.ts`, `src/pages/about/index.md.ts` (hand-authored or
  derived from `consts.ts` + content).

## Related Code Files
- Create: `src/pages/writing/[...slug].md.ts`
- Create: `src/pages/projects/[...slug].md.ts`
- Create: `src/pages/work/[...slug].md.ts`
- Create: `src/pages/index.md.ts`, `src/pages/about/index.md.ts`
- Read for context: `src/pages/writing/[...slug].astro`, `src/content.config.ts`, `src/consts.ts`

## Implementation Steps
1. For each collection route, `getStaticPaths` over `getCollection("<name>")` filtering
   `draft !== true`; map each entry to `params: { slug: entry.id }`, `props: { entry }`.
2. In `GET`, build a markdown string: a frontmatter-style title block (title/description/date
   from `entry.data`) + a blank line + `entry.body`. Return
   `new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })`.
3. Factor the title-block + body assembly into one helper in `src/lib/` (DRY across routes),
   e.g. `src/lib/render-entry-markdown.ts`. Keep each route file < 200 lines (trivially is).
4. For `index.md`/`about/index.md`, assemble from `consts.ts` (SITE/HOME/about content).
5. `npm run build` and confirm `dist/writing/<slug>.md` etc. exist and contain raw markdown.

## Success Criteria
- [ ] Every non-draft entry has a `.md` twin in `dist/`
- [ ] `curl https://manhphim.com/writing/<slug>.md` returns markdown, `Content-Type: text/markdown`
- [ ] No HTML pages broken; `astro check` clean

## Risk Assessment
- MDX entries embed components (e.g. YouTube embed) — `body` contains raw MDX, not rendered
  HTML. Acceptable for agents (they get source). If a clean text fallback is wanted, strip
  known component tags in the helper. Note this; don't over-engineer.
- `work` slugs: confirm the collection ids; the route must match however links are formed
  elsewhere.
