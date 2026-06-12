export async function syncKandidat() {
  return fetch("/api/admin/kandidat/sync", {
    method: "POST",
  });
}

export async function fetchKandidatDB() {
  return fetch("/api/admin/kandidat");
}
