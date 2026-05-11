import {
  mapSteps,
} from '../utils/tatacara.utils'

import type {
  TataCaraSectionProps,
} from '../types/tatacara.types'

export default function TataCaraSection({
  data,
}: TataCaraSectionProps) {

  const steps =
    mapSteps(data)

  return (
    <section
      className="section tatacara-section"
      id="tatacara"
    >

      <div className="section-header">

        <div className="section-eyebrow">
          Panduan Pemilih
        </div>

        <h2>
          {data?.judul ??
            'Cara Menggunakan Hak Pilih'}
        </h2>

        <p>

          Ikuti{' '}

          {steps.length || 5}

          {' '}langkah mudah
          untuk memastikan
          suara Anda sah dan
          terhitung.

        </p>

        {data?.videoEmbed && (

          <div
            style={{
              marginTop: '1rem',
              marginBottom: '1.5rem',
            }}
          >

            <a
              href={data.videoEmbed}
              target="_blank"
              rel="noopener noreferrer"
              className="tutorial-btn"
            >
              ▶ Tonton Video Tutorial
            </a>

          </div>
        )}

        <div className="steps-grid">

          {steps.length > 0 ? (

            steps.map((
              step,
              index
            ) => (

              <div
                className="step-card"
                key={
                  step.nomor ??
                  index
                }
              >

                <div className="step-num">
                  {step.icon}
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>
            ))

          ) : (

            <>
              <div className="step-card">

                <div className="step-num">
                  🔍
                </div>

                <h3>
                  Cek DPT
                </h3>

                <p>
                  Pastikan NIK Anda
                  Terdaftar.
                </p>

              </div>

              <div className="step-card">

                <div className="step-num">
                  📲
                </div>

                <h3>
                  Terima Token
                </h3>

                <p>
                  Token OTP
                  dikirim H-1
                  via WhatsApp
                  & Email.
                  Simpan baik-baik.
                </p>

              </div>

              <div className="step-card">

                <div className="step-num">
                  🔐
                </div>

                <h3>
                  Login & Verifikasi
                </h3>

                <p>
                  Masukkan NIK,
                  lalu verifikasi
                  dengan token OTP
                  yang Anda terima.
                </p>

              </div>

              <div className="step-card">

                <div className="step-num">
                  🗳️
                </div>

                <h3>
                  Pilih Kandidat
                </h3>

                <p>
                  Klik satu kandidat
                  pilihan Anda pada
                  surat suara digital.
                </p>

              </div>

              <div className="step-card">

                <div className="step-num">
                  ✅
                </div>

                <h3>
                  Konfirmasi
                </h3>

                <p>
                  Periksa pilihan,
                  konfirmasi,
                  dan simpan kode
                  referensi sebagai
                  bukti.
                </p>

              </div>
            </>
          )}

        </div>

      </div>

    </section>
  )
}