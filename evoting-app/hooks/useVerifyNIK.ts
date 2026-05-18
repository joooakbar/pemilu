"use client";

import { useState } from "react";
import { verifyNIK } from "@/lib/services/voter";

export function useVerifyNIK() {
  const [loading, setLoading] = useState(false);

  const handleVerify = async (nik: string) => {
    setLoading(true);

    try {
      const idPemilihan = sessionStorage.getItem("idPemilihan") ?? "";

      const data = await verifyNIK({ nik, idPemilihan });
      if (!data) return;
      // simpan ke session
      sessionStorage.setItem("voter_nik", nik);
      sessionStorage.setItem("voter_nama", data.nama);
      sessionStorage.setItem("voter_dptId", data.dptId);
      sessionStorage.setItem("electionId", data.idPemilihan);

      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleVerify,
    loading,
  };
}
