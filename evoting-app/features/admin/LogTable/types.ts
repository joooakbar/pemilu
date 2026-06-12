export type LogAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN";

export interface LogRow {
  id: string;
  action: LogAction;
  role: string;
  username: string;
  entity: string;
  ipAddress: string;
  metadata: unknown;
  createdAt: string;
}
