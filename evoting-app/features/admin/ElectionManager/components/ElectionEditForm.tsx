import { Button }
from '@/components/ui/button'

import { Input }
from '@/components/ui/input'

import { Label }
from '@/components/ui/label'

interface Props {
  editForm: any
  setEditForm: any

  saving: boolean

  onSave: () => void

  onCancel: () => void
}

export default function ElectionEditForm({
  editForm,
  setEditForm,
  saving,
  onSave,
  onCancel,
}: Props) {

  return (
    <div
      className="
        p-5
        space-y-4
      "
    >

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
        "
      >

        <div
          className="
            sm:col-span-2
            space-y-1
          "
        >

          <Label className="text-xs">
            Nama
          </Label>

          <Input
            value={editForm.nama}
            onChange={(e) =>
              setEditForm(
                (f: any) => ({
                  ...f,
                  nama:
                    e.target.value,
                })
              )
            }
          />

        </div>

      </div>

      <div className="flex gap-2">

        <Button
          onClick={onSave}
          disabled={saving}
        >
          Simpan
        </Button>

        <Button
          variant="outline"
          onClick={onCancel}
        >
          Batal
        </Button>

      </div>

    </div>
  )
}