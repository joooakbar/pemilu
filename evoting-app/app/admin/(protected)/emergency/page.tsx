import { getAuthPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import EmergencyButton from "@/components/admin/EmergencyButton";

export const metadata = { title: "Emergency Stop" };

export default async function EmergencyPage() {
  const payload = await getAuthPayload();
  if (payload?.role !== "ADMIN") redirect("/admin/dashboard");

  const election = await prisma.pemilihan.findFirst({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-destructive">
          ⚠ Emergency Stop
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gunakan hanya jika ada serangan siber atau kondisi darurat
        </p>
      </div>
      {election ? (
        <EmergencyButton
          election={{
            id: election.id,
            nama: election.nama,
            status: election.status,
          }}
        />
      ) : (
        <p className="text-muted-foreground">Tidak ada election aktif.</p>
      )}
    </div>
  );
}
