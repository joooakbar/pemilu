"use client";

import { useRouter } from "next/navigation";

export default function OTPHeader() {
  const router = useRouter();

  const nama =
    typeof window !== "undefined"
      ? (sessionStorage.getItem("voter_nama") ?? "")
      : "";

  const idPemilihan =
    typeof window !== "undefined"
      ? (sessionStorage.getItem("idPemilihan") ?? "")
      : "";

  return (
    <div className="auth-header">
      <div
        className="auth-back"
        onClick={() => {
          if (idPemilihan) {
            router.push(`/vote/${idPemilihan}`);
          } else {
            router.push("/");
          }
        }}
      >
        ← Ubah NIK
      </div>

      <div className="auth-step-indicator">
        <div className="step-dot done" />
        <div className="step-dot active" />
        <div className="step-dot" />
      </div>

      <h2>Masukkan Token OTP</h2>

      <p>
        Halo <b>{nama}</b>, masukkan token 6 digit yang dikirim ke
        WhatsApp/email.
      </p>
    </div>
  );
}
