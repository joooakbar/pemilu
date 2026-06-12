import { z } from "zod";

export const SyncRequestSchema = z.object({
  force: z.boolean().optional(),
});

export const SyncResultSchema = z.object({
  created: z.number(),
  updated: z.number(),
  skipped: z.number(),
});

export type SyncRequest = z.infer<typeof SyncRequestSchema>;
export type SyncResult = z.infer<typeof SyncResultSchema>;
