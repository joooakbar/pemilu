import React from "react";
import { Button } from "@/components/ui/button";
import UploadButton from "./UploadButton";
import ImportResult from "./ImportResult";
import type { ImportResultData } from "../types";

interface Props {
  open: boolean;
  loading: boolean;
  result: ImportResultData | null;
  onClose: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImportDialog({
  open,
  loading,
  result,
  onClose,
  onUpload,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-card w-full max-w-md space-y-4 rounded-xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Import DPT</h2>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Format kolom:</p>
          <code className="block rounded bg-secondary p-2 text-xs">
            nama, nik, alamat, rt, rw
          </code>
        </div>

        {/* FILE INPUT */}
        <input
          id="file-upload"
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={onUpload}
        />

        {/* TRIGGER BUTTON */}
        <label htmlFor="file-upload" className="block w-full">
          <UploadButton loading={loading} onClick={() => {}} />
        </label>

        {result && <ImportResult result={result} />}

        <Button variant="outline" className="w-full" onClick={onClose}>
          Tutup
        </Button>
      </div>
    </div>
  );
}
