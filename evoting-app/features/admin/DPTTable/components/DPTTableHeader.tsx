const headers = [
  "NIK",
  "Nama",
  "Kode Wilayah",
  "Phone",
  "Status",
  "Waktu Pilih",
];

export default function DPTTableHeader() {
  return (
    <thead className="bg-secondary/50">
      <tr>
        {headers.map((h) => (
          <th
            key={h}
            className="
              px-4 py-3
              text-left
              font-medium
              text-muted-foreground
            "
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}
