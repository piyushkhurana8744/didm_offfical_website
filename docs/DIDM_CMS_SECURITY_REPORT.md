# DIDM CMS security report

Controls include scrypt hashes with random salts, timing-safe verification, opaque sessions stored as SHA-256 hashes, HttpOnly/SameSite cookies, expiration/revocation, disabled-user enforcement, persistent login throttling, server-side RBAC, Zod validation, origin checks, audit events, bounded inputs and truthful failures.

Legacy SQLite sessions are not migrated. Atlas URIs stay server-only and are never logged. Migration writes require explicit command approval and never delete the source.

Production gaps include MFA, recovery, distributed abuse controls, field-level counsellor scoping, Cloudinary signature validation, retention/erasure workflows, backup exercises, monitoring and penetration testing.

The connection cache checks live ready state, clears rejected promises, refuses database switching inside a process, validates database names and requires a distinct test-named database when `CMS_USE_TEST_DATABASE=true`. Migration execution performs schema and document preflight before inserts, skips existing IDs and never updates or deletes Atlas documents.
