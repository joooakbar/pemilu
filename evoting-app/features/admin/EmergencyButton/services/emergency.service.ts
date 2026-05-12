export async function emergencyRequest(
  electionId: string,
  action: string,
) {

  return fetch(
    '/api/admin/election/emergency',
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({
        electionId,
        action,
      }),
    }
  )
}