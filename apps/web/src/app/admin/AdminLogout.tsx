"use client";
import { useRouter } from "next/navigation";
export function AdminLogout(){const router=useRouter();return <button className="text-sm text-neutral-400 hover:text-white" onClick={async()=>{await fetch("/api/admin/auth/logout",{method:"POST"});router.replace("/admin/login");router.refresh();}}>Sign out</button>}
