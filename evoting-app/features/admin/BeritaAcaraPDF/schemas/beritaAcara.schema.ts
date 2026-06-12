import { z } from "zod";

export const beritaAcaraSchema = z.object({
  totalDPT: z.number(),
  totalSuara: z.number(),
});
