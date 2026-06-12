import { z } from "zod";

export const dashboardStatsSchema = z.object({
  totalDPT: z.number(),
  sudahMemilih: z.number(),
  belumMemilih: z.number(),
});
