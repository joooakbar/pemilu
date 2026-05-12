import { Button } from '@/components/ui/button'
import { Loader2, Upload } from 'lucide-react'

interface Props {
  loading: boolean
  onClick: () => void
}

export default function UploadButton({ loading, onClick }: Props) {
  return (
    <Button
      type="button"
      className="w-full gap-2"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Mengupload...
        </>
      ) : (
        <>
          <Upload className="w-4 h-4" />
          Pilih File
        </>
      )}
    </Button>
  )
}