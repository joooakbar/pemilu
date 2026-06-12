"use client";

import {
  TOKEN_EXPIRED_OPTIONS,
  TOKEN_METHODS,
} from "../constants/send-token.constants";
import type { SendTokenOptionsData } from "../types/send-token.types";

interface Props {
  opts: SendTokenOptionsData;
  setOpts: React.Dispatch<React.SetStateAction<SendTokenOptionsData>>;
}

export default function SendTokenOptions({ opts, setOpts }: Props) {
  const toggleVia = (v: string) => {
    setOpts((o) => ({
      ...o,
      via: o.via.includes(v) ? o.via.filter((x) => x !== v) : [...o.via, v],
    }));
  };

  return (
    <>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={opts.generate}
          onChange={(e) =>
            setOpts((o) => ({
              ...o,
              generate: e.target.checked,
            }))
          }
          className="mt-0.5 w-4 h-4 accent-primary"
        />

        <div>
          <p className="text-sm font-medium">Generate token baru</p>

          <p className="text-xs text-muted-foreground">
            Buat token baru untuk pemilih
          </p>
        </div>
      </label>

      <div className="space-y-2">
        <p className="text-sm font-medium">Kirim melalui:</p>

        <div className="flex gap-3">
          {TOKEN_METHODS.map(({ val, label, desc }) => (
            <label
              key={val}
              className={`flex-1 cursor-pointer rounded-lg border p-3 ${
                opts.via.includes(val)
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={opts.via.includes(val)}
                onChange={() => toggleVia(val)}
              />

              <p className="text-sm font-medium">{label}</p>

              <p className="text-xs text-muted-foreground">{desc}</p>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">Token berlaku:</p>

        <select
          value={opts.expiredJam}
          onChange={(e) =>
            setOpts((o) => ({
              ...o,
              expiredJam: +e.target.value,
            }))
          }
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          {TOKEN_EXPIRED_OPTIONS.map((h) => (
            <option key={h} value={h}>
              {h} jam
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
