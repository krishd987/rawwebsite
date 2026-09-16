## 🎯 Objective
This PR introduces:
1. **White Frosted Glass Navbar**: Replaces the blue-tinted navigation bar with a realistic white blurry frosted glass aesthetic, featuring smooth saturation, border reflection, and an SVG texture filter.
2. **Modern CSS Enhancements**: Adds typewriter animation, squircle rounded corners, `text-wrap: pretty/balance`, and unified brand accent color (`#E10600`) for form inputs/checkboxes.
3. **Signature Red Scrollbar**: Updates standard and webkit scrollbar styling across the website and admin dashboard to a pill-shaped brand red (`#E10600`) thumb with hover feedback.
4. **Team Updates**: Hides Kelvin Chetty and Ved Patil from the team page, API endpoints, and category/domain tab counts.

---

## 📋 Changes Made
- [x] **Navbar**:
  - Removed blue tint (`rgba(235, 245, 255, 0.15)` and `rgba(218, 233, 255, 0.42)`).
  - Applied `background: rgba(255, 255, 255, 0.72)` / `0.84` with `backdrop-filter: blur(20px) saturate(140%)` and white border highlights.
  - Added hidden `#frosted-glass` SVG filter (`feTurbulence` + `feDisplacementMap`).
  - Updated mobile menu styling with frosted glass appearance and clean white borders.
- [x] **Scrollbar**:
  - Moved theme variables to `:root` so `html` can access `--color-red`.
  - Configured `scrollbar-color: #E10600 transparent` and `scrollbar-width: thin`.
  - Added smooth red gradient pill thumb for `::-webkit-scrollbar`.
  - Updated admin dashboard scrollbars to match.
- [x] **CSS Modernizations**:
  - Added `@keyframes typewriter` & `@keyframes blinkCaret` with `.typewriter` class.
  - Added `.squircle`, `.squircle-lg`, and `corner-shape: squircle` progressive enhancements.
  - Added `text-wrap: pretty` for `<p>` and `text-wrap: balance` for headings.
  - Set `accent-color: var(--color-red)` across inputs and checkboxes.
  - Added `.glass` and `.glass-frosted` utility classes.
- [x] **Team Section & API**:
  - Flagged Kelvin Chetty (`new_member9`) and Ved Patil (`new_member18`) as `hidden: true` in Firestore and `teamData.ts`.
  - Updated `/api/team` to exclude hidden members by default.
  - Updated `TeamSection.tsx` to filter out hidden members and update domain counts accurately.

---

## 🔍 How to Test
1. Pull branch: `update/white-frosted-navbar-and-team-changes`
2. Start development servers: `npm run dev` (main) and `npm run dev` in `admin/`
3. Check the navbar while scrolling over images/sections—verify pure white frosted glass with no blue tones.
4. Check the browser scrollbar—verify it displays the brand red pill thumb.
5. Visit `/team`—verify Kelvin Chetty and Ved Patil are hidden, and domain tab counts match visible members.

---

## ✅ Checklist
- [x] Code follows project style guidelines
- [x] Both main and admin TypeScript type checks pass (`npx tsc --noEmit`)
- [x] Tested locally and verified working
- [x] Ready for review and merge
