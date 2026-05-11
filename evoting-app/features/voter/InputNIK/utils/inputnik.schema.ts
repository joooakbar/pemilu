import { z } from 'zod'

export const schema = z.object({
  nik: z
    .string()
    .regex(
      /^\d{16}$/,
      'NIK harus tepat 16 digit angka'
    ),
})