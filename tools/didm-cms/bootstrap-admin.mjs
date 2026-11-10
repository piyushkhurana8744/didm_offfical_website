import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";

const email = process.env.CMS_BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.CMS_BOOTSTRAP_ADMIN_PASSWORD || "";
const name = process.env.CMS_BOOTSTRAP_ADMIN_NAME?.trim() || "DIDM Administrator";
if (!email || !email.includes("@")) throw new Error("Set a valid CMS_BOOTSTRAP_ADMIN_EMAIL.");
if (password.length < 14 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
  throw new Error("CMS_BOOTSTRAP_ADMIN_PASSWORD must be 14+ characters with upper, lower, and numeric characters.");
}
const configured = process.env.CMS_DATABASE_PATH || ".data/didm-cms.sqlite";
const dbPath = isAbsolute(configured) ? configured : resolve(process.cwd(), configured);
mkdirSync(dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);
db.exec(readFileSync(resolve(process.cwd(), "src/lib/cms/schema.sql"), "utf8"));
const now = new Date().toISOString();
db.prepare("INSERT OR IGNORE INTO roles (id,name,permissions_json,created_at) VALUES (?,?,?,?)")
  .run("super_admin", "Super Admin", JSON.stringify(["*"]), now);
const existing = db.prepare("SELECT id FROM users WHERE email=?").get(email);
if (existing) {
  console.log(`Administrator ${email} already exists; no changes made.`);
  process.exit(0);
}
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
db.prepare("INSERT INTO users (id,email,name,password_hash,password_salt,role_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)")
  .run(`user_${randomUUID()}`, email, name, hash.toString("hex"), salt.toString("hex"), "super_admin", now, now);
console.log(`Created super administrator ${email}. Remove the bootstrap password from your environment now.`);
