import { z } from 'zod'

import { schema } from '../utils/inputnik.schema'

export type FormData =
  z.infer<typeof schema>

export type InputNIKProps = {
  onSubmit: (
    data: FormData
  ) => void

  loading: boolean
}