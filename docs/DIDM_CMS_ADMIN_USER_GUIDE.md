# DIDM CMS administrator guide

Configure `MONGODB_URI`, `MONGODB_DB_NAME`, and `NEXT_PUBLIC_SITE_URL`. Temporarily provide the three `CMS_BOOTSTRAP_ADMIN_*` values and run `pnpm cms:bootstrap` from `apps/web`; remove the password immediately. Bootstrap is idempotent by email.

Open `/admin/login`. Dashboard and lead list/detail are functional MongoDB modules. Other entries identify incomplete foundations without simulated persistence.

Homepage editors can select a verified image under `/admin/pages/homepage/edit`, save it with the draft, preview privately and publish it with the heading. The media library at `/admin/media` shows stable local assets and their intended usage. Upload remains disabled until the server-side Cloudinary adapter is fully configured.

For legacy data, set `SQLITE_SOURCE_PATH` and run `pnpm cms:migrate:dry-run`. Review the JSON report. Do not add `--execute --approve-atlas-write` until a staging target, backup, report review and explicit approval exist.
