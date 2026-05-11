import { KandidatSanity } from '@/types'

export const mapKandidatToCandidate = (
  item: KandidatSanity,
  index: number
) => {

  return {
    id: item._id,

    number: item.nomorUrut,

    nama: item.namaPaslon,

    photo: item.foto?.asset?.url,

    bannerClass:
      index % 2 === 0
        ? 'banner-blue'
        : 'banner-red',

    visi: item.visi || [],

    misi: item.misi || [],

    program: item.programKerja || [],

    votes: 0,

    videoUrl: item.videoUrl || '',
  }
}