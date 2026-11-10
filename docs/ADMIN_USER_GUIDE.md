# Admin user guide

## Local setup

1. Copy `.env.example` to `apps/web/.env.local` and configure `CMS_DATABASE_PATH` and `NEXT_PUBLIC_SITE_URL`.
2. Temporarily set `CMS_BOOTSTRAP_ADMIN_EMAIL`, `CMS_BOOTSTRAP_ADMIN_NAME`, and a unique password of at least 14 characters containing uppercase, lowercase, and numeric characters.
3. From `apps/web`, run `pnpm cms:bootstrap` once.
4. Remove the bootstrap password from the environment immediately.
5. Run the web application and open `/admin/login`.

The bootstrap is idempotent by email and never changes an existing account. The current working modules are the dashboard and lead list/detail. Other menu entries communicate their present implementation state and do not pretend to save changes.
