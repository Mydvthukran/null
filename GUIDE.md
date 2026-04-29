# SIET Website Content & Structure Guide

This guide explains where to update dynamic homepage content, submenu pages, assets, and navigation.

## 1) Add or update notices and notifications

Primary data file:
- `src/data/noticesData.js`

What to edit:
- `noticesBoardData`: master list used by the all notices page.
- `topAnnouncementsData`: ticker cards in the top announcements section.
- `noticesStripData`: live notices strip.
- `notificationsListData`: notification subset.
- `noticesListData`: notice/event subset.

Recommended workflow:
1. Import a new PDF/file at the top of `src/data/noticesData.js`.
2. Add a new object in `noticesBoardData` with `id`, `title`, `category`, `date`, `priority`, `details`, and links.
3. Reuse the new item through existing derived arrays (top announcements, strip, notifications) or update filters/slices if needed.
4. Keep `id` unique and in ascending order.

## 2) Add or update campus news

Data source:
- `src/data/noticesData.js` -> `campusUpdatesData`

Render component:
- `src/components/CampusUpdates.jsx`

How to update:
1. Add/edit objects in `campusUpdatesData` with `id`, `title`, and `date`.
2. Keep links in `href` (currently mapped to `/all-notices` by default).
3. Verify card content in the Campus Updates section on the home page.

## 3) Update submenu page content

Content dictionary:
- `src/pages/submenu/submenuData.js`

Route rendering:
- `src/pages/submenu/SubmenuRouteHandler.jsx`
- `src/pages/submenu/SubmenuTemplate.jsx`

How to update:
1. Add or edit a key in `submenuData` matching route patterns like:
   - `about/about-institute`
   - `departments/ai-ml`
   - `academics/courses-offered`
2. Update fields such as `title`, `sectionLabel`, `image`, `body`, `points`, and `resources`.
3. Keep route keys aligned with submenu links in navbar config.

## 4) Add new images and assets

Asset root:
- `src/assets/new-assets/`

Recommended folders:
- `campus/`, `courses/`, `departments/`, `documents/`, `events/`, `gallery/`, `hero-home/`, `logos/`, `notifications/`, `principal-photo/`, `teachers/`

How to add:
1. Place the file into the relevant folder.
2. Import the asset in the target data/component file.
3. Reference the imported variable in JSX/data objects.
4. Prefer consistent file naming using lowercase with hyphens.

## 5) Update navbar menu items

Navbar source:
- `src/components/Navbar.jsx` -> `navItems`

How to update:
1. Edit top-level entries in `navItems` for main menu labels and links.
2. Edit `submenu` arrays for dropdown items.
3. For external links, use `external: true` and full URL in `href`.
4. Ensure each internal route exists in app routes:
   - `src/App.jsx`
   - `src/pages/submenu/SubmenuRouteHandler.jsx`

## 6) CSS structure overview

Single entry import:
- `src/main.jsx` imports `src/css/base.css`

CSS organization:
- `src/css/base.css`: variables, reset, global styles, and central `@import` list.
- `src/css/header.css`: header styles.
- `src/css/navbar.css`: navbar and dropdown styles.
- `src/css/hero.css`: hero section.
- `src/css/director.css`: director desk.
- `src/css/courses.css`: courses section.
- `src/css/infocards.css`: info cards.
- `src/css/notices.css`: notices strip + notices board.
- `src/css/footer.css`: footer styles.
- `src/css/animations.css`: keyframes + reveal helpers.
- `src/css/home.css`: announcements, banner, campus, social sections.
- `src/css/submenu.css`: shared submenu/page styles.
- `src/css/chatbot.css`: chatbot widget.
- `src/css/forms.css`: form styles.
- `src/css/responsive.css`: media queries.

Why there appears to be repeated CSS:
- `src/styles.css` is the older monolithic stylesheet that still holds many base selectors.
- `src/css/base.css` imports that file first, then the newer modular CSS files override or extend it.
- This means some selectors appear to be written twice on purpose: the later modular file wins when the same selector is repeated.
- If you change a layout rule and it does not apply, check import order first. A later file such as `navbar.css`, `submenu.css`, or `responsive.css` may be overriding it.
- `src/css/responsive.css` is intentionally used for shared media queries, while component-specific responsive fixes can live beside the component stylesheet when needed.

Compatibility file:
- `src/css/index.css` forwards to `base.css` and can be treated as legacy.

## 7) Project structure quick map

- `src/components/`: reusable UI sections.
- `src/pages/`: route-level pages.
- `src/pages/submenu/`: submenu page templates + data.
- `src/pages/submenu/departmentSections/`: standalone route pages for department subsections.
- `src/pages/submenu/departmentSections/content/`: per-department demo data files for About Department, Vision & Mission, Faculty, Lesson Plans, and Time Table.
- `src/data/`: content/data lists (notices, updates).
- `src/assets/new-assets/`: static media and downloadable docs.
- `src/css/`: centralized stylesheet modules.
- `src/styles.css`: legacy base stylesheet imported by `src/css/base.css`.

## 8) Validation checklist after content edits

1. Run the app and open home + submenu pages.
2. Test navbar dropdown links on desktop and mobile widths.
3. Open notices and document links to confirm they resolve.
4. Check responsive layout after CSS changes.

## 9) Additional pages added from live-site gap scan

These pages were added as dedicated route-level entries and should be maintained like other core pages:

- `src/pages/TopLevelSections.jsx` -> route: `/top-level-sections`
- `src/pages/Events.jsx` -> route: `/events`
- `src/pages/StudentHelpline.jsx` -> route: `/student-helpline`
- `src/pages/ContentDifferences.jsx` -> route: `/content-differences`
- `src/pages/Staff.jsx` -> route: `/staff`

Where routes are wired:
- `src/App.jsx`

Where quick access links were exposed:
- `src/components/Footer.jsx`

## 10) Route hygiene rules

When adding a new page, always update all three layers:
1. Create page component in `src/pages/`.
2. Register route in `src/App.jsx`.
3. Add at least one visible navigation entry (navbar submenu, footer quick link, or in-page CTA).

If a page is intentionally internal-only, document that decision in this guide to avoid accidental cleanup.

## 11) Content consistency and naming rules

1. Keep category names normalized in `noticesBoardData` (`Admission`, `Academic`, `Event`, etc.) to preserve existing filters.
2. Keep all dates human-readable and consistent (example: `05 May 2025` or `Mar 2026`, but avoid mixing random formats in one section).
3. Use stable route slugs with lowercase and hyphens (`/student-helpline`, not `/StudentHelpline`).
4. Prefer adding new content blocks in data files before duplicating JSX structures.

## 12) Pre-deploy quick checks

Before pushing changes:
1. Run `npm run lint`.
2. Run `npm run build`.
3. Manually open these critical routes: `/`, `/all-notices`, `/admission-form`, `/life-at-siet`, `/events`, `/student-helpline`.
4. Confirm at least one PDF/document link opens correctly from the notices board.

## 13) HostingRaja / Apache deployment

This project must be deployed from the Vite build output, not from the source root.

1. Run `npm run build`.
2. Upload the contents of `dist/` to the hosting document root, or point the document root directly at `dist/` if your control panel allows it.
3. Keep the `dist/.htaccess` file in place so React Router routes continue to resolve to `index.html`.
4. Do not deploy the source `index.html` with `/src/main.jsx` as the live entry file; that file is only for the Vite source tree.
5. If the site is hosted in a subdirectory instead of the domain root, update `vite.config.js` `base` to match that path before building.

## 14) Backend implementation reference

Backend planning and implementation notes are documented in:
- `BACKEND.md`

Use this document when you want to migrate static frontend content to API-driven content (notices, departments, courses, events, forms).

## 15) Program count consistency rule

The website now presents six B.Tech programs as the canonical offering:
1. Computer Science and Engineering (Core)
2. Computer Science and Engineering (AI & ML)
3. Computer Science and Engineering (Cyber Security)
4. Robotics & Automation
5. Electrical Engineering
6. Electronics Engineering (VLSI Design)

When updating homepage copy, chatbot answers, submenu content, or course summaries, do not publish outdated text that lists only three programs.

## 16) Cleanup policy for unused files

Before adding new components, verify whether an existing component is still in use.
If a component is not imported anywhere and has no route usage, remove it to avoid stale code.
