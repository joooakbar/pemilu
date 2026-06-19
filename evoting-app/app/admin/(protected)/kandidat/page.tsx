import { getAuthPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getKandidatList } from "@/sanity/lib/fetchers";
import KandidatTable from "@/components/admin/KandidatTable";
import SyncButton from "@/components/admin/SyncButton";

export const metadata = { title: "Manajemen Kandidat" };

export default async function KandidatPage() {
  const payload = await getAuthPayload();
  if (payload?.role !== "ADMIN") redirect("/admin/dashboard");

  const [sanityKandidat, dbKandidat] = await Promise.all([
    getKandidatList(),
    prisma.kandidat.findMany({ orderBy: { noUrut: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Kandidat</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Profil kandidat dikelola di Sanity Studio · Data election &amp;
          kandidat disinkronisasi ke MySQL
        </p>
      </div>

      {/* Tombol sync terpusat */}
      <SyncButton />

      {/* Tabel kandidat */}
      <KandidatTable sanityData={sanityKandidat} dbData={dbKandidat} />
    </div>
  );
}
