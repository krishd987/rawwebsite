## 🎯 Objective
This PR:
1. Hides the **Tasks** page and redirects its traffic to the homepage.
2. Unhides and re-enables the **Registration** form (`/register`).
3. Renames the recruitment wording to **"Registration Form"** and updates contact info.
4. Removes the **"Additional Information"** (custom fields) section from the registration form.


## 📋 Changes Made
- [x] Removed **Tasks** navigation option from desktop & mobile menus in [Navbar.tsx](file:///e:/GitHub/rawwebsite/src/app/components/Navbar.tsx).
- [x] Configured temporary redirect for `/tasks` and `/tasks/:path*` to point to the homepage (`/`) in [next.config.ts](file:///e:/GitHub/rawwebsite/next.config.ts).
- [x] Unhid the `/register` route and renamed the navigation link to **"Registration"**.
- [x] Updated all form headings, hero titles, taglines, and descriptions in [page.tsx](file:///e:/GitHub/rawwebsite/src/app/register/page.tsx) from "Recruitment" to "Registration Form".
- [x] Deleted the custom fields (Additional Information) section from the registration form.
- [x] Updated help contact numbers for Jhoshua Coutinho and Pal Rajak in the footer helper card.


## 🔍 How to Test
1. Pull the branch: `hide-tasks-recruitment`
2. Start the dev server: `npm run dev`
3. Verify that the **Registration** option is visible in the Navbar (and **Tasks** is gone).
4. Navigate to `/register` and verify it loads the "Registration Form" correctly.
5. Select a competition/category and verify no "Additional Information" fields are displayed.
6. Try navigating to `/tasks` and verify it redirects to the homepage.


## ✅ Checklist
- [x] Code follows project style guidelines
- [x] Changes are documented
- [x] No breaking changes introduced
- [x] Tested locally and verified working
- [x] Ready for review and merge


## 📝 Type of Change
- [x] New feature / Configuration adjustment
- [x] Refactor / UI text change


---
**Impact Level:** Low
