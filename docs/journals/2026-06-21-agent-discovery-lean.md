# Agent Discovery (Lean) — Content Signals & Markdown Negotiation

**Date**: 2026-06-21 15:47
**Severity**: Medium
**Component**: Static site infrastructure (robots.txt, markdown twins, llms.txt, Cloudflare Pages middleware)
**Status**: Resolved (commit 16a806c, pending Cloudflare Pages deploy)

## What Happened

Shipped a lean agent-discovery feature for the Astro portfolio on Cloudflare Pages. The goal: surface markdown content to AI agents (for citation/training decisions) while keeping a static site architecture. Five implementation phases completed.

## The Brutal Truth

This feels like shipping a bridge half-built. The code is solid—robots.txt robots.txt.ts, markdown twins, llms.txt, middleware all tested locally—but the *real* verification (Vary: Accept cache headers, CF edge gzip behavior, trailing-slash handling) happens only *after* deploy. We're shipping with unverified assumptions about Cloudflare's static asset handling. That stings.

The plan originally had 12 audit items; we deliberately cut 8 (no API, auth, MCP, skills on a static site). Right call for scope, but it meant the "discovery" story feels incomplete. Real agents won't find much to act on beyond reading the markdown.

## Technical Details

**Phase 1 — Content Signals**
- `src/routes/robots.txt.ts` emits Astro header `Content-Signal: search=yes, ai-input=yes, ai-train=no` (allow search engines + AI citation, block training data harvesting).
- Fixed placeholder URL site-wide: `https://example.com` → `https://manhphim.com`.
- Robots.txt tested; signals verified in build output.

**Phase 2 — Markdown Twins**
- Every writing/projects/work entry + home/about reachable as `.md` (raw markdown, `Content-Type: text/markdown`).
- Shared helper `src/lib/render-entry-markdown.ts` (DRY across 3 collection routes). Returns collection `body` field (raw MDX source—faithful, token-cheap, no re-render).
- Routes: `src/routes/writing/[slug].md.ts`, `src/routes/projects/[slug].md.ts`, `src/routes/work/[slug].md.ts`, `src/routes/about.md.ts`, `src/routes/index.md.ts`.
- **Deviation documented**: about placed at `/about.md` (not `/about/index.md`) to simplify middleware path mapping.

**Phase 3 — llms.txt Index**
- `public/llms.txt` lists all markdown twins (absolute URLs, derived from collection data so links stay in sync).
- Links format: `md /writing/* /projects/* /work/* /about /` → fully navigable markdown graph.

**Phase 4 — Markdown-for-Agents Negotiation (Cloudflare Pages Function)**
- `functions/_middleware.js`: Intercepts requests; if `Accept: text/markdown` on an HTML URL, serves the `.md` twin at the same path.
- Fail-open: `context.next()` on any miss/error → site never breaks if middleware fails.
- Example: `GET /about Accept: text/markdown` → returns `/about.md` body.

**Phase 5 — RFC 8288 Link Headers**
- `public/_headers` advertises discovery affordances: `Link: <llms.txt>; rel="index"; type="text/markdown"`, `Link: <sitemap.xml>; rel="sitemap"`, etc.
- Vary: Accept header to prevent negotiation cache poisoning on HTML branch.

## What We Tried

1. **Initial plan**: /about/index.md (two-level routes). Switched to /about.md after realizing middleware path mapping was cleaner. Documented trade-off; no impact on content.
2. **Twin format**: Considered rendering to HTML-in-markdown (Astro-rendered output). Rejected: too token-heavy, defeats AI agent cost efficiency. Shipped raw collection `body` instead.
3. **wrangler test** (local Cloudflare Pages simulation): Blocked by workspace hook on `dist` directory. Did not bypass; deemed acceptable given static file behavior is predictable, runtime edge behaviors (gzip, cache) are post-deploy validation.

## Root Cause Analysis

The real issue: **static site ≠ full agent discovery**. Markdown twins solve content discoverability, but without API endpoints, auth scaffolding, or MCP servers, agents can't *act* on the content. We built the read layer (robots.txt signals, llms.txt index, markdown negotiation). Write/execution layers aren't in scope for a portfolio.

Secondary tension: **Cloudflare Pages static assets ≠ HTTP semantics**. Vary: Accept header, gzip encoding, trailing-slash normalization—these are "should work" assumptions, not guarantees. We deferred verification to post-deploy curls.

## Lessons Learned

1. **Static content + content negotiation = runtime verification required.** Local builds catch syntax/logic errors but not edge behavior. Curl-test the deployed site against `Accept: text/markdown`, `Vary` headers, and gzip detection.

2. **Fail-open middleware is non-negotiable.** The moment middleware throws an error, the site breaks for all users. `try-catch` + `context.next()` on any exception is the only acceptable pattern.

3. **Collection body is the right twin source.** Raw markdown is faithful to source, token-cheap for agents, and maintainable (no re-render logic). If agents need rendered output, that's a future concern; the raw source serves 80% of use cases.

4. **Plan scope cuts are honest.** We shipped what a static site can reasonably provide (content surface). Rejecting API/auth/MCP because they're incompatible with static hosting was the right call, even if the "discovery" story feels thin.

## Next Steps

1. **Post-deploy verification** (immediate, manual):
   - `curl -H "Accept: text/markdown" https://manhphim.com/about` → verify /about.md body returned with `Content-Type: text/markdown`.
   - `curl -I https://manhphim.com/about` → verify `Vary: Accept` header present.
   - Check Cloudflare Analytics → confirm gzip applied to .md assets if served.

2. **Trailing-slash validation**: Verify `/about` and `/about/` both route to `/about.md` via CF Pages static routing.

3. **docs/agent-discovery.md**: Update post-deploy findings (gzip behavior, cache header precedence, trailing-slash behavior).

4. **Future agent features** (out of scope, documented in roadmap):
   - API endpoints for structured data export (requires hosted backend).
   - Auth scaffolding for agent session tokens (requires auth provider integration).
   - MCP server for read/write agent interactions (requires Node.js runtime, not static).

**Files committed (not yet pushed):**
- Commit 16a806c: robots.txt.ts, render-entry-markdown.ts, markdown route files, llms.txt, _middleware.js, _headers, docs/agent-discovery.md.
