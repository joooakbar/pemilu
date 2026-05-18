import {
  VerifyNIKPayload,
  VerifyNIKResponse,
} from "@/features/voter/InputNIK/types/voter.types";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export async function verifyNIK(
  payload: VerifyNIKPayload,
): Promise<VerifyNIKResponse | null> {
  const res = await fetch("/api/voter/verify-nik", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json: ApiResponse<VerifyNIKResponse> = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Gagal verifikasi NIK");
  }

  if (!json.data) {
    throw null;
  }

  return json.data;
}
