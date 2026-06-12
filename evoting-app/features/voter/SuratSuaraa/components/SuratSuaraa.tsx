"use client";

import { useState } from "react";
import "@/app/globals.css";

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null,
  );

  const pilihKandidat = (id: number) => {
    setSelectedCandidate(id);
  };

  const openConfirmModal = () => {
    if (!selectedCandidate) return;

    console.log("Pilihan:", selectedCandidate);
  };

  return (
    <div id="screen-vote" className="screen">
      <div className="vote-header">
        <div className="vote-header-brand">🗳️ E-VOTIS</div>

        <div className="vote-header-info">
          <h3>Surat Suara Pemilihan Gubernur</h3>
          <p>Provinsi X · 9 Maret 2025</p>
        </div>

        <div className="vote-header-voter">
          Pemilih:
          <br />
          <strong>Mohammad Aditya</strong>
        </div>
      </div>

      <div className="vote-body">
        <div className="vote-instruction">
          <div className="icon">📋</div>
          <p>
            <strong>Petunjuk:</strong> Pilih <strong>satu</strong> pasangan
            calon dengan mengklik kartu kandidat. Pilihan Anda bersifat
            <strong> RAHASIA</strong>.
          </p>
        </div>

        <div className="surat-suara">
          <div className="ss-header">
            <div>
              <div className="ss-title">
                Pemilihan Gubernur dan Wakil Gubernur
              </div>

              <div className="ss-subtitle">
                Provinsi X · Periode 2025–2030 · Centang satu pilihan
              </div>
            </div>

            <div className="ss-seal">🏛️</div>
          </div>

          <div className="ss-kandidat-grid">
            <div
              className={`ss-kandidat ${
                selectedCandidate === 1 ? "selected" : ""
              }`}
              onClick={() => pilihKandidat(1)}
            >
              <div className="ss-num">1</div>
              <div className="ss-photo">👨‍💼</div>

              <div className="ss-nama">
                H. Ahmad Fauzi, S.H., M.M.
                <br />— Ir. Budi Santoso
              </div>

              <div className="ss-visi">
                Mewujudkan Provinsi X yang maju, mandiri, dan berkeadilan.
              </div>
            </div>

            <div
              className={`ss-kandidat ${
                selectedCandidate === 2 ? "selected" : ""
              }`}
              onClick={() => pilihKandidat(2)}
            >
              <div className="ss-num">2</div>
              <div className="ss-photo">👩‍💼</div>

              <div className="ss-nama">
                Dr. Siti Rahayu, M.Pd.
                <br />— H. Kusuma Wijaya
              </div>

              <div className="ss-visi">
                Menjadikan Provinsi X sebagai provinsi hijau dan inovatif.
              </div>
            </div>

            <div
              className={`ss-kandidat ${
                selectedCandidate === 3 ? "selected" : ""
              }`}
              onClick={() => pilihKandidat(3)}
            >
              <div className="ss-num">3</div>
              <div className="ss-photo">👨‍⚖️</div>

              <div className="ss-nama">
                Drs. Rudi Prasetyo
                <br />— Hj. Aminah Kartika, S.Sos
              </div>

              <div className="ss-visi">
                Membangun Provinsi X bermartabat dengan tata kelola yang bersih.
              </div>
            </div>
          </div>

          <div className="ss-footer">
            <div className="ss-footer-info">
              {selectedCandidate
                ? `Paslon ${selectedCandidate} dipilih`
                : "Belum ada pilihan. Klik kandidat untuk memilih."}
            </div>

            <button
              className="btn-kirim"
              disabled={!selectedCandidate}
              onClick={openConfirmModal}
            >
              🗳️ Kirim Suara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
