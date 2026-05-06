export type ApiResponse<T> = {
  data: T
  error?: string
}

export async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json: ApiResponse<T> = await res.json()

  if (!res.ok) {
    throw new Error(json.error || 'Request gagal')
  }

  return json.data
}