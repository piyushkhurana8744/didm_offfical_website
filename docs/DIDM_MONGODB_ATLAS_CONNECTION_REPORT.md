# DIDM MongoDB Atlas connection report

Verification date: 2026-11-05. Scope: read-only diagnostics only. No bootstrap, migration, index creation, fixture insertion, update or deletion was executed.

## Environment and isolation

- `apps/web/.env.local` is present and loaded by the verifier; root `.env.local` is absent.
- `MONGODB_URI`, `MONGODB_DB_NAME`, and `TEST_MONGODB_DB_NAME` are non-empty.
- The `TEST_MONGODB_URI` key exists but its value is empty. No secret values were printed or copied.
- `.gitignore` rule `.env*.local` covers both supported `.env.local` locations.
- The verifier never substitutes `MONGODB_URI` for a missing test URI.
- Application name is required to be `didm_cms`; test name is required to be exactly `didm_cms_test`; equality is rejected.

## Actual Atlas result

Application/development connection: **network connection and `ping` succeeded; intended database access failed**. With approved network access, the credential reached Atlas and pinged `didm_cms`, then Atlas denied the first read-only `listCollections` request with sanitized category `authentication_or_authorization` (`MongoServerError`, code 8000). No collection data was read.

Test connection: **not attempted — `TEST_MONGODB_URI` is empty**.

Application ping is the only passed Atlas operation. Credential-scope verification, physical index inspection and transaction-capability inspection could not continue after the intended-database authorization denial. The test connection remains blocked by an empty `TEST_MONGODB_URI`. Test preparation was correctly not run.

## Index readiness

The read-only verifier compares physical indexes with the checked-in manifest for user email, role name, session token hash, session TTL/user lookup, page/course/centre/form slugs, page and form revision uniqueness, media stable key/public path/hash, submissions, leads, activities and audits. Physical existing/missing results remain unavailable until a real connection succeeds. It never creates application indexes.

## Safe commands

After placing the four variables in a supported ignored `.env.local` location, run from the repository root:

```sh
pnpm --filter web cms:atlas:verify
```

Only after that command reports both connections successful, intended database readability, cross-database denial, index status and transaction capability, prepare the isolated test database with:

```sh
pnpm --filter web cms:test:prepare -- --approve-test-writes
```

The preparation command refuses application credentials, requires the exact `didm_cms_test` name and requires the explicit `--approve-test-writes` flag. It creates/ensures indexes only in the test database, uses `didm_test_<uuid>` fixture IDs, verifies a test user/session and lead/activity transaction, and deletes only those recorded fixture IDs. It never drops a collection or database. Do not run it against `didm_cms`.

## Remaining configuration issue

Grant the configured development identity read access to `didm_cms` (and later the minimum required development write permissions), and set a non-empty, independently scoped `TEST_MONGODB_URI`. Then rerun the read-only verifier. Physical indexes, transaction support, cross-database denial and fixture cleanup remain unknown.

## Local verification

- TypeScript validation: passed.
- Next.js production build: passed with 65 routes/pages and `.env.local` loaded.
- Atlas writes, SQLite migration, administrator bootstrap and deployment: not performed.
