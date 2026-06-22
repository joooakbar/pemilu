"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DPTRow } from "@/types";

export default function DPTTable({ electionId }: { electionId?: string }) {
  const [data, setData] = useState<DPTRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async (query: string) => {
    setLoading(true);

    try {
      const res = await fetch(
        "/api/admin/dpt?" +
          new URLSearchParams({
            q: query,
            electionId: electionId ?? "",
          }),
      );

      const json = await res.json();

      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    await loadData(value);
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Cari NIK atau nama..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-xs"
      />

      {loading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                {[
                  "NIK",
                  "Nama",
                  "Kode Wilayah",
                  "Phone",
                  "Status",
                  "Waktu Pilih",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.slice(0, 100).map((d) => (
                <tr key={d.id} className="hover:bg-secondary/20">
                  <td className="px-4 py-2 font-mono text-xs">{d.nik}</td>
                  <td className="px-4 py-2 font-medium">{d.nama}</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    {d.kodeWilayah}
                  </td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">
                    {d.phone ?? "—"}
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant={d.hasVoted ? "default" : "secondary"}>
                      {d.hasVoted ? "✓ Sudah" : "Belum"}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">
                    {d.votedAt
                      ? new Date(d.votedAt).toLocaleString("id-ID")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              Tidak ada data
            </div>
          )}
        </div>
      )}
    </div>
  );
}
