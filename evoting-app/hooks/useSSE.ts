"use client";

import { useEffect, useState, useRef } from "react";
import type { ElectionStats } from "@/types";

export function useElectionStats(idPemilihan?: string) {
  const [stats, setStats] = useState<ElectionStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sourceRef = useRef<EventSource | null>(null);

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
        const data = JSON.parse(e.data) as ElectionStats;
        console.log("SSE DATA:", data);
        setStats(data);
      } catch (err) {
        console.error("PARSE ERROR:", err);
        setError("Gagal parse data SSE");
      }
    };

    es.onerror = () => {
      console.log("SSE ERROR - reconnecting...");
      setError("Koneksi SSE terputus");
    };

    return () => {
      console.log("CLOSE SSE");
      es.close();
      sourceRef.current = null;
    };
  }, [idPemilihan]);

  return { stats, error };
}
