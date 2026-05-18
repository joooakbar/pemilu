"use client";

import { useEffect, useState } from "react";

export function useActiveElection(idPemilihan?: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!idPemilihan) return;

    fetch(`/api/pemilihan/${idPemilihan}`)
      .then((res) => res.json())
      .then(setData);
  }, [idPemilihan]);

  return data;
}
