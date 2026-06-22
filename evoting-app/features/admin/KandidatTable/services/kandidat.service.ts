import type { KandidatDB } from "../types";

export async function syncKandidat(data: KandidatDB[]) {
  return fetch("/api/admin/kandidat/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
}

export async function fetchKandidatDB() {
  return fetch("/api/admin/kandidat");
}
