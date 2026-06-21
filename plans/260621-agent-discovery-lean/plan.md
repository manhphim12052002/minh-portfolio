---
title: "Agent Discovery (Lean) — Cloudflare Pages"
status: complete
created: 2026-06-21
completed: 2026-06-21
scope: project
blockedBy: []
blocks: []
---

# Agent Discovery (Lean) — Cloudflare Pages

Make the portfolio agent-discoverable with the **4 features that actually fit a static
content site** on Cloudflare Pages. The audit listed 12 items; 8 advertise APIs/auth/MCP/
skills this site does not have and are **deliberately skipped** (see "Out of Scope").

## Decisions (locked)
- **Host/runtime:** Cloudflare Pages. HTTP `Link` headers via `public/_headers`;
  `Accept: text/markdown` content negotiation via a Pages Function (`functions/_middleware.js`).
  No SSR adapter — site stays 100% static; the function only intercepts markdown requests.
- **Scope:** Lean. Content Signals + Link headers + Markdown-for-Agents + llms.txt.

## Phases
| # | Phase | Status | Priority | Depends on |
|---|-------|--------|----------|------------|
| 1 | [Site config + Content Signals](phase-01-site-config-and-content-signals.md) | complete | P1 | — |
| 2 | [Markdown twins (.md endpoints)](phase-02-markdown-twins.md) | complete | P1 | — |
| 3 | [llms.txt index](phase-03-llms-txt.md) | complete | P2 | 1 |
| 4 | [Markdown-for-Agents negotiation](phase-04-markdown-negotiation.md) | complete | P1 | 2 |
| 5 | [Link headers + verification](phase-05-link-headers-and-verification.md) | complete | P2 | 2,3,4 |

> **Status:** All phases implemented. `astro check` clean; `npm run build` generates all
> `.md` twins, `llms.txt`, `robots.txt` (Content-Signal), and `_headers`. Static endpoints
> verified locally over HTTP. **Markdown negotiation (`functions/_middleware.js`) and `Link`
> headers require post-deploy verification** against Cloudflare's runtime — see Phase 5 curls.
> Deviation: about twin lives at `/about.md` (route `src/pages/about.md.ts`) rather than
> `/about/index.md`, to keep the middleware path mapping trivial (`/about` → `/about.md`).

## Key dependencies / prerequisites
- **Production domain: `https://manhphim.com`.** `astro.config.mjs` still points at the demo
  `astro-nano-demo.vercel.app`; Phase 1 sets `site` to `https://manhphim.com`. Every absolute
  URL (llms.txt, Link headers, robots sitemap) derives from it.
- Cloudflare Pages project must serve the `functions/` directory (default for Pages).
- **Content policy: `ai-train=no`** (block AI training; allow search + AI citation).

## Out of Scope (audited but N/A — documented, not implemented)
| Audited item | Why skipped |
|---|---|
| API catalog (RFC 9727) | No APIs to catalog |
| OAuth/OIDC discovery | No protected APIs |
| OAuth Protected Resource Metadata | No protected resources |
| auth.md | No auth / agent registration |
| MCP Server Card (SEP-1649) | Not running an MCP server |
| Agent skills index | No skills to expose |
| DNS for AI Discovery (DNS-AID) | No service endpoints; draft spec; needs DNSSEC |
| WebMCP | Experimental Chrome-only; adds JS to a no-JS site; no real tools |

Revisit only if the site gains a real backend, API, or MCP server.

## References
- Cloudflare Pages middleware: https://developers.cloudflare.com/pages/functions/middleware/
- Cloudflare Markdown for Agents (fallback toggle, Pro zone): https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- Content Signals: https://contentsignals.org/ · draft-romm-aipref-contentsignals
- RFC 8288 (Link header) · RFC 9727 §3 · IANA Link Relations
- llms.txt spec: https://llmstxt.org/
