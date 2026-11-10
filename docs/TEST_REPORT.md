# CMS test report

Tested on 2026-11-05 with Node 24 and the repository's pnpm toolchain.

- `pnpm --filter web exec tsc --noEmit`: passed.
- `pnpm --filter web build`: passed; 61 routes/pages generated and admin/API routes compiled as dynamic server routes.
- Secure bootstrap smoke test against an isolated temporary SQLite database: passed.
- Existing public routes remained buildable.

Automated browser, accessibility, API integration, permission-matrix, concurrency, backup/restore, upload-signature and PostgreSQL migration tests remain required. This report does not claim those unexecuted checks passed.
