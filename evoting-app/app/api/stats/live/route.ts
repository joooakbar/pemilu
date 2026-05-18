import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getKandidatList } from "@/sanity/lib/fetchers";

export async function GET(req: NextRequest) {
  const idPemilihan = req.nextUrl.searchParams.get("idPemilihan");

  if (!idPemilihan) {
    return new Response("idPemilihan required", { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      let interval: NodeJS.Timeout;

      const send = async () => {
        const kandidat = await getKandidatList();

        const totalDPT = await prisma.dPT.count();

        const sudahMemilih = await prisma.votes.count({
          where: { idPemilihan },
        });

        const belumMemilih = totalDPT - sudahMemilih;

        const partisipasi =
          totalDPT > 0
            ? Number(((sudahMemilih / totalDPT) * 100).toFixed(1))
            : 0;

        const kandidatCount = kandidat?.length ?? 0;

        const data = {
          totalDPT,
          sudahMemilih,
          belumMemilih,
          partisipasi,
          kandidat: kandidatCount,
        };

        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // initial send
      await send();

      // realtime interval
      interval = setInterval(send, 3000);

      // cleanup
      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
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
