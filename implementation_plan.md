# Full Repository Bug Audit & Implementation Plan

I have conducted a deep review of both your frontend and backend codebases. I have identified over 20 bugs ranging from storage leaks to security vulnerabilities and architectural flaws.

## User Review Required

> [!CAUTION]
> The fixes proposed below cover a wide range of files and architectural elements (like adding Environment Variables for the API base URL). Please review this list carefully and let me know if you would like me to fix all of them, or if you prefer to tackle them in phases (e.g., Fix Backend Leaks first, then Security, then Frontend).

## Open Questions

1. **Cloud Storage**: Some of the storage leaks are on the backend's local disk. As we discussed earlier, Render uses an ephemeral disk. Should I focus purely on fixing the code logic for the leaks first, or would you like to pivot to setting up Cloudinary immediately?
2. **Rate Limiting**: For public endpoints (login, contact forms), I recommend adding `express-rate-limit`. Do I have your approval to install this dependency on the server?
3. **Frontend API URL**: Replacing the hardcoded `https://null-e3uj.onrender.com/api` with `import.meta.env.VITE_API_URL` requires you to add a `.env` file to your frontend deployment (Vercel). Are you comfortable with me making this switch?

## Proposed Bug Fixes (20 Identified Bugs)

### Storage Leaks (Orphaned Files)
When file uploads occur on the backend, `multer` saves them to disk before the database executes. If the database fails, the file is abandoned forever. Deletions also fail to remove the physical files.

1. **Event Creation Leak:** `events.js` does not delete `req.file` if the database insert fails.
2. **Event Update Leak:** `events.js` does not delete the new `req.file` if the database update fails.
3. **Event Deletion Leak:** `events.js` deletes the event from the database but abandons the physical `file_path`.
4. **Faculty Creation Leak:** `faculty.js` leaves `req.file` on disk if the DB insert throws an error.
5. **Faculty Update Leak:** `faculty.js` does not delete the new `req.file` if the DB update throws an error.
6. **Faculty Deletion Leak:** `faculty.js` deletes the faculty member but abandons the physical `image_path`.
7. **Notice Creation Leak:** `notices.js` leaves `req.file` on disk if the DB insert fails.
8. **Notice Update Leak:** `notices.js` does not delete the new `req.file` if the DB update fails.
9. **Notice Deletion Leak:** `notices.js` deletes the notice but abandons the physical `file_path`.

### Security Vulnerabilities
10. **Missing JWT Secret Fallback:** `auth.js` uses `process.env.JWT_SECRET` directly. If missing, tokens are signed with `undefined`, allowing attackers to forge auth tokens effortlessly.
11. **No Login Rate Limiting:** `auth.js` lacks rate limiting, making the admin panel vulnerable to brute-force password guessing.
12. **Unprotected Public Forms (Contact):** `contact.js` lacks rate limiting/bot protection, enabling spam attacks that can fill up the DB.
13. **Unprotected Public Forms (Applications):** `applications.js` has the same spam vulnerability.
14. **Unprotected Public Forms (Events):** `events.js` (registration) has the same spam vulnerability.
15. **Unsafe Visitor Hit Counter:** `visitors.js` exposes `/api/visitors/hit` with no session tracking or limits. A simple script can artificially inflate visitor stats infinitely.

### Data Integrity & Logic Flaws
16. **Crash on Malformed JSON:** `faculty.js` parses `departments` using `JSON.parse()`. If an invalid JSON string is sent, the server crashes (500 error) and orphans the uploaded file.
17. **Timezone Mismatch (Notices):** `notices.js` saves `publish_date` in UTC but queries with `NOW()` (which relies on the DB server's local timezone). Notices might publish hours early or late.
18. **Unvalidated Status Updates:** `applications.js` allows updating an application's status to any arbitrary string (e.g., `"HACKED"`), breaking frontend filters.
19. **Partial Settings Updates:** `settings.js` uses `Promise.all` for multiple queries without a database transaction. If one fails, the system is left in a corrupted/partial state.

### Architecture & Configuration
20. **Hardcoded Frontend API URLs:** Almost every React component hardcodes `https://null-e3uj.onrender.com/api`. This violates modern practices and makes local testing or staging deployments impossible.
21. **Hardcoded Backend CORS Origins:** `server.js` hardcodes CORS domains. This breaks the app if you ever change your frontend domain, rather than loading from environment variables.

---

**Proposed Action:**
With your approval, I will systematically go through these bugs and apply the necessary fixes across the backend routes and frontend components.
