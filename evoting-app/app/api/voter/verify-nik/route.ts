import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isValidNIK } from "@/features/voter/InputNIK/utils/nikValidator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const rawNik = String(body.nik || "").trim();
    const nik = rawNik.replace(/\D/g, "");

    if (!rawNik) {
      return NextResponse.json(
        { success: false, error: "NIK wajib diisi" },
        { status: 400 },
      );
    }

    if (!isValidNIK(nik)) {
      return NextResponse.json(
        { success: false, error: "NIK harus 16 digit angka" },
        { status: 400 },
      );
    }

    const now = new Date();

    let pemilihan = await prisma.pemilihan.findFirst({
      where: {
        startTime: { lte: now },
        endTime: { gt: now },
      },
      orderBy: { startTime: "desc" },
    });

    if (!pemilihan) {
      pemilihan = await prisma.pemilihan.findFirst({
        orderBy: { createdAt: "desc" },
      });
    }

    if (!pemilihan) {
      return NextResponse.json(
        { success: false, error: "Belum ada pemilihan di sistem" },
        { status: 404 },
      );
    }

    const dpt = await prisma.dPT.findUnique({
      where: { nik },
    });

    if (!dpt) {
      return NextResponse.json(
        { success: false, error: "DPT tidak ditemukan" },
        { status: 404 },
      );
    }

    const vote = await prisma.votes.findFirst({
      where: {
        nikHash: dpt.nik,
        idPemilihan: pemilihan.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        nama: dpt.nama,
        dptId: dpt.id,
        nik: dpt.nik,
        kodeWilayah: dpt.kodeWilayah,
        idPemilihan: pemilihan.id,
        hasVoted: !!vote,
      },
    });
  } catch (error) {
    console.error("verifyNIK error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
