import { z } from 'zod'

export const importSchema =
  z.object({
    electionId:
      z.string().optional(),
  })