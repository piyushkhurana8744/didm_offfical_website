import Link from "next/link";
import { currentAdmin } from "@/lib/cms/auth";
import { AdminLogout } from "./AdminLogout";
const links=[["Overview","/admin"],["Pages","/admin/pages"],["Website builder","/admin/website-builder"],["Media","/admin/media"],["Courses","/admin/courses"],["Centres","/admin/centres"],["Forms","/admin/forms"],["Leads","/admin/leads"],["Blog","/admin/blog"],["Testimonials","/admin/testimonials"],["SEO","/admin/seo"],["Navigation","/admin/navigation"],["Redirects","/admin/redirects"],["Users","/admin/users"],["Roles","/admin/roles"],["Settings","/admin/settings"],["Audit logs","/admin/audit-logs"]];
export default async function AdminLayout({children}:{children:React.ReactNode}) {
  const user=await currentAdmin();
  if(!user) return <>{children}</>;
  return <div className="min-h-screen bg-[#09090b] text-neutral-100 md:grid md:grid-cols-[250px_1fr]"><aside className="border-b border-neutral-800 bg-[#111113] p-5 md:min-h-screen md:border-b-0 md:border-r"><Link href="/admin" className="text-lg font-black tracking-tight">DIDM <span className="text-red-500">Control</span></Link><nav className="mt-7 grid grid-cols-2 gap-1 md:grid-cols-1">{links.map(([label,href])=><Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white">{label}</Link>)}</nav></aside><div><header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4"><div><p className="text-sm font-semibold">{user.name}</p><p className="text-xs text-neutral-500">{user.roleId.replaceAll("_"," ")}</p></div><AdminLogout /></header><main className="p-6 lg:p-10">{children}</main></div></div>;
}
