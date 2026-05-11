import { z } from 'zod'

export const schema = z.object({
  token: z
    .string()
    .length(
      6,
      'Token harus 6 karakter'
    )
    .transform((v) =>
      v.toUpperCase()
    ),
})