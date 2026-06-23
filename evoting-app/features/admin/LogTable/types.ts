export type LogAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN";

export interface LogRow {
  id: string;
  action: string;
  role: string;
  username: string;
  entity: string;
  ipAddress: string;
  metadata: unknown;
  createdAt: string;
}
