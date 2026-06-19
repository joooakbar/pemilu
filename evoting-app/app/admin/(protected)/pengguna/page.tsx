import { getAuthPayload } from '@/lib/auth'
import { redirect }       from 'next/navigation'
import UserTable          from '@/components/admin/UserTable'

export const metadata = { title: 'Manajemen Pengguna' }

export default async function PenggunaPage() {
  const payload = await getAuthPayload()
  if (payload?.role !== 'ADMIN') redirect('/admin/dashboard')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola akun Administrator, Panitia, dan Saksi. Setiap login membutuhkan verifikasi email (2FA).
        </p>
      </div>
      <UserTable currentUserId={payload!.sub} />
    </div>
  )
}
