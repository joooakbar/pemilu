import { LucideIcon } from 'lucide-react'

export interface DashboardStatsProps {
  electionId: string
  electionStatus: string
}

export interface StatsCardItem {
  label: string
  value: string | number
  icon: LucideIcon
  color: string
  bg: string
}