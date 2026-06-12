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

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submit();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [otp]);

  const handleChange = (value: string, index: number) => {
    const clean = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (!clean) return;

    const newOtp = [...otp];
    newOtp[index] = clean.slice(-1);
    setOtp(newOtp);

    // auto next
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

  const submit = useCallback(async () => {
    const finalOtp = otp.join("");

    console.log("DEBUG OTP REQUEST:", {
      nik,
      idPemilihan,
      otp: finalOtp,
    });

    if (finalOtp.length !== 6) {
      setError("Token harus 6 karakter");
      return;
    }

    if (!nik || !idPemilihan) {
      setError("Session tidak lengkap (nik / pemilihan kosong)");
      return;
    }

    try {
      setLoading(true);

      const { res, json } = await verifyOTPRequest({
        nik,
        otp: finalOtp,
        idPemilihan,
      });

      if (!res.ok) {
        setError(json.error ?? "Token salah");
        toast.error(json.error ?? "Token salah");
        return;
      }

      sessionStorage.setItem("voter_tokenId", json.data.tokenId);

      router.push(`/vote/${idPemilihan}/surat-suara `);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan server");
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  }, [otp, nik, idPemilihan, router]);

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
