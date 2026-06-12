import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import type { LogRow as LogType } from "../types";

interface Props {
  log: LogType;
}

export default function LogRow({ log }: Props) {
  const actionStyle = (() => {
    switch (log.action) {
      case "CREATE":
        return "bg-green-100 text-green-700";

      case "UPDATE":
        return "bg-amber-100 text-amber-700";

      case "DELETE":
        return "bg-red-100 text-red-700";

      case "LOGIN":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-secondary text-foreground";
    }
  })();

  return (
    <tr
      className="
        hover:bg-secondary/20
      "
    >
      <td
        className="
          whitespace-nowrap
          px-4
          py-2
          text-xs
          text-muted-foreground
        "
      >
        {formatDateTime(log.createdAt)}
      </td>

      <td className="px-4 py-2">
        <span
          className={`
            rounded
            px-2
            py-0.5
            font-mono
            text-xs
            font-medium

            ${actionStyle}
          `}
        >
          {log.action}
        </span>
      </td>

      <td
        className="
          px-4
          py-2
          font-medium
        "
      >
        {log.username}
      </td>

      <td className="px-4 py-2">
        <Badge variant="outline" className="text-xs">
          {log.role}
        </Badge>
      </td>

      <td
        className="
          px-4
          py-2
          text-xs
          text-muted-foreground
        "
      >
        {log.entity}
      </td>

      <td
        className="
          px-4
          py-2
          font-mono
          text-xs
          text-muted-foreground
        "
      >
        {log.ipAddress}
      </td>
    </tr>
  );
}
