'use client'
import UserRow from './UserRow'
import UserLoading from './UserLoading'
import EmptyState from './EmptyState'
import type { UserRow as UserRowType } from '../types'
interface Props {
  users: UserRowType[]
  loading: boolean
  currentUserId: string
  toggleActive: (user: UserRowType) => void
  deleteUser: (user: UserRowType) => void
}

export default function UserTableContent({
  users,
  loading,
  currentUserId,
  toggleActive,
  deleteUser,
}: Props) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60">
          <tr>
            {['Username', 'Email', 'Role', 'Status', 'Dibuat', 'Aksi']
              .map(h => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {loading
            ? <UserLoading />
            : users.map(user => (
                <UserRow
                  key={user.id}
                  user={user}
                  currentUserId={currentUserId}
                  toggleActive={toggleActive}
                  deleteUser={deleteUser}
                />
              ))}
        </tbody>
      </table>

      {!loading && users.length === 0 && (
        <EmptyState />
      )}
    </div>
  )
}