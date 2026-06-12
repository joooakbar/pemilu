export type Role = "ADMIN" | "PANITIA" | "SAKSI";

export interface TopBarProps {
  name: string;
  role: Role;
}

export interface UserInfoProps {
  name: string;
  role: Role;
}
