import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "Kode harus 6 karakter"),
});

/* ===== RESPONSE ===== */

export const loginResponseSchema = z.object({
  userId: z.string(),
  emailMask: z.string(),
});

export const verifyOtpResponseSchema = z.object({
  name: z.string(),
  role: z.string(),
});

export const resendOtpResponseSchema = z.object({
  success: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type VerifyOtpResponse = z.infer<typeof verifyOtpResponseSchema>;
export type ResendOtpResponse = z.infer<typeof resendOtpResponseSchema>;
