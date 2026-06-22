"use client";

import { useState, useTransition } from "react";
import { useDPTData } from "../hooks/useDPTData";
import DPTSearch from "./DPTSearch";
import DPTTableBody from "./DPTTableBody";
import DPTLoading from "./DPTLoading";

const headers = [
  "NIK",
  "Nama",
  "Kode Wilayah",
  "Phone",
  "Status",
  "Waktu Pilih",
];

export default function DPTTable() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const [, startTransition] = useTransition();

  const { data, loading } = useDPTData(query);

  const handleChange = (value: string) => {
    setInput(value); // UI tetap stabil (INI YANG PENTING)

    startTransition(() => {
      setQuery(value); // fetch async tanpa ganggu UI
    });
  };

  return (
    <div className="space-y-3">
      {/* INPUT SELALU DI LUAR LOGIC FETCH */}
      <DPTSearch value={input} onChange={handleChange} />

      {loading ? (
        <DPTLoading />
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <DPTTableBody data={data} />
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
