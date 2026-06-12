"use client";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role, UserFormData } from "../types";

interface Props {
  form: UserFormData;
  setForm: React.Dispatch<React.SetStateAction<UserFormData>>;
  create: () => void;
  saving: boolean;
}

export default function UserForm({ form, setForm, create, saving }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h3 className="font-semibold text-sm">Buat Akun Pengguna Baru</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Username</Label>

          <Input
            placeholder="johndoe"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                username: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Email</Label>

          <Input
            type="email"
            placeholder="user@evotis.id"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                email: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Password</Label>

          <Input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                password: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Role</Label>

          <select
            value={form.role}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                role: e.target.value as Role,
              }))
            }
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="ADMIN">Administrator</option>
            <option value="PANITIA">Panitia</option>
            <option value="SAKSI">Saksi</option>
          </select>
        </div>
      </div>

      <Button onClick={create} disabled={saving} className="gap-2">
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <UserPlus className="w-4 h-4" />
        )}
        Buat Akun
      </Button>
    </div>
  );
}
