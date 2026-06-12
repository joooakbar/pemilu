"use client";

interface Props {
  icon: React.ReactNode;
  title: string;
  data: {
    created: number;
    updated: number;
    skipped: number;
    errors: string[];
  };
  extraInfo?: string;
}

export default function SyncSection({ icon, title, data, extraInfo }: Props) {
  const hasError = data.errors.length > 0;

  return (
    <div
      className={`rounded-lg border p-4 space-y-2 ${
        hasError
          ? "border-amber-200 bg-amber-50"
          : "border-green-200 bg-green-50"
      }`}
    >
      <div
        className={`flex items-center gap-2 font-medium text-sm ${
          hasError ? "text-amber-800" : "text-green-800"
        }`}
      >
        {icon}
        {title}
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="text-green-700">+{data.created} dibuat</span>

        <span className="text-blue-700">↻ {data.updated} diperbarui</span>

        <span className="text-gray-500">= {data.skipped} tidak berubah</span>
      </div>

      {extraInfo && (
        <p className="text-xs text-green-700 font-mono">{extraInfo}</p>
      )}

      {hasError && (
        <ul className="text-xs text-amber-700 list-disc pl-4 space-y-0.5">
          {data.errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
