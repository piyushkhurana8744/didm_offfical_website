# Database schema

The executable schema is [`apps/web/src/lib/cms/schema.sql`](../apps/web/src/lib/cms/schema.sql). It enables foreign keys and WAL mode.

Identity is represented by `roles`, `users`, `sessions`, `login_attempts`, and `audit_logs`. Content uses `pages` plus immutable `page_revisions`, `courses`, `centres`, `blog_posts`, and `generic_content`. Media uses stable records in `media_assets` and explicit reverse references in `media_usages`. Forms use a mutable draft in `forms`, immutable published snapshots in `form_versions`, and submissions bound to the exact version. CRM data uses `leads` and append-only `lead_activities`. Global configuration is held by `navigation_items`, `site_settings`, and validated `redirects`.

JSON columns are deliberate structured payload boundaries; API validation is required before all writes. Status constraints, unique slugs, foreign keys, and indexes enforce the most important invariants in storage.
