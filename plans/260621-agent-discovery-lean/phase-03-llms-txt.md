---
phase: 3
title: "llms.txt index"
status: complete
priority: P2
effort: "1h"
dependencies: [1]
---

# Phase 3: llms.txt index

## Overview
Publish `/llms.txt` — the de-facto agent entrypoint: a markdown index of the site with links
to the `.md` twins. Highest-ROI agent feature for a content site (not in the audit, added).

## Requirements
- Functional: `/llms.txt` returns markdown per the llmstxt.org structure (H1 title, blockquote
  summary, then `## Section` lists of `[title](url): note` links).
- Non-functional: build-time static; absolute URLs using `astro.config.mjs` `site`.

## Architecture
Single static endpoint `src/pages/llms.txt.ts` exporting `GET`. Pull `SITE`/`HOME` from
`consts.ts` and entries from the three collections; emit links to the **`.md` twins** from
Phase 2 (agents prefer markdown targets). Use `import.meta.env.SITE` for absolute URLs.

## Related Code Files
- Create: `src/pages/llms.txt.ts`
- Read for context: `src/consts.ts`, `src/content.config.ts`, Phase 2 twin routes

## Implementation Steps
1. Build sections: `## Writing`, `## Projects`, `## Work` — each a bullet list of
   `- [<title>](<abs-url>.md): <description>` for non-draft entries, sorted by date desc.
2. Header: `# Minh Pham` + `> ` blockquote from `HOME.DESCRIPTION`; optional `## About` link.
3. Return `text/plain; charset=utf-8` (llms.txt convention) — it is markdown content but the
   spec serves it as a `.txt`.
4. (Optional, defer unless asked) `llms-full.txt` concatenating all bodies — skip for now (YAGNI;
   the per-entry twins already cover full content).

## Success Criteria
- [ ] `dist/llms.txt` exists with valid llmstxt.org structure and absolute `.md` links
- [ ] All links resolve (cross-check against Phase 2 twins)
- [ ] `curl https://manhphim.com/llms.txt` returns the index

## Risk Assessment
- Stale links if twin route shape changes — generate links from the same collection data, not
  hardcoded paths, so they stay in sync.
