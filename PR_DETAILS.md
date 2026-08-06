## 🎯 Objective
This PR hides the **Tasks** and **Recruitment** pages from the main navigation and configures URL redirects to prevent direct access.


## 📋 Changes Made
- [x] Removed "Tasks" and "Recruitment" links from the navbar ([Navbar.tsx](file:///e:/GitHub/rawwebsite/src/app/components/Navbar.tsx)).
- [x] Added temporary redirects in [next.config.ts](file:///e:/GitHub/rawwebsite/next.config.ts) for `/tasks`, `/tasks/:path*`, and `/register` back to the homepage (`/`).


## 🔍 How to Test
1. Pull the branch: `hide-tasks-recruitment`
2. Start the dev server: `npm run dev`
3. Verify that the 'Tasks' and 'Recruitment' options are no longer visible in the navigation bar.
4. Try to directly visit:
   - `http://localhost:3000/tasks`
   - `http://localhost:3000/register`
   - Verify both URLs redirect you back to `http://localhost:3000/`.


## 📸 Screenshots (if UI changes)
*(Not applicable, elements removed from Navbar)*


## 🚀 Related Issues
Closes # (none specified)


## ✅ Checklist
- [x] Code follows project style guidelines
- [x] Changes are documented
- [x] No breaking changes introduced
- [x] Tested locally and verified working
- [x] Ready for review and merge


## 📝 Type of Change
- [x] Documentation update / Configuration adjust
- [x] Minor feature adjustment


## 💡 Notes
The redirects are easily revertible in [next.config.ts](file:///e:/GitHub/rawwebsite/next.config.ts) when recruitment season begins or tasks need to be displayed again.


---
**Impact Level:** Low
