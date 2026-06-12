import { z } from "zod";

export const emergencyActionSchema = z.object({
  electionId: z.string().min(1, "Election ID wajib diisi"),

  action: z.enum(["SUSPEND", "RESUME", "END"]),
});

export type EmergencyActionInput = z.infer<typeof emergencyActionSchema>;
