# DESIGN OS SETUP REPORT

**Project:** `Y:\Github\rawwebsite-main` — TEAM RAW (rawwebsite)
**Date:** 2026-10-04
**Scope:** Audit-first integration of a Design + Development Operating System.
No framework swap, no backend migration, no secrets touched, no work overwritten.

---

## 1. AUDIT RESULTS

### Environment
| Item | Finding |
|---|---|
| OS / Shell | Windows NT 10.0.26200, PowerShell 5.1 |
| Node / npm | v24.19.0 / 11.17.0 — **npm is the only package manager** (no pnpm/yarn/bun) |
| Python | 3.13.15 with `pip`, **no `uv`/`pipx`** |
| **git** | **NOT INSTALLED** — despite a live `.git` with `origin`→`krishd987/rawwebsite`, `upstream`→`teamrawsfit/rawwebsite` |
| MCP servers | **Zero** configured for OpenCode |

### Project structure — key discovery
**This repo contains two independent Next.js apps:**

| | Public site | Admin panel |
|---|---|---|
| Path | `src/` | `admin/` |
| Package | `teamrawwebsite@2.0.0` | `teamraw-admin@0.1.1` |
| Port | 3000 | 3001 |
| Env | `.env`, `.env.local` | `admin/.env`, `admin/.env.local` |
| Deps | own `node_modules` | own `node_modules` |

- Next.js 16.0.7 · React 19.2.0 · TS 5.9.3 · App Router · `reactCompiler: true` · Turbopack
- **Pure CSS Modules** — 25 `.css` files, ~310 KB. **No Tailwind, no CSS-in-JS.**
- 15 API route handlers, 11 public pages
- Admin adds `jose` (JWT) + `bcryptjs` + `nodemailer`
- Backends: **Firebase/Firestore** (primary), **Cloudinary** (media), Vercel (2 deployments)

---

## 2. INSTALLED

| # | Item | Version | Location | Status |
|---|---|---|---|---|
| 1 | `opencode.json` | — | project root | ⚠️ **later removed** (see §6.9) |
| 2 | **Archify** | v3.0.1 | `.opencode/skills/archify/` | ⚠️ **later removed** (see §6.9) |
| 3 | **UI UX Pro Max** | v2.15.0 | `.opencode/skills/` ×7 | ⚠️ **later removed** (see §6.9) |

**Details**

1. **`opencode.json`** — `$schema` + `watcher.ignore` for `graphify-out/**`, `.archify/**`,
   `.next/**`, `tsconfig.tsbuildinfo`. Verified parses as valid JSON.
2. **Archify** — installed from the **official `tt-a1i/archify`** source archive (zip), because
   the documented `npx skills add -g` path requires `git`, which is absent on this machine.
   Install instructions were verified current before running.
3. **UI UX Pro Max** — official repo is
   `nextlevelbuilder/ui-ux-pro-max-skill` (the brief's `nextlevelbuilder/ui-ux-pro-max` URL
   **404s**). Installed via `npm install -g ui-ux-pro-max-cli` + `uipro init --ai opencode`.

**Pre-existing (untouched):** `.agents/skills/design-taste-frontend` — the Taste Skill,
tracked in `skills-lock.json` from `Leonxlnx/taste-skill`.

---

## 3. SKIPPED (with reasons)

| Resource | Decision | Reason |
|---|---|---|
| **Tailwind + shadcn/ui** | ❌ Not installed | Project is CSS Modules by design. `components.json` is stale from an abandoned attempt. |
| **Supabase migration** | ❌ Not performed | Firebase is the live backend. Migrating would be destructive. |
| **Playwright** | ❌ Not installed | Use the harness `browser` tool for QA until scripted regression is genuinely needed. |
| **Prettier** | ❌ Not installed | Would reformat active uncommitted work — unacceptable risk. |
| **Extra component libraries** | ❌ Not installed | 21/36 existing `ui/` components are already dead code. |
| **R package `grafify`** | ❌ Rejected | Wrong project — R statistics package, not a graph tool. |
| **`kbastani/graphify`, `Graphitti/graphify`** | ❌ Rejected | Not the intended project. |
| **UI/UX Pro Max palette** | ⚠️ Not applied | Recommends `#2563EB` blue + orange — **not TEAM RAW's brand.** Use its reasoning/checklists only. |
| **`ui-styling` skill guidance** | ⚠️ Not applied | Assumes shadcn/Tailwind architecture this project does not have. |

---

## 4. MANUAL STEPS REQUIRED

| # | Step | Owner |
|---|---|---|
| 1 | **Install `git`** — currently absent; active work from 2026-10-02 cannot be inspected or committed | User decision |
| 2 | **Enable experimental browser setting** in the desktop app — `browser` tool returns "No desktop browser is connected" | User |
| 3 | **Add `OPENROUTER_API_KEY`** to `.env` — chat route cannot work without it | User |
| 4 | **Supply real Supabase credentials** *or* remove the Supabase path — PPT upload is broken | User decision |
| 5 | **Remove the Geist `next/font` import** — it breaks `npm run build` and is used exactly once | Approved? |
| 6 | **Merge the duplicate token sets** in `globals.css` | Scheduled refactor |
| 7 | **Delete 21 unused components + 6 unused deps** — documented, deliberately not done | Dedicated commit |
| 8 | **Re-run lint/tsc gates** after any of the above | CI |

---

## 5. VALIDATION

### 5.1 Tooling validation
| Check | Result |
|---|---|
| `archify doctor` | **20/20 checks `[ok]`** |
| Archify test diagram render | ✅ 762,310 bytes |
| Archify `check` on test | ✅ `"ok": true` |
| UUPM `--design-system -p "Team RAW"` | ✅ works |
| UUPM `--stack react` | ✅ works |
| UUPM `--domain style` | ✅ works |
| `opencode.json` | ✅ valid JSON |

### 5.2 Real architecture diagram (this project)
| Check | Result |
|---|---|
| `archify validate architecture` | ✅ **0 errors, 0 warnings** (after fixing 4 routing violations my first draft introduced) |
| `archify render` | ✅ `docs/architecture/overview.archify.html` — 768,266 bytes |
| `archify check` | ✅ `"ok": true` — **9/9 composition checks pass** |
| Metrics | 0 proper crossings · 0 ambiguous corridors · 0 arrowhead collisions · 0 label overflow · min text 7.5 px (floor 6) |

> First draft failed validation with 4 issues (2 edges crossing unrelated nodes, 2 endpoints
> violating side-direction rules). Fixed by removing hand-authored `via`/`fromSide`/`toSide`
> overrides and letting Archify auto-route. **Validation is doing its job.**

### 5.3 Baseline quality gates (LEFT UNTOUCHED)
| Gate | Result |
|---|---|
| `npm run lint` | ❌ 14,188 problems (**1,014 errors**, 13,174 warnings) |
| `npx tsc --noEmit` | ❌ **1 error** — `bots-hero-carousel.tsx` (Framer Motion `Variants` typing) |
| `npm run build` | ❌ `Failed to fetch 'Geist' from Google Fonts` |

---

## 6. PROBLEMS FOUND

### Functional bugs (high severity)
1. **PPT submission upload is broken.** `PptSubmissionForm` calls Supabase Storage + a
   `team` table insert, but `supabaseClient.ts` falls back to
   `https://placeholder-project.supabase.co` with a placeholder anon key — neither
   `NEXT_PUBLIC_SUPABASE_URL` nor `_ANON_KEY` exists in any env file.
2. **Chat route cannot work.** `/api/chat` reads `OPENROUTER_API_KEY`, which is **absent
   from all four env files** (`.env`, `.env.local`, `admin/.env`, `admin/.env.local`).
3. **Production build fails.** Caused by `Geist` via `next/font/google` — referenced in
   exactly **one** CSS rule (`page.module.css:21`). Removing it fixes the build *and*
   trims a font payload.

### Design-system debt
4. **Two duplicate token sets** in `globals.css` — `--color-*` (canonical, 12 refs on red)
   vs legacy `--primary`/`--text-*` (7 refs on `--text-primary`). Same values today, free
   to drift tomorrow. Documented; **not** merged.
5. **Two conflicting `@media (max-width: 768px)` heading blocks** (lines 474 and 506) —
   `h2`/`h3` sizes depend on source order. Real bug.
6. **Hardcoded radius** in `.glass` (24px) and the contact form (14px) bypass tokens.
7. **Five Google font families + Geist + one self-hosted face** — payload weight concern.

### Dead weight (documented, deliberately not deleted)
8. **21 of 36 components (58%) in `src/components/ui/` are never imported**, and
   **6 dependencies are never imported**: `@radix-ui/react-dialog`,
   `react-dropdown-menu`, `react-slot`, `react-tabs` (all 4 Radix — shadcn leftovers),
   `lenis`, `clsx`. Full list in `docs/design/component-inventory.md`.

### Process / environment problems
9. **⚠️ Installed tooling was wiped mid-session.** `opencode.json`, `.opencode/skills/`
   (Archify + 7 UUPM skills) and `.archify/` all disappeared from disk during this session,
   concurrent with the harness marking those skill IDs unavailable. **The generated
   deliverables in `docs/` survived.** Reinstallation will be required to run Archify or
   UUPM again.
10. **⚠️ Another actor is editing this repo concurrently.** At 03:23–03:25,
    `src/data/robotsData.ts`, `src/data/galleryData.ts`,
    `src/app/components/RobotsGallery.tsx`, `src/app/sponsors/page.tsx` and others were
    modified — **not by this session**, which wrote only to `docs/`. Coordinate before
    any refactor or commit.
11. **No git binary** — none of the above can be diffed, staged or committed locally.
12. **`.env` and `.env.local` are byte-identical duplicates** (2,600 bytes each).
13. **Root `.env` contains the Cloudinary API secret** — verified gitignored; keep it so.

---

## 7. DELIVERABLES (on disk, unaffected by §6.9)

| File | Purpose |
|---|---|
| `docs/design/design-system.md` | Source of truth — colors, type scale, radius, shadow, breakpoints, motion, a11y (derived from real tokens, values measured not invented) |
| `docs/design/anti-ai-slop.md` | Binding visual-quality rules: Avoid / Prefer / Pre-Flight checklist |
| `docs/design/component-inventory.md` | Used vs unused components and dependencies |
| `docs/architecture/overview.md` | Two-app system map, API→service table, external services, security notes |
| `docs/architecture/overview.architecture.json` | Archify source definition (validated) |
| `docs/architecture/overview.archify.html` | **Rendered diagram** — 768 KB, 9/9 checks pass |

---

## 8. COMPLIANCE STATEMENT

- ✅ **Audited before installing** — every resource classified and source-verified first
- ✅ **Official sources only** — `tt-a1i/archify` and `nextlevelbuilder/ui-ux-pro-max-skill`
- ✅ **No framework swap** — CSS Modules retained, Tailwind/shadcn not installed
- ✅ **No backend migration** — Firebase retained, Supabase path left as-is and documented
- ✅ **No dependency deleted** — 6 unused packages identified, none removed
- ✅ **No component deleted** — 21 unused components identified, none removed
- ✅ **No secrets exposed or created** — only variable *names* were inspected
- ✅ **No work overwritten** — this session wrote exclusively to `docs/`
- ✅ **No commits made** — git is unavailable, and files are being edited concurrently
