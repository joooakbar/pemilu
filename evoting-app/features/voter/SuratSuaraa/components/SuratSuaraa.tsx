"use client";

import { useState } from "react";
import "@/app/globals.css";
import { VotingPageProps } from "../types/surat.types";
import Image from "next/image";
import { mapKandidatToCandidate } from "../../CandidateSection/utils/mapKandidat";

export default function VotingPage({ pemilihan, kandidat }: VotingPageProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const candidate = kandidat.map(mapKandidatToCandidate);
  console.log(candidate);

  const auth = {
    nama:
      typeof window !== "undefined"
        ? (sessionStorage.getItem("voter_nama") ?? "")
        : "",
    dptId:
      typeof window !== "undefined"
        ? (sessionStorage.getItem("dptId") ?? "")
        : "",
    tokenId:
      typeof window !== "undefined"
        ? (sessionStorage.getItem("voter_tokenId") ?? "")
        : "",
  };

  const openConfirmModal = async () => {
    if (!selectedCandidate) return;

    try {
      setLoading(true);

      const res = await fetch("/api/voter/submit-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dptId: auth.dptId,
          tokenId: auth.tokenId,
          idPemilihan: pemilihan.id,
          kandidatId: selectedCandidate,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        alert(json.error || "Gagal mengirim suara");
        return;
      }

      alert("Vote berhasil dikirim!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="screen-vote">
      <div className="vote-header">
        <div className="vote-header-brand">🗳️ E-VOTIS</div>

        <div className="vote-header-info">
          <h3>{pemilihan.nama}</h3>
        </div>

        <div className="vote-header-voter">
          Pemilih:
          <br />
          <strong>{auth.nama ?? ""}</strong>
        </div>
      </div>

      <div className="vote-body">
        <div className="vote-instruction">
          <div className="icon">📋</div>

          <p>
            <strong>Petunjuk:</strong> Pilih satu pasangan calon. Pilihan Anda
            bersifat <strong>RAHASIA</strong>.
          </p>
        </div>

        <div className="surat-suara">
          <div className="ss-header">
            <div>
              <div className="ss-title">{pemilihan.nama}</div>
              <div className="ss-subtitle">Centang satu pilihan</div>
            </div>

            <div className="ss-seal">🏛️</div>
          </div>

          <div className="ss-kandidat-grid">
            {candidate.map((item) => (
              <div
                key={item.id}
                className={`ss-kandidat ${
                  selectedCandidate === item.id ? "selected" : ""
                }`}
                onClick={() => setSelectedCandidate(item.id)}
              >
                <div className="ss-num">{item.number}</div>

                <div className="ss-photo">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt={item.nama}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="ss-photo-img"
                    />
                  ) : (
                    "👤"
                  )}
                </div>

                <div className="ss-nama">{item.nama}</div>
                <div className="ss-visi">{item.vision}</div>
              </div>
            ))}
          </div>

          <div className="ss-footer">
            <div className="ss-footer-info">
              {selectedCandidate
                ? "Paslon dipilih"
                : "Belum ada pilihan. Klik kandidat untuk memilih."}
            </div>

            <button
              className="btn-kirim"
              disabled={!selectedCandidate || loading}
              onClick={openConfirmModal}
            >
              {loading ? "Mengirim..." : "🗳️ Kirim Suara"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
