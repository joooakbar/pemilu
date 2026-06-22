import prisma from "@/lib/db";

export async function updateElectionStatus() {
  const now = new Date();

  const elections = await prisma.pemilihan.findMany();

  console.log("NOW:", now);

  for (const e of elections) {
    let newStatus: "DRAFT" | "ACTIVE" | "ENDED" = "DRAFT";

    if (e.startTime && e.endTime) {
      const start = new Date(e.startTime);
      const end = new Date(e.endTime);

      if (now < start) {
        newStatus = "DRAFT";
      } else if (now <= end) {
        newStatus = "ACTIVE";
      } else {
        newStatus = "ENDED";
      }
    }

    console.log({
      id: e.id,
      currentStatus: e.status,
      newStatus,
      startTime: e.startTime,
      endTime: e.endTime,
    });

    if (e.status !== newStatus) {
      await prisma.pemilihan.update({
        where: { id: e.id },
        data: { status: newStatus },
      });

      console.log(`Updated ${e.id} → ${newStatus}`);
    }
  }
}
