import { VerifyOTPPayload, VerifyOTPResponse } from "../types/otp.types";

export async function verifyOTPRequest(payload: VerifyOTPPayload) {
  console.log("SEND OTP REQUEST:", payload);
  const res = await fetch("/api/voter/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  return {
    res,
    json: json as VerifyOTPResponse,
  };
}
