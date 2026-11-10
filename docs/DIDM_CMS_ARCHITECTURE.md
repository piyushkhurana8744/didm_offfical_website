# DIDM CMS architecture

MongoDB Atlas is the authoritative CMS database. Next.js server components and route handlers use a cached, server-only Mongoose connection configured exclusively by `MONGODB_URI` and `MONGODB_DB_NAME`; missing or unavailable configuration fails clearly and never falls back to SQLite. Zod validates active mutation payloads.

Opaque administrator session tokens are placed in HttpOnly/SameSite cookies and stored only as SHA-256 hashes. Passwords retain per-user random salts and scrypt hashes. Roles provide server-enforced permissions. Authentication attempts and security/content events are persistent collections.

Mongoose models cover identity, CMS content and immutable revisions, media metadata/usage, versioned forms/submissions, and CRM leads/activity/assignments. Atlas replica-set transactions protect multi-document workflows. Public static content remains the transition fallback until each content domain has a published MongoDB record.

The former SQLite implementation is isolated under `src/lib/cms/db.ts`, `schema.sql`, and migration tooling only. It is not imported by active application routes.
