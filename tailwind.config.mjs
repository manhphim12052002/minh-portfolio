import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Lumen palette ---- */
        mist:           "var(--lumen-mist)",
        cloud:          "var(--lumen-cloud)",
        sky:            "var(--lumen-sky)",
        horizon:        "var(--lumen-horizon)",
        azure:          "var(--lumen-azure)",
        deep:           "var(--lumen-deep)",
        ink:            "var(--lumen-ink)",
        night:          "var(--lumen-night)",
        ember:          "var(--lumen-ember)",
        "ember-soft":   "var(--lumen-ember-soft)",
        paper:          "var(--lumen-paper)",
        white:          "var(--lumen-white)",
        "stone-50":     "var(--lumen-stone-50)",
        "stone-100":    "var(--lumen-stone-100)",
        "stone-200":    "var(--lumen-stone-200)",
        "stone-300":    "var(--lumen-stone-300)",
        "stone-400":    "var(--lumen-stone-400)",
        "stone-500":    "var(--lumen-stone-500)",
        "stone-600":    "var(--lumen-stone-600)",
        "stone-700":    "var(--lumen-stone-700)",
        "stone-800":    "var(--lumen-stone-800)",
        "stone-900":    "var(--lumen-stone-900)",
        /* ---- Semantic tokens ---- */
        accent:         "var(--accent)",
        "accent-soft":  "var(--accent-soft)",
        "accent-hover": "var(--accent-hover)",
        "accent-fg":    "var(--accent-fg)",
        warm:           "var(--warm)",
        "warm-soft":    "var(--warm-soft)",
        "fg-1":         "var(--fg-1)",
        "fg-2":         "var(--fg-2)",
        "fg-3":         "var(--fg-3)",
        "fg-4":         "var(--fg-4)",
        /* bg-base avoids collision with Tailwind's bg- prefix utility */
        "bg-base":      "var(--bg)",
        "bg-raised":    "var(--bg-raised)",
        "bg-sunken":    "var(--bg-sunken)",
        surface:        "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        border:         "var(--border)",
        "border-strong":"var(--border-strong)",
        divider:        "var(--divider)",
        success:        "var(--success)",
        warning:        "var(--warning)",
        danger:         "var(--danger)",
      },
      fontFamily: {
        sans:    ["var(--font-sans)"],
        display: ["var(--font-display)"],
        serif:   ["var(--font-display)"],  /* alias — keeps prose-p:font-serif working */
        mono:    ["var(--font-mono)"],
      },
      borderRadius: {
        xs:   "4px",
        sm:   "8px",
        md:   "12px",
        lg:   "18px",
        xl:   "28px",
        full: "999px",
      },
      boxShadow: {
        xs:    "var(--shadow-xs)",
        sm:    "var(--shadow-sm)",
        md:    "var(--shadow-md)",
        lg:    "var(--shadow-lg)",
        inset: "var(--shadow-inset)",
        glow:  "var(--glow-accent)",
      },
      transitionDuration: {
        fast: "140ms",
        base: "220ms",
        slow: "420ms",
      },
      transitionTimingFunction: {
        out:    "cubic-bezier(.2,.8,.2,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },
    },
  },
  plugins: [typography],
};
