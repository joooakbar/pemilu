'use client'

import type {
  LiveTickerProps,
} from '../types/liveticker.types'

const LiveTicker = ({
  text = `
Pemilihan sedang berlangsung ·
1.204 pemilih telah menggunakan hak suara (42,3%) ·
Paslon 1: 587 suara ·
Paslon 2: 412 suara ·
Paslon 3: 205 suara ·
Partisipasi terus meningkat ·
Gunakan hak suara Anda hari ini ·
Senin, 9 Maret 2025 ·
08.00 – 17.00 WIB
`,
}: LiveTickerProps) => {

  return (
    <div className="live-ticker">

      <span className="ticker-badge">
        Live
      </span>

      <div className="ticker-wrapper">

        <div className="ticker-text">
          {text}
        </div>

      </div>

    </div>
  )
}

export default LiveTicker