import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const otp = String(body.otp || "")
      .trim()
      .toUpperCase();

    const nik = String(body.nik || "").trim();
    const idPemilihan = String(body.idPemilihan || "").trim();

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { success: false, error: "Token harus 6 karakter" },
        { status: 400 },
      );
    }

    if (!nik || !idPemilihan) {
      return NextResponse.json(
        { success: false, error: "Data tidak lengkap" },
        { status: 400 },
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

    const pemilihan = await prisma.pemilihan.findUnique({
      where: { id: idPemilihan },
      select: {
        id: true,
        nama: true,
        status: true,
      },
    });

    if (!pemilihan) {
      return NextResponse.json(
        { success: false, error: "Pemilihan tidak ditemukan" },
        { status: 404 },
      );
    }

    const tokenHash = crypto.createHash("sha256").update(otp).digest("hex");

    const voteToken = await prisma.voteToken.findFirst({
      where: {
        dptId: dpt.id,
        idPemilihan,
        tokenHash,
        isUsed: false,
        expiredAt: {
          gt: new Date(),
        },
      },
    });

    if (!voteToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Token tidak valid atau sudah kadaluarsa",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        verified: true,
        tokenId: voteToken.id,
        dptId: dpt.id,
        nama: dpt.nama,
        idPemilihan: pemilihan.id,
        namaPemilihan: pemilihan.nama,
      },
    });
  } catch (error) {
    console.error("verifyOTP error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
