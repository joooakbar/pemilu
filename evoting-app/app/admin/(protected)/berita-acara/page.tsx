import { getAuthPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import BeritaAcaraPreview from "@/components/admin/BeritaAcaraPreview";

export const metadata = { title: "Berita Acara" };

export default async function BeritaAcaraPage() {
  const payload = await getAuthPayload();
  if (payload?.role !== "ADMIN") redirect("/admin/dashboard");

  const election = await prisma.pemilihan.findFirst({
    where: { status: { in: ["ACTIVE", "ENDED"] } },
    orderBy: { createdAt: "desc" },
  });

  if (!election)
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Berita Acara</h1>
        <p className="text-muted-foreground">
          Belum ada pemilihan yang aktif atau selesai.
        </p>
      </div>
    );

  const [totalDPT, votes, kandidatRefs] = await Promise.all([
    prisma.dPT.count(),
    prisma.votes.groupBy({
      by: ["idKandidat"],
      where: { id: election.id },
      _count: {
        id: true, // ✅ FIX UTAMA
      },
    }),
    prisma.kandidat.findMany({
      where: { isActive: true },
      orderBy: { noUrut: "asc" },
    }),
  ]);

  const kandidatMap = new Map(kandidatRefs.map((k) => [k.id, k]));

  const rekapitulasi = votes
    .map((v) => {
      const k = kandidatMap.get(v.idKandidat);

      return {
        nomor: k?.noUrut ?? 0,
        nama: k?.nama ?? v.idKandidat,
        jumlah: v._count.id, // ✅ FIX DI SINI
      };
    })
    .sort((a, b) => a.nomor - b.nomor);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Berita Acara</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Rekapitulasi hasil pemilihan
        </p>
      </div>

      <BeritaAcaraPreview
        election={{
          id: election.id,
          nama: election.nama,
          status: election.status,
          startTime: election.startTime.toISOString(),
          endTime: election.endTime.toISOString(),
        }}
        totalDPT={totalDPT}
        totalSuara={votes.reduce((s, v) => s + v._count.id, 0)} // optional FIX konsisten
        rekapitulasi={rekapitulasi}
      />
    </div>
  );
}
