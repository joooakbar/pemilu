export async function syncElection() {
  return fetch("/api/admin/election/sync", {
    method: "POST",
  });
}

export async function createElection(data: any) {
  return fetch("/api/admin/election", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateElection(id: string, data: any) {
  return fetch(`/api/admin/election/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
