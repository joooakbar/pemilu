"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

import SendTokenHeader from "./SendTokenHeader";
import SendTokenOptions from "./SendTokenOptions";
import SendTokenResult from "./SendTokenResult";
import SendTokenWarning from "./SendTokenWarning";

import { useSendToken } from "../hooks/useSendToken";

import type {
  SendTokenProps,
  SendTokenResultData,
} from "../types/send-token.types";

import { DEFAULT_SEND_TOKEN_OPTIONS } from "../schemas/send-token.schema";

export default function SendTokenButton({
  electionId,
  electionStatus,
}: SendTokenProps) {
  const [open, setOpen] = useState(false);

  const [result, setResult] = useState<SendTokenResultData | null>(null);

  const [opts, setOpts] = useState(DEFAULT_SEND_TOKEN_OPTIONS);

  const { loading, run } = useSendToken(electionId, opts);

  const isDisabled = !["ACTIVE", "DRAFT"].includes(electionStatus);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <SendTokenHeader open={open} setOpen={setOpen} />

      {open && (
        <div className="border-t px-5 py-4 space-y-5">
          {isDisabled && <SendTokenWarning />}

          <SendTokenOptions opts={opts} setOpts={setOpts} />

          <Button
            onClick={() => run(opts, setResult)}
            disabled={loading || isDisabled}
            className="w-full gap-2"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Kirim Token
              </>
            )}
          </Button>

          {result && <SendTokenResult result={result} />}
        </div>
      )}
    </div>
  );
}
