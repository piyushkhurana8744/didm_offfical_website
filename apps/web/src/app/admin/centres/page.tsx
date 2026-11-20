import { requireAdmin } from "@/lib/cms/auth";
import { hasPermission } from "@/lib/cms/permissions";
import { getAllCentres } from "@/lib/content";
import { CentresLocationManager } from "./CentresLocationManager";

export default async function CentresAdminPage() {
  const user = await requireAdmin("centres.read");
  const centres = getAllCentres();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Training Centres & Location Manager</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-400">
            Audit, edit, and validate official training centre addresses, PIN codes, coordinates, and Google Maps destinations. Prevents publishing invalid coordinates, unverified place IDs, or malformed postal codes.
          </p>
        </div>
      </div>

      <CentresLocationManager
        initialCentres={centres}
        canWrite={hasPermission(user.permissions, "centres.write")}
        canPublish={hasPermission(user.permissions, "centres.publish")}
      />
    </div>
  );
}
