# Component & Dependency Inventory

> Measured on 2026-10-04 by scanning every `src/**/*.ts(x)` file for import references.
> **This is a record, not a deletion list.** Nothing has been removed.

---

## 1. `src/components/ui/` — 39 files

36 `.tsx` components + 3 co-located `.module.css`.

### 1.1 Actively used (15)

| Component | Import sites |
|---|---|
| `kinetic-grid` | 12 |
| `timeline` | 5 |
| `scroll-text` | 5 |
| `timeline-animation` | 4 |
| `blur-vignette` | 2 |
| `spotlight-card` | 1 |
| `stats-bento` | 1 |
| `badge-2` | 1 |
| `theme-toggle` | 1 |
| `skeleton` | 1 |
| `skeleton-loader` | 1 |
| `logo-cloud` | 1 |
| `bots-hero-carousel` | 1 |
| `not-found-2` | 1 |
| `robot-cursor` | 1 |

> `robot-cursor` is imported from `src/app/layout.tsx` — it is global, keep it.

### 1.2 Never imported (21)

```
animated-file-upload      file-upload               liquid-morph-floating-menu
animated-grid-pattern     floating-tooltip          loaders-skeleton
animated-hero             footer-section            logo-cloud-2
button-1                  glassmorphism-trust-hero  magnetic-cursor
card                      empty-state               oversized-404-numeral
file-card-collections     pagination8               scroll-text-animation
theme-switch-button       theme-switcher-1          timeline-showcase
```

**21 of 36 components (58%) are dead code.**

**Recommendation — do not delete yet.** They are inert (zero runtime cost, zero bundle cost
because nothing imports them), and deleting them during active uncommitted work risks losing
someone's in-progress design exploration. Handle in a dedicated commit:

1. Confirm with the team that none are planned work-in-progress.
2. Delete in one commit, alone, so it is trivially revertable.
3. Re-run `tsc --noEmit` + `npm run lint` before/after.

**Do not** add new unused components to this folder "for later". Reuse one of the 15.

---

## 2. Unused dependencies

Installed but referenced **zero times** anywhere in `src/`:

| Package | Version | Notes |
|---|---|---|
| `@radix-ui/react-dialog` | ^1.1.15 | shadcn/Tailwind heritage |
| `@radix-ui/react-dropdown-menu` | ^2.1.16 | shadcn/Tailwind heritage |
| `@radix-ui/react-slot` | ^1.2.4 | shadcn/Tailwind heritage |
| `@radix-ui/react-tabs` | ^1.1.13 | shadcn/Tailwind heritage |
| `lenis` | ^1.3.15 | smooth-scroll lib, never imported |
| `clsx` | ^2.1.1 | no source references |

**All 4 Radix packages are unused.** They were pulled in by the abandoned Tailwind/shadcn
setup (`components.json` is still present and stale).

**Recommendation:** remove in a single dedicated commit with a clean `node_modules`
reinstall — **not** during unrelated work. Note `class-variance-authority` (1 import,
`decor-icon.tsx`) *is* used and must stay.

### 2.1 Borderline — verify before touching

| Package | Status |
|---|---|
| `@supabase/supabase-js` | 1 source import chain → `PptSubmissionForm`. **Functionally broken** (placeholder creds) but *live code*. Resolve the feature first, then decide. |
| `dotenv` | 0 source imports. Possibly used by `scripts/` or `admin/`. Check before removal. |

---

## 3. Stale configuration

| File | Status |
|---|---|
| `components.json` | shadcn/Tailwind config for a project **with no Tailwind**. Left in place. |
| `src/utils/supabaseClient.ts` | Imported only by `PptSubmissionForm`; falls back to `https://placeholder-project.supabase.co`. |

---

## 4. Summary

| Metric | Value |
|---|---|
| `src/components/ui` files | 39 |
| Used | 15 |
| Unused | 21 (**58%**) |
| Unused declared deps | 6 (4 Radix + `lenis` + `clsx`) |
| Stale config files | 1 (`components.json`) |

**Guiding principle:** this inventory exists so that unused code is a *documented decision*,
not an accident. Nothing here has been deleted.
