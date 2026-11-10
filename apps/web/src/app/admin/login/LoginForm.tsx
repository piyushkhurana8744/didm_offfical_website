"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function LoginForm() {
  const router = useRouter(); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const values = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/auth/login", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({email:values.get("email"),password:values.get("password")}) });
    const result = await response.json(); setBusy(false);
    if (!response.ok) return setError(result.error || "Sign in failed.");
    router.replace("/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="space-y-5">
    <label className="block text-sm font-medium">Email<input name="email" type="email" required autoComplete="username" className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3" /></label>
    <label className="block text-sm font-medium">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3" /></label>
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    <button disabled={busy} className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold hover:bg-red-500 disabled:opacity-60">{busy ? "Signing in…" : "Sign in securely"}</button>
  </form>;
}
