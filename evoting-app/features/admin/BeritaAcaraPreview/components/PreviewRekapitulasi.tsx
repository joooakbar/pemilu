import { PreviewRekapitulasiData } from "../types";

interface Props {
  data: PreviewRekapitulasiData[];
}

export default function PreviewRekapitulasi({ data }: Props) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">Rekapitulasi Suara:</p>

      {data.map((r) => (
        <div
          key={r.nomor}
          className="
            flex items-center justify-between
            p-3 rounded-lg
            bg-secondary/30
          "
        >
          <span className="font-medium">
            No. {r.nomor} — {r.nama}
          </span>

          <span className="font-bold text-primary">{r.jumlah} suara</span>
        </div>
      ))}
    </div>
  );
}
