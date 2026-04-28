import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { apiVersion } from '../env'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
  }),
  // Optional: Add tokens for draft mode/live preview
  // serverToken: process.env.SANITY_API_READ_TOKEN,
  // browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
})
