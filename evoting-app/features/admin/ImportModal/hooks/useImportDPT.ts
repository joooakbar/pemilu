import { useState, useRef } from "react";
import { toast } from "sonner";
import { uploadDPT } from "../services/import.service";
import type { ImportResultData } from "../types";

export function useImportDPT(electionId?: string) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResultData | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (electionId) {
        formData.append("electionId", electionId);
      }

      const res = await uploadDPT(formData);
      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Upload gagal");
        return;
      }

      setResult(json.data);

      toast.success(`Import berhasil: ${json.data.inserted} baru`);
    } catch (err: any) {
      toast.error(err?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    loading,
    result,
    inputRef,
    setOpen,
    handleUpload,
  };
}
