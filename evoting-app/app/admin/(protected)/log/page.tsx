import prisma from "@/lib/db";
import LogTable from "@/components/admin/LogTable";

export const metadata = { title: "Log Aktivitas" };

export default async function LogPage() {
  const logs = await prisma.logAktivitas.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: { select: { username: true, role: true } } },
  });

  const data = logs.map((l) => ({
    id: l.id,
    action: l.action,
    role: l.role ?? l.user?.role ?? "—",
    username: l.user?.username ?? "sistem",
    entity: l.entity ?? "—",
    ipAddress: l.ipAddress ?? "—",
    metadata: l.metadata,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Log Aktivitas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          200 aktivitas terbaru
        </p>
      </div>
      <LogTable data={data} />
    </div>
  );
}
