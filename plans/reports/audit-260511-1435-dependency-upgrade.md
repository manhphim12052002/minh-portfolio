# Dependency Audit & Upgrade Plan

**Date:** 2026-05-11
**Scope:** `package.json` revision audit + clean dependency graph

## Current vs Target

| Package | Current | Target | Type | Notes |
|---|---|---|---|---|
| astro | 4.5.6 | 6.3.1 | dep | 2 majors; content layer migration required |
| @astrojs/check | 0.5.9 | 0.9.9 | **devDep** | TS 5/6 support |
| @astrojs/mdx | 2.2.0 | 5.0.4 | dep | 3 majors; Astro 6 peer |
| @astrojs/rss | 4.0.5 | 4.0.18 | dep | patch |
| @astrojs/sitemap | 3.1.1 | 3.7.2 | dep | minor |
| @astrojs/tailwind | 5.1.0 | **REMOVED** | — | incompatible with Astro 6 + Tailwind 4 (peer: astro ^3‖^4‖^5, tw ^3) |
| @tailwindcss/vite | — | 4.3.0 | dep | **NEW** — replaces @astrojs/tailwind |
| tailwindcss | 3.4.1 | 4.3.0 | dep | CSS-first config; `@theme` migration |
| @tailwindcss/typography | 0.5.10 | 0.5.19 | dep | patch — load via `@plugin` |
| tailwind-merge | 2.2.2 | 3.6.0 | dep | major; API stable for our `cn()` |
| clsx | 2.1.0 | 2.1.1 | dep | patch |
| sharp | 0.33.3 | 0.34.5 | dep | minor |
| typescript | 5.4.2 | 6.0.3 | **devDep** | major; under @typescript-eslint upper bound (<6.1.0) |
| eslint | 8.57.0 | 10.3.0 | **devDep** | 2 majors; flat config required |
| eslint-plugin-astro | 0.32.0 | 1.7.0 | **devDep** | out of beta |
| @typescript-eslint/eslint-plugin | 7.3.1 | 8.59.2 | **devDep** | major |
| @typescript-eslint/parser | 7.3.1 | 8.59.2 | **devDep** | major |
| eslint-plugin-jsx-a11y | 6.8.0 | **REMOVED** | — | unused (not in `extends`); no JSX in repo |

## Dep Graph Cleanup

- Split **dependencies** vs **devDependencies** (currently all in `dependencies`).
- Bump `.nvmrc`: `22` → `22.13.0` (ESLint 10 requires `^22.13.0`; Astro 6 requires `>=22.12.0`).
- Bump `packageManager` to `pnpm@10` (current 9.15.2).

## Peer Dependency Verification

- astro 6 → node `>=22.12.0` ✓
- @astrojs/mdx 5 → `astro ^6` ✓
- @astrojs/check 0.9.9 → `typescript ^5 || ^6` ✓
- @typescript-eslint 8.59.2 → `typescript >=4.8.4 <6.1.0` ✓ (TS 6.0.3 in range)
- @tailwindcss/vite 4 → `vite ^5.2 || ^6 || ^7 || ^8` ✓ (Astro 6 ships Vite 7)
- @tailwindcss/typography → `tailwindcss >=4.0.0-beta.1` ✓
- eslint 10 → node `^20.19.0 || ^22.13.0 || >=24` ✓ (after .nvmrc bump)

## Breaking Change Migrations

### Astro 4 → 6 (Content Layer API)
- Move `src/content/config.ts` → `src/content.config.ts`
- Replace `type: "content"` with `loader: glob({ pattern, base })`
- `entry.slug` → `entry.id`
- `await entry.render()` → `render(entry)` from `astro:content`

### Tailwind 3 → 4
- Drop `tailwind.config.mjs`
- Add `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"` to `global.css`
- Migrate color/font/radius tokens via `@theme inline { --color-*: var(--lumen-*); }`
- Add `@custom-variant dark (&:where(.dark, .dark *))` (preserve current `html.dark` selector)
- Move Tailwind from Astro integration → Vite plugin in `astro.config.mjs`

### ESLint 8 → 10 (Flat Config)
- Replace `.eslintrc.cjs` → `eslint.config.mjs`
- Remove `.eslintignore` (use `ignores` array)
- Drop unused `eslint-plugin-jsx-a11y`

## Files Touched

- `package.json` (rewrite)
- `.nvmrc` (bump)
- `astro.config.mjs` (Vite plugin)
- `tailwind.config.mjs` (DELETE)
- `src/styles/global.css` (Tailwind 4 directives + `@theme`)
- `src/content/config.ts` → `src/content.config.ts` (loader API)
- `src/pages/{index,projects/index,projects/[...slug],writing/index,writing/[...slug],work/index,rss.xml}.{astro,ts}` (`.slug`→`.id`, `render()`)
- `src/components/ArrowCard.astro` (`.slug`→`.id`)
- `.eslintrc.cjs` → `eslint.config.mjs`
- `.eslintignore` (DELETE)
- `pnpm-lock.yaml` (regenerated)

## Validation
1. `pnpm install` — zero peer warnings
2. `pnpm astro check` — type clean
3. `pnpm build` — production build succeeds
4. `pnpm dev` — manual sanity (optional)

## Unresolved
- Heading-ID anchor links may shift (Astro 6 no longer strips trailing hyphens). Repo has minimal MDX; likely no impact — verify after build.
- Script/style render ordering reversed in Astro 6 — verify no order-dependent CSS layering breaks.
