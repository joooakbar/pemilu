interface Props {
  total: number;
}

export default function DPTFooter({ total }: Props) {
  return (
    <p
      className="
        text-xs
        text-muted-foreground
      "
    >
      Menampilkan {Math.min(total, 100)} dari {total} pemilih
    </p>
  );
}
