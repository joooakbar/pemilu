import {
  VerifyNIKPayload,
  VerifyNIKResponse,
} from "@/features/voter/InputNIK/types/voter.types";

export async function verifyNIK(
  payload: VerifyNIKPayload,
): Promise<VerifyNIKResponse> {
  const res = await fetch("/api/voter/verify-nik", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Gagal verifikasi NIK");
  }

  // ❌ jangan throw null
  if (!json.data) {
    return {
      found: false,
      message: "DPT tidak ditemukan",
    } as VerifyNIKResponse;
  }

  return {
    found: true,
    nama: json.data.nama,
    kodeWilayah: json.data.kodeWilayah,
    hasVoted: json.data.hasVoted,
  } as VerifyNIKResponse;
}
