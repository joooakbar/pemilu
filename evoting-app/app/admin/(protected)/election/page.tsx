import { getAuthPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getElectionInfo } from "@/sanity/lib/fetchers";
import ElectionManager from "@/components/admin/ElectionManager";
import type { ElectionDB } from "@/types";

export const metadata = { title: "Manajemen Election" };

export default async function ElectionPage() {
  const payload = await getAuthPayload();
  if (payload?.role !== "ADMIN") redirect("/admin/dashboard");

  const [elections, sanityInfo] = await Promise.all([
    prisma.pemilihan.findMany({ orderBy: { createdAt: "desc" } }),
    getElectionInfo(),
  ]);

  const mapped: ElectionDB[] = elections.map((e) => ({
    id: e.id,
    sanityId: e.sanityId,
    nama: e.nama,

    // FIX PENTING: paksa ke union type (biar tidak jadi string)
    status: e.status as ElectionDB["status"],

    startTime: e.startTime.toISOString(),
    endTime: e.endTime.toISOString(),
    tempatVoting: e.tempatVoting,
    deskripsi: e.deskripsi,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Election</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sinkronisasi data pemilihan dari Sanity CMS ke database, atau buat
          election secara manual.
        </p>
      </div>

      <ElectionManager initialElections={mapped} sanityInfo={sanityInfo} />
    </div>
  );
}
