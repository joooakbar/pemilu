"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useVerifyNIKVote = () => {
  const [nik, setNIK] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (value: string) => {
    const onlyNumber = value.replace(/\D/g, "");
    setNIK(onlyNumber);

    if (error) setError("");
  };

  const verifyNIKVote = async () => {
    if (nik.length !== 16) {
      setError("NIK harus terdiri dari 16 digit!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/voter/verify-nik", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nik }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "Gagal verifikasi NIK");
        return;
      }

      console.log("NIK valid:", json.data);

      sessionStorage.setItem("nik", nik);
      sessionStorage.setItem("idPemilihan", json.data.idPemilihan);
      sessionStorage.setItem("voter_nama", json.data.nama);
      sessionStorage.setItem("dptId", json.data.dptId);

      router.push(`/vote/${json.data.idPemilihan}/token`);
    } catch (err) {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return {
    nik,
    error,
    loading,
    handleChange,
    verifyNIKVote,
  };
};
