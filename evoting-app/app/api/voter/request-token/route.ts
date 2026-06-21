import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail, templateTokenEmail } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const { nik, idPemilihan } = await req.json();

    if (!nik || !idPemilihan) {
      return NextResponse.json(
        { success: false, error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    const dpt = await prisma.dPT.findUnique({ where: { nik } });

    if (!dpt) {
      return NextResponse.json(
        { success: false, error: "DPT tidak ditemukan" },
        { status: 404 },
      );
    }

    if (!dpt.email) {
      return NextResponse.json(
        { success: false, error: "Email tidak tersedia" },
        { status: 400 },
      );
    }

    const vote = await prisma.votes.findFirst({
      where: {
        nikHash: dpt.nik,
        idPemilihan,
      },
    });

    if (vote) {
      return NextResponse.json(
        { success: false, error: "Sudah menggunakan hak pilih" },
        { status: 400 },
      );
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let plainToken = "";
    let tokenHash = "";

    for (let i = 0; i < 10; i++) {
      plainToken = Array.from(
        { length: 6 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join("");

      tokenHash = crypto.createHash("sha256").update(plainToken).digest("hex");

      const exists = await prisma.voteToken.findFirst({
        where: {
          tokenHash,
          isUsed: false,
        },
      });

      if (!exists) break;
    }

    const expiredAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.voteToken.upsert({
      where: {
        dptId_idPemilihan: {
          dptId: dpt.id,
          idPemilihan,
        },
      },
      update: {
        tokenHash,
        isUsed: false,
        expiredAt,
      },
      create: {
        dptId: dpt.id,
        idPemilihan,
        tokenHash,
        expiredAt,
      },
    });

    if (process.env.NODE_ENV === "development") {
      console.log("TOKEN DEV:", plainToken);
    }

    const emailResult = await sendEmail({
      to: dpt.email,
      subject: "Token Voting E-VOTIS",
      html: templateTokenEmail(dpt.nama, plainToken, 1),
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error },
        { status: 500 },
      );
    }

    await prisma.voteToken.update({
      where: {
        dptId_idPemilihan: {
          dptId: dpt.id,
          idPemilihan,
        },
      },
      data: {
        sentViaEmail: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Token berhasil dikirim",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
