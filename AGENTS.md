# AGENTS.md — Production Engineering Contract

This repository is the production codebase for the SIET Panchkula college website and its admin system. Treat every change as a change to a live, security-sensitive application handling public content and administrative/student data.

## Mission

Keep the application **secure, reliable, performant, maintainable, and production-safe**. Do not optimize for “the code runs” alone. Every change must preserve the complete system: frontend, backend, database, authentication, authorization, file storage, deployments, observability, and existing user flows.

## Non-negotiable engineering loop

For every task, feature, bug fix, refactor, dependency change, schema change, or deployment change, follow this loop:

1. **Inspect** — Read the relevant frontend, backend, database/schema, tests, configuration, environment usage, and deployment workflows before editing.
2. **Understand the flow** — Trace the request/data path end-to-end: browser → API → auth → validation → business logic → database/storage → response → UI.
3. **Threat model** — Check authentication, authorization, CSRF, CORS, injection, XSS, SSRF, file upload abuse, IDOR/BOLA, secrets, session handling, rate limits, abuse/spam, logging/privacy, and dependency risk.
4. **Performance review** — Check database query count, N+1 queries, indexes, payload size, pagination, memory use, file buffering, repeated network calls, rendering cost, caching, connection usage, and unnecessary work.
5. **Implement the smallest safe change** — Preserve existing contracts unless the task explicitly requires a breaking change.
6. **Test the changed path** — Add/update regression tests for the bug or security property, not just a happy-path test.
7. **Regression pass** — Re-check adjacent routes/components, schema compatibility, existing API contracts, and production configuration.
8. **Verify** — Run appropriate tests, lint/build, and security/static checks. Never claim a fix is complete without evidence.
9. **Document only durable knowledge** — Keep this file focused on engineering rules and unresolved production findings. Do not turn it into a permanent changelog.

When a change fixes one of the tracked findings below, **remove that specific finding from the “Current Production Findings” section only after the fix is implemented and verified**. Do not remove the engineering rules that prevent recurrence. If a finding is only partially mitigated, keep it listed and mark the remaining gap.

## Production security baseline

- Never commit real credentials, API keys, JWT secrets, database passwords, FTP credentials, private tokens, or default production passwords.
- Secrets must come from deployment/runtime secret storage or environment variables. Bootstrap/reset scripts must never contain a reusable hardcoded credential.
- Treat authentication and authorization separately. Authentication proves identity; every sensitive operation must also enforce the correct role/permission.
- Default-deny privileged operations. A valid login must not automatically imply permission to mutate every admin module.
- Use exact allowlists for CORS origins. Never approve an origin because it merely contains a substring such as `localhost`.
- Minimize credentialed cross-origin requests. Prefer same-site architecture where practical. If cross-site cookies are required, implement explicit CSRF protection and strict Origin/Referer validation where appropriate.
- JWT/session claims must not be the sole source of truth for security-sensitive state when permissions can change. Support revocation/rotation for privileged sessions.
- Validate and constrain all external input: type, length, format, allowed values, nesting depth, and business rules.
- Parameterize database queries. Do not construct SQL from untrusted identifiers/values.
- File upload validation must not rely on filename extension alone. Validate content type/signature where practical, enforce size/count limits, use safe generated names, and store uploads so they cannot execute as application code.
- Do not expose private/admin data through public endpoints. Public configuration endpoints must use an explicit allowlist of fields.
- Use encrypted transport for credentials and file transfer. Plain FTP is not acceptable for production secrets or production uploads.
- Rate limiting must account for the real abuse case; IP-only throttling is not a complete anti-abuse strategy for distributed attacks.
- Avoid leaking sensitive internals in API errors. Log detailed server-side diagnostics; return safe client-facing errors.
- Protect logs and analytics from spoofing and untrusted forwarded headers. Only trust proxy headers when the deployment explicitly configures trusted proxies.
- Apply security headers, safe cookie attributes, and appropriate request/body limits at the edge and application layers.

## Production performance baseline

- Avoid N+1 database queries. Use joins/batched queries or deliberate bounded fetching.
- Add appropriate indexes for frequent `WHERE`, `JOIN`, and `ORDER BY` paths.
- Paginate admin lists and other potentially unbounded collections.
- Do not load large files into process memory unless the limit is intentionally small and the memory cost is acceptable for the production instance.
- Avoid repeated network connections when pooling/reuse is possible.
- Keep public API responses minimal and intentional; never return `SELECT *` for large/sensitive tables when a field allowlist is appropriate.
- Keep frontend bundles and initial data reasonable; use lazy loading/code splitting where it materially helps.
- Prefer deterministic, measurable fixes over speculative micro-optimizations.
- Re-check performance after security fixes; mitigations must not create obvious bottlenecks or denial-of-service paths.

## Database and migration rules

- Treat database schema and application code as one contract.
- Before changing a column name/type, verify every reader, writer, query, seed script, migration, test, and frontend consumer.
- New schema changes require an explicit migration strategy and backward-compatibility analysis when production data already exists.
- Do not rely on `CREATE TABLE IF NOT EXISTS` as a substitute for real schema migration/versioning.
- Do not silently swallow migration failures if the application depends on the changed schema. A service must not appear healthy while required database state is unavailable.
- Prefer transactions for multi-step writes that must remain consistent.
- Add foreign keys/constraints where they represent real business invariants, such as references between registrations and events.
- Validate IDs and business relationships before writes.
- Review indexes and query plans for high-volume paths.

## API and admin authorization rules

- Every admin mutation route must explicitly declare its required role/permission.
- Do not assume the frontend hides a privileged action; authorization belongs on the server.
- Public write endpoints must be intentionally public and separately protected against abuse.
- State-changing endpoints must be protected against CSRF when browser credentials are automatically attached.
- Sensitive reads must return only the fields the caller actually needs.
- Use consistent status codes and error contracts so frontend behavior does not become fragile.

## Upload and storage rules

- Uploads are untrusted input.
- Validate extension, MIME type, and content signature as appropriate to the file class.
- Enforce per-request and aggregate upload limits.
- Generate storage names server-side; never trust the client filename for the storage path.
- Prefer HTTPS/FTPS/SFTP or an object-storage API over plain FTP.
- Keep private files private. Public files must be intentionally public.
- If replacing a stored file, preserve consistency between database state and remote storage; avoid orphaning the new or old file on partial failure.

## Testing requirements

At minimum, sensitive backend changes should cover:

- unauthenticated access → denied;
- wrong role/permission → denied;
- authorized access → succeeds;
- malformed/oversized input → rejected safely;
- relevant abuse/rate-limit behavior;
- database failure behavior;
- storage/upload failure behavior;
- regression for the original bug.

Security-sensitive code should include negative tests. A test that only proves the happy path is not sufficient evidence.

## CI/CD requirements

- Backend tests must run in CI, not only frontend tests.
- Production builds must be validated before deployment.
- Run linting/static analysis and dependency/security scanning where practical.
- Keep CodeQL/security workflows enabled and investigate meaningful findings rather than suppressing them without justification.
- Do not weaken CI merely to make a failing check green.
- Deployment configuration must be reviewed alongside application code when environment behavior affects security or correctness.

## Current Production Findings

These are known findings from the current codebase audit. They are intentionally written as actionable items. **When an agent fixes and verifies an item, remove that item from this section.**

### P0 — Release blockers

- [ ] **Hardcoded admin credential in repository:** `server/create_admin.js` and `server/reset_admin.js` contain a reusable admin password. Remove hardcoded credentials, rotate any credential that may have been exposed, and make bootstrap/reset require secure runtime-provided secrets. Verify repository/history exposure is addressed as appropriate.
- [ ] **CORS origin validation is unsafe:** `server/server.js` accepts origins using substring checks such as `includes('localhost')` and `includes('127.0.0.1')`, and uses credentialed CORS. Replace with exact origin allowlisting and verify cross-origin behavior with negative tests.
- [ ] **CSRF protection is missing for credentialed admin requests:** production cookies use `SameSite=None; Secure`, while authenticated state-changing routes do not show explicit CSRF protection. Implement a deliberate CSRF strategy or redesign the authentication flow to avoid unnecessary cross-site credentialing. Add attack/regression tests.
- [ ] **Admin authorization is too broad on multiple mutation routes:** several admin mutations use authentication middleware without enforcing the role/permission model. Audit every admin endpoint and make authorization explicit, server-side, default-deny.

### P1 — High risk / production correctness

- [ ] **Public settings exposure:** `GET /api/settings` returns every row from `site_settings`. Introduce an explicit public-settings allowlist and prevent sensitive/internal settings from being exposed.
- [ ] **Plain FTP for production file transfer:** `server/config/ftp.js` uses `secure: false`. Migrate to encrypted transport/storage and verify credential handling.
- [ ] **Gallery schema/route mismatch:** database setup creates `image_path` and `created_at`, while `server/routes/gallery.js` uses `imagePath` and `createdAt`. Reconcile schema and route contracts, preserve existing production data, and add integration coverage.
- [ ] **Migration failure can be hidden:** `server/utils/ensureTables.js` catches migration errors and allows the server to continue. Replace this behavior with explicit readiness/health semantics so required schema failures cannot masquerade as a healthy service.
- [ ] **Event registration lacks event-existence validation:** public registration accepts an `event_id` and inserts it without proving the event exists; the shown schema also lacks a foreign key. Validate the relationship and enforce the invariant in the database where appropriate.
- [ ] **JWT permissions/session state can become stale:** authorization relies on claims embedded in a 24-hour token. Introduce an appropriate revocation/versioning strategy and ensure role/permission changes take effect within the required operational window.

### P2 — Medium risk / resilience

- [ ] **File validation is extension-based:** document/image upload filters inspect filename extensions but do not verify file content/signatures. Strengthen validation and storage isolation.
- [ ] **Memory-heavy upload path:** several Multer handlers use `memoryStorage()` with multi-megabyte limits. Evaluate worst-case concurrent memory usage and use streaming/disk/object storage where appropriate.
- [ ] **Public form validation is weak:** applications/contact/event registration endpoints mainly check required fields and use IP rate limits. Add bounded lengths, format validation, business rules, and abuse controls appropriate for production traffic.
- [ ] **Trusted proxy/IP handling needs explicit configuration:** login logging consumes `x-forwarded-for` directly. Configure trusted proxies and use framework-aware client-IP handling so security/audit logs cannot be trivially spoofed.
- [ ] **Admin list endpoints can grow without pagination:** audit potentially unbounded list queries and add pagination/indexing where necessary.
- [ ] **Backend CI coverage is incomplete:** current CI workflow runs client tests but not the backend test suite. Add backend tests and security regression coverage to CI.

## Bug-removal protocol

When resolving a tracked finding:

1. Reproduce or establish the failure/security property before editing.
2. Fix the root cause, not only the observed symptom.
3. Add a regression test or other repeatable verification where feasible.
4. Run the relevant test/build/security checks.
5. Re-audit neighboring code for the same pattern.
6. Only then remove the resolved item from **Current Production Findings** and record the fix in the commit/PR message.

## Definition of done

A change is **not done** merely because the UI looks correct or a single test passes. It is done when:

- functionality works for the intended flow;
- unauthorized/malformed/abusive flows fail safely;
- security and privacy boundaries remain intact;
- performance is reasonable for the production deployment;
- database/storage consistency is preserved;
- regression tests cover important behavior;
- CI/build/lint/security checks pass or any exception is explicitly justified;
- no new known vulnerability, secret, broken contract, or operational blind spot is introduced.

**Default mindset: assume the application will be attacked, load-tested, partially fail, and maintained by someone else. Engineer accordingly.**
