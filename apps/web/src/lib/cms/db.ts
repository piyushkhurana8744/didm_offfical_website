import "server-only";

import { DatabaseSync } from "node:sqlite";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { ROLE_PERMISSIONS } from "./permissions";

type CmsDb = DatabaseSync;
const globalCms = globalThis as typeof globalThis & { __didmCmsDb?: CmsDb };

function databasePath(): string {
  const configured = process.env.CMS_DATABASE_PATH || ".data/didm-cms.sqlite";
  return isAbsolute(configured) ? configured : resolve(process.cwd(), configured);
}

function migrate(db: CmsDb) {
  const candidates = [
    resolve(process.cwd(), "src/lib/cms/schema.sql"),
    resolve(process.cwd(), "apps/web/src/lib/cms/schema.sql"),
  ];
  const schemaPath = candidates.find((candidate) => {
    try { readFileSync(candidate); return true; } catch { return false; }
  });
  if (!schemaPath) throw new Error("CMS schema.sql could not be located");
  db.exec(readFileSync(schemaPath, "utf8"));
  const now = new Date().toISOString();
  const insert = db.prepare(
    "INSERT OR IGNORE INTO roles (id,name,permissions_json,created_at) VALUES (?,?,?,?)"
  );
  for (const [id, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    insert.run(id, id.replaceAll("_", " "), JSON.stringify(permissions), now);
  }
}

export function getDb(): CmsDb {
  if (!globalCms.__didmCmsDb) {
    const path = databasePath();
    mkdirSync(dirname(path), { recursive: true });
    const db = new DatabaseSync(path);
    migrate(db);
    globalCms.__didmCmsDb = db;
  }
  return globalCms.__didmCmsDb;
}

export function nowIso() { return new Date().toISOString(); }
export function newId(prefix: string) { return `${prefix}_${randomUUID()}`; }

export function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

export function transaction<T>(fn: () => T): T {
  const db = getDb();
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function audit(input: {
  actorUserId?: string | null; action: string; entityType: string;
  entityId?: string | null; metadata?: unknown; ipAddress?: string | null;
}) {
  getDb().prepare(
    "INSERT INTO audit_logs (id,actor_user_id,action,entity_type,entity_id,metadata_json,ip_address,created_at) VALUES (?,?,?,?,?,?,?,?)"
  ).run(newId("audit"), input.actorUserId || null, input.action, input.entityType,
    input.entityId || null, JSON.stringify(input.metadata || {}), input.ipAddress || null, nowIso());
}
