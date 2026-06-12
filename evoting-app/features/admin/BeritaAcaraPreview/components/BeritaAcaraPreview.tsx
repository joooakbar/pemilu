"use client";
import { BeritaAcaraPreviewProps } from "../types";
import { usePartisipasi } from "../hooks/usePartisipasi";
import DownloadButton from "./DownloadButton";

function PreviewHeader({ nama }: { nama: string }) {
  return (
    <div className="text-center space-y-1 border-b pb-4">
      <h2 className="text-xl font-bold">BERITA ACARA PEMILIHAN</h2>

      <p className="text-muted-foreground">{nama}</p>
    </div>
  );
}

function PreviewInfo({
  startTime,
  endTime,
  totalDPT,
  totalSuara,
  partisipasi,
}: {
  startTime: string;
  endTime: string;
  totalDPT: number;
  totalSuara: number;
  partisipasi: string;
}) {
  return <div>{/* isi info */}</div>;
}

function PreviewRekapitulasi({
  data,
}: {
  data: BeritaAcaraPreviewProps["rekapitulasi"];
}) {
  return <div>{/* isi rekap */}</div>;
}

function PreviewWinner({
  pemenang,
}: {
  pemenang: BeritaAcaraPreviewProps["rekapitulasi"][0];
}) {
  return <div>{/* isi winner */}</div>;
}

export default function BeritaAcaraPreview({
  election,
  totalDPT,
  totalSuara,
  rekapitulasi,
}: BeritaAcaraPreviewProps) {
  const partisipasi = usePartisipasi(totalDPT, totalSuara);

  const pemenang = rekapitulasi.reduce(
    (a, b) => (b.jumlah > a.jumlah ? b : a),
    rekapitulasi[0],
  );

  return (
    <div className="space-y-6">
      <div
        className="
        rounded-xl border bg-card
        p-8 max-w-2xl space-y-6
      "
      >
        <PreviewHeader nama={election.nama} />

        <PreviewInfo
          startTime={election.startTime}
          endTime={election.endTime}
          totalDPT={totalDPT}
          totalSuara={totalSuara}
          partisipasi={partisipasi}
        />

        <PreviewRekapitulasi data={rekapitulasi} />

        {pemenang && <PreviewWinner pemenang={pemenang} />}
      </div>

      <DownloadButton electionId={election.id} />
    </div>
  );
}
