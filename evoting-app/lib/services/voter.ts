export type VerifyNIKPayload = {
  nik: string
  electionId: string
}

export type VerifyNIKResponse = {
  nama: string
  dptId: string
  electionId: string
}

export async function verifyNIK(payload: VerifyNIKPayload): Promise<VerifyNIKResponse> {
  const res = await fetch('/api/voter/verify-nik', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.error || 'Gagal verifikasi NIK')
  }

  return json.data
}