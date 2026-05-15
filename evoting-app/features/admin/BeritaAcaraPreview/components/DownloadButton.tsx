import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface Props { electionId: string}

export default function DownloadButton({ electionId,}: Props) {
  return (
    <Button asChild className="gap-2">
      <a
        download
        href={`/api/admin/berita-acara/generate?electionId=${electionId}`}
      >
        <Download className="h-4 w-4" />

        Unduh PDF Berita Acara
      </a>
    </Button>
  )
}