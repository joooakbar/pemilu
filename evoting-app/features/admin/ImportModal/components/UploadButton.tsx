import { Button } from '@/components/ui/button'
import { Loader2, Upload } from 'lucide-react'

interface Props {
  loading: boolean
  onClick: () => void
}

export default function UploadButton({ loading, onClick }: Props) {
  const Icon = loading ? Loader2 : Upload
  const label = loading ? 'Mengupload...' : 'Pilih File'

  return (
    <Button
      type="button"
      className="w-full gap-2"
      disabled={loading}
      onClick={onClick}
    >
      <Icon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      {label}
    </Button>
  )
}