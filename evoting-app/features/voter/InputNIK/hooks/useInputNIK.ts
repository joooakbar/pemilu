'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { schema } from '../utils/inputnik.schema'

import type {
  FormData,
} from '../types/inputnik.types'

export const useInputNIK = () => {

  return useForm<FormData>({
    resolver:
      zodResolver(schema),
  })
}