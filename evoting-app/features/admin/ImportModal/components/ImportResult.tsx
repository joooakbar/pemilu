import type { ImportResultData } from '../types'

interface Props {
  result: ImportResultData
}

export default function ImportResult({ result }: Props) {
  return (
    <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700">
      ✅ {result.inserted} baru ·{' '}
      {result.updated} diperbarui ·{' '}
      Total {result.total} baris
    </div>
  )
}