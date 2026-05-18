import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  const pemilihan = await prisma.pemilihan.findUnique({
    where: { id },
  });

  if (!pemilihan) {
    return NextResponse.json(
      { error: "Pemilihan tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(pemilihan);
}
