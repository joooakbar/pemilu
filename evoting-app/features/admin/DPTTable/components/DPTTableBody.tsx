import { Badge } from "@/components/ui/badge";
import { DPTRow } from "../types";

interface Props {
  data: DPTRow[];
}

export default function DPTTableBody({ data }: Props) {
  return (
    <tbody className="divide-y">
      {data.slice(0, 100).map((item) => (
        <tr key={item.id} className="hover:bg-secondary/20">
          {/* NIK */}
          <td className="px-4 py-2 font-mono text-xs">{item.nik}</td>

          {/* NAMA */}
          <td className="px-4 py-2 font-medium">{item.nama}</td>

          {/* KODE WILAYAH */}
          <td className="px-4 py-2 font-mono text-xs">{item.kodeWilayah}</td>

          {/* PHONE */}
          <td className="px-4 py-2 text-xs text-muted-foreground">
            {item.phone ?? "—"}
          </td>

          {/* STATUS */}
          <td className="px-4 py-2">
            <Badge variant={item.hasVoted ? "default" : "secondary"}>
              {item.hasVoted ? "✓ Sudah" : "Belum"}
            </Badge>
          </td>

          {/* WAKTU PILIH */}
          <td className="px-4 py-2 text-xs text-muted-foreground">
            {item.votedAt
              ? new Date(item.votedAt).toLocaleString("id-ID")
              : "—"}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
