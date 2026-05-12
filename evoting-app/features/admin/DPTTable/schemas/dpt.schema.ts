import { z } from 'zod'

export const dptSchema = z.object({
  nik: z.string(),
  nama: z.string(),
  kodeWilayah: z.string(),
})