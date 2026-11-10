# SQLite to MongoDB Atlas migration

MongoDB Atlas is now the only authoritative runtime CMS store. Active authentication, sessions, audits, dashboard, enquiry submission and lead views use Mongoose. `schema.sql`, `cms/db.ts`, and the Node SQLite declaration remain isolated migration references; active routes must not import them.

## Collection mapping

Identity tables map to `roles`, `users`, `sessions`, `loginattempts`, and `auditlogs`. CMS tables map to `pages`, `pagerevisions`, `pagesections`, `courses`, `centres`, `blogposts`, `testimonials`, `facultyprofiles`, `navigationitems`, `sitesettings`, `redirectrules`, and `seometadata`. Media maps to `mediaassets` and `mediausages`; forms to `forms`, `formversions`, and `formsubmissions`; CRM to `leads`, `leadactivities`, and `leadassignments`.

Mongoose schemas define unique slugs/paths, compound revision/version indexes, status enums, reference IDs, timestamps and pagination indexes. Published revisions and form versions are separate immutable records. Images remain in local public storage or Cloudinary, never MongoDB binaries.

## Migration utility

`tools/didm-cms/migrate-sqlite-to-mongodb.mjs` opens the source read-only. Explicit contracts in `migration-core.mjs` follow the checked-in SQLite schema rather than a generic snake-case converter. They include `collection_name` → `collectionName`, exact JSON destinations, strict SQLite booleans, valid-date checks, site-setting key identity, references and compatible password hash/salt fields.

The default is dry-run and emits `sqlite-to-mongodb-migration-report.json`. Each collection reports `source`, `valid`, `invalid`, `inserted`, `existing`, `rejected` and row issues. Mongoose validation runs before writes; validation/rejection exits non-zero. Writes require `--execute` and `--approve-atlas-write`. Existing `_id` values are skipped, never updated. Sessions are revoked rather than copied.

Before an approved execution, back up both stores, run dry-run, review validation/counts, use a staging Atlas database, then execute and independently compare counts and references. Multi-document lead/submission and publish operations require Atlas replica-set transactions. Rollback means stopping the application, restoring the prior release and untouched SQLite file; MongoDB records are not automatically deleted.
