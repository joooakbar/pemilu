import { Input }
from '@/components/ui/input'

interface Props {
  search: string
  setSearch: (
    value: string
  ) => void
}

export default function DPTSearch({
  search,
  setSearch,
}: Props) {

  return (
    <Input
      placeholder="
        Cari NIK atau nama...
      "
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="max-w-xs"
    />
  )
}