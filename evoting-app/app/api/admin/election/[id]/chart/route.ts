import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const kandidat = await prisma.kandidat.findMany({
    where: {
      idPemilihan: id,
    },
    orderBy: {
      noUrut: "asc",
    },
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
  });

  return NextResponse.json({
    labels: kandidat.map((k) => `${k.noUrut}. ${k.nama}`),
    data: kandidat.map((k) => k._count.votes),
  });
}
