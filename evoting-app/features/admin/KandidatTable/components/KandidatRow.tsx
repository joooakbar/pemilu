import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { KandidatSanity } from "@/types";
import type { KandidatDB } from "../types";
import { getKandidatSyncStatus } from "../utils";

interface Props {
  kandidat: KandidatSanity;
  dbList: KandidatDB[];
}

export default function KandidatRow({ kandidat, dbList }: Props) {
  const { synced, hasChanges } = getKandidatSyncStatus(kandidat, dbList);

  return (
    <tr
      className="
        transition-colors
        hover:bg-secondary/20
      "
    >
      <td
        className="
          px-4
          py-3
          text-xl
          font-black
          text-primary
        "
      >
        {kandidat.nomorUrut}
      </td>

      <td className="px-4 py-3">
        {kandidat.foto?.asset?.url ? (
          <Image
            src={kandidat.foto.asset.url}
            alt={kandidat.namaPaslon}
            width={44}
            height={44}
            className="
              rounded-full
              border-2
              border-border
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-secondary
              text-xl
            "
          >
            👤
          </div>
        )}
      </td>

      <td
        className="
          px-4
          py-3
          font-semibold
        "
      >
        {kandidat.namaPaslon}
      </td>

      <td
        className="
          px-4
          py-3
          font-mono
          text-xs
          text-muted-foreground
        "
      >
        {kandidat._id.slice(0, 22)}…
      </td>

      <td className="px-4 py-3">
        {!synced && (
          <Badge variant="destructive" className="gap-1 text-xs">
            <AlertCircle className="h-3 w-3" />
            Belum sync
          </Badge>
        )}

        {synced && hasChanges && (
          <Badge
            className="
              gap-1
              bg-amber-500
              text-xs
            "
          >
            <AlertCircle className="h-3 w-3" />
            Ada perubahan
          </Badge>
        )}

        {synced && !hasChanges && (
          <Badge
            className="
              gap-1
              bg-green-600
              text-xs
            "
          >
            <CheckCircle2 className="h-3 w-3" />
            Tersinkronisasi
          </Badge>
        )}
      </td>

      <td className="px-4 py-3">
        <a
          href="/studio"
          target="_blank"
          className="
            text-xs
            text-primary
            underline-offset-2
            hover:underline
          "
        >
          Edit ↗
        </a>
      </td>
    </tr>
  );
}
