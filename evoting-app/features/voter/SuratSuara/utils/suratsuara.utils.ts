export const getNamaPilihan = (
  kandidatId: string | null,
  kandidatList: {
    id: string
    nama: string
  }[]
) => {

  return kandidatList.find(
    (k) => k.id === kandidatId
  )?.nama
}