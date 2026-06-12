import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getKandidatList } from "@/sanity/lib/fetchers";

export async function GET(req: NextRequest) {
  const idPemilihan = req.nextUrl.searchParams.get("idPemilihan");

  if (!idPemilihan) {
    return new Response("idPemilihan required", {
      status: 400,
    });
  }

  const encoder = new TextEncoder();

  const totalDPT = await prisma.dPT.count();

  const kandidat = await getKandidatList();

  const kandidatCount = kandidat?.length ?? 0;

  const stream = new ReadableStream({
    async start(controller) {
      let interval: NodeJS.Timeout;
      let closed = false;

      const send = async () => {
        try {
          if (closed) return;

          const sudahMemilih = await prisma.votes.count({
            where: { idPemilihan },
          });

          const belumMemilih = totalDPT - sudahMemilih;

          const partisipasi =
            totalDPT > 0
              ? Number(((sudahMemilih / totalDPT) * 100).toFixed(1))
              : 0;

          const data = {
            totalDPT,
            sudahMemilih,
            belumMemilih,
            partisipasi,
            kandidat: kandidatCount,
          };

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        } catch (error) {
          console.error("SSE Error:", error);
        }
      };

      await send();

      interval = setInterval(send, 10000);

      req.signal.addEventListener("abort", () => {
        closed = true;

        clearInterval(interval);

        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
