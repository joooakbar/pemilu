"use client"

import { useState } from "react";
import { verifyNIK } from "@/lib/services/voter";
import { CekDPTStatus } from "../types/cekdpt.types";
import { formatNIK } from "../../InputNIK/utils/formatNIK";
import { isValidNIK } from "@/lib/utils";
import { VerifyResult } from "../types/cekdpt.types";

export const useCekDPT = (idPemilihan?: string) => {
    const [nik, setNIK] = useState("");
    const [loading , setLoading] = useState(false);
    const [status, setStatus] = useState<CekDPTStatus>("idle");
    const [result, setResult] = useState<VerifyResult | null>(null);

    const handleNIKChange = (value: string) => {
        setNIK(formatNIK(value));

        if (status !== "idle") {
            setStatus("idle");
            setResult(null);
        };
    }

    const handleCekDPT = async () => {

        if (!nik.trim()) {
            setStatus("empty");
            setResult(null);
            return;
        }

        if (!isValidNIK(nik)) {
            setStatus("not-found");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const data = await verifyNIK({ 
                nik, 
                idPemilihan: idPemilihan || ""
            });

            setResult({
                found: true,
                nama: data.nama,
                kodeWilayah: data.kodeWilayah,
                hasVoted: data.hasVoted,
            });

            setStatus("found");
        } catch (error) {
            console.error("Cek DPT error:", error);

            setStatus("not-found");
            setResult({ found: false })
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
    }
}