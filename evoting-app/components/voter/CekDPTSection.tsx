"use client";

import React, { useState } from "react";
import '../../public/css/cekDPT.css'

type VerifyResult = {
    found: boolean;
    nama?: string;
    kodeWilayah?: string;
    hasVoted?: boolean;
};

export default function CekDPTSection({ electionId } : { electionId: string }) {
    const [nik, setNik] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "empty" | "found" | "not-found">("idle");
    const [result, setResult] = useState<VerifyResult | null>(null);

    const formatNIK = (value: string) => {
        return value.replace(/\D/g, "").slice(0, 16);
    };

    const handleNIKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNik(formatNIK(e.target.value));

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

        if (!/^\d{16}$/.test(nik)) {
            setStatus("not-found");
            setResult(null);
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/voter/verify-nik", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nik }),
            });

            const json = await res.json();

            if (res.ok && json?.data) {
                setResult({
                    found: true,
                    nama: json.data.nama,
                    kodeWilayah: json.data.kodeWilayah,
                    hasVoted: json.data.hasVoted,
                });

                setStatus("found");
            } else {
            setResult({ found: false });
            setStatus("not-found");
            }
        } catch (error) {
            console.error("Gagal cek DPT:", error);
            setResult({ found: false });
            setStatus("not-found");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <section className="section cek-dpt-section" id="cek-dpt">
        <div className="section-header">
            <div className="section-eyebrow">
                Daftar Pemilih Tetap
            </div>
            <h2>
                Cek Status DPT Anda
            </h2>
            <p>
                Masukkan NIK KTP Anda untuk memastikan bahwa nama Anda terdaftar!
            </p>
        </div>

        <div className="cek-dpt-wrap">
            <div className="cek-input-row">
            <input
                className="cek-nik"
                type="text"
                placeholder="Masukkan 16 digit NIK..."
                value={nik}
                maxLength={16}
                onChange={handleNIKChange}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleCekDPT();
                }
                }}
            />
            <button 
                className="btn-cek-nik" 
                onClick={handleCekDPT}
                disabled={loading}
            >
                {loading ? "Mengecek..." : "Cek Sekarang"}
            </button>
            </div>

            <div className="nik-hint">
                NIK terdiri dari 16 digit, tertera pada KTP Elektronik Anda.
            </div>

            {status !== "idle" && (
            <div
                className={`cek-result show ${
                status === "found" ? "found" : "not-found"
                }`}
            >
                <div className="cek-result-card">
                <div className="cek-icon">
                    {status === "found" ? "✅" : "❌"}
                </div>

                <div className="cek-info">
                    <h3>
                        {status === "found"
                            ? "Anda Terdaftar"
                            : status === "empty"
                            ? "Field Kosong"
                            : "Data Tidak Ditemukan"
                        }
                    </h3>

                    <p>
                        {status === "found"
                            ? "Nama Anda ditemukan dalam Daftar Pemilih Tetap."
                            : status === "empty"
                            ? "Harap isi field NIK terlebih dahulu."
                            : nik.length !== 16
                            ? "NIK harus terdiri dari 16 digit."
                            : "NIK yang Anda masukkan tidak ditemukan dalam Daftar Pemilih Tetap."
                        }
                    </p>

                    {status === "found" && result && (
                    <div className="cek-detail-row">
                        <div className="cek-detail-item">
                            <label>Nama</label>
                            <span>{result.nama}</span>
                        </div>

                        <div className="cek-detail-item">
                            <label>NIK</label>
                            <span>{nik}</span>
                        </div>

                        <div className="cek-detail-item">
                            <label>Kecamatan</label>
                            <span>{result.kodeWilayah}</span>
                        </div>

                        <div className="cek-detail-item">
                            <label>Status Voting</label>
                            <span>{result.hasVoted ? "Sudah Memilih" : "Belum Memilih"}</span>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>
            )}
        </div>
        </section>
    );
}