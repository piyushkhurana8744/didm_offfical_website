# CMS security report

Implemented controls include scrypt password hashing with a random per-user salt, timing-safe comparison, random 256-bit session tokens stored only as SHA-256 hashes, HttpOnly/SameSite cookies, eight-hour expiration, revocation, disabled-account checks, database-backed login throttling, origin validation, server-side permissions, parameterized SQL, transactional lead creation, bounded input, consent validation, and security audit events.

Known gaps before production approval include password recovery, MFA, centralized rate limiting for multiple instances, CSRF tokens beyond strict cookies/origin validation, field-level CRM authorization, encryption/key management decisions, automated dependency/security scanning, production penetration testing, retention erasure tooling, and PostgreSQL migration. SQLite files and environment files must never be committed or served publicly.
