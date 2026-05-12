import type {

  KandidatSanity,

} from '@/types'

import type {

  KandidatRefDB,

} from '../types/kandidat.types'

export function getKandidatStatus(

  kandidat:
    KandidatSanity,

  dbList:
    KandidatRefDB[]

) {

  const db =
    dbList.find(
      d =>
      d.sanityId ===
      kandidat._id
    )

  const synced = !!db

  const hasChanges =

    db && (

      db.nama !==
      kandidat.namaPaslon ||

      db.nomorUrut !==
      kandidat.nomorUrut
    )

  return {

    synced,

    hasChanges,
  }
}