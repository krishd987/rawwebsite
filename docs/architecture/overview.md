# Architecture Overview — TEAM RAW (rawwebsite)

> System map derived from an audit of `Y:\Github\rawwebsite-main` on 2026-10-04.
> Companion diagram: `docs/architecture/overview.archify.html` (generated with Archify v3.0.1).

---

## 1. Shape of the system

**This is not one app — it is two Next.js applications in one repository**, plus external services.

```
rawwebsite-main/
├── src/          ← PUBLIC site  (Next.js 16, App Router, port 3000)
├── admin/        ← ADMIN panel  (Next.js 16, own package.json/.env, port 3001)
├── data/, docs/, public/, scripts/
└── .opencode/skills/   ← agent skills (archify, ui-ux-pro-max, …)
```

| | Public site | Admin panel |
|---|---|---|
| Path | `src/` | `admin/` |
| Package | `teamrawwebsite@2.0.0` | `teamraw-admin@0.1.1` |
| Port | 3000 (`next dev`) | 3001 (`next dev -p 3001`) |
| Deploy | `vercel.json` | separate `admin/vercel.json` |
| Deps | its own `node_modules` | its own `node_modules` |
| Env | `.env`, `.env.local` | `admin/.env`, `admin/.env.local` |

They share Firebase project + Cloudinary credentials but **have no code-level coupling** — they communicate over HTTP via `NEXT_PUBLIC_API_URL`.

---

## 2. Public site — request flow

### Rendering
- **Next.js 16.0.7** App Router, React **19.2.0**, TypeScript 5.9.3
- `reactCompiler: true` (babel-plugin-react-compiler)
- **Turbopack** (`turbopack.root: '.'`), `next.config.ts`
- 11 public pages: `/`, `about`, `competitions`, `contact`, `gallery`, `mosaic-26`, `navkriti-26`, `ppt-submission`, `register`, `robots-gallery`, `sponsors`, `team`
- Root layout wraps everything in `DataProvider` (`src/context/DataContext.tsx`)

### Styling & motion
- **Pure CSS Modules** (25 `.css` files, ~310 KB) + CSS custom properties in `src/app/globals.css`
- **No Tailwind, no CSS-in-JS**
- `framer-motion` (selective), custom `robot-cursor`, `useCountUp`
- Lucide icons

### Client data layer
```
DataContext (context/DataContext.tsx)
    ├── src/data/robotsData.ts
    ├── src/data/galleryData.ts
    ├── src/data/teamData.ts
    └── src/config/index.ts
```
Static/seed data on the client; live content comes from the API routes.

---

## 3. API routes → services

15 route handlers under `src/app/api/`:

| Route | Service |
|---|---|
| `competitions` | **Firebase Admin (Firestore)** |
| `contact/messages` | **Firebase Admin** |
| `gallery` | **Firebase Admin** |
| `registrations` | **Firebase Admin** |
| `robots` | **Firebase Admin** |
| `submissions` | **Firebase Admin** |
| `team` | **Firebase Admin** |
| `updates` | **Firebase Admin** |
| `chat` | ⚠️ **OpenRouter** (`OPENROUTER_API_KEY`) — **key absent from all env files** |
| `*/[id]` (7 handlers) | delegate to shared logic |

**Backend of record = Firebase Firestore** via `src/lib/firebase-admin.ts`.

---

## 4. Media pipeline

```
Browser → PptSubmissionForm.tsx
             ├── Cloudinary  (via src/lib/cloudinaryTransform.ts) ✅ configured
             └── Supabase Storage + 'team' table ⚠️ PLACEHOLDER CREDENTIALS
                    supabaseClient.ts → https://placeholder-project.supabase.co
                    NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY not present in .env
```

> ⚠️ **Functional bug:** `PptSubmissionForm` calls `supabase.storage.from('ppt-submissions')` and `supabase.from('team').insert(...)`. With placeholder credentials these calls **fail at runtime**. Either supply real credentials or remove the Supabase path in favour of Cloudinary. **Do not migrate the whole backend to Supabase** — Firebase is the live system.

---

## 5. Admin panel

Separate Next.js app (`admin/`), dashboard routes:
`analytics`, `competitions`, `contact`, `gallery`, `profile`, `registrations`, `robots`, `robots-gallery`, `send-email`, `settings`, `submissions`, `team`

**Stack:** `firebase` + `firebase-admin`, **`jose`** (JWT auth), **`bcryptjs`** (password hashing), **`nodemailer`** (email), `framer-motion`, `lucide-react`, Cloudinary.
Middleware: `admin/src/middleware.ts` (auth gating).

Its API routes: `check-email-config`, `competitions`, `registrations`, `send-email`, `send-direct-email`, `submissions`, `upload`.

---

## 6. External services

| Service | Purpose | Status |
|---|---|---|
| **Firebase / Firestore** | Primary database (both apps) | ✅ configured |
| **Cloudinary** | Image/video storage + transform | ✅ configured |
| **Vercel** | Hosting (2 deployments) | ✅ configured |
| **Supabase** | PPT submission storage + `team` table | ⚠️ **placeholder** — broken |
| **OpenRouter** | Chatbot LLM (`/api/chat`) | ⚠️ **key missing** |
| Google Analytics | `G-WC1498W69G` | ✅ |
| Google Search Console | verification token | ✅ |

---

## 7. Security notes

- `.env*` is gitignored; `*firebase-adminsdk*.json` is gitignored. **Keep it that way.**
- Firebase private key lives in env — never print, commit, or echo it.
- Admin uses `jose` + `bcryptjs` — sound primitives.
- ⚠️ `.env` and `.env.local` are byte-identical duplicates (2600 bytes each). Consolidation is a separate, deliberate change.
- ⚠️ Root `.env` contains Cloudinary **secret** — ensure it never reaches client bundles (only `NEXT_PUBLIC_*` may).

---

## 8. Agent tooling layer (Design OS)

| Tool | Location | Role |
|---|---|---|
| **Archify** v3.0.1 | `.opencode/skills/archify/` | Architecture/workflow/sequence diagrams |
| **UI UX Pro Max** v2.15.0 | `.opencode/skills/` (7 skills) | Design intelligence, tokens, styles, UX rules |
| **Taste Skill** | `.agents/skills/design-taste-frontend/` | Anti-slop visual judgement |
| `opencode.json` | project root | Config + watcher ignores |
| Docs | `docs/design/`, `docs/architecture/` | Source of truth |

OpenCode discovers `.opencode/skills/` and `.agents/skills/` automatically. **The session working directory must be the project root**, otherwise project skills are invisible.

---

## 9. Known architectural issues

| # | Issue | Severity |
|---|---|---|
| 1 | Two apps in one repo with duplicated Firebase/Cloudinary config and env files | Medium — drift risk |
| 2 | Supabase path uses placeholder credentials → PPT upload broken | **High — functional** |
| 3 | `OPENROUTER_API_KEY` missing → chat route fails | **High — functional** |
| 4 | `lenis` + 4 Radix packages installed, zero usage | Low — dead deps |
| 5 | ~33/39 `src/components/ui/*` never imported | Low — dead code |
| 6 | Build fails: Geist Google Font fetch (used once) | **High — blocks deploy** |
| 7 | Lint 1,014 errors · `tsc` 1 error | Medium — no green gate |
| 8 | git binary not installed locally | Medium — no local history inspection |

---

## 10. When to diagram further

Use **Archify** for: auth flow, data flow, deployment lifecycle, admin↔public API contract, state machine of the registration pipeline.
Use **Graphify** (if later installed) for: dependency/community graphs, component relationship graphs, service relationship maps.
Do **not** generate diagrams for a simple landing page.
