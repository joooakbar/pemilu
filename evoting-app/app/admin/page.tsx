import { redirect } from 'next/navigation'
import { getAuthPayload } from '@/lib/auth'

export default async function AdminRootPage() {
  const payload = await getAuthPayload()
  if (!payload) redirect('/admin/login')
  redirect('/admin/dashboard')
}
