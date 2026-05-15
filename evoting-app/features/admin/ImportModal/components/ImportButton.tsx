import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

interface Props {
  onClick: () => void
}

export default function ImportButton({ onClick }: Props) {
  return (
    <Button onClick={onClick} className="gap-2">
      <Upload className="w-4 h-4" />
      Import Excel/CSV
    </Button>
  )
}