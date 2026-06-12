import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const otp = String(body.otp || "").trim();
    const idPemilihan = String(body.idPemilihan || "").trim();

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { success: false, error: "OTP harus 6 digit" },
        { status: 400 },
      );
    }

    if (!idPemilihan) {
      return NextResponse.json(
        { success: false, error: "ID pemilihan tidak ditemukan" },
        { status: 400 },
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

    // =========================
    // 🔥 DEMO OTP LOGIC
    // =========================

    const DEMO_OTP = "123456";

    const validOtp = DEMO_OTP;

    if (otp.toUpperCase() !== validOtp) {
      return NextResponse.json(
        {
          success: false,
          error: "OTP tidak valid",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        verified: true,
        idPemilihan: pemilihan.id,
        namaPemilihan: pemilihan.nama,
        status: pemilihan.status,
      },
    });
  } catch (error) {
    console.error("verifyOTP error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
