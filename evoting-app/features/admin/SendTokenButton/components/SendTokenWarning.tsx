"use client";

export default function SendTokenWarning() {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
      ⚠️ Status election harus <strong>DRAFT</strong> atau{" "}
      <strong>ACTIVE</strong>.
    </div>
  );
}
