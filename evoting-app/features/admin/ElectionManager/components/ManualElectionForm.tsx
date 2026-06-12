import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  form: any;
  setForm: any;
  saving: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ManualElectionForm({
  form,
  setForm,
  saving,
  onSubmit,
  onCancel,
}: Props) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => ({
      ...prev,
      nama: e.target.value,
    }));
  };

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <Label className="text-xs">Nama Pemilihan</Label>

          <Input value={form.nama} onChange={handleNameChange} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={onSubmit} disabled={saving}>
          Simpan
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
      </div>
    </div>
  );
}
