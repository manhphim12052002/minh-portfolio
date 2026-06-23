---
title: "Content Strategy Site IA"
description: "Update Minh portfolio content surfaces, IA, and agent-facing markdown after old project removal."
status: complete
priority: P2
effort: 5h
branch: codex/content-strategy-site-ia
tags: [feature, frontend, content]
blockedBy: []
blocks: []
created: 2026-06-23
---

# Content Strategy Site IA

## Overview
Implement approved content strategy: remove old startup/project references, keep tagline, update bio, expand IA to `/writing`, `/notes`, `/reading`, `/now`, `/work`, `/projects`, `/about`. Static Astro site; content collections drive list/detail pages via `getCollection`, metadata flows through `PageLayout` into `Head`.

## Verified Anchors
- README confirms Astro/Tailwind/TS static theme commands: `README.md:48`.
- Metadata + homepage limits live in `src/consts.ts:3`; tagline already in `HOME.DESCRIPTION` at `src/consts.ts:11`.
- Existing collections are `writing`, `work`, `projects` only: `src/content.config.ts:5`, `src/content.config.ts:15`, `src/content.config.ts:25`, exported at `src/content.config.ts:37`.
- Header nav is hard-coded: `src/components/Header.astro:8`.
- Homepage pulls all three current collections: `src/pages/index.astro:12`, `src/pages/index.astro:17`, `src/pages/index.astro:22`; old project bio visible at `src/pages/index.astro:45`.
- Markdown homepage twin repeats old project bio and collection slices: `src/pages/index.md.ts:11`, `src/pages/index.md.ts:29`.
- About HTML + markdown twins mention the old project: `src/pages/about/index.astro:17`, `src/pages/about.md.ts:9`.
- Old project content to delete: removed work/project entry files.
- Agent discovery surfaces link collection `.md` twins through `llms.txt`: `src/pages/llms.txt.ts:12`; middleware maps `/path` to `/path.md`: `functions/_middleware.js:34`.

## Data Flow
1. Markdown/MDX content enters `src/content/*`, validated by `src/content.config.ts`, queried by `getCollection`.
2. HTML pages sort/filter entries, render page copy through `PageLayout`, then `Head` emits SEO/social metadata at `src/components/Head.astro:39`.
3. Markdown twins (`*.md.ts`) transform same content into `text/markdown` via `renderEntryMarkdown` at `src/lib/render-entry-markdown.ts:23`.
4. `/llms.txt` exits as agent index; Cloudflare middleware serves markdown twins on `Accept: text/markdown`.

## Dependency Graph
| Phase | Depends on | Owns files |
|---|---|---|
| 1. Content model + seed content | none | `src/content.config.ts`, `src/content/notes/**`, `src/content/reading/**`, `src/content/now/**` |
| 2. IA routes + nav | 1 | `src/components/Header.astro`, `src/consts.ts`, `src/pages/notes/**`, `src/pages/reading/**`, `src/pages/now/**` |
| 3. Old project removal + core copy | 1 | removed work/project entry files, `src/pages/index.astro`, `src/pages/index.md.ts`, `src/pages/about/index.astro`, `src/pages/about.md.ts` |
| 4. Agent/RSS discovery alignment | 1,2,3 | `src/pages/llms.txt.ts`, `src/pages/rss.xml.ts`, `docs/agent-discovery.md` |
| 5. Validation | 1-4 | no source ownership; verify only |

No two parallel phases own same file. Run serially unless splitting by the ownership table.

## Tasks
1. Add `notes`, `reading`, `now` collections with smallest useful schemas. Reuse `writing` patterns. Seed at least one non-draft entry per new list route or implement empty states.
2. Create `/notes`, `/reading`, `/now` HTML pages. For `/notes` and `/reading`, mirror `writing/index.astro` grouping/list pattern. For `/now`, use one static page or one latest collection entry; keep KISS.
3. Add markdown twins for new public surfaces so agent discovery stays complete: `/notes.md` or per-entry twins as applicable, `/reading.md`, `/now.md`.
4. Update header order to approved IA: writing, notes, reading, now, work, projects, about.
5. Replace homepage/about copy with approved bio: "Engineer at TomTom in Amsterdam. Writing about distributed systems, what I'm learning along the way, and the life around the work." Keep tagline exactly.
6. Delete old project work/project files and ensure no removed-project references remain in `src`.
7. Update `/llms.txt` to include new surfaces and omit removed-project entries. Decide whether RSS should include notes/reading; if included, preserve stable links.
8. Update `docs/agent-discovery.md` if markdown twin route inventory changes.

## Risks
| Risk | LxI | Mitigation |
|---|---:|---|
| Empty new collections break build or render blank pages | Medium x Medium | Add seed content or explicit empty-state branch before route render. |
| Markdown negotiation returns HTML for new IA | Medium x High | Add `.md.ts` twins matching middleware mapping `/path` -> `/path.md`. Verify with local build output and post-deploy curl. |
| Removed project still leaks through generated indexes | Medium x High | Search `src docs` for removed-project terms after deletion. |
| New collection schemas overfit future content | Medium x Medium | Minimal fields only: title, description, date, draft, optional URL/status when proven needed. |
| Header wraps poorly with 7 nav items | Medium x Medium | Check mobile width; reduce gap/font before introducing menu complexity. |

## Backcompat + Rollback
- Preserve existing `/writing`, `/work`, `/projects`, `/about` URLs and `.md` twins.
- Deleting the old project intentionally removes its project/work detail URLs; acceptable breaking content removal per decision. If rollback needed, restore deleted files from git and revert nav/copy/collection additions in one commit.
- New routes are additive; rollback by removing their collection entries, route files, constants, header links, and llms/rss references.

## Test Matrix
| Level | Checks |
|---|---|
| Static/type | `pnpm run build`; includes `astro check && astro build` from `package.json:8`. |
| Lint | `pnpm run lint`. |
| Content | Removed-project reference search across `src docs` returns no unwanted matches. |
| Routes | Verify built pages for `/writing`, `/notes`, `/reading`, `/now`, `/work`, `/projects`, `/about`; verify expected `.md` twins in `dist`. |
| Agent | `pnpm run preview`, curl `/llms.txt`, `/now.md`, and `Accept: text/markdown` for each new HTML route. |
| Visual | Desktop + mobile smoke check header wraps and page list layouts. |

## Success Criteria
- Approved IA visible in header in exact route set/order.
- Homepage/about show approved bio, no old project mention, tagline unchanged.
- Old work/project content removed from source and generated indexes.
- New `/notes`, `/reading`, `/now` pages build, have metadata, and are discoverable in markdown/llms surfaces.
- `pnpm run build` and `pnpm run lint` pass.

## Unresolved Questions
- Should `/notes` be included in RSS, or kept off-feed as short-form only?
- Should `/reading` entries be full pages or a single reading-log list with outbound links?
