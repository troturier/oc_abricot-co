---
version: alpha
name: "Abricot"
description: "Design tokens extracted by DesignAgent from the Abricot Figma file (12 screens + Composants section). No Figma variables exist: values are inferred from raw fills/text styles. See design/specs/ for per-screen detail."
source:
  figmaFile: "Abricot (Copy)"
  figmaUrl: "https://www.figma.com/design/4dE90dtmpQNUS05IGd9HxT/Abricot"
  extractedAt: "2026-11-23"
colors:
  primary: "#d3590b"
  surface: "#ffffff"
  background-auth: "#f9fafb"
  on-surface: "#6b7280"
  neutral-1: "#e5e7eb"
  neutral-2: "#1f1f1f"
  neutral-3: "#0f0f0f"
  neutral-4: "#000000"
  neutral-5: "#9ca3af"
  neutral-6: "#ffe8d9"
  neutral-7: "#ffe0e0"
  accent: "#9747ff"
  status-todo: "#ef4444"
  status-todo-bg: "#ffe0e0"
  status-in-progress: "#e08d00"
  status-in-progress-bg: "#fff0d7"
  status-done: "#27ae60"
  status-done-bg: "#f1fff7"
typography:
  display:
    fontFamily: "Manrope"
    fontSize: 40px
    fontWeight: 700
    letterSpacing: "0"
  headline:
    fontFamily: "Manrope"
    fontSize: 24px
    fontWeight: 600
    letterSpacing: "0"
  body-lg:
    fontFamily: "Inter"
    fontSize: 18px
    fontWeight: 400
    letterSpacing: "0"
  body-lg-2:
    fontFamily: "Manrope"
    fontSize: 18px
    fontWeight: 600
    letterSpacing: "0"
  body-lg-3:
    fontFamily: "Inter"
    fontSize: 16px
    fontWeight: 400
    letterSpacing: "0"
  body:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: 400
    letterSpacing: "0"
  body-2:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: 400
    letterSpacing: "0.02"
  label:
    fontFamily: "Inter"
    fontSize: 12px
    fontWeight: 400
    letterSpacing: "0"
  caption:
    fontFamily: "Inter"
    fontSize: 10px
    fontWeight: 400
    letterSpacing: "0"
spacing:
  xs: 4px
  sm: 5px
  md: 7px
  lg: 8px
  xl: 9px
  xxl: 10px
  xxxl: 12px
rounded:
  none: 0px
  sm: 1px
  md: 4px
  lg: 5px
  xl: 8px
  button: 10px
components:
  logo:
  link:
  button:
  input:
  menu:
  menu-items:
  footer:
  user-icon:
  chips:
  tag:
  task-list-item:
  card-projet:
  comment:
  icon-button:
  ia-button:
---

## Overview

**Abricot** — tokens derived from the Figma frames `Log In`, `Sign In`, `Dashboard`, `Dashboard vue Kanban`, `Projets`, `Single projet`, the six modals (task create / edit / AI create / AI list, project create / edit), `Mon compte`, and the `Composants` section.

The YAML frontmatter holds token values inferred by DesignAgent (merged from a pass on all frames and a pass on `Composants` alone). Token names are generic (`neutral-n`): rename them semantically when implementing. Detailed per-screen values live in `design/specs/`, screen captures in `design/screens/`.

## Colors

- `primary` — #d3590b (brand orange: logo, titles, links)
- `surface` — #ffffff
- `background-auth` — #f9fafb (auth form panel)
- `on-surface` — #6b7280 (secondary text)
- `neutral-1` — #e5e7eb (borders, input strokes)
- `neutral-2` — #1f1f1f (primary button fill)
- `neutral-3` — #0f0f0f
- `neutral-4` — #000000 (labels, body text)
- `neutral-5` — #9ca3af
- `neutral-6` — #ffe8d9 (light orange tint)
- `neutral-7` — #ffe0e0 (light red tint)
- `accent` — #9747ff (seen only in `Composants`, likely Figma variant-frame outline — verify)

## Typography

- `display` — Manrope 40 / 700 (page titles, e.g. "Connexion")
- `headline` — Manrope 24 / 600
- `body-lg` — Inter 18 / 400
- `body-lg-2` — Manrope 18 / 600
- `body-lg-3` — Inter 16 / 400 (button labels)
- `body` — Inter 14 / 400 (labels, links)
- `body-2` — Inter 14 / 400, letter-spacing 2%
- `label` — Inter 12 / 400
- `caption` — Inter 10 / 400

## Layout

- `Log In` / `Sign In`: 1440×1024, left form panel 562px wide (#f9fafb, padding 55/140, vertical gap 202), right side = background image.
- Inputs: 282×53 field, padding 19/17, radius 4, stroke #e5e7eb, label above with gap 7.
- Primary button: 249×50, padding 13/74, radius 10, fill #1f1f1f, white Inter 16 label.
- Modals: 598px wide, vertical auto-layout, gap 56 (60 for the AI task list).
- Main app screens: 1440px wide desktop frames.

## Elevation & Depth

Flat — no drop shadows detected at the summary level. Use borders and surface contrast for depth (check per-screen specs).

## Components

`logo` (variants by color), `link`, `button`, `input`, `menu`, `menu-items`, `footer`, `user-icon`, `chips`, `tag`, `task-list-item`, `card-projet`, `comment`, `icon-button`, `ia-button`. Variants and states are detailed in `design/specs/composants.md`.

## Do's and Don'ts

- **Do** use the token values in the frontmatter verbatim; treat them as the source of truth.
- **Do** reference color tokens rather than hardcoding hexes.
- **Don't** introduce new colors, type sizes, or spacing values outside the scales above without reason.
