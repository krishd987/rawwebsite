# Design System — TEAM RAW (rawwebsite)

> **Source of truth for all UI work.** Read this before writing any interface code.
> Derived from `src/app/globals.css` (596 lines) and measured usage across 25 CSS files.
> Generated as part of the Design OS audit — values below are **observed**, not invented.

---

## 0. Design Philosophy

TEAM RAW is a **robotics and aviation competition team**, not a SaaS startup.

The visual identity must communicate:

- **Engineering precision** — technical grid, monospace data, tight geometry
- **Competitive energy** — a single aggressive red accent used with discipline
- **Institutional credibility** — deep navy foundation, restrained surfaces
- **Motion with purpose** — machined, deliberate; never decorative float

The site is a **light-first** design with a dedicated dark theme. Both are supported and both are in active use.

**Anti-default rule:** UI/UX Pro Max will recommend generic palettes (e.g. `#2563EB` blue + orange). **Those are reference data, not our brand.** Our brand is Navy + Red. See `anti-ai-slop.md`.

---

## 1. Color Tokens

### 1.1 Brand Constants (theme-independent)

| Token | Value | Role |
|---|---|---|
| Navy | `#0A1A3A` | Primary brand dark, text on light |
| Red | `#E10600` | **Signature accent** — F1 red, the single brand hue |
| Red Hover | `#b2001d` | Pressed/hover state |
| Dark Steel | `#0F0F17` | Deep neutral surface |
| White | `#ffffff` | Light canvas |
| Cyan | `#00f3ff` | Secondary technical accent (light theme) |

`theme-color` meta = `#B2001D`.

### 1.2 Light Theme — `:root`

| CSS custom property | Value |
|---|---|
| `--color-bg-primary` | `#ffffff` |
| `--color-bg-secondary` | `#f8f9fa` |
| `--color-bg-card` | `#ffffff` |
| `--color-text-primary` | `#0A1A3A` |
| `--color-text-secondary` | `#475569` |
| `--color-text-muted` | `#64748b` |
| `--color-border` | `rgba(10, 26, 58, 0.08)` |
| `--color-navy` | `#0A1A3A` |
| `--color-dark-steel` | `#0F0F17` |
| `--color-red` | `#E10600` |
| `--color-red-hover` | `#b2001d` |
| `--color-light-navy` | `#1a2f52` |
| `--color-gray-light` | `#f5f5f5` |
| `--color-gray-dark` | `#333333` |
| `--color-cyan` | `#00f3ff` |
| `--grid-color` | `rgba(10, 26, 58, 0.05)` |

### 1.3 Dark Theme — `html.dark, html[data-theme="dark"]`

Comment in source: *"Deep Obsidian Steel + Vibrant Crimson Accents"*.

| CSS custom property | Value |
|---|---|
| `--color-bg-primary` | `#090d16` (obsidian) |
| `--color-bg-secondary` | `#0f172a` |
| `--color-bg-card` | `#131c2e` |
| `--color-text-primary` | `#f8fafc` |
| `--color-text-secondary` | `#cbd5e1` |
| `--color-text-muted` | `#94a3b8` |
| `--color-border` | `rgba(255, 255, 255, 0.1)` |
| `--color-navy` | `#f8fafc` (inverted semantic) |
| `--color-dark-steel` | `#f1f5f9` (inverted semantic) |
| `--color-red` | `#ff2a24` (brightened for dark bg) |
| `--color-red-hover` | `#E10600` |
| `--color-light-navy` | `#1e293b` |
| `--color-gray-light` | `#1e293b` |
| `--color-gray-dark` | `#cbd5e1` |
| `--color-cyan` | `#38bdf8` |
| `--grid-color` | `rgba(255, 255, 255, 0.04)` |

> ⚠️ **Semantic inversion warning.** `--color-navy` and `--color-dark-steel` mean *"dark ink"* in light mode but *"light ink"* in dark mode. Never use them as literal surface colors — use `--color-bg-*` / `--color-bg-card` for surfaces.

### 1.4 ⚠️ Duplicate Token Set (KNOWN INCONSISTENCY)

`globals.css` defines **two overlapping token sets**. Both are in live use.

| Set A — semantic (canonical, prefer) | Set B — legacy (avoid in new code) |
|---|---|
| `--color-red` *(12 refs)* | `--primary` *(4 refs)* |
| `--color-bg-card` *(3)* | `--card-bg` *(2)* |
| `--color-bg-primary` *(3)* | `--bg-light` *(2)*, `--bg-white` *(2)* |
| `--color-text-primary` *(4)* | `--text-primary` *(7)* |
| `--color-text-secondary` *(?)` | `--text-secondary` *(5)* |
| `--color-border` *(3)* | `--border` *(2)*, `--card-border` *(2)* |

They carry **identical values in light mode** and **near-identical values in dark mode**, so they are visually interchangeable today — but they can drift.

**Rule:**
- **New code → Set A (`--color-*`).**
- **Do not delete Set B yet.** Removing it requires auditing 23 references across CSS Modules. Schedule as a dedicated refactor, not a drive-by change.
- Never define a third set.

---

## 2. Typography

### 2.1 Font Stack

| Role | Family | Usage (refs) | Notes |
|---|---|---|---|
| **Headings** `h1–h6` | **Orbitron** | **142** | Core identity. `font-weight: 700`, `letter-spacing: 0.02em` |
| **Body** | **Montserrat** (+Roboto fallback) | — | `body` and `p` |
| **Mono / data** | **JetBrains Mono** (`--font-mono`) | 3 | Applied to code, badges, tags, stat values |
| **Decorative** | *Above the Beyond Script* | 3 | Self-hosted `@font-face` woff2/woff/ttf, `font-display: swap` |
| League Spartan | (loaded via `@import`) | 6 | |
| Roboto | (loaded via `@import`) | 1 | Fallback only |
| Geist Sans | `next/font` → `--font-geist-sans` | **1** | ⚠️ see §2.4 |

Google Fonts loaded in one `@import`: JetBrains Mono, League Spartan, Orbitron, Montserrat, Roboto.

### 2.2 Type Scale (from `globals.css`)

| Element | ≥1025px | ≤1024px | ≤768px | ≤480px |
|---|---|---|---|---|
| `h1` | `3.5rem` / 1.2 | `2.5rem` | `2rem` | `1.5rem` |
| `h2` | `2.5rem` / 1.3 | `2rem` | `1.75rem`* | `1.25rem` |
| `h3` | `1.75rem` / 1.4 | `1.5rem` | `1.5rem`* | `1rem` |
| `h4` | `1.5rem` | — | — | — |
| `h5` | `1.25rem` | — | — | — |
| `h6` | `1rem` | — | — | — |
| `p` | `1rem` | — | `0.9rem` | `0.85rem` / 1.5 |

\* `globals.css` declares **two conflicting `@media (max-width: 768px)` blocks** (lines 474 and 506). The later wins: `h2 → 1.5rem`, `h3 → 1.1rem`. **This is a bug — see §7.**

Base `line-height: 1.6` on `body`. Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

### 2.3 Typographic Utilities

- `.text-uppercase` / `.label-uppercase` / `.kicker` → uppercase + `letter-spacing: 0.08em` + mono
- `.mono`, `code`, `pre`, `[class*="badge"]`, `[class*="tag"]`, `[class*="statValue"]` → mono font
- `.typewriter` → 2.5s stepped animation + blinking red caret

### 2.4 ⚠️ Geist Font — build breaker

`layout.tsx` loads `Geist` + `Geist_Mono` via `next/font/google`. This is **the single cause of the production build failure** (`Failed to fetch 'Geist' from Google Fonts`) — and Geist is referenced in exactly **one** CSS rule (`page.module.css:21`).

**Recommendation:** replace that one usage with `var(--font-mono)` or Montserrat, then remove the `next/font` imports. This fixes the build and removes a redundant font payload. *Not done yet — flagged for approval.*

---

## 3. Spacing, Radius, Elevation

### 3.1 Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-card` | `16px` | Cards |
| `--radius-btn` | `10px` | Buttons |
| `--radius-sm` | `8px` | Small elements |
| `--radius-pill` | `9999px` | Pills/badges |

Utility classes (separate, larger scale): `.squircle-sm 12px`, `.element`/`.squircle 28px`, `.squircle-lg 50px` — all with `corner-shape: squircle`.

> ⚠️ **Radius inconsistency:** `.glass` hardcodes `24px`, contact form hardcodes `14px` — neither uses a token. Add `--radius-lg: 24px` if glass surfaces persist.

### 3.2 Shadow / Elevation

| Token | Light | Dark |
|---|---|---|
| `--shadow` | `0 4px 20px -2px rgba(10,26,58,.05), 0 2px 6px -1px rgba(10,26,58,.03)` | `0 4px 24px -2px rgba(0,0,0,.4)` |
| `--shadow-lg` | `0 10px 30px -4px rgba(10,26,58,.08), 0 4px 12px -2px rgba(10,26,58,.04)` | `0 12px 36px -4px rgba(0,0,0,.6)` |

Two levels only. **Do not introduce a third.** Shadows are soft and low-opacity by design — this is a *restrained* elevation system.

### 3.3 Layout

- `.container` → `max-width: 1200px`, `margin: 0 auto`, `padding: 0 1.5rem` (→ `1rem` @768, `0.75rem` @480)
- `.grid-pattern` → `50px × 50px` technical grid at `rgba(10,26,58,0.05)`
- `--grid-overlay` → radial vignette that fades section edges into canvas

---

## 4. Breakpoints

| Value | Purpose |
|---|---|
| `1024px` | tablet/desktop boundary; section padding → `4rem` |
| `768px` | primary mobile breakpoint (most-used) |
| `600px` | secondary (1 file) |
| `480px` | small mobile; buttons → `min-height: 44px` |

Feature queries in use: `prefers-reduced-motion`, `hover: hover`/`pointer: fine`, `hover: none`/`pointer: coarse`, `prefers-color-scheme: dark`.

> ⚠️ **No `1200px`/`1440px` desktop tiers.** Large-desktop composition is currently handled ad hoc. UI/UX Pro Max recommends checking `375 / 768 / 1024 / 1440`.

---

## 5. Motion Language

**Existing, working motion rules:**

- `scroll-behavior: smooth` — disabled under `prefers-reduced-motion: reduce` ✅
- `section { transition: background .5s ease }`
- `a`, `button { transition: all .2s ease-in-out }`
- `body { transition: background-color .3s ease, color .3s ease }` (theme cross-fade)
- `.typewriter` — 2.5s stepped type + caret blink
- Framer Motion used sparingly (`page.tsx` + selected components)
- `lenis` is installed but **has 0 imports** — see §7

**Rules:**
1. Every animation must communicate *state, hierarchy, continuity, or feedback*.
2. Respect `prefers-reduced-motion` — already handled globally, keep it that way.
3. Prefer CSS transitions over Framer Motion for simple state changes.
4. Never add perpetual float/parallax/cursor-follow effects.

---

## 6. Iconography & Imagery

- **Icons:** `lucide-react` (1 active import). No emoji-as-icon.
- **Images:** Cloudinary via `src/lib/cloudinaryTransform.ts`; `next.config.ts` allows `images.unsplash.com`, `via.placeholder.com`, `i.pravatar.cc`, `dangerouslyAllowSVG: true`, `unoptimized: true`.
- **Cursor:** custom `robot-cursor.svg` — brand-appropriate, keep.

---

## 7. Known Inconsistencies (backlog, not yet fixed)

| # | Issue | Impact |
|---|---|---|
| 1 | Two duplicate token sets (§1.4) | Drift risk |
| 2 | Two conflicting `@media (max-width:768px)` heading blocks (§2.2) | `h2`/`h3` sizes depend on source order |
| 3 | Geist loaded but used once; **breaks `npm run build`** (§2.4) | Build failure |
| 4 | `.glass` / contact form hardcode radius (§3.1) | Token bypass |
| 5 | 5 Google Font families + Geist + 1 self-hosted | Payload weight |
| 6 | `lenis`, 4× Radix packages installed, **0 usage** | Dead dependencies |
| 7 | ~33 of 39 `src/components/ui/*` never imported | Dead components |
| 8 | `supabaseClient.ts` uses placeholder URL/key → **PPT upload broken at runtime** | Functional bug |
| 9 | `OPENROUTER_API_KEY` absent from all env files → **chat route fails** | Functional bug |
| 10 | Lint: 1,014 errors / 13,174 warnings · `tsc`: 1 error | Quality gate |

---

## 8. Accessibility Rules (project baseline)

Already in place ✅:
- `:focus-visible` outline `2px solid var(--color-red)` on `a` and `button`
- `accent-color` on form controls
- `prefers-reduced-motion` handling
- `userScalable: true`, `maximumScale: 5` (viewport allows zoom)
- Disabled state → `cursor: not-allowed; opacity: .5`
- Touch targets → `min-height: 44px` on buttons ≤480px

**Must maintain:**
- Text contrast ≥ 4.5:1 (verify red-on-navy and muted text in both themes)
- Visible focus for all interactive elements
- Semantic HTML; ARIA only where necessary
- Form labels + error states
- Keyboard-navigable menus, modals, dialogs

---

## 9. Change Control

1. **This file is the source of truth.** If code and this document disagree, the code is a bug — fix the code or update this file in the same change.
2. Never add a color/radius/shadow/breakpoint value inline in a component if a token can express it.
3. Never invent a value repeatedly — **centralize it.**
4. New tokens go in `globals.css` `:root` **and** the dark block, then get documented here.
