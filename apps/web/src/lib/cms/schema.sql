PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  permissions_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  role_id TEXT NOT NULL REFERENCES roles(id),
  disabled INTEGER NOT NULL DEFAULT 0 CHECK(disabled IN (0,1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  revoked_at TEXT
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id, expires_at);
CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL,
  window_started_at TEXT NOT NULL,
  blocked_until TEXT
);
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  ip_address TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_logs(created_at DESC);

CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','published','archived')),
  draft_json TEXT NOT NULL DEFAULT '{}',
  published_json TEXT,
  seo_json TEXT NOT NULL DEFAULT '{}',
  current_revision INTEGER NOT NULL DEFAULT 0,
  provenance TEXT NOT NULL DEFAULT 'admin',
  admin_edited INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS page_revisions (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL,
  content_json TEXT NOT NULL,
  seo_json TEXT NOT NULL,
  status TEXT NOT NULL,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL,
  UNIQUE(page_id, revision_number)
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  stable_key TEXT NOT NULL UNIQUE,
  public_path TEXT NOT NULL UNIQUE,
  source_url TEXT,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  sha256 TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  collection_name TEXT NOT NULL DEFAULT 'general',
  storage_adapter TEXT NOT NULL DEFAULT 'local',
  deleted_at TEXT,
  provenance TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS media_hash_idx ON media_assets(sha256);
CREATE TABLE IF NOT EXISTS media_usages (
  id TEXT PRIMARY KEY,
  media_id TEXT NOT NULL REFERENCES media_assets(id),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  UNIQUE(media_id, entity_type, entity_id, field_name)
);

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'published',
  draft_json TEXT NOT NULL,
  published_json TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  provenance TEXT NOT NULL DEFAULT 'seed',
  admin_edited INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS centres (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'published',
  draft_json TEXT NOT NULL,
  published_json TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  provenance TEXT NOT NULL DEFAULT 'seed',
  admin_edited INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS forms (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','published','archived')),
  draft_schema_json TEXT NOT NULL,
  published_version_id TEXT,
  settings_json TEXT NOT NULL DEFAULT '{}',
  admin_edited INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS form_versions (
  id TEXT PRIMARY KEY,
  form_id TEXT NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  schema_json TEXT NOT NULL,
  settings_json TEXT NOT NULL,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL,
  UNIQUE(form_id, version_number)
);
CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  form_id TEXT NOT NULL REFERENCES forms(id),
  form_version_id TEXT NOT NULL REFERENCES form_versions(id),
  payload_json TEXT NOT NULL,
  source_url TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS submissions_form_idx ON form_submissions(form_id, created_at DESC);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  interested_course TEXT,
  preferred_centre TEXT,
  lead_source TEXT NOT NULL,
  form_id TEXT REFERENCES forms(id),
  source_url TEXT,
  attribution_json TEXT NOT NULL DEFAULT '{}',
  assigned_user_id TEXT REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','qualified','follow_up','converted','lost','spam')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK(priority IN ('low','normal','high','urgent')),
  follow_up_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads(phone);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status, created_at DESC);
CREATE TABLE IF NOT EXISTS lead_activities (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  actor_user_id TEXT REFERENCES users(id),
  activity_type TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', draft_json TEXT NOT NULL,
  published_json TEXT, published_at TEXT, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS navigation_items (
  id TEXT PRIMARY KEY, menu TEXT NOT NULL, parent_id TEXT REFERENCES navigation_items(id),
  label TEXT NOT NULL, href TEXT NOT NULL, display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published', updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY, draft_json TEXT NOT NULL, published_json TEXT,
  updated_at TEXT NOT NULL, updated_by TEXT REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS redirects (
  id TEXT PRIMARY KEY, source_path TEXT NOT NULL UNIQUE, destination_path TEXT NOT NULL,
  permanent INTEGER NOT NULL DEFAULT 1, enabled INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS generic_content (
  id TEXT PRIMARY KEY, content_type TEXT NOT NULL, slug TEXT NOT NULL,
  title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL, UNIQUE(content_type, slug)
);
