import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  editForm: any;
  setEditForm: any;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function ElectionEditForm({
  editForm,
  setEditForm,
  saving,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="space-y-4 p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Nama</Label>

          <Input
            value={editForm.nama}
            onChange={(e) =>
              setEditForm((form: any) => ({
                ...form,
                nama: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={onSave} disabled={saving}>
          Simpan
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
      </div>
    </div>
  );
}
