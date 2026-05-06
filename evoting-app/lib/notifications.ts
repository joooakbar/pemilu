import axios from 'axios'
import nodemailer from 'nodemailer'

/** Kirim WhatsApp via Fonnte API */
export async function sendWhatsApp(
  phone: string,
  message: string,
  retries = 3
): Promise<{ success: boolean; error?: string }> {
  const token   = process.env.FONNTE_TOKEN
  const apiUrl  = process.env.FONNTE_API_URL ?? 'https://api.fonnte.com/send'

  if (!token) return { success: false, error: 'FONNTE_TOKEN tidak dikonfigurasi' }

  // Format nomor Indonesia
  const formatted = phone.startsWith('0')
    ? '62' + phone.slice(1)
    : phone.replace(/^\+/, '')

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.post(
        apiUrl,
        { target: formatted, message, countryCode: '62' },
        { headers: { Authorization: token }, timeout: 10_000 }
      )
      if (res.data?.status) return { success: true }
    } catch (err: unknown) {
      if (attempt === retries) {
        const msg = err instanceof Error ? err.message : String(err)
        return { success: false, error: msg }
      }
      await new Promise(r => setTimeout(r, 1000 * attempt))
    }
  }
  return { success: false, error: 'Maksimum retry tercapai' }
}

/** Kirim email via SMTP (Nodemailer) */
export async function sendEmail(opts: {
  to:      string
  subject: string
  html:    string
}): Promise<{ success: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT ?? '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? 'E-VOTIS <noreply@evotis.id>',
      ...opts,
    })
    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg }
  }
}

/** Template pesan token OTP */
export function templateTokenWA(nama: string, token: string, expiredJam: number): string {
  return `Halo ${nama},

🗳️ *E-VOTIS — Token Pemilihan*

Token voting Anda:
*${token}*

Token berlaku selama ${expiredJam} jam.
Jangan bagikan token ini kepada siapapun.

Jika Anda tidak merasa mendaftar, abaikan pesan ini.`
}

export function templateTokenEmail(nama: string, token: string, expiredJam: number): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
      <h2 style="color:#1d4ed8;margin-bottom:8px;">🗳️ E-VOTIS</h2>
      <p>Halo <strong>${nama}</strong>,</p>
      <p>Berikut adalah token voting Anda:</p>
      <div style="background:#f3f4f6;padding:16px;border-radius:8px;text-align:center;margin:16px 0;">
        <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#1d4ed8;">${token}</span>
      </div>
      <p style="color:#6b7280;font-size:14px;">Token berlaku selama <strong>${expiredJam} jam</strong>.</p>
      <p style="color:#ef4444;font-size:14px;">⚠️ Jangan bagikan token ini kepada siapapun.</p>
      <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;">Pesan otomatis dari sistem E-VOTIS. Jangan balas email ini.</p>
    </div>`
}
