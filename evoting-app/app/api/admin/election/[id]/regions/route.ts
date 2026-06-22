import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const wilayah = await prisma.votes.groupBy({
    by: ["kodeWilayah"],
    where: {
      idPemilihan: id,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  });

  return NextResponse.json({
    regions: wilayah.map((w) => ({
      kodeWilayah: w.kodeWilayah,
      jumlah: w._count.id,
    })),
  });
}
