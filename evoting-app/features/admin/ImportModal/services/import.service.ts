export async function uploadDPT(
  formData: FormData
) {

  return fetch(
    '/api/admin/dpt/import',
    {
      method: 'POST',
      body: formData,
    }
  )
}