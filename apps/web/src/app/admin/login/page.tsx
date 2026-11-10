import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/cms/auth";
import { LoginForm } from "./LoginForm";
export default async function AdminLogin() {
  if (await currentAdmin()) redirect("/admin");
  return <main className="min-h-screen bg-neutral-950 text-white grid place-items-center p-6"><section className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-2xl"><p className="text-sm font-semibold text-red-500">DIDM CONTROL CENTER</p><h1 className="mt-2 text-3xl font-bold">Welcome back</h1><p className="mb-8 mt-2 text-sm text-neutral-400">Authorized staff access only. Sessions expire automatically.</p><LoginForm /></section></main>;
}
