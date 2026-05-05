import { formatDate } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import type { PengumumanSanity } from '@/types'

export default function BeritaSection({ data = [] }: { data?: PengumumanSanity[] }) {
  if (data.length === 0) {
    return (
      <section className="section berita-section" id="berita">
        <div className="section-header">
          <div className="section-eyebrow">
            Berita & Pengumuman
          </div>
          <h2>
            Informasi Terkini
          </h2>
          <p>
            Update resmi dari panitia penyelenggara pemilihan.
          </p>
        </div>

        <div className="berita-grid">
          <p className="text-center text-muted-foreground">Belum ada pengumuman</p>
        </div>
      </section>
    )
  }

  // berita utama = item pertama
  const beritaUtama = data[0]

  // berita list = sisanya
  const beritaList = data.slice(1)

  return (
    <section className="section berita-section" id="berita">
      <div className="section-header">
        <div className="section-eyebrow">
          Berita & Pengumuman
        </div>
        <h2>
          Informasi Terkini
        </h2>
        <p>
          Update resmi dari panitia penyelenggara pemilihan.
        </p>
      </div>

      <div className="berita-grid">
        {/* KIRI: berita utama */}
        <div className="berita-main">
          <div className="berita-main-img">📢</div>

          <div className="berita-main-body">
            <span className="berita-tag">
              {beritaUtama.kategori || 'PENGUMUMAN'}
            </span>

            <h3>
              {beritaUtama.judul}
            </h3>

            <div className="berita-main-content line-clamp-4">
              <PortableText value={beritaUtama.konten as never} />
            </div>

            <div className="berita-meta">
              📅 {formatDate(beritaUtama.tanggal)}
            </div>
          </div>
        </div>

        {/* KANAN: berita lainnya */}
        <div className="berita-list">
          {beritaList.map((item) => (
            <div className="berita-item" key={item._id}>
              <div className="berita-item-icon">
                📢
              </div>

              <div className="berita-item-body">
                <h4>
                  {item.judul}
                </h4>

                <div className="berita-item-text line-clamp-2">
                  <PortableText value={item.konten as never} />
                </div>

                <time>
                  {formatDate(item.tanggal)}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}