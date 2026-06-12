import { z } from "zod";

export const electionSchema = z.object({
  nama: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
