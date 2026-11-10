import { DatabaseSync } from "node:sqlite";
import { createRequire } from "node:module";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { contracts, mapAndValidate } from "./migration-core.mjs";
const require = createRequire(new URL("../../apps/web/package.json", import.meta.url));
const mongoose = require("mongoose");
const execute = process.argv.includes("--execute");
const approved = process.argv.includes("--approve-atlas-write");
const source = resolve(process.env.SQLITE_SOURCE_PATH || ".data/didm-cms.sqlite");
const reportPath = resolve(process.cwd(), "sqlite-to-mongodb-migration-report.json");
if (!existsSync(source)) throw new Error(`SQLite source not found: ${source}`);
if (execute && !approved) throw new Error("Writing requires --execute and --approve-atlas-write.");
const sqlite = new DatabaseSync(source, { readOnly: true });
const report = { mode: execute ? "execute" : "dry-run", source, generatedAt: new Date().toISOString(), sessions: { source: 0, valid: 0, invalid: 0, inserted: 0, existing: 0, rejected: 0, note: "Intentionally revoked and not migrated" }, collections: {}, errors: [] };
const expectedColumns={
 roles:"id name permissions_json created_at",users:"id email name password_hash password_salt role_id disabled created_at updated_at",audit_logs:"id actor_user_id action entity_type entity_id metadata_json ip_address created_at",pages:"id slug title status draft_json published_json seo_json current_revision provenance admin_edited published_at created_at updated_at",page_revisions:"id page_id revision_number content_json seo_json status created_by created_at",media_assets:"id stable_key public_path source_url filename mime_type byte_size width height sha256 alt_text caption collection_name storage_adapter deleted_at provenance created_at updated_at",media_usages:"id media_id entity_type entity_id field_name",courses:"id slug status draft_json published_json display_order provenance admin_edited updated_at",centres:"id slug status draft_json published_json display_order provenance admin_edited updated_at",forms:"id slug title status draft_schema_json published_version_id settings_json admin_edited created_at updated_at",form_versions:"id form_id version_number schema_json settings_json created_by created_at",form_submissions:"id form_id form_version_id payload_json source_url ip_hash user_agent created_at",leads:"id name email phone interested_course preferred_centre lead_source form_id source_url attribution_json assigned_user_id status priority follow_up_at created_at updated_at",lead_activities:"id lead_id actor_user_id activity_type body created_at",blog_posts:"id slug title status draft_json published_json published_at updated_at",navigation_items:"id menu parent_id label href display_order status updated_at",site_settings:"key draft_json published_json updated_at updated_by",redirects:"id source_path destination_path permanent enabled updated_at",generic_content:"id content_type slug title status data_json updated_at"
};
let connected = false;
try {
  report.sessions.source = Number(sqlite.prepare("SELECT COUNT(*) count FROM sessions").get().count);
  const schemaMismatches=Object.keys(contracts).filter(table=>{const actual=sqlite.prepare(`PRAGMA table_info(${table})`).all().map(column=>String(column.name)),expected=expectedColumns[table].split(" ");return expected.some(name=>!actual.includes(name))||actual.some(name=>!expected.includes(name));});
  if(execute&&schemaMismatches.length){report.errors.push(`Source schema mismatch: ${schemaMismatches.join(", ")}`);throw new Error("Migration write aborted during schema preflight");}
  if(execute){const invalidTables=[];for(const table of Object.keys(contracts)){for(const row of sqlite.prepare(`SELECT * FROM ${table}`).all()){try{await mapAndValidate(table,row);}catch{invalidTables.push(table);break;}}}if(invalidTables.length){report.errors.push(`Validation failed: ${invalidTables.join(", ")}`);throw new Error("Migration write aborted during document preflight");}}
  if (execute) {
    const uri = process.env.MONGODB_URI?.trim(), dbName = process.env.MONGODB_DB_NAME?.trim();
    if (!uri || !dbName) throw new Error("MONGODB_URI and MONGODB_DB_NAME are required.");
    await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 8000, maxPoolSize: 5 }); connected = true;
  }
  for (const [table, contract] of Object.entries(contracts)) {
    const actualColumns=sqlite.prepare(`PRAGMA table_info(${table})`).all().map(column=>String(column.name));
    const expected=expectedColumns[table].split(" "),missing=expected.filter(name=>!actualColumns.includes(name)),unsupported=actualColumns.filter(name=>!expected.includes(name));
    const rows = sqlite.prepare(`SELECT * FROM ${table}`).all();
    const entry = { target: contract.collection, source: rows.length, valid: 0, invalid: 0, inserted: 0, existing: 0, rejected: 0, issues: [] };
    const schemaValid=missing.length===0&&unsupported.length===0;
    if(!schemaValid){entry.issues.push({schema:true,missing,unsupported});report.errors.push(`${table}: source schema mismatch`);}
    const valid = [];
    for (const [index, row] of rows.entries()) {
      try { valid.push(await mapAndValidate(table, row)); entry.valid++; }
      catch (error) { entry.invalid++; entry.issues.push({ row: index + 1, id: row.id ?? row.key ?? null, message: error instanceof Error ? error.message : "Validation failed" }); }
    }
    if (execute && schemaValid && valid.length) {
      const collection = mongoose.connection.db.collection(contract.collection);
      const existing = new Set((await collection.find({ _id: { $in: valid.map(doc => doc._id) } }, { projection: { _id: 1 } }).toArray()).map(doc => String(doc._id)));
      entry.existing = existing.size;
      for (const doc of valid.filter(item => !existing.has(String(item._id)))) {
        try { await collection.insertOne(doc); entry.inserted++; }
        catch (error) { entry.rejected++; entry.issues.push({ id: doc._id, message: error instanceof Error ? error.message : "Insert rejected" }); }
      }
    }
    report.collections[table] = entry;
    if (entry.invalid || entry.rejected) report.errors.push(`${table}: ${entry.invalid} invalid, ${entry.rejected} rejected`);
  }
} finally {
  sqlite.close(); if (connected) await mongoose.disconnect();
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) { console.error("Migration validation failed; see report."); process.exitCode = 1; }
