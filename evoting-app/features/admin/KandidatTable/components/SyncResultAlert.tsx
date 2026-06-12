import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { SyncResult } from "../types";

interface Props {
  result: SyncResult;
}

export default function SyncResultAlert({ result }: Props) {
  const hasError = result.errors.length > 0;

  return (
    <div
      className={`
        space-y-2
        rounded-lg
        border
        p-4

        ${
          hasError
            ? "border-amber-200 bg-amber-50"
            : "border-green-200 bg-green-50"
        }
      `}
    >
      <div
        className={`
          flex
          items-center
          gap-2
          text-sm
          font-semibold

          ${hasError ? "text-amber-700" : "text-green-700"}
        `}
      >
        {hasError ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}

        {result.message}
      </div>
    </div>
  );
}
