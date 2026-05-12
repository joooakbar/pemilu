import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface Props {
  electionId: string
}

export default function DownloadButton({
  electionId,
}: Props) {

  return (
    <Button
      asChild
      className="gap-2"
    >

      <a
        href={`/api/admin/berita-acara/generate?electionId=${electionId}`}
        download
      >
        <Download className="w-4 h-4" />

        Unduh PDF Berita Acara
      </a>

    </Button>
  )
}