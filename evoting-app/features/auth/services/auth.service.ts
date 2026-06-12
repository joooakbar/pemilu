import { post } from "@/lib/api-client";
import type { LoginInput, OtpInput } from "../schemas/auth.schema";

export const AuthService = {
  login: (data: LoginInput) =>
    post<{
      userId: string;
      emailMask: string;
    }>("/api/auth/login", data),

  verifyOtp: (data: { userId: string; otp: string }) =>
    post<{
      name: string;
    }>("/api/auth/verify-otp", data),

  resendOtp: (data: { userId: string }) =>
    post<{ success: boolean }>("/api/auth/resend-otp", data),
};
