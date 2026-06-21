"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyOTPRequest } from "../services/verifyOTP";

export function useOtp() {
  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nik =
    typeof window !== "undefined" ? (sessionStorage.getItem("nik") ?? "") : "";

  const idPemilihan =
    typeof window !== "undefined"
      ? (sessionStorage.getItem("idPemilihan") ?? "")
      : "";

  const submit = useCallback(async () => {
    const finalOTP = otp.join("").toUpperCase();

    console.log("DEBUG OTP REQUEST:", {
      nik,
      idPemilihan,
      otp: finalOTP,
    });

    if (finalOTP.length !== 6) {
      setError("Token harus 6 karakter");
      return;
    }

    if (!nik || !idPemilihan) {
      setError("Session tidak lengkap");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { res, json } = await verifyOTPRequest({
        nik,
        otp: finalOTP,
        idPemilihan,
      });

      console.log("VERIFY OTP RESPONSE:", json);

      if (!res.ok || !json.success) {
        const message = json.error ?? "Token tidak valid";

        setError(message);
        toast.error(message);
        return;
      }

      sessionStorage.setItem("voter_tokenId", json.data.tokenId);
      sessionStorage.setItem("dptId", json.data.dptId);
      sessionStorage.setItem("voter_nama", json.data.nama);

      router.push(`/vote/${json.data.idPemilihan}/surat-suara`);
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);
      setError("Terjadi kesalahan server");
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  }, [otp, nik, idPemilihan, router]);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") submit();
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [submit]);

  const handleChange = (value: string, index: number) => {
    const clean = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (!clean) return;

    const newOtp = [...otp];
    newOtp[index] = clean.slice(-1);
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (error) setError("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key !== "Backspace") return;

    const newOtp = [...otp];

    if (newOtp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return {
    otp,
    loading,
    error,
    nik,
    inputRefs,
    handleChange,
    handleKeyDown,
    submit,
  };
}
