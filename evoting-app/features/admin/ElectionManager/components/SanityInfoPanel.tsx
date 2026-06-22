"use client";

import {
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  sanityInfo: SanityInfo | null;
  syncing: boolean;
  syncResult: SyncResult;
  onSync: () => void;
}

type SyncResult = {
  action: "created" | "updated";
  message: string;
} | null;

type SanityInfo = {
  _id: string;
  namaPemilihan: string;
  startTime: string | null;
  endTime: string | null;
  tempatVoting?: string | null;
  deskripsi?: string | null;
};

function formatDT(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SanityInfoPanel({
  sanityInfo,
  syncing,
  syncResult,
  onSync,
}: Props) {
  if (!sanityInfo) {
    return (
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="py-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <p className="font-medium">Info Pemilihan belum ada di Sanity</p>

          <a
            href="/studio"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            <ExternalLink className="w-4 h-4" />
            Buka Studio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            📝
          </div>

          <div>
            <p className="font-semibold">Data dari Sanity CMS</p>

            <p className="text-sm text-muted-foreground">
              Sumber kebenaran: Info Pemilihan di Studio
            </p>
          </div>
        </div>

        <a
          href="/studio"
          target="_blank"
          className="flex items-center gap-2 text-primary text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Buka Studio
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <Row label="Nama Pemilihan" value={sanityInfo.namaPemilihan} />

          <Row
            label="Waktu Mulai"
            value={formatDT(sanityInfo.startTime ?? "")}
          />

          <Row
            label="Waktu Selesai"
            value={formatDT(sanityInfo.endTime ?? "")}
          />

          <Row label="Tempat" value={sanityInfo.tempatVoting ?? "-"} />

          <Row label="Deskripsi" value={sanityInfo.deskripsi ?? "-"} />

          <Row label="Sanity ID" value={sanityInfo._id} mono />
        </div>

        <div className="rounded-xl border border-dashed p-6 flex flex-col justify-center items-center gap-4">
          <div className="text-center">
            <h3 className="font-semibold">Sync ke Database</h3>

            <p className="text-sm text-muted-foreground">
              Klik untuk membuat atau memperbarui election di database
            </p>
          </div>

          <Button className="w-full gap-2" onClick={onSync} disabled={syncing}>
            {syncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sinkronisasi...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Sinkronisasi ke Database
              </>
            )}
          </Button>

          {syncResult && (
            <div className="w-full rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4" />

                {syncResult.action === "created"
                  ? "Election berhasil dibuat"
                  : "Election berhasil diperbarui"}
              </div>

              {syncResult.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex">
      <div className="w-48 text-muted-foreground">{label}</div>

      <div className={mono ? "font-mono text-sm" : "font-medium"}>{value}</div>
    </div>
  );
}
