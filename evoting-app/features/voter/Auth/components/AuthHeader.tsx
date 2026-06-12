"use client";

import { useRouter } from "next/navigation";
import "@/app/globals.css";

const AuthHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); // ganti kalau halaman voter kamu beda, misal "/vote"
  };

  return (
    <div className="auth-header">
      <div
        className="auth-back"
        onClick={handleBack}
        style={{ cursor: "pointer" }}
      >
        ← Kembali ke Beranda
      </div>

      <div className="auth-step-indicator">
        <div className="step-dot active"></div>
        <div className="step-dot"></div>
        <div className="step-dot"></div>
      </div>

      <h2>Verifikasi Identitas</h2>

      <p>
        Masukkan NIK (Nomor Induk Kependudukan) yang terdaftar pada Daftar
        Pemilih Tetap.
      </p>
    </div>
  );
};

export default AuthHeader;
