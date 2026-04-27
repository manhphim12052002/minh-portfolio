---
name: lumen-design
description: Use this skill to generate well-branded interfaces and assets for Lumen (personal design system — calm blue pastels, editorial serif + geometric sans, quiet tone), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

- `colors_and_type.css` — CSS variables for color, type, spacing, shadow, motion. Import this first.
- `assets/` — logo variants, placeholders. Copy what you need.
- `preview/` — individual design-system cards. Good reference for a single concept.
- `ui_kits/website/` — personal portfolio site (React + JSX via Babel)
- `ui_kits/writing/` — long-form article reader (React + JSX via Babel)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Core voice:** thoughtful, quietly confident, curious. Lowercase nav. Sentence-case headlines. "I"/"you" — never "we". No emoji in UI.

**Core visuals:** single blue per surface; Ember peach accent used sparingly (1:20 ratio); Ink (#1E3A5F) replaces black; flat solid backgrounds; soft cool-tinted shadows; soft but not pill-rounded corners; motion is calm by default with one considered spring-eased moment per view.

**Type:** Satoshi (primary, all body & most headings) + Clash Display (accent, very limited — hero titles only, 28px+) + JetBrains Mono (metadata/code). CSS var names: `--font-sans` (Satoshi), `--font-display` (Clash Display), `--font-mono`. `--font-serif` is kept as a legacy alias for `--font-display`.

**Icons:** Lucide at 1.75 stroke, sizes 16/20/24/32, `currentColor` only.
