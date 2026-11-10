export const ROLE_PERMISSIONS = {
  super_admin: ["*"],
  website_admin: [
    "dashboard.read", "pages.*", "media.*", "courses.*", "centres.*",
    "seo.*", "navigation.*", "redirects.*", "settings.read", "audit.read",
  ],
  content_editor: [
    "dashboard.read", "pages.read", "pages.write", "media.read", "media.write",
    "courses.read", "courses.write", "centres.read", "centres.write",
    "blog.*", "testimonials.*",
  ],
  marketing_manager: [
    "dashboard.read", "forms.*", "leads.*", "media.read", "pages.read",
    "pages.write", "blog.read", "blog.write",
  ],
  lead_counsellor: ["dashboard.read", "leads.read", "leads.write_assigned"],
  viewer: ["dashboard.read", "pages.read", "media.read", "courses.read", "centres.read"],
} as const;

export type RoleId = keyof typeof ROLE_PERMISSIONS;

export function hasPermission(granted: readonly string[], required: string): boolean {
  return granted.some((permission) => {
    if (permission === "*") return true;
    if (permission === required) return true;
    if (permission.endsWith(".*")) return required.startsWith(permission.slice(0, -1));
    return false;
  });
}
