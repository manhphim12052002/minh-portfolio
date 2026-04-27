# Lumen — Personal Design System

**Lumen** is a personal design system for all digital presence: personal website, writing, slide decks, resume, and any small products or side projects. It is designed for one person to use across surfaces and stay recognizable.

The name *Lumen* comes from the SI unit of luminous flux — a quiet measure of light. It reflects the system's character: calm, considered, with a warmth you can actually feel.

> **Status:** v0.1 — built from defaults since no external brand materials, codebase, or references were attached. The palette direction is **calm blue pastels** with a single warm accent (peach). Type pairs an editorial serif (Newsreader) with a clean geometric sans (Figtree). This doc and the tokens should be treated as a starting point — iterate freely.

## Sources consulted
*No codebase, Figma files, decks, or existing brand assets were provided. This system was generated from the brief:*

> *"My personal design system for all my digital presence, digital product, etc... I prefer calm, enthusiastic, blue pastel tone. Minimalism but with some slick interactions."*

If you have prior brand materials (a logo, past website, references, a portfolio), drop them in via the Import menu and I'll re-anchor the system to them.

---

## Content Fundamentals

Lumen's voice is **thoughtful, quietly confident, and curious** — not loud, not salesy, not self-deprecating. The reader should feel like they're being walked through something interesting by someone who has actually thought about it.

### Voice rules

| Do | Don't |
|---|---|
| Use **"I"** for first-person work; **"you"** when addressing the reader directly | Use royal "we" for a solo practice |
| Write sentences that could be read aloud | Stack clauses until the reader gets lost |
| Open with a concrete observation, then generalize | Open with buzzwords or a mission statement |
| Use em-dashes — for asides — sparingly | Overuse parentheses or semicolons |
| Lowercase navigation and UI labels (`about`, `writing`, `work`) | TITLE CASE EVERYTHING |
| Sentence case for headlines | Title Case For Headlines |
| Plain words: *use, start, build, think* | Jargon: *leverage, utilize, ideate, synergize* |

### Tone examples

**Hero copy, portfolio homepage**
> *Building quiet tools with careful attention.*
> *I design and build small digital things. Some ship, some don't — each teaches me something about making the next one calmer.*

**About page opening**
> *Hi, I'm [Name]. I spend my days designing interfaces and my evenings reading about why they fail. This site collects both.*

**Project case-study intro**
> *This started as a tiny irritation: my notes app ate my formatting every time I pasted. I spent a weekend fixing it. Then a year.*

**Blog post opening**
> *There is a moment, about three weeks into any design project, when the metaphor you chose at the start stops working.*

**Empty state**
> *Nothing here yet. Start by writing something small.*

**404**
> *This page wandered off. Try the home page, or send me a note if you were expecting something here.*

**Signing off an email**
> *— [Name]*  *(not "Best," not "Cheers")*

### Casing conventions
- **Navigation & UI labels:** lowercase — `about`, `writing`, `work`, `now`
- **Headlines:** sentence case — *"A small system for a quiet life online"*
- **Buttons:** sentence case, verbs — *"Read the post"*, *"Download CV"*
- **Metadata:** small caps via eyebrow style — `MARCH 2026 · 8 MIN READ`

### Emoji & punctuation
- **Emoji:** avoid in the system itself. In writing, fine but sparing — one per post, max, and never in navigation.
- **Em-dash (—):** yes, for asides and pauses.
- **Ampersand (&):** fine in body copy, never in UI labels.
- **Ellipses (…):** only for genuine trailing thought, never for "loading".

### Numerals
- **Spell out** one through nine in prose.
- **Numerals** for 10+, all measurements, and anything tabular.
- Use **real typographic quotes** — `"` `'`, never `"` `'`.

---

## Visual Foundations

### Color

The palette is built around a single gradient from **Mist** (near-white with blue bias) down to **Night** (deep ink blue), with a warm **Ember** accent used at roughly a 1:20 ratio against the blues. Never use pure black (`#000`) or pure white (`#fff`) for body surfaces — both feel clinical against the cool palette. Default to `--lumen-mist` and `--lumen-night`.

**Three usage rules**
1. **One blue at a time** for a given surface. Don't stack Horizon on Sky on Cloud in the same frame — pick one and let it breathe.
2. **Ember is a whisper, not a highlight.** Use it for a single element per view: one tag, one underline, one hover. If you're using it twice, it's too much.
3. **Deep blue does the work of black.** Headlines, body text, hairlines — all `--lumen-ink` (`#1E3A5F`), never true black.

### Typography

- **Primary: Satoshi** — **self-hosted** from `fonts/` (brand files: Light 300, Regular 400, Medium 500, Bold 700, Black 900, plus matching italics). Covers nearly everything — body (400), UI labels (500), subheads (600/700), strong emphasis (700+). Geometric, warm, legible.
- **Accent: Clash Display** (Fontshare CDN) — **very limited use.** Reserved for the largest display moments (hero h1, page titles, pull quotes, the wordmark). Weight 500 on display sizes. If you're using Clash at anything under 28px, switch to Satoshi.
- **Mono: JetBrains Mono** (Google Fonts). Used for code, metadata, and the occasional timestamp or coordinate.

Body sizes never go below 14px. Display sizes go as large as you dare — 88px is not too much on a hero.

> **Font source:** Satoshi ships with the kit in `fonts/` (10 .otf files). Clash Display still pulls from `api.fontshare.com`. JetBrains Mono from Google Fonts. **Italics exist in Satoshi but are not used in the system** — emphasis is done with weight, not slant.

### Spacing & layout
- **4px base unit.** All spacing tokens snap to 4.
- **Layout grids:** 12-column on desktop with 24px gutter; 4-column on mobile with 16px gutter.
- **Max reading width:** 640px for long-form prose, 1120px for app/dashboard content.
- **Breathing room:** favor more space over more content. If a section feels tight, remove something — don't add.

### Backgrounds
- Default to **flat solid color** — `--lumen-mist` or `--lumen-cloud`.
- Occasionally a **soft radial wash** from `--lumen-sky` to `--lumen-mist` in the top-left quadrant of a hero. Never full-bleed gradient.
- **No noise grain, no dotted patterns, no textures.** The system is flat and confident.
- **No full-bleed photography by default.** When photography is used (see Imagery below), it sits inside a rounded container with generous margins.

### Borders & dividers
- Hairlines are 1px, color `--border` (`--lumen-stone-100`). Almost invisible — they should suggest structure, not draw attention.
- Avoid double borders. If a card has a shadow, it doesn't need a border.
- **Full-bleed dividers:** 1px `--divider`, generous vertical margin (at least `--space-12`).

### Shadows
Shadows are cool-tinted (rgba of `--lumen-ink`) and soft. Four levels: `xs`, `sm`, `md`, `lg`. Never stack more than one. No colored/glowing shadows except the focus ring (`--glow-accent`).

### Corner radii
Generally **soft but not rounded-pill**:
- Inputs, small buttons: `--radius-sm` (8px)
- Cards, panels: `--radius-md` (12px)
- Hero/feature containers: `--radius-lg` (18px)
- Images: `--radius-lg` (18px)
- Pills, tags, avatar: `--radius-full`

### Cards
The canonical card: `--bg-raised` background, `--radius-md` corners, `--shadow-sm`, **no border**. On hover: `--shadow-md` and a 2px rise (`translateY(-2px)`). Transition at `--dur-base` with `--ease-out`.

### Motion
The brief asked for "slick interactions." Lumen's answer: **calm by default, one considered moment per view.**

- **Default transitions:** `--dur-base` (220ms) with `--ease-out`. Fast enough to feel snappy, slow enough to read.
- **Hover states:** `opacity: 0.85` *or* background shift to `--accent-soft`, never both. Buttons add a 1px rise.
- **Press states:** `scale(0.98)` + `--shadow-xs`. Never color change alone.
- **Page transitions:** a single fade-in of content from `opacity: 0 translateY(8px)` over 420ms, staggered 40ms per element.
- **The "one moment" per view:** a single element gets a magnetic cursor hover, a spring-eased reveal, or a subtle parallax. Pick one and commit. Don't decorate.

### Transparency & blur
- `backdrop-filter: blur(12px)` on floating UI (navigation, modal scrims) over `rgba(255,255,255,0.72)` in light mode, `rgba(14,18,32,0.72)` in dark.
- Avoid translucent cards on busy backgrounds — they read as "early 2020s design trend" and Lumen is older than that.

### Imagery (when used)
- **Palette-aware:** photos should lean cool — blues, grays, desaturated greens. Avoid heavy warm casts.
- **Treatment:** no filters, no grain, no duotones by default. Let good photography be photography.
- **If no real imagery:** use a labeled placeholder block (`--lumen-sky` fill, `--lumen-ink` 1px border, centered caption in mono). **Never generate fake SVG illustrations.**

### Fixed elements & layout rules
- **Top nav** is position-sticky, `backdrop-filter` glass, no shadow, 1px bottom `--divider` only when scrolled.
- **Footer** is static, cozy type, lots of air above.
- Page headers never extend full bleed below 72em — even on wide monitors, content sits in a centered 1120px container.

### Protection treatments
- Where text sits over imagery, use a soft vertical gradient from `rgba(14,32,56,0)` to `rgba(14,32,56,0.55)` — never a solid scrim, never a colored wash.
- Avoid floating capsules-over-image as a pattern; Lumen's imagery rarely warrants it.

---

## Iconography

Lumen uses **Lucide** icons from CDN. They match the visual character: 24px stroke-based, 1.75px stroke weight, rounded line caps, minimal flourish. The stroke weight is slightly heavier than Lucide's 1.5 default to read well against pastel backgrounds — apply `stroke-width="1.75"` globally.

**Rules**
1. **One icon style throughout.** Don't mix Lucide with Heroicons or Tabler.
2. **Size snap:** 16 / 20 / 24 / 32. Nothing in between.
3. **Color snap:** `currentColor`. Never hard-coded.
4. **No decorative icons in prose.** An icon next to every list bullet is a tell. Use them where they do work: affordances, navigation, metadata.
5. **No emoji as icons.** Emoji are for human expression in writing, never in UI.
6. **No unicode glyphs** as icons (❯, ✓, ★) — use Lucide's equivalent (`chevron-right`, `check`, `star`).

**Logo:** a simple monogram — a lowercase `l` inside a rounded square, color `--lumen-ink` on `--lumen-mist` (or inverted for dark mode). See `assets/logo.svg`. Since no personal logo was provided, this is a placeholder — **please replace with your real mark or ask me to design variants.**

**CDN usage**
```html
<script src="https://unpkg.com/lucide@0.462.0/dist/umd/lucide.min.js"></script>
<i data-lucide="sparkle" style="width:20px;height:20px;stroke-width:1.75"></i>
<script>lucide.createIcons();</script>
```

---

## Repo layout

```
.
├── README.md                 ← you are here
├── SKILL.md                  ← agent skill entry point (for Claude Code et al)
├── colors_and_type.css       ← CSS variables for color, type, spacing, motion
├── fonts/                    ← webfont files (currently: Google Fonts via @import)
├── assets/                   ← logos, icons, imagery
│   ├── logo.svg
│   ├── logo-mono.svg
│   ├── logo-dark.svg
│   └── placeholder-portrait.svg
├── preview/                  ← design-system tab cards (one concept each)
├── ui_kits/
│   ├── website/              ← personal portfolio site
│   │   ├── README.md
│   │   ├── index.html
│   │   └── *.jsx
│   └── writing/              ← blog / long-form reading surface
│       ├── README.md
│       ├── index.html
│       └── *.jsx
└── slides/                   ← slide template (not generated — no deck attached)
```

## Index

- **Foundations** → `colors_and_type.css` + this README's *Visual Foundations*
- **Content voice** → this README's *Content Fundamentals*
- **Iconography** → this README's *Iconography*
- **Preview cards** → `preview/` (auto-registered for the Design System tab)
- **UI kits** → `ui_kits/website/index.html`, `ui_kits/writing/index.html`
- **Skill entry** → `SKILL.md`

## Known caveats / asks

1. **No logo was provided** — the monogram in `assets/logo.svg` is a placeholder. Replace it, or ask me to design 3–5 variants.
2. **Fonts are Google Fonts stand-ins.** If you license a specific serif (Lyon, GT Sectra, etc.), drop it in `fonts/` and I'll swap it in.
3. **No slide template** was attached, so `slides/` is omitted. If you want talk/pitch templates, ask and I'll generate 4–6 slide types.
4. **Content examples are illustrative.** Give me your actual bio, project titles, and any past writing and I'll re-populate the UI kits with real copy.
