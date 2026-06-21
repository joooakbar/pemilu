"use client";

import { useEffect, useState, useRef } from "react";
import type { ElectionStats } from "@/types";

export function useElectionStats(idPemilihan?: string) {
  const [stats, setStats] = useState<ElectionStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sourceRef = useRef<EventSource | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const lastDataRef = useRef<string>("");

  useEffect(() => {
    if (!idPemilihan) return;

    const url = `/api/stats/live?idPemilihan=${idPemilihan}`;
    console.log("CONNECT SSE:", url);

    if (sourceRef.current) {
      sourceRef.current.close();
    }

    const es = new EventSource(url);
    sourceRef.current = es;

    es.onopen = () => {
      console.log("SSE CONNECTED");
      setError(null);
    };

    es.onmessage = (e) => {
      try {
        const now = Date.now();

        console.log("========== SSE MESSAGE ==========");
        console.log("RAW DATA:", e.data);
        console.log("TYPE:", typeof e.data);

        if (!e.data?.trim()) {
          console.warn("SSE EMPTY DATA");
          return;
        }

        const data = JSON.parse(e.data) as ElectionStats;

        const serialized = JSON.stringify(data);

        // Skip jika data sama
        if (serialized === lastDataRef.current) {
          return;
        }

        // Throttle update
        if (now - lastUpdateRef.current < 2500) {
          return;
        }

        lastUpdateRef.current = now;
        lastDataRef.current = serialized;

        setStats(data);
        setError(null);

        console.log("PARSED DATA:", data);
      } catch (err) {
        console.error("========== SSE PARSE ERROR ==========");
        console.error("RAW:", e.data);
        console.error(err);

        setError("Gagal parse data SSE");
      }
    };

    es.onerror = (err) => {
      console.error("SSE ERROR:", err);
      setError("Koneksi SSE terputus");
    };

    return () => {
      console.log("CLOSE SSE");
      es.close();
      sourceRef.current = null;
    };
  }, [idPemilihan]);

  return {
    stats,
    error,
  };
}
