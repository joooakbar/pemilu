"use client"

import React from "react"
import { useCekDPT } from "@/features/voter/hooks/useCekDPT"

export default function CekDPTSection({
    idPemilihan,
}: {
    idPemilihan: string;
}) {
    const {
        nik,
        loading,
        status,
        result,
        handleNIKChange,
        handleCekDPT,
    } = useCekDPT(idPemilihan);
    return (
        <section className="section cek-dpt-section" id="cek-dpt">
            <div className="section-header">
                <div className="section-eyebrow">
                    Daftar Pemilih Tetap
                </div>
                <h2>Cek Status DPT Anda</h2>
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
                        onChange={(e) => handleNIKChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleCekDPT();
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
                    NIK terdiri dari 16 digit, tertera pada E-KTP Anda.
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
                                    : status === "invalid"
                                    ? "NIK Tidak Valid"
                                    : "Data Tidak Ditemukan"
                                    }
                                </h3>

                                <p>
                                    {status === "found"
                                    ? "Nama Anda ditemukan dalam Daftar Pemilih Tetap."
                                    : status === "empty"
                                    ? "Harap isi field NIK terlebih dahulu."
                                    : status === "invalid"
                                    ? "NIK harus terdiri dari 16 digit angka."
                                    : "NIK yang Anda masukkan tidak ditemukan."
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
                                            <span>{result.hasVoted
                                            ? "Sudah Memilih"
                                            : "Belum Memilih"}</span>
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