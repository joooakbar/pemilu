import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  onChange: (value: string) => void;
}

export default function LogSearch({ search, onChange }: Props) {
  return (
    <Input
      placeholder="
        Filter aksi atau username...
      "
      value={search}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-xs"
    />
  );
}
