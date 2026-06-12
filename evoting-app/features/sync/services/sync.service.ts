import { SyncResultSchema } from "../schemas/sync.schema";

export async function syncData() {
  const res = await fetch("/api/admin/sync", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Sync gagal");
  }

  const data = await res.json();

  const parsed = SyncResultSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Response tidak valid dari server");
  }

  return parsed.data;
}
