interface Props {
  nama: string;
}

export default function PreviewHeader({ nama }: Props) {
  return (
    <div className="text-center space-y-1 border-b pb-4">
      <h2 className="text-xl font-bold">BERITA ACARA PEMILIHAN</h2>

      <p className="text-muted-foreground">{nama}</p>
    </div>
  );
}
