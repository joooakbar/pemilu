"use client";
import { useState } from "react";
import { toast } from "sonner";
import UserToolbar from "./UserToolbar";
import UserForm from "./UserForm";
import UserTableContent from "./UserTableContent";
import { useUsers } from "../hooks/useUsers";
import type { Role, UserTableProps, UserFormData, UserRow } from "../types";

export default function UserTable({ currentUserId }: UserTableProps) {
  const { users, setUsers, loading, createUser } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterRole, setFilterRole] = useState<Role | "ALL">("ALL");

  const [form, setForm] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    role: "PANITIA",
  });

  const filtered =
    filterRole === "ALL" ? users : users.filter((u) => u.role === filterRole);

  const create = async () => {
    setSaving(true);

    const json = await createUser(form);

    if (!json.success) {
      toast.error(json.error);
      setSaving(false);
      return;
    }

    setUsers((prev) => [...prev, json.data]);

    toast.success("Akun berhasil dibuat");

    setSaving(false);
    setShowForm(false);
  };

  const toggleActive = async (user: UserRow) => {
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    if (!res.ok) {
      toast.error("Gagal update");
      return;
    }
    setUsers((p) =>
      p.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)),
    );
    toast.success(
      `Akun ${user.username} ${!user.isActive ? "diaktifkan" : "dinonaktifkan"}`,
    );
  };

  const deleteUser = async (user: UserRow) => {
    if (
      !confirm(
        `Hapus akun "${user.username}" (${user.role})? Tindakan ini tidak bisa dibatalkan.`,
      )
    )
      return;
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Gagal hapus");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success("Akun berhasil dihapus");
  };

  return (
    <div className="space-y-4">
      <UserToolbar
        usersLength={users.length}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        showForm={showForm}
        setShowForm={setShowForm}
        users={users}
      />

      {showForm && (
        <UserForm
          form={form}
          setForm={setForm}
          create={create}
          saving={saving}
        />
      )}

      <UserTableContent
        users={filtered}
        loading={loading}
        currentUserId={currentUserId}
        toggleActive={toggleActive}
        deleteUser={deleteUser}
      />

      <p className="text-xs text-muted-foreground">
        {filtered.length} pengguna ditampilkan
      </p>
    </div>
  );
}
