"use client";

import { useState } from "react";
import { verifyNIK } from "@/lib/services/voter";
import { CekDPTStatus } from "../types/cekdpt.types";
import { formatNIK } from "../../InputNIK/utils/formatNIK";
import { isValidNIK } from "@/lib/utils";
import { VerifyResult } from "../types/cekdpt.types";

export const useCekDPT = (idPemilihan?: string) => {
  const [nik, setNIK] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<CekDPTStatus>("idle");
  const [result, setResult] = useState<VerifyResult | null>(null);

  const handleNIKChange = (value: string) => {
    setNIK(formatNIK(value));

    if (status !== "idle") {
      setStatus("idle");
      setResult(null);
    }
  };

  const handleCekDPT = async () => {
    if (!nik.trim()) {
      setStatus("empty");
      setResult(null);
      return;
    }

    if (!isValidNIK(nik)) {
      setStatus("invalid");
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await verifyNIK({
        nik,
        idPemilihan,
      });

      if (!res.found) {
        setStatus("not-found");
        setResult(res);
        return;
      }

      setStatus("found");
      setResult(res);
    } catch (error) {
      console.error("Cek DPT error:", error);

      setStatus("error");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  return {
    nik,
    loading,
    status,
    result,
    handleNIKChange,
    handleCekDPT,
  };
};
