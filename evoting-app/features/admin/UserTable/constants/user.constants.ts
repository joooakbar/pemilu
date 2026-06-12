import type { Role } from "../types";

export const ROLE_COLOR: Record<Role, string> = {
  ADMIN: "bg-red-100 text-red-700 border-red-200",
  PANITIA: "bg-amber-100 text-amber-700 border-amber-200",
  SAKSI: "bg-teal-100 text-teal-700 border-teal-200",
};

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrator",
  PANITIA: "Panitia",
  SAKSI: "Saksi",
};
