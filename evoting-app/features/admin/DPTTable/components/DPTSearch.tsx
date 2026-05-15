import { Input } from '@/components/ui/input'

interface Props {
  search: string
  setSearch: (value: string) => void
}

export default function DPTSearch({
  search,
  setSearch,
}: Props) {
  return (
    <Input
      value={search}
      className="max-w-xs"
      placeholder="Cari NIK atau nama..."
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  )
}