import { z } from 'zod'

import { schema } from '../utils/token.schema'

export type TokenFormData =
  z.infer<typeof schema>