# Agent Discovery

How this site exposes itself to AI agents / LLM crawlers. Lean set of 4 features that fit a
static content site on **Cloudflare Pages**. Production domain: `https://manhphim.com`.

## Features

| Feature | Where | Notes |
|---|---|---|
| **Content Signals** | `src/pages/robots.txt.ts` | `Content-Signal: search=yes, ai-input=yes, ai-train=no` — allow search + AI citation, block AI training. |
| **Markdown twins** | `src/pages/**/[...slug].md.ts`, `index.md.ts`, `about.md.ts` | Every entry + homepage/about reachable as `<path>.md` (raw markdown, `text/markdown`). |
| **llms.txt** | `src/pages/llms.txt.ts` | llmstxt.org index linking to the `.md` twins (absolute URLs). Served as `text/plain`. |
| **Markdown negotiation** | `functions/_middleware.js` | `Accept: text/markdown` on an HTML URL → serves the `.md` twin at the same URL, `Vary: Accept`. Fail-open. |
| **Link headers** | `public/_headers` | RFC 8288 `Link` to `llms.txt` (rel=llms-txt), sitemap, RSS. |

## Twin paths (markdown shadows the HTML URL + `.md`)
- `/` → `/index.md`
- `/about` → `/about.md`  *(route file `about.md.ts`, not `about/index.md` — keeps middleware mapping trivial)*
- `/writing/<slug>` → `/writing/<slug>.md`
- `/projects/<slug>` → `/projects/<slug>.md`
- `/work/<slug>` → `/work/<slug>.md`

The markdown-rendering helper is `src/lib/render-entry-markdown.ts` (shared by the twin routes).

## Constraints / decisions
- 100% static build; no SSR adapter. The Pages Function only runs the markdown negotiation.
- Twins serve the collection `body` (raw markdown/MDX source) — faithful and token-cheap.
- No API/auth/MCP/skills exist, so RFC 9727 API catalog, OAuth discovery, MCP cards, agent-skill
  indexes, DNS-AID, and WebMCP are intentionally **out of scope** (see the plan's "Out of Scope").

## Post-deploy verification
The Pages Function (`ASSETS` binding) and `_headers` only run on Cloudflare's runtime — verify in
production, not local `astro preview`:
```
curl -sI https://manhphim.com/ | grep -i ^link
curl -s https://manhphim.com/robots.txt | grep -i content-signal
curl -s https://manhphim.com/llms.txt
curl -H "Accept: text/markdown" https://manhphim.com/writing/<slug>   # → markdown
curl -H "Accept: text/markdown" https://manhphim.com/about            # → markdown (verify no pre-fn 301)
curl https://manhphim.com/writing/<slug>.md                          # → markdown twin
```

### Integration points to confirm post-deploy (from code review)
- **Trailing slash:** confirm CF Pages doesn't 301 `/about` → `/about/` *before* the Function runs
  (a pre-function redirect would break negotiation for that path).
- **Compression:** confirm `.md` twins aren't double-encoded — the middleware drops
  `Content-Encoding`/`Content-Length` and lets CF re-frame, so the body must arrive intact.
- **Cache keying:** confirm edge/shared caches honor `Vary: Accept` (set on both the twin branch
  and globally via `_headers`) so HTML is never served to a markdown request.
