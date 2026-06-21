import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { dptId, tokenId, idPemilihan, kandidatId } = body;

    if (!dptId || !tokenId || !idPemilihan || !kandidatId) {
      return NextResponse.json(
        {
          success: false,
          error: " Data tidak lengkap",
        },
        {
          status: 400,
        },
      );
    }

    const dpt = await prisma.dPT.findUnique({
      where: {
        id: dptId,
      },
    });

    if (!dpt) {
      return NextResponse.json(
        {
          success: false,
          error: "DPT tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    if (dpt.hasVoted) {
      return NextResponse.json(
        {
          success: false,
          error: "Anda sudah memilih",
        },
        {
          status: 400,
        },
      );
    }

    const token = await prisma.voteToken.findUnique({
      where: {
        id: tokenId,
      },
    });

    if (!token || token.isUsed) {
      return NextResponse.json(
        {
          success: false,
          error: "Token tidak valid / sudah dipakai",
        },
        {
          status: 400,
        },
      );
    }

    if (token.expiredAt < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: "Token sudah kadaluwarsa",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.votes.create({
        data: {
          idPemilihan,
          idKandidat: kandidatId,
          nikHash: dpt.nik,
          kodeWilayah: dpt.kodeWilayah,
          voteReference: tokenId,
        },
      });

      await tx.voteToken.update({
        where: {
          id: tokenId,
        },
        data: {
          isUsed: true,
        },
      });

      await tx.dPT.update({
        where: {
          id: dpt.id,
        },
        data: {
          hasVoted: true,
          votedAt: new Date(),
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Vote berhasil disimpan",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
