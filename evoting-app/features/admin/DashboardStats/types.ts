import { LucideIcon } from "lucide-react";

export interface DashboardStatsProps {
  electionId: string;
  electionStatus: string;
}

/**
 * Data statistik dashboard
 */
export interface DashboardStats {
  total: number;
  active: number;
}

export interface StatsCardItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}
