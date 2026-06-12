import { z } from "zod";

export const beritaAcaraPreviewSchema = z.object({
  totalDPT: z.number(),
  totalSuara: z.number(),
});
