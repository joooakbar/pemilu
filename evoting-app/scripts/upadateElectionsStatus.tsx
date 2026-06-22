import prisma from "@/lib/db";

export async function updateElectionStatus() {
  const now = new Date();

  const elections = await prisma.pemilihan.findMany();

  for (const e of elections) {
    console.log("STATUS DB:", e.id, e.status);

    if (e.status === "SUSPENDED") {
      console.log("SKIP SUSPENDED:", e.id);
      continue;
    }

    if (
      e.status === "ENDED" &&
      now >= new Date(e.startTime) &&
      now <= new Date(e.endTime)
    ) {
      console.log("SKIP ENDED:", e.id);
      continue;
    }

    let newStatus: "DRAFT" | "ACTIVE" | "ENDED" = "DRAFT";

    const start = new Date(e.startTime);
    const end = new Date(e.endTime);

    if (now < start) {
      newStatus = "DRAFT";
    } else if (now <= end) {
      newStatus = "ACTIVE";
    } else {
      newStatus = "ENDED";
    }

    console.log("[CRON]", e.id, "current:", e.status, "new:", newStatus);

    if (e.status !== newStatus) {
      await prisma.pemilihan.update({
        where: { id: e.id },
        data: { status: newStatus },
      });

      console.log(`Updated ${e.id} → ${newStatus}`);
    }
  }
}
