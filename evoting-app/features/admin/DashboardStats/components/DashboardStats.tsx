import { Users, CheckCircle } from "lucide-react";
import {
  DashboardStats as DashboardStatsType,
  StatsCardItem,
} from "../types";

export default function DashboardStats() {
  return <div>Dashboard Stats</div>;
}

export function useDashboardCards(
  stats?: DashboardStatsType | null,
): StatsCardItem[] {
  return [
    {
      label: "Total",
      value: stats?.total ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Aktif",
      value: stats?.active ?? 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];
}