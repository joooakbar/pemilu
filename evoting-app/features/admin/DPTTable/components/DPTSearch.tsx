import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DPTSearch({ value, onChange }: Props) {
  return (
    <Input
      value={value}
      className="max-w-xs"
      placeholder="Cari NIK atau nama..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
